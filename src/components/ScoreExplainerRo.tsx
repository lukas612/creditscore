const BANDS = [
  { label: "Scăzut", range: "300–550", className: "band-bajo" },
  { label: "Mediu", range: "551–650", className: "band-regular" },
  { label: "Bun", range: "651–750", className: "band-bueno" },
  { label: "Excelent", range: "751–850", className: "band-excelente" },
];

// Los 4 primeros son nuestra aproximación a los factores oficiales del
// modelo FICO que usa el Biroul de Credit (historial de pagos ~35%,
// cantidades adeudadas ~30%, antigüedad del historial ~15%, tipos de
// crédito ~10%) - no tenemos acceso a tu informe real del buró, así que
// cada uno usa la señal más parecida que sí recogemos. No incluimos
// "nuevas consultas de crédito" (el 5º factor oficial, ~10%) porque no
// tenemos ese dato. Ingresos y situación laboral no forman parte del
// score FICO real, pero los mantenemos porque, con nuestros propios datos,
// predicen mejor si un prestamista acabará aceptando la solicitud.
const FACTORS = [
  { factor: "Istoric de plăți (restanțe la Biroul de Credit)", peso: "Ridicat" },
  { factor: "Datorii actuale raportat la venitul tău", peso: "Ridicat" },
  { factor: "Vechimea istoricului tău financiar", peso: "Mediu" },
  { factor: "Tipuri de credit utilizate (ex. locuință în proprietate)", peso: "Mediu" },
  { factor: "Venit lunar", peso: "Mediu" },
  { factor: "Situație profesională (angajat, PFA, pensionar…)", peso: "Scăzut" },
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
          <p className="score-benchmark">
            📊 Media națională estimată în România este de aproximativ{" "}
            <strong>635 de puncte</strong> (bandă "Mediu").
          </p>
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
