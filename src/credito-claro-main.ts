import { supabase } from "./lib/supabase";
import { trackFunnelEvent } from "./lib/funnel";

// Scorea (MX): a diferencia de ES/RO, aquí no hay prestamistas ni cascada de
// Witme - el quiz es un lead magnet que lleva a la venta de la guía en PDF
// (pago real con Stripe, ver supabase/functions/stripe-checkout y
// stripe-webhook). Reutiliza el mismo patrón de create_quiz_session +
// funnel_events que el resto de países para que salga en el panel admin,
// pero el cálculo de score vive en calculate_score_mx (scoring_rules
// 'mx_%'), no en este archivo.
const SOURCE = "credito_claro_mx";

interface QuestionOption {
  label: string;
  value: string;
}

interface Question {
  title: string;
  options: QuestionOption[];
  // Clave del objeto de respuestas que espera calculate_score_mx en el backend.
  answerKey: "mxActivo" | "mxAtrasos" | "mxUso" | "mxAntiguedad" | "mxSolicitudes";
  // Clave corta solo para trackFunnelEvent (pasos del embudo en el admin).
  stepKey: string;
}

const QUESTIONS: Question[] = [
  {
    title: "¿Tienes alguna tarjeta de crédito o préstamo activo actualmente?",
    options: [
      { label: "Sí, tengo al menos una", value: "si" },
      { label: "No, nunca he tenido crédito", value: "no" },
    ],
    answerKey: "mxActivo",
    stepKey: "activo",
  },
  {
    title: "En los últimos 12 meses, ¿te has atrasado en algún pago?",
    options: [
      { label: "Nunca", value: "nunca" },
      { label: "1 o 2 veces", value: "una_dos" },
      { label: "Varias veces", value: "varias" },
    ],
    answerKey: "mxAtrasos",
    stepKey: "atrasos",
  },
  {
    title: "¿Qué porcentaje de tu límite de crédito usas normalmente?",
    options: [
      { label: "Menos del 30%", value: "bajo" },
      { label: "Entre 30% y 70%", value: "medio" },
      { label: "Más del 70%", value: "alto" },
    ],
    answerKey: "mxUso",
    stepKey: "uso",
  },
  {
    title: "¿Hace cuánto tiempo tienes tu crédito más antiguo?",
    options: [
      { label: "Menos de 1 año (o no tengo)", value: "nuevo" },
      { label: "Entre 1 y 5 años", value: "medio" },
      { label: "Más de 5 años", value: "antiguo" },
    ],
    answerKey: "mxAntiguedad",
    stepKey: "antiguedad",
  },
  {
    title: "¿Cuántas veces has solicitado crédito nuevo en los últimos 6 meses?",
    options: [
      { label: "Ninguna", value: "ninguna" },
      { label: "1 o 2 veces", value: "pocas" },
      { label: "3 veces o más", value: "muchas" },
    ],
    answerKey: "mxSolicitudes",
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
  antiguedad: "La antigüedad se construye solo con tiempo y constancia — evita cancelar tus cuentas más viejas aunque no las uses seguido.",
  solicitudes: "Solicitar varios créditos en poco tiempo puede leerse como urgencia. Espaciar tus solicitudes ayuda a tu score.",
};

interface ScoreResult {
  score: number;
  score_band: string;
  breakdown: Array<{ key: string; label: string; points: number }>;
}

const params = new URLSearchParams(window.location.search);
const utmSource = params.get("utm_source");
const pago = params.get("pago");

const quizFlow = document.getElementById("quizFlow")!;
const resultWrap = document.getElementById("resultWrap")!;
const successWrap = document.getElementById("successWrap")!;
const bannerSlot = document.getElementById("banner-slot")!;
const stepLabel = document.getElementById("stepLabel")!;
const progressFill = document.getElementById("progressFill")!;
const qTitle = document.getElementById("qTitle")!;
const qOptions = document.getElementById("qOptions")!;
const backBtn = document.getElementById("backBtn") as HTMLButtonElement;

let current = 0;
const answers: Record<string, string> = {};
let quizSessionId: string | null = null;

function renderQuestion() {
  const q = QUESTIONS[current];
  stepLabel.textContent = `PREGUNTA ${current + 1} DE ${QUESTIONS.length}`;
  progressFill.style.width = `${(current / QUESTIONS.length) * 100 + 10}%`;
  qTitle.textContent = q.title;
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
  qTitle.textContent = "Calculando tu score…";
  qOptions.innerHTML = "";

  const { data: sessionId, error: sessionError } = await supabase.rpc("create_quiz_session", {
    p_answers: answers,
    p_utm_source: utmSource,
    p_click_id: null,
    p_source: SOURCE,
  });

  const { data: scored, error: scoreError } = await supabase
    .rpc("calculate_score_mx", { p_answers: answers })
    .single<ScoreResult>();

  if (sessionError || scoreError || !scored) {
    qTitle.textContent = "Ha ocurrido un error calculando tu score. Recarga la página e inténtalo de nuevo.";
    return;
  }

  quizSessionId = typeof sessionId === "string" ? sessionId : null;
  if (quizSessionId) {
    trackFunnelEvent("question_reached", "application_completed", SOURCE, quizSessionId);
  }

  showResult(scored);
}

function showResult(scored: ScoreResult) {
  quizFlow.style.display = "none";
  resultWrap.classList.add("show");

  const copy = BAND_COPY[scored.score_band] ?? BAND_COPY.construccion;
  const badge = document.getElementById("scoreBadge")!;
  const title = document.getElementById("resultTitle")!;
  const sub = document.getElementById("resultSub")!;

  badge.className = `score-badge ${copy.badgeClass}`;
  badge.textContent = copy.badgeText;
  title.textContent = copy.title;
  sub.textContent = `Estimación propia: ${scored.score}/100 puntos, según tus respuestas.`;

  const weakest = scored.breakdown.reduce((min, item) => (item.points < min.points ? item : min), scored.breakdown[0]);
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

// Clicks en las tarjetas de afiliados (aval coche/tarjetas): de momento son
// placeholders sin acuerdo real (ver brief), pero se registra el interés.
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
