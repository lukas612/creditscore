const BANDS = [
  { label: "Scăzut", range: "300–549", className: "band-bajo" },
  { label: "Mediu", range: "550–649", className: "band-regular" },
  { label: "Bun", range: "650–749", className: "band-bueno" },
  { label: "Excelent", range: "750–850", className: "band-excelente" },
];

const FACTORS = [
  { factor: "Restanțe la Biroul de Credit sau alte registre", peso: "Ridicat" },
  { factor: "Venit lunar", peso: "Ridicat" },
  { factor: "Datorii actuale raportat la venitul tău", peso: "Ridicat" },
  { factor: "Situație profesională (angajat, PFA, pensionar…)", peso: "Mediu" },
  { factor: "Vechimea în activitatea actuală", peso: "Mediu" },
  { factor: "Locuință în proprietate", peso: "Mediu" },
  { factor: "Vârstă", peso: "Scăzut" },
];

export function ScoreExplainerRo() {
  return (
    <section className="section">
      <p className="section-label">Ce este scorul de credit</p>
      <div className="explainer-grid">
        <div className="explainer-text">
          <p>
            Scorul de credit este un număr, între 300 și 850, care rezumă dintr-o
            privire profilul tău financiar. Cu cât este mai mare, cu atât este de obicei
            mai ușor să obții finanțare și în condiții mai bune.
          </p>
          <p>
            Cel calculat de Creditio Credit Score este o{" "}
            <strong>estimare proprie și orientativă</strong>,
            gândită să știi unde te afli înainte de a cere un credit. Nu este raportul
            oficial al niciunui birou de credit (precum Biroul de Credit) și nici nu îl
            înlocuiește.
          </p>
          <div className="score-range-bar">
            {BANDS.map((b) => (
              <div className={`score-range-segment ${b.className}`} key={b.label}>
                <span className="score-range-label">{b.label}</span>
                <span className="score-range-value">{b.range}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="explainer-table-wrap">
          <p className="explainer-table-title">Ce influențează rezultatul tău</p>
          <div className="table-scroll">
            <table className="factors-table">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Greutate</th>
                </tr>
              </thead>
              <tbody>
                {FACTORS.map((f) => (
                  <tr key={f.factor}>
                    <td>{f.factor}</td>
                    <td>
                      <span className={`peso-badge peso-${f.peso === "Ridicat" ? "alto" : f.peso === "Mediu" ? "medio" : "bajo"}`}>
                        {f.peso}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
