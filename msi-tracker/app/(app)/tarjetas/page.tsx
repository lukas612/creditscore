"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useCuenta } from "@/lib/supabase/useCuenta";

export default function TarjetasPage() {
  const { cuenta, cargando, recargar } = useCuenta();

  const [nombre, setNombre] = useState("");
  const [banco, setBanco] = useState("");
  const [diaCorte, setDiaCorte] = useState("1");
  const [diaLimitePago, setDiaLimitePago] = useState("15");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cuenta) return;
    setError(null);
    setEnviando(true);

    const { error: insertError } = await supabase.from("cards").insert({
      user_id: cuenta.userId,
      nombre,
      banco: banco || null,
      dia_corte: Number(diaCorte),
      dia_limite_pago: Number(diaLimitePago),
    });

    setEnviando(false);

    if (insertError) {
      if (insertError.message.includes("limite_plan_gratis_tarjetas")) {
        setError("El plan gratis permite 1 tarjeta. Pásate a Pro para añadir más.");
      } else {
        setError("No pudimos guardar la tarjeta. Intenta de nuevo.");
      }
      return;
    }

    setNombre("");
    setBanco("");
    recargar();
  }

  async function handleDelete(id: string) {
    await supabase.from("cards").delete().eq("id", id);
    recargar();
  }

  if (cargando || !cuenta) return null;

  return (
    <main className="mx-auto max-w-sm px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Tus tarjetas</h1>
        <Link href="/dashboard/" className="text-sm text-gray-500 underline">
          Volver
        </Link>
      </div>

      <ul className="mb-6 flex flex-col gap-2">
        {cuenta.cards.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between rounded-md border border-gray-200 p-3 text-sm"
          >
            <div>
              <p className="font-medium">{c.nombre}</p>
              <p className="text-xs text-gray-500">
                {c.banco ? `${c.banco} · ` : ""}corte día {c.dia_corte}, pago día{" "}
                {c.dia_limite_pago}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(c.id)}
              className="text-xs text-red-600 underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h2 className="mb-2 text-sm font-semibold">Añadir tarjeta</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Nombre
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Banco (opcional)
          <input
            type="text"
            value={banco}
            onChange={(e) => setBanco(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <div className="flex gap-3">
          <label className="flex flex-1 flex-col gap-1 text-sm">
            Día de corte
            <input
              type="number"
              required
              min={1}
              max={31}
              value={diaCorte}
              onChange={(e) => setDiaCorte(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="flex flex-1 flex-col gap-1 text-sm">
            Día límite de pago
            <input
              type="number"
              required
              min={1}
              max={31}
              value={diaLimitePago}
              onChange={(e) => setDiaLimitePago(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {enviando ? "Guardando..." : "Añadir tarjeta"}
        </button>
      </form>
    </main>
  );
}
