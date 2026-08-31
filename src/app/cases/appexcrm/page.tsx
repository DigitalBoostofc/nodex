import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CaseCoverflow, type CaseSlide } from "@/components/case-coverflow";
import { CtaButtons } from "@/components/cta-buttons";
import { ProblemRail, type Problem } from "@/components/problem-rail";
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
    text: "Produto da Nodex Labs, no ar em app.appexcrm.com.",
    image: "/assets/appexcrm/logo.png",
  },
];

const PROBLEMS: Problem[] = [
  {
    kicker: "WHATSAPP SOLTO",
    title: "Lead entra e some na conversa",
    text: "A venda acontece no WhatsApp. Sem inbox da empresa, o follow-up fica no celular de quem atendeu.",
    image: "/assets/problems/repeat.webp",
  },
  {
    kicker: "O FULANO SABE",
    title: "O funil mora na cabeça de alguém",
    text: "Planilha, grupo e “pergunta o João”. Quando essa pessoa falta, a operação para.",
    image: "/assets/problems/head.webp",
  },
  {
    kicker: "CRM GENÉRICO",
    title: "Você se adapta ao software",
    text: "Template de funil que não conhece a venda brasileira. O time volta para o WhatsApp.",
    image: "/assets/problems/tool.webp",
  },
];

const BUILT = [
  { kicker: "01", title: "Inbox WhatsApp", text: "Número da empresa, não do vendedor." },
  { kicker: "02", title: "Funil Kanban", text: "Negócio, etapa e valor na mesma tela." },
  { kicker: "03", title: "Qualificação", text: "Lead vira ficha dentro da conversa." },
  { kicker: "04", title: "Automações", text: "Cadência cobra o silêncio por você." },
  { kicker: "05", title: "Agenda", text: "Tarefa ligada ao negócio, não ao bloco de notas." },
  { kicker: "06", title: "Cadastros", text: "Contato, empresa e produto no mesmo lugar." },
  { kicker: "07", title: "Papéis", text: "Dono, gerente e vendedor veem o que podem ver." },
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
                href="https://app.appexcrm.com"
                target="_blank"
                rel="noopener"
                className="text-nx-red-hover"
              >
                app.appexcrm.com
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

      <section className="relative overflow-hidden border-t border-nx-border-soft">
        <div
          aria-hidden
          data-nx-anim="glow"
          className="pointer-events-none absolute inset-x-0 top-[42%] h-[420px] -translate-y-1/2 [animation:nx-drift_13s_ease-in-out_infinite] [background:radial-gradient(ellipse_at_50%_50%,rgba(225,6,0,.16),transparent_62%)]"
        />
        <div className="relative mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24 lg:px-12">
          <SectionHead
            eyebrow="O PROBLEMA"
            eyebrowTone="red"
            title={
              <span className="block max-w-[16ch]">Sem CRM, a venda se espalha</span>
            }
            className="mb-10 md:mb-14"
          />
          <ProblemRail items={PROBLEMS} />
        </div>
      </section>

      <Section className="overflow-x-clip py-16 md:py-24">
        <div className="mb-10 text-center md:mb-14">
          <span className="nx-label-red">O PRODUTO</span>
          <h2 className="nx-h2 mt-5 mb-4">Telas da operação real.</h2>
          <p className="nx-body-l mx-auto max-w-[46ch]">
            Capturas do AppexCRM em produção. Arraste no celular — o palco é o
            mesmo da home de sistemas.
          </p>
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
        <SectionHead
          eyebrow="O QUE FOI CONSTRUÍDO"
          eyebrowTone="red"
          title="Um CRM, sete peças"
          lead="Do primeiro WhatsApp até o negócio ganho, tudo no mesmo lugar."
          className="mb-8 md:mb-12"
        />
        <div className="nx-grid-hairline grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          {BUILT.map((piece) => (
            <p
              key={piece.title}
              className="p-5 md:p-7"
            >
              <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-red">
                {piece.kicker}
              </span>
              <span className="mt-3 block font-display text-[20px]/[1.25] font-medium tracking-[-0.02em] text-white">
                {piece.title}
              </span>
              <span className="mt-2 block text-[16px]/[1.55] font-light text-nx-text-2 md:text-[17px]/[1.55]">
                {piece.text}
              </span>
            </p>
          ))}
        </div>
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
