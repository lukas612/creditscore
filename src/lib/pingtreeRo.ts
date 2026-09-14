import type { Answers } from "../data/witmeQuestionsRo";
import { buildCarCollateralAnswers, type CarCollateralContact } from "./witmeCar";
import { supabase } from "./supabase";

// Pingtree RO: mismo mecanismo que Pingtree España (una sola petición a
// servy-form-wait, redirect directo si hay oferta), pero con un solo
// servy_id (259, confirmado con un envío real) - no hay equivalente rumano
// de aval-coche/reunificación todavía, así que servy_id_2/3 van vacíos.
const SERVY_ID_PINGTREE_RO = 259;

export interface PingtreeResult {
  redirectUrl: string | null;
  succeeded: boolean;
}

export async function submitPingtreeLeadRo(
  answers: Answers,
  contact: CarCollateralContact,
  clickId: string | null,
  utmSource: string | null,
  externalId: string,
): Promise<PingtreeResult> {
  try {
    const { data, error } = await supabase.functions.invoke("witme-proxy", {
      body: {
        action: "submit_pingtree",
        externalId,
        sentFrom: window.location.href,
        vars: {
          servy_id: SERVY_ID_PINGTREE_RO,
          servy_id_2: null,
          servy_id_3: null,
          origin: "2",
          country: "RO",
          credit_to_debt_sent: false,
          skip_debts: "0",
          only_pingtree: "0",
        },
        hidden: {
          svyid: clickId ?? "",
          servy_click: clickId ?? "",
          utm_source: utmSource ?? "",
        },
        answers: {
          ...buildCarCollateralAnswers(answers, contact),
          "multitude-politica-de-privacidad": true,
        },
      },
    });
    if (error) throw error;
    const redirectUrl = typeof data?.redirectUrl === "string" ? data.redirectUrl : null;
    return { redirectUrl, succeeded: true };
  } catch {
    return { redirectUrl: null, succeeded: false };
  }
}
