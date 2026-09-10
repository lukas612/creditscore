import type { Answers } from "../data/witmeQuestions";
import { buildCarCollateralAnswers, type CarCollateralContact } from "./witmeCar";
import { supabase } from "./supabase";

export interface WitmeSubmitResult {
  id: number;
  status: string;
  message: unknown;
  redirectUrl: string | null;
}

// Prestamista normal: antes llamaba a leads/new (la API "de siempre" de
// Witme); ahora usa el mismo endpoint servy-form-wait que aval coche/
// reunificación y Pingtree, con su propio servy_id (375), en paralelo a
// esos otros servicios que se siguen disparando aparte sin cambios. Mismo
// mapeo de campos reutilizado (buildCarCollateralAnswers).
const SERVY_ID_LENDER = 375;

function contactFromAnswers(answers: Answers): CarCollateralContact {
  return {
    name: String(answers.name ?? ""),
    lastName: String(answers.lastName ?? ""),
    email: String(answers.email ?? ""),
    phoneNumber: String(answers.phoneNumber ?? ""),
  };
}

export async function submitWitmeApplication(
  answers: Answers,
  clickId: string | null,
  utmSource: string | null,
  externalId?: string,
): Promise<WitmeSubmitResult> {
  const { data, error } = await supabase.functions.invoke("witme-proxy", {
    body: {
      action: "submit_lender",
      clickId,
      utmSource,
      externalId,
      sentFrom: window.location.href,
      vars: {
        servy_id: SERVY_ID_LENDER,
        servy_id_2: null,
        servy_id_3: null,
        origin: "2",
        country: "ES",
        credit_to_debt_sent: false,
        skip_debts: "0",
        only_pingtree: "0",
      },
      hidden: {
        svyid: clickId ?? "",
        servy_click: clickId ?? "",
        utm_source: utmSource ?? "",
      },
      answers: buildCarCollateralAnswers(answers, contactFromAnswers(answers)),
    },
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
