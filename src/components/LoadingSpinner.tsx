import { useEffect, useState } from "react";

interface Props {
  text: string;
  // Mensaje adicional que aparece si la espera se alarga (p.ej. mientras
  // Witme consulta varias entidades) - sin esto, una espera larga sin
  // cambios en pantalla se siente como que la página se ha quedado colgada.
  longWaitText?: string;
  longWaitAfterMs?: number;
}

export function LoadingSpinner({ text, longWaitText, longWaitAfterMs = 7000 }: Props) {
  const [showLongWait, setShowLongWait] = useState(false);

  useEffect(() => {
    if (!longWaitText) return;
    setShowLongWait(false);
    const timer = setTimeout(() => setShowLongWait(true), longWaitAfterMs);
    return () => clearTimeout(timer);
  }, [longWaitText, longWaitAfterMs]);

  return (
    <div className="loading-state">
      <div className="loading-spinner" aria-hidden="true" />
      <p className="loading-text">{text}</p>
      {showLongWait && longWaitText && <p className="loading-text-sub">{longWaitText}</p>}
    </div>
  );
}
