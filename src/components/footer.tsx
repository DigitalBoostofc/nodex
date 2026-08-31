import Image from "next/image";
import Link from "next/link";

import { ADDRESS, CNPJ, EMAIL, PHONE_DISPLAY, PHONE_WHATSAPP } from "@/lib/site";

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
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-5 pt-[72px] pb-10 md:px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-12">
        <div className="max-w-[34ch]">
          <Image
            src="/assets/logo-on-black.png"
            alt="Nodex Labs"
            width={352}
            height={72}
            className="mb-[22px] block h-[26px] w-auto mix-blend-screen"
          />
          <p className="nx-body mb-[22px]">
            Sistemas e IA para operação que já existe e precisa funcionar
            sozinha.
          </p>
          <p className="font-mono text-[13px]/[1.9] text-nx-muted">
            E-MAIL ·{" "}
            <a href={`mailto:${EMAIL}`} className="text-nx-red">
              {EMAIL}
            </a>
            <br />
            WHATSAPP ·{" "}
            <a
              href={`https://wa.me/${PHONE_WHATSAPP}`}
              className="text-nx-red"
              target="_blank"
              rel="noreferrer"
            >
              {PHONE_DISPLAY}
            </a>
            <br />
            ENDEREÇO · <span className="text-nx-red">{ADDRESS}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-x-16 gap-y-10 lg:justify-end lg:pt-1">
          {COLUMNS.map((column) => (
            <div key={column.title} className="flex min-w-[140px] flex-col gap-[6px]">
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
          <span className="max-w-[42ch] font-mono text-[11px]/[1.5] text-nx-dim md:max-w-none md:text-[12px]/[1.5]">
            © 2024 NODEX LABS — Todos os direitos reservados — CNPJ {CNPJ}
          </span>
        </div>
      </div>
    </footer>
  );
}
