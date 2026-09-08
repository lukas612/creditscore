// Recomendaciones mostradas solo cuando el factor resta puntos (points < 0).
// Consistentes con lo que realmente pesa en calculate_score (ver migraciones
// de Supabase), para no prometer mejoras que el modelo no contempla.
export const NEGATIVE_TIPS: Record<string, string> = {
  ingresos:
    "Unos ingresos mensuales más altos o estables mejorarían este factor. Si tienes ingresos adicionales, inclúyelos la próxima vez.",
  empleo:
    "Un contrato estable (indefinido, funcionario) pesa más que estar desempleado o depender de ingresos muy variables.",
  vivienda: "Tener una vivienda en propiedad suma puntos extra a este factor.",
  deudas:
    "Reducir tu deuda actual, o mantenerla por debajo de un tercio de tus ingresos anuales, mejoraría mucho este factor.",
  asnef:
    "Estar en Asnef u otro registro de morosos es el factor que más resta. Saldar la deuda que originó la inclusión es el único camino para revertirlo.",
  antiguedad:
    "Más tiempo en tu empleo o actividad actual mejora este factor de forma automática con el paso del tiempo.",
  edad: "Este factor mejora con el tiempo de forma automática; no depende de ninguna acción inmediata.",
};

const GENERIC_TIP = "Este factor está restando puntos a tu resultado.";

export function tipFor(key: string): string {
  return NEGATIVE_TIPS[key] ?? GENERIC_TIP;
}
