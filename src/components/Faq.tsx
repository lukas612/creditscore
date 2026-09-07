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
  {
    q: "¿Qué diferencia hay con la puntuación de un buró de crédito real?",
    a: "La nuestra es un cálculo propio y orientativo basado únicamente en las respuestas del test. No consulta ni sustituye el informe oficial de Asnef, Experian, Equifax ni ningún otro buró de crédito.",
  },
  {
    q: "¿Puedo repetir el test si cambia mi situación?",
    a: "Sí, tantas veces como quieras. El resultado se recalcula al instante con tus respuestas de ese momento.",
  },
  {
    q: "¿Cómo puedo mejorar mi puntuación?",
    a: "Los factores con más peso en el cálculo son tus ingresos y el nivel de deuda respecto a ellos. Reducir deudas o mantener una fuente de ingresos estable son las palancas que más ayudan.",
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
