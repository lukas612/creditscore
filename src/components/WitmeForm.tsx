import { useEffect, useState } from "react";
import { visibleWitmeQuestions, type Answers } from "../data/witmeQuestions";
import { trackFunnelEvent } from "../lib/funnel";
import { ProgressBar } from "./ProgressBar";
import { ProgressRing } from "./ProgressRing";
import { Tooltip } from "./Tooltip";
import { WitmePhaseStepper } from "./WitmePhaseStepper";
import { WitmeQuestionStep } from "./WitmeQuestionStep";

interface Props {
  onComplete: (answers: Answers) => void;
}

const GENERIC_REASSURANCE = "🔒 Tus respuestas están cifradas y protegidas.";

export function WitmeForm({ onComplete }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);

  const steps = visibleWitmeQuestions(answers);
  const question = steps[stepIndex];
  const progress = (stepIndex + 1) / steps.length;
  const isLast = stepIndex === steps.length - 1;

  useEffect(() => {
    trackFunnelEvent("question_reached", question.key, "solicitud");
  }, [question.key]);

  const handleAnswer = (value: string | number | boolean) => {
    const next: Answers = { ...answers, [question.key]: value };
    setAnswers(next);

    const nextSteps = visibleWitmeQuestions(next);
    if (stepIndex + 1 >= nextSteps.length) {
      onComplete(next);
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  return (
    <div className="quiz-card">
      <WitmePhaseStepper current={question.phase} />
      <div className="quiz-progress-row">
        <ProgressBar current={stepIndex + 1} total={steps.length} />
        <ProgressRing percent={progress * 100} />
      </div>
      <div className="quiz-step-row">
        <p className="quiz-step-count">
          Pregunta {stepIndex + 1} de {steps.length}
        </p>
        {isLast ? (
          <span className="quiz-encouragement">Última pregunta 🎉</span>
        ) : (
          progress >= 0.6 && <span className="quiz-encouragement">Ya casi terminas 💪</span>
        )}
      </div>
      <h2 className="quiz-question">
        {question.label}
        {question.helpText && <Tooltip text={question.helpText} />}
      </h2>
      <WitmeQuestionStep
        key={question.key}
        question={question}
        value={answers[question.key]}
        onAnswer={handleAnswer}
      />
      <p className="reassurance-line">{GENERIC_REASSURANCE}</p>
      {stepIndex > 0 && (
        <button className="btn-link" onClick={handleBack}>
          ← Atrás
        </button>
      )}
    </div>
  );
}
