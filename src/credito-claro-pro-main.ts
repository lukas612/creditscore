import { supabase } from "./lib/supabase";
import { trackFunnelEvent } from "./lib/funnel";

// Scorea Pro (MX): variante "elaborada" de credito-claro.html para test A/B -
// 7 factores reales de buró en vez de 5 (ver scoring_rules 'mxpro_%' /
// calculate_score_mx_pro) y un gate de email antes de revelar el score
// completo (igual que WitmeGate en ES), que sí crea un lead aunque no
// compren - credito-claro.html (la versión simple) no lo hacía. El resto
// del embudo (venta de la guía vía Stripe) es idéntico y comparte las
// mismas edge functions.
const SOURCE = "credito_claro_mx_pro";

interface QuestionOption {
  label: string;
  value: string;
}

interface Question {
  title: string;
  help: string;
  options: QuestionOption[];
  answerKey:
    | "mxProActivo"
    | "mxProAtrasos"
    | "mxProUso"
    | "mxProEndeudamiento"
    | "mxProAntiguedad"
    | "mxProTipos"
    | "mxProSolicitudes";
  stepKey: string;
}

const QUESTIONS: Question[] = [
  {
    title: "¿Tienes alguna tarjeta de crédito o préstamo activo actualmente?",
    help: "Tener crédito activo es lo que genera historial — sin eso, el buró no tiene nada que evaluar.",
    options: [
      { label: "Sí, tengo al menos una", value: "si" },
      { label: "No, nunca he tenido crédito", value: "no" },
    ],
    answerKey: "mxProActivo",
    stepKey: "activo",
  },
  {
    title: "En los últimos 12 meses, ¿te has atrasado en algún pago?",
    help: "El historial de pagos es, por mucho, el factor que más pesa en tu score.",
    options: [
      { label: "Nunca", value: "nunca" },
      { label: "1 o 2 veces", value: "una_dos" },
      { label: "Varias veces", value: "varias" },
    ],
    answerKey: "mxProAtrasos",
    stepKey: "atrasos",
  },
  {
    title: "¿Qué porcentaje de tu límite de crédito usas normalmente?",
    help: "Usar más del 30% de tu límite disponible, aunque pagues a tiempo, ya resta puntos.",
    options: [
      { label: "Menos del 30%", value: "bajo" },
      { label: "Entre 30% y 70%", value: "medio" },
      { label: "Más del 70%", value: "alto" },
    ],
    answerKey: "mxProUso",
    stepKey: "uso",
  },
  {
    title: "¿Qué parte de tu ingreso mensual se va en pagar deudas (tarjetas, préstamos, etc.)?",
    help: "Es tu nivel de endeudamiento — cuánto de lo que ganas ya está comprometido en pagos fijos.",
    options: [
      { label: "Menos del 20%", value: "bajo" },
      { label: "Entre 20% y 40%", value: "medio" },
      { label: "Más del 40%", value: "alto" },
    ],
    answerKey: "mxProEndeudamiento",
    stepKey: "endeudamiento",
  },
  {
    title: "¿Hace cuánto tiempo tienes tu crédito más antiguo?",
    help: "La antigüedad se construye solo con tiempo — por eso cuenta tanto no cancelar tus cuentas más viejas.",
    options: [
      { label: "Menos de 1 año (o no tengo)", value: "nuevo" },
      { label: "Entre 1 y 5 años", value: "medio" },
      { label: "Más de 5 años", value: "antiguo" },
    ],
    answerKey: "mxProAntiguedad",
    stepKey: "antiguedad",
  },
  {
    title: "¿Qué tipo de productos de crédito tienes o has tenido?",
    help: "Manejar distintos tipos (tarjeta, préstamo personal, automotriz...) suma, mientras lo hagas bien.",
    options: [
      { label: "Ninguno", value: "ninguno" },
      { label: "Solo uno (ej. solo tarjeta)", value: "uno" },
      { label: "Varios tipos distintos", value: "variados" },
    ],
    answerKey: "mxProTipos",
    stepKey: "tipos",
  },
  {
    title: "¿Cuántas veces has solicitado crédito nuevo en los últimos 6 meses?",
    help: "Varias solicitudes en poco tiempo se leen como urgencia por financiamiento.",
    options: [
      { label: "Ninguna", value: "ninguna" },
      { label: "1 o 2 veces", value: "pocas" },
      { label: "3 veces o más", value: "muchas" },
    ],
    answerKey: "mxProSolicitudes",
    stepKey: "solicitudes",
  },
];

const BAND_COPY: Record<string, { badgeClass: string; badgeText: string; title: string }> = {
  saludable: { badgeClass: "badge-good", badgeText: "Saludable", title: "Tu crédito va por buen camino" },
  construccion: { badgeClass: "badge-mid", badgeText: "En construcción", title: "Vas bien, pero hay espacio de mejora" },
  atencion: { badgeClass: "badge-low", badgeText: "Necesita atención", title: "Es buen momento para poner orden" },
};

