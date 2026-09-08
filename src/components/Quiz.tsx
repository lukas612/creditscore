import { useEffect, useState } from "react";
import { ageFromBirthdate, visibleQuestions, type Answers } from "../data/questions";
import { trackFunnelEvent } from "../lib/funnel";
import { PhaseStepper } from "./PhaseStepper";
import { ProgressBar } from "./ProgressBar";
import { ProgressRing } from "./ProgressRing";
import { QuestionStep } from "./QuestionStep";
import { Tooltip } from "./Tooltip";

interface Props {
  onComplete: (answers: Answers) => void;
}

const GENERIC_REASSURANCE = "🔒 Tus respuestas están cifradas y protegidas.";

export function Quiz({ onComplete }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);

  const steps = visibleQuestions(answers);
  const question = steps[stepIndex];
  const progress = (stepIndex + 1) / steps.length;
  const isLast = stepIndex === steps.length - 1;

  useEffect(() => {
    trackFunnelEvent("question_reached", question.key);
  }, [question.key]);

  const handleAnswer = (value: string | number) => {
    const next: Answers = { ...answers, [question.key]: value };

    if (question.key === "fecha_de_nacimiento" && typeof value === "string") {
      next.edad = ageFromBirthdate(value);
    }

    setAnswers(next);

    const nextSteps = visibleQuestions(next);
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
      <PhaseStepper current={question.phase} />
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
      <QuestionStep
        key={question.key}
        question={question}
        value={answers[question.key]}
        onAnswer={handleAnswer}
      />
      <p className="reassurance-line">{question.reassurance ?? GENERIC_REASSURANCE}</p>
      {stepIndex > 0 && (
        <button className="btn-link" onClick={handleBack}>
          ← Atrás
        </button>
      )}
    </div>
  );
}
