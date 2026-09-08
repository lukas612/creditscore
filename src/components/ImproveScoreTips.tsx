const TIPS = [
  {
    title: "Sal de Asnef si estás en él",
    desc: "Estar en Asnef u otro registro de morosos es el factor que más pesa en tu puntuación. Saldar la deuda pendiente es el primer paso para salir.",
  },
  {
    title: "Reduce tu deuda respecto a tus ingresos",
    desc: "Mantener tus deudas por debajo de un tercio de tus ingresos anuales mejora mucho tu puntuación.",
  },
  {
    title: "Declara todos tus ingresos",
    desc: "Pagas extra, alquileres u otras fuentes de ingreso cuentan. No dejes ninguno fuera al hacer el test.",
  },
  {
    title: "Prioriza la estabilidad laboral",
    desc: "Un contrato indefinido o ser funcionario, y llevar tiempo en tu empleo o actividad actual, pesan más que ingresos muy variables o esporádicos.",
  },
  {
    title: "Ten en cuenta tu vivienda",
    desc: "Tener una vivienda en propiedad mejora tu perfil financiero frente a no tenerla.",
  },
  {
    title: "Evita picos de gasto antes de pedir crédito",
    desc: "Un uso estable de tus finanzas en los meses previos transmite más confianza que gastos puntuales elevados.",
  },
  {
    title: "Repite el test cada cierto tiempo",
    desc: "Tu situación cambia. Vuelve a comprobar tu puntuación cuando cambien tus ingresos o tus deudas.",
  },
];

export function ImproveScoreTips() {
  return (
    <section className="section">
      <p className="section-label">Cómo mejorar tu puntuación crediticia</p>
      <div className="tips-grid">
        {TIPS.map((tip, i) => (
          <div className="tip-card" key={tip.title}>
            <span className="tip-number">{i + 1}</span>
            <h3>{tip.title}</h3>
            <p>{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