const TIP_COPY: Record<string, string> = {
  activo: "Empezar a generar historial —aunque sea con un producto pequeño— suele ser el primer paso cuando nunca has tenido crédito.",
  atrasos: "El historial de pagos es, por mucho, el factor que más pesa. Automatizar al menos el pago mínimo ayuda a evitar atrasos por olvido.",
  uso: "Bajar tu uso del límite disponible por debajo del 30% suele tener un impacto más rápido de lo que la gente espera.",
  endeudamiento: "Bajar el porcentaje de tu ingreso comprometido en deudas, aunque sea abonando a la más cara primero, libera mucha capacidad.",
  antiguedad: "La antigüedad se construye solo con tiempo y constancia — evita cancelar tus cuentas más viejas aunque no las uses seguido.",
  tipos: "Diversificar el tipo de crédito que manejas (sin abusar) suele verse bien, siempre que todo se pague a tiempo.",
  solicitudes: "Solicitar varios créditos en poco tiempo puede leerse como urgencia. Espaciar tus solicitudes ayuda a tu score.",
};

interface BreakdownItem {
  key: string;
  label: string;
  points: number;
  max: number;
}

interface ScoreResult {
  score: number;
  score_band: string;
  breakdown: BreakdownItem[];
}

const params = new URLSearchParams(window.location.search);
const utmSource = params.get("utm_source");
const pago = params.get("pago");

const quizFlow = document.getElementById("quizFlow")!;
const gateWrap = document.getElementById("gateWrap")!;
const resultWrap = document.getElementById("resultWrap")!;
const successWrap = document.getElementById("successWrap")!;
const bannerSlot = document.getElementById("banner-slot")!;
const stepLabel = document.getElementById("stepLabel")!;
const progressFill = document.getElementById("progressFill")!;
const qTitle = document.getElementById("qTitle")!;
const qHelp = document.getElementById("qHelp")!;
const qOptions = document.getElementById("qOptions")!;
const backBtn = document.getElementById("backBtn") as HTMLButtonElement;

let current = 0;
const answers: Record<string, string> = {};
let quizSessionId: string | null = null;
let scoreResult: ScoreResult | null = null;

function renderQuestion() {
  const q = QUESTIONS[current];
  stepLabel.textContent = `PREGUNTA ${current + 1} DE ${QUESTIONS.length}`;
  progressFill.style.width = `${(current / QUESTIONS.length) * 100 + 10}%`;
  qTitle.textContent = q.title;
  qHelp.textContent = q.help;
  qOptions.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt.label;
    if (answers[q.answerKey] === opt.value) btn.classList.add("selected");
    btn.addEventListener("click", () => {
      answers[q.answerKey] = opt.value;
      trackFunnelEvent("question_reached", q.stepKey, SOURCE);
      setTimeout(() => {
        if (current < QUESTIONS.length - 1) {
          current++;
          renderQuestion();
        } else {
          void finishQuiz();
        }
      }, 180);
    });
    qOptions.appendChild(btn);
  });
  backBtn.style.visibility = current === 0 ? "hidden" : "visible";
}

backBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
});

async function finishQuiz() {
  qTitle.textContent = "Calculando tu análisis…";
  qHelp.textContent = "";
  qOptions.innerHTML = "";

  const { data: sessionId, error: sessionError } = await supabase.rpc("create_quiz_session", {
    p_answers: answers,
    p_utm_source: utmSource,
    p_click_id: null,
    p_source: SOURCE,
  });

  const { data: scored, error: scoreError } = await supabase
    .rpc("calculate_score_mx_pro", { p_answers: answers })
    .single<ScoreResult>();

  if (sessionError || scoreError || !scored) {
    qTitle.textContent = "Ha ocurrido un error calculando tu score. Recarga la página e inténtalo de nuevo.";
    return;
  }

  quizSessionId = typeof sessionId === "string" ? sessionId : null;
  scoreResult = scored;
  if (quizSessionId) {
    trackFunnelEvent("question_reached", "gate_contact", SOURCE, quizSessionId);
  }

  showGate(scored.score);
}

function showGate(score: number) {
  quizFlow.style.display = "none";
  gateWrap.classList.add("show");
  document.getElementById("teaserScore")!.textContent = String(score);
}

const gateForm = document.getElementById("gateForm") as HTMLFormElement;
const gateEmailInput = document.getElementById("gateEmailInput") as HTMLInputElement;
const gateSubmitBtn = document.getElementById("gateSubmitBtn") as HTMLButtonElement;
const gateError = document.getElementById("gateError")!;

gateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  void unlockResult();
});

