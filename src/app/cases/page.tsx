import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaButtons } from "@/components/cta-buttons";
import { HeroBackdrop, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cases",
  description: "Dois produtos que a Nodex Labs construiu e ainda opera.",
};

export default function CasesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop glowAt="25%" />
        <div className="relative mx-auto max-w-[1280px] px-5 pt-28 pb-24 md:px-8 lg:px-12">
          <span className="nx-label">CASES</span>
          <p className="nx-label-red mt-[18px] text-[13px]">EM PRODUÇÃO</p>
          <h1 className="nx-h1-sub mt-[22px]">Sistemas em produção.</h1>
          <p className="nx-body-l mt-6 max-w-[60ch]">
            Dois produtos que a Nodex Labs construiu e ainda opera.
          </p>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="OS PROJETOS"
          title="Operação real, não deck"
          lead="Em cada case você vê o problema que existia, o sistema que construímos e o resultado na operação."
          className="mb-12"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-5">
          <Link
            href="/cases/cleanox"
            className="nx-card nx-card-hover block p-9 hover:text-inherit"
          >
            <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-muted">
              HIGIENIZAÇÃO A DOMICÍLIO · SISTEMA OPERACIONAL
            </span>
            <Image
              src="/assets/cases/cleanox.webp"
              alt="Logo Cleanox"
              width={200}
              height={200}
              className="my-6 h-[200px] w-[200px] object-contain"
            />
            <p className="mb-[14px] font-display text-[34px]/[1.15] font-medium tracking-[-0.015em] text-white">
              Cleanox
            </p>
            <p className="mb-[26px] text-[17px]/[1.65] font-light text-nx-muted">
              Ordens de serviço, agenda, financeiro, comissão e app do
              profissional. Cliente e caixa ficam na marca.
            </p>
            <span className="text-[14px]/[1] font-medium text-nx-red">
              Ler o case →
            </span>
          </Link>

          {/* Sem link: o case longo espera o briefing (docs/copy-orientacao.md §9). */}
          <div className="nx-card nx-card-hover p-9">
            <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-muted">
              OPERAÇÃO COMERCIAL · CRM
            </span>
            <Image
              src="/assets/cases/appexcrm.webp"
              alt="Logo AppexCRM"
              width={200}
              height={200}
              className="my-6 h-[200px] w-[200px] object-contain"
            />
            <p className="mb-[14px] font-display text-[34px]/[1.15] font-medium tracking-[-0.015em] text-white">
              AppexCRM
            </p>
            <p className="mb-[26px] text-[17px]/[1.65] font-light text-nx-muted">
              CRM desenhado para a operação comercial, não para um template de
              funil.
            </p>
            <span className="inline-block rounded-[4px] border border-nx-border-warm px-3 py-[9px] font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-red">
              CASE COMPLETO EM BREVE
            </span>
          </div>
        </div>
      </Section>

      <CtaButtons
        title="Quer um sistema assim?"
        lead="Uma conversa de diagnóstico já mostra o recorte da primeira entrega."
        secondaryHref="/"
        secondaryLabel="Ver sistemas"
      />
    </>
  );
}
