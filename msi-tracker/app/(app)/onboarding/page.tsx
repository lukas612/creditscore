"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function OnboardingPage() {
  const router = useRouter();

  const [ingresoMensual, setIngresoMensual] = useState("");
  const [nombre, setNombre] = useState("");
  const [banco, setBanco] = useState("");
  const [diaCorte, setDiaCorte] = useState("1");
  const [diaLimitePago, setDiaLimitePago] = useState("15");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Tu sesión expiró, vuelve a iniciar sesión.");
      setEnviando(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ ingreso_mensual: Number(ingresoMensual) })
      .eq("id", user.id);

    if (profileError) {
      setError("No pudimos guardar tu ingreso. Intenta de nuevo.");
      setEnviando(false);
      return;
    }

    const { error: cardError } = await supabase.from("cards").insert({
      user_id: user.id,
      nombre,
      banco: banco || null,
      dia_corte: Number(diaCorte),
      dia_limite_pago: Number(diaLimitePago),
    });

    if (cardError) {
      setError("No pudimos guardar tu tarjeta. Intenta de nuevo.");
      setEnviando(false);
      return;
    }

    router.push("/dashboard/");
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-8">
      <h1 className="mb-2 text-xl font-semibold">Antes de empezar</h1>
      <p className="mb-6 text-sm text-gray-600">
        Con tu ingreso y tu primera tarjeta ya podemos calcular cuánto tienes
        comprometido cada mes.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <div className="border-t border-gray-200 pt-4">
          <p className="mb-3 text-sm font-medium">Tu primera tarjeta</p>

          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1 text-sm">
              Nombre (p. ej. "BBVA oro")
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
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="mt-2 rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {enviando ? "Guardando..." : "Empezar"}
        </button>
      </form>
    </main>
  );
}
