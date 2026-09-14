import { CREDIT_BUILDER_TIPS_RO, EFFORT_LABEL_RO, GENERIC_BUILDER_TIP_RO } from "../data/creditBuilderRo";
import type { BreakdownItem } from "../lib/types";
import { CreditBuilder } from "./CreditBuilder";
import { ScoreBreakdownChart } from "./ScoreBreakdownChart";

const EXAMPLE_SCORE = 710;
const EXAMPLE_BAND = "Bun";
const EXAMPLE_CAPACIDAD_MENSUAL = 630;
const EXAMPLE_CAPACIDAD_MAXIMA = 15120;
const EXAMPLE_BREAKDOWN: BreakdownItem[] = [
  { key: "ingresos", label: "Venit lunar", points: 30 },
  { key: "empleo", label: "Situație profesională", points: 25 },
  { key: "vivienda", label: "Locuință în proprietate", points: 35 },
  { key: "deudas", label: "Datorii și grad de îndatorare", points: -20 },
  { key: "edad", label: "Vârstă", points: 20 },
];

const currency = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
  maximumFractionDigits: 0,
});

export function ScorePreviewRo() {
  const pct = Math.round(((EXAMPLE_SCORE - 300) / (850 - 300)) * 100);

  return (
    <section className="section">
      <p className="section-label">Raportul tău, cu toate detaliile</p>
      <div className="preview-wrap">
        <div className="preview-text">
          <p>
            Nu primești doar un număr. Rezultatul tău include câtă finanțare ai putea
            susține, o defalcare pe factori și un plan personalizat ordonat după impact,
            ca să știi exact ce să lucrezi mai întâi.
          </p>
        </div>
        <div className="result-card preview-card">
          <span className="example-badge">Exemplu ilustrativ</span>
          <div className="score-gauge">
            <div className="score-gauge-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="score-value">{EXAMPLE_SCORE}</span>
          <span className="score-band">{EXAMPLE_BAND}</span>

          <div className="capacity-section">
            <p className="breakdown-title">Capacitatea de credit estimată</p>
            <div className="capacity-grid">
              <div className="capacity-stat">
                <span className="capacity-value">
                  {currency.format(EXAMPLE_CAPACIDAD_MENSUAL)}
                </span>
                <span className="capacity-label">Rata lunară maximă recomandată</span>
              </div>
              <div className="capacity-stat">
                <span className="capacity-value">
                  {currency.format(EXAMPLE_CAPACIDAD_MAXIMA)}
                </span>
                <span className="capacity-label">Suma estimată pe care ai putea-o obține</span>
              </div>
            </div>
          </div>

          <div className="breakdown-section">
            <p className="breakdown-title">Defalcarea punctajului tău</p>
            <ScoreBreakdownChart breakdown={EXAMPLE_BREAKDOWN} />
          </div>

          <CreditBuilder
            breakdown={EXAMPLE_BREAKDOWN}
            title="Planul tău de îmbunătățire a punctajului"
            emptyText="🎉 Nu ai niciun factor care să scadă puncte în acest moment. Reia testul dacă se schimbă veniturile, datoriile sau situația ta profesională, ca să-ți menții punctajul la zi."
            subText="Ordonat după impact: începe cu primul, este cel care ți-ar aduce înapoi cele mai multe puncte."
            tips={CREDIT_BUILDER_TIPS_RO}
            effortLabel={EFFORT_LABEL_RO}
            genericTip={GENERIC_BUILDER_TIP_RO}
          />
        </div>
      </div>
    </section>
  );
}
