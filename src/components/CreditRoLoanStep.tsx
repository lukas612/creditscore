import { useEffect, useState } from "react";
import { creditQuestion, type Answers } from "../data/witmeQuestionsRoCredit";
import { trackFunnelEvent } from "../lib/funnel";
import { CreditStepHeader } from "./CreditStepHeader";

const requestedAmountQ = creditQuestion("requestedAmount");
const loanPurposeQ = creditQuestion("loanPurpose");

const AMOUNT_MIN = requestedAmountQ.min ?? 200;
const AMOUNT_MAX = requestedAmountQ.max ?? 50000;

const amountFmt = new Intl.NumberFormat("ro-RO");

interface Props {
  onComplete: (answers: Answers) => void;
}

export function CreditRoLoanStep({ onComplete }: Props) {
  const [amount, setAmount] = useState(Math.round((AMOUNT_MIN + AMOUNT_MAX) / 4 / 100) * 100);
  const [purpose, setPurpose] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    trackFunnelEvent("question_reached", "requestedAmount_loanPurpose", "credit_ro");
  }, []);

  const handleAmountChange = (value: number) => {
    setAmount(value);
    setPulse(true);
    setTimeout(() => setPulse(false), 180);
  };

  return (
    <div className="quiz-card credit-step-enter" key="loan-step">
      <CreditStepHeader current={1} />
      <div className="credit-field-group">
        <h2 style={{ marginTop: 0 }}>Împrumutul tău</h2>

        <span className={`credit-amount-value ${pulse ? "pulse" : ""}`}>
          {amountFmt.format(amount)} <span>LEI</span>
        </span>
        <input
          className="credit-amount-slider"
          type="range"
          min={AMOUNT_MIN}
          max={AMOUNT_MAX}
          step={100}
          value={amount}
          onChange={(e) => handleAmountChange(Number(e.target.value))}
          aria-label={requestedAmountQ.label}
        />
        <div className="credit-amount-scale">
          <span>{amountFmt.format(AMOUNT_MIN)} LEI</span>
          <span>{amountFmt.format(AMOUNT_MAX)} LEI</span>
        </div>

        <span className="credit-purpose-label">{loanPurposeQ.label}</span>
        <div className="credit-purpose-grid">
          {loanPurposeQ.options?.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`credit-purpose-btn ${purpose === opt.value ? "selected" : ""}`}
              onClick={() => setPurpose(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          className="btn-primary"
          disabled={!purpose}
          onClick={() => purpose && onComplete({ requestedAmount: amount, loanPurpose: purpose })}
        >
          Continuă
        </button>
        <p className="reassurance-line">🔒 Răspunsurile tale sunt criptate și protejate.</p>
      </div>
    </div>
  );
}
