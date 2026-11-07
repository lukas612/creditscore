"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { SimuladorLanding } from "@/components/simulador/SimuladorLanding";

export default function HomePage() {
  const [tieneSesion, setTieneSesion] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setTieneSesion(!!session);
    });
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col px-4 py-8">
      {tieneSesion && (
        <Link href="/dashboard/" className="mb-4 self-end text-sm text-gray-500 underline">
          Ir a mi dashboard
        </Link>
      )}

      <h1 className="mb-2 text-2xl font-bold">¿Te cabe otra compra a meses?</h1>
      <p className="mb-6 text-sm text-gray-600">
        Suma todos tus meses sin intereses y descubre cuánto tienes
        comprometido cada mes.
      </p>

      <SimuladorLanding />

      <p className="mt-8 text-center text-xs text-gray-400">
        Herramienta informativa, no es asesoría financiera.
      </p>
    </main>
  );
}
