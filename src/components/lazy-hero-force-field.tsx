"use client";

import dynamic from "next/dynamic";

/** Client wrapper so `ssr: false` is legal — page.tsx is a Server Component. */
export const LazyHeroForceField = dynamic(
  () => import("./hero-force-field").then((m) => m.HeroForceField),
  { ssr: false },
);
