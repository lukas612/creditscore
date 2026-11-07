"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { LogoutButton } from "./logout-button";

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? null);
    });
  }, []);

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-2 text-xl font-semibold">Sesión iniciada</h1>
      <p className="mb-6 text-sm text-gray-600">{email}</p>
      <LogoutButton />
    </main>
  );
}
