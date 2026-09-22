import type { Answers } from "../data/witmeQuestionsRo";
import { buildCarCollateralAnswers, type CarCollateralContact } from "./witmeCar";
import { supabase } from "./supabase";

// Multiping RO: mismo mecanismo que el prestamista normal de España
// (servy-form-wait, ver witme.ts), pero con servy_id 259 (confirmado con un
// envío real de creditio-pingtree-ro-v5) y sin el requisito de cuenta
// bancaria de España (Rumanía no lo pide). Se añade el campo
// "multitude-politica-de-privacidad" que exige la plantilla real de RO
// (consentimiento de cesión de datos al Biroul de Credit para Ferratum).
const SERVY_ID_LENDER_RO = 259;

export interface WitmeSubmitResult {
  id: number;
  status: string;
  message: unknown;
  redirectUrl: string | null;
}

function contactFromAnswers(answers: Answers): CarCollateralContact {
  return {
    name: String(answers.name ?? ""),
    lastName: String(answers.lastName ?? ""),
    email: String(answers.email ?? ""),
    phoneNumber: String(answers.phoneNumber ?? ""),
  };
}

export async function submitWitmeApplicationRo(
  answers: Answers,
  clickId: string | null,
  utmSource: string | null,
  formId: string,
  externalId?: string,
): Promise<WitmeSubmitResult> {
  const { data, error } = await supabase.functions.invoke("witme-proxy", {
    body: {
      action: "submit_lender",
      formId,
      clickId,
      utmSource,
      externalId,
      sentFrom: window.location.href,
      vars: {
        servy_id: SERVY_ID_LENDER_RO,
        servy_id_2: null,
        servy_id_3: null,
        origin: "2",
        country: "RO",
        credit_to_debt_sent: false,
        skip_debts: "0",
      },
      hidden: {
        svyid: clickId ?? "",
        servy_click: clickId ?? "",
        utm_source: utmSource ?? "",
      },
      answers: {
        ...buildCarCollateralAnswers(answers, contactFromAnswers(answers)),
        "multitude-politica-de-privacidad": true,
      },
    },
  });
  if (error) throw error;
  return data as WitmeSubmitResult;
}

// Witme ya manda lender_name/lender_logo en la redirectUrl para España (ver
// parseLenderInfo en witme.ts), pero de momento solo los mostramos ahí - en
// RO se dejan a null para no cambiar el comportamiento actual mientras no
// se confirme el mismo formato aquí.
export interface LenderOffer {
  id: string;
  url: string;
  lenderName: string | null;
  lenderLogo: string | null;
}

export interface WitmeOfferResult {
  offer: LenderOffer | null;
  succeeded: boolean;
}

export const MAX_WITME_ATTEMPTS_RO = 5;

export function witmeOfferIdRo(attempt: number): string {
  return attempt === 1 ? "witme_featured" : `witme_featured_${attempt}`;
}

export async function requestWitmeLenderOfferRo(
  answers: Answers,
  clickId: string | null,
  utmSource: string | null,
  formId: string,
  externalId: string,
  offerId: string,
): Promise<WitmeOfferResult> {
  try {
    const result = await submitWitmeApplicationRo(answers, clickId, utmSource, formId, externalId);
    return {
      offer: result.redirectUrl ? { id: offerId, url: result.redirectUrl, lenderName: null, lenderLogo: null } : null,
      succeeded: true,
    };
  } catch {
    return { offer: null, succeeded: false };
  }
}
