import type { Metadata } from "next";
import Image from "next/image";

import { CtaButtons } from "@/components/cta-buttons";
import { HistoryTrack, type Chapter } from "@/components/history-track";
import { HeroBackdrop, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Engenharia de software e automações. Quase três anos entregando sistemas, automações e chatbots em produção.",
};

const CHAPTERS: Chapter[] = [
  {
    label: "01 · A BASE TÉCNICA",
    title: "Dez anos construindo software",
    text: "Dennis Fernandes se formou em Ciência da Computação há dez anos e passou a década desenvolvendo ferramentas e sistemas para empresas, como contratado em grandes projetos.",
  },
  {
    label: "02 · A WENOX",
    title: "Uma lacuna no mercado local",
    text: "Faltava na região quem cuidasse de site e posicionamento digital com seriedade. Daí nasceu a Wenox, agência de marketing que assumiu essa frente.",
  },
  {
    label: "03 · A PARCERIA",
    title: "O braço de desenvolvimento",
    text: "Nessa jornada entrou Leonardo Groff, com a proposta de criar um braço focado só em desenvolvimento de sistemas, usando o posicionamento da Wenox para levar sistemas, automações e chatbots à base de clientes que já existia.",
  },
  {
    label: "04 · HOJE",
    title: "Quase três anos de operação",
    text: "A parceria deu certo. Há quase três anos a Nodex Labs está posicionada no mercado entregando sistemas, automações e chatbots que seguem rodando em produção.",
    warm: true,
  },
];

const PILLARS = [
  {
    title: "Tecnologia",
    text: "Stack atual, arquitetura que outro time consegue manter.",
  },
  {
    title: "Estratégia",
    text: "Antes de construir, decidimos o que não vale construir.",
  },
  {
    title: "Performance",
    text: "Entrega medida por indicador de negócio, não por tela bonita.",
  },
  {
    title: "Confiança",
    text: "Prazo, escopo e limite ditos na primeira reunião.",
  },
];

const TEAM = [
  { name: "Leonardo Groff", role: "CEO", photo: "leonardo-groff" },
  { name: "Georgia Carine", role: "CTO", photo: "georgia-carine" },
  { name: "Leonardo Falcão", role: "HEAD DE IA", photo: "leonardo-falcao" },
  {
    name: "Dennis Fernandes",
    role: "ENGENHEIRO DE SOFTWARE SÊNIOR",
    photo: "dennis-fernandes",
  },
  { name: "Davi Azevedo", role: "DIRETOR DE DESIGN", photo: "davi-azevedo" },
  {
    name: "Paula Rodrigues",
    role: "DIRETORA COMERCIAL",
    photo: "paula-rodrigues",
  },
];

export default function SobrePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop glowAt="30%" />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-12 px-5 pt-28 pb-24 md:px-8 lg:px-12">
          <div>
            <span className="nx-label">SOBRE</span>
            <p className="nx-label-red mt-[18px] text-[13px]">NODEX LABS</p>
            <h1 className="nx-h1-sub mt-[22px] max-w-[22ch]">
              Engenharia de software e automações.
            </h1>
            <p className="nx-body-l mt-6 max-w-[52ch]">
              Nascemos dentro de uma agência, como o braço de desenvolvimento que
              os clientes pediam. Quase três anos depois, somos o time que
              entrega sistemas, automações e chatbots em produção.
            </p>
          </div>
          <Image
            src="/assets/symbol-on-black.png"
            alt=""
            aria-hidden
            width={520}
            height={520}
            className="pointer-events-none block h-auto w-full max-w-[520px] justify-self-end opacity-90 mix-blend-screen"
          />
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="NOSSA HISTÓRIA"
          title={
            <span className="block max-w-[26ch]">
              De projeto contratado a time de produto
            </span>
          }
          lead="Como a Nodex Labs chegou até aqui, em quatro capítulos."
          className="mb-10"
        />
        <HistoryTrack chapters={CHAPTERS} />

        <SectionHead
          eyebrow="O QUE NOS MOVE"
          eyebrowTone="red"
          title="Propósito, missão e visão"
          lead="Três frases que decidem o que aceitamos construir."
          className="mb-12"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          <div className="nx-card-warm p-8">
            <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-red">
              PROPÓSITO
            </span>
            <p className="mt-[18px] font-display text-[21px]/[1.45] font-light text-white">
              Criar e aperfeiçoar sistemas e processos em empresas que hoje
              gastam esforço desnecessário para funcionar.
            </p>
          </div>
          <div className="nx-card nx-card-hover p-8">
            <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-muted">
              MISSÃO
            </span>
            <p className="mt-[18px] text-[17px]/[1.65] font-light text-nx-text-2">
              Aplicar engenharia de software séria, com arquitetura, código
              revisado e testes, para reduzir custo, tempo e erro humano nas
              operações que atendemos. A IA entra onde comprovadamente resolve,
              nunca como enfeite.
            </p>
          </div>
          <div className="nx-card nx-card-hover p-8">
            <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-muted">
              VISÃO
            </span>
            <p className="mt-[18px] text-[17px]/[1.65] font-light text-nx-text-2">
              Ser a empresa de desenvolvimento que as operações brasileiras
              procuram quando o software precisa funcionar de verdade.
            </p>
          </div>
        </div>
        <p className="nx-quote mt-11 max-w-[52ch] pl-5 font-display text-[26px]/[1.45] font-light text-white">
          Para empresas que já sabem o que querem automatizar e precisam de quem
          saiba como fazer.
        </p>
      </Section>

      <Section>
        <SectionHead
          eyebrow="PILARES"
          title="Como decidimos e entregamos"
          lead="Quatro critérios que valem em todo projeto, do escopo à operação."
          className="mb-11"
        />
        <div className="nx-grid-hairline grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="p-[30px]">
              <div aria-hidden className="mb-5 h-[3px] w-[26px] bg-nx-red" />
              <p className="mb-[10px] font-display text-[19px]/[1.3] font-medium text-white">
                {pillar.title}
              </p>
              <p className="text-[16px]/[1.6] font-light text-nx-muted">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <section className="border-t border-nx-border-soft">
        <div className="mx-auto max-w-[1280px] px-5 py-28 text-center md:px-8 lg:px-12">
          <span className="nx-label">LIDERANÇA</span>
          <h2 className="nx-h2 mt-5 mb-4">
            Conheça a <span className="text-nx-red">equipe</span>
          </h2>
          <p className="nx-body-l mx-auto mb-14 max-w-[56ch]">
            As pessoas que assinam o escopo, o código e a entrega.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((person) => (
              <div key={person.name} className="nx-card nx-card-hover p-9">
                <Image
                  src={`/assets/team/${person.photo}.webp`}
                  alt={person.name}
                  width={132}
                  height={132}
                  className="mx-auto mb-6 h-[132px] w-[132px] rounded-full object-cover"
                />
                <p className="mb-2 font-display text-[20px]/[1.3] font-medium text-white">
                  {person.name}
                </p>
                <p className="font-mono text-[11px]/[1] font-medium tracking-[0.18em] text-nx-red">
                  {person.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaButtons
        title="Se o problema já está claro, a próxima conversa é de escopo."
        secondaryHref="/cases"
        secondaryLabel="Ver cases"
      />
    </>
  );
}
