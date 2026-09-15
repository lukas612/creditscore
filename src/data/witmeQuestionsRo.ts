import type { WitmePhase, WitmeQuestionDef, Option } from "./witmeQuestions";
export type { Answers } from "./witmeQuestions";
import type { Answers } from "./witmeQuestions";

// Mismo patrón que witmeQuestions.ts (España): "perfil"+"finanzas"+"solicitud"
// se piden antes del gate (todo lo que hace falta para calcular el score),
// "identidad"+"domicilio" después del gate. Sin fase "patrimonio": Rumanía
// no tiene vehículo propio ni cuenta bancaria en su formulario de Witme
// (creditio-pingtree-ro-v5), así que no se piden.
export const RO_SCORE_PHASE_KEYS: WitmePhase[] = ["perfil", "finanzas", "solicitud"];
export const RO_EXTRA_PHASE_KEYS: WitmePhase[] = ["identidad", "domicilio"];

export const RO_WITME_PHASES: { key: WitmePhase; label: string }[] = [
  { key: "perfil", label: "Profilul tău" },
  { key: "finanzas", label: "Finanțe" },
  { key: "solicitud", label: "Solicitarea ta" },
  { key: "identidad", label: "Identitate" },
  { key: "domicilio", label: "Domiciliu" },
];

export const RO_SCORE_PHASES = RO_WITME_PHASES.filter((p) => RO_SCORE_PHASE_KEYS.includes(p.key));
export const RO_EXTRA_PHASES = RO_WITME_PHASES.filter((p) => RO_EXTRA_PHASE_KEYS.includes(p.key));

// Mismos valores canónicos que España (confirmado con un envío real: p.ej.
// fuente-principal-de-ingreso="Cuenta ajena (Tiempo completo)", estado-civil
// ="Soltero/Soltera") - solo cambia la etiqueta mostrada, traducida al
// rumano, tal cual aparece en la plantilla real de Witme (creditio-pingtree-ro-v5).
const INCOME_SOURCE_OPTIONS_RO: Option[] = [
  { value: "Cuenta ajena (Tiempo completo)", label: "Contract de muncă (Timp complet)" },
  { value: "Cuenta ajena (Tiempo parcial)", label: "Contract de muncă (Timp parțial)" },
  { value: "Cuenta ajena (Temporal)", label: "Contract de muncă (Temporar)" },
  { value: "Autónomos", label: "Persoană fizică autorizată (PFA)" },
  { value: "Funcionario", label: "Funcționar public" },
  { value: "Militar", label: "Militar" },
  { value: "Estudiante", label: "Student" },
  { value: "Pensionista", label: "Pensionar" },
  { value: "Ama de casa", label: "Casnic(ă)" },
  { value: "Parado", label: "Șomer" },
  { value: "Otro", label: "Altul" },
];

// No se pide fecha de inicio de actividad / ingresos a quien no tiene una
// fuente de ingreso "activa" - misma condición que la plantilla real de
// Witme (creditio-pingtree-ro-v5, step 2).
const NO_EMPLOYMENT_START_SOURCES = ["Parado", "Ama de casa", "Militar", "Estudiante"];
const NO_INCOME_SOURCES = ["Parado", "Ama de casa", "Estudiante"];

const MARITAL_STATUS_OPTIONS_RO: Option[] = [
  { value: "Soltero/Soltera", label: "Necăsătorit(ă)" },
  { value: "Casado/Casada", label: "Căsătorit(ă)" },
  { value: "Divorciado/Divorciada", label: "Divorțat(ă)" },
  { value: "Viudo/Viuda", label: "Văduv(ă)" },
];

// Propósito del préstamo: a diferencia de fuente de ingreso/estado civil,
// aquí los VALORES están en rumano (no comparten cadena con España) -
// confirmado con la plantilla real, valor por valor.
const LOAN_PURPOSE_OPTIONS_RO: Option[] = [
  { value: "Achiziție mașină / motocicletă", label: "Achiziție mașină / motocicletă" },
  { value: "Achiziție locuință / ipotecă", label: "Achiziție locuință / ipotecă" },
  { value: "Achiziție telefon sau tehnologie", label: "Achiziție telefon sau tehnologie" },
  { value: "Eco & panouri solare", label: "Eco & panouri solare" },
  { value: "Renovări", label: "Renovări" },
  { value: "Educație", label: "Educație" },
  { value: "Costuri neprevăzute", label: "Costuri neprevăzute" },
  { value: "Cheltuieli medicale", label: "Cheltuieli medicale" },
  { value: "Consolidarea datoriilor", label: "Consolidarea datoriilor" },
  { value: "Timp liber", label: "Timp liber" },
  { value: "Altele", label: "Altele" },
];

