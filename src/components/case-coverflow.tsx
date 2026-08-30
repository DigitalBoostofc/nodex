"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

const STEP_SWIPE_PX = 36;

export type CaseSlide = {
  kind: "ghost" | "case";
  kicker?: string;
  title: string;
  text: string;
  image?: string;
  href?: string;
};

function positionFor(offset: number) {
  if (offset === 0) return "active";
  if (offset === -1) return "prev";
  if (offset === 1) return "next";
  return "far";
}

export function CaseCoverflow({ items }: { items: readonly CaseSlide[] }) {
  const firstCase = items.findIndex((item) => item.kind === "case");
  const [active, setActive] = useState(firstCase >= 0 ? firstCase : 0);
  const last = items.length - 1;
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const swiped = useRef(false);
  activeRef.current = active;

  const goTo = useCallback(
    (index: number) => {
      setActive(Math.max(0, Math.min(last, index)));
    },
    [last],
  );

  const step = useCallback(
    (dir: -1 | 1) => {
      goTo(activeRef.current + dir);
    },
    [goTo],
  );

  const onStageKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let axis: "x" | "y" | null = null;
    let holding = false;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      holding = true;
      swiped.current = false;
      axis = null;
      startX = event.clientX;
      startY = event.clientY;
      lastX = event.clientX;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!holding) return;
      lastX = event.clientX;
      if (axis) {
        if (axis === "x") event.preventDefault();
        return;
      }
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < STEP_SWIPE_PX) return;
      axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (axis === "x") {
        event.preventDefault();
        try {
          el.setPointerCapture(event.pointerId);
        } catch {
          /* Safari antigo sem capture */
        }
      } else {
        holding = false;
      }
    };

    const onPointerUp = () => {
      if (!holding) return;
      holding = false;
      if (axis !== "x") {
        axis = null;
        return;
      }
      const dx = lastX - startX;
      if (dx <= -STEP_SWIPE_PX) {
        swiped.current = true;
        step(1);
      } else if (dx >= STEP_SWIPE_PX) {
        swiped.current = true;
        step(-1);
      }
      axis = null;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [step]);

  return (
    <div className="overflow-x-clip">
      <div
        ref={stageRef}
        className="nx-coverflow relative mx-auto flex h-[420px] w-full max-w-[1000px] touch-pan-y items-center justify-center md:h-[460px]"
        aria-roledescription="carrossel"
        aria-label="Cases em produção"
        tabIndex={0}
        onKeyDown={onStageKey}
      >
        {items.map((item, index) => {
          const pos = positionFor(index - active);
          const on = index === active;

          const body = (
            <>
              {item.kind === "ghost" ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="mb-6 grid size-16 place-items-center rounded-full border border-dashed border-[#262626] font-display text-[22px] text-[#4D4D4D]">
                    +
                  </span>
                  <p className="font-display text-[24px]/[1.2] font-medium tracking-[-0.01em] text-[#4D4D4D]">
                    {item.title}
                  </p>
                  <p className="mt-4 max-w-[28ch] text-[16px]/[1.65] font-light text-[#333333]">
                    {item.text}
                  </p>
                </div>
              ) : (
                <>
                  {item.kicker ? (
                    <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-muted">
                      {item.kicker}
                    </span>
                  ) : null}
                  {item.image ? (
                    <div className="my-5 flex justify-center md:my-6">
                      <Image
                        src={item.image}
                        alt={`Logo ${item.title}`}
                        width={180}
                        height={180}
                        className="h-[140px] w-[140px] object-contain md:h-[180px] md:w-[180px]"
                      />
                    </div>
                  ) : null}
                  <p className="mb-[14px] font-display text-[26px]/[1.2] font-medium tracking-[-0.01em] text-white md:text-[30px]/[1.2]">
                    {item.title}
                  </p>
                  <p className="text-[16px]/[1.65] font-light text-nx-muted md:text-[17px]/[1.65]">
                    {item.text}
                  </p>
                </>
              )}
            </>
          );

          const className = `nx-card nx-coverflow-card absolute box-border flex h-[400px] w-[min(78vw,320px)] flex-col overflow-hidden px-5 pt-5 pb-9 md:h-[440px] md:w-[380px] md:px-6 md:pt-6 md:pb-11 ${
            item.kind === "ghost" ? "bg-[#050505]" : "bg-nx-surface"
          }`;

          if (item.kind === "case" && item.href) {
            return (
              <Link
                key={item.title}
                href={item.href}
                aria-current={on ? "true" : undefined}
                data-pos={pos}
                data-nx-anim={on ? "glow" : undefined}
                className={`${className} hover:text-inherit`}
                onClick={(event) => {
                  if (swiped.current) {
                    event.preventDefault();
                    return;
                  }
                  if (index === active) return;
                  event.preventDefault();
                  goTo(index);
                }}
              >
                {body}
              </Link>
            );
          }

          return (
            <button
              key={item.title}
              type="button"
              data-pos={pos}
              data-nx-anim={on ? "glow" : undefined}
              aria-current={on ? "true" : undefined}
              aria-label={item.title}
              className={`${className} text-left`}
              onClick={() => goTo(index)}
            >
              {body}
            </button>
          );
        })}
      </div>

      <div className="relative z-40 mt-6 flex items-center justify-center gap-6 md:mt-8">
        <button
          type="button"
          aria-label="Case anterior"
          disabled={active === 0}
          onClick={() => step(-1)}
          className="grid size-11 place-items-center rounded-full border border-[#333] text-nx-muted transition-colors duration-160 hover:border-nx-red hover:text-nx-red disabled:pointer-events-none disabled:opacity-30"
        >
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
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, index) => {
            const on = index === active;
            return (
              <button
                key={item.title}
                type="button"
                aria-label={`Ver ${item.title}`}
                aria-current={on ? "true" : undefined}
                onClick={() => goTo(index)}
                className="grid size-11 place-items-center"
              >
                <span
                  className={`h-2 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
                    on ? "w-6 bg-nx-red" : "w-2 bg-nx-dim"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Próximo case"
          disabled={active === last}
          onClick={() => step(1)}
          className="grid size-11 place-items-center rounded-full border border-[#333] text-nx-muted transition-colors duration-160 hover:border-nx-red hover:text-nx-red disabled:pointer-events-none disabled:opacity-30"
        >
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
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
