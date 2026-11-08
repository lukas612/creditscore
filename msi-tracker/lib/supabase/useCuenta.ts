"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { CardRow, ProfileRow, PurchaseRow } from "./types";

export interface Cuenta {
  userId: string;
  profile: ProfileRow;
  cards: CardRow[];
  purchases: PurchaseRow[];
}

/** Carga perfil + tarjetas + compras del usuario en sesión. Pensado para
 * usarse en varias pantallas del dashboard sin repetir el fetch a mano. */
export function useCuenta() {
  const [cuenta, setCuenta] = useState<Cuenta | null>(null);
  const [cargando, setCargando] = useState(true);

  const recargar = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setCuenta(null);
      setCargando(false);
      return;
    }

    const [{ data: profile }, { data: cards }, { data: purchases }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("cards").select("*").eq("user_id", user.id).order("created_at"),
      supabase.from("purchases").select("*").eq("user_id", user.id).order("created_at"),
    ]);

    if (profile) {
      setCuenta({
        userId: user.id,
        profile: profile as ProfileRow,
        cards: (cards ?? []) as CardRow[],
        purchases: (purchases ?? []) as PurchaseRow[],
      });
    }
    setCargando(false);
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  return { cuenta, cargando, recargar };
}
