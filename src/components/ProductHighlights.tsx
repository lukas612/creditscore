import { IconCheckCircle, IconGauge, IconHeadset } from "./Icons";

const HIGHLIGHTS = [
  {
    icon: IconCheckCircle,
    title: "Nada de letra pequeña",
    desc: "Verás exactamente qué preguntas te hacemos y por qué te las hacemos, antes de responder.",
  },
  {
    icon: IconGauge,
    title: "Resultado explicado, no solo un número",
    desc: "Sabrás qué factores suman y cuáles restan en tu puntuación, no solo la cifra final.",
  },
  {
    icon: IconHeadset,
    title: "Hecho para el móvil",
    desc: "Todo el test se completa cómodamente desde el teléfono, en cualquier momento y lugar.",
  },
];

export function ProductHighlights() {
  return (
    <section className="section">
      <p className="section-label">Así es hacer el test</p>
      <div className="highlights-grid">
        {HIGHLIGHTS.map((h) => (
          <div className="highlight-card" key={h.title}>
            <h.icon className="highlight-icon" />
            <h3>{h.title}</h3>
            <p>{h.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
