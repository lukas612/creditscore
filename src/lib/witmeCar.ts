import type { Answers } from "../data/witmeQuestions";
import { supabase } from "./supabase";

// Envío en paralelo a un segundo producto de Witme (prestamistas con aval de
// coche), vía un endpoint nuevo y distinto al que ya usamos para
// prestamistas normales (ver src/lib/witme.ts) - no afecta ni sustituye a
// ese flujo, es un intento aparte para comparar resultados.
//
// No tenemos el diccionario completo de Witme para este endpoint, solo dos
// ejemplos de la petición que esperan (mismo esquema, distinto servy_id).
// Los campos condicionales que no aparecían en los ejemplos (tipo de
// vehículo, matrícula, financiación, IBAN) se deducen del mismo patrón en
// español-con-guiones, y se omiten por completo cuando no aplican - igual
// que hace el propio ejemplo de Witme cuando vehiculo-propio=false.

interface CarCollateralContact {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const TEXT_FIELDS: Record<string, string> = {
  dateOfBirth: "fecha-de-nacimiento",
  zipCode: "codigo-postal",
  employmentStartDate: "fecha-de-inicio-de-actividad-laboral",
  idNumber: "dni-nie",
  city: "ciudad",
  address: "direccion",
  houseNumber: "numero-de-casa-edificio",
};

// Estos son de tipo "select"/"dropdown" en nuestro formulario: el valor que
// guardamos coincide, en los ejemplos que nos pasaron, con lo que espera
// Witme para fuente-principal-de-ingreso/genero/estado-civil/nivel-de-
// estudio/pais-de-nacimiento/provincia - no así necesariamente para el
// resto de opciones de cada lista, que no hemos podido verificar una a una.
const SELECT_FIELDS: Record<string, string> = {
  incomeSource: "fuente-principal-de-ingreso",
  hasOwnedHouse: "tienes-vivienda-en-propiedad",
  loanPurpose: "proposito-del-prestamo",
  gender: "genero",
  maritalStatus: "estado-civil",
  educationLevel: "nivel-de-estudio",
  countryOfBirth: "pais-de-nacimiento",
  province: "provincia",
};

const NUMBER_FIELDS: Record<string, string> = {
  monthlyIncome: "ingresos-mensuales",
  numberOfdependents: "personas-a-cargo",
  requestedAmount: "creditos-cantidad-a-solicitar",
};

const BOOLEAN_FIELDS: Record<string, string> = {
  hasOtherLoans: "tienes-otros-creditos",
  badCreditHistory: "estas-en-asnef",
  hasOwnVehicle: "vehiculo-propio",
  hasBankAccount: "tienes-banca-en-linea",
};

// Solo se piden si hasOwnVehicle==="si"; si no aplica, Witme tampoco las
// manda en su ejemplo (vehiculo-propio=false sin estos campos), así que las
// omitimos igual en vez de mandar valores vacíos.
const VEHICLE_CONDITIONAL_FIELDS: Record<string, string> = {
  vehicleType: "tipo-de-vehiculo",
  hasFinancedVehicle: "vehiculo-financiado",
  vehiclePlate: "matricula-vehiculo",
};

// No preguntamos el plazo deseado en la solicitud larga (solo el quiz
// corto lo pide) - de momento un valor por defecto razonable hasta que
// decidamos si hace falta añadir la pregunta también aquí.
const DEFAULT_LOAN_TERM_MONTHS = 24;

function buildCarCollateralAnswers(answers: Answers, contact: CarCollateralContact): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "en-cuantos-meses-deseas-devolverlo": DEFAULT_LOAN_TERM_MONTHS,
    // WitmeGate ya exige marcar el consentimiento antes de poder llegar
    // aquí (bloquea el envío si no está marcado), así que a estas alturas
    // siempre es true.
    "politica-privacidad": true,
    nombre: contact.name,
    apellidos: contact.lastName,
    "correo-electronico": contact.email,
    telefono: contact.phoneNumber,
  };

  for (const [ourKey, servyKey] of Object.entries(TEXT_FIELDS)) {
    if (answers[ourKey] != null) data[servyKey] = answers[ourKey];
  }
  for (const [ourKey, servyKey] of Object.entries(SELECT_FIELDS)) {
    if (answers[ourKey] != null) data[servyKey] = answers[ourKey];
  }
  for (const [ourKey, servyKey] of Object.entries(NUMBER_FIELDS)) {
    if (answers[ourKey] != null) data[servyKey] = Number(answers[ourKey]);
  }
  for (const [ourKey, servyKey] of Object.entries(BOOLEAN_FIELDS)) {
    if (answers[ourKey] != null) data[servyKey] = answers[ourKey] === "si";
  }
  if (answers.hasOtherLoans === "si" && answers.totalDebtAmount != null) {
    data["importe-total-de-la-deuda"] = Number(answers.totalDebtAmount);
  }
  if (answers.hasOwnVehicle === "si") {
    for (const [ourKey, servyKey] of Object.entries(VEHICLE_CONDITIONAL_FIELDS)) {
      if (answers[ourKey] != null) data[servyKey] = answers[ourKey];
    }
  }
  if (answers.hasBankAccount === "si" && answers.bankAccountNumber != null) {
    data.iban = answers.bankAccountNumber;
  }

  return data;
}

// Best-effort, en paralelo al envío normal: nunca debe afectar ni bloquear
// el flujo principal de la solicitud si falla.
export async function submitCarCollateralLead(
  answers: Answers,
  contact: CarCollateralContact,
  utmSource: string | null,
  externalId: string,
): Promise<void> {
  try {
    await supabase.functions.invoke("witme-proxy", {
      body: {
        action: "submit_car",
        externalId,
        sentFrom: window.location.href,
        vars: {
          servy_id: 171,
          servy_id_2: 154,
          servy_id_3: null,
          origin: "2",
          country: "ES",
          credit_to_debt_sent: false,
          skip_debts: "0",
          only_pingtree: "0",
        },
        hidden: {
          svyid: "w4ud70bl9k0k8haj3ip52fum",
          servy_click: "",
          utm_source: utmSource ?? "",
        },
        answers: buildCarCollateralAnswers(answers, contact),
      },
    });
  } catch {
    // Ver comentario de la función: nunca debe romper el flujo principal.
  }
}
