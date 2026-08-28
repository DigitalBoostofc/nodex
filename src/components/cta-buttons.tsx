import Link from "next/link";
import type { ReactNode } from "react";

import { CtaGlow } from "./ui";
import { WaLink } from "./wa-link";

/**
 * Bloco de fechamento centralizado: uma pergunta, uma linha de apoio e o par
 * de CTAs. Um único CTA primário por tela — Brand Book §10.
 */
export function CtaButtons({
  title,
  lead,
  secondaryHref,
  secondaryLabel,
  glowAt = "50%",
}: {
  title: ReactNode;
  lead?: ReactNode;
  secondaryHref: string;
  secondaryLabel: string;
  glowAt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-nx-border-soft">
      <CtaGlow at={glowAt} />
      <div className="relative mx-auto max-w-[1280px] px-5 py-28 text-center md:px-8 lg:px-12">
        <h2 className="nx-h2 mx-auto mb-[18px] max-w-[28ch] leading-[1.15]">
          {title}
        </h2>
        {lead ? (
          <p className="nx-body-l mx-auto mb-9 max-w-[52ch]">{lead}</p>
        ) : null}
        <div className="mt-9 flex flex-wrap justify-center gap-[14px]">
          <WaLink className="nx-btn">Fale com a Nodex</WaLink>
          <Link href={secondaryHref} className="nx-btn-ghost">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
