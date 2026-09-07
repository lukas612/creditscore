const EXAMPLES = [
  {
    name: "Ana",
    tag: "Autónoma",
    quote:
      "Me sorprendió lo rápido que fue. En dos minutos tenía una idea clara de mi situación antes de pedir nada.",
  },
  {
    name: "Miguel",
    tag: "Empleado",
    quote:
      "Las preguntas son sencillas y no te piden nada raro. Se agradece que sea gratis de verdad.",
  },
  {
    name: "Laura",
    tag: "Pensionista",
    quote: "Me ayudó a entender qué factores pesan más antes de ir al banco.",
  },
];

export function Testimonials() {
  return (
    <section className="section testimonials-section">
      <p className="section-label">Lo que dicen quienes prueban el test</p>
      <div className="testimonials-grid">
        {EXAMPLES.map((t) => (
          <div className="testimonial-card" key={t.name}>
            <span className="testimonial-example-badge">Ejemplo ilustrativo</span>
            <p className="testimonial-quote">“{t.quote}”</p>
            <div className="testimonial-author">
              <span className="testimonial-avatar">{t.name[0]}</span>
              <div>
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-tag">{t.tag}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="testimonials-note">
        Estos son ejemplos ilustrativos del tipo de experiencia que buscamos ofrecer, no
        opiniones de clientes reales — el servicio acaba de lanzarse. En cuanto tengamos
        las primeras opiniones reales, las publicaremos aquí.
      </p>
    </section>
  );
}
