import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaButtons } from "@/components/cta-buttons";
import { HeroBackdrop, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Case Cleanox",
  description:
    "Ordens de serviço, agenda, financeiro, comissão e app do profissional. Cliente e caixa ficam na marca.",
};

const BUILT = [
  "Cadastro de cliente e ordem de serviço",
  "Agenda e atribuição do profissional",
  "App de campo: job do dia, execução, evidência, pagamento",
  "WhatsApp pelo número da empresa",
  "Financeiro da operação: o que entrou na OS, comissão, ciclo",
  "Painel de dono e gerente, com permissão diferente",
  "Vitrine pública da marca",
];

const FLOW = [
  "Lead vira cliente e ordem de serviço.",
  "A OS vai para um profissional, com data e endereço.",
  "No dia, ele inicia, registra o serviço e recebe.",
  "O caixa da marca registra e a comissão segue regra.",
];

export default function CleanoxPage() {
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
            <span className="nx-label mt-[26px] block">CASE · SISTEMA</span>
            <p className="nx-label-red mt-[18px] text-[13px]">CLEANOX</p>
            <h1 className="nx-h1-sub mt-[22px] max-w-[22ch]">
              A operação de higienização, no sistema.
            </h1>
            <p className="nx-body-l mt-6 max-w-[52ch]">
              Ordens de serviço, agenda, financeiro, comissão e app do
              profissional. Cliente e caixa ficam na marca.
            </p>
          </div>
          <Image
            src="/assets/cleanox-devices.png"
            alt="Sistema Cleanox no desktop, tablet e celular"
            width={1792}
            height={1008}
            priority
            className="block h-auto w-full"
          />
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="O PROBLEMA"
          title={
            <span className="block max-w-[26ch]">
              Sem sistema, a operação se espalha
            </span>
          }
        />
        <p className="nx-body-l mb-8 max-w-[62ch] leading-[1.7]">
          A Cleanox presta higienização de estofados a domicílio: sofá, colchão,
          tapete e afins. Agenda, profissional na rua, pagamento, comissão e
          conversa com cliente viviam em lugares diferentes.
        </p>
        <p className="nx-quote max-w-[48ch] font-display text-[22px]/[1.5] font-light text-white">
          O risco clássico: o profissional vira dono da base. O dinheiro e o
          cliente saem da marca.
        </p>
      </Section>

      <Section>
        <SectionHead
          eyebrow="O QUE FOI CONSTRUÍDO"
          eyebrowTone="red"
          title="Um sistema, sete peças"
          lead="Do primeiro contato do cliente até a comissão do profissional, tudo no mesmo lugar."
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
          eyebrow="COMO A OS ANDA"
          title="Do lead ao caixa, em quatro passos"
          lead="O mesmo fluxo que o dono vê no painel e o profissional vê no celular."
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
          O endereço não fica de souvenir no celular de quem executou.
        </p>
      </Section>

      <Section>
        <span className="nx-label">O QUE ESTE CASE PROVA</span>
        <h2 className="nx-h2 mt-5 mb-8 max-w-[30ch]">Não é “app de estofado”</h2>
        <div className="nx-card-warm p-10">
          <p className="mb-[18px] max-w-[44ch] font-display text-[26px]/[1.4] font-light text-white">
            É sistema de operação de serviço a domicílio, com regra de negócio
            dura.
          </p>
          <p className="max-w-[62ch] text-[17px]/[1.7] font-light text-nx-muted">
            Se você tem equipe de campo, agenda, comissão e medo de perder
            cliente, este case é o argumento.
          </p>
        </div>
        <p className="mt-8 font-mono text-[15px]/[1.6] text-nx-muted">
          EM PRODUÇÃO ·{" "}
          <a
            href="https://app.cleanox.com.br"
            target="_blank"
            rel="noopener"
            className="text-nx-red-hover"
          >
            app.cleanox.com.br
          </a>
        </p>
      </Section>

      <CtaButtons
        title="Tem operação de campo parecida?"
        lead="Conta como o serviço acontece hoje. A gente devolve o recorte do sistema."
        secondaryHref="/"
        secondaryLabel="Ver sistemas"
      />
    </>
  );
}
