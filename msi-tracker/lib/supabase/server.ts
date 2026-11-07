import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// Para Server Components y Route Handlers. Cada llamada lee las cookies de
// la request actual, así que se crea un cliente nuevo por request (nunca se
// reutiliza entre requests).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[],
        ) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Llamado desde un Server Component sin posibilidad de escribir
            // cookies - el middleware ya se encarga de refrescar la sesión.
          }
        },
      },
    },
  );
}
