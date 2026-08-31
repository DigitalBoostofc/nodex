import Link from "next/link";

import { CaseCoverflow, type CaseSlide } from "@/components/case-coverflow";
import { CtaForm } from "@/components/cta-block";
import { FaqSection, type FaqItem } from "@/components/faq";
import { LazyHeroForceField as HeroForceField } from "@/components/lazy-hero-force-field";
import { ProblemRail } from "@/components/problem-rail";
import { StepList, type Step } from "@/components/step-track";
import { HeroBackdrop, HeroPill, Section, SectionHead } from "@/components/ui";


const PROBLEMS = [
  {
    kicker: "CONVERSA REPETIDA",
    title: "A equipe responde o mesmo recado o dia inteiro",
    text: "Pergunta de cliente, status de pedido, agendamento. O que deveria ser o sistema vira conversa repetida.",
    image: "/assets/problems/repeat.webp",
  },
  {
    kicker: "O FULANO SABE",
    title: "O processo mora na cabeça de alguém",
    text: "Planilha, WhatsApp e “o fulano sabe”. Quando essa pessoa falta, a operação para.",
    image: "/assets/problems/head.webp",
  },
  {
    kicker: "FERRAMENTA GENÉRICA",
    title: "Você se adapta ao software. Não o contrário.",
    text: "Sistemas complexos que não solucionam uma dor real.",
    image: "/assets/problems/tool.webp",
  },
];

const PROCESS: Step[] = [
  {
    title: "Diagnóstico",
    text: "Mapeamos os processos, automatizamos as tarefas repetitivas e definimos o MVP.",
    output: "escopo da menor entrega que já muda o jogo.",
  },
  {
    title: "Desenho",
    text: "Arquitetura, telas e regras evitando retrabalho.",
    output: "plano fechado.",
  },
  {
    title: "Construção",
    text: "Código em produção, com teste e acompanhamento desde o primeiro dia.",
    output: "MVP em produção.",
  },
  {
    title: "Operação",
    text: "Medimos o efeito, ajustamos todos os possíveis erros, e adicionamos novas funções de acordo com a necessidade do cliente.",
    output: "Sistema rodando e otimizado no menor tempo possível.",
  },
];

const CASES: CaseSlide[] = [
  {
    kind: "case",
    kicker: "APP DE INVENTÁRIO PATRIMONIAL",
    title: "InvSync",
    text: "EM BREVE",
    accentText: true,
    image: "/assets/cases/invsync.webp",
  },
  {
    kind: "case",
    kicker: "HIGIENIZAÇÃO A DOMICÍLIO · SISTEMA OPERACIONAL",
    title: "Cleanox",
    text: "Sistema de ordens de serviço, agenda, financeiro e app do profissional para higienização a domicílio.",
    image: "/assets/cases/cleanox.webp",
    href: "/cases/cleanox",
  },
  {
    kind: "case",
    kicker: "OPERAÇÃO COMERCIAL · CRM",
    title: "AppexCRM",
    text: "CRM sob medida para a operação comercial.",
    image: "/assets/cases/appexcrm.webp",
    href: "/cases/appexcrm",
  },
];

