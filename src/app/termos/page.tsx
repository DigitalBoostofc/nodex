import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalArticle,
  LegalBody,
  LegalBullet,
  LegalHeader,
  LegalText,
} from "@/components/legal";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Regras de uso deste site e do canal de contato da Nodex Labs.",
};

const ALLOWED = [
  "Navegar, ler e compartilhar o conteúdo com atribuição à Nodex Labs.",
  "Enviar informações verdadeiras pelos formulários e canais de contato.",
  "É vedado extrair dados em massa, tentar acesso não autorizado, interferir na disponibilidade do site ou usar o conteúdo para fins ilícitos.",
];

export default function TermosPage() {
  return (
    <>
      <LegalHeader
        badge="CONDIÇÕES DE USO"
        title="Termos de Uso"
        lead="Regras de uso deste site e do canal de contato da Nodex Labs. Ao navegar ou enviar uma mensagem, você concorda com estas condições."
        updatedAt="28/08/2026"
      />

      <LegalBody>
        <LegalArticle label="01 · OBJETO" title="O que este site é">
          <LegalText>
            Este site apresenta os serviços da Nodex Labs, ou seja,
            desenvolvimento de chatbots, automações e sistemas com inteligência
            artificial, e serve como canal de contato comercial. O conteúdo é
            informativo e não constitui proposta, orçamento ou obrigação de
            contratar.
          </LegalText>
        </LegalArticle>

        <LegalArticle label="02 · USO PERMITIDO" title="Como você pode usar">
          <div className="flex flex-col gap-[14px]">
            {ALLOWED.map((line) => (
              <LegalBullet key={line}>{line}</LegalBullet>
            ))}
          </div>
        </LegalArticle>

        <LegalArticle
          label="03 · PROPRIEDADE INTELECTUAL"
          title="Marca e conteúdo"
        >
          <LegalText>
            Marca, logotipo, textos, layout e materiais deste site pertencem à
            Nodex Labs. Nos projetos contratados, a titularidade do código é
            definida em contrato: propriedade total do cliente ou licença de uso,
            conforme o escopo acordado antes do início do desenvolvimento.
          </LegalText>
        </LegalArticle>

        <LegalArticle
          label="04 · CONTATO E PROPOSTAS"
          title="Formulário e WhatsApp"
        >
          <LegalText>
            O envio de mensagem não gera vínculo contratual. Prazos, escopo e
            valores só valem quando formalizados em proposta assinada. Ao acionar
            o botão de WhatsApp, você é direcionado ao aplicativo, cujo uso está
            sujeito aos termos do próprio provedor.
          </LegalText>
        </LegalArticle>

        <LegalArticle label="05 · SOLUÇÕES COM IA" title="Limites do uso de IA">
          <LegalText>
            Sistemas com inteligência artificial podem produzir resultados
            imprecisos. Nos projetos que entregamos, definimos com o cliente os
            pontos de revisão humana, os limites de decisão automatizada e o
            registro de auditoria, em linha com o direito à revisão previsto no
            art. 20 da LGPD.
          </LegalText>
        </LegalArticle>

        <LegalArticle
          label="06 · DISPONIBILIDADE"
          title="Alterações e indisponibilidade"
        >
          <LegalText>
            Podemos alterar conteúdo, funcionalidades e estes termos a qualquer
            momento, publicando a nova versão nesta página. O site pode ficar
            indisponível por manutenção ou por falha de terceiros, sem que isso
            gere obrigação de indenizar.
          </LegalText>
        </LegalArticle>

        <LegalArticle label="07 · LEI E FORO" title="Legislação aplicável">
          <LegalText>
            Estes termos são regidos pela legislação brasileira, em especial o
            Marco Civil da Internet (Lei 12.965/2014), o Código de Defesa do
            Consumidor quando aplicável e a LGPD (Lei 13.709/2018). Fica eleito o
            foro do domicílio da Nodex Labs para dirimir controvérsias.
          </LegalText>
        </LegalArticle>

        <div className="nx-card p-[34px]">
          <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-muted">
            TRATAMENTO DE DADOS
          </span>
          <p className="mt-[18px] mb-[14px] max-w-[44ch] font-display text-[20px]/[1.5] font-light text-white">
            O uso de dados pessoais está detalhado na Política de Privacidade.
          </p>
          <Link
            href="/privacidade"
            className="inline-block py-3 text-[15px]/[1] font-medium text-nx-red hover:text-white"
          >
            Ler a Política de Privacidade →
          </Link>
        </div>
      </LegalBody>
    </>
  );
}
