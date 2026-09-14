const TIPS = [
  {
    title: "Ieși din restanțele la Biroul de Credit, dacă e cazul",
    desc: "A avea restanțe la Biroul de Credit sau alt registru este factorul cu cea mai mare greutate în scorul tău. Achitarea datoriei restante este primul pas.",
  },
  {
    title: "Redu-ți datoriile raportat la venit",
    desc: "Menținerea datoriilor sub o treime din venitul tău anual îți îmbunătățește mult scorul.",
  },
  {
    title: "Declară toate veniturile tale",
    desc: "Plățile extra, chiriile încasate sau alte surse de venit contează. Nu lăsa niciuna în afara testului.",
  },
  {
    title: "Pune stabilitatea locului de muncă pe primul loc",
    desc: "Un contract pe perioadă nedeterminată sau statutul de funcționar public, plus vechimea în activitatea actuală, cântăresc mai mult decât venituri foarte variabile sau ocazionale.",
  },
  {
    title: "Ține cont de situația ta locativă",
    desc: "A deține o locuință în proprietate îți poate îmbunătăți profilul financiar.",
  },
  {
    title: "Evită vârfurile de cheltuieli înainte de a cere un credit",
    desc: "Un comportament financiar stabil în lunile anterioare transmite mai multă încredere decât cheltuieli punctuale mari.",
  },
  {
    title: "Reface testul din când în când",
    desc: "Situația ta se schimbă. Verifică-ți din nou scorul când se modifică veniturile sau datoriile tale.",
  },
];

export function ImproveScoreTipsRo() {
  return (
    <section className="section">
      <p className="section-label">Cum îți poți îmbunătăți scorul de credit</p>
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
