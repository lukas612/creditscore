import { supabase } from "./lib/supabase";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId, fireServyPostback } from "./lib/postback";

// Scorea "Resultado" V2 (MX): misma premisa que credito-claro-resultado-main.ts
// (tráfico de pago directo, score ya "conocido", sin quiz), pero con la
// escala real de Buró de Crédito en México (300-850 puntos) en vez de un
// 0-100 genérico, y un diseño más moderno con gauge semicircular.
const SOURCE = "credito_claro_mx_resultado_v2";

declare const Stripe: (publishableKey: string) => {
  createEmbeddedCheckoutPage(options: {
    fetchClientSecret: () => Promise<string>;
    onComplete?: () => void;
  }): Promise<{ mount(selector: string): void }>;
};

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_STRIPE_PUBLISHABLE_KEY");
}
const stripeClient = Stripe(STRIPE_PUBLISHABLE_KEY);

const SCORE_KEY = "scorea_resultado_v2_score";
const FACTORS_KEY = "scorea_resultado_v2_factors";
const DAYS_KEY = "scorea_resultado_v2_days";

// Precio único ($299 MXN): se probó un A/B de 3 precios y se decidió quedarse
// con este. El precio real que se cobra SIEMPRE se valida en stripe-checkout
// contra su propia whitelist - nunca nos fiamos de lo que mande el navegador.
const priceVariant = { cents: 29900, wasCents: 69900 };

function formatMxn(cents: number): string {
  return `$${Math.round(cents / 100)}`;
}

function renderPrice() {
  document.getElementById("priceWas")!.textContent = formatMxn(priceVariant.wasCents);
  document.getElementById("priceNow")!.textContent = `${formatMxn(priceVariant.cents)} MXN`;
  document.getElementById("buyBtnPrice")!.textContent = `${formatMxn(priceVariant.cents)} MXN`;
}

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

// Prueba social: todo lo que se muestra sale de get_scorea_social_proof (RPC
// pública, solo agregados, sin PII) - nunca se inventan nombres, ciudades ni
// historias. Si el volumen real es bajo, los widgets simplemente no se
// muestran (ver umbrales abajo) en vez de aparentar una actividad que no
// existe.
const FOMO_SHOWN_KEY = "scorea_resultado_v2_fomo_shown";
const MIN_PURCHASES_FOR_BADGE = 5;
const MAX_MINUTES_FOR_FOMO_TOAST = 180;

interface SocialProof {
  paid_total: number;
  paid_last_7d: number;
  minutes_since_last_sale: number | null;
  live_visitors: number;
}

async function fetchSocialProof(): Promise<SocialProof | null> {
  const { data, error } = await supabase
    .rpc("get_scorea_social_proof", { p_source: SOURCE })
    .single<SocialProof>();
  if (error || !data) return null;
  return data;
}

function formatMinutesAgo(minutes: number): string {
  if (minutes < 1) return "hace instantes";
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return hours === 1 ? "hace 1 hora" : `hace ${hours} horas`;
}

function renderSocialProofRow(proof: SocialProof) {
  const pills: string[] = [];

  if (proof.live_visitors >= 1) {
    const label = proof.live_visitors === 1 ? "1 persona viendo esto ahora" : `${proof.live_visitors} personas viendo esto ahora`;
    pills.push(`<span class="social-pill"><span class="dot"></span>${label}</span>`);
  }

  if (proof.paid_last_7d >= 3) {
    pills.push(`<span class="social-pill">📈 ${proof.paid_last_7d} compraron la guía esta semana</span>`);
  } else if (proof.paid_total >= MIN_PURCHASES_FOR_BADGE) {
    pills.push(`<span class="social-pill">✅ +${proof.paid_total} guías descargadas</span>`);
  }

  const row = document.getElementById("socialProofRow")!;
  if (pills.length === 0) {
    row.classList.remove("show");
    return;
  }
  row.innerHTML = pills.join("");
  row.classList.add("show");
}

function maybeShowFomoToast(proof: SocialProof) {
  if (sessionStorage.getItem(FOMO_SHOWN_KEY)) return;
  if (proof.minutes_since_last_sale == null || proof.minutes_since_last_sale > MAX_MINUTES_FOR_FOMO_TOAST) return;

  const toast = document.getElementById("fomoToast")!;
  const text = document.getElementById("fomoText")!;
  text.innerHTML = `<strong>Alguien compró la guía Scorea</strong>${formatMinutesAgo(proof.minutes_since_last_sale)}`;

  setTimeout(() => {
    toast.classList.add("show");
    sessionStorage.setItem(FOMO_SHOWN_KEY, "1");
    setTimeout(() => toast.classList.remove("show"), 8000);
  }, 4000);
}

document.getElementById("fomoClose")?.addEventListener("click", () => {
  document.getElementById("fomoToast")!.classList.remove("show");
});

async function loadSocialProof() {
  const proof = await fetchSocialProof();
  if (!proof) return;
  renderSocialProofRow(proof);
  maybeShowFomoToast(proof);
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
    p_answers: { resultado_preexistente: true, price_variant_cents: priceVariant.cents },
    p_utm_source: utmSource,
    p_click_id: null,
    p_source: SOURCE,
  });
  if (!error && typeof sessionId === "string") {
    quizSessionId = sessionId;
    trackFunnelEvent("question_reached", "application_completed", SOURCE, quizSessionId);
  }
}

// Escala estándar de Buró de Crédito en México (300-850 puntos).
interface ScoreBand {
  label: string;
  cls: string;
}

