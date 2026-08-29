import type { Metadata } from "next";
import Link from "next/link";

import { CtaForm } from "@/components/cta-block";
import {
  MarkBase,
  MarkChat,
  MarkRepeat,
} from "@/components/chatbot-marks";
import { FaqSection, type FaqItem } from "@/components/faq";
import { StepList, type Step } from "@/components/step-track";
import { HeroBackdrop, HeroPill, Section, SectionHead } from "@/components/ui";
import { WaLink } from "@/components/wa-link";

export const metadata: Metadata = {
  title: "Chatbots",
  description:
    "Chatbot que responde com a sua base, no canal do cliente, e passa para humano sem fazer a pessoa repetir.",
};

const AUDIENCE = [
  {
    label: "WhatsApp",
    text: "Empresa que atende pelo WhatsApp e perde recado.",
    Icon: MarkChat,
  },
  {
    label: "Pergunta repetida",
    text: "Time que responde catálogo, prazo e status o dia todo.",
    Icon: MarkRepeat,
  },
  {
    label: "Base própria",
    text: "Operação que já tem FAQ e precisa que o bot use isso, não chute.",
    Icon: MarkBase,
  },
];

const CAPABILITIES = [
  {
    title: "Vários canais, um cérebro",
    text: "Site, app e WhatsApp. A lógica não se reconstrói por canal.",
  },
  {
    title: "Resposta na sua base",
    text: "Lê help, produto e regra interna. Se não souber, admite e encaminha.",
  },
  {
    title: "Puxa dado da conversa",
    text: "Pedido, data, plano, CPF quando a regra pedir. Segue o fluxo, não só o papo.",
  },
  {
    title: "Handoff com contexto",
    text: "O atendente recebe histórico, intenção e o que já foi resolvido.",
  },
];

/** WhatsApp em primeiro lugar: é o canal principal do público brasileiro. */
const CHANNELS = [
  { name: "WhatsApp", note: "CANAL PRINCIPAL NO BRASIL", primary: true },
  { name: "Site", note: "WIDGET OU PÁGINA INTEIRA", primary: false },
  { name: "App", note: "DENTRO DO PRODUTO QUE VOCÊ JÁ TEM", primary: false },
];

const LAUNCH: Step[] = [
  { text: "Vocês mandam o material: FAQ, produto, conversas de exemplo." },
  { text: "Montamos o cérebro e apontamos os furos de conteúdo." },
  { text: "Teste em canal real. Ajuste. Produção." },
];

const FAQ: FaqItem[] = [
  {
    question: "O que vocês precisam da gente para começar?",
    answer:
      "FAQ, páginas de produto ou um pacote de conversas reais. Com isso dá para achar o buraco e o que o bot ainda não pode responder.",
  },
  {
    question: "E se o bot errar?",
    answer: "Ele encaminha. Não inventamos política de empresa.",
  },
  {
    question: "Os dados do cliente ficam onde?",
    answer:
      "No ambiente combinado no contrato. Sem treinar modelo público com conversa de cliente, a menos que isso esteja explícito.",
  },
  {
    question: "Vocês acompanham depois do ar?",
    answer:
      "Sim. Ajuste de resposta, novos assuntos, canais. Combinado no plano, não como surpresa.",
  },
];

export default function ChatbotsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop glowAt="20%" />
        <div className="relative mx-auto max-w-[1280px] px-5 pt-28 pb-28 text-center md:px-8 md:pt-35 lg:px-12">
          <span className="nx-label tracking-[0.22em]">SOLUÇÕES · CHATBOTS</span>
          <div className="mt-[22px] flex justify-center">
            <HeroPill>CHATBOT SOB MEDIDA</HeroPill>
          </div>
          <h1 className="nx-h1 mx-auto mt-8 max-w-[20ch]">
            Chatbot que conhece{" "}
            <span className="text-nx-red">o seu negócio.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[58ch] text-[19px]/[1.65] font-light text-nx-muted">
            Responde com a sua base, no canal do cliente, e passa para humano sem
            fazer a pessoa repetir.
          </p>
          <div className="mt-11 flex flex-wrap justify-center gap-[14px]">
            <WaLink className="nx-btn nx-btn-pill">Fale com a Nodex →</WaLink>
            <Link
              href="/cases/cleanox"
              className="nx-btn-ghost nx-btn-ghost-pill"
            >
              Ver um case
            </Link>
          </div>
          <p className="mt-11 font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-dim">
            SITE · WHATSAPP · APP. UM CÉREBRO SÓ.
          </p>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="PARA QUEM"
          title="Se a conversa virou gargalo"
          lead="Três situações em que o chatbot devolve horas para o time, sem gerar trabalho novo."
          className="mb-11"
        />
        <div className="grid grid-cols-1 divide-y divide-nx-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {AUDIENCE.map((item) => (
            <div
              key={item.label}
              className="flex gap-5 py-8 first:pt-0 last:pb-0 md:flex-col md:px-8 md:py-0 md:first:pl-0 md:last:pr-0"
            >
              <item.Icon className="h-14 w-14 shrink-0 md:h-16 md:w-16" />
              <div>
                <p className="mb-2 font-display text-[20px]/[1.3] font-medium text-white">
                  {item.label}
                </p>
                <p className="text-[16px]/[1.6] font-light text-nx-muted md:text-[17px]/[1.6]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="CAPACIDADES"
          eyebrowTone="red"
          title="Feito para conversa de cliente de verdade"
          lead="Cada chatbot que entregamos sabe buscar na sua base, extrair dado e escalar sem drama."
          className="mb-12"
        />
        <ol className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
          {CAPABILITIES.map((item, index) => (
            <li key={item.title} className="relative pl-[72px]">
              <span
                aria-hidden
                className="absolute top-[-8px] left-0 font-display text-[44px]/[1] font-light text-nx-red"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mb-3 font-display text-[20px]/[1.3] font-medium text-white">
                {item.title}
              </p>
              <p className="nx-body max-w-[42ch]">{item.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHead
          eyebrow="CANAIS"
          title="Um chatbot, os canais que o cliente já usa"
          lead="O mesmo cérebro treinado nas superfícies onde a conversa acontece, sem reescrever por canal."
          className="mb-12"
        />
        <ul className="border-t border-nx-border">
          {CHANNELS.map((channel) => (
            <li
              key={channel.name}
              className="flex flex-col gap-2 border-b border-nx-border py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <p
                className={`font-display font-medium tracking-[-0.02em] ${
                  channel.primary
                    ? "text-[32px]/[1.1] text-white md:text-[40px]/[1.1]"
                    : "text-[22px]/[1.2] text-nx-text-2"
                }`}
              >
                {channel.name}
              </p>
              <p
                className={`font-mono text-[12px]/[1] font-medium tracking-[0.18em] ${
                  channel.primary ? "text-nx-red" : "text-nx-dim"
                }`}
              >
                {channel.note}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead
          eyebrow="COMO ENTRA NO AR"
          title="Três passos até o canal real"
          lead="Nada de piloto eterno: o teste já acontece no canal onde o cliente fala."
          className="mb-10"
        />
        <StepList steps={LAUNCH} />
      </Section>

      <CtaForm
        title="Vamos montar o seu chatbot"
        lead="Manda o FAQ e um exemplo de conversa. A gente devolve um plano."
        leadClassName="max-w-[48ch]"
      />

      <FaqSection items={FAQ} />
    </>
  );
}
