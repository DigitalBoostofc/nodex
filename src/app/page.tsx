import Image from "next/image";
import Link from "next/link";

import { CtaForm } from "@/components/cta-block";
import { FaqSection, type FaqItem } from "@/components/faq";
import { LazyHeroForceField as HeroForceField } from "@/components/lazy-hero-force-field";
import { ProblemRail } from "@/components/problem-rail";
import { StepList, type Step } from "@/components/step-track";
import { HeroBackdrop, HeroPill, Section, SectionHead } from "@/components/ui";
import { WaLink } from "@/components/wa-link";

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
    title: "Ferramenta pronta não cabe no seu jeito de vender",
    text: "CRM genérico, chatbot de template, automação que quebra no segundo desvio. Você se adapta ao software, e não o contrário.",
    image: "/assets/problems/tool.webp",
  },
];

const PROCESS: Step[] = [
  {
    title: "Diagnóstico",
    text: "Mapeamos o processo, o dado e o que conta como sucesso.",
    output: "escopo da menor entrega que já muda o dia.",
  },
  {
    title: "Desenho",
    text: "Arquitetura, telas e regras antes de escrever o que não precisa existir.",
    output: "plano fechado.",
  },
  {
    title: "Construção",
    text: "Código em produção, com teste e acompanhamento desde o primeiro dia.",
    output: "versão usável.",
  },
  {
    title: "Operação",
    text: "Medimos o efeito, ajustamos e deixamos o time no comando.",
    output: "sistema rodando, não um protótipo na gaveta.",
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
    question: "Fico dono do código?",
    answer:
      "Trabalhamos com propriedade total do código ou licença de uso, dependendo do escopo e do investimento. O modelo é escolhido com você e escrito em contrato antes da primeira linha. Nunca vira discussão na entrega.",
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
              <WaLink className="nx-btn nx-btn-pill">Fale com a Nodex →</WaLink>
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
              title="Do diagnóstico ao sistema em produção."
              lead="Sem mistério de escopo. Cada etapa tem saída visível."
              className="mb-8 px-5 md:mb-11 md:px-0"
            />
          }
          steps={PROCESS}
        />
      </Section>

      <Section>
        <SectionHead
          eyebrow="EM PRODUÇÃO"
          eyebrowTone="red"
          title="Sistemas que já rodam de verdade."
          lead="Não é deck. É operação."
          leadClassName=""
          className="mb-14"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
          <Link
            href="/cases/cleanox"
            className="nx-card nx-card-hover block p-[34px] hover:text-inherit"
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
            <p className="mb-[14px] font-display text-[30px]/[1.2] font-medium tracking-[-0.01em] text-white">
              Cleanox
            </p>
            <p className="mb-6 text-[17px]/[1.65] font-light text-nx-muted">
              Sistema de ordens de serviço, agenda, financeiro e app do
              profissional para higienização a domicílio.
            </p>
            <span className="text-[14px]/[1] font-medium text-nx-red">
              Ver o case →
            </span>
          </Link>

          <Link
            href="/cases"
            className="nx-card nx-card-hover block p-[34px] hover:text-inherit"
          >
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
            <p className="mb-[14px] font-display text-[30px]/[1.2] font-medium tracking-[-0.01em] text-white">
              AppexCRM
            </p>
            <p className="mb-6 text-[17px]/[1.65] font-light text-nx-muted">
              CRM sob medida para a operação comercial.
            </p>
            <span className="text-[14px]/[1] font-medium text-nx-red">
              Ver o case →
            </span>
          </Link>
        </div>
      </Section>

      <CtaForm
        title="Conte o problema. A gente responde com um plano."
        lead="Formulário curto. Retorno em um dia útil."
      />

      <FaqSection items={FAQ} />
    </>
  );
}
