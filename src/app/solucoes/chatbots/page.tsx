import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaForm } from "@/components/cta-block";
import { FaqSection, type FaqItem } from "@/components/faq";
import { StepList, type Step } from "@/components/step-track";
import { HeroBackdrop, HeroPill, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Chatbots",
  description:
    "Chatbot que responde com a sua base, no canal do cliente, e passa para humano sem fazer a pessoa repetir.",
};

const AUDIENCE = [
  {
    name: "WhatsApp",
    note: "EMPRESA QUE ATENDE E PERDE RECADO",
    primary: true,
  },
  {
    name: "Pergunta repetida",
    note: "CATÁLOGO, PRAZO E STATUS O DIA TODO",
    primary: false,
  },
  {
    name: "Base própria",
    note: "FAQ QUE O BOT USA, NÃO CHUTA",
    primary: false,
  },
];

const CAPABILITIES = [
  {
    kicker: "UM CÉREBRO",
    title: "Vários canais, um cérebro",
    text: "Site, app e WhatsApp. A lógica não se reconstrói por canal.",
    image: "/assets/chatbots/channels.webp",
  },
  {
    kicker: "NA SUA BASE",
    title: "Resposta na sua base",
    text: "Lê help, produto e regra interna. Se não souber, admite e encaminha.",
    image: "/assets/chatbots/base.webp",
  },
  {
    kicker: "DADO DA CONVERSA",
    title: "Puxa dado da conversa",
    text: "Pedido, data, plano, CPF quando a regra pedir. Segue o fluxo, não só o papo.",
    image: "/assets/chatbots/extract.webp",
  },
  {
    kicker: "PARA HUMANO",
    title: "Handoff com contexto",
    text: "O atendente recebe histórico, intenção e o que já foi resolvido.",
    image: "/assets/chatbots/handoff.webp",
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {AUDIENCE.map((item) => (
            <div
              key={item.name}
              className={
                item.primary
                  ? "rounded-[14px] border border-nx-border-warm bg-nx-surface p-[30px]"
                  : "nx-card nx-card-hover p-[30px]"
              }
            >
              <p className="mb-[10px] font-display text-[20px]/[1.3] font-medium text-white">
                {item.name}
              </p>
              <p
                className={`font-mono text-[13px]/[1.6] ${
                  item.primary ? "text-nx-red" : "text-nx-muted"
                }`}
              >
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden border-t border-nx-border-soft">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_50%_50%,#000_28%,transparent_78%)]"
        >
          <div
            data-nx-anim="grid"
            className="absolute -inset-x-10 -inset-y-20 opacity-40 [animation:nx-grid_8s_linear_infinite] [background-image:linear-gradient(#242424_1px,transparent_1px),linear-gradient(90deg,#242424_1px,transparent_1px)] [background-size:64px_64px]"
          />
          <div
            data-nx-anim="glow"
            className="absolute inset-x-0 top-1/2 h-[520px] -translate-y-1/2 [animation:nx-drift_13s_ease-in-out_infinite] [background:radial-gradient(ellipse_at_50%_50%,rgba(225,6,0,.22),transparent_62%)]"
          />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5 py-24 md:px-8 lg:px-12">
          <SectionHead
            eyebrow="CAPACIDADES"
            eyebrowTone="red"
            title="Feito para conversa de cliente de verdade"
            lead="Cada chatbot que entregamos sabe buscar na sua base, extrair dado e escalar sem drama."
            className="mb-14"
          />
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute top-12 bottom-12 left-1/2 hidden w-px -translate-x-1/2 overflow-hidden bg-nx-border md:block"
            >
              <span
                data-nx-anim="flow"
                className="absolute inset-x-0 h-36 [animation:nx-flow-y_4.8s_linear_infinite] [background:linear-gradient(180deg,transparent,rgba(225,6,0,.95),transparent)]"
              />
            </div>
            <ol>
              {CAPABILITIES.map((item, index) => {
              const flip = index % 2 === 1;

              return (
                <li
                  key={item.title}
                  className="group relative grid items-center gap-6 py-8 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] md:gap-0 md:py-10"
                >
                  <figure
                    className={`relative mx-auto w-[min(100%,220px)] md:w-[min(100%,360px)] ${
                      flip ? "md:col-start-3 md:row-start-1" : "md:col-start-1"
                    }`}
                  >
                    <span
                      aria-hidden
                      data-nx-anim="halo"
                      className="absolute inset-[22%] rounded-full bg-nx-red/35 blur-3xl transition-opacity duration-500 [animation:nx-halo_3.4s_ease-in-out_infinite] group-hover:opacity-100"
                      style={{ animationDelay: `${index * 0.55}s` }}
                    />
                    <div
                      data-nx-anim="float"
                      className="relative [animation:nx-float_5.6s_ease-in-out_infinite] [mask-image:radial-gradient(circle_at_center,#000_66%,transparent_84%)] [-webkit-mask-image:radial-gradient(circle_at_center,#000_66%,transparent_84%)]"
                      style={{ animationDelay: `${index * 0.7}s` }}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        width={800}
                        height={800}
                        unoptimized
                        loading="eager"
                        className="relative h-auto w-full transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.05]"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      >
                        <span
                          data-nx-anim="sweep"
                          className="absolute inset-y-0 w-1/3 [animation:nx-sweep_2s_ease-in-out_infinite] [background:linear-gradient(90deg,transparent,rgba(255,20,32,.2),transparent)]"
                        />
                      </span>
                    </div>
                  </figure>

                  <div
                    aria-hidden
                    className="relative hidden h-full items-center justify-center md:flex md:col-start-2 md:row-start-1"
                  >
                    <span
                      data-nx-anim="dot"
                      className="relative z-[1] size-[11px] rounded-full bg-nx-red [animation:nx-pulse_2.4s_ease-in-out_infinite] [box-shadow:0_0_0_4px_rgba(225,6,0,.18)]"
                      style={{ animationDelay: `${index * 0.4}s` }}
                    />
                  </div>

                  <div
                    className={`max-md:text-center ${
                      flip
                        ? "md:col-start-1 md:row-start-1 md:pr-10 md:text-right"
                        : "md:col-start-3 md:pl-10"
                    }`}
                  >
                    <p className="nx-label-red">{item.kicker}</p>
                    <p className="mt-4 mb-3 font-display text-[26px]/[1.2] font-medium tracking-[-0.02em] text-white md:text-[28px]/[1.2]">
                      {item.title}
                    </p>
                    <p
                      className={`nx-body mx-auto max-w-[42ch] ${
                        flip ? "md:ml-auto md:mr-0" : "md:mx-0"
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>
                </li>
              );
              })}
            </ol>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="CANAIS"
          title="Um chatbot, os canais que o cliente já usa"
          lead="O mesmo cérebro treinado nas superfícies onde a conversa acontece, sem reescrever por canal."
          className="mb-12"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {CHANNELS.map((channel) => (
            <div
              key={channel.name}
              className={
                channel.primary
                  ? "rounded-[14px] border border-nx-border-warm bg-nx-surface p-[30px]"
                  : "nx-card nx-card-hover p-[30px]"
              }
            >
              <p className="mb-[10px] font-display text-[20px]/[1.3] font-medium text-white">
                {channel.name}
              </p>
              <p
                className={`font-mono text-[13px]/[1.6] ${
                  channel.primary ? "text-nx-red" : "text-nx-muted"
                }`}
              >
                {channel.note}
              </p>
            </div>
          ))}
        </div>
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
