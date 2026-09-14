import { CREDIT_BUILDER_TIPS, EFFORT_LABEL, GENERIC_BUILDER_TIP } from "../data/creditBuilder";
import type { BuilderEffort, BuilderTip } from "../data/creditBuilder";
import type { BreakdownItem } from "../lib/types";

interface Props {
  breakdown: BreakdownItem[];
  title?: string;
  emptyText?: string;
  subText?: string;
  tips?: Record<string, BuilderTip>;
  effortLabel?: Record<BuilderEffort, string>;
  genericTip?: BuilderTip;
}

export function CreditBuilder({
  breakdown,
  title = "Tu plan para mejorar la puntuación",
  emptyText = "🎉 No tienes ningún factor restando puntos ahora mismo. Repite el test si cambian tus ingresos, tu deuda o tu situación laboral, para mantener tu puntuación al día.",
  subText = "Ordenado por impacto: empieza por el primero, es el que más puntos te devolvería.",
  tips = CREDIT_BUILDER_TIPS,
  effortLabel = EFFORT_LABEL,
  genericTip = GENERIC_BUILDER_TIP,
}: Props) {
  const actionable = [...breakdown]
    .filter((item) => item.points < 0)
    .sort((a, b) => a.points - b.points);

  return (
    <div className="builder-section">
      <p className="breakdown-title">{title}</p>

      {actionable.length === 0 ? (
        <p className="builder-empty">{emptyText}</p>
      ) : (
        <>
          <p className="builder-sub">{subText}</p>
          <ol className="builder-list">
            {actionable.map((item, i) => {
              const content = tips[item.key] ?? genericTip;
              return (
                <li className="builder-card" key={item.key}>
                  <span className="builder-rank">{i + 1}</span>
                  <div className="builder-card-body">
                    <div className="builder-card-header">
                      <span className="builder-card-title">{content.title}</span>
                      <span className="builder-impact">{item.points} pts</span>
                    </div>
                    <span className={`builder-effort builder-effort-${content.effort}`}>
                      {effortLabel[content.effort]}
                    </span>
                    <p className="builder-tip">{content.tip}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </div>
  );
}
