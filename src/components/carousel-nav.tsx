const btnClass =
  "grid size-11 place-items-center rounded-full border border-[#333] text-nx-muted transition-colors duration-160 hover:border-nx-red hover:text-nx-red disabled:pointer-events-none disabled:opacity-30";

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "prev" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

/** Setas + pontos do carrossel mobile (Como trabalhamos, problemas, cases). */
export function CarouselNav({
  count,
  active,
  onGo,
  labelFor,
  prevLabel,
  nextLabel,
  className = "",
}: {
  count: number;
  active: number;
  onGo: (index: number) => void;
  labelFor: (index: number) => string;
  prevLabel: string;
  nextLabel: string;
  className?: string;
}) {
  const last = count - 1;

  return (
    <div
      className={`relative z-40 flex items-center justify-center gap-6 ${className}`}
    >
      <button
        type="button"
        aria-label={prevLabel}
        disabled={active === 0}
        onClick={() => onGo(active - 1)}
        className={btnClass}
      >
        <Chevron dir="prev" />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: count }, (_, index) => {
          const on = index === active;
          return (
            <button
              key={index}
              type="button"
              aria-label={labelFor(index)}
              aria-current={on ? "true" : undefined}
              onClick={() => onGo(index)}
              className="grid size-11 place-items-center"
            >
              <span
                className={`h-2 rounded-full transition-[width,background-color] duration-[320ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
                  on ? "w-6 bg-nx-red" : "w-2 bg-nx-dim"
                }`}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label={nextLabel}
        disabled={active === last}
        onClick={() => onGo(active + 1)}
        className={btnClass}
      >
        <Chevron dir="next" />
      </button>
    </div>
  );
}
