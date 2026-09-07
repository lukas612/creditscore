import { useState } from "react";
import { ageFromBirthdate, visibleQuestions, type Answers } from "../data/questions";
import { ProgressBar } from "./ProgressBar";
import { QuestionStep } from "./QuestionStep";

interface Props {
  onComplete: (answers: Answers) => void;
}

export function Quiz({ onComplete }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);

  const steps = visibleQuestions(answers);
  const question = steps[stepIndex];

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
      <ProgressBar current={stepIndex + 1} total={steps.length} />
      <p className="quiz-step-count">
        Pregunta {stepIndex + 1} de {steps.length}
      </p>
      <h2 className="quiz-question">{question.label}</h2>
      <QuestionStep
        key={question.key}
        question={question}
        value={answers[question.key]}
        onAnswer={handleAnswer}
      />
      {stepIndex > 0 && (
        <button className="btn-link" onClick={handleBack}>
          ← Atrás
        </button>
      )}
    </div>
  );
}
