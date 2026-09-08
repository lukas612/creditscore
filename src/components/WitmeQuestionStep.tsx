import { useState } from "react";
import type { WitmeQuestionDef } from "../data/witmeQuestions";

interface Props {
  question: WitmeQuestionDef;
  value: string | number | boolean | undefined;
  onAnswer: (value: string | number | boolean) => void;
}

const MONTHS = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));

const CURRENT_YEAR = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: 100 - 16 + 1 }, (_, i) => String(CURRENT_YEAR - 16 - i));
const EMPLOYMENT_YEARS = Array.from({ length: 60 }, (_, i) => String(CURRENT_YEAR - i));

const initialDateParts = (value: string | number | boolean | undefined): [string, string, string] => {
  if (typeof value !== "string" || !value) return ["", "", ""];
  const [y = "", m = "", d = ""] = value.split("-");
  return [y, m, d];
};

export function WitmeQuestionStep({ question, value, onAnswer }: Props) {
  const [draft, setDraft] = useState<string>(value?.toString() ?? "");
  const [initialYear, initialMonth, initialDay] = initialDateParts(value);
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [day, setDay] = useState(initialDay);

  const submitDraft = () => {
    if (question.type === "date") {
      if (!day || !month || !year) return;
      onAnswer(`${year}-${month}-${day}`);
      return;
    }
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

  if (question.type === "dropdown") {
    return (
      <div className="question-input-row">
        <div className="question-input-wrap">
          <select
            className="question-native-select"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onAnswer(e.target.value)}
            autoFocus
          >
            <option value="">Selecciona…</option>
            {question.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
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

  if (question.type === "date") {
    const years = question.key === "employmentStartDate" ? EMPLOYMENT_YEARS : BIRTH_YEARS;
    return (
      <div className="question-input-row">
        <div className="question-date-row">
          <select aria-label="Día" value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Día</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select aria-label="Mes" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Mes</option>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <select aria-label="Año" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Año</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <button className="btn-primary" onClick={submitDraft}>
          Continuar
        </button>
      </div>
    );
  }

  return (
    <div className="question-input-row">
      <div className="question-input-wrap">
        <input
          type={question.type === "number" ? "number" : "text"}
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
