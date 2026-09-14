import { IconCheckCircle, IconGauge, IconHeadset } from "./Icons";

const HIGHLIGHTS = [
  {
    icon: IconCheckCircle,
    title: "Fără litere mici",
    desc: "Vei vedea exact ce întrebări îți punem și de ce, înainte să răspunzi.",
  },
  {
    icon: IconGauge,
    title: "Rezultat explicat, nu doar un număr",
    desc: "Vei ști ce factori adaugă și ce factori scad din scorul tău, nu doar cifra finală.",
  },
  {
    icon: IconHeadset,
    title: "Gândit pentru telefon",
    desc: "Tot testul se completează comod de pe telefon, oricând și oriunde.",
  },
];

export function ProductHighlightsRo() {
  return (
    <section className="section">
      <p className="section-label">Așa arată testul</p>
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
