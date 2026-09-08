import type { Answers } from "../data/questions";
import { buildAdvisorUrl } from "../data/offers";
import type { BreakdownItem } from "../lib/types";
import { CreditBuilder } from "./CreditBuilder";
import { CreditOffers } from "./CreditOffers";
import { ScoreBreakdownChart } from "./ScoreBreakdownChart";
import { ShareResult } from "./ShareResult";

interface Props {
  score: number;
  scoreBand: string;
  breakdown: BreakdownItem[];
  capacidadMensual: number;
  capacidadMaxima: number;
  baseAnswers: Answers;
  clickId: string | null;
}

const BAND_COPY: Record<string, { title: string; tip: string }> = {
  excelente: {
    title: "¡Excelente!",
    tip: "Tu perfil encaja con las mejores condiciones del mercado: tipos de interés bajos y aprobación rápida.",
  },
  bueno: {
    title: "Bueno",
    tip: "Tienes un buen perfil crediticio. Puedes optar a la mayoría de préstamos personales sin problema.",
  },
  regular: {
    title: "Regular",
    tip: "Hay margen de mejora. Reducir tu deuda actual o aumentar tus ingresos declarados mejoraría tu puntuación.",
  },
  bajo: {
    title: "Bajo",
    tip: "Puede costarte más acceder a financiación estándar, pero tenemos opciones pensadas para tu situación.",
  },
};

const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function ResultFull({
  score,
  scoreBand,
  breakdown,
  capacidadMensual,
  capacidadMaxima,
  clickId,
}: Props) {
  const copy = BAND_COPY[scoreBand] ?? BAND_COPY.regular;
  const pct = Math.round(((score - 300) / (850 - 300)) * 100);

  return (
    <div className="result-card">
      <div className="score-gauge">
        <div className="score-gauge-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="score-value">{score}</span>
      <span className="score-band">{copy.title}</span>
      <p className="result-sub">{copy.tip}</p>

      <CreditOffers clickId={clickId} />

      <ShareResult score={score} scoreBand={scoreBand} />

      <div className="capacity-section">
        <p className="breakdown-title">Capacidad de crédito estimada</p>
        <div className="capacity-grid">
          <div className="capacity-stat">
            <span className="capacity-value">{currency.format(capacidadMensual)}</span>
            <span className="capacity-label">Cuota mensual máxima recomendada</span>
          </div>
          <div className="capacity-stat">
            <span className="capacity-value">{currency.format(capacidadMaxima)}</span>
            <span className="capacity-label">Importe estimado al que podrías optar</span>
          </div>
        </div>
        <p className="capacity-disclaimer">
          Estimación orientativa a partir de tus ingresos y deudas declaradas, sin
          intereses aplicados. No es una oferta de crédito ni una aprobación garantizada.
        </p>
      </div>

      <div className="breakdown-section">
        <p className="breakdown-title">Desglose de tu puntuación</p>
        <ScoreBreakdownChart breakdown={breakdown} />
      </div>

      <CreditBuilder breakdown={breakdown} />

      <a className="btn-link" href={buildAdvisorUrl(clickId)} target="_blank" rel="noreferrer">
        Prefiero hablar con un asesor
      </a>
    </div>
  );
}
