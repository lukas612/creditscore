"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCuenta } from "@/lib/supabase/useCuenta";
import { cardRowToTarjeta, purchaseRowToCompra } from "@/lib/supabase/mappers";
import { calcularCompromisoMensual, calcularCuotas } from "@/lib/msi";
import { SEMAFORO_ESTILO, formatMXN } from "@/lib/ui/semaforo";
import { LogoutButton } from "./logout-button";

function mesActualKey(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const { cuenta, cargando } = useCuenta();

  const necesitaOnboarding =
    !cargando && cuenta && (cuenta.profile.ingreso_mensual === null || cuenta.cards.length === 0);

  useEffect(() => {
    if (necesitaOnboarding) router.replace("/onboarding/");
  }, [necesitaOnboarding, router]);

  const tarjetas = useMemo(() => cuenta?.cards.map(cardRowToTarjeta) ?? [], [cuenta]);
  const compras = useMemo(() => cuenta?.purchases.map(purchaseRowToCompra) ?? [], [cuenta]);
  const tarjetasPorId = useMemo(() => new Map(cuenta?.cards.map((c) => [c.id, c])), [cuenta]);

  const mesesAVer = cuenta?.profile.plan === "pro" ? 12 : 2;

  const compromiso = useMemo(() => {
    if (!cuenta) return [];
    return calcularCompromisoMensual(compras, tarjetas, cuenta.profile.ingreso_mensual, mesesAVer);
  }, [cuenta, compras, tarjetas, mesesAVer]);

  if (cargando || !cuenta || necesitaOnboarding) return null;

  const mesActual = compromiso[0];
  const maxTotal = Math.max(1, ...compromiso.map((m) => m.total));
  const key = mesActualKey();

  return (
    <main className="mx-auto max-w-sm px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Tu dashboard</h1>
        <LogoutButton />
      </div>

      {mesActual && (
        <div className={`rounded-xl p-5 ${SEMAFORO_ESTILO[mesActual.semaforo].bg} ${SEMAFORO_ESTILO[mesActual.semaforo].texto}`}>
          <p className="text-sm opacity-90">{SEMAFORO_ESTILO[mesActual.semaforo].etiqueta}</p>
          <p className="mt-1 text-3xl font-bold">{formatMXN(mesActual.total)}</p>
          <p className="text-sm opacity-90">
            comprometido este mes
            {mesActual.porcentajeIngreso !== null &&
              ` · ${(mesActual.porcentajeIngreso * 100).toFixed(0)}% de tu ingreso`}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-end gap-2">
        {compromiso.map((m) => (
          <div key={m.mes} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`w-full rounded-t ${SEMAFORO_ESTILO[m.semaforo].bg}`}
              style={{ height: `${Math.max(8, (m.total / maxTotal) * 80)}px` }}
              title={formatMXN(m.total)}
            />
            <span className="text-[10px] text-gray-500">{m.mes.slice(5)}</span>
          </div>
        ))}
      </div>

      {cuenta.profile.plan === "free" && (
        <Link href="/plan/" className="mt-2 block text-center text-xs text-gray-500 underline">
          Pásate a Pro para ver los 12 meses
        </Link>
      )}

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Tus compras</h2>
        <Link href="/compras/" className="text-sm text-gray-700 underline">
          Añadir compra
        </Link>
      </div>

      <ul className="mt-2 flex flex-col gap-2">
        {cuenta.purchases.length === 0 && (
          <li className="text-sm text-gray-500">Todavía no has añadido ninguna compra.</li>
        )}
        {cuenta.purchases.map((p) => {
          const tarjeta = tarjetasPorId.get(p.card_id);
          const compra = purchaseRowToCompra(p);
          const cuotas = tarjeta ? calcularCuotas(compra, cardRowToTarjeta(tarjeta)) : [];
          const pagadas = cuotas.filter((c) => c.fechaVencimiento.slice(0, 7) < key).length;
          const actual = Math.min(p.meses, pagadas + 1);

          return (
            <li key={p.id} className="rounded-md border border-gray-200 p-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">{p.descripcion}</span>
                <span>{formatMXN(p.importe)}</span>
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>{tarjeta?.nombre ?? "Tarjeta eliminada"}</span>
                <span>
                  {p.liquidada_en ? "Liquidada" : `cuota ${actual} de ${p.meses}`}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex justify-between text-sm">
        <Link href="/tarjetas/" className="text-gray-700 underline">
          Tarjetas
        </Link>
        <Link href="/ajustes/" className="text-gray-700 underline">
          Ajustes
        </Link>
      </div>
    </main>
  );
}
