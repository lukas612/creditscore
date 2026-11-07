// Cálculo de cuotas MSI (meses sin intereses). Función pura: sin imports de
// Next.js ni de Supabase, para que la use igual el simulador público (sin
// sesión) y el dashboard (con sesión), y para que Vitest la pruebe sin mocks.

export type Plazo = 3 | 6 | 9 | 12 | 18 | 24;
export type Semaforo = "verde" | "amarillo" | "rojo";

export interface Tarjeta {
  id: string;
  diaCorte: number; // 1-31
  diaLimitePago: number; // 1-31
}

export interface Compra {
  id: string;
  cardId: string;
  importe: number; // MXN, 2 decimales
  meses: Plazo;
  fechaCompra: string; // ISO date (YYYY-MM-DD)
  liquidadaEn: string | null; // ISO date del mes en que se liquidó, o null
}

export interface Cuota {
  compraId: string;
  cardId: string;
  numero: number; // 1-indexed
  monto: number; // redondeado a centavos; la última cuota absorbe el resto
  fechaVencimiento: string; // ISO date
}

export interface CompromisoMes {
  mes: string; // 'YYYY-MM'
  total: number;
  porcentajeIngreso: number | null; // null si no hay ingreso mensual declarado
  semaforo: Semaforo;
}

export interface ResultadoSimulador {
  cuotaMensual: number;
  peorMes: CompromisoMes;
  porcentajeIngreso: number | null;
  semaforo: Semaforo;
}

// --- Utilidades internas de fecha (siempre en UTC, para no arrastrar bugs
// de huso horario ni de horario de verano en la aritmética de meses). ---

function daysInMonth(year: number, monthIndex0: number): number {
  return new Date(Date.UTC(year, monthIndex0 + 1, 0)).getUTCDate();
}

function clampDay(day: number, year: number, monthIndex0: number): number {
  return Math.min(day, daysInMonth(year, monthIndex0));
}

function makeDate(year: number, monthIndex0: number, day: number): number {
  return Date.UTC(year, monthIndex0, day);
}

function parseISO(iso: string): { year: number; monthIndex0: number; day: number } {
  const parts = iso.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  return { year, monthIndex0: month - 1, day };
}

