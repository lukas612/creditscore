import type { Answers } from "../data/witmeQuestions";
import { buildCarCollateralAnswers, type CarCollateralContact } from "./witmeCar";
import { supabase } from "./supabase";

// Flujo independiente "completo - pingtree": mismo endpoint servy-form-wait
// que el ping en background de aval coche/reunificación (ver witmeCar.ts,
// mismo mapeo de campos reutilizado), pero aquí es EL flujo principal, no
// una comparación silenciosa. Los tres servy_id se piden juntos en la misma
// petición y, si Witme devuelve redirectUrl, el llamador redirige ahí en
// vez de mostrar la página de resultados propia.
const SERVY_ID_PINGTREE = 151; // Creditio Pingtree
const SERVY_ID_DEBT_CONSOLIDATION = 154; // Créditos a deudas
const SERVY_ID_CAR_COLLATERAL = 171; // Aval coche

export interface PingtreeResult {
  redirectUrl: string | null;
  succeeded: boolean;
}

export async function submitPingtreeLead(
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
          servy_id: SERVY_ID_PINGTREE,
          servy_id_2: SERVY_ID_DEBT_CONSOLIDATION,
          servy_id_3: SERVY_ID_CAR_COLLATERAL,
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
        answers: buildCarCollateralAnswers(answers, contact),
      },
    });
    if (error) throw error;
    const redirectUrl = typeof data?.redirectUrl === "string" ? data.redirectUrl : null;
    return { redirectUrl, succeeded: true };
  } catch {
    return { redirectUrl: null, succeeded: false };
  }
}
