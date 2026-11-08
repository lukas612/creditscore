// Tipos de las filas de Supabase (coinciden con supabase/migrations/0001_init.sql).
// A mano en vez de generados: el esquema es pequeño y ya vive documentado ahí.

export interface ProfileRow {
  id: string;
  ingreso_mensual: number | null;
  plan: "free" | "pro";
  stripe_customer_id: string | null;
  avisos_activos: boolean;
  created_at: string;
  updated_at: string;
}

export interface CardRow {
  id: string;
  user_id: string;
  nombre: string;
  banco: string | null;
  dia_corte: number;
  dia_limite_pago: number;
  created_at: string;
}

export interface PurchaseRow {
  id: string;
  user_id: string;
  card_id: string;
  descripcion: string;
  comercio: string | null;
  importe: number;
  meses: number;
  fecha_compra: string;
  liquidada_en: string | null;
  created_at: string;
}
