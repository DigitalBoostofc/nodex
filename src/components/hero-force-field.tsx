"use client";

import { useEffect, useState } from "react";

import { ForceFieldBackground } from "@/components/force-field-background";

/**
 * Interactive NX particle field. The parent owns the grid/scan backdrop so
 * those effects can cover the whole hero while this canvas sits in a mobile
 * slot under the CTAs or as a full desktop overlay.
 */
export function HeroForceField() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (reduceMotion) return null;

  return (
    <div className="relative h-full w-full" aria-hidden>
      <ForceFieldBackground
        imageUrl="/assets/symbol-on-black.png"
        invertImage={false}
        invertWireframe={false}
        threshold={0}
        spacing={9}
        minStroke={0.55}
        maxStroke={4.4}
        magnifierEnabled={false}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 22% 48%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 42%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-[240px] hidden h-[520px] lg:block"
        style={{
          background:
            "radial-gradient(ellipse at 72% 100%, rgba(225,6,0,0.38), rgba(225,6,0,0) 62%)",
        }}
      />
    </div>
  );
}
