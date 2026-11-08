"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useCuenta } from "@/lib/supabase/useCuenta";
import type { Plazo } from "@/lib/msi";

const PLAZOS: Plazo[] = [3, 6, 9, 12, 18, 24];

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function ComprasPage() {
  const { cuenta, cargando, recargar } = useCuenta();

  const [cardId, setCardId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [comercio, setComercio] = useState("");
  const [importe, setImporte] = useState("");
  const [meses, setMeses] = useState<Plazo>(12);
  const [fechaCompra, setFechaCompra] = useState(hoyISO());
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cuenta) return;
    setError(null);

    const tarjeta = cardId || cuenta.cards[0]?.id;
    if (!tarjeta) {
      setError("Primero añade una tarjeta.");
      return;
    }

    setEnviando(true);
    const { error: insertError } = await supabase.from("purchases").insert({
      user_id: cuenta.userId,
      card_id: tarjeta,
      descripcion,
      comercio: comercio || null,
      importe: Number(importe),
      meses,
      fecha_compra: fechaCompra,
    });

    setEnviando(false);

    if (insertError) {
      if (insertError.message.includes("limite_plan_gratis_compras")) {
        setError("El plan gratis permite 3 compras. Pásate a Pro para añadir más.");
      } else {
        setError("No pudimos guardar la compra. Intenta de nuevo.");
      }
      return;
    }

    setDescripcion("");
    setComercio("");
    setImporte("");
    recargar();
  }

  async function handleLiquidar(id: string) {
    await supabase.from("purchases").update({ liquidada_en: hoyISO() }).eq("id", id);
    recargar();
  }

  async function handleDelete(id: string) {
    await supabase.from("purchases").delete().eq("id", id);
    recargar();
  }

  if (cargando || !cuenta) return null;

  if (cuenta.cards.length === 0) {
    return (
      <main className="mx-auto max-w-sm px-4 py-6">
        <p className="text-sm text-gray-600">
          Primero necesitas{" "}
          <Link href="/tarjetas/" className="underline">
            añadir una tarjeta
          </Link>
          .
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Tus compras</h1>
        <Link href="/dashboard/" className="text-sm text-gray-500 underline">
          Volver
        </Link>
      </div>

      <ul className="mb-6 flex flex-col gap-2">
        {cuenta.purchases.map((p) => (
          <li key={p.id} className="rounded-md border border-gray-200 p-3 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">{p.descripcion}</span>
              <span>${p.importe} MXN</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
              <span>{p.meses} meses · {p.fecha_compra}</span>
              <div className="flex gap-2">
                {!p.liquidada_en && (
                  <button
                    type="button"
                    onClick={() => handleLiquidar(p.id)}
                    className="underline"
                  >
                    Marcar liquidada
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mb-2 text-sm font-semibold">Añadir compra</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Tarjeta
          <select
            value={cardId || cuenta.cards[0]?.id}
            onChange={(e) => setCardId(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            {cuenta.cards.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Descripción
          <input
            type="text"
            required
            placeholder="Pantalla, viaje, etc."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Comercio (opcional)
          <input
            type="text"
            value={comercio}
            onChange={(e) => setComercio(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <div className="flex gap-3">
          <label className="flex flex-1 flex-col gap-1 text-sm">
            Importe
            <input
              type="number"
              required
              min={0}
              inputMode="decimal"
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="flex flex-1 flex-col gap-1 text-sm">
            Meses
            <select
              value={meses}
              onChange={(e) => setMeses(Number(e.target.value) as Plazo)}
              className="rounded-md border border-gray-300 px-3 py-2"
            >
              {PLAZOS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          Fecha de compra
          <input
            type="date"
            required
            value={fechaCompra}
            onChange={(e) => setFechaCompra(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {enviando ? "Guardando..." : "Añadir compra"}
        </button>
      </form>
    </main>
  );
}
