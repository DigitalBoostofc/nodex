import type { ReactNode } from "react";

import { ContactForm } from "./contact-form";
import { CtaGlow } from "./ui";
import { EMAIL, PHONE_DISPLAY } from "@/lib/site";

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
          <h2 className="nx-h2 mb-[18px] max-w-[22ch] leading-[1.15]">
            {title}
          </h2>
          <p className={`nx-body-l mb-[26px] ${leadClassName}`}>{lead}</p>
          <div className="flex flex-col gap-[10px]">
            <span className="font-mono text-[14px]/[1.5] text-nx-muted">
              WHATSAPP · <span className="text-nx-red">{PHONE_DISPLAY}</span>
            </span>
            <span className="font-mono text-[14px]/[1.5] text-nx-muted">
              E-MAIL ·{" "}
              <a href={`mailto:${EMAIL}`} className="text-nx-red">
                {EMAIL}
              </a>
            </span>
          </div>
          <img
            src="/assets/symbol.svg"
            alt=""
            aria-hidden
            width={480}
            height={313}
            className="pointer-events-none mt-auto hidden w-full max-w-[480px] pt-16 lg:block"
          />
        </div>
        <div className="nx-card nx-card-hover p-8">
          <ContactForm compact />
        </div>
      </div>
    </section>
  );
}
