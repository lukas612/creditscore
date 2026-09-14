import type { ReactNode } from "react";
import { FaqRo } from "./FaqRo";
import { FooterRo } from "./FooterRo";
import { GlossaryRo } from "./GlossaryRo";
import { IconBolt, IconCheckCircle, IconDocCheck, IconGauge, IconHeadset, IconShieldCheck } from "./Icons";
import { ImproveScoreTipsRo } from "./ImproveScoreTipsRo";
import { ProductHighlightsRo } from "./ProductHighlightsRo";
import { ScoreExplainerRo } from "./ScoreExplainerRo";
import { ScorePreviewRo } from "./ScorePreviewRo";
import { StickyMobileCtaRo } from "./StickyMobileCtaRo";
import { TrustSectionRo } from "./TrustSectionRo";

interface Props {
  widget: ReactNode;
}

const TRUST_ITEMS = [
  "100% gratuit",
  "Nu îți afectează istoricul",
  "Rezultat în 2 minute",
  "Date protejate",
];

const STEPS = [
  {
    n: "1",
    title: "Răspunde la test",
    desc: "Câteva întrebări simple despre situația ta financiară. 2 minute, de pe telefon.",
  },
  {
    n: "2",
    title: "Obține-ți punctajul",
    desc: "Calculăm instant o estimare orientativă pe o scală de la 300 la 850.",
  },
  {
    n: "3",
    title: "Primește opțiuni potrivite ție",
    desc: "Un consultant te contactează cu finanțarea care se potrivește cel mai bine profilului tău.",
  },
];

const BENEFITS = [
  {
    icon: IconBolt,
    title: "Rapid",
    desc: "Rezultat orientativ în mai puțin de 2 minute, fără birocrație.",
  },
  {
    icon: IconDocCheck,
    title: "Fără obligații",
    desc: "Nu este o cerere de credit. Completarea testului nu te obligă la nimic.",
  },
  {
    icon: IconShieldCheck,
    title: "Fără impact asupra istoricului tău",
    desc: "Este o estimare proprie, nu o interogare la vreun birou de credit real.",
  },
  {
    icon: IconHeadset,
    title: "Consultanță personalizată",
    desc: "O echipă umană îți revizuiește profilul și te contactează cu opțiuni reale.",
  },
  {
    icon: IconGauge,
    title: "Plan de îmbunătățire",
    desc: "Nu doar punctajul tău: ce factori îl încetinesc și cum să lucrezi la ei, ordonați după impact.",
  },
];

export function LandingRo({ widget }: Props) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-gauge">
              <IconGauge className="hero-gauge-icon" />
              <span>300 – 850</span>
            </div>
            <span className="eyebrow">🇷🇴 Primul Credit Score gratuit de la Creditio</span>
            <h1>Descoperă-ți punctajul de credit înainte de a cere un împrumut</h1>
            <p className="landing-sub">
              Răspunde la câteva întrebări rapide și descoperă, instant, punctajul tău și
              ce finanțare ți se potrivește.
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
                <strong>Ce este punctajul tău de credit?</strong> Un număr de la 300 la 850
                care îți rezumă profilul. Îl calculăm instant:
              </p>
            </div>
            {widget}
          </div>
        </div>
      </section>

      <StickyMobileCtaRo />

      <section className="section">
        <p className="section-label">Cum funcționează</p>
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

      <ScoreExplainerRo />

      <ScorePreviewRo />

      <ImproveScoreTipsRo />

      <GlossaryRo />

      <section className="section">
        <p className="section-label">De ce Creditio Credit Score</p>
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

      <ProductHighlightsRo />

      <TrustSectionRo />

      <FaqRo />

      <section className="section cta-band">
        <h2>Gata să îți afli punctajul?</h2>
        <a className="btn-primary btn-large" href="#widget">
          Începe testul ↑
        </a>
      </section>

      <FooterRo />
    </div>
  );
}
