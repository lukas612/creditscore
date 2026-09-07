const BANDS = [
  { label: "Bajo", range: "300–549", className: "band-bajo" },
  { label: "Regular", range: "550–649", className: "band-regular" },
  { label: "Bueno", range: "650–749", className: "band-bueno" },
  { label: "Excelente", range: "750–850", className: "band-excelente" },
];

const FACTORS = [
  { factor: "Ingresos mensuales", peso: "Alto" },
  { factor: "Deudas actuales frente a tus ingresos", peso: "Alto" },
  { factor: "Situación laboral (empleado, autónomo, pensionista…)", peso: "Medio" },
  { factor: "Vivienda en propiedad", peso: "Medio" },
  { factor: "Edad", peso: "Bajo" },
];

export function ScoreExplainer() {
  return (
    <section className="section">
      <p className="section-label">Qué es la puntuación crediticia</p>
      <div className="explainer-grid">
        <div className="explainer-text">
          <p>
            La puntuación crediticia es un número, entre 300 y 850, que resume de un
            vistazo tu perfil financiero. Cuanto más alta, más fácil suele ser acceder a
            financiación y en mejores condiciones.
          </p>
          <p>
            La que calcula CreditScore es una <strong>estimación propia y orientativa</strong>,
            pensada para que sepas dónde estás antes de solicitar un crédito. No es el
            informe oficial de ningún buró de crédito (Asnef, Experian, Equifax…) ni lo
            sustituye.
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
          <p className="explainer-table-title">Qué influye en tu resultado</p>
          <div className="table-scroll">
            <table className="factors-table">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Peso</th>
                </tr>
              </thead>
              <tbody>
                {FACTORS.map((f) => (
                  <tr key={f.factor}>
                    <td>{f.factor}</td>
                    <td>
                      <span className={`peso-badge peso-${f.peso.toLowerCase()}`}>
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
