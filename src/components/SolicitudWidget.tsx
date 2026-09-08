import type { Answers } from "../data/witmeQuestions";
import type { BreakdownItem } from "../lib/types";
import { SolicitudResult } from "./SolicitudResult";
import { WitmeForm } from "./WitmeForm";

type Stage = "form" | "loading" | "result" | "error";

interface ScoreData {
  score: number;
  scoreBand: string;
  breakdown: BreakdownItem[];
  capacidadMensual: number;
  capacidadMaxima: number;
}

interface Props {
  stage: Stage;
  scoreData: ScoreData | null;
  clickId: string | null;
  applicationSubmitted: boolean;
  onComplete: (answers: Answers) => void;
}

export function SolicitudWidget({ stage, scoreData, clickId, applicationSubmitted, onComplete }: Props) {
  return (
    <div className="widget" id="widget">
      {stage === "form" && <WitmeForm onComplete={onComplete} />}

      {stage === "loading" && (
        <div className="quiz-card">
          <p className="loading-text">Calculando tu puntuación y enviando tu solicitud…</p>
        </div>
      )}

      {stage === "result" && scoreData && (
        <SolicitudResult
          score={scoreData.score}
          scoreBand={scoreData.scoreBand}
          breakdown={scoreData.breakdown}
          capacidadMensual={scoreData.capacidadMensual}
          capacidadMaxima={scoreData.capacidadMaxima}
          clickId={clickId}
          applicationSubmitted={applicationSubmitted}
        />
      )}

      {stage === "error" && (
        <div className="quiz-card">
          <p className="loading-text">
            Ha ocurrido un error al procesar tu solicitud. Recarga la página e inténtalo
            de nuevo.
          </p>
        </div>
      )}
    </div>
  );
}
