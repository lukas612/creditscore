import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Îmi afectează asta istoricul de credit?",
    a: "Nu. Este un calcul propriu și orientativ pe baza răspunsurilor tale, nu o interogare la Biroul de Credit sau la orice altă bază de date. Completarea testului nu lasă nicio urmă în istoricul tău.",
  },
  {
    q: "Este chiar gratuit?",
    a: "Da, complet. Nu este o cerere de credit și nu implică niciun angajament prin completarea testului.",
  },
  {
    q: "Ce faceți cu datele mele?",
    a: "Se folosesc doar pentru a te contacta cu opțiunile de finanțare care se potrivesc cel mai bine profilului tău. Poți cere oricând să le ștergem.",
  },
  {
    q: "Cine se află în spatele Creditio Credit Score?",
    a: "Creditio, o platformă de comparare și consiliere în domeniul creditelor, care compară diferite opțiuni de finanțare pentru a te ajuta să găsești ceea ce se potrivește cel mai bine situației tale.",
  },
  {
    q: "Ce diferență este față de scorul unui birou de credit real?",
    a: "Al nostru este un calcul propriu și orientativ, bazat exclusiv pe răspunsurile din test. Nu consultă și nu înlocuiește raportul oficial al Biroului de Credit sau al altei instituții similare.",
  },
  {
    q: "Pot reface testul dacă se schimbă situația mea?",
    a: "Da, de câte ori vrei. Rezultatul se recalculează instant cu răspunsurile tale de la acel moment.",
  },
  {
    q: "Cum îmi pot îmbunătăți scorul?",
    a: "Factorii cu cea mai mare greutate în calcul sunt venitul tău și nivelul datoriilor raportat la acesta. Reducerea datoriilor sau menținerea unei surse de venit stabile sunt pârghiile care ajută cel mai mult.",
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

export function FaqRo() {
  return (
    <section className="section faq-section">
      <p className="section-label">Întrebări frecvente</p>
      <div className="faq-list">
        {FAQ_ITEMS.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
}
