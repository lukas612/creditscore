"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useCuenta } from "@/lib/supabase/useCuenta";
import { trackPixelEvent } from "@/lib/pixel";

const FILAS: Array<[string, string, string]> = [
  ["Simulador \"¿Me cabe?\"", "Sí, sin registro", "Sí"],
  ["Compras guardadas", "Hasta 3", "Ilimitadas"],
  ["Tarjetas", "1", "Ilimitadas"],
  ["Calendario de cuotas", "Mes actual y siguiente", "12 meses"],
  ["Porcentaje del ingreso y semáforo", "Sí", "Sí"],
  ["Avisos por email antes de cada pago", "No", "Sí"],
  ["Exportar a CSV", "No", "Sí"],
];

export default function PlanPage() {
  const { cuenta, cargando } = useCuenta();
  const searchParams = useSearchParams();
  const pago = searchParams.get("pago");

  const [enviando, setEnviando] = useState<"month" | "year" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const yaDisparado = useRef(false);

  useEffect(() => {
    if (pago === "exito" && !yaDisparado.current) {
      yaDisparado.current = true;
      trackPixelEvent("CompraPro");
    }
  }, [pago]);

  async function handleUpgrade(interval: "month" | "year") {
    setError(null);
    setEnviando(interval);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError("Tu sesión expiró, vuelve a iniciar sesión.");
      setEnviando(null);
      return;
    }

    const { data, error: fnError } = await supabase.functions.invoke("msi-checkout", {
      body: { interval, origin: window.location.origin + "/msi-tracker" },
    });

    setEnviando(null);

    if (fnError || !data?.checkoutUrl) {
      setError("No se pudo iniciar el pago. Intenta de nuevo en un momento.");
      return;
    }

    window.location.href = data.checkoutUrl;
  }

  if (cargando || !cuenta) return null;

  return (
    <main className="mx-auto max-w-sm px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Plan Pro</h1>
        <Link href="/dashboard/" className="text-sm text-gray-500 underline">
          Volver
        </Link>
      </div>

      {pago === "exito" && (
        <p className="mb-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">
          Pago recibido. Tu plan se activa en unos segundos.
        </p>
      )}
      {pago === "cancelado" && (
        <p className="mb-4 rounded-md bg-gray-100 p-3 text-sm text-gray-600">
          Pago cancelado, no se te cobró nada.
        </p>
      )}

      {cuenta.profile.plan === "pro" ? (
        <p className="rounded-md bg-emerald-50 p-4 text-sm text-emerald-700">
          Ya tienes el plan Pro activo.
        </p>
      ) : (
        <>
          <table className="mb-6 w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-2"></th>
                <th className="py-2 font-medium text-gray-500">Gratis</th>
                <th className="py-2 font-medium text-gray-900">Pro</th>
              </tr>
            </thead>
            <tbody>
              {FILAS.map(([label, gratis, pro]) => (
                <tr key={label} className="border-b border-gray-100">
                  <td className="py-2 pr-2 text-gray-600">{label}</td>
                  <td className="py-2 text-gray-500">{gratis}</td>
                  <td className="py-2 font-medium">{pro}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleUpgrade("month")}
              disabled={enviando !== null}
              className="rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {enviando === "month" ? "Redirigiendo..." : "49 MXN al mes"}
            </button>
            <button
              type="button"
              onClick={() => handleUpgrade("year")}
              disabled={enviando !== null}
              className="rounded-md border border-gray-300 px-4 py-3 text-sm font-medium disabled:opacity-50"
            >
              {enviando === "year" ? "Redirigiendo..." : "399 MXN al año"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
