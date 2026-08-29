import type { ReactNode } from "react";

import { ContactForm } from "./contact-form";
import { CtaGlow } from "./ui";

/** Contato em duas colunas: promessa à esquerda, formulário curto à direita. */
export function CtaForm({
  title,
  lead,
  leadClassName = "",
}: {
  title: ReactNode;
  lead: ReactNode;
  leadClassName?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-nx-border-soft">
      <CtaGlow at="30%" strength={0.3} />
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-14 px-5 py-28 md:px-8 lg:grid-cols-2 lg:items-stretch lg:px-12">
        <div className="flex flex-col lg:justify-center">
          <h2 className="nx-h2 mb-[18px] max-w-[22ch] leading-[1.15]">
            {title}
          </h2>
          <p className={`nx-body-l ${leadClassName}`}>{lead}</p>
          <img
            src="/assets/symbol.svg"
            alt=""
            aria-hidden
            width={480}
            height={313}
            className="pointer-events-none mt-12 hidden w-full max-w-[480px] lg:block"
          />
        </div>
        <div className="nx-card nx-card-hover p-8">
          <ContactForm compact />
        </div>
      </div>
    </section>
  );
}
