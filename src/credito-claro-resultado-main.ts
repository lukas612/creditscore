import { supabase } from "./lib/supabase";
import { trackFunnelEvent } from "./lib/funnel";
import { getClickId, fireServyPostback } from "./lib/postback";

// Scorea "Resultado" (MX): página de aterrizaje para tráfico de pago directo,
// sin quiz. A diferencia de credito-claro-main.ts, la premisa es que la
// persona ya pasó por Creditio y su score ya se "conoce" (bajo) - por eso el
// número y los factores se generan una sola vez por sesión (no en cada
// recarga, para que no parezca que se está recalculando en vivo) y no hay
// llamada a calculate_score_mx. El resto del flujo de venta (email -> Stripe
// -> PDF por email) es idéntico al de credito-claro-main.ts, salvo que el
// pago ocurre embebido en esta misma página (Stripe Embedded Checkout) en
// vez de redirigir a checkout.stripe.com - de ahí el <script src="js.stripe.com">
// en el head y el cliente `Stripe(...)` global de abajo.
const SOURCE = "credito_claro_mx_resultado";

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

const SCORE_KEY = "scorea_resultado_score";
const FACTORS_KEY = "scorea_resultado_factors";
const DAYS_KEY = "scorea_resultado_days";

// A/B test de precios: variante aleatoria pero estable por visitante
// (sessionStorage), igual de probable cada una. El precio real que se cobra
// SIEMPRE se valida en stripe-checkout contra esta misma whitelist - nunca
// nos fiamos de lo que mande el navegador. Cada variante guarda su propio
// "antes" como ancla de descuento, manteniendo una proporción parecida al
// 149/349 original.
const PRICE_VARIANT_KEY = "scorea_price_variant_cents";
interface PriceVariant {
  cents: number;
  wasCents: number;
}
const PRICE_VARIANTS: PriceVariant[] = [
  { cents: 4900, wasCents: 14900 },
  { cents: 14900, wasCents: 34900 },
  { cents: 29900, wasCents: 69900 },
];

function formatMxn(cents: number): string {
  return `$${Math.round(cents / 100)}`;
}

function getPriceVariant(): PriceVariant {
  const stored = sessionStorage.getItem(PRICE_VARIANT_KEY);
  if (stored) {
    const found = PRICE_VARIANTS.find((v) => String(v.cents) === stored);
    if (found) return found;
  }
  const variant = PRICE_VARIANTS[Math.floor(Math.random() * PRICE_VARIANTS.length)];
  sessionStorage.setItem(PRICE_VARIANT_KEY, String(variant.cents));
  return variant;
}

const priceVariant = getPriceVariant();

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
const FOMO_SHOWN_KEY = "scorea_resultado_fomo_shown";
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
        returnPath: "/credito-claro-resultado.html",
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
