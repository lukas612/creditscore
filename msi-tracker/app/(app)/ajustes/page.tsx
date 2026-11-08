"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useCuenta } from "@/lib/supabase/useCuenta";

export default function AjustesPage() {
  const router = useRouter();
  const { cuenta, cargando, recargar } = useCuenta();

  const [ingresoMensual, setIngresoMensual] = useState("");
  const [avisosActivos, setAvisosActivos] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [confirmandoBorrado, setConfirmandoBorrado] = useState(false);

  useEffect(() => {
    if (cuenta) {
      setIngresoMensual(String(cuenta.profile.ingreso_mensual ?? ""));
      setAvisosActivos(cuenta.profile.avisos_activos);
    }
  }, [cuenta]);

  async function handleGuardar(e: React.FormEvent) {
    e.preventDefault();
    if (!cuenta) return;
    setGuardando(true);

    await supabase
      .from("profiles")
      .update({
        ingreso_mensual: ingresoMensual ? Number(ingresoMensual) : null,
        avisos_activos: avisosActivos,
      })
      .eq("id", cuenta.userId);

    setGuardando(false);
    recargar();
  }

  async function handleBorrarTodo() {
    if (!cuenta) return;
    await supabase.from("cards").delete().eq("user_id", cuenta.userId);
    await supabase.from("profiles").update({ ingreso_mensual: null }).eq("id", cuenta.userId);
    router.push("/onboarding/");
  }

  async function handleCerrarSesion() {
    await supabase.auth.signOut();
    router.push("/login/");
  }

  if (cargando || !cuenta) return null;

  return (
    <main className="mx-auto max-w-sm px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Ajustes</h1>
        <Link href="/dashboard/" className="text-sm text-gray-500 underline">
          Volver
        </Link>
      </div>

      <form onSubmit={handleGuardar} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Ingreso mensual neto
          <input
            type="number"
            inputMode="decimal"
            min={0}
            value={ingresoMensual}
            onChange={(e) => setIngresoMensual(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={avisosActivos}
            onChange={(e) => setAvisosActivos(e.target.checked)}
          />
          Avisos por email antes de cada pago
          {cuenta.profile.plan === "free" && (
            <span className="text-xs text-gray-400">(Pro)</span>
          )}
        </label>

        <button
          type="submit"
          disabled={guardando}
          className="rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </form>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="mb-2 text-sm text-gray-600">
          Cuenta: {cuenta.profile.plan === "pro" ? "Pro" : "Gratis"}
        </p>
        <button
          type="button"
          onClick={handleCerrarSesion}
          className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm"
        >
          Cerrar sesión
        </button>

        {confirmandoBorrado ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <p className="mb-3 text-sm text-red-700">
              Esto borra todas tus tarjetas y compras. No se puede deshacer.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleBorrarTodo}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white"
              >
                Sí, borrar todo
              </button>
              <button
                type="button"
                onClick={() => setConfirmandoBorrado(false)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmandoBorrado(true)}
            className="w-full text-center text-sm text-red-600 underline"
          >
            Borrar todos mis datos
          </button>
        )}
      </div>
    </main>
  );
}
