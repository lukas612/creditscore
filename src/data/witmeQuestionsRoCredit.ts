export type { Answers } from "./witmeQuestions";
import { WITME_QUESTIONS_RO } from "./witmeQuestionsRo";

// "Credit RO": landing de crédito directo (no de score), formato multiping
// (cascada a Witme), pero SOLO con los campos que exige de verdad la
// plantilla real de Witme (creditio-pingtree-ro-v5, confirmado campo a
// campo vía Witme_Forms - 17 campos, todos required:true). Se reutilizan
// las mismas preguntas/opciones que witmeQuestionsRo.ts (misma fuente de
// verdad) filtrando solo las que son obligatorias, sin las 6 preguntas que
// añadimos solo para poder calcular un score (hasOwnedHouse,
// numberOfdependents, badCreditHistory, hasOtherLoans, totalDebtAmount,
// monthlyDebtPayment): esta landing no calcula ningún score.
//
// Orden pensado para conversión: importe primero (pregunta más concreta y
// motivadora, igual que el propio título del step 0 de Witme, "Cât de mulți
// bani aveți nevoie?"), luego propósito; tras el gate, el resto en el mismo
// orden que la plantilla real de Witme (step 1: nacimiento, ingresos,
// estado civil, domicilio).
//
// A diferencia de Multiping RO (una pregunta por pantalla, vía WitmeForm),
// aquí se agrupan varios campos por pantalla - igual que hacen los propios
// steps de Witme - así que los componentes CreditRoLoanStep/
// CreditRoDetailsForm buscan cada pregunta por clave en este array en vez
// de recorrerlo pregunta a pregunta.
const REQUIRED_KEYS = [
  "requestedAmount",
  "loanPurpose",
  "dateOfBirth",
  "incomeSource",
  "employmentStartDate",
  "monthlyIncome",
  "maritalStatus",
  "idNumber",
  "city",
  "zipCode",
  "address",
  "houseNumber",
];

const questionByKey = new Map(WITME_QUESTIONS_RO.map((q) => [q.key, q]));
export const WITME_QUESTIONS_RO_CREDIT = REQUIRED_KEYS.map((key) => questionByKey.get(key)).filter(
  (q): q is NonNullable<typeof q> => q != null,
);

export function creditQuestion(key: string) {
  const q = WITME_QUESTIONS_RO_CREDIT.find((question) => question.key === key);
  if (!q) throw new Error(`Pregunta no encontrada en WITME_QUESTIONS_RO_CREDIT: ${key}`);
  return q;
}