const FAQ: FaqItem[] = [
  {
    question: "Quanto tempo leva para ter a primeira versão no ar?",
    answer:
      "Depende do recorte. Na conversa de diagnóstico definimos a menor entrega que já muda o dia da operação. Dela sai prazo fechado, não um “depende” eterno.",
  },
  {
    question: "Vocês usam ferramenta pronta ou constroem do zero?",
    answer:
      "Construímos o produto. Usamos bloco maduro por baixo, como banco, autenticação e base de app, para não reinventar o óbvio e gastar o tempo na regra do seu negócio.",
  },
  {
    question: "Precisa trocar os sistemas que já usamos?",
    answer:
      "Não. Ligamos no que já roda: CRM, ERP, planilha, WhatsApp. Substituir só entra em cena quando o sistema atual é o próprio problema, e essa decisão é tomada no diagnóstico.",
  },
  {
    question: "E depois que o sistema entra no ar?",
    answer:
      "Ficamos como dono técnico: correção, evolução e acompanhamento do efeito na operação. O que o uso ensinar vira a próxima fatia do produto.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative grid overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <HeroBackdrop glowAt="72%" glowStrength={0.42} scan="full" />
        </div>
        <div className="pointer-events-none relative z-10 col-start-1 row-start-1 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 pt-12 text-center md:px-8 md:pt-24 lg:min-h-[720px] lg:flex-row lg:items-center lg:px-12 lg:pb-28 lg:text-left">
          <div className="w-full max-w-[36rem] lg:max-w-[38rem]">
            <span className="nx-label tracking-[0.22em]">NODEX LABS</span>
            <div className="mt-[22px] flex justify-center lg:justify-start">
              <HeroPill pulsing>SISTEMAS · CHATBOTS · AUTOMAÇÃO</HeroPill>
            </div>
            <h1 className="nx-h1 mx-auto mt-8 max-w-[14ch] lg:mx-0">
              Seu processo hoje é manual.{" "}
              <span className="text-nx-red">Amanhã ele roda sozinho.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[46ch] text-[19px]/[1.65] font-light text-[#EDEDED] [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_0_22px_rgba(0,0,0,0.85)] lg:mx-0">
              A Nodex Labs constrói chatbots, automações e sistemas sob medida,
              integrados ao processo que você já opera.
            </p>
            <div className="pointer-events-auto mt-11 flex flex-wrap justify-center gap-[14px] lg:justify-start">
              <Link href="#contato" className="nx-btn nx-btn-pill">
                Fale com a Nodex →
              </Link>
              <Link href="/solucoes" className="nx-btn-ghost nx-btn-ghost-pill">
                Ver soluções
              </Link>
            </div>
            <p className="mt-11 hidden font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-[#D0D0D0] [text-shadow:0_1px_10px_rgba(0,0,0,0.95),0_0_20px_rgba(0,0,0,0.9)] lg:block">
              DO DIAGNÓSTICO AO SISTEMA EM PRODUÇÃO.
            </p>
          </div>
        </div>
        <div className="relative z-0 col-start-1 row-start-2 mx-auto mt-5 aspect-[350/228] w-[min(86vw,380px)] lg:pointer-events-auto lg:row-start-1 lg:mx-0 lg:mt-0 lg:aspect-auto lg:h-full lg:min-h-[720px] lg:w-full lg:max-w-none">
          <HeroForceField />
        </div>
        <p className="relative z-10 col-start-1 row-start-3 mx-auto mt-5 mb-12 w-full max-w-[36rem] px-5 text-center font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-[#D0D0D0] [text-shadow:0_1px_10px_rgba(0,0,0,0.95),0_0_20px_rgba(0,0,0,0.9)] lg:hidden">
          DO DIAGNÓSTICO AO SISTEMA EM PRODUÇÃO.
        </p>
      </section>

      <section className="relative overflow-hidden border-t border-nx-border-soft">
        <div
          aria-hidden
          data-nx-anim="glow"
          className="pointer-events-none absolute inset-x-0 top-[42%] h-[420px] -translate-y-1/2 [animation:nx-drift_13s_ease-in-out_infinite] [background:radial-gradient(ellipse_at_50%_50%,rgba(225,6,0,.16),transparent_62%)]"
        />
        <div className="relative mx-auto max-w-[1280px] px-5 py-24 md:px-8 lg:px-12">
          <SectionHead
            eyebrow="O QUE TRAVA A OPERAÇÃO?"
            eyebrowTone="red"
            title={
              <span className="block max-w-[16ch]">
                Os 3 principais erros
              </span>
            }
            className="mb-14"
          />
          <ProblemRail items={PROBLEMS} />
        </div>
      </section>

      <Section>
        <StepList
          intro={
            <SectionHead
              eyebrow="COMO TRABALHAMOS"
              eyebrowTone="red"
              title="As 4 etapas fundamentais"
              lead="Do diagnóstico ao sistema em produção!"
              className="mb-8 md:mb-11"
            />
          }
          steps={PROCESS}
          mobileCycleMs={7000}
        />
      </Section>

      <Section className="overflow-x-clip">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-nx-border-warm bg-[#0B0505] px-[18px] py-3 font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-red-hover">
            EM PRODUÇÃO
          </span>
          <h2 className="nx-h2 mt-[26px] mb-0">
            Sistemas que já rodam de verdade.
          </h2>
        </div>
        <CaseCoverflow items={CASES} />
      </Section>

      <CtaForm
        title={
          <>
            Você já sabe onde trava.{" "}
            <span className="text-nx-red">A gente te mostra como destravar.</span>
          </>
        }
        lead={
          <>
            <span className="lg:hidden">
              Preencha o formulário abaixo agora mesmo!
            </span>
            <span className="hidden lg:inline">
              Preencha o formulário agora mesmo!
            </span>
          </>
        }
      />

      <FaqSection items={FAQ} />
    </>
  );
}
