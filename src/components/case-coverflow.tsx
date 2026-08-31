"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

import { CarouselNav } from "./carousel-nav";

const STEP_SWIPE_PX = 36;

export type CaseSlide = {
  kind: "ghost" | "case";
  kicker?: string;
  title: string;
  text: string;
  image?: string;
  href?: string;
  /** `screen` usa a imagem como captura do produto, não como logo quadrado. */
  imageStyle?: "logo" | "screen";
};

function positionFor(offset: number) {
  if (offset === 0) return "active";
  if (offset === -1) return "prev";
  if (offset === 1) return "next";
  return "far";
}

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

export function CaseCoverflow({
  items,
  cycleMs,
  label = "Cases em produção",
  prevLabel = "Case anterior",
  nextLabel = "Próximo case",
}: {
  items: readonly CaseSlide[];
  /** Autoavança e volta ao primeiro. Omitir desliga o ciclo. */
  cycleMs?: number;
  label?: string;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const firstCase = items.findIndex(
    (item) => item.kind === "case" && Boolean(item.href),
  );
  const [active, setActive] = useState(firstCase >= 0 ? firstCase : 0);
  const last = items.length - 1;
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const swiped = useRef(false);
  const paused = useRef(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const goTo = useCallback(
    (index: number) => {
      paused.current = true;
      setActive(Math.max(0, Math.min(last, index)));
    },
    [last],
  );

  useEffect(() => {
    if (!cycleMs || items.length < 2) return;
    if (window.matchMedia(REDUCE_QUERY).matches) return;
    const timer = window.setInterval(() => {
      if (paused.current) return;
      setActive((index) => (index + 1) % items.length);
    }, cycleMs);
    return () => window.clearInterval(timer);
  }, [cycleMs, items.length]);

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
        className={`nx-coverflow relative mx-auto flex w-full max-w-[1000px] touch-pan-y items-center justify-center ${
          items.some((slide) => slide.imageStyle === "screen")
            ? "h-[460px] md:h-[500px]"
            : "h-[420px] md:h-[460px]"
        }`}
        aria-roledescription="carrossel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onStageKey}
      >
        {items.map((item, index) => {
          const pos = positionFor(index - active);
          const on = index === active;
          const screenCards = items.some((slide) => slide.imageStyle === "screen");

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
                  {item.image && item.imageStyle === "screen" ? (
                    <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-[14px] border-b border-nx-border-soft md:-mx-6 md:-mt-6">
                      <Image
                        src={item.image}
                        alt=""
                        width={1200}
                        height={680}
                        className="h-[168px] w-full object-cover object-left-top md:h-[196px]"
                      />
                    </div>
                  ) : null}
                  {item.kicker ? (
                    <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-muted">
                      {item.kicker}
                    </span>
                  ) : null}
                  {item.image && item.imageStyle !== "screen" ? (
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

          const className = `nx-card nx-coverflow-card absolute box-border flex w-[min(78vw,320px)] flex-col overflow-hidden px-5 pt-5 pb-9 md:w-[380px] md:px-6 md:pt-6 md:pb-11 ${
            screenCards ? "h-[440px] md:h-[480px]" : "h-[400px] md:h-[440px]"
          } ${item.kind === "ghost" ? "bg-[#050505]" : "bg-nx-surface"}`;

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

      <CarouselNav
        count={items.length}
        active={active}
        onGo={goTo}
        labelFor={(index) => `Ver ${items[index].title}`}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
        className="mt-6 md:mt-8"
      />
    </div>
  );
}
