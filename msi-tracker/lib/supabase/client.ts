import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// App 100% cliente (export estático, sin servidor Node): la sesión vive en
// localStorage y el magic link llega como tokens en el hash de la URL
// (`detectSessionInUrl` los consume solo, en la primera página que cargue).
export const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      flowType: "implicit",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

// Prefijo de ruta cuando se sirve desde una subcarpeta (p. ej. GitHub Pages
// en /msi-tracker). Debe coincidir con `basePath` en next.config.ts.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
