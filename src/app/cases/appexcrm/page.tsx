import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CaseCoverflow, type CaseSlide } from "@/components/case-coverflow";
import { CtaButtons } from "@/components/cta-buttons";
import { StepList, type Step } from "@/components/step-track";
import { HeroBackdrop, HeroPill, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Case AppexCRM",
  description:
    "Inbox de WhatsApp, funil Kanban, automação e agenda. O time vende no mesmo lugar.",
};

const SCREENS: CaseSlide[] = [
  {
    kind: "case",
    kicker: "FUNIL",
    title: "Kanban da operação",
    text: "Etapa, valor e dono do negócio na mesma tela. Arrasta, fecha, cobra.",
    image: "/assets/appexcrm/funil.png",
    imageStyle: "screen",
  },
  {
    kind: "case",
    kicker: "NEGÓCIOS",
    title: "Carteira visível",
    text: "Cada card é um negócio real. O dono vê o pipeline, não um print de planilha.",
    image: "/assets/appexcrm/negocios.png",
    imageStyle: "screen",
  },
  {
    kind: "case",
    kicker: "NAVEGAÇÃO",
    title: "Inbox, funil, agenda",
    text: "O vendedor não troca de app. O comercial inteiro mora aqui.",
    image: "/assets/appexcrm/nav.png",
    imageStyle: "screen",
  },
  {
    kind: "case",
    kicker: "MARCA",
    title: "AppexCRM",
    text: "Produto da Nodex Labs, no ar em appexcrm.com.",
    image: "/assets/appexcrm/logo.png",
  },
];

const FLOW: Step[] = [
  {
    title: "Chega no WhatsApp",
    text: "A mensagem entra no número da empresa. Não no celular particular.",
    output: "conversa na inbox.",
  },
  {
    title: "Time atende",
    text: "Qualifica o lead na conversa, com contexto inteiro.",
    output: "ficha pronta.",
  },
  {
    title: "Entra no funil",
    text: "O negócio ganha etapa, valor e dono. O painel acompanha.",
    output: "pipeline vivo.",
  },
  {
    title: "O sistema cobra",
    text: "Automação e agenda seguem o silêncio. Follow-up não depende de memória.",
    output: "venda que não esfria.",
  },
];

export default function AppexcrmPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop glowAt="78%" glowStrength={0.38} scan="full" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-5 pt-20 pb-14 md:gap-12 md:px-8 md:pt-28 md:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14 lg:px-12">
          <div className="min-w-0">
            <Link
              href="/cases"
              className="inline-block py-3 font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-muted hover:text-white"
            >
              ← CASES
            </Link>
            <div className="mt-6 flex items-center gap-4 md:mt-8">
              <span className="relative grid size-16 shrink-0 place-items-center md:size-[72px]">
                <span
                  aria-hidden
                  data-nx-anim="halo"
                  className="absolute inset-[-18%] rounded-[22px] bg-nx-red/30 blur-2xl [animation:nx-halo_3.4s_ease-in-out_infinite]"
                />
                <Image
                  src="/assets/appexcrm/logo.png"
                  alt="Logo AppexCRM"
                  width={512}
                  height={512}
                  priority
                  className="relative size-16 rounded-[18px] md:size-[72px]"
                />
              </span>
              <div>
                <span className="nx-label block">CASE · CRM</span>
                <p className="nx-label-red mt-2 text-[13px]">APPEXCRM</p>
              </div>
            </div>
            <div className="mt-6 md:mt-7">
              <HeroPill pulsing>EM PRODUÇÃO</HeroPill>
            </div>
            <h1 className="nx-h1-sub mt-6 max-w-[16ch] text-[40px]/[1.05] md:mt-[22px] md:text-[inherit]">
              CRM da operação,{" "}
              <span className="text-nx-red">não de catálogo.</span>
            </h1>
            <p className="nx-body-l mt-5 max-w-[46ch] text-[17px]/[1.65] md:mt-6 md:text-[inherit]">
              Inbox de WhatsApp, funil Kanban, automação e agenda. O time
              vende no mesmo lugar.
            </p>
            <p className="mt-8 font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-muted md:mt-10">
              NODEX LABS ·{" "}
              <a
                href="https://appexcrm.com"
                target="_blank"
                rel="noopener"
                className="text-nx-red-hover"
              >
                appexcrm.com
              </a>
            </p>
          </div>
          <figure className="relative min-w-0">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-6 hidden rounded-[28px] bg-nx-red/20 blur-3xl md:block"
            />
            <div className="relative overflow-hidden rounded-[14px] border border-nx-border-warm shadow-[0_0_0_1px_rgba(225,6,0,.35),0_24px_80px_rgba(0,0,0,.55)]">
              <Image
                src="/assets/appexcrm/funil.png"
                alt="Funil Kanban do AppexCRM"
                width={1917}
                height={901}
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="block h-auto w-full"
              />
            </div>
          </figure>
        </div>
      </section>

      <Section className="overflow-x-clip py-16 md:py-24">
        <div className="mb-10 text-center md:mb-14">
          <span className="nx-label-red">O PRODUTO</span>
          <h2 className="nx-h2 mt-5 mb-0">Telas da operação real.</h2>
        </div>
        <CaseCoverflow
          items={SCREENS}
          cycleMs={5200}
          label="Telas do AppexCRM"
          prevLabel="Tela anterior"
          nextLabel="Próxima tela"
        />
      </Section>

      <Section className="py-16 md:py-24">
        <StepList
          intro={
            <SectionHead
              eyebrow="COMO O TIME VENDE"
              eyebrowTone="red"
              title="Do WhatsApp ao funil"
              lead="O mesmo fluxo que o dono vê no painel e o vendedor vê na inbox."
              className="mb-8 md:mb-11"
            />
          }
          steps={FLOW}
          mobileCycleMs={7000}
          cta={false}
        />
        <p className="mt-10 max-w-[52ch] font-display text-[18px]/[1.5] font-light text-white md:mt-12 md:text-[20px]/[1.55]">
          A conversa não fica no celular de quem atendeu.
        </p>
      </Section>

      <Section className="py-16 md:py-24">
        <span className="nx-label">O QUE ESTE CASE PROVA</span>
        <h2 className="nx-h2 mt-5 mb-8 max-w-[18ch] md:max-w-[30ch]">
          Não é “CRM de template”
        </h2>
        <div className="nx-card-warm grid items-center gap-8 p-7 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 md:p-10">
          <Image
            src="/assets/appexcrm/logo.png"
            alt=""
            width={512}
            height={512}
            className="size-20 justify-self-start rounded-[22px] md:size-24"
          />
          <div>
            <p className="mb-3 max-w-[44ch] font-display text-[22px]/[1.35] font-light text-white md:mb-[18px] md:text-[26px]/[1.4]">
              É sistema de operação comercial, com WhatsApp no centro da regra.
            </p>
            <p className="max-w-[62ch] text-[16px]/[1.65] font-light text-nx-muted md:text-[17px]/[1.7]">
              Se você vende no WhatsApp, tem time e perde lead na conversa,
              este case é o argumento.
            </p>
          </div>
        </div>
        <p className="mt-8 font-mono text-[13px]/[1.6] text-nx-muted md:text-[15px]/[1.6]">
          EM PRODUÇÃO ·{" "}
          <a
            href="https://appexcrm.com"
            target="_blank"
            rel="noopener"
            className="text-nx-red-hover"
          >
            appexcrm.com
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
