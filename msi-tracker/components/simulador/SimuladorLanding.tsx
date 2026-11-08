"use client";

import { useState } from "react";
import Link from "next/link";
import { simularCompraRapida, type Plazo } from "@/lib/msi";
import { SEMAFORO_ESTILO, formatMXN } from "@/lib/ui/semaforo";
import { trackPixelEvent } from "@/lib/pixel";

const PLAZOS: Plazo[] = [3, 6, 9, 12, 18, 24];

export function SimuladorLanding() {
  const [ingresoMensual, setIngresoMensual] = useState("");
  const [totalActualEnCuotas, setTotalActualEnCuotas] = useState("");
  const [importe, setImporte] = useState("");
  const [meses, setMeses] = useState<Plazo>(12);
  const [resultado, setResultado] = useState<ReturnType<typeof simularCompraRapida> | null>(
    null,
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const ingreso = ingresoMensual ? Number(ingresoMensual) : null;
    const actual = totalActualEnCuotas ? Number(totalActualEnCuotas) : 0;
    const monto = Number(importe);

    const r = simularCompraRapida(monto, meses, ingreso, actual);
    setResultado(r);
    trackPixelEvent("SimulacionCompletada", { semaforo: r.semaforo });
  }

  if (resultado) {
    const estilo = SEMAFORO_ESTILO[resultado.semaforo];

    return (
      <section className="flex flex-col gap-4">
        <div className={`rounded-xl p-5 ${estilo.bg} ${estilo.texto}`}>
          <p className="text-sm opacity-90">{estilo.etiqueta}</p>
          <p className="mt-1 text-3xl font-bold">{formatMXN(resultado.cuotaMensual)}</p>
          <p className="text-sm opacity-90">cuota mensual de esta compra</p>
        </div>

        <div className="rounded-xl border border-gray-200 p-4 text-sm">
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Total comprometido al mes</span>
            <span className="font-medium">{formatMXN(resultado.compromisoTotal)}</span>
          </div>
          {resultado.porcentajeIngreso !== null ? (
            <div className="flex justify-between py-1">
              <span className="text-gray-600">% de tu ingreso</span>
              <span className="font-medium">
                {(resultado.porcentajeIngreso * 100).toFixed(0)}%
              </span>
            </div>
          ) : (
            <p className="py-1 text-gray-500">
              Pon tu ingreso mensual para ver qué porcentaje representa.
            </p>
          )}
        </div>

        <Link
          href="/login/"
          className="rounded-md bg-gray-900 px-4 py-3 text-center text-sm font-medium text-white"
        >
          Guarda tus compras y te avisamos antes de cada pago
        </Link>
        <button
          type="button"
          onClick={() => setResultado(null)}
          className="text-center text-sm text-gray-500 underline"
        >
          Simular otra compra
        </button>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        Tu ingreso mensual neto
        <input
          type="number"
          inputMode="decimal"
          required
          min={0}
          placeholder="15000"
          value={ingresoMensual}
          onChange={(e) => setIngresoMensual(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Lo que ya pagas al mes en otras MSI (opcional)
        <input
          type="number"
          inputMode="decimal"
          min={0}
          placeholder="0"
          value={totalActualEnCuotas}
          onChange={(e) => setTotalActualEnCuotas(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        La compra que estás pensando hacer
        <input
          type="number"
          inputMode="decimal"
          required
          min={0}
          placeholder="3000"
          value={importe}
          onChange={(e) => setImporte(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        A cuántos meses sin intereses
        <select
          value={meses}
          onChange={(e) => setMeses(Number(e.target.value) as Plazo)}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          {PLAZOS.map((p) => (
            <option key={p} value={p}>
              {p} meses
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="mt-2 rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white"
      >
        Calcula gratis
      </button>
    </form>
  );
}
