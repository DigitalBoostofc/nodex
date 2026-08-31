import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaButtons } from "@/components/cta-buttons";
import { HeroBackdrop, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Case AppexCRM",
  description:
    "Inbox de WhatsApp, funil Kanban, automação e agenda. O time vende no mesmo lugar.",
};

const BUILT = [
  "Inbox de WhatsApp no número da empresa",
  "Funil Kanban com negócio, etapa e valor",
  "Qualificação do lead na conversa",
  "Automações e cadência de follow-up",
  "Agenda e tarefas ligadas ao negócio",
  "Contatos, empresas e produtos",
  "Papéis de dono, gerente e vendedor",
];

const FLOW = [
  "A mensagem chega no WhatsApp da empresa.",
  "O time atende na inbox e qualifica o lead.",
  "O negócio entra no funil e anda de etapa.",
  "Automação e agenda cobram o follow-up.",
];

export default function AppexcrmPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop glowAt="25%" />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-14 px-5 pt-28 pb-24 md:px-8 lg:px-12">
          <div>
            <Link
              href="/cases"
              className="inline-block py-3 font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-muted hover:text-white"
            >
              ← CASES
            </Link>
            <span className="nx-label mt-[26px] block">CASE · CRM</span>
            <p className="nx-label-red mt-[18px] text-[13px]">APPEXCRM</p>
            <h1 className="nx-h1-sub mt-[22px] max-w-[22ch]">
              CRM da operação, não de catálogo.
            </h1>
            <p className="nx-body-l mt-6 max-w-[52ch]">
              Inbox de WhatsApp, funil Kanban, automação e agenda. O time
              vende no mesmo lugar.
            </p>
          </div>
          <Image
            src="/assets/appexcrm-funil.png"
            alt="Funil Kanban do AppexCRM no desktop"
            width={1917}
            height={901}
            priority
            className="block h-auto w-full rounded-[4px] border border-nx-border-soft"
          />
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="O PROBLEMA"
          title={
            <span className="block max-w-[26ch]">
              Sem CRM, a venda se espalha
            </span>
          }
        />
        <p className="nx-body-l mb-8 max-w-[62ch] leading-[1.7]">
          A operação comercial brasileira vive no WhatsApp. Lead entra, some
          na conversa e não vira funil. Planilha, grupo, CRM genérico e inbox
          pessoal tentam dar conta do mesmo dia.
        </p>
        <p className="nx-quote max-w-[48ch] font-display text-[22px]/[1.5] font-light text-white">
          O risco clássico: o vendedor vira dono da conversa. O follow-up sai
          da empresa.
        </p>
      </Section>

      <Section>
        <SectionHead
          eyebrow="O QUE FOI CONSTRUÍDO"
          eyebrowTone="red"
          title="Um CRM, sete peças"
          lead="Do primeiro WhatsApp até o negócio ganho, tudo no mesmo lugar."
          className="mb-12"
        />
        <div className="nx-grid-hairline grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
          {BUILT.map((piece) => (
            <p
              key={piece}
              className="p-7 text-[17px]/[1.55] font-light text-nx-text-2"
            >
              {piece}
            </p>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="COMO O TIME VENDE"
          title="Do WhatsApp ao funil, em quatro passos"
          lead="O mesmo fluxo que o dono vê no painel e o vendedor vê na inbox."
          className="mb-10"
        />
        {/* Hairline vermelha com fade abre a seção — Brand Book §05. */}
        <div
          aria-hidden
          className="mb-10 h-px [background:linear-gradient(90deg,#E10600,rgba(225,6,0,0))]"
        />
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7">
          {FLOW.map((step, index) => (
            <li key={step}>
              <span className="font-mono text-[12px]/[1] font-medium tracking-[0.2em] text-nx-red">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[17px]/[1.6] font-light text-nx-text-2">
                {step}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-11 max-w-[52ch] font-display text-[20px]/[1.55] font-light text-white">
          A conversa não fica no celular de quem atendeu.
        </p>
      </Section>

      <Section>
        <span className="nx-label">O QUE ESTE CASE PROVA</span>
        <h2 className="nx-h2 mt-5 mb-8 max-w-[30ch]">Não é “CRM de template”</h2>
        <div className="nx-card-warm p-10">
          <p className="mb-[18px] max-w-[44ch] font-display text-[26px]/[1.4] font-light text-white">
            É sistema de operação comercial, com WhatsApp no centro da regra.
          </p>
          <p className="max-w-[62ch] text-[17px]/[1.7] font-light text-nx-muted">
            Se você vende no WhatsApp, tem time e perde lead na conversa, este
            case é o argumento.
          </p>
        </div>
        <p className="mt-8 font-mono text-[15px]/[1.6] text-nx-muted">
          EM PRODUÇÃO ·{" "}
          <a
            href="https://app.appexcrm.com"
            target="_blank"
            rel="noopener"
            className="text-nx-red-hover"
          >
            app.appexcrm.com
          </a>
        </p>
      </Section>

      <CtaButtons
        title="Precisa de um CRM que siga a sua venda?"
        lead="Conta como o time vende hoje. A gente devolve o recorte do sistema."
        secondaryHref="/"
        secondaryLabel="Ver sistemas"
      />
    </>
  );
}
