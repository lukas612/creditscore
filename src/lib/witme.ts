import type { Answers } from "../data/witmeQuestions";
import { supabase } from "./supabase";

const BOOLEAN_FIELDS = ["hasOwnVehicle", "hasBankAccount", "hasOtherLoans", "badCreditHistory"];

// Si Witme no responde en este tiempo, cortamos en vez de dejar al usuario
// esperando indefinidamente (relevante ahora que encadenamos hasta 5
// llamadas seguidas, ver MAX_WITME_ATTEMPTS más abajo).
const WITME_TIMEOUT_MS = 20_000;

// Campos que solo se preguntan bajo una condición (p.ej. bankAccountNumber
// solo si hasBankAccount==="si"): cuando no aplican, nunca llegan a
// `answers`. Witme los exige presentes igualmente (hemos visto fallar un
// envío real con "The data.bank account number field is required." pese a
// que el usuario respondió que no tenía cuenta), así que se rellenan con un
// valor vacío en vez de omitirlos.
const CONDITIONAL_FIELD_DEFAULTS: Record<string, string | number> = {
  totalDebtAmount: 0,
  vehicleType: "",
  hasFinancedVehicle: "",
  vehiclePlate: "",
  bankAccountNumber: "",
};

export function buildWitmeDataPayload(answers: Answers): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(answers)) {
    if (key === "consentPrivacy") continue;
    data[key] = BOOLEAN_FIELDS.includes(key) ? value === "si" : value;
  }
  for (const [key, defaultValue] of Object.entries(CONDITIONAL_FIELD_DEFAULTS)) {
    if (!(key in data)) data[key] = defaultValue;
  }
  return data;
}

export interface WitmeSubmitResult {
  id: number;
  status: string;
  message: unknown;
  redirectUrl: string | null;
}

export async function submitWitmeApplication(
  answers: Answers,
  clickId: string | null,
  utmSource: string | null,
  externalId?: string,
): Promise<WitmeSubmitResult> {
  const { data, error } = await supabase.functions.invoke("witme-proxy", {
    body: {
      action: "submit",
      clickId,
      utmSource,
      externalId,
      sentFrom: window.location.href,
      data: buildWitmeDataPayload(answers),
      tracking: {
        source: utmSource ?? "",
        medium: "",
        campaign: "",
        term: "",
        content: "",
      },
    },
    timeout: WITME_TIMEOUT_MS,
  });
  if (error) throw error;
  return data as WitmeSubmitResult;
}

export interface LenderOffer {
  id: string;
  url: string;
}

export interface WitmeOfferResult {
  offer: LenderOffer | null;
  succeeded: boolean;
}

// Cuántas veces, como máximo, insistimos a Witme por más ofertas para la
// misma solicitud (ver requestWitmeLenderOffer).
export const MAX_WITME_ATTEMPTS = 5;

export function witmeOfferId(attempt: number): string {
  return attempt === 1 ? "witme_featured" : `witme_featured_${attempt}`;
}

// Una sola llamada a Witme: si devuelve redirectUrl, esa es una oferta
// destacada (identificada por offerId); si no, el resultado se combina con
// las ofertas estáticas de siempre. El llamador decide cuántas veces repetir
// esta llamada (ver MAX_WITME_ATTEMPTS) para ir completando la cascada de
// prestamistas de Witme con la misma solicitud.
export async function requestWitmeLenderOffer(
  answers: Answers,
  clickId: string | null,
  utmSource: string | null,
  externalId: string,
  offerId: string,
): Promise<WitmeOfferResult> {
  try {
    const result = await submitWitmeApplication(answers, clickId, utmSource, externalId);
    return { offer: result.redirectUrl ? { id: offerId, url: result.redirectUrl } : null, succeeded: true };
  } catch {
    return { offer: null, succeeded: false };
  }
}