function bandForScore(score: number): ScoreBand {
  if (score < 580) return { label: "Deficiente / Malo", cls: "band-deficiente" };
  if (score < 670) return { label: "Razonable / Regular", cls: "band-regular" };
  if (score < 740) return { label: "Bueno", cls: "band-bueno" };
  if (score < 800) return { label: "Muy bueno", cls: "band-muybueno" };
  return { label: "Excelente", cls: "band-excelente" };
}

// El gauge es un semicírculo de 180° (izquierda=300 puntos, derecha=850
// puntos) centrado en (120,120) con radio 78 para la aguja - mismo pivote y
// escala que los arcos de color ya dibujados en el SVG del HTML.
function angleForScore(score: number): number {
  return 180 - ((score - 300) / 550) * 180;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function renderResult() {
  // El score siempre cae en "Deficiente / Malo" (misma premisa que v1: el
  // resultado ya "conocido" es bajo, para justificar la guía de 90 días),
  // en un sub-rango que evita los extremos 300/579 para que se vea creíble.
  const score = getOrCreateNumber(SCORE_KEY, () => 420 + Math.floor(Math.random() * 155));
  const days = getOrCreateNumber(DAYS_KEY, () => 1 + Math.floor(Math.random() * 6));
  const factors = pickFactors();
  const band = bandForScore(score);

  document.getElementById("scoreNumber")!.textContent = String(score);
  document.getElementById("bandLabel")!.textContent = band.label;
  document.getElementById("bandBadge")!.classList.add(band.cls);

  const needleTip = polarToCartesian(120, 120, 78, angleForScore(score));
  const needle = document.getElementById("gaugeNeedle")!;
  needle.setAttribute("x2", String(needleTip.x));
  needle.setAttribute("y2", String(needleTip.y));

  document.getElementById("resultSub")!.textContent =
    `Según tu evaluación en Creditio, tu score en la escala estándar de Buró de Crédito en México (300 a 850 puntos) es de ${score} — rango ${band.label}.`;
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

// Tras volver (o terminar) el pago embebido, el único estado del que nos
// podemos fiar es el que confirma el propio Stripe (vía stripe-session-status,
// que consulta con la secret key) - nunca el query param ?pago=exito a secas,
// ni el hecho de que onComplete se haya disparado en el frontend. La venta
// real (email + PDF + postback) la sigue disparando solo stripe-webhook.
async function checkSessionStatus(sessionId: string | null): Promise<string | null> {
  if (!sessionId) return null;
  const { data, error } = await supabase.functions.invoke("stripe-session-status", {
    body: { sessionId },
  });
  if (error || !data?.status) return null;
  return data.status as string;
}

function showPaidSuccess() {
  resultWrap.classList.remove("show");
  successWrap.classList.add("show");
}

async function startCheckout() {
  const email = emailInput.value.trim();
  if (!email || !email.includes("@")) {
    buyError.textContent = "Escribe un email válido.";
    buyError.classList.add("show");
    return;
  }
  buyError.classList.remove("show");
  emailConfirmBtn.disabled = true;
  emailConfirmBtn.textContent = "Cargando pago…";

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
        returnPath: "/credito-claro-resultado-v2.html",
        clickId,
        embedded: true,
        priceCents: priceVariant.cents,
      },
    });
    if (error || !data?.clientSecret || !data?.sessionId) throw error ?? new Error("Sin clientSecret");
    const { clientSecret, sessionId } = data as { clientSecret: string; sessionId: string };

    if (quizSessionId) {
      trackFunnelEvent("offer_click", "guia_pdf", SOURCE, quizSessionId);
    }

    emailRow.style.display = "none";
    const checkoutContainer = document.getElementById("checkoutContainer")!;
    checkoutContainer.style.display = "block";
    document.getElementById("checkoutNote")!.textContent = "Completa tu pago aquí abajo. Al terminar, te enviamos el PDF por email al instante.";
    // El propio recuadro de Stripe ya muestra nombre, precio y descripción
    // del producto - ocultamos los nuestros para no repetirlo.
    document.getElementById("priceTag")!.style.display = "none";
    document.getElementById("priceDesc")!.style.display = "none";

    const checkout = await stripeClient.createEmbeddedCheckoutPage({
      fetchClientSecret: async () => clientSecret,
      onComplete: () => {
        // onComplete solo dice que Stripe terminó el flujo en el iframe sin
        // navegar fuera - igual se reconfirma el status real antes de mostrar
        // el éxito, por si acaso (pago rechazado tras 3DS, etc.).
        void (async () => {
          const status = await checkSessionStatus(sessionId);
          if (status === "complete") {
            showPaidSuccess();
          } else {
            buyError.textContent = "El pago no se completó. Puedes intentarlo de nuevo.";
            buyError.classList.add("show");
          }
        })();
      },
    });
    checkout.mount("#checkoutContainer");
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

async function init() {
  trackFunnelEvent("page_view", undefined, SOURCE);
  renderResult();
  renderPrice();

  if (pago === "exito") {
    document.getElementById("resultado")!.scrollIntoView();
    const status = await checkSessionStatus(params.get("session_id"));
    if (status === "complete") {
      showPaidSuccess();
    } else {
      // El embedded checkout solo vuelve aquí si el pago ya terminó (éxito o
      // fallo/cancelación) - si no está "complete", simplemente se quedaron
      // sin pagar; dejamos resultWrap visible para que puedan reintentarlo.
      bannerSlot.innerHTML = `<div class="banner banner-warn">Tu pago no se completó. Puedes volver a intentarlo cuando quieras.</div>`;
    }
    return;
  }

  void loadSocialProof();
  // Refresca solo el contador de visitantes en vivo cada 45s - el toast de
  // "alguien compró" ya se marcó como mostrado (FOMO_SHOWN_KEY) y no se repite.
  setInterval(() => void loadSocialProof(), 45000);
  await createSession();
}

void init();
