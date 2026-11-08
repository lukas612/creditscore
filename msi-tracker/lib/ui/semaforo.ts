import type { Semaforo } from "@/lib/msi";

export const SEMAFORO_ESTILO: Record<Semaforo, { bg: string; texto: string; etiqueta: string }> = {
  verde: { bg: "bg-semaforo-verde", texto: "text-white", etiqueta: "Vas bien" },
  amarillo: { bg: "bg-semaforo-amarillo", texto: "text-white", etiqueta: "Vigílalo" },
  rojo: { bg: "bg-semaforo-rojo", texto: "text-white", etiqueta: "Se te complica" },
};

export function formatMXN(n: number): string {
  return n.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
}
