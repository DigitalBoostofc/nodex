"use client";

import { useState } from "react";

const SERVICES = [
  { value: "sistemas", label: "Sistemas" },
  { value: "chatbots", label: "Chatbots" },
  { value: "automacoes", label: "Automações" },
  { value: "site", label: "Site institucional" },
  { value: "landing", label: "Landing page" },
  { value: "aplicativos", label: "Aplicativos" },
  { value: "saas", label: "SaaS" },
  { value: "infraestrutura", label: "Infraestrutura" },
  { value: "naosei", label: "Ainda não sei" },
] as const;

const BUDGETS = [
  { value: "indefinido", label: "Não tenho valor definido" },
  { value: "ate-2500", label: "Até R$ 2.500" },
  { value: "2500-5000", label: "R$ 2.500 a R$ 5.000" },
  { value: "5000-10000", label: "R$ 5.000 a R$ 10.000" },
  { value: "10-25", label: "R$ 10.000 a R$ 25.000" },
  { value: "25-50", label: "R$ 25.000 a R$ 50.000" },
  { value: "50-100", label: "R$ 50.000 a R$ 100.000" },
  { value: "acima-100", label: "Acima de R$ 100.000" },
] as const;

type Status = "editing" | "sending" | "sent" | "error";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

/**
 * Formulário de contato.
 *
 * Campos alinhados ao briefing de captura: nome, empresa, e-mail, WhatsApp,
 * serviço, investimento e mensagem.
 */
export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("editing");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        body: data,
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-[14px] py-5">
        <span className="nx-label-red text-[11px]">RECEBIDO</span>
        <p className="max-w-[30ch] font-display text-[24px]/[1.4] font-light text-white">
          Obrigado. Voltamos em um dia útil.
        </p>
        <p className="nx-body">Sem sequência de e-mail. Resposta humana.</p>
        <button
          type="button"
          onClick={() => setStatus("editing")}
          className="mt-2 cursor-pointer text-left text-[14px]/[1] font-medium text-nx-red hover:text-white"
        >
          Enviar outra mensagem →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      <Field label="NOME">
        <input
          type="text"
          name="nome"
          required
          autoComplete="name"
          placeholder="Digite seu nome"
          className="nx-input"
        />
      </Field>

      <Field label="EMPRESA">
        <input
          type="text"
          name="empresa"
          required
          autoComplete="organization"
          placeholder="Digite o nome da empresa"
          className="nx-input"
        />
      </Field>

      <Field label="E-MAIL">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Informe um e-mail válido para contato"
          className="nx-input"
        />
      </Field>

      <Field label="WHATSAPP">
        <input
          type="tel"
          name="whatsapp"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="Digite seu WhatsApp"
          className="nx-input"
        />
      </Field>

      <Field label="SERVIÇO">
        <select name="servico" required defaultValue="" className="nx-input nx-select">
          <option value="" disabled>
            Selecione o serviço
          </option>
          {SERVICES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="QUANTO PRETENDE INVESTIR?">
        <select
          name="investimento"
          required
          defaultValue=""
          className="nx-input nx-select"
        >
          <option value="" disabled>
            Selecione uma faixa
          </option>
          {BUDGETS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="MENSAGEM">
        <textarea
          name="mensagem"
          rows={compact ? 3 : 4}
          required
          placeholder="Descreva seu projeto e o que precisa ser feito"
          className="nx-input resize-none"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="nx-btn mt-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar mensagem"}
      </button>

      {status === "error" ? (
        <p
          role="alert"
          className="text-[14px]/[1.5] font-light text-nx-red-hover"
        >
          Não conseguimos enviar agora. Tente de novo.
        </p>
      ) : null}

      <p className="text-[13px]/[1.5] font-light text-nx-dim">
        Sem sequência de e-mail. Resposta humana.
      </p>
    </form>
  );
}
