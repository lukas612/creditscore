"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      // router.replace ya añade basePath automáticamente (next.config.ts).
      router.replace(session ? "/dashboard/" : "/login/");
    });

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
