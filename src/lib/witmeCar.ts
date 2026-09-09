import type { Answers } from "../data/witmeQuestions";
import { supabase } from "./supabase";

// Envío en paralelo a dos productos nuevos de Witme (aval coche y
// reunificación de deudas), vía un endpoint nuevo y distinto al que ya
// usamos para prestamistas normales (ver src/lib/witme.ts) - no afecta ni
// sustituye a ese flujo, es un ping en background para comparar resultados.
// Nunca se muestra ninguna oferta de aquí al usuario, aunque venga con
// redirectUrl: solo se registra para tener datos con los que decidir más
// adelante si merece la pena sacarlo a producción.
//
// Es UNA sola petición por solicitud, no una por producto: el mismo payload
// lleva servy_id (aval coche) y servy_id_2 (reunificación de deudas) juntos
// en "vars", confirmado por Witme.
//
// No tenemos el diccionario completo de Witme para este endpoint, solo los
// ejemplos de la petición que nos pasaron. Los campos condicionales que no
// aparecían en los ejemplos (tipo de vehículo, matrícula, financiación,
// IBAN) se deducen del mismo patrón en español-con-guiones, y se omiten por
// completo cuando no aplican - igual que hace el propio ejemplo de Witme
// cuando vehiculo-propio=false.

interface CarCollateralContact {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const SERVY_ID_CAR_COLLATERAL = 171;
const SERVY_ID_DEBT_CONSOLIDATION = 154;

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
// el flujo principal de la solicitud si falla. Un solo intento (sin
// reintentos ni cascada) - es un ping para comparar, no un envío real.
export async function submitCarCollateralAndDebtConsolidationLead(
  answers: Answers,
  contact: CarCollateralContact,
  clickId: string | null,
  utmSource: string | null,
  externalId: string,
): Promise<void> {
  try {
    await supabase.functions.invoke("witme-proxy", {
      body: {
        action: "submit_car",
        product: "car_collateral+debt_consolidation",
        externalId,
        sentFrom: window.location.href,
        vars: {
          servy_id: SERVY_ID_CAR_COLLATERAL,
          servy_id_2: SERVY_ID_DEBT_CONSOLIDATION,
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
        answers: buildCarCollateralAnswers(answers, contact),
      },
    });
  } catch {
    // Ver comentario de la función: nunca debe romper el flujo principal.
  }
}
