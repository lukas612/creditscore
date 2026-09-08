export type Answers = Record<string, string | number | boolean>;

export type WitmeQuestionType = "text" | "number" | "yesno" | "date" | "select" | "dropdown" | "consent";

export type WitmePhase = "personales" | "situacion" | "domicilio" | "patrimonio" | "finanzas" | "solicitud";

export interface Option {
  value: string;
  label: string;
}

export interface WitmeQuestionDef {
  key: string;
  label: string;
  type: WitmeQuestionType;
  phase: WitmePhase;
  options?: Option[];
  placeholder?: string;
  suffix?: string;
  min?: number;
  max?: number;
  helpText?: string;
  condition?: (answers: Answers) => boolean;
}

export const WITME_PHASES: { key: WitmePhase; label: string }[] = [
  { key: "personales", label: "Datos personales" },
  { key: "situacion", label: "Tu situación" },
  { key: "domicilio", label: "Domicilio" },
  { key: "patrimonio", label: "Vivienda y patrimonio" },
  { key: "finanzas", label: "Finanzas" },
  { key: "solicitud", label: "Tu solicitud" },
];

const GENDER_OPTIONS: Option[] = [
  { value: "Mujer", label: "Mujer" },
  { value: "Hombre", label: "Hombre" },
];

const MARITAL_STATUS_OPTIONS: Option[] = [
  { value: "Soltero/Soltera", label: "Soltero/a" },
  { value: "Casado/Casada", label: "Casado/a" },
  { value: "Divorciado/Divorciada", label: "Divorciado/a" },
  { value: "Viudo/Viuda", label: "Viudo/a" },
];

const EDUCATION_LEVEL_OPTIONS: Option[] = [
  "Sin estudios",
  "Secundaria obligatoria",
  "Formación profesional",
  "Bachillerato",
  "Diplomado",
  "Licenciado",
  "Doctorado",
].map((v) => ({ value: v, label: v }));

const STATE_OPTIONS: Option[] = [
  "Andalucía",
  "Aragón",
  "Principado de Asturias",
  "Islas Baleares",
  "Canarias",
  "Cantabria",
  "Castilla y León",
  "Castilla-La Mancha",
  "Cataluña",
  "Comunidad Valenciana",
  "Extremadura",
  "Galicia",
  "Comunidad de Madrid",
  "Región de Murcia",
  "Comunidad Foral de Navarra",
  "País Vasco",
  "La Rioja",
  "Ceuta",
  "Melilla",
].map((v) => ({ value: v, label: v }));

const PROVINCE_OPTIONS: Option[] = [
  "Álava",
  "Albacete",
  "Alicante",
  "Almería",
  "Asturias",
  "Ávila",
  "Badajoz",
  "Baleares",
  "Barcelona",
  "Burgos",
  "Cáceres",
  "Cádiz",
  "Cantabria",
  "Castellón",
  "Ciudad Real",
  "Córdoba",
  "Cuenca",
  "Gerona",
  "Granada",
  "Guadalajara",
  "Guipúzcoa",
  "Huelva",
  "Huesca",
  "Jaén",
  "La Coruña",
  "La Rioja",
  "Las Palmas",
  "León",
  "Lérida",
  "Lugo",
  "Madrid",
  "Málaga",
  "Murcia",
  "Navarra",
  "Orense",
  "Palencia",
  "Pontevedra",
  "Salamanca",
  "Santa Cruz de Tenerife",
  "Segovia",
  "Sevilla",
  "Soria",
  "Tarragona",
  "Teruel",
  "Toledo",
  "Valencia",
  "Valladolid",
  "Vizcaya",
  "Zamora",
  "Zaragoza",
  "Ceuta",
  "Melilla",
].map((v) => ({ value: v, label: v }));

const INCOME_SOURCE_OPTIONS: Option[] = [
  { value: "Cuenta ajena (Tiempo completo)", label: "Empleado a tiempo completo" },
  { value: "Cuenta ajena (Tiempo parcial)", label: "Empleado a tiempo parcial" },
  { value: "Cuenta ajena (Temporal)", label: "Empleado temporal" },
  { value: "Autónomos", label: "Autónomo" },
  { value: "Funcionario", label: "Funcionario" },
  { value: "Militar", label: "Militar" },
  { value: "Estudiante", label: "Estudiante" },
  { value: "Pensionista", label: "Pensionista" },
  { value: "Ama de casa", label: "Ama/o de casa" },
  { value: "Parado", label: "Desempleado" },
  { value: "Otro", label: "Otro" },
];

