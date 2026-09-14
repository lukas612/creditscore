const TERMS = [
  {
    term: "DAE (Dobânda Anuală Efectivă)",
    def: "Costul real al unui împrumut într-un an, incluzând dobânda și comisioanele. Este cifra pe care trebuie să o compari între oferte, nu doar dobânda.",
  },
  {
    term: "Rata dobânzii",
    def: "Procentul de dobândă aplicat de instituție, fără a include comisioanele. Singură, nu permite o comparație corectă între oferte.",
  },
  {
    term: "Birou de credit",
    def: "Instituție care colectează istoricul de plăți și datorii (în România, Biroul de Credit) și generează rapoarte consultate de bănci și instituții financiare.",
  },
  {
    term: "Restanțe la Biroul de Credit",
    def: "Datorii neplătite înregistrate la Biroul de Credit. A avea restanțe îngreunează foarte mult accesul la credit în condiții normale.",
  },
  {
    term: "Grad de îndatorare",
    def: "Procentul din venitul tău pe care îl poți aloca în siguranță plății ratelor de credit, de obicei până la 30-35%.",
  },
  {
    term: "Refinanțare",
    def: "Renegocierea condițiilor unui credit existent (perioadă, rată, dobândă) pentru a-l adapta unei noi situații financiare.",
  },
];

export function GlossaryRo() {
  return (
    <section className="section">
      <p className="section-label">Glosar: termeni pe care ar trebui să-i cunoști</p>
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
