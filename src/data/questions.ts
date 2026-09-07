export type Answers = Record<string, string | number>;

export type QuestionType = "select" | "number" | "yesno" | "date" | "text";

export interface Option {
  value: string;
  label: string;
}

export interface QuestionDef {
  key: string;
  label: string;
  type: QuestionType;
  options?: Option[];
  placeholder?: string;
  suffix?: string;
  min?: number;
  max?: number;
  condition?: (answers: Answers) => boolean;
}

export const questions: QuestionDef[] = [
  {
    key: "proposito_del_prestamo",
    label: "¿Para qué necesitas el crédito?",
    type: "select",
    options: [
      { value: "consolidar_deudas", label: "Consolidar deudas" },
      { value: "reformas", label: "Reformas en casa" },
      { value: "vehiculo", label: "Comprar un vehículo" },
      { value: "estudios", label: "Estudios" },
      { value: "imprevistos", label: "Gastos imprevistos" },
      { value: "otro", label: "Otro" },
    ],
  },
  {
    key: "creditos_cantidad_a_solicitar",
    label: "¿Qué importe te gustaría solicitar?",
    type: "number",
    suffix: "€",
    min: 300,
    max: 60000,
    placeholder: "3000",
  },
  {
    key: "en_cuantos_meses_deseas_devolverlo",
    label: "¿En cuántos meses te gustaría devolverlo?",
    type: "select",
    options: [
      { value: "12", label: "12 meses" },
      { value: "24", label: "24 meses" },
      { value: "36", label: "36 meses" },
      { value: "48", label: "48 meses" },
      { value: "60", label: "60 meses" },
    ],
  },
  {
    key: "fuente_principal_de_ingreso",
    label: "¿Cuál es tu principal fuente de ingresos?",
    type: "select",
    options: [
      { value: "empleado", label: "Empleado por cuenta ajena" },
      { value: "funcionario", label: "Funcionario" },
      { value: "autonomo", label: "Autónomo" },
      { value: "pensionista", label: "Pensionista" },
      { value: "desempleado", label: "Desempleado" },
    ],
  },
  {
    key: "ingreso_mensual",
    label: "¿Cuál es tu ingreso mensual neto aproximado?",
    type: "number",
    suffix: "€/mes",
    min: 0,
    max: 50000,
    placeholder: "1500",
  },
  {
    key: "tienes_vivienda_en_propiedad",
    label: "¿Tienes una vivienda en propiedad?",
    type: "yesno",
  },
  {
    key: "tienes_otros_creditos",
    label: "¿Tienes actualmente otros créditos o deudas?",
    type: "yesno",
  },
  {
    key: "importe_total_de_la_deuda",
    label: "¿Cuál es el importe total de esas deudas?",
    type: "number",
    suffix: "€",
    min: 0,
    max: 500000,
    placeholder: "5000",
    condition: (a) => a.tienes_otros_creditos === "si",
  },
  {
    key: "fecha_de_nacimiento",
    label: "¿Cuál es tu fecha de nacimiento?",
    type: "date",
  },
  {
    key: "codigo_postal",
    label: "¿Cuál es tu código postal?",
    type: "text",
    placeholder: "28001",
  },
];

export function visibleQuestions(answers: Answers): QuestionDef[] {
  return questions.filter((q) => !q.condition || q.condition(answers));
}

export function ageFromBirthdate(birthdate: string): number {
  const dob = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}
