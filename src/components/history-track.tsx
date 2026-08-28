"use client";

import { StepTrack, useStepCycle } from "./step-track";

export type Chapter = {
  label: string;
  title: string;
  text: string;
  /** O capítulo atual ganha a superfície quente, para fechar a linha do tempo. */
  warm?: boolean;
};

/** Os quatro capítulos da história, ligados pela hairline vermelha. */
export function HistoryTrack({ chapters }: { chapters: readonly Chapter[] }) {
  const { active, pick } = useStepCycle(chapters.length);

  return (
    <>
      <StepTrack total={chapters.length} active={active} className="mb-10" />
      <ol className="mb-24 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {chapters.map((chapter, index) => (
          <li
            key={chapter.label}
            onMouseEnter={pick(index)}
            onFocus={pick(index)}
            tabIndex={0}
            className={`nx-card nx-card-hover p-[30px] transition-opacity duration-[320ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
              chapter.warm ? "nx-card-warm" : ""
            } ${active === index ? "opacity-100" : "opacity-45"}`}
          >
            <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-red">
              {chapter.label}
            </span>
            <p className="mt-[18px] mb-3 font-display text-[19px]/[1.3] font-medium text-white">
              {chapter.title}
            </p>
            <p className="nx-body">{chapter.text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