const LOAN_PURPOSE_OPTIONS: Option[] = [
  { value: "Consolidación de la deuda", label: "Consolidar deudas" },
  { value: "Mejoras del hogar", label: "Reformas en casa" },
  { value: "Coche", label: "Comprar un vehículo" },
  { value: "Educación", label: "Estudios" },
  { value: "Gastos médicos", label: "Gastos médicos" },
  { value: "Viaje", label: "Viaje" },
  { value: "Gran compra", label: "Gran compra" },
  { value: "Negocio", label: "Negocio" },
  { value: "Ocio", label: "Ocio" },
  { value: "Gastos regulares", label: "Gastos regulares" },
  { value: "Costes imprevistos", label: "Gastos imprevistos" },
  { value: "Otro", label: "Otro" },
];

const HAS_OWNED_HOUSE_OPTIONS: Option[] = [
  { value: "Propietario sin hipoteca", label: "Propietario, sin hipoteca" },
  { value: "Propietario con hipoteca", label: "Propietario, con hipoteca" },
  { value: "Alquiler", label: "Vivo de alquiler" },
  { value: "Otro", label: "Otra situación" },
];

const HAS_FINANCED_VEHICLE_OPTIONS: Option[] = [
  { value: "Ya está pagado", label: "Ya está pagado" },
  { value: "Si, con un préstamo personal", label: "Sí, con un préstamo personal" },
  { value: "Si, con un concesionario", label: "Sí, financiado con el concesionario" },
  { value: "No lo recuerdo", label: "No lo recuerdo" },
];

const VEHICLE_TYPE_OPTIONS: Option[] = ["Coche", "Motocicleta", "Camioneta", "Camión", "Otro"].map((v) => ({
  value: v,
  label: v,
}));

// Lista reducida y frecuente + España primero. La API acepta el catálogo
// completo (~200 países); si hace falta el resto se puede ampliar luego.
const COUNTRY_OF_BIRTH_OPTIONS: Option[] = [
  "Spain",
  "Morocco",
  "Colombia",
  "Venezuela",
  "Ecuador",
  "Peru",
  "Argentina",
  "Bolivia",
  "Romania",
  "Italy",
  "France",
  "Portugal",
  "United Kingdom",
  "Germany",
  "China",
  "Honduras",
  "Paraguay",
  "Cuba",
  "Dominican Republic",
  "Nigeria",
  "Senegal",
  "Ukraine",
  "Russian Federation",
  "United States",
  "Mexico",
  "Brazil",
].map((v) => ({ value: v, label: v }));

