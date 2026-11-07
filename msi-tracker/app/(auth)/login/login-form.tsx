"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase, BASE_PATH } from "@/lib/supabase/client";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard/";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // Flujo implícito: el enlace del correo ya trae los tokens en el hash,
    // así que apunta directo al destino final (no hay ruta de callback).
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}${BASE_PATH}${next}`,
      },
    });

    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <p className="rounded-md bg-emerald-50 p-4 text-sm text-emerald-700">
        Listo, revisa tu correo ({email}) y abre el enlace para entrar.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        required
        placeholder="tucorreo@ejemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {status === "sending" ? "Enviando..." : "Enviarme el enlace"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          No pudimos enviar el enlace. Intenta de nuevo.
        </p>
      )}
    </form>
  );
}
