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
      <ForceFieldBackground
        imageUrl="/assets/symbol-on-black.png"
        spacing={10}
        minStroke={1.2}
        maxStroke={4}
        magnifierRadius={180}
        forceStrength={14}
        friction={0.88}
        restoreSpeed={0.055}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 30% at 50% 64%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 40%, transparent 74%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-[240px] h-[520px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(225,6,0,0.38), rgba(225,6,0,0) 62%)",
        }}
      />
    </div>
  );
}
