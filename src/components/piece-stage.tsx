"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CYCLE_MS = 4800;
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

export type Piece = {
  kicker: string;
  title: string;
  text: string;
  image: string;
};

/**
 * Palco das quatro peças da automação. A ilustração troca sozinha; hover,
 * foco ou clique assumem o controle. Sem cards — lista + palco.
 */
export function PieceStage({ items }: { items: readonly Piece[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const total = items.length;

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia(REDUCE_QUERY).matches) return;
    const timer = window.setInterval(
      () => setActive((step) => (step + 1) % total),
      CYCLE_MS,
    );
    return () => window.clearInterval(timer);
  }, [auto, total]);

  const pick = (index: number) => () => {
    setAuto(false);
    setActive(index);
  };

  const current = items[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <figure className="relative mx-auto w-full max-w-[440px] lg:order-2">
        <span
          aria-hidden
          data-nx-anim="halo"
          className="absolute inset-[12%] rounded-full bg-nx-red/28 blur-3xl [animation:nx-halo_3.4s_ease-in-out_infinite]"
        />
        <div
          data-nx-anim="float"
          className="relative aspect-square [animation:nx-float_5.6s_ease-in-out_infinite]"
        >
          {items.map((item, index) => (
            <Image
              key={item.image}
              src={item.image}
              alt=""
              width={800}
              height={800}
              unoptimized
              loading="eager"
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span
            key={current.image}
            data-nx-anim="sweep"
            className="absolute inset-y-0 w-1/3 [animation:nx-sweep_1.6s_ease-in-out_1] [background:linear-gradient(90deg,transparent,rgba(255,20,32,.18),transparent)]"
          />
        </span>
      </figure>

      <ol className="relative lg:order-1">
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-0 w-px bg-nx-border"
        >
          <div
            className="absolute top-0 left-0 w-px bg-nx-red transition-[height] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{ height: `${((active + 1) / total) * 100}%` }}
          />
        </div>
        {items.map((item, index) => {
          const on = index === active;
          return (
            <li key={item.title}>
              <button
                type="button"
                onMouseEnter={pick(index)}
                onFocus={pick(index)}
                onClick={pick(index)}
                aria-current={on ? "true" : undefined}
                className={`block w-full border-l-2 py-4 pr-2 pl-5 text-left transition-[border-color,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
                  on
                    ? "border-nx-red opacity-100"
                    : "border-transparent opacity-45 hover:opacity-80"
                }`}
              >
                <span className={on ? "nx-label-red" : "nx-label"}>
                  {item.kicker}
                </span>
                <p className="mt-2 font-display text-[22px]/[1.25] font-medium tracking-[-0.02em] text-white md:text-[24px]/[1.25]">
                  {item.title}
                </p>
                <p
                  className={`nx-body max-w-[42ch] overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                    on ? "mt-2 max-h-24 opacity-100" : "mt-0 max-h-0 opacity-0"
                  }`}
                >
                  {item.text}
                </p>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
