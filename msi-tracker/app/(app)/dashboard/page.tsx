import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-2 text-xl font-semibold">Sesión iniciada</h1>
      <p className="mb-6 text-sm text-gray-600">{user?.email}</p>
      <LogoutButton />
    </main>
  );
}
