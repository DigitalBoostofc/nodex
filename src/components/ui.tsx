import type { ReactNode } from "react";

/**
 * Elementos gráficos auxiliares do Brand Book §05: malha, hairline vermelha
 * de abertura, corte diagonal e glow inferior. Tudo decorativo e marcado com
 * data-nx-anim, que é o gancho do prefers-reduced-motion.
 */
export function HeroBackdrop({
  glowAt = "50%",
  glowStrength = 0.26,
  scan = "short",
}: {
  /** Posição horizontal do glow — um por página (Brand Book §05). */
  glowAt?: string;
  glowStrength?: number;
  /** `full` rides the whole hero height, unmasked. */
  scan?: "short" | "full" | "none";
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_50%_55%,#000_35%,transparent_78%)]"
      >
        <div
          data-nx-anim="grid"
          className="absolute -inset-x-10 -inset-y-20 opacity-70 [animation:nx-grid_6s_linear_infinite] [background-image:linear-gradient(#242424_1px,transparent_1px),linear-gradient(90deg,#242424_1px,transparent_1px)] [background-size:64px_64px]"
        />
        {scan === "short" ? (
          <div
            data-nx-anim="line"
            className="absolute inset-x-0 top-0 h-[220px] [animation:nx-scan_6.5s_cubic-bezier(.4,0,.6,1)_infinite] [background:linear-gradient(180deg,rgba(225,6,0,0),rgba(225,6,0,.3),rgba(225,6,0,0))]"
          />
        ) : null}
        <div
          data-nx-anim="sweep"
          className="absolute inset-y-0 left-0 w-[38%] [animation:nx-sweep_7.5s_ease-in-out_infinite] [background:linear-gradient(90deg,rgba(225,6,0,0),rgba(255,20,32,.14),rgba(225,6,0,0))]"
        />
      </div>
      {scan === "full" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            data-nx-anim="line"
            className="absolute inset-x-0 h-[128px] -translate-y-1/2 [animation:nx-scan-full_15s_linear_infinite]"
          >
            <div className="absolute inset-0 [background:linear-gradient(180deg,rgba(225,6,0,0),rgba(225,6,0,.16),rgba(225,6,0,0))]" />
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#E10600]/35 [box-shadow:0_0_10px_rgba(225,6,0,.28)]" />
          </div>
        </div>
      ) : null}
      <div
        aria-hidden
        data-nx-anim="glow"
        className="pointer-events-none absolute inset-x-0 -bottom-[240px] h-[520px] [animation:nx-drift_11s_ease-in-out_infinite]"
        style={{
          background: `radial-gradient(ellipse at ${glowAt} 100%, rgba(225,6,0,${glowStrength}), rgba(225,6,0,0) 62%)`,
        }}
      />
    </>
  );
}

/** Glow estático dos blocos de fechamento — sem malha, só o brilho inferior. */
export function CtaGlow({
  at = "50%",
  strength = 0.26,
}: {
  at?: string;
  strength?: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -bottom-[300px] h-[560px]"
      style={{
        background: `radial-gradient(ellipse at ${at} 100%, rgba(225,6,0,${strength}), rgba(225,6,0,0) 62%)`,
      }}
    />
  );
}

/**
 * Seção padrão. Margem lateral 48/32/20 e padding vertical de 96–112px,
 * conforme a escala de espaço do Brand Book §05.
 */
export function Section({
  children,
  className = "",
  divided = true,
}: {
  children: ReactNode;
  className?: string;
  /** Hairline cinza que separa conteúdo (Brand Book §05). */
  divided?: boolean;
}) {
  return (
    <section
      className={`mx-auto max-w-[1280px] px-5 py-24 md:px-8 lg:px-12 ${
        divided ? "border-t border-nx-border-soft" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: "muted" | "red";
  className?: string;
}) {
  return (
    <span
      className={`block ${tone === "red" ? "nx-label-red" : "nx-label"} ${className}`}
    >
      {children}
    </span>
  );
}

/** Cabeçalho de seção: eyebrow + H2 + linha de apoio. */
export function SectionHead({
  eyebrow,
  eyebrowTone = "muted",
  title,
  lead,
  leadClassName = "max-w-[62ch]",
  className = "",
}: {
  eyebrow: string;
  eyebrowTone?: "muted" | "red";
  title: ReactNode;
  lead?: ReactNode;
  leadClassName?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
      <h2 className="nx-h2 mt-5 mb-4">{title}</h2>
      {lead ? <p className={`nx-body-l ${leadClassName}`}>{lead}</p> : null}
    </div>
  );
}

/** Selo em pill do hero — texto mono sobre fundo quente. */
export function HeroPill({
  children,
  pulsing = false,
}: {
  children: ReactNode;
  pulsing?: boolean;
}) {
  return (
    <span
      data-nx-anim={pulsing ? "halo" : undefined}
      className={`inline-flex items-center gap-[10px] rounded-full border border-nx-border-warm bg-[#0B0505] px-[18px] py-3 font-mono text-[11px]/[1] font-medium tracking-[0.18em] text-nx-red-hover ${
        pulsing
          ? "[animation:nx-halo_3s_ease-in-out_infinite] [box-shadow:0_0_26px_rgba(225,6,0,.35)] border-nx-border-warm-2"
          : ""
      }`}
    >
      <span
        data-nx-anim={pulsing ? "dot" : undefined}
        className={`h-[6px] w-[6px] rounded-full ${
          pulsing
            ? "bg-nx-red-hover [animation:nx-pulse_1.6s_ease-in-out_infinite]"
            : "bg-nx-red"
        }`}
      />
      {children}
    </span>
  );
}
