import { Faq } from "./Faq";
import { Footer } from "./Footer";

interface Props {
  onStart: () => void;
}

const TRUST_ITEMS = [
  "100% gratuito",
  "No afecta a tu historial",
  "Resultado en 2 minutos",
  "Datos protegidos",
];

const STEPS = [
  {
    n: "1",
    title: "Responde el test",
    desc: "Unas preguntas simples sobre tu situación financiera. 2 minutos, desde el móvil.",
  },
  {
    n: "2",
    title: "Obtén tu puntuación",
    desc: "Calculamos al instante una estimación orientativa en una escala de 300 a 850.",
  },
  {
    n: "3",
    title: "Recibe opciones a tu medida",
    desc: "Un asesor te contacta con la financiación que mejor encaja con tu perfil.",
  },
];

const BENEFITS = [
  {
    title: "Rápido",
    desc: "Resultado orientativo en menos de 2 minutos, sin papeleo.",
  },
  {
    title: "Sin compromiso",
    desc: "No es una solicitud de crédito. Rellenar el test no te obliga a nada.",
  },
  {
    title: "Sin impacto en tu historial",
    desc: "Es una estimación propia, no una consulta a ningún buró de crédito real.",
  },
  {
    title: "Asesoramiento personalizado",
    desc: "Un equipo humano revisa tu perfil y te contacta con opciones reales.",
  },
];

export function Landing({ onStart }: Props) {
  return (
    <div className="page">
      <section className="hero">
        <span className="eyebrow">Test gratuito · 2 minutos</span>
        <h1>Descubre tu puntuación crediticia antes de pedir un préstamo</h1>
        <p className="landing-sub">
          Responde unas preguntas rápidas sobre tu situación financiera y te decimos, al
          instante, qué puntuación tendrías y qué opciones de financiación encajan contigo.
        </p>
        <button className="btn-primary btn-large" onClick={onStart}>
          Calcular mi puntuación
        </button>
        <ul className="trust-row">
          {TRUST_ITEMS.map((item) => (
            <li key={item}>
              <span className="trust-check">✓</span> {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <p className="section-label">Cómo funciona</p>
        <div className="steps-grid">
          {STEPS.map((step) => (
            <div className="step-card" key={step.n}>
              <span className="step-number">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-label">Por qué CreditScore</p>
        <div className="benefits-grid">
          {BENEFITS.map((b) => (
            <div className="benefit-card" key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Faq />

      <section className="section cta-band">
        <h2>¿Listo para conocer tu puntuación?</h2>
        <button className="btn-primary btn-large" onClick={onStart}>
          Calcular mi puntuación
        </button>
      </section>

      <Footer />
    </div>
  );
}