function formatISO(year: number, monthIndex0: number, day: number): string {
  const mm = String(monthIndex0 + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function mesKey(year: number, monthIndex0: number): string {
  return `${year}-${String(monthIndex0 + 1).padStart(2, "0")}`;
}

function addMonths(
  year: number,
  monthIndex0: number,
  delta: number,
): { year: number; monthIndex0: number } {
  const total = monthIndex0 + delta;
  const newYear = year + Math.floor(total / 12);
  const newMonth = ((total % 12) + 12) % 12;
  return { year: newYear, monthIndex0: newMonth };
}

/**
 * Genera el calendario de cuotas de una compra para su tarjeta.
 * La primera cuota cae en el primer corte >= fechaCompra; su vencimiento es
 * el día límite de pago siguiente a ese corte. La última cuota absorbe el
 * redondeo para que la suma cuadre exacto con el importe original.
 */
export function calcularCuotas(compra: Compra, tarjeta: Tarjeta): Cuota[] {
  const purchase = parseISO(compra.fechaCompra);
  const purchaseTime = makeDate(purchase.year, purchase.monthIndex0, purchase.day);

  // Primer corte >= fecha de compra.
  let corte = { year: purchase.year, monthIndex0: purchase.monthIndex0 };
  let corteDay = clampDay(tarjeta.diaCorte, corte.year, corte.monthIndex0);
  let corteTime = makeDate(corte.year, corte.monthIndex0, corteDay);
  if (corteTime < purchaseTime) {
    corte = addMonths(corte.year, corte.monthIndex0, 1);
    corteDay = clampDay(tarjeta.diaCorte, corte.year, corte.monthIndex0);
    corteTime = makeDate(corte.year, corte.monthIndex0, corteDay);
  }

  // Primer vencimiento: la próxima fecha con día = diaLimitePago, estrictamente
  // después del corte.
  let pago = { year: corte.year, monthIndex0: corte.monthIndex0 };
  let pagoDay = clampDay(tarjeta.diaLimitePago, pago.year, pago.monthIndex0);
  let pagoTime = makeDate(pago.year, pago.monthIndex0, pagoDay);
  if (pagoTime <= corteTime) {
    pago = addMonths(pago.year, pago.monthIndex0, 1);
  }

  const importeCents = Math.round(compra.importe * 100);
  const baseCents = Math.floor(importeCents / compra.meses);
  const lastCents = importeCents - baseCents * (compra.meses - 1);

  const liquidadaMesKey = compra.liquidadaEn
    ? (() => {
        const { year, monthIndex0 } = parseISO(compra.liquidadaEn!);
        return mesKey(year, monthIndex0);
      })()
    : null;

  const cuotas: Cuota[] = [];
  let cursor = { year: pago.year, monthIndex0: pago.monthIndex0 };
  for (let i = 1; i <= compra.meses; i++) {
    const key = mesKey(cursor.year, cursor.monthIndex0);
    if (liquidadaMesKey !== null && key >= liquidadaMesKey) break;

    const day = clampDay(tarjeta.diaLimitePago, cursor.year, cursor.monthIndex0);
    const cents = i === compra.meses ? lastCents : baseCents;
    cuotas.push({
      compraId: compra.id,
      cardId: compra.cardId,
      numero: i,
      monto: cents / 100,
      fechaVencimiento: formatISO(cursor.year, cursor.monthIndex0, day),
    });

    cursor = addMonths(cursor.year, cursor.monthIndex0, 1);
  }

  return cuotas;
}

/**
 * Compromiso mensual (próximos `mesesAdelante` meses, 12 por defecto)
 * sumando las cuotas de todas las compras/tarjetas que caen en cada mes.
 * Las compras con `liquidadaEn` anterior o igual al mes dejan de aportar
 * cuotas desde ese mes.
 */
export function calcularCompromisoMensual(
  compras: Compra[],
  tarjetas: Tarjeta[],
  ingresoMensual: number | null,
  mesesAdelante = 12,
): CompromisoMes[] {
  const tarjetasPorId = new Map(tarjetas.map((t) => [t.id, t] as const));

  const totalesPorMesCents = new Map<string, number>();
  for (const compra of compras) {
    const tarjeta = tarjetasPorId.get(compra.cardId);
    if (!tarjeta) continue;
    for (const cuota of calcularCuotas(compra, tarjeta)) {
      const { year, monthIndex0 } = parseISO(cuota.fechaVencimiento);
      const key = mesKey(year, monthIndex0);
      const cents = Math.round(cuota.monto * 100);
      totalesPorMesCents.set(key, (totalesPorMesCents.get(key) ?? 0) + cents);
    }
  }

  const ahora = new Date();
  const start = { year: ahora.getUTCFullYear(), monthIndex0: ahora.getUTCMonth() };

  const resultado: CompromisoMes[] = [];
  for (let i = 0; i < mesesAdelante; i++) {
    const { year, monthIndex0 } = addMonths(start.year, start.monthIndex0, i);
    const key = mesKey(year, monthIndex0);
    const total = (totalesPorMesCents.get(key) ?? 0) / 100;
    const porcentajeIngreso = ingresoMensual ? total / ingresoMensual : null;

    resultado.push({
      mes: key,
      total,
      porcentajeIngreso,
      semaforo: clasificarSemaforo(porcentajeIngreso ?? 0),
    });
  }

  return resultado;
}

/** Clasifica un porcentaje de ingreso comprometido (0-1) en el semáforo. */
export function clasificarSemaforo(porcentajeIngreso: number): Semaforo {
  if (porcentajeIngreso < 0.15) return "verde";
  if (porcentajeIngreso <= 0.3) return "amarillo";
  return "rojo";
}

export interface ResultadoSimuladorRapido {
  cuotaMensual: number;
  compromisoTotal: number; // totalActualEnCuotas + cuotaMensual
  porcentajeIngreso: number | null;
  semaforo: Semaforo;
}

/**
 * Simulador rápido para la landing pública: sin cuenta ni tarjetas reales,
 * solo 3 datos (ingreso, lo que ya paga al mes en otras MSI, y la compra que
 * está pensando hacer). No conoce días de corte/pago, así que la cuota es
 * una división simple del importe entre los meses.
 */
export function simularCompraRapida(
  importe: number,
  meses: Plazo,
  ingresoMensual: number | null,
  totalActualEnCuotas = 0,
): ResultadoSimuladorRapido {
  const cuotaMensual = Math.round((importe / meses) * 100) / 100;
  const compromisoTotal = Math.round((totalActualEnCuotas + cuotaMensual) * 100) / 100;
  const porcentajeIngreso = ingresoMensual ? compromisoTotal / ingresoMensual : null;

  return {
    cuotaMensual,
    compromisoTotal,
    porcentajeIngreso,
    semaforo: clasificarSemaforo(porcentajeIngreso ?? 0),
  };
}

/**
 * Simulador: añade una compra hipotética a las existentes (sin mutarlas),
 * recalcula los próximos 12 meses y devuelve la cuota de la compra nueva,
 * el peor mes resultante y su porcentaje de ingreso.
 */
export function simularCompra(
  compraHipotetica: Omit<Compra, "id" | "liquidadaEn">,
  comprasExistentes: Compra[],
  tarjetas: Tarjeta[],
  ingresoMensual: number | null,
): ResultadoSimulador {
  const compraSimulada: Compra = {
    ...compraHipotetica,
    id: "__simulada__",
    liquidadaEn: null,
  };

  const tarjeta = tarjetas.find((t) => t.id === compraSimulada.cardId);
  const cuotaMensual = tarjeta
    ? (calcularCuotas(compraSimulada, tarjeta)[0]?.monto ?? 0)
    : 0;

  const comprasCombinadas = [...comprasExistentes, compraSimulada];
  const compromiso = calcularCompromisoMensual(
    comprasCombinadas,
    tarjetas,
    ingresoMensual,
    12,
  );

  const peorMes = compromiso.reduce((peor, actual) =>
    actual.total > peor.total ? actual : peor,
  );

  return {
    cuotaMensual,
    peorMes,
    porcentajeIngreso: peorMes.porcentajeIngreso,
    semaforo: peorMes.semaforo,
  };
}
