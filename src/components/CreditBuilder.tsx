import { CREDIT_BUILDER_TIPS, EFFORT_LABEL, GENERIC_BUILDER_TIP } from "../data/creditBuilder";
import type { BreakdownItem } from "../lib/types";

interface Props {
  breakdown: BreakdownItem[];
}

export function CreditBuilder({ breakdown }: Props) {
  const actionable = [...breakdown]
    .filter((item) => item.points < 0)
    .sort((a, b) => a.points - b.points);

  return (
    <div className="builder-section">
      <p className="breakdown-title">Tu plan para mejorar la puntuación</p>

      {actionable.length === 0 ? (
        <p className="builder-empty">
          🎉 No tienes ningún factor restando puntos ahora mismo. Repite el test si
          cambian tus ingresos, tu deuda o tu situación laboral, para mantener tu
          puntuación al día.
        </p>
      ) : (
        <>
          <p className="builder-sub">
            Ordenado por impacto: empieza por el primero, es el que más puntos te
            devolvería.
          </p>
          <ol className="builder-list">
            {actionable.map((item, i) => {
              const content = CREDIT_BUILDER_TIPS[item.key] ?? GENERIC_BUILDER_TIP;
              return (
                <li className="builder-card" key={item.key}>
                  <span className="builder-rank">{i + 1}</span>
                  <div className="builder-card-body">
                    <div className="builder-card-header">
                      <span className="builder-card-title">{content.title}</span>
                      <span className="builder-impact">{item.points} pts</span>
                    </div>
                    <span className={`builder-effort builder-effort-${content.effort}`}>
                      {EFFORT_LABEL[content.effort]}
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
