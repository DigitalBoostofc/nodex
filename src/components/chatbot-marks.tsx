type MarkProps = { className?: string };

/** Ícones da seção "Para quem" — cada um é um desenho, não um número. */
export function MarkChat({ className = "" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      fill="none"
    >
      <rect x="4" y="10" width="42" height="32" rx="8" fill="#141414" stroke="#E10600" strokeWidth="2" />
      <path d="M16 42v10l10-10H46" fill="#141414" stroke="#E10600" strokeWidth="2" strokeLinejoin="round" />
      <rect x="22" y="22" width="36" height="26" rx="8" fill="#E10600" />
      <path d="M48 48v8l-8-8h8Z" fill="#E10600" />
      <rect x="30" y="30" width="20" height="2.5" rx="1" fill="#fff" />
      <rect x="30" y="36" width="14" height="2.5" rx="1" fill="#fff" />
    </svg>
  );
}

export function MarkRepeat({ className = "" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      fill="none"
    >
      <rect x="8" y="8" width="48" height="12" rx="3" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="1.5" />
      <rect x="8" y="26" width="48" height="12" rx="3" fill="#1a1a1a" stroke="#E10600" strokeWidth="1.5" />
      <rect x="8" y="44" width="48" height="12" rx="3" fill="#E10600" />
      <rect x="14" y="12.5" width="22" height="3" rx="1.5" fill="#5c5c5c" />
      <rect x="14" y="30.5" width="28" height="3" rx="1.5" fill="#fff" opacity="0.55" />
      <rect x="14" y="48.5" width="24" height="3" rx="1.5" fill="#fff" />
    </svg>
  );
}

export function MarkBase({ className = "" }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      fill="none"
    >
      <rect x="14" y="8" width="36" height="44" rx="3" fill="#141414" stroke="#3a3a3a" strokeWidth="1.5" />
      <rect x="10" y="12" width="36" height="44" rx="3" fill="#1a1a1a" stroke="#5c5c5c" strokeWidth="1.5" />
      <rect x="6" y="16" width="36" height="44" rx="3" fill="#0b0b0b" stroke="#E10600" strokeWidth="2" />
      <rect x="14" y="26" width="20" height="2.5" rx="1" fill="#E10600" />
      <rect x="14" y="33" width="16" height="2.5" rx="1" fill="#8f8f8f" />
      <rect x="14" y="40" width="18" height="2.5" rx="1" fill="#8f8f8f" />
      <path d="M32 16v8l4-3 4 3v-8" fill="#E10600" />
    </svg>
  );
}
