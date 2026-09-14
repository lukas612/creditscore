interface Props {
  current: number;
  total?: number;
}

export function CreditStepHeader({ current, total = 4 }: Props) {
  return (
    <div className="credit-step-header">
      <div className="credit-step-dots">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`credit-step-dot ${i + 1 < current ? "done" : i + 1 === current ? "active" : ""}`}
          />
        ))}
      </div>
      <div className="credit-step-meta">
        <span className="credit-step-count">
          Pasul <b>{Math.min(current, total)}</b> din <b>{total}</b>
        </span>
        <span className="credit-step-badge">4 ecrane, nu 12</span>
      </div>
    </div>
  );
}
