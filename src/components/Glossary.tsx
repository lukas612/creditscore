const TERMS = [
  {
    term: "TAE (Tasa Anual Equivalente)",
    def: "El coste real de un préstamo en un año, incluyendo intereses y comisiones. Es la cifra que hay que comparar entre ofertas, no solo el interés.",
  },
  {
    term: "TIN (Tipo de Interés Nominal)",
    def: "El porcentaje de interés que aplica la entidad, sin incluir comisiones. Por sí solo no permite comparar ofertas de forma justa.",
  },
  {
    term: "Buró de crédito",
    def: "Empresa que recopila el historial de pagos y deudas (en España, Asnef, Experian o Equifax) y genera informes que consultan bancos y financieras.",
  },
  {
    term: "Asnef / RAI",
    def: "Ficheros españoles de morosidad. Estar incluido en ellos dificulta mucho el acceso a crédito en condiciones normales.",
  },
  {
    term: "Capacidad de endeudamiento",
    def: "Porcentaje de tus ingresos que puedes destinar de forma segura al pago de cuotas de crédito, habitualmente hasta un 30-35%.",
  },
  {
    term: "Refinanciación",
    def: "Renegociar las condiciones de un crédito existente (plazo, cuota, tipo) para adaptarlo a una nueva situación financiera.",
  },
];

export function Glossary() {
  return (
    <section className="section">
      <p className="section-label">Glosario: términos que debes conocer</p>
      <div className="glossary-grid">
        {TERMS.map((t) => (
          <div className="glossary-card" key={t.term}>
            <h3>{t.term}</h3>
            <p>{t.def}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
