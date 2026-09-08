import type { ReactNode } from "react";
import { Faq } from "./Faq";
import { Footer } from "./Footer";
import { Glossary } from "./Glossary";
import { IconBolt, IconCheckCircle, IconDocCheck, IconGauge, IconHeadset, IconShieldCheck } from "./Icons";
import { ImproveScoreTips } from "./ImproveScoreTips";
import { ProductHighlights } from "./ProductHighlights";
import { ScoreExplainer } from "./ScoreExplainer";
import { ScorePreview } from "./ScorePreview";
import { StickyMobileCta } from "./StickyMobileCta";
import { TrustSection } from "./TrustSection";

interface Props {
  widget: ReactNode;
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
    icon: IconBolt,
    title: "Rápido",
    desc: "Resultado orientativo en menos de 2 minutos, sin papeleo.",
  },
  {
    icon: IconDocCheck,
    title: "Sin compromiso",
    desc: "No es una solicitud de crédito. Rellenar el test no te obliga a nada.",
  },
  {
    icon: IconShieldCheck,
    title: "Sin impacto en tu historial",
    desc: "Es una estimación propia, no una consulta a ningún buró de crédito real.",
  },
  {
    icon: IconHeadset,
    title: "Asesoramiento personalizado",
    desc: "Un equipo humano revisa tu perfil y te contacta con opciones reales.",
  },
  {
    icon: IconGauge,
    title: "Plan para mejorarlo",
    desc: "No solo tu puntuación: qué factores la están frenando y cómo trabajarlos, ordenados por impacto.",
  },
];

export function Landing({ widget }: Props) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-gauge">
              <IconGauge className="hero-gauge-icon" />
              <span>300 – 850</span>
            </div>
            <span className="eyebrow">🇪🇸 El primer Credit Score gratuito de Creditio</span>
            <h1>Descubre tu puntuación crediticia antes de pedir un préstamo</h1>
            <p className="landing-sub">
              Responde unas preguntas rápidas y descubre, al instante, tu puntuación y qué
              financiación encaja contigo.
            </p>
            <ul className="trust-row">
              {TRUST_ITEMS.map((item) => (
                <li key={item}>
                  <IconCheckCircle className="trust-check-icon" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-widget-col">
            <div className="widget-intro">
              <p>
                <strong>¿Qué es tu puntuación crediticia?</strong> Un número de 300 a 850
                que resume tu perfil. La calculamos al instante:
              </p>
            </div>
            {widget}
          </div>
        </div>
      </section>

      <StickyMobileCta />

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

      <ScoreExplainer />

      <ScorePreview />

      <ImproveScoreTips />

      <Glossary />

      <section className="section">
        <p className="section-label">Por qué Creditio Credit Score</p>
        <div className="benefits-grid">
          {BENEFITS.map((b) => (
            <div className="benefit-card" key={b.title}>
              <b.icon className="benefit-card-icon" />
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <ProductHighlights />

      <TrustSection />

      <Faq />

      <section className="section cta-band">
        <h2>¿Listo para conocer tu puntuación?</h2>
        <a className="btn-primary btn-large" href="#widget">
          Empezar el test ↑
        </a>
      </section>

      <Footer />
    </div>
  );
}
