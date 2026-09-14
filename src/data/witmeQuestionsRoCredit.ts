import type { WitmePhase } from "./witmeQuestions";
export type { Answers } from "./witmeQuestions";
import type { Answers } from "./witmeQuestions";
import { RO_WITME_PHASES, WITME_QUESTIONS_RO } from "./witmeQuestionsRo";

// "Credit RO": landing de crédito directo (no de score), formato multiping
// (cascada a Witme), pero SOLO con los campos que exige de verdad la
// plantilla real de Witme (creditio-pingtree-ro-v5, confirmado campo a
// campo vía Witme_Forms - 17 campos, todos required:true). Se reutilizan
// las mismas preguntas/opciones que witmeQuestionsRo.ts (misma fuente de
// verdad) filtrando solo las que son obligatorias, sin las 6 preguntas que
// añadimos solo para poder calcular un score (hasOwnedHouse,
// numberOfdependents, badCreditHistory, hasOtherLoans, totalDebtAmount,
// monthlyDebtPayment): esta landing no calcula ningún score.
// Orden pensado para conversión: importe primero (pregunta más concreta y
// motivadora, igual que el propio título del step 0 de Witme, "Cât de mulți
// bani aveți nevoie?"), luego propósito; tras el gate, el resto en el mismo
// orden que la plantilla real de Witme (step 1: nacimiento, ingresos,
// estado civil, domicilio).
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

// Antes del "gate" (captación de contacto): solo importe + propósito, para
// no pedir nada antes de lo imprescindible y maximizar el engagement inicial.
const PRE_GATE_PHASE_KEYS: WitmePhase[] = ["solicitud"];
// Después del gate: el resto de campos obligatorios de Witme.
const POST_GATE_PHASE_KEYS: WitmePhase[] = ["perfil", "finanzas", "identidad", "domicilio"];

export const CREDIT_RO_PRE_GATE_PHASES = RO_WITME_PHASES.filter((p) => PRE_GATE_PHASE_KEYS.includes(p.key));
export const CREDIT_RO_POST_GATE_PHASES = RO_WITME_PHASES.filter((p) => POST_GATE_PHASE_KEYS.includes(p.key));

function visibleFor(phaseKeys: WitmePhase[]) {
  return (answers: Answers) =>
    WITME_QUESTIONS_RO_CREDIT.filter((q) => phaseKeys.includes(q.phase) && (!q.condition || q.condition(answers)));
}

export const visiblePreGateQuestions = visibleFor(PRE_GATE_PHASE_KEYS);
export const visiblePostGateQuestions = visibleFor(POST_GATE_PHASE_KEYS);
