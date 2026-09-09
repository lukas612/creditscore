import type { Answers } from "../data/witmeQuestions";
import { supabase } from "./supabase";

const BOOLEAN_FIELDS = ["hasOwnVehicle", "hasBankAccount", "hasOtherLoans", "badCreditHistory"];

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
  });
  if (error) throw error;
  return data as WitmeSubmitResult;
}

export interface LenderOffer {
  url: string;
}

export interface WitmeOfferResult {
  offer: LenderOffer | null;
  succeeded: boolean;
}

// Una sola llamada a Witme (sin reintentos): si devuelve redirectUrl, esa es
// la oferta destacada; si no, el resultado se combina con las ofertas
// estáticas de siempre.
export async function requestWitmeLenderOffer(
  answers: Answers,
  clickId: string | null,
  utmSource: string | null,
  externalId: string,
): Promise<WitmeOfferResult> {
  try {
    const result = await submitWitmeApplication(answers, clickId, utmSource, externalId);
    return { offer: result.redirectUrl ? { url: result.redirectUrl } : null, succeeded: true };
  } catch {
    return { offer: null, succeeded: false };
  }
}
