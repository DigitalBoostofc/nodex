import Image from "next/image";
import Link from "next/link";

import { EMAIL, PHONE_DISPLAY } from "@/lib/site";

const COLUMNS = [
  {
    title: "SOLUÇÕES",
    links: [
      { href: "/", label: "Sistemas" },
      { href: "/solucoes/chatbots", label: "Chatbots" },
      { href: "/solucoes/automacoes", label: "Automações" },
    ],
  },
  {
    title: "NAVEGAÇÃO",
    links: [
      { href: "/cases", label: "Cases" },
      { href: "/sobre", label: "Sobre" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { href: "/privacidade", label: "Privacidade" },
      { href: "/termos", label: "Termos" },
    ],
  },
] as const;

const PILLARS = ["TECNOLOGIA", "ESTRATÉGIA", "PERFORMANCE", "CONFIANÇA"];

export function Footer() {
  return (
    <footer className="border-t border-nx-border-soft bg-black">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-12 px-5 pt-[72px] pb-10 md:px-8 lg:px-12">
        <div>
          <Image
            src="/assets/logo-on-black.png"
            alt="Nodex Labs"
            width={352}
            height={72}
            className="mb-[22px] block h-[26px] w-auto mix-blend-screen"
          />
          <p className="nx-body mb-[22px] max-w-[34ch]">
            Sistemas e IA para operação que já existe e precisa funcionar
            sozinha.
          </p>
          <p className="font-mono text-[13px]/[1.9] text-nx-muted">
            E-MAIL ·{" "}
            <a href={`mailto:${EMAIL}`} className="text-nx-red">
              {EMAIL}
            </a>
            <br />
            WHATSAPP · <span className="text-nx-red">{PHONE_DISPLAY}</span>
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title} className="flex flex-col gap-[6px]">
            <span className="mb-2 font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-dim">
              {column.title}
            </span>
            {column.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-[14px] text-[16px]/[1] font-light text-nx-text-2 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[1280px] px-5 pb-14 md:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-nx-border-soft pt-7">
          <div className="flex flex-wrap gap-4 font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-red">
            {PILLARS.map((pillar, index) => (
              <span key={pillar} className="contents">
                {index > 0 ? (
                  <span className="text-nx-border-warm-2">·</span>
                ) : null}
                <span>{pillar}</span>
              </span>
            ))}
          </div>
          <span className="font-mono text-[12px]/[1] text-nx-dim">
            © 2024 NODEX LABS
          </span>
        </div>
      </div>
    </footer>
  );
}
