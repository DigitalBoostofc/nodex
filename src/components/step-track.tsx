"use client";

import { useEffect, useState } from "react";

const CYCLE_MS = 2600;

/**
 * Percorre os passos sozinho para que a etapa em destaque se explique sem
 * clique. O hover assume o controle e encerra o ciclo — quem está lendo manda.
 * Sob prefers-reduced-motion o ciclo nunca começa e tudo fica legível de uma vez
 * (Brand Book §10: sem animação em loop acima de 3 s).
 */
export function useStepCycle(total: number) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    // Já sob controle de quem está lendo, ou movimento reduzido: nenhum ciclo.
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(
      () => setActive((step) => (step + 1) % total),
      CYCLE_MS,
    );
    return () => clearInterval(timer);
  }, [auto, total]);

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
        className="absolute top-0 left-0 h-px transition-[width] duration-[640ms] ease-[cubic-bezier(.2,.8,.2,1)] [background:linear-gradient(90deg,#8E0000,#E10600)]"
        style={{ width: fill }}
      />
      <div
        className="absolute top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nx-red transition-[left] duration-[640ms] ease-[cubic-bezier(.2,.8,.2,1)] [box-shadow:0_0_0_4px_rgba(225,6,0,.18)]"
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
 */
export function StepList({ steps }: { steps: readonly Step[] }) {
  const { active, pick } = useStepCycle(steps.length);

  return (
    <>
      <StepTrack total={steps.length} active={active} className="mb-10" />
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
        {steps.map((step, index) => {
          const on = active === index;

          return (
            <li
              key={step.text}
              onMouseEnter={pick(index)}
              onFocus={pick(index)}
              tabIndex={0}
              className={`transition-opacity duration-[320ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
                on ? "opacity-100" : "opacity-45"
              }`}
            >
              <span
                className={`font-mono text-[12px]/[1] font-medium tracking-[0.2em] transition-colors duration-[320ms] ${
                  on ? "text-nx-red-hover" : "text-nx-red-deep"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {step.title ? (
                <p
                  className={`mt-4 mb-3 font-display text-[20px]/[1.3] font-medium transition-colors duration-[320ms] ${
                    on ? "text-white" : "text-nx-muted"
                  }`}
                >
                  {step.title}
                </p>
              ) : null}
              <p
                className={`leading-[1.65] font-light transition-colors duration-[320ms] ${
                  step.title
                    ? "text-[16px] text-nx-muted"
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
    </>
  );
}