export const WITME_QUESTIONS: WitmeQuestionDef[] = [
  // Datos personales
  { key: "name", label: "¿Cuál es tu nombre?", type: "text", phase: "personales", placeholder: "María" },
  { key: "lastName", label: "¿Y tus apellidos?", type: "text", phase: "personales", placeholder: "García López" },
  { key: "dateOfBirth", label: "¿Cuál es tu fecha de nacimiento?", type: "date", phase: "personales" },
  { key: "gender", label: "Género", type: "select", phase: "personales", options: GENDER_OPTIONS },
  {
    key: "idNumber",
    label: "¿Cuál es tu DNI o NIE?",
    type: "text",
    phase: "personales",
    placeholder: "12345678A",
    helpText: "Lo necesitamos para tramitar tu solicitud con la entidad financiera.",
  },
  { key: "phoneNumber", label: "¿Cuál es tu teléfono?", type: "text", phase: "personales", placeholder: "+34 612 345 678" },
  { key: "email", label: "¿Y tu correo electrónico?", type: "text", phase: "personales", placeholder: "tu@email.com" },

  // Situación
  { key: "maritalStatus", label: "Estado civil", type: "select", phase: "situacion", options: MARITAL_STATUS_OPTIONS },
  { key: "educationLevel", label: "Nivel de estudios", type: "select", phase: "situacion", options: EDUCATION_LEVEL_OPTIONS },
  {
    key: "numberOfdependents",
    label: "¿Cuántas personas dependen económicamente de ti?",
    type: "number",
    phase: "situacion",
    min: 0,
    max: 15,
    placeholder: "0",
  },
  {
    key: "countryOfBirth",
    label: "¿En qué país naciste?",
    type: "dropdown",
    phase: "situacion",
    options: COUNTRY_OF_BIRTH_OPTIONS,
  },

  // Domicilio
  { key: "zipCode", label: "¿Cuál es tu código postal?", type: "text", phase: "domicilio", placeholder: "28001" },
  { key: "state", label: "Comunidad autónoma", type: "dropdown", phase: "domicilio", options: STATE_OPTIONS },
  { key: "province", label: "Provincia", type: "dropdown", phase: "domicilio", options: PROVINCE_OPTIONS },
  { key: "city", label: "Ciudad o localidad", type: "text", phase: "domicilio", placeholder: "Madrid" },
  { key: "address", label: "Calle o avenida", type: "text", phase: "domicilio", placeholder: "Calle Mayor" },
  { key: "houseNumber", label: "Número, piso y puerta", type: "text", phase: "domicilio", placeholder: "12, 3ºB" },

  // Vivienda y patrimonio
  { key: "hasOwnedHouse", label: "¿Cuál es tu situación de vivienda?", type: "select", phase: "patrimonio", options: HAS_OWNED_HOUSE_OPTIONS },
  { key: "hasOwnVehicle", label: "¿Tienes vehículo propio?", type: "yesno", phase: "patrimonio" },
  {
    key: "vehicleType",
    label: "¿Qué tipo de vehículo?",
    type: "select",
    phase: "patrimonio",
    options: VEHICLE_TYPE_OPTIONS,
    condition: (a) => a.hasOwnVehicle === "si",
  },
  {
    key: "hasFinancedVehicle",
    label: "¿Está financiado?",
    type: "select",
    phase: "patrimonio",
    options: HAS_FINANCED_VEHICLE_OPTIONS,
    condition: (a) => a.hasOwnVehicle === "si",
  },
  {
    key: "vehiclePlate",
    label: "Matrícula del vehículo",
    type: "text",
    phase: "patrimonio",
    placeholder: "1234ABC",
    condition: (a) => a.hasOwnVehicle === "si",
  },
  { key: "hasBankAccount", label: "¿Tienes cuenta bancaria a tu nombre?", type: "yesno", phase: "patrimonio" },
  {
    key: "bankAccountNumber",
    label: "Número de cuenta (IBAN)",
    type: "text",
    phase: "patrimonio",
    placeholder: "ES00 0000 0000 0000 0000 0000",
    condition: (a) => a.hasBankAccount === "si",
  },

  // Finanzas
  { key: "incomeSource", label: "¿Cuál es tu principal fuente de ingresos?", type: "select", phase: "finanzas", options: INCOME_SOURCE_OPTIONS },
  {
    key: "monthlyIncome",
    label: "¿Cuál es tu ingreso mensual neto?",
    type: "number",
    phase: "finanzas",
    suffix: "€/mes",
    min: 0,
    max: 50000,
    placeholder: "1500",
  },
  { key: "employmentStartDate", label: "¿Desde cuándo estás en tu empleo o actividad actual?", type: "date", phase: "finanzas" },
  { key: "hasOtherLoans", label: "¿Tienes actualmente otros créditos o deudas?", type: "yesno", phase: "finanzas" },
  {
    key: "totalDebtAmount",
    label: "¿Cuál es el importe total de esas deudas?",
    type: "number",
    phase: "finanzas",
    suffix: "€",
    min: 0,
    max: 500000,
    placeholder: "5000",
    condition: (a) => a.hasOtherLoans === "si",
  },
  {
    key: "badCreditHistory",
    label: "¿Estás actualmente en Asnef o algún otro registro de morosos?",
    type: "yesno",
    phase: "finanzas",
  },

  // Solicitud
  {
    key: "requestedAmount",
    label: "¿Qué importe te gustaría solicitar?",
    type: "number",
    phase: "solicitud",
    suffix: "€",
    min: 300,
    max: 60000,
    placeholder: "3000",
  },
  { key: "loanPurpose", label: "¿Para qué necesitas el crédito?", type: "select", phase: "solicitud", options: LOAN_PURPOSE_OPTIONS },
  { key: "consentPrivacy", label: "Antes de enviar tu solicitud", type: "consent", phase: "solicitud" },
];

export function visibleWitmeQuestions(answers: Answers): WitmeQuestionDef[] {
  return WITME_QUESTIONS.filter((q) => !q.condition || q.condition(answers));
}
