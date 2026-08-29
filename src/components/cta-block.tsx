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
        <div className="flex flex-col">
          <h2 className="nx-h2 mx-auto mb-[18px] max-w-[22ch] leading-[1.15] text-center">
            {title}
          </h2>
          <p
            className={`nx-body-l mx-auto max-w-[36ch] text-center ${leadClassName}`}
          >
            {lead}
          </p>
          <div className="mt-8 hidden flex-1 items-center justify-center lg:flex">
            <img
              src="/assets/symbol.svg"
              alt=""
              aria-hidden
              width={480}
              height={313}
              className="pointer-events-none mx-auto w-full max-w-[480px] -translate-y-25 translate-x-2"
            />
          </div>
        </div>
        <div className="nx-card nx-card-hover p-8">
          <ContactForm compact />
        </div>
      </div>
    </section>
  );
}
