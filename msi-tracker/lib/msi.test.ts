import { describe, it } from "vitest";

// Casos de test mínimos del brief - pendientes de implementación (lib/msi.ts
// solo tiene firmas todavía). `it.todo` los deja listados y fallando como
// "pendiente" en vez de pasar en falso o no existir.

describe("calcularCuotas", () => {
  it.todo("reparte el importe entre los meses, la última cuota absorbe el redondeo");
  it.todo("compra el mismo día del corte entra en el estado de cuenta de ese corte");
  it.todo("compra el día después del corte entra en el siguiente estado de cuenta");
  it.todo("corte el día 31 en un mes de 30 (o 28/29) días usa el último día real del mes");
  it.todo("cambio de año: la primera cuota cae en enero del año siguiente");
  it.todo("importe no divisible entre los meses: el redondeo cuadra exacto en la última cuota");
  it.todo("compra liquidada anticipadamente no genera cuotas a partir del mes de liquidación");
});

describe("calcularCompromisoMensual", () => {
  it.todo("suma cuotas de varias compras y varias tarjetas que vencen en el mismo mes");
  it.todo("devuelve total 0 para un mes sin cuotas pendientes");
  it.todo("porcentajeIngreso es null cuando no hay ingresoMensual declarado");
  it.todo("respeta mesesAdelante (por defecto 12)");
});

describe("clasificarSemaforo", () => {
  it.todo("verde por debajo del 15%");
  it.todo("amarillo entre 15% y 30%");
  it.todo("rojo por encima del 30%");
});

describe("simularCompra", () => {
  it.todo("no modifica el array de compras existentes (función pura)");
  it.todo("identifica el peor mes tras añadir la compra hipotética");
  it.todo("devuelve porcentajeIngreso null si no hay ingreso declarado");
});
