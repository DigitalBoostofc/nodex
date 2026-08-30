import type { Metadata } from "next";
import Link from "next/link";

import { CtaButtons } from "@/components/cta-buttons";
import { HeroBackdrop, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Chatbot para conversa. Automação para processo. Sistema quando a ferramenta pronta não serve.",
};

const FRONTS = [
  {
    href: "/solucoes/chatbots",
    title: "Chatbots",
    lead: "Atendimento que conhece o seu negócio, no canal onde o cliente já está.",
    text: "Site, app, WhatsApp. Uma base de conhecimento. Handoff para humano com o contexto inteiro.",
    cta: "Ver chatbots →",
  },
  {
    href: "/solucoes/automacoes",
    title: "Automações",
    lead: "Fluxo que lê documento, decide e registra, sem alguém empurrar a fila.",
    text: "Documento, aprovação, fila, CRM, ERP. O fluxo corre sozinho e deixa rastro.",
    cta: "Ver automações →",
  },
  {
    // A frente de sistemas mora na home.
    href: "/",
    title: "Sistemas",
    lead: "Software sob medida para a operação. Do zero, ou a partir do que você já usa.",
    text: "Produto digital com dono: agenda, financeiro, CRM, app. Feito para a regra do seu negócio.",
    cta: "Ver sistemas →",
  },
];

export default function SolucoesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop glowAt="25%" />
        <div className="relative mx-auto max-w-[1280px] px-5 pt-28 pb-24 md:px-8 lg:px-12">
          <span className="nx-label">SOLUÇÕES</span>
          <p className="nx-label-red mt-[18px] text-[13px]">TRÊS FRENTES</p>
          <h1 className="nx-h1-sub mt-[22px] max-w-[20ch]">
            Três jeitos de tirar trabalho da equipe.
          </h1>
          <p className="nx-body-l mt-6 max-w-[62ch]">
            Chatbot para conversa. Automação para processo. Sistema quando a
            ferramenta pronta não serve.
          </p>
          <div className="mt-9 flex flex-wrap gap-[14px]">
            <Link href="/contato" className="nx-btn">
              Fale com a Nodex
            </Link>
            <Link href="/cases" className="nx-btn-ghost">
              Ver cases
            </Link>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="AS FRENTES"
          eyebrowTone="red"
          title="Uma página para cada problema"
          lead="Comece pela frente que dói mais. As três conversam entre si quando o problema atravessa a operação."
          className="mb-12"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {FRONTS.map((front) => (
            <Link
              key={front.title}
              href={front.href}
              className="nx-card nx-card-hover block p-8 hover:text-inherit"
            >
              <div className="mb-6 h-10 w-10 rounded-[10px] [background:linear-gradient(135deg,#FF1420,#8E0000)]" />
              <p className="nx-h3 mb-3">{front.title}</p>
              <p className="mb-3 text-[16px]/[1.65] font-light text-nx-text-2">
                {front.lead}
              </p>
              <p className="nx-body mb-6">{front.text}</p>
              <span className="text-[14px]/[1] font-medium text-nx-red">
                {front.cta}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaButtons
        title="Não sabe qual frente?"
        lead="A gente aponta a menor, a que já muda o dia da equipe."
        secondaryHref="/cases"
        secondaryLabel="Ver cases"
      />
    </>
  );
}
