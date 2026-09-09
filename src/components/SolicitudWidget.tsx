import { SCORE_PHASES, EXTRA_PHASES, visibleScoreQuestions, visibleExtraQuestions, type Answers } from "../data/witmeQuestions";
import type { BreakdownItem } from "../lib/types";
import type { LenderOffer } from "../lib/witme";
import { LoadingSpinner } from "./LoadingSpinner";
import { SolicitudResult } from "./SolicitudResult";
import { WitmeForm } from "./WitmeForm";
import { WitmeGate, type GateContact } from "./WitmeGate";

type Stage = "quiz" | "loading" | "gate" | "extra" | "submitting" | "result" | "error";

interface ScoreData {
  quizSessionId: string;
  score: number;
  scoreBand: string;
  breakdown: BreakdownItem[];
  capacidadMensual: number;
  capacidadMaxima: number;
  approvalProbability: number | null;
}

interface Props {
  stage: Stage;
  answers: Answers;
  scoreData: ScoreData | null;
  witmeOffers: LenderOffer[];
  fetchingMoreOffers: boolean;
  clickId: string | null;
  applicationSubmitted: boolean;
  onQuizComplete: (answers: Answers) => void;
  onGateUnlock: (contact: GateContact) => void;
  onExtraComplete: (answers: Answers) => void;
}

export function SolicitudWidget({
  stage,
  answers,
  scoreData,
  witmeOffers,
  fetchingMoreOffers,
  clickId,
  applicationSubmitted,
  onQuizComplete,
  onGateUnlock,
  onExtraComplete,
}: Props) {
  return (
    <div className="widget" id="widget">
      {stage === "quiz" && (
        <WitmeForm visibleQuestions={visibleScoreQuestions} phases={SCORE_PHASES} onComplete={onQuizComplete} />
      )}

      {stage === "loading" && (
        <div className="quiz-card">
          <LoadingSpinner text="Estamos calculando tu score, danos unos segundos…" />
        </div>
      )}

      {stage === "gate" && scoreData && (
        <WitmeGate
          quizSessionId={scoreData.quizSessionId}
          score={scoreData.score}
          scoreBand={scoreData.scoreBand}
          zipCode={String(answers.zipCode ?? "")}
          approvalProbability={scoreData.approvalProbability}
          clickId={clickId}
          onUnlock={onGateUnlock}
        />
      )}

      {stage === "extra" && (
        <WitmeForm
          initialAnswers={answers}
          visibleQuestions={visibleExtraQuestions}
          phases={EXTRA_PHASES}
          intro="Ya tenemos tu puntuación. Solo unos últimos datos para tramitar tu solicitud."
          onComplete={onExtraComplete}
        />
      )}

      {stage === "submitting" && (
        <div className="quiz-card">
          <LoadingSpinner text="Estamos tramitando tu solicitud, danos unos segundos…" />
        </div>
      )}

      {stage === "result" && scoreData && (
        <SolicitudResult
          score={scoreData.score}
          scoreBand={scoreData.scoreBand}
          breakdown={scoreData.breakdown}
          capacidadMensual={scoreData.capacidadMensual}
          capacidadMaxima={scoreData.capacidadMaxima}
          witmeOffers={witmeOffers}
          fetchingMoreOffers={fetchingMoreOffers}
          clickId={clickId}
          quizSessionId={scoreData.quizSessionId}
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
