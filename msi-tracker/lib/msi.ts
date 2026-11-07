// Cálculo de cuotas MSI (meses sin intereses). Función pura: sin imports de
// Next.js ni de Supabase, para que la use igual el simulador público (sin
// sesión) y el dashboard (con sesión), y para que Vitest la pruebe sin mocks.
//
// Solo firmas por ahora — a la espera de aprobar el brief antes de implementar.

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

/**
 * Genera el calendario de cuotas de una compra para su tarjeta.
 * La primera cuota cae en el primer corte >= fechaCompra; su vencimiento es
 * el día límite de pago siguiente a ese corte. La última cuota absorbe el
 * redondeo para que la suma cuadre exacto con el importe original.
 */
export function calcularCuotas(compra: Compra, tarjeta: Tarjeta): Cuota[] {
  throw new Error("not implemented");
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
  mesesAdelante?: number,
): CompromisoMes[] {
  throw new Error("not implemented");
}

/** Clasifica un porcentaje de ingreso comprometido (0-1) en el semáforo. */
export function clasificarSemaforo(porcentajeIngreso: number): Semaforo {
  throw new Error("not implemented");
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
  throw new Error("not implemented");
}