// Lista cerrada real de ciudades que acepta la plantilla de Witme
// (creditio-pingtree-ro-v5, campo "ciudad") - no es traducción, son los
// valores tal cual los valida Witme.
const CITY_OPTIONS_RO: Option[] = [
  "Alesd", "Alba Iulia", "Alexandria", "Arad", "Babeni", "Bacau", "Baia de Arama", "Baia de Aries",
  "Baia Mare", "Baicoi", "Baile Govora", "Baile Herculane", "Baile Olanesti", "Baile Tusnad", "Bailesti",
  "Balan", "Balcesti", "Bals", "Barlad", "Beius", "Berbesti", "Beresti", "Bistrita", "Bocsa",
  "Boldesti-Scaeni", "Borsa", "Botosani", "Bragadiru", "Braila", "Brasov", "Brosteni", "Bucuresti",
  "Budesti", "Buftea", "Buhusi", "Bumbesti-Jiu", "Busteni", "Buzau", "Buzias", "Calan", "Calarasi",
  "Calimanesti", "Campeni", "Campia Turzii", "Campina", "Campulung", "Campulung Moldovenesc", "Caracal",
  "Caransebes", "Cazanesti", "Cernavoda", "Chisineu-Cris", "Cisnadie", "Cluj", "Cluj-Napoca", "Comanesti",
  "Constanta", "Copsa Mica", "Costesti", "Craiova", "Curtea de Arges", "Dabuleni", "Darmanesti", "Dej",
  "Deva", "Draganesti-Olt", "Dragasani", "Dragomiresti", "Drobeta Turnu-Severin", "Dudu", "Dumbraveni",
  "Fagaras", "Faget", "Falticeni", "Faurei", "Fetesti", "Fierbinti-Targ", "Filiasi", "Flamanzi", "Floresti",
  "Focsani", "Galati", "Gaesti", "Gataia", "Giurgiu", "Harlau", "Harsova", "Hateg", "Hunedoara", "Husi",
  "Iasi", "Insuratei", "Intorsura Buzaului", "Lehliu Gara", "Ludus", "Lugoj", "Macin", "Magurele",
  "Mangalia", "Marasesti", "Medgidia", "Medias", "Miercurea Ciuc", "Mihailesti", "Milisauti", "Mioveni",
  "Moinesti", "Moldova Noua", "Nadlac", "Nasaud", "Navodari", "Negresti", "Negresti-Oas", "Negru Voda",
  "Ocna Mures", "Odobesti", "Odorheiul Secuiesc", "Oltenita", "Onesti", "Oradea", "Orastie", "Oravita",
  "Orsova", "Otelu Rosu", "Pancota", "Pascani", "Patarlagele", "Petrosani", "Piatra Neamt", "Pitesti",
  "Ploiesti", "Popesti-Leordeni", "Racari", "Radauti", "Ramnicu Sarat", "Ramnicu Valcea", "Rasnov",
  "Recas", "Reghin", "Resita", "Roman", "Rosiorii de Vede", "Rovinaria", "Sacele", "Sacueni", "Saliste",
  "Salistea de Sus", "Sangeorgiu de Padure", "Sangeorz-Bai", "Sannicolau Mare", "Santana", "Sarmasu",
  "Satu Mare", "Saveni", "Scornicesti", "Sebes", "Sebis", "Sfantu Gheorghe", "Sibiu", "Sighetu Marmatiei",
  "Sighisoara", "Simleu Silvaniei", "Slatina", "Slanic", "Slanic-Moldova", "Slobozia", "Somcuta Mare",
  "Stefanesti, Arges", "Stefanesti, Botosani", "Stei", "Suceava", "Talmaciu", "Tandarei", "Targoviste",
  "Targu Bujor", "Targu Carbunesti", "Targu Frumos", "Targu Jiu", "Targu Lapus", "Targu Mures",
  "Targu Neamt", "Targu Ocna", "Targu Secuiesc", "Tarnaveni", "Tasnad", "Tautii-Magheraus", "Tecuci",
  "Teius", "Ticleni", "Timisoara", "Toplita", "Tulcea", "Turda", "Turnu Magurele", "Urlati", "Urziceni",
  "Valenii de Munte", "Vanju Mare", "Vascau", "Vaslui", "Videle", "Viseu de Sus", "Vlahita", "Vulcan",
  "Zalau", "Zarnesti",
].map((v) => ({ value: v, label: v }));

