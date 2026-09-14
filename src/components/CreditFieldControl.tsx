import { useState } from "react";
import type { WitmeQuestionDef } from "../data/witmeQuestions";

const MONTHS_RO = [
  { value: "01", label: "Ianuarie" },
  { value: "02", label: "Februarie" },
  { value: "03", label: "Martie" },
  { value: "04", label: "Aprilie" },
  { value: "05", label: "Mai" },
  { value: "06", label: "Iunie" },
  { value: "07", label: "Iulie" },
  { value: "08", label: "August" },
  { value: "09", label: "Septembrie" },
  { value: "10", label: "Octombrie" },
  { value: "11", label: "Noiembrie" },
  { value: "12", label: "Decembrie" },
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const CURRENT_YEAR = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: 100 - 16 + 1 }, (_, i) => String(CURRENT_YEAR - 16 - i));
const EMPLOYMENT_YEARS = Array.from({ length: 60 }, (_, i) => String(CURRENT_YEAR - i));

function dateParts(value: string | number | boolean | undefined): [string, string, string] {
  if (typeof value !== "string" || !value) return ["", "", ""];
  const [y = "", m = "", d = ""] = value.split("-");
  return [y, m, d];
}

interface Props {
  question: WitmeQuestionDef;
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean) => void;
}

// Renderiza un único campo dentro de una pantalla con VARIOS campos a la
// vez (Credit RO), a diferencia de WitmeQuestionStep que renderiza una
// pregunta por pantalla (Multiping RO / España).
export function CreditFieldControl({ question, value, onChange }: Props) {
  const [year, setYear] = useState(() => dateParts(value)[0]);
  const [month, setMonth] = useState(() => dateParts(value)[1]);
  const [day, setDay] = useState(() => dateParts(value)[2]);

  if (question.type === "date") {
    const years = question.key === "employmentStartDate" ? EMPLOYMENT_YEARS : BIRTH_YEARS;
    const update = (next: { y?: string; m?: string; d?: string }) => {
      const y = next.y ?? year;
      const m = next.m ?? month;
      const d = next.d ?? day;
      setYear(y);
      setMonth(m);
      setDay(d);
      if (y && m && d) onChange(`${y}-${m}-${d}`);
    };
    return (
      <div className="credit-field">
        <label>{question.label}</label>
        <div className="credit-date-row">
          <select aria-label="Zi" value={day} onChange={(e) => update({ d: e.target.value })}>
            <option value="">Zi</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select aria-label="Lună" value={month} onChange={(e) => update({ m: e.target.value })}>
            <option value="">Lună</option>
            {MONTHS_RO.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <select aria-label="An" value={year} onChange={(e) => update({ y: e.target.value })}>
            <option value="">An</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (question.type === "select" || question.type === "dropdown") {
    return (
      <div className="credit-field">
        <label>{question.label}</label>
        <select value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">Selectează…</option>
          {question.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="credit-field">
      <label>{question.label}</label>
      <input
        type={question.type === "number" ? "number" : "text"}
        inputMode={question.type === "number" ? "decimal" : undefined}
        placeholder={question.placeholder}
        min={question.min}
        max={question.max}
        value={value != null ? String(value) : ""}
        onChange={(e) => onChange(question.type === "number" ? Number(e.target.value) : e.target.value)}
      />
    </div>
  );
}
