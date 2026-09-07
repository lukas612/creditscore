import { useState } from "react";
import type { QuestionDef } from "../data/questions";

interface Props {
  question: QuestionDef;
  value: string | number | undefined;
  onAnswer: (value: string | number) => void;
}

export function QuestionStep({ question, value, onAnswer }: Props) {
  const [draft, setDraft] = useState<string>(value?.toString() ?? "");

  const submitDraft = () => {
    if (draft.trim() === "") return;
    onAnswer(question.type === "number" ? Number(draft) : draft);
  };

  if (question.type === "select") {
    return (
      <div className="question-options">
        {question.options?.map((opt) => (
          <button
            key={opt.value}
            className={`option-btn ${value === opt.value ? "selected" : ""}`}
            onClick={() => onAnswer(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === "yesno") {
    return (
      <div className="question-options question-options-inline">
        <button
          className={`option-btn ${value === "si" ? "selected" : ""}`}
          onClick={() => onAnswer("si")}
        >
          Sí
        </button>
        <button
          className={`option-btn ${value === "no" ? "selected" : ""}`}
          onClick={() => onAnswer("no")}
        >
          No
        </button>
      </div>
    );
  }

  return (
    <div className="question-input-row">
      <div className="question-input-wrap">
        <input
          type={question.type === "date" ? "date" : question.type === "number" ? "number" : "text"}
          inputMode={question.type === "number" ? "decimal" : undefined}
          enterKeyHint="next"
          value={draft}
          placeholder={question.placeholder}
          min={question.min}
          max={question.max}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitDraft()}
          autoFocus
        />
        {question.suffix && <span className="question-suffix">{question.suffix}</span>}
      </div>
      <button className="btn-primary" onClick={submitDraft}>
        Continuar
      </button>
    </div>
  );
}