export const WITME_QUESTIONS_RO: WitmeQuestionDef[] = [
  // Profilul tău (antes del gate)
  { key: "dateOfBirth", label: "Care este data ta de naștere?", type: "date", phase: "perfil" },

  // Finanțe (antes del gate)
  { key: "incomeSource", label: "Care este sursa ta principală de venit?", type: "select", phase: "finanzas", options: INCOME_SOURCE_OPTIONS_RO },
  {
    key: "employmentStartDate",
    label: "Din ce dată ești în activitatea ta actuală?",
    type: "date",
    phase: "finanzas",
    condition: (a) => !NO_EMPLOYMENT_START_SOURCES.includes(String(a.incomeSource ?? "")),
  },
  {
    key: "monthlyIncome",
    label: "Care este venitul tău lunar net?",
    type: "number",
    phase: "finanzas",
    suffix: "LEI/lună",
    min: 0,
    max: 100000,
    placeholder: "3700",
    condition: (a) => !NO_INCOME_SOURCES.includes(String(a.incomeSource ?? "")),
  },
  // Simplificada a Da/Nu: como select de 4 opciones tenía ~15% de caída,
  // muy por encima de las preguntas vecinas (2-7%) - ver funnel_events.
  { key: "hasOwnedHouse", label: "Deții o locuință în proprietate?", type: "yesno", phase: "finanzas" },
  {
    key: "numberOfdependents",
    label: "Câte persoane depind financiar de tine?",
    type: "number",
    phase: "finanzas",
    min: 0,
    max: 15,
    placeholder: "0",
  },
  { key: "badCreditHistory", label: "Ai în prezent restanțe la Biroul de Credit?", type: "yesno", phase: "finanzas" },
  { key: "hasOtherLoans", label: "Ai în prezent alte credite sau datorii?", type: "yesno", phase: "finanzas" },
  {
    key: "totalDebtAmount",
    label: "Care este suma totală a acelor datorii?",
    type: "number",
    phase: "finanzas",
    suffix: "LEI",
    min: 0,
    max: 5000000,
    placeholder: "20000",
    condition: (a) => a.hasOtherLoans === "si",
  },
  {
    key: "monthlyDebtPayment",
    label: "Cât plătești lunar pentru acele datorii?",
    type: "number",
    phase: "finanzas",
    suffix: "LEI",
    min: 0,
    max: 100000,
    placeholder: "500",
    condition: (a) => a.hasOtherLoans === "si",
  },

  // Solicitarea ta (antes del gate)
  { key: "loanPurpose", label: "Pentru ce aveți nevoie de bani?", type: "select", phase: "solicitud", options: LOAN_PURPOSE_OPTIONS_RO },
  {
    key: "requestedAmount",
    label: "Ce sumă dorești să soliciți?",
    type: "number",
    phase: "solicitud",
    suffix: "LEI",
    min: 200,
    max: 50000,
    placeholder: "1000",
  },

  // --- Gate: nombre, apellidos, email y teléfono se piden en WitmeGate,
  // igual que en España.

  // Identitate (después del gate)
  {
    key: "idNumber",
    label: "Care este CNP-ul tău?",
    type: "text",
    phase: "identidad",
    placeholder: "1234567890123",
    helpText: "Avem nevoie de el pentru a procesa cererea ta la instituția financiară.",
  },
  { key: "maritalStatus", label: "Care este starea ta civilă?", type: "select", phase: "identidad", options: MARITAL_STATUS_OPTIONS_RO },

  // Domiciliu (después del gate)
  { key: "city", label: "În ce oraș locuiești?", type: "dropdown", phase: "domicilio", options: CITY_OPTIONS_RO },
  { key: "zipCode", label: "Cod poștal", type: "text", phase: "domicilio", placeholder: "010101" },
  { key: "address", label: "Adresa ta", type: "text", phase: "domicilio", placeholder: "Strada Exemplu" },
  { key: "houseNumber", label: "Numărul casei/blocului", type: "text", phase: "domicilio", placeholder: "12" },
];

function visibleFor(phaseKeys: WitmePhase[]) {
  return (answers: Answers): WitmeQuestionDef[] =>
    WITME_QUESTIONS_RO.filter((q) => phaseKeys.includes(q.phase) && (!q.condition || q.condition(answers)));
}

export const visibleScoreQuestionsRo = visibleFor(RO_SCORE_PHASE_KEYS);
export const visibleExtraQuestionsRo = visibleFor(RO_EXTRA_PHASE_KEYS);
