import type { BreakdownItem } from "../lib/types";
import { ScoreBreakdownChart } from "./ScoreBreakdownChart";

interface Props {
  score: number;
  scoreBand: string;
  breakdown: BreakdownItem[];
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

export function ResultFull({ score, scoreBand, breakdown }: Props) {
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

      <div className="breakdown-section">
        <p className="breakdown-title">Desglose de tu puntuación</p>
        <ScoreBreakdownChart breakdown={breakdown} />
      </div>

      <a className="btn-primary btn-large" href="https://creditio.es" target="_blank" rel="noreferrer">
        Hablar con un asesor
      </a>
    </div>
  );
}
