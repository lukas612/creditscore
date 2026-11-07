import { describe, expect, it } from "vitest";
import {
  calcularCompromisoMensual,
  calcularCuotas,
  clasificarSemaforo,
  simularCompra,
  simularCompraRapida,
  type Compra,
  type Tarjeta,
} from "./msi";

function tarjeta(overrides: Partial<Tarjeta> = {}): Tarjeta {
  return { id: "t1", diaCorte: 1, diaLimitePago: 1, ...overrides };
}

function compra(overrides: Partial<Compra> = {}): Compra {
  return {
    id: "c1",
    cardId: "t1",
    importe: 300,
    meses: 3,
    fechaCompra: "2026-01-01",
    liquidadaEn: null,
    ...overrides,
  };
}

/** Primer día del mes actual en UTC, como string ISO - para construir
 * fixtures de compras que caigan de forma predecible dentro de la ventana
 * de `mesesAdelante` sin depender de una fecha fija ya pasada. */
function primerDiaMesActualISO(): string {
  const d = new Date();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${d.getUTCFullYear()}-${mm}-01`;
}

function mesSiguienteKey(): string {
  const d = new Date();
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}`;
}

describe("calcularCuotas", () => {
  it("reparte el importe entre los meses, la última cuota absorbe el redondeo", () => {
    const cuotas = calcularCuotas(
      compra({ importe: 1000, meses: 3, fechaCompra: "2026-03-10" }),
      tarjeta({ diaCorte: 10, diaLimitePago: 5 }),
    );

    expect(cuotas.map((c) => c.monto)).toEqual([333.33, 333.33, 333.34]);
    expect(cuotas.map((c) => c.fechaVencimiento)).toEqual([
      "2026-04-05",
      "2026-05-05",
      "2026-06-05",
    ]);
  });

  it("compra el mismo día del corte entra en el estado de cuenta de ese corte", () => {
    const cuotas = calcularCuotas(
      compra({ importe: 300, meses: 3, fechaCompra: "2026-02-15" }),
      tarjeta({ diaCorte: 15, diaLimitePago: 10 }),
    );

    expect(cuotas[0]?.fechaVencimiento).toBe("2026-03-10");
  });

  it("compra el día después del corte entra en el siguiente estado de cuenta", () => {
    const cuotas = calcularCuotas(
      compra({ importe: 300, meses: 3, fechaCompra: "2026-02-16" }),
      tarjeta({ diaCorte: 15, diaLimitePago: 10 }),
    );

    expect(cuotas[0]?.fechaVencimiento).toBe("2026-04-10");
  });

  it("corte el día 31 en un mes de 30 (o 28/29) días usa el último día real del mes", () => {
    const cuotas = calcularCuotas(
      compra({ importe: 300, meses: 3, fechaCompra: "2026-02-01" }),
      tarjeta({ diaCorte: 31, diaLimitePago: 1 }),
    );

    // Corte se calcula para 2026-02-28 (no se desborda a marzo), así que el
    // primer vencimiento cae en marzo, no en abril.
    expect(cuotas.map((c) => c.fechaVencimiento)).toEqual([
      "2026-03-01",
      "2026-04-01",
      "2026-05-01",
    ]);
  });

  it("cambio de año: la primera cuota cae en enero del año siguiente", () => {
    const cuotas = calcularCuotas(
      compra({ importe: 300, meses: 3, fechaCompra: "2026-12-21" }),
      tarjeta({ diaCorte: 20, diaLimitePago: 10 }),
    );

    expect(cuotas[0]?.fechaVencimiento).toBe("2027-02-10");
  });

  it("importe no divisible entre los meses: el redondeo cuadra exacto en la última cuota", () => {
    const cuotas = calcularCuotas(
      compra({ importe: 100, meses: 3, fechaCompra: "2026-05-01" }),
      tarjeta({ diaCorte: 1, diaLimitePago: 1 }),
    );

    const sumaCents = cuotas.reduce((s, c) => s + Math.round(c.monto * 100), 0);
    expect(sumaCents).toBe(10000);
    expect(cuotas.map((c) => c.monto)).toEqual([33.33, 33.33, 33.34]);
  });

  it("compra liquidada anticipadamente no genera cuotas a partir del mes de liquidación", () => {
    const cuotas = calcularCuotas(
      compra({
        importe: 600,
        meses: 6,
        fechaCompra: "2026-01-01",
        liquidadaEn: "2026-04-01",
      }),
      tarjeta({ diaCorte: 1, diaLimitePago: 1 }),
    );

    expect(cuotas.map((c) => c.fechaVencimiento)).toEqual([
      "2026-02-01",
      "2026-03-01",
    ]);
  });
});

