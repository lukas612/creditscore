import { SCORE_PHASES, EXTRA_PHASES, visibleScoreQuestions, visibleExtraQuestions, type Answers } from "../data/witmeQuestions";
import type { BreakdownItem } from "../lib/types";
import { LoadingSpinner } from "./LoadingSpinner";
import { SolicitudResult } from "./SolicitudResult";
import { WitmeForm } from "./WitmeForm";
import { WitmeGate, type GateContact } from "./WitmeGate";

type Stage = "quiz" | "loading" | "gate" | "extra" | "submitting" | "redirecting" | "result" | "error";

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
  clickId: string | null;
  applicationSubmitted: boolean;
  onQuizComplete: (answers: Answers) => void;
  onGateUnlock: (contact: GateContact) => void;
  onExtraComplete: (answers: Answers) => void;
}

export function PingtreeWidget({
  stage,
  answers,
  scoreData,
  clickId,
  applicationSubmitted,
  onQuizComplete,
  onGateUnlock,
  onExtraComplete,
}: Props) {
  return (
    <div className="widget" id="widget">
      {stage === "quiz" && (
        <WitmeForm visibleQuestions={visibleScoreQuestions} phases={SCORE_PHASES} source="pingtree" onComplete={onQuizComplete} />
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
          source="pingtree"
          onUnlock={onGateUnlock}
        />
      )}

      {stage === "extra" && (
        <WitmeForm
          initialAnswers={answers}
          visibleQuestions={visibleExtraQuestions}
          phases={EXTRA_PHASES}
          intro="Ya tenemos tu puntuación. Solo unos últimos datos para tramitar tu solicitud."
          source="pingtree"
          onComplete={onExtraComplete}
        />
      )}

      {stage === "submitting" && scoreData && (
        <div className="quiz-card">
          <div className="score-teaser">
            <span className="score-teaser-value">{scoreData.score}</span>
            <span className="score-teaser-blur">/ 850</span>
          </div>
          <LoadingSpinner text="Con tu score, te vamos a redirigir a tu mejor opción…" />
        </div>
      )}

      {stage === "redirecting" && (
        <div className="quiz-card">
          <LoadingSpinner text="Te estamos redirigiendo a tu oferta…" />
        </div>
      )}

      {stage === "result" && scoreData && (
        <SolicitudResult
          score={scoreData.score}
          scoreBand={scoreData.scoreBand}
          breakdown={scoreData.breakdown}
          capacidadMensual={scoreData.capacidadMensual}
          capacidadMaxima={scoreData.capacidadMaxima}
          witmeOffers={[]}
          fetchingMoreOffers={false}
          clickId={clickId}
          quizSessionId={scoreData.quizSessionId}
          applicationSubmitted={applicationSubmitted}
          offersSource="pingtree"
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
