"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const CYCLE_MS = 2600;
const MD_QUERY = "(min-width: 768px)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Percorre os passos sozinho para que a etapa em destaque se explique sem
 * clique. O hover assume o controle e encerra o ciclo — quem está lendo manda.
 * Sob prefers-reduced-motion o ciclo nunca começa e tudo fica legível de uma vez
 * (Brand Book §10: sem animação em loop acima de 3 s).
 */
export function useStepCycle(total: number, enabled = true) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    // Já sob controle de quem está lendo, ou movimento reduzido: nenhum ciclo.
    if (!enabled || !auto) return;
    if (window.matchMedia(REDUCE_QUERY).matches) return;

    const timer = setInterval(
      () => setActive((step) => (step + 1) % total),
      CYCLE_MS,
    );
    return () => clearInterval(timer);
  }, [auto, enabled, total]);

  const pick = (index: number) => () => {
    setAuto(false);
    setActive(index);
  };

  return { active, pick, auto };
}

/** Trilho de progresso: hairline cinza, preenchimento vermelho e o ponto. */
export function StepTrack({
  total,
  active,
  className = "",
}: {
  total: number;
  active: number;
  className?: string;
}) {
  const fill = `${((active + 1) / total) * 100}%`;
  const dot = `${((active + 0.5) / total) * 100}%`;

  return (
    <div
      aria-hidden
      className={`relative h-px bg-nx-border ${className}`}
      data-nx-anim="track"
    >
      <div
        data-nx-track-fill
        className="absolute top-0 left-0 h-px transition-[width] duration-[980ms] ease-[cubic-bezier(.22,1,.36,1)] [background:linear-gradient(90deg,#8E0000,#E10600)]"
        style={{ width: fill }}
      />
      <div
        data-nx-track-dot
        className="absolute top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nx-red transition-[left] duration-[980ms] ease-[cubic-bezier(.22,1,.36,1)] [box-shadow:0_0_0_4px_rgba(225,6,0,.18)]"
        style={{ left: dot }}
      />
    </div>
  );
}

export type Step = {
  title?: string;
  text: string;
  /** Entregável da etapa — "SAÍDA: ..." no processo da home. */
  output?: string;
};

/**
 * Processo em etapas ligadas por hairline vermelha (Brand Book §09, seção 04).
 * O prazo só aparece quando é real, então `output` é opcional.
 *
 * No mobile, os passos deslizam na horizontal com snap nativo. Desktop
 * continua no grid com o ciclo automático.
 */
export function StepList({
  steps,
  intro,
}: {
  steps: readonly Step[];
  intro?: ReactNode;
}) {
  const stripRef = useRef<HTMLOListElement>(null);
  const [mobile, setMobile] = useState(false);
  const [slide, setSlide] = useState(0);
  const { active, pick } = useStepCycle(steps.length, !mobile);
  const shown = mobile ? slide : active;
  const total = steps.length;

  useEffect(() => {
    const md = window.matchMedia(MD_QUERY);
    const reduce = window.matchMedia(REDUCE_QUERY);

    const syncMode = () => {
      setMobile(!md.matches && !reduce.matches);
    };
    syncMode();
    md.addEventListener("change", syncMode);
    reduce.addEventListener("change", syncMode);
    return () => {
      md.removeEventListener("change", syncMode);
      reduce.removeEventListener("change", syncMode);
    };
  }, []);

  useEffect(() => {
    if (!mobile) return;
    const strip = stripRef.current;
    if (!strip) return;

    const onScroll = () => {
      const width = strip.clientWidth;
      if (width <= 0) return;
      const next = Math.round(strip.scrollLeft / width);
      setSlide((current) =>
        current === next ? current : Math.max(0, Math.min(total - 1, next)),
      );
    };

    strip.addEventListener("scroll", onScroll, { passive: true });
    return () => strip.removeEventListener("scroll", onScroll);
  }, [mobile, total]);

  return (
    <div>
      {intro}
      <StepTrack
        total={total}
        active={shown}
        className="mb-8 md:mb-10"
      />
      <ol
        ref={stripRef}
        className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 max-md:flex max-md:gap-0 max-md:overflow-x-auto max-md:overscroll-x-contain max-md:scroll-smooth max-md:snap-x max-md:snap-mandatory max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden motion-reduce:max-md:grid motion-reduce:max-md:grid-cols-1 motion-reduce:max-md:overflow-x-visible motion-reduce:max-md:snap-none"
      >
        {steps.map((step, index) => {
          const on = shown === index;

          return (
            <li
              key={step.text}
              onMouseEnter={pick(index)}
              onFocus={pick(index)}
              tabIndex={0}
              aria-current={on ? "step" : undefined}
              className={`transition-opacity duration-[320ms] ease-[cubic-bezier(.2,.8,.2,1)] max-md:w-full max-md:flex-[0_0_100%] max-md:snap-start motion-reduce:max-md:w-auto motion-reduce:max-md:flex-none ${
                on ? "opacity-100" : "md:opacity-45"
              }`}
            >
                <span
                  className={`font-mono text-[12px]/[1] font-medium tracking-[0.2em] transition-colors duration-[320ms] ${
                    on ? "text-nx-red-hover" : "max-md:text-nx-red-hover md:text-nx-red-deep"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.title ? (
                  <p
                    className={`mt-4 mb-3 font-display text-[20px]/[1.3] font-medium transition-colors duration-[320ms] max-md:text-[28px]/[1.2] max-md:text-white ${
                      on ? "text-white" : "md:text-nx-muted"
                    }`}
                  >
                    {step.title}
                  </p>
                ) : null}
                <p
                  className={`leading-[1.65] font-light transition-colors duration-[320ms] ${
                    step.title
                      ? "text-[16px] text-nx-muted max-md:text-[17px]"
                      : `mt-4 text-[18px] ${on ? "text-white" : "text-nx-muted"}`
                  } ${step.output ? "mb-3" : ""}`}
                >
                  {step.text}
                </p>
                {step.output ? (
                  <p className="font-mono text-[13px]/[1.6] text-nx-text-2">
                    SAÍDA: {step.output}
                  </p>
                ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
