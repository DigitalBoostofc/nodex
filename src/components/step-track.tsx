"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const CYCLE_MS = 2600;
const HEADER_PX = 68;
const MD_QUERY = "(min-width: 768px)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const SNAP_MS = 980;
const RELEASE_MS = 1320;
const SNAP_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SNAP_THRESHOLD = 36;
const PIN_EXTRA = 80;

function easeOutQuint(t: number) {
  return 1 - (1 - t) ** 5;
}

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
 * No mobile, um gesto curto de scroll troca o passo com animação. No último
 * card, o mesmo gesto solta a seção e a página segue. Desktop continua no
 * grid com o ciclo automático.
 */
export function StepList({
  steps,
  intro,
}: {
  steps: readonly Step[];
  intro?: ReactNode;
}) {
  const pinRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLOListElement>(null);
  const [pinning, setPinning] = useState(false);
  const { active, pick } = useStepCycle(steps.length, !pinning);
  const total = steps.length;

  useEffect(() => {
    const md = window.matchMedia(MD_QUERY);
    const reduce = window.matchMedia(REDUCE_QUERY);

    const syncMode = () => {
      setPinning(!md.matches && !reduce.matches);
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
    if (!pinning) return;

    const pin = pinRef.current;
    const strip = stripRef.current;
    if (!pin || !strip) return;

    const fill = pin.querySelector<HTMLElement>("[data-nx-track-fill]");
    const dot = pin.querySelector<HTMLElement>("[data-nx-track-dot]");
    let index = 0;
    let animating = false;
    let releasing = false;
    let unlock: number | undefined;
    let scrollRaf = 0;
    let touchY = 0;
    let touchX = 0;
    let gestureLocked = false;

    const slideW = () => pin.clientWidth;

    const pinned = () => {
      const rect = pin.getBoundingClientRect();
      const stickyH = window.innerHeight - HEADER_PX;
      return rect.top <= HEADER_PX + 2 && rect.bottom >= HEADER_PX + stickyH - 2;
    };

    const paint = (next: number, animate: boolean) => {
      index = Math.max(0, Math.min(total - 1, next));
      const x = -index * slideW();
      const motion = animate ? `${SNAP_MS}ms ${SNAP_EASE}` : "none";
      strip.style.transition = animate ? `transform ${motion}` : "none";
      strip.style.transform = `translate3d(${x}px,0,0)`;
      if (fill) {
        fill.style.transition = animate ? `width ${motion}` : "none";
        fill.style.width = `${((index + 1) / total) * 100}%`;
      }
      if (dot) {
        dot.style.transition = animate ? `left ${motion}` : "none";
        dot.style.left = `${((index + 0.5) / total) * 100}%`;
      }
      for (let i = 0; i < strip.children.length; i++) {
        const item = strip.children[i];
        if (i === index) item.setAttribute("aria-current", "step");
        else item.removeAttribute("aria-current");
      }
    };

    const goTo = (next: number) => {
      if (next === index || animating || releasing) return;
      animating = true;
      paint(next, true);
      window.clearTimeout(unlock);
      unlock = window.setTimeout(() => {
        animating = false;
      }, SNAP_MS);
    };

    const layout = () => {
      const stickyH = window.innerHeight - HEADER_PX;
      pin.style.height = `${stickyH + PIN_EXTRA}px`;
      paint(index, false);
    };

    const animateScroll = (to: number, duration: number, done: () => void) => {
      const html = document.documentElement;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      const from = window.scrollY;
      const delta = to - from;
      let origin: number | null = null;
      const step = (now: number) => {
        if (origin == null) origin = now;
        const t = Math.min(1, (now - origin) / duration);
        window.scrollTo(0, from + delta * easeOutQuint(t));
        if (t < 1) {
          scrollRaf = requestAnimationFrame(step);
          return;
        }
        html.style.scrollBehavior = previous;
        done();
      };
      scrollRaf = requestAnimationFrame(step);
    };

    const releaseDown = () => {
      if (releasing) return;
      releasing = true;
      animating = true;
      const dest =
        window.scrollY + pin.getBoundingClientRect().bottom - HEADER_PX;
      animateScroll(dest, RELEASE_MS, () => {
        releasing = false;
        animating = false;
      });
    };

    const onWheel = (event: WheelEvent) => {
      if (releasing) {
        event.preventDefault();
        return;
      }
      if (!pinned()) return;
      if (animating) {
        event.preventDefault();
        return;
      }
      if (event.deltaY > 8 && index < total - 1) {
        event.preventDefault();
        goTo(index + 1);
      } else if (event.deltaY > 8 && index === total - 1) {
        event.preventDefault();
        releaseDown();
      } else if (event.deltaY < -8 && index > 0) {
        event.preventDefault();
        goTo(index - 1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0].clientY;
      touchX = event.touches[0].clientX;
      gestureLocked = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (releasing) {
        event.preventDefault();
        return;
      }
      if (!pinned()) return;
      if (animating) {
        event.preventDefault();
        return;
      }
      const dy = touchY - event.touches[0].clientY;
      const dx = touchX - event.touches[0].clientX;
      if (gestureLocked) {
        event.preventDefault();
        return;
      }
      if (Math.max(Math.abs(dy), Math.abs(dx)) < SNAP_THRESHOLD) return;

      const horizontal = Math.abs(dx) > Math.abs(dy);
      const forward = horizontal ? dx > 0 : dy > 0;
      if (forward && index < total - 1) {
        gestureLocked = true;
        event.preventDefault();
        goTo(index + 1);
      } else if (forward && index === total - 1) {
        gestureLocked = true;
        event.preventDefault();
        releaseDown();
      } else if (!forward && index > 0) {
        gestureLocked = true;
        event.preventDefault();
        goTo(index - 1);
      }
    };

    const onScroll = () => {
      if (releasing) return;
      const rect = pin.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        if (index !== 0) paint(0, false);
        return;
      }
      if (rect.bottom < 0) {
        if (index !== total - 1) paint(total - 1, false);
        return;
      }
      if (index < total - 1 && rect.top <= HEADER_PX + 2) {
        const target = window.scrollY + rect.top - HEADER_PX;
        if (Math.abs(window.scrollY - target) > 1) window.scrollTo(0, target);
      }
    };

    layout();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout, { passive: true });
    return () => {
      window.clearTimeout(unlock);
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      pin.style.height = "";
      strip.style.transform = "";
      strip.style.transition = "";
    };
  }, [pinning, total]);

  return (
    <div
      ref={pinRef}
      className="relative max-md:-mx-5 max-md:h-[calc(100dvh-68px+5rem)] motion-reduce:max-md:h-auto md:contents"
    >
      <div className="max-md:sticky max-md:top-[68px] max-md:flex max-md:h-[calc(100dvh-68px)] max-md:flex-col max-md:overflow-hidden motion-reduce:max-md:static motion-reduce:max-md:h-auto motion-reduce:max-md:overflow-visible">
        {intro}
        <StepTrack
          total={total}
          active={active}
          className="mx-5 mb-8 shrink-0 md:mx-0 md:mb-10"
        />
        <ol
          ref={stripRef}
          className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 max-md:flex max-md:min-h-0 max-md:flex-[1_1_0] max-md:gap-0 max-md:will-change-transform motion-reduce:max-md:grid motion-reduce:max-md:h-auto motion-reduce:max-md:flex-none motion-reduce:max-md:grid-cols-1 motion-reduce:max-md:gap-8"
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
                className={`px-5 transition-opacity duration-[320ms] ease-[cubic-bezier(.2,.8,.2,1)] max-md:h-full max-md:w-full max-md:shrink-0 max-md:basis-full max-md:bg-black md:px-0 motion-reduce:max-md:h-auto motion-reduce:max-md:basis-auto ${
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
    </div>
  );
}
