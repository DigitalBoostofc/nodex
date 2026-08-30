import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { HeroBackdrop, Section } from "@/components/ui";
import { EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Conta o problema em poucas linhas. Voltamos em um dia útil com o próximo passo.",
};

const FAQ = [
  {
    question: "Preciso já ter o briefing pronto?",
    answer: "Não. Uma frase do problema basta para a primeira conversa.",
  },
  {
    question: "Vocês só fazem IA?",
    answer:
      "IA quando cabe. Sistema quando a operação pede software. Os dois no mesmo time.",
  },
  {
    question: "Atendem empresa fora do Brasil?",
    answer:
      "Sim, em português ou inglês. O projeto roda remoto, com reuniões no fuso combinado no início.",
  },
];

export default function ContatoPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop glowAt="30%" glowStrength={0.3} />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-14 px-5 pt-28 pb-24 md:px-8 lg:px-12">
          <div>
            <span className="nx-label">CONTATO</span>
            <p className="nx-label-red mt-[18px] text-[13px]">
              PRIMEIRA CONVERSA
            </p>
            <h1 className="nx-h1-sub mt-[22px]">Fale com a Nodex.</h1>
            <p className="nx-body-l mt-6 mb-10 max-w-[52ch]">
              Conta o problema em poucas linhas. Voltamos em um dia útil com o
              próximo passo, ou com a pergunta que falta.
            </p>
            <div className="flex flex-col gap-[14px] border-t border-nx-border pt-8">
              <span className="font-mono text-[14px]/[1.5] text-nx-muted">
                E-MAIL ·{" "}
                <a href={`mailto:${EMAIL}`} className="text-nx-red">
                  {EMAIL}
                </a>
              </span>
              <span className="font-mono text-[14px]/[1.5] text-nx-muted">
                ATENDIMENTO ·{" "}
                <span className="text-nx-red">TODO O BRASIL, REMOTO</span>
              </span>
            </div>
          </div>
          <div className="nx-card nx-card-hover p-[34px]">
            <ContactForm />
          </div>
        </div>
      </section>

      <Section>
        <span className="nx-label">FAQ</span>
        <h2 className="nx-h2 mt-5 mb-11">Perguntas, respondidas</h2>
        <div className="border-t border-nx-border">
          {FAQ.map((item) => (
            <div
              key={item.question}
              className="border-b border-nx-border py-7"
            >
              <p className="mb-3 font-display text-[19px]/[1.4] font-medium text-white">
                {item.question}
              </p>
              <p className="max-w-[74ch] text-[17px]/[1.65] font-light text-nx-muted">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
