import { useEffect, useState } from "react";
import { creditQuestion, type Answers } from "../data/witmeQuestionsRoCredit";
import { trackFunnelEvent } from "../lib/funnel";
import { CreditFieldControl } from "./CreditFieldControl";
import { CreditStepHeader } from "./CreditStepHeader";

const FINANCIAL_KEYS = ["dateOfBirth", "incomeSource", "employmentStartDate", "monthlyIncome", "maritalStatus"];

interface Props {
  initialAnswers: Answers;
  onComplete: (answers: Answers) => void;
}

// Últimos dos pasos (3 y 4 de 4) de Credit RO: varios campos obligatorios
// de Witme agrupados por pantalla, en vez de uno por pantalla (WitmeForm).
export function CreditRoDetailsForm({ initialAnswers, onComplete }: Props) {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [subStep, setSubStep] = useState<"financial" | "final">("financial");

  useEffect(() => {
    trackFunnelEvent("question_reached", subStep === "financial" ? "financial_details" : "final_details", "credit_ro");
  }, [subStep]);

  const setField = (key: string) => (value: string | number | boolean) => setAnswers((prev) => ({ ...prev, [key]: value }));

  const visibleFinancialKeys = FINANCIAL_KEYS.filter((key) => {
    const q = creditQuestion(key);
    return !q.condition || q.condition(answers);
  });
  const financialComplete = visibleFinancialKeys.every((key) => answers[key] != null && answers[key] !== "");
  const finalComplete = ["idNumber", "zipCode", "city", "address", "houseNumber"].every(
    (key) => answers[key] != null && answers[key] !== "",
  );

  if (subStep === "financial") {
    return (
      <div className="quiz-card credit-step-enter" key="financial-step">
        <CreditStepHeader current={3} />
        <div className="credit-field-group">
          <h2 style={{ marginTop: 0 }}>Detalii financiare</h2>
          {visibleFinancialKeys.map((key) => (
            <CreditFieldControl key={key} question={creditQuestion(key)} value={answers[key]} onChange={setField(key)} />
          ))}
          <button className="btn-primary" disabled={!financialComplete} onClick={() => setSubStep("final")}>
            Continuă
          </button>
          <p className="reassurance-line">🔒 Răspunsurile tale sunt criptate și protejate.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-card credit-step-enter" key="final-step">
      <CreditStepHeader current={4} />
      <div className="credit-field-group">
        <h2 style={{ marginTop: 0 }}>Ultimele detalii</h2>
        <div className="credit-field-row">
          <CreditFieldControl question={creditQuestion("idNumber")} value={answers.idNumber} onChange={setField("idNumber")} />
          <CreditFieldControl question={creditQuestion("zipCode")} value={answers.zipCode} onChange={setField("zipCode")} />
        </div>
        <CreditFieldControl question={creditQuestion("city")} value={answers.city} onChange={setField("city")} />
        <div className="credit-field-row">
          <CreditFieldControl question={creditQuestion("address")} value={answers.address} onChange={setField("address")} />
          <CreditFieldControl question={creditQuestion("houseNumber")} value={answers.houseNumber} onChange={setField("houseNumber")} />
        </div>
        <button className="btn-primary" disabled={!finalComplete} onClick={() => onComplete(answers)}>
          Trimite cererea
        </button>
        <button className="btn-link" onClick={() => setSubStep("financial")}>
          ← Înapoi
        </button>
      </div>
    </div>
  );
}
