interface Props {
  className?: string;
}

export function CreditioLogo({ className }: Props) {
  return (
    <span className={`creditio-logo ${className ?? ""}`}>
      creditio
      <svg
        className="creditio-logo-arc"
        viewBox="0 0 40 20"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="creditio-arc-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EC0C8C" />
            <stop offset="100%" stopColor="#7B2D8E" />
          </linearGradient>
        </defs>
        <path
          d="M4 16 A16 16 0 0 1 36 16"
          fill="none"
          stroke="url(#creditio-arc-gradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
