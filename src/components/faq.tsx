"use client";

import { useId, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Acordeão de perguntas. Abre um item por vez, com o primeiro já aberto —
 * a página nunca começa com um bloco de títulos mudos.
 */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-3 text-left">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question} className="nx-card">
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-6 rounded-[14px] px-5 py-6 text-left transition-colors duration-160 hover:bg-[#101010] sm:px-7"
            >
              <span className="font-display text-[18px]/[1.4] font-medium text-white">
                {item.question}
              </span>
              <span
                aria-hidden
                className="font-mono text-[22px]/[1] text-nx-red"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="max-w-[70ch] px-5 pb-[26px] text-[17px]/[1.7] font-light text-nx-muted sm:px-7"
              >
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/** Bloco de FAQ completo: pill, título e o acordeão. */
export function FaqSection({ items }: { items: readonly FaqItem[] }) {
  return (
    <section className="border-t border-nx-border-soft">
      <div className="mx-auto max-w-[900px] px-5 py-28 text-center md:px-8 lg:px-12">
        <span className="inline-block rounded-full border border-nx-border-warm bg-[#0B0505] px-[18px] py-3 font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-red-hover">
          PERGUNTAS FREQUENTES
        </span>
        <h2 className="nx-h2 mt-[26px] mb-12">Perguntas respondidas</h2>
        <Faq items={items} />
      </div>
    </section>
  );
}
