import type { Answers } from "../data/witmeQuestions";
import type { BreakdownItem } from "../lib/types";
import type { LenderOffer } from "../lib/witme";
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
  offers: LenderOffer[];
  clickId: string | null;
  applicationSubmitted: boolean;
  onComplete: (answers: Answers) => void;
}

export function SolicitudWidget({ stage, scoreData, offers, clickId, applicationSubmitted, onComplete }: Props) {
  return (
    <div className="widget" id="widget">
      {stage === "form" && <WitmeForm onComplete={onComplete} />}

      {stage === "loading" && (
        <div className="quiz-card">
          <p className="loading-text">Calculando tu puntuación y buscando tus mejores ofertas…</p>
        </div>
      )}

      {stage === "result" && scoreData && (
        <SolicitudResult
          score={scoreData.score}
          scoreBand={scoreData.scoreBand}
          breakdown={scoreData.breakdown}
          capacidadMensual={scoreData.capacidadMensual}
          capacidadMaxima={scoreData.capacidadMaxima}
          offers={offers}
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
