"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { CarouselNav } from "./carousel-nav";

const INTERVAL_MS = 10000;
const MD_QUERY = "(min-width: 768px)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

export type Problem = {
  kicker: string;
  title: string;
  text: string;
  image: string;
};

/**
 * Desktop: três colunas. Mobile: carrossel com arraste, três pontos e
 * troca automática a cada 10 s. Preferência de movimento reduzido desliga o auto.
 */
export function ProblemRail({ items }: { items: readonly Problem[] }) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const dragging = useRef(false);

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
    const slide = el.children[index] as HTMLElement | undefined;
    if (!slide) return;
    el.scrollTo({
      left: index * el.clientWidth,
      behavior: smooth ? "smooth" : "auto",
    });
    setActive(index);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || desktop) return;

    const onScroll = () => {
      const w = el.clientWidth;
      if (w <= 0) return;
      const next = Math.round(el.scrollLeft / w);
      setActive(Math.max(0, Math.min(items.length - 1, next)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [desktop, items.length]);

  useEffect(() => {
    if (desktop) return;
    if (window.matchMedia(REDUCE_QUERY).matches) return;

    const timer = window.setInterval(() => {
      if (dragging.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const current = w > 0 ? Math.round(el.scrollLeft / w) : 0;
      goTo((current + 1) % items.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [active, desktop, goTo, items.length]);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[12%] left-[12%] hidden h-px overflow-visible md:block"
        style={{
          top: 226,
          backgroundImage:
            "repeating-linear-gradient(90deg, #3a1414 0 7px, transparent 7px 14px)",
        }}
      >
        <span
          data-nx-anim="stall"
          className="absolute top-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nx-red [animation:nx-stall_3.8s_ease-in-out_infinite] [box-shadow:0_0_0_4px_rgba(225,6,0,.18)]"
        />
      </div>

      <ul
        ref={scrollerRef}
        onPointerDown={() => {
          dragging.current = true;
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:overflow-visible md:snap-none [&::-webkit-scrollbar]:hidden"
      >
        {items.map((problem, index) => (
          <li
            key={problem.title}
            className="group relative w-full shrink-0 snap-center px-1 md:w-auto md:shrink md:px-0"
          >
            <div className="flex flex-col items-center text-center">
              <figure className="relative mx-auto mb-10 w-[min(100%,220px)]">
                <span
                  aria-hidden
                  data-nx-anim="halo"
                  className="absolute inset-[20%] rounded-full bg-nx-red/30 blur-3xl [animation:nx-halo_3.4s_ease-in-out_infinite]"
                  style={{ animationDelay: `${index * 0.45}s` }}
                />
                <div
                  data-nx-anim="float"
                  className="relative [animation:nx-float_5.6s_ease-in-out_infinite]"
                  style={{ animationDelay: `${index * 0.7}s` }}
                >
                  <Image
                    src={problem.image}
                    alt=""
                    width={800}
                    height={800}
                    unoptimized
                    loading="eager"
                    className="relative h-auto w-full transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.05]"
                  />
                </div>
              </figure>
              <p className="nx-label-red">{problem.kicker}</p>
              <p className="mt-4 mb-3 max-w-[22ch] font-display text-[22px]/[1.25] font-medium tracking-[-0.02em] text-white md:text-[24px]/[1.25]">
                {problem.title}
              </p>
              <p className="nx-body max-w-[36ch]">{problem.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <CarouselNav
        count={items.length}
        active={active}
        onGo={(index) => goTo(index)}
        labelFor={(index) => `Ver ${items[index].kicker.toLowerCase()}`}
        prevLabel="Problema anterior"
        nextLabel="Próximo problema"
        className="mt-6 md:hidden"
      />
    </div>
  );
}
