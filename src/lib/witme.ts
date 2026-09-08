import type { Answers } from "../data/witmeQuestions";
import { supabase } from "./supabase";

const BOOLEAN_FIELDS = ["hasOwnVehicle", "hasBankAccount", "hasOtherLoans", "badCreditHistory"];

export function buildWitmeDataPayload(answers: Answers): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(answers)) {
    if (key === "consentPrivacy") continue;
    data[key] = BOOLEAN_FIELDS.includes(key) ? value === "si" : value;
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

const LENDER_OFFERS_MAX_ATTEMPTS = 5;
const LENDER_OFFERS_TARGET = 3;
const LENDER_OFFERS_DELAY_MS = 1000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Llama repetidamente a submitWitmeApplication (con 1s entre intentos) hasta
// reunir hasta 3 redirectUrl reales, o agotar los intentos. IMPORTANTE:
// redirectUrl solo llega con sandbox:false en producción (así lo documenta
// Witme) — mientras la Edge Function fuerce sandbox:true, esto nunca
// devolverá ofertas. No confirmado con Witme si repetir la misma solicitud
// hace que su pingtree la enrute a prestamistas distintos cada vez; se usa
// un externalId distinto por intento para que, como mínimo, cada llamada se
// identifique como un intento separado en su sistema.
export interface LenderOffersResult {
  offers: LenderOffer[];
  anySucceeded: boolean;
}

export async function collectWitmeLenderOffers(
  answers: Answers,
  clickId: string | null,
  utmSource: string | null,
  baseExternalId: string,
): Promise<LenderOffersResult> {
  const offers: LenderOffer[] = [];
  let anySucceeded = false;

  for (let attempt = 0; attempt < LENDER_OFFERS_MAX_ATTEMPTS && offers.length < LENDER_OFFERS_TARGET; attempt++) {
    if (attempt > 0) await delay(LENDER_OFFERS_DELAY_MS);
    try {
      const result = await submitWitmeApplication(answers, clickId, utmSource, `${baseExternalId}-${attempt}`);
      anySucceeded = true;
      if (result.redirectUrl) {
        offers.push({ url: result.redirectUrl });
      }
    } catch {
      // un intento fallido no debe cortar el resto
    }
  }

  return { offers, anySucceeded };
}
