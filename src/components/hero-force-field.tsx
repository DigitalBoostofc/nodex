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
        invertImage={false}
        invertWireframe={false}
        threshold={0}
        spacing={9}
        minStroke={0.5}
        maxStroke={4.4}
        magnifierRadius={110}
        forceStrength={22}
        friction={0.82}
        restoreSpeed={0.032}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 46% at 50% 72%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 42%, transparent 74%)",
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