describe("calcularCompromisoMensual", () => {
  it("suma cuotas de varias compras y varias tarjetas que vencen en el mismo mes", () => {
    const fechaCompra = primerDiaMesActualISO();
    const tarjetas = [
      tarjeta({ id: "A", diaCorte: 5, diaLimitePago: 1 }),
      tarjeta({ id: "B", diaCorte: 5, diaLimitePago: 1 }),
    ];
    const compras = [
      compra({ id: "c1", cardId: "A", importe: 900, meses: 3, fechaCompra }),
      compra({ id: "c2", cardId: "B", importe: 450, meses: 3, fechaCompra }),
    ];

    const resultado = calcularCompromisoMensual(compras, tarjetas, null);
    const siguiente = resultado.find((m) => m.mes === mesSiguienteKey());

    expect(resultado[0]?.total).toBe(0);
    expect(siguiente?.total).toBe(450);
  });

  it("devuelve total 0 para un mes sin cuotas pendientes", () => {
    const resultado = calcularCompromisoMensual([], [], null);

    expect(resultado).toHaveLength(12);
    expect(resultado.every((m) => m.total === 0)).toBe(true);
  });

  it("porcentajeIngreso es null cuando no hay ingresoMensual declarado", () => {
    const fechaCompra = primerDiaMesActualISO();
    const tarjetas = [tarjeta({ id: "A", diaCorte: 5, diaLimitePago: 1 })];
    const compras = [compra({ cardId: "A", importe: 300, fechaCompra })];

    const resultado = calcularCompromisoMensual(compras, tarjetas, null);

    expect(resultado.every((m) => m.porcentajeIngreso === null)).toBe(true);
  });

  it("respeta mesesAdelante (por defecto 12)", () => {
    expect(calcularCompromisoMensual([], [], null)).toHaveLength(12);
    expect(calcularCompromisoMensual([], [], null, 3)).toHaveLength(3);
    expect(calcularCompromisoMensual([], [], null, 24)).toHaveLength(24);
  });
});

describe("clasificarSemaforo", () => {
  it("verde por debajo del 15%", () => {
    expect(clasificarSemaforo(0)).toBe("verde");
    expect(clasificarSemaforo(0.1)).toBe("verde");
    expect(clasificarSemaforo(0.1499)).toBe("verde");
  });

  it("amarillo entre 15% y 30%", () => {
    expect(clasificarSemaforo(0.15)).toBe("amarillo");
    expect(clasificarSemaforo(0.25)).toBe("amarillo");
    expect(clasificarSemaforo(0.3)).toBe("amarillo");
  });

  it("rojo por encima del 30%", () => {
    expect(clasificarSemaforo(0.3001)).toBe("rojo");
    expect(clasificarSemaforo(0.5)).toBe("rojo");
  });
});

describe("simularCompra", () => {
  it("no modifica el array de compras existentes (función pura)", () => {
    const tarjetas = [tarjeta({ id: "A" })];
    const comprasExistentes = Object.freeze([
      compra({ id: "c1", cardId: "A" }),
    ]) as Compra[];

    expect(() =>
      simularCompra(
        { cardId: "A", importe: 300, meses: 3, fechaCompra: primerDiaMesActualISO() },
        comprasExistentes,
        tarjetas,
        1000,
      ),
    ).not.toThrow();
    expect(comprasExistentes).toHaveLength(1);
  });

  it("identifica el peor mes tras añadir la compra hipotética", () => {
    const tarjetas = [tarjeta({ id: "A", diaCorte: 5, diaLimitePago: 1 })];

    const resultado = simularCompra(
      { cardId: "A", importe: 900, meses: 3, fechaCompra: primerDiaMesActualISO() },
      [],
      tarjetas,
      1000,
    );

    expect(resultado.cuotaMensual).toBe(300);
    expect(resultado.peorMes.total).toBe(300);
    expect(resultado.porcentajeIngreso).toBe(0.3);
    expect(resultado.semaforo).toBe("amarillo");
  });

  it("devuelve porcentajeIngreso null si no hay ingreso declarado", () => {
    const tarjetas = [tarjeta({ id: "A", diaCorte: 5, diaLimitePago: 1 })];

    const resultado = simularCompra(
      { cardId: "A", importe: 900, meses: 3, fechaCompra: primerDiaMesActualISO() },
      [],
      tarjetas,
      null,
    );

    expect(resultado.porcentajeIngreso).toBeNull();
  });
});

describe("simularCompraRapida", () => {
  it("calcula la cuota como importe entre meses", () => {
    const r = simularCompraRapida(900, 3, 1000, 0);
    expect(r.cuotaMensual).toBe(300);
  });

  it("redondea cuando el importe no es divisible entre los meses", () => {
    const r = simularCompraRapida(100, 3, null, 0);
    expect(r.cuotaMensual).toBe(33.33);
  });

  it("suma lo que ya paga al mes (totalActualEnCuotas) a la cuota nueva", () => {
    const r = simularCompraRapida(300, 3, 1000, 250);
    expect(r.cuotaMensual).toBe(100);
    expect(r.compromisoTotal).toBe(350);
  });

  it("porcentajeIngreso es null si no hay ingreso declarado", () => {
    const r = simularCompraRapida(300, 3, null, 0);
    expect(r.porcentajeIngreso).toBeNull();
  });

  it("clasifica el semáforo según el compromiso total sobre el ingreso", () => {
    expect(simularCompraRapida(100, 3, 1000, 0).semaforo).toBe("verde"); // ~3.3%
    expect(simularCompraRapida(600, 3, 1000, 0).semaforo).toBe("amarillo"); // 20%
    expect(simularCompraRapida(1200, 3, 1000, 0).semaforo).toBe("rojo"); // 40%
  });
});
