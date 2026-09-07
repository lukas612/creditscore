import { tipFor } from "../data/scoreTips";
import type { BreakdownItem } from "../lib/types";

interface Props {
  breakdown: BreakdownItem[];
}

export function ScoreBreakdownChart({ breakdown }: Props) {
  const scale = Math.max(1, ...breakdown.map((b) => Math.abs(b.points)));

  return (
    <div className="breakdown-chart">
      {breakdown.map((item) => {
        const isPositive = item.points >= 0;
        const widthPct = (Math.abs(item.points) / scale) * 100;
        return (
          <div className="breakdown-row" key={item.key}>
            <span className="breakdown-label">{item.label}</span>
            <div className="breakdown-bar-track">
              <div className="breakdown-bar-zero" />
              <div
                className={`breakdown-bar-fill ${isPositive ? "positive" : "negative"}`}
                style={{ width: `${widthPct / 2}%` }}
              />
            </div>
            <span className={`breakdown-points ${isPositive ? "positive" : "negative"}`}>
              {isPositive ? "+" : ""}
              {item.points}
            </span>
            {item.points < 0 && <p className="breakdown-tip">💡 {tipFor(item.key)}</p>}
          </div>
        );
      })}
    </div>
  );
}
