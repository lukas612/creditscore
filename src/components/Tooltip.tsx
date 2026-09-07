import { useState } from "react";

interface Props {
  text: string;
}

export function Tooltip({ text }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <span className="tooltip-wrap">
      <button
        type="button"
        className="tooltip-trigger"
        aria-label="Por qué preguntamos esto"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
      >
        ?
      </button>
      {open && <span className="tooltip-box">{text}</span>}
    </span>
  );
}
