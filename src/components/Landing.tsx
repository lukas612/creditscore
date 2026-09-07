interface Props {
  onStart: () => void;
}

export function Landing({ onStart }: Props) {
  return (
    <div className="landing">
      <span className="eyebrow">Test gratuito · 2 minutos</span>
      <h1>Descubre tu puntuación crediticia</h1>
      <p className="landing-sub">
        Responde unas preguntas rápidas sobre tu situación financiera y te decimos, al
        instante, qué puntuación tendrías y qué opciones de financiación encajan contigo.
      </p>
      <button className="btn-primary btn-large" onClick={onStart}>
        Calcular mi puntuación
      </button>
      <p className="landing-disclaimer">
        Resultado orientativo, sin compromiso y sin que afecte a tu historial crediticio.
      </p>
    </div>
  );
}
