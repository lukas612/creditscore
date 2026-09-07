import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "¿Esto afecta a mi historial crediticio?",
    a: "No. Es un cálculo propio y orientativo a partir de tus respuestas, no una consulta a ningún buró de crédito ni a Asnef/RAI. Hacer el test no deja ninguna huella en tu historial.",
  },
  {
    q: "¿Es gratis de verdad?",
    a: "Sí, completamente. No es una solicitud de crédito ni hay ningún compromiso de contratación por rellenar el test.",
  },
  {
    q: "¿Qué hacéis con mis datos?",
    a: "Solo se usan para contactarte con las opciones de financiación que mejor encajan con tu perfil. Puedes pedir que los eliminemos cuando quieras.",
  },
  {
    q: "¿Quién hay detrás de CreditScore?",
    a: "Un equipo especializado en asesoramiento de crédito que compara distintas opciones de financiación para ayudarte a encontrar la que mejor se adapta a tu situación.",
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

export function Faq() {
  return (
    <section className="section faq-section">
      <p className="section-label">Preguntas frecuentes</p>
      <div className="faq-list">
        {FAQ_ITEMS.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
}
