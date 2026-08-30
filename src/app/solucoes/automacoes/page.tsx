import type { Metadata } from "next";
import Link from "next/link";

import { CtaForm } from "@/components/cta-block";
import { FaqSection, type FaqItem } from "@/components/faq";
import { PieceStage } from "@/components/piece-stage";
import { HeroBackdrop, HeroPill, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Automações",
  description:
    "Leitura de documento, decisão e registro no sistema que vocês já usam. Com trilha para auditar.",
};

const PIECES = [
  {
    kicker: "LEITURA",
    title: "Documento",
    text: "Contrato, nota, formulário, PDF. Vira dado estruturado, com confiança por campo.",
    image: "/assets/automacoes/document.webp",
  },
  {
    kicker: "REGRA",
    title: "Decisão",
    text: "Triagem, aprovação, fila. Pessoa entra só no ponto que a regra manda.",
    image: "/assets/automacoes/decision.webp",
  },
  {
    kicker: "LIGAÇÃO",
    title: "Integração",
    text: "CRM, ERP, planilha, WhatsApp, n8n. A IA entra no fluxo, não ao lado.",
    image: "/assets/automacoes/integration.webp",
  },
  {
    kicker: "RASTRO",
    title: "Trilha",
    text: "Quem aprovou, o que o sistema leu, quando. Serve para o dono e para o auditor.",
    image: "/assets/automacoes/trail.webp",
  },
];

const PATTERNS = [
  {
    title: "Revisão de contrato",
    text: "Primeira leitura, cláusula fora do padrão, humano só no risco.",
  },
  {
    title: "Extração",
    text: "Nota, recibo, ficha → sistema de registro.",
  },
  {
    title: "Aprovação",
    text: "Resume o pedido, manda para o certo, cobra prazo.",
  },
  {
    title: "Fila de atendimento",
    text: "Classifica, responde o óbvio, escala o resto.",
  },
];

const FAQ: FaqItem[] = [
  {
    question: "O que conta como automação para vocês?",
    answer:
      "Processo que se repete e toca dado, decisão ou aprovação. Se alguém copia e cola todo dia, cabe.",
  },
  {
    question: "Precisa trocar o sistema atual?",
    answer:
      "Não. Ligamos no que já existe. Troca só se o sistema atual for o problema.",
  },
  {
    question: "Quanto de manutenção?",
    answer:
      "Fluxo vivo precisa de dono. Combinamos revisão. Não é “ligar e esquecer para sempre”.",
  },
  {
    question: "Dá para rodar na nossa infra?",
    answer:
      "Sim, quando a regra de dado exigir. Combinado no desenho, não no fim.",
  },
];

export default function AutomacoesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop glowAt="20%" />
        <div className="relative mx-auto max-w-[1280px] px-5 pt-28 pb-28 text-center md:px-8 md:pt-35 lg:px-12">
          <span className="nx-label tracking-[0.22em]">
            SOLUÇÕES · AUTOMAÇÕES
          </span>
          <div className="mt-[22px] flex justify-center">
            <HeroPill>FLUXO COM IA</HeroPill>
          </div>
          <h1 className="nx-h1 mx-auto mt-8 max-w-[20ch]">
            O processo que hoje depende de alguém,{" "}
            <span className="text-nx-red">no automático.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[58ch] text-[19px]/[1.65] font-light text-nx-muted">
            Leitura de documento, decisão, registro no sistema que vocês já usam.
            Com trilha para auditar.
          </p>
          <div className="mt-11 flex flex-wrap justify-center gap-[14px]">
            <Link href="/contato" className="nx-btn nx-btn-pill">
              Fale com a Nodex →
            </Link>
            <Link
              href="/cases/cleanox"
              className="nx-btn-ghost nx-btn-ghost-pill"
            >
              Ver um case
            </Link>
          </div>
          <p className="mt-11 font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-dim">
            DOCUMENTO · DECISÃO · INTEGRAÇÃO · TRILHA.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-nx-border-soft">
        <div
          aria-hidden
          data-nx-anim="glow"
          className="pointer-events-none absolute inset-x-0 top-[45%] h-[420px] -translate-y-1/2 [animation:nx-drift_13s_ease-in-out_infinite] [background:radial-gradient(ellipse_at_50%_50%,rgba(225,6,0,.16),transparent_62%)]"
        />
        <div className="relative mx-auto max-w-[1280px] px-5 py-24 md:px-8 lg:px-12">
          <SectionHead
            eyebrow="CAPACIDADES"
            eyebrowTone="red"
            title="O que entra numa automação"
            lead="Quatro peças. Juntas, elas tiram o processo da mão de uma pessoa só."
            className="mb-12"
          />
          <PieceStage items={PIECES} />
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="PADRÕES QUE REPETEM"
          title="Onde a automação costuma pagar primeiro"
          lead="Quatro fluxos que aparecem em quase toda operação com volume."
          className="mb-12"
        />
        <div className="nx-grid-hairline grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {PATTERNS.map((pattern) => (
            <div key={pattern.title} className="p-[30px]">
              <p className="mb-[10px] font-display text-[19px]/[1.3] font-medium text-white">
                {pattern.title}
              </p>
              <p className="text-[16px]/[1.6] font-light text-nx-muted">
                {pattern.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaForm
        title="Vamos automatizar o fluxo certo"
        lead="Descreve o processo que come as horas da equipe. Voltamos com o recorte e o esforço."
        leadClassName="max-w-[48ch]"
      />

      <FaqSection items={FAQ} />
    </>
  );
}
