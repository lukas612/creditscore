"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login/");
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium"
    >
      Cerrar sesión
    </button>
  );
}
