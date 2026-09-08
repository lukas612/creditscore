import type { BreakdownItem } from "../lib/types";
import { ScoreBreakdownChart } from "./ScoreBreakdownChart";

const EXAMPLE_SCORE = 710;
const EXAMPLE_BAND = "Bueno";
const EXAMPLE_CAPACIDAD_MENSUAL = 630;
const EXAMPLE_CAPACIDAD_MAXIMA = 15120;
const EXAMPLE_BREAKDOWN: BreakdownItem[] = [
  { key: "ingresos", label: "Ingresos mensuales", points: 30 },
  { key: "empleo", label: "Situación laboral", points: 25 },
  { key: "vivienda", label: "Vivienda en propiedad", points: 35 },
  { key: "deudas", label: "Deudas y endeudamiento", points: -20 },
  { key: "edad", label: "Edad", points: 20 },
];

const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function ScorePreview() {
  const pct = Math.round(((EXAMPLE_SCORE - 300) / (850 - 300)) * 100);

  return (
    <section className="section">
      <p className="section-label">Tu informe, con todo el detalle</p>
      <div className="preview-wrap">
        <div className="preview-text">
          <p>
            No te quedas solo con un número. Tu resultado incluye cuánta financiación
            podrías asumir y un desglose por factores, para que sepas exactamente qué
            está pesando en tu puntuación y qué podrías mejorar.
          </p>
        </div>
        <div className="result-card preview-card">
          <span className="example-badge">Ejemplo ilustrativo</span>
          <div className="score-gauge">
            <div className="score-gauge-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="score-value">{EXAMPLE_SCORE}</span>
          <span className="score-band">{EXAMPLE_BAND}</span>

          <div className="capacity-section">
            <p className="breakdown-title">Capacidad de crédito estimada</p>
            <div className="capacity-grid">
              <div className="capacity-stat">
                <span className="capacity-value">
                  {currency.format(EXAMPLE_CAPACIDAD_MENSUAL)}
                </span>
                <span className="capacity-label">Cuota mensual máxima recomendada</span>
              </div>
              <div className="capacity-stat">
                <span className="capacity-value">
                  {currency.format(EXAMPLE_CAPACIDAD_MAXIMA)}
                </span>
                <span className="capacity-label">Importe estimado al que podrías optar</span>
              </div>
            </div>
          </div>

          <div className="breakdown-section">
            <p className="breakdown-title">Desglose de tu puntuación</p>
            <ScoreBreakdownChart breakdown={EXAMPLE_BREAKDOWN} />
          </div>
        </div>
      </div>
    </section>
  );
}
