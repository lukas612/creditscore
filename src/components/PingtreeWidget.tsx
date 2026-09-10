import { SCORE_PHASES, EXTRA_PHASES, visibleScoreQuestions, visibleExtraQuestions, type Answers } from "../data/witmeQuestions";
import { LoadingSpinner } from "./LoadingSpinner";
import { WitmeForm } from "./WitmeForm";
import { WitmeGate, type GateContact } from "./WitmeGate";

type Stage = "quiz" | "loading" | "gate" | "extra" | "submitting" | "redirecting" | "no-offer" | "error";

interface ScoreData {
  quizSessionId: string;
  score: number;
  scoreBand: string;
  approvalProbability: number | null;
}

interface Props {
  stage: Stage;
  answers: Answers;
  scoreData: ScoreData | null;
  clickId: string | null;
  onQuizComplete: (answers: Answers) => void;
  onGateUnlock: (contact: GateContact) => void;
  onExtraComplete: (answers: Answers) => void;
}

export function PingtreeWidget({
  stage,
  answers,
  scoreData,
  clickId,
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

      {(stage === "submitting" || stage === "redirecting") && (
        <div className="quiz-card">
          <LoadingSpinner
            text={
              stage === "redirecting"
                ? "Te estamos redirigiendo a tu oferta…"
                : "Estamos tramitando tu solicitud, danos unos segundos…"
            }
          />
        </div>
      )}

      {stage === "no-offer" && (
        <div className="quiz-card">
          <p className="loading-text">
            No hemos encontrado ninguna oferta disponible para tu perfil en este momento.
            Inténtalo de nuevo más adelante.
          </p>
        </div>
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
