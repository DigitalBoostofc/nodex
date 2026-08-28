import type { Metadata } from "next";

import {
  LegalArticle,
  LegalBody,
  LegalBullet,
  LegalHeader,
  LegalTable,
  LegalText,
} from "@/components/legal";
import { EMAIL, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Nodex Labs coleta, usa, armazena e protege dados pessoais.",
};

const LEGAL_BASES = [
  {
    term: "Responder contato comercial",
    definition:
      "Execução de contrato ou procedimentos preliminares (art. 7º, V).",
  },
  {
    term: "Envio de conteúdo e novidades",
    definition: "Consentimento (art. 7º, I), revogável a qualquer momento.",
  },
  {
    term: "Medição e melhoria do site",
    definition: "Legítimo interesse (art. 7º, IX), com dados minimizados.",
  },
  {
    term: "Obrigações fiscais e legais",
    definition:
      "Cumprimento de obrigação legal ou regulatória (art. 7º, II).",
  },
];

const RIGHTS = [
  "Confirmação e acesso aos dados",
  "Correção de dado incompleto ou desatualizado",
  "Anonimização, bloqueio ou eliminação",
  "Portabilidade a outro fornecedor",
  "Informação sobre compartilhamentos",
  "Revogação do consentimento",
];

export default function PrivacidadePage() {
  return (
    <>
      <LegalHeader
        badge="LGPD · LEI 13.709/2018"
        title="Política de Privacidade"
        lead="Como a Nodex Labs coleta, usa, armazena e protege dados pessoais neste site e nos projetos que executa."
        updatedAt="28/08/2026"
      />

      <LegalBody>
        <LegalArticle label="01 · CONTROLADOR" title="Quem trata os seus dados">
          <LegalText>
            A Nodex Labs é a controladora dos dados pessoais coletados neste
            site, nos termos do art. 5º, VI, da LGPD. Contato do encarregado de
            proteção de dados (DPO):{" "}
            <a href={`mailto:${EMAIL}`} className="text-nx-red-hover">
              {EMAIL}
            </a>
            .
          </LegalText>
        </LegalArticle>

        <LegalArticle label="02 · DADOS COLETADOS" title="O que coletamos">
          <div className="flex flex-col gap-[14px]">
            <LegalBullet>
              <span className="text-white">Dados que você informa:</span> nome,
              e-mail corporativo, empresa, telefone e a descrição do desafio
              enviada pelo formulário ou pelo WhatsApp.
            </LegalBullet>
            <LegalBullet>
              <span className="text-white">Dados de navegação:</span> endereço
              IP, tipo de dispositivo, navegador, páginas visitadas e origem do
              acesso, coletados por cookies e ferramentas de medição.
            </LegalBullet>
            <LegalBullet>
              <span className="text-white">Dados de projeto:</span> quando
              contratados, podemos tratar dados que estejam nos sistemas do
              cliente, sempre como operadores e nos limites do contrato.
            </LegalBullet>
          </div>
          <p className="mt-5 text-[17px]/[1.75] font-light text-nx-muted">
            Não solicitamos dados sensíveis nem dados de crianças e adolescentes
            por este site.
          </p>
        </LegalArticle>

        <LegalArticle
          label="03 · FINALIDADE E BASE LEGAL"
          title="Por que tratamos"
        >
          <LegalTable rows={LEGAL_BASES} />
        </LegalArticle>

        <LegalArticle
          label="04 · COMPARTILHAMENTO"
          title="Com quem compartilhamos"
        >
          <LegalText>
            Compartilhamos dados apenas com operadores necessários à prestação do
            serviço, como hospedagem, e-mail, ferramentas de mensageria,
            provedores de modelos de IA e sistemas de gestão, sempre sob contrato
            e instrução da Nodex Labs. Não vendemos dados pessoais. Conversas de
            clientes não são usadas para treinar modelos públicos, salvo
            autorização expressa e escrita.
          </LegalText>
        </LegalArticle>

        <LegalArticle
          label="05 · TRANSFERÊNCIA E RETENÇÃO"
          title="Onde ficam e por quanto tempo"
        >
          <LegalText>
            Parte dos provedores está fora do Brasil; nesses casos a
            transferência internacional segue as cláusulas e garantias previstas
            nos arts. 33 a 36 da LGPD.
          </LegalText>
          <p className="mt-4 text-[17px]/[1.75] font-light text-nx-muted">
            Dados de contato comercial são mantidos por até 24 meses após o
            último contato; dados contratuais e fiscais, pelos prazos legais
            aplicáveis. Depois disso são eliminados ou anonimizados.
          </p>
        </LegalArticle>

        <LegalArticle label="06 · SEGURANÇA" title="Como protegemos">
          <LegalText>
            Adotamos controle de acesso por perfil, criptografia em trânsito,
            segregação de ambientes, registro de operações e revisão periódica de
            permissões. Em caso de incidente com risco relevante, comunicamos os
            titulares e a ANPD nos prazos da lei.
          </LegalText>
        </LegalArticle>

        <LegalArticle label="07 · SEUS DIREITOS" title="O que você pode exigir">
          <div className="nx-grid-hairline grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
            {RIGHTS.map((right) => (
              <p
                key={right}
                className="p-6 text-[16px]/[1.6] font-light text-nx-text-2"
              >
                {right}
              </p>
            ))}
          </div>
          <p className="mt-5 text-[17px]/[1.75] font-light text-nx-muted">
            Para exercer qualquer direito, escreva para{" "}
            <a href={`mailto:${EMAIL}`} className="text-nx-red-hover">
              {EMAIL}
            </a>
            . Respondemos em até 15 dias.
          </p>
        </LegalArticle>

        <LegalArticle label="08 · COOKIES" title="Cookies e medição">
          <LegalText>
            Usamos cookies necessários ao funcionamento do site e, com o seu
            consentimento, cookies de medição e marketing. Você pode recusar ou
            apagar cookies nas configurações do navegador; recursos que dependem
            deles podem deixar de funcionar.
          </LegalText>
        </LegalArticle>

        <div className="nx-card-warm p-[34px]">
          <span className="font-mono text-[11px]/[1] font-medium tracking-[0.2em] text-nx-red">
            DÚVIDAS SOBRE PRIVACIDADE
          </span>
          <p className="mt-[18px] mb-[14px] max-w-[44ch] font-display text-[22px]/[1.45] font-light text-white">
            Fale direto com o nosso encarregado de dados.
          </p>
          <p className="font-mono text-[14px]/[1.9] text-nx-muted">
            E-MAIL ·{" "}
            <a href={`mailto:${EMAIL}`} className="text-nx-red">
              {EMAIL}
            </a>
            <br />
            WHATSAPP · <span className="text-nx-red">{PHONE_DISPLAY}</span>
          </p>
        </div>
      </LegalBody>
    </>
  );
}
