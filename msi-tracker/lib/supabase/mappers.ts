import type { Compra, Plazo, Tarjeta } from "@/lib/msi";
import type { CardRow, PurchaseRow } from "./types";

export function cardRowToTarjeta(row: CardRow): Tarjeta {
  return { id: row.id, diaCorte: row.dia_corte, diaLimitePago: row.dia_limite_pago };
}

export function purchaseRowToCompra(row: PurchaseRow): Compra {
  return {
    id: row.id,
    cardId: row.card_id,
    importe: row.importe,
    meses: row.meses as Plazo,
    fechaCompra: row.fecha_compra,
    liquidadaEn: row.liquidada_en,
  };
}