async function unlockResult() {
  const email = gateEmailInput.value.trim();
  if (!email || !email.includes("@")) {
    gateError.textContent = "Escribe un email válido.";
    gateError.classList.add("show");
    return;
  }
  if (!scoreResult) return;
  gateError.classList.remove("show");
  gateSubmitBtn.disabled = true;
  gateSubmitBtn.textContent = "Enviando…";

  const { error: insertError } = await supabase.from("leads").insert({
    quiz_session_id: quizSessionId,
    email,
    score: scoreResult.score,
    score_band: scoreResult.score_band,
    source: SOURCE,
  });

  gateSubmitBtn.disabled = false;
  gateSubmitBtn.textContent = "Ver mi análisis completo";

  if (insertError) {
    gateError.textContent = "No hemos podido guardar tus datos. Inténtalo de nuevo.";
    gateError.classList.add("show");
    return;
  }

  if (quizSessionId) {
    trackFunnelEvent("question_reached", "application_completed", SOURCE, quizSessionId);
  }

  gateWrap.classList.remove("show");
  showResult(scoreResult);
}

function showResult(scored: ScoreResult) {
  resultWrap.classList.add("show");

  const copy = BAND_COPY[scored.score_band] ?? BAND_COPY.construccion;
  const badge = document.getElementById("scoreBadge")!;
  const title = document.getElementById("resultTitle")!;
  const sub = document.getElementById("resultSub")!;

  badge.className = `score-badge ${copy.badgeClass}`;
  badge.textContent = copy.badgeText;
  title.textContent = copy.title;
  sub.textContent = `Análisis completo: ${scored.score}/100 puntos, según tus 7 respuestas.`;

  const breakdownEl = document.getElementById("breakdown")!;
  breakdownEl.innerHTML = scored.breakdown
    .map((item) => {
      const pct = item.max > 0 ? Math.round((item.points / item.max) * 100) : 0;
      return `
        <div class="breakdown-row">
          <span class="breakdown-label">${item.label}</span>
          <span class="breakdown-track"><span class="breakdown-fill" style="width:${pct}%"></span></span>
          <span class="breakdown-pts">${item.points}/${item.max}</span>
        </div>
      `;
    })
    .join("");

  const weakest = scored.breakdown.reduce((min, item) => {
    const ratio = item.max > 0 ? item.points / item.max : 1;
    const minRatio = min.max > 0 ? min.points / min.max : 1;
    return ratio < minRatio ? item : min;
  }, scored.breakdown[0]);
  document.getElementById("resultTip")!.innerHTML =
    `<strong>Lo primero que trabajaríamos en tu caso:</strong> ${TIP_COPY[weakest?.key] ?? TIP_COPY.atrasos}`;
}

const buyBtn = document.getElementById("buyBtn") as HTMLButtonElement;
const emailRow = document.getElementById("emailRow")!;
const emailInput = document.getElementById("emailInput") as HTMLInputElement;
const emailConfirmBtn = document.getElementById("emailConfirmBtn") as HTMLButtonElement;
const buyError = document.getElementById("buyError")!;

buyBtn.addEventListener("click", () => {
  emailRow.style.display = "flex";
  buyBtn.style.display = "none";
});

emailConfirmBtn.addEventListener("click", () => {
  void startCheckout();
});

async function startCheckout() {
  const email = emailInput.value.trim();
  if (!email || !email.includes("@")) {
    buyError.textContent = "Escribe un email válido.";
    buyError.classList.add("show");
    return;
  }
  buyError.classList.remove("show");
  emailConfirmBtn.disabled = true;
  emailConfirmBtn.textContent = "Procesando…";

  try {
    const { data, error } = await supabase.functions.invoke("stripe-checkout", {
      body: {
        email,
        quizSessionId,
        origin: window.location.origin,
        returnPath: "/credito-claro-pro.html",
      },
    });
    if (error || !data?.checkoutUrl) throw error ?? new Error("Sin checkoutUrl");

    if (quizSessionId) {
      trackFunnelEvent("offer_click", "guia_pdf", SOURCE, quizSessionId);
    }
    window.location.href = data.checkoutUrl;
  } catch {
    buyError.textContent = "No se pudo iniciar el pago. Inténtalo de nuevo en unos segundos.";
    buyError.classList.add("show");
    emailConfirmBtn.disabled = false;
    emailConfirmBtn.textContent = "Continuar";
  }
}

document.querySelectorAll<HTMLButtonElement>("[data-offer]").forEach((btn) => {
  btn.addEventListener("click", () => {
    trackFunnelEvent("offer_click", btn.dataset.offer, SOURCE, quizSessionId ?? undefined);
  });
});

function renderBanner() {
  if (pago === "cancelado") {
    bannerSlot.innerHTML = `<div class="banner banner-warn">Cancelaste el pago. Puedes volver a intentarlo cuando quieras.</div>`;
  }
}

function init() {
  trackFunnelEvent("page_view", undefined, SOURCE);

  if (pago === "exito") {
    document.getElementById("quiz")!.scrollIntoView();
    quizFlow.style.display = "none";
    successWrap.classList.add("show");
    return;
  }

  renderBanner();
  renderQuestion();
}

init();
