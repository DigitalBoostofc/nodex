"use client";

import { useEffect, useState } from "react";

import { ForceFieldBackground } from "@/components/force-field-background";
import { HeroBackdrop } from "@/components/ui";

/**
 * Hero decoration: interactive NX particle field in brand red/white/black.
 * Falls back to the static grid/glow when the visitor prefers reduced motion.
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

  if (reduceMotion) {
    return <HeroBackdrop glowStrength={0.5} />;
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      <HeroBackdrop glowAt="72%" glowStrength={0.42} />
      <ForceFieldBackground
        imageUrl="/assets/symbol-on-black.png"
        invertImage={false}
        invertWireframe={false}
        threshold={0}
        spacing={9}
        minStroke={0.55}
        maxStroke={4.4}
        magnifierRadius={25}
        forceStrength={22}
        friction={0.82}
        restoreSpeed={0.032}
        markAlign="right"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 22% 48%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 42%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-[240px] h-[520px]"
        style={{
          background:
            "radial-gradient(ellipse at 72% 100%, rgba(225,6,0,0.38), rgba(225,6,0,0) 62%)",
        }}
      />
    </div>
  );
}
