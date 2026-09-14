import { useEffect, useState } from "react";
import type { Answers, WitmePhase, WitmeQuestionDef } from "../data/witmeQuestions";
import { trackFunnelEvent } from "../lib/funnel";
import { ProgressBar } from "./ProgressBar";
import { ProgressRing } from "./ProgressRing";
import { Tooltip } from "./Tooltip";
import { WitmePhaseStepper } from "./WitmePhaseStepper";
import { MONTHS_ES, WitmeQuestionStep } from "./WitmeQuestionStep";

export interface WitmeFormCopy {
  questionCountText?: (current: number, total: number) => string;
  lastQuestionLabel?: string;
  almostDoneLabel?: string;
  reassuranceLine?: string;
  backLabel?: string;
  tooltipLabel?: string;
  continueLabel?: string;
  selectPlaceholder?: string;
  yesLabel?: string;
  noLabel?: string;
  dayLabel?: string;
  monthLabel?: string;
  yearLabel?: string;
  months?: { value: string; label: string }[];
}

interface Props {
  initialAnswers?: Answers;
  visibleQuestions: (answers: Answers) => WitmeQuestionDef[];
  phases: { key: WitmePhase; label: string }[];
  intro?: string;
  source?: string;
  copy?: WitmeFormCopy;
  onComplete: (answers: Answers) => void;
}

const DEFAULT_COPY: Required<WitmeFormCopy> = {
  questionCountText: (current, total) => `Pregunta ${current} de ${total}`,
  lastQuestionLabel: "Última pregunta 🎉",
  almostDoneLabel: "Ya casi terminas 💪",
  reassuranceLine: "🔒 Tus respuestas están cifradas y protegidas.",
  backLabel: "← Atrás",
  tooltipLabel: "Por qué preguntamos esto",
  continueLabel: "Continuar",
  selectPlaceholder: "Selecciona…",
  yesLabel: "Sí",
  noLabel: "No",
  dayLabel: "Día",
  monthLabel: "Mes",
  yearLabel: "Año",
  months: MONTHS_ES,
};

export function WitmeForm({ initialAnswers, visibleQuestions, phases, intro, source = "solicitud", copy, onComplete }: Props) {
  const [answers, setAnswers] = useState<Answers>(initialAnswers ?? {});
  const [stepIndex, setStepIndex] = useState(0);
  const c = { ...DEFAULT_COPY, ...copy };

  const steps = visibleQuestions(answers);
  const question = steps[stepIndex];
  const progress = (stepIndex + 1) / steps.length;
  const isLast = stepIndex === steps.length - 1;

  useEffect(() => {
    trackFunnelEvent("question_reached", question.key, source);
  }, [question.key, source]);

  const handleAnswer = (value: string | number | boolean) => {
    const next: Answers = { ...answers, [question.key]: value };
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
      {intro && <p className="offers-eyebrow">{intro}</p>}
      <WitmePhaseStepper current={question.phase} phases={phases} />
      <div className="quiz-progress-row">
        <ProgressBar current={stepIndex + 1} total={steps.length} />
        <ProgressRing percent={progress * 100} />
      </div>
      <div className="quiz-step-row">
        <p className="quiz-step-count">{c.questionCountText(stepIndex + 1, steps.length)}</p>
        {isLast ? (
          <span className="quiz-encouragement">{c.lastQuestionLabel}</span>
        ) : (
          progress >= 0.6 && <span className="quiz-encouragement">{c.almostDoneLabel}</span>
        )}
      </div>
      <h2 className="quiz-question">
        {question.label}
        {question.helpText && <Tooltip text={question.helpText} label={c.tooltipLabel} />}
      </h2>
      <WitmeQuestionStep
        key={question.key}
        question={question}
        value={answers[question.key]}
        onAnswer={handleAnswer}
        continueLabel={c.continueLabel}
        selectPlaceholder={c.selectPlaceholder}
        yesLabel={c.yesLabel}
        noLabel={c.noLabel}
        dayLabel={c.dayLabel}
        monthLabel={c.monthLabel}
        yearLabel={c.yearLabel}
        months={c.months}
      />
      <p className="reassurance-line">{c.reassuranceLine}</p>
      {stepIndex > 0 && (
        <button className="btn-link" onClick={handleBack}>
          {c.backLabel}
        </button>
      )}
    </div>
  );
}
