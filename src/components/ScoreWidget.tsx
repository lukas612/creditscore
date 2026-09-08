import type { Answers } from "../data/questions";
import type { ScoreResult, Stage } from "../lib/types";
import { Quiz } from "./Quiz";
import { ResultGate } from "./ResultGate";
import { ResultFull } from "./ResultFull";

interface Props {
  stage: Stage;
  result: ScoreResult | null;
  quizAnswers: Answers | null;
  clickId: string | null;
  onComplete: (answers: Answers) => void;
  onUnlock: () => void;
}

export function ScoreWidget({
  stage,
  result,
  quizAnswers,
  clickId,
  onComplete,
  onUnlock,
}: Props) {
  return (
    <div className="widget" id="widget">
      {stage === "quiz" && <Quiz onComplete={onComplete} />}

      {stage === "loading" && (
        <div className="quiz-card">
          <p className="loading-text">Calculando tu puntuación…</p>
        </div>
      )}

      {stage === "gate" && result && (
        <ResultGate
          quizSessionId={result.quizSessionId}
          score={result.score}
          scoreBand={result.scoreBand}
          zipCode={result.zipCode}
          clickId={clickId}
          onUnlock={onUnlock}
        />
      )}

      {stage === "unlocked" && result && quizAnswers && (
        <ResultFull
          score={result.score}
          scoreBand={result.scoreBand}
          breakdown={result.breakdown}
          capacidadMensual={result.capacidadMensual}
          capacidadMaxima={result.capacidadMaxima}
          baseAnswers={quizAnswers}
        />
      )}

      {stage === "error" && (
        <div className="quiz-card">
          <p className="loading-text">
            Ha ocurrido un error al calcular tu puntuación. Recarga la página e inténtalo
            de nuevo.
          </p>
        </div>
      )}
    </div>
  );
}
