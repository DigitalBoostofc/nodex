"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { CarouselNav } from "./carousel-nav";

const CYCLE_MS = 2600;
const MD_QUERY = "(min-width: 768px)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const STEP_SWIPE_PX = 16;
const MOBILE_MOVE_MS = 380;

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
        className="absolute top-0 left-0 h-px transition-[width] duration-[320ms] ease-[cubic-bezier(.2,.8,.2,1)] [background:linear-gradient(90deg,#8E0000,#E10600)]"
        style={{ width: fill }}
      />
      <div
        data-nx-track-dot
        className="absolute top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nx-red transition-[left] duration-[320ms] ease-[cubic-bezier(.2,.8,.2,1)] [box-shadow:0_0_0_4px_rgba(225,6,0,.18)]"
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
 * Mobile: carrossel com arraste, pontos e altura de conteúdo — a página
 * continua rolando. Um gesto troca só um passo, mesmo em flick rápido.
 * `mobileCycleMs` autoavança e volta da última etapa à primeira.
 * Desktop: grid com o ciclo automático.
 */
export function StepList({
  steps,
  intro,
  mobileCycleMs,
}: {
  steps: readonly Step[];
  intro?: ReactNode;
  /** Intervalo do autoplay mobile. Omitir desliga o ciclo. */
  mobileCycleMs?: number;
}) {
  const scrollerRef = useRef<HTMLOListElement>(null);
  const moving = useRef(false);
  const holding = useRef(false);
  const slideRef = useRef(0);
  const moveTimer = useRef(0);
  const autoTimer = useRef(0);
  const [desktop, setDesktop] = useState(false);
  const { active: cycleActive, pick } = useStepCycle(steps.length, desktop);
  const [slide, setSlide] = useState(0);
  const total = steps.length;
  const active = desktop ? cycleActive : slide;
  slideRef.current = slide;

  useEffect(() => {
    const mq = window.matchMedia(MD_QUERY);
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!desktop) return;
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [desktop]);

  const goTo = useCallback((index: number, smooth = true) => {
    const el = scrollerRef.current;
    if (!el) return;
    const last = el.children.length - 1;
    const next = Math.max(0, Math.min(last, index));
    const target = next * el.clientWidth;
    if (next === slideRef.current && Math.abs(el.scrollLeft - target) < 2) {
      return;
    }
    // 4 → 1 em jump: o snap do trilho pega etapa no meio se o scroll for suave.
    const wrapBack = next === 0 && slideRef.current === last && last > 0;
    moving.current = true;
    el.scrollTo({
      left: target,
      behavior: !smooth || wrapBack ? "auto" : "smooth",
    });
    slideRef.current = next;
    setSlide(next);
    window.clearTimeout(moveTimer.current);
    moveTimer.current = window.setTimeout(() => {
      moving.current = false;
    }, wrapBack ? 80 : MOBILE_MOVE_MS);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || desktop) return;

    let origin = 0;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let axis: "x" | "y" | null = null;

    const width = () => el.clientWidth;

    const indexAt = (left = el.scrollLeft) => {
      const w = width();
      if (w <= 0) return 0;
      return Math.max(0, Math.min(total - 1, Math.round(left / w)));
    };

    const settle = () => {
      if (!holding.current) return;
      holding.current = false;
      let next = origin;
      if (axis === "x") {
        const dx = lastX - startX;
        if (dx <= -STEP_SWIPE_PX) next = Math.min(total - 1, origin + 1);
        else if (dx >= STEP_SWIPE_PX) next = Math.max(0, origin - 1);
      }
      axis = null;
      if (next !== origin) goTo(next, true);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      holding.current = true;
      axis = null;
      origin = indexAt();
      startX = event.clientX;
      startY = event.clientY;
      lastX = event.clientX;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!holding.current) return;
      lastX = event.clientX;
      if (axis === "x") {
        event.preventDefault();
        return;
      }
      if (axis) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < STEP_SWIPE_PX) return;
      axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (axis === "x") {
        event.preventDefault();
        try {
          el.setPointerCapture(event.pointerId);
        } catch {
          /* Safari antigo sem capture — o pointerup no elemento ainda chega. */
        }
      } else {
        holding.current = false;
        axis = null;
      }
    };

    const onPointerUp = () => settle();

    const onScroll = () => {
      if (holding.current || moving.current) return;
      const next = indexAt();
      if (next === slideRef.current) return;
      slideRef.current = next;
      setSlide(next);
    };

    const onResize = () => {
      const w = width();
      if (w <= 0) return;
      el.scrollTo({ left: indexAt() * w, behavior: "auto" });
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.clearTimeout(moveTimer.current);
      holding.current = false;
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [desktop, goTo, total]);

  useEffect(() => {
    if (desktop || !mobileCycleMs || total < 2) return;
    if (window.matchMedia(REDUCE_QUERY).matches) return;

    const arm = () => {
      window.clearTimeout(autoTimer.current);
      autoTimer.current = window.setTimeout(() => {
        if (holding.current || moving.current) {
          arm();
          return;
        }
        goTo((slideRef.current + 1) % total);
      }, mobileCycleMs);
    };

    arm();
    return () => window.clearTimeout(autoTimer.current);
  }, [desktop, goTo, mobileCycleMs, slide, total]);

  return (
    <div>
      {intro}
      <StepTrack total={total} active={active} className="mb-8 md:mb-10" />
      <ol
        ref={scrollerRef}
        className="flex w-full min-w-0 snap-x snap-mandatory overflow-x-auto overscroll-x-contain touch-pan-y [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] md:gap-8 md:overflow-visible md:snap-none md:touch-auto [&::-webkit-scrollbar]:hidden motion-reduce:max-md:grid motion-reduce:max-md:grid-cols-1 motion-reduce:max-md:gap-8 motion-reduce:max-md:overflow-visible motion-reduce:max-md:snap-none"
      >
        {steps.map((step, index) => {
          const on = active === index;

          return (
            <li
              key={step.text}
              onMouseEnter={pick(index)}
              onFocus={pick(index)}
              tabIndex={0}
              aria-current={on ? "step" : undefined}
              className={`w-full max-w-full shrink-0 basis-full snap-start transition-opacity duration-[320ms] ease-[cubic-bezier(.2,.8,.2,1)] md:w-auto md:max-w-none md:basis-auto md:shrink motion-reduce:max-md:w-auto motion-reduce:max-md:max-w-none motion-reduce:max-md:basis-auto motion-reduce:max-md:shrink ${
                on ? "opacity-100" : "md:opacity-45"
              }`}
            >
              <span
                className={`font-mono text-[12px]/[1] font-medium tracking-[0.2em] transition-colors duration-[320ms] ${
                  on
                    ? "text-nx-red-hover"
                    : "max-md:text-nx-red-hover md:text-nx-red-deep"
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
      <CarouselNav
        count={steps.length}
        active={active}
        onGo={(index) => goTo(index)}
        labelFor={(index) =>
          `Ver ${(steps[index].title ?? `etapa ${index + 1}`).toLowerCase()}`
        }
        prevLabel="Etapa anterior"
        nextLabel="Próxima etapa"
        className="mt-6 md:hidden motion-reduce:hidden"
      />
      <div className="mt-8 flex justify-center md:mt-12">
        <a href="#contato" className="nx-btn nx-btn-pill">
          Solicitar sistema
        </a>
      </div>
    </div>
  );
}
