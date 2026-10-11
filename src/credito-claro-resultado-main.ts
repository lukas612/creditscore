import { supabase } from "./lib/supabase";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId, fireServyPostback } from "./lib/postback";

// Scorea "Resultado" (MX): página de aterrizaje para tráfico de pago directo,
// sin quiz. A diferencia de credito-claro-main.ts, la premisa es que la
// persona ya pasó por Creditio y su score ya se "conoce" (bajo) - por eso el
// número y los factores se generan una sola vez por sesión (no en cada
// recarga, para que no parezca que se está recalculando en vivo) y no hay
// llamada a calculate_score_mx. El resto del flujo de venta (email -> Stripe
// -> PDF por email) es idéntico al de credito-claro-main.ts.
const SOURCE = "credito_claro_mx_resultado";

const SCORE_KEY = "scorea_resultado_score";
const FACTORS_KEY = "scorea_resultado_factors";
const DAYS_KEY = "scorea_resultado_days";

interface Factor {
  key: string;
  label: string;
  tag: string;
  cls: "factor-bad" | "factor-warn";
}

const FACTOR_POOL: Factor[] = [
  { key: "atrasos", label: "Historial de pagos", tag: "Necesita atención", cls: "factor-bad" },
  { key: "uso", label: "Uso de tu crédito disponible", tag: "Alto", cls: "factor-bad" },
  { key: "antiguedad", label: "Antigüedad de tu historial", tag: "Corta", cls: "factor-warn" },
  { key: "solicitudes", label: "Consultas recientes", tag: "Varias", cls: "factor-warn" },
  { key: "activo", label: "Cuentas activas", tag: "Pocas", cls: "factor-warn" },
];

function getOrCreateNumber(key: string, generator: () => number): number {
  const stored = sessionStorage.getItem(key);
  if (stored !== null) {
    const n = parseInt(stored, 10);
    if (!Number.isNaN(n)) return n;
  }
  const value = generator();
  sessionStorage.setItem(key, String(value));
  return value;
}

function pickFactors(): Factor[] {
  const stored = sessionStorage.getItem(FACTORS_KEY);
  if (stored) {
    const keys = stored.split(",");
    const found = keys.map((k) => FACTOR_POOL.find((f) => f.key === k)).filter((f): f is Factor => Boolean(f));
    if (found.length > 0) return found;
  }
  const shuffled = [...FACTOR_POOL].sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, 3);
  sessionStorage.setItem(FACTORS_KEY, chosen.map((f) => f.key).join(","));
  return chosen;
}

const params = new URLSearchParams(window.location.search);
const utmSource = params.get("utm_source");
const pago = params.get("pago");
const clickId = getClickId();
let leadPostbackFired = false;
let quizSessionId: string | null = null;

const resultWrap = document.getElementById("resultWrap")!;
const successWrap = document.getElementById("successWrap")!;
const bannerSlot = document.getElementById("banner-slot")!;

async function createSession() {
  const { data: sessionId, error } = await supabase.rpc("create_quiz_session", {
    p_answers: { resultado_preexistente: true },
    p_utm_source: utmSource,
    p_click_id: null,
    p_source: SOURCE,
  });
  if (!error && typeof sessionId === "string") {
    quizSessionId = sessionId;
    trackFunnelEvent("question_reached", "application_completed", SOURCE, quizSessionId);
  }
}

function renderResult() {
  const score = getOrCreateNumber(SCORE_KEY, () => 14 + Math.floor(Math.random() * 23));
  const days = getOrCreateNumber(DAYS_KEY, () => 1 + Math.floor(Math.random() * 6));
  const factors = pickFactors();

  document.getElementById("scoreNumber")!.textContent = String(score);
  (document.getElementById("scoreMeterFill") as HTMLElement).style.width = `${score}%`;
  document.getElementById("resultSub")!.textContent =
    `Según tu evaluación en Creditio, tu score es de ${score}/100 puntos.`;
  document.getElementById("updatedNote")!.textContent =
    days === 1 ? "Última actualización: hace 1 día" : `Última actualización: hace ${days} días`;

  const list = document.getElementById("factorList")!;
  list.innerHTML = factors
    .map((f) => `<div class="factor-row"><span>${f.label}</span><span class="factor-tag ${f.cls}">${f.tag}</span></div>`)
    .join("");
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

  // Postback de "lead" (payout=0): igual que en credito-claro-main.ts, la
  // venta real (con revenue) la dispara stripe-webhook, no esto.
  if (clickId && !leadPostbackFired) {
    leadPostbackFired = true;
    fireServyPostback(clickId, "Scorea_lead");
  }

  try {
    const { data, error } = await supabase.functions.invoke("stripe-checkout", {
      body: {
        email,
        quizSessionId,
        origin: window.location.origin,
        returnPath: "/credito-claro-resultado.html",
        clickId,
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

async function init() {
  trackFunnelEvent("page_view", undefined, SOURCE);
  renderResult();

  if (pago === "exito") {
    document.getElementById("resultado")!.scrollIntoView();
    resultWrap.classList.remove("show");
    successWrap.classList.add("show");
    return;
  }

  renderBanner();
  await createSession();
}

void init();
