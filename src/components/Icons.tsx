type IconProps = { className?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconBolt({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2 4 14h6l-1 8 9-13h-6z" />
    </svg>
  );
}

export function IconShieldCheck({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6z" />
      <path d="m9.5 12 1.8 1.8L14.5 10" />
    </svg>
  );
}

export function IconDocCheck({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="m9.5 14 1.8 1.8L15 12" />
    </svg>
  );
}

export function IconHeadset({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19v1a3 3 0 0 1-3 3h-3" />
    </svg>
  );
}

export function IconLock({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function IconGauge({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 14a8 8 0 1 1 16 0" />
      <path d="M12 14 16 9" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCheckCircle({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.3 2.3L15.5 9.5" />
    </svg>
  );
}

export function IconShare({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="m8.1 10.9 7.8-3.8M8.1 13.1l7.8 3.8" />
    </svg>
  );
}

export function IconLink({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 7l1.2-1.2a3.5 3.5 0 0 1 5 5L16 12" />
      <path d="M13 17l-1.2 1.2a3.5 3.5 0 0 1-5-5L8 12" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1a6 6 0 0 1 12 0v1" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8" />
      <path d="M21 20v-1a5.5 5.5 0 0 0-3.5-5.1" />
    </svg>
  );
}
