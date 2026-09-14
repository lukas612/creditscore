import { useState, type ReactNode } from "react";
import {
  IconBolt,
  IconCheckCircle,
  IconDocCheck,
  IconGauge,
  IconHeadset,
  IconShieldCheck,
} from "./Icons";

interface Props {
  widget: ReactNode;
}

const TRUST_ITEMS = ["100% online", "Răspuns în câteva minute", "Fără birocrație", "Date protejate"];

const STEPS = [
  {
    n: "1",
    title: "Completezi cererea",
    desc: "Câteva date simple despre împrumutul de care ai nevoie. 2 minute, de pe telefon.",
  },
  {
    n: "2",
    title: "Analizăm profilul tău",
    desc: "Verificăm instant ce opțiuni de finanțare se potrivesc situației tale.",
  },
  {
    n: "3",
    title: "Primești un răspuns rapid",
    desc: "De obicei în câteva minute, fără să aștepți zile pentru un răspuns.",
  },
  {
    n: "4",
    title: "Te conectăm cu creditorul potrivit",
    desc: "Finalizezi cererea direct cu instituția care îți oferă cele mai bune condiții.",
  },
];

const BENEFITS = [
  {
    icon: IconBolt,
    title: "Rapid",
    desc: "Completezi cererea în câteva minute și primești un răspuns aproape instant.",
  },
  {
    icon: IconDocCheck,
    title: "Personalizat",
    desc: "Îți arătăm oferta care se potrivește sumei și situației tale, nu una generică.",
  },
  {
    icon: IconHeadset,
    title: "100% online",
    desc: "Nicio hârtie, nicio vizită la bancă. Totul se face comod de pe telefon.",
  },
];

const USE_CASES = [
  "Cheltuieli curente",
  "Consolidarea datoriilor",
  "Cheltuieli neprevăzute",
  "Educație",
  "Călătorii",
  "Alt motiv",
];

const FAQ_ITEMS = [
  {
    q: "Este gratuit să aplic?",
    a: "Da. Completarea cererii este complet gratuită și nu te obligă să accepți nicio ofertă.",
  },
  {
    q: "Creditio este cel care îmi acordă împrumutul?",
    a: "Nu. Creditio este o platformă de comparare: analizăm cererea ta și te conectăm cu instituția financiară care se potrivește cel mai bine profilului tău. Contractul final se semnează direct cu acea instituție.",
  },
  {
    q: "Ce dobândă voi avea?",
    a: "Depinde de instituția și oferta finală: DAE (Dobânda Anuală Efectivă) poate varia, de regulă, între 0% și 36%. Vei vedea condițiile exacte înainte de a accepta orice ofertă.",
  },
  {
    q: "Cât durează procesul?",
    a: "Cererea se completează în câteva minute, iar răspunsul inițial ajunge de obicei tot în câteva minute.",
  },
  {
    q: "Pot aplica dacă am restanțe la Biroul de Credit?",
    a: "Poți completa cererea oricum. În funcție de profilul tău, te conectăm cu instituțiile care au opțiuni potrivite pentru situația ta.",
  },
  {
    q: "Ce se întâmplă cu datele mele?",
    a: "Se folosesc doar pentru a procesa cererea ta și a te contacta cu oferte de finanțare relevante. Nu se vând către terți neautorizați.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        {q}
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="faq-answer">{a}</p>}
    </div>
  );
}

export function LandingCreditRo({ widget }: Props) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-gauge">
              <IconGauge className="hero-gauge-icon" />
              <span>100 – 50.000 LEI</span>
            </div>
            <span className="eyebrow">🇷🇴 Creditio România</span>
            <h1>Finanțarea de care ai nevoie, în câteva minute</h1>
            <p className="landing-sub">
              Completează o cerere simplă și primește o ofertă de împrumut personalizată — 100%
              online, fără birocrație.
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
                <strong>Câți bani ai nevoie?</strong> Spune-ne suma și scopul, iar noi găsim
                oferta potrivită pentru tine.
              </p>
            </div>
            {widget}
          </div>
        </div>
      </section>

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

      <section className="section">
        <p className="section-label">De ce Creditio</p>
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

      <section className="section">
        <p className="section-label">Pentru ce poți folosi împrumutul</p>
        <div className="benefits-grid">
          {USE_CASES.map((useCase) => (
            <div className="benefit-card" key={useCase}>
              <IconCheckCircle className="benefit-card-icon" />
              <h3>{useCase}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section trust-section">
        <p className="section-label">Încredere și siguranță</p>
        <div className="trust-grid">
          <div className="trust-card">
            <IconShieldCheck className="trust-card-icon" />
            <h3>Fără angajament</h3>
            <p>Completarea cererii nu te obligă să accepți nicio ofertă.</p>
          </div>
          <div className="trust-card">
            <IconDocCheck className="trust-card-icon" />
            <h3>Date protejate</h3>
            <p>Datele tale se folosesc doar pentru a-ți găsi oferta potrivită.</p>
          </div>
          <div className="trust-card">
            <IconHeadset className="trust-card-icon" />
            <h3>Echipă umană</h3>
            <p>Un consultant real revizuiește cererea ta, nu doar un algoritm.</p>
          </div>
          <div className="trust-card">
            <IconBolt className="trust-card-icon" />
            <h3>Fără costuri ascunse</h3>
            <p>Vezi condițiile exacte înainte de a accepta orice ofertă.</p>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <p className="section-label">Întrebări frecvente</p>
        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      <section className="section cta-band">
        <h2>Gata să afli oferta ta?</h2>
        <a className="btn-primary btn-large" href="#widget">
          Solicită acum ↑
        </a>
      </section>

      <footer className="site-footer">
        <p>
          Creditio este o platformă de comparare și conectare cu instituții financiare. Nu este
          un creditor direct: analizăm cererea ta și te conectăm cu instituția care se potrivește
          profilului tău. DAE orientativ: 0%–36%. Contractul final se semnează direct cu
          instituția financiară selectată.
        </p>
        <p className="site-footer-links">
          <span>Politica de confidențialitate</span>
          <span aria-hidden="true">·</span>
          <span>Informații legale</span>
          <span aria-hidden="true">·</span>
          <span>© {new Date().getFullYear()} Creditio</span>
        </p>
      </footer>
    </div>
  );
}
