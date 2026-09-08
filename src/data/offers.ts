export interface CreditOffer {
  id: string;
  name: string;
  description: string;
  buildUrl: (clickId: string | null) => string;
}

// Identifica este funnel ante los partners que aceptan utm_source (no tenemos
// {trafficsource.name}/{var7} reales en este contexto, son macros de la propia
// red de tracking del partner).
const UTM_SOURCE = "creditioscore";

export const CREDIT_OFFERS: CreditOffer[] = [
  {
    id: "moneya",
    name: "Moneya",
    description: "Hasta 1.000 € en menos de 15 minutos, sin papeleo.",
    buildUrl: (clickId) => {
      const params = new URLSearchParams({
        form_id: "moneya-pingtree-v3",
        h_title: "Tu dinero disponible en menos de 15 minutos.",
        h_checks:
          "Aprobación 100% Inmediata:,Sin Papeleo ni Explicaciones,Alta Tasa de Aceptación,100% seguro 🔒",
        f_months: "12",
        f_amount: "1000",
        f_cta: "VER CUANTO PUEDO PEDIR Y CONDICIONES SIN COMPROMISO",
        f_sub_cta: "⌛Respuesta inmediata | 🟢Alta aprobación",
        utm_source: UTM_SOURCE,
      });
      if (clickId) params.set("servy_click", clickId);
      return `https://moneya.es/v2?${params.toString()}`;
    },
  },
  {
    id: "instadinero",
    name: "InstaDinero Card",
    description: "Tarjeta de hasta 6.000 €, sin cuota anual, a plazos.",
    buildUrl: (clickId) => {
      const params = new URLSearchParams({
        utm_source: UTM_SOURCE,
        h_title: "¡CONOCE LA NUEVA INSTADINERO CARD!",
        h_subtitle: "Hasta 6.000€,Sin cuota anual,Paga en cómodos plazos",
        h_image: "https://imgpnt.creditio.es/images/6826a61fa0a80184.png",
        f_amount: "1500",
        f_months: "36",
        f_cta: "Solicitar tarjeta",
        f_sub_cta: "Quedan 18 este mes",
      });
      if (clickId) params.set("servy_click", clickId);
      return `https://instadinero.com/v2?${params.toString()}`;
    },
  },
  {
    id: "financiar24",
    name: "Financiar24",
    description: "Compara condiciones de financiación personal.",
    buildUrl: (clickId) => {
      const params = new URLSearchParams({
        offer_id: "190",
        aff_id: "1166",
        aff_sub2: "Financiar24_ES",
      });
      if (clickId) params.set("aff_click_id", clickId);
      return `https://tracking.draivimedia.com/aff_c?${params.toString()}`;
    },
  },
  {
    id: "prestalight",
    name: "Prestalight",
    description: "Préstamos rápidos y flexibles, 100% online.",
    buildUrl: (clickId) => {
      const params = new URLSearchParams({ utm_source: "creditio" });
      if (clickId) params.set("clickid", clickId);
      return `https://prestalight.es/?${params.toString()}`;
    },
  },
];

// Enlace de "Hablar con un asesor": lleva a la landing real de solicitud de
// préstamo de Creditio, no a un partner externo.
export function buildAdvisorUrl(clickId: string | null): string {
  const params = new URLSearchParams({
    h_title: "Tu Préstamo Personal Online: Flexible, Rápido y Seguro",
    h_subtitle:
      "Solicita desde 1.000€ hasta 75.000€ para lo que necesites . Sin cambiar de banco y con respuesta inmediata.",
    f_claim:
      "Solicita desde 1.000€ hasta 75.000€ para lo que necesites (Coche, Reforma, Viajes...). Sin cambiar de banco y con respuesta inmediata.",
    utm_source: UTM_SOURCE,
  });
  if (clickId) params.set("servy_click", clickId);
  return `https://creditio.es/home-v3?${params.toString()}`;
}
