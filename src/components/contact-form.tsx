"use client";

import { useState } from "react";

const INTERESTS = [
  { value: "chatbot", label: "Chatbot" },
  { value: "automacao", label: "Automação" },
  { value: "sistema", label: "Sistema" },
  { value: "naosei", label: "Ainda não sei" },
] as const;

type Status = "editing" | "sending" | "sent" | "error";

/**
 * Formulário de contato.
 *
 * `compact` é a versão dos blocos de CTA: três campos, que é o teto que o
 * Brand Book §09 define para o CTA final. A versão completa, da página de
 * contato, acrescenta empresa e interesse.
 */
export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("editing");
  const [interest, setInterest] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const data = new FormData(event.currentTarget);
    if (interest) data.set("interesse", interest);

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
          onClick={() => {
            setStatus("editing");
            setInterest(null);
          }}
          className="mt-2 cursor-pointer text-left text-[14px]/[1] font-medium text-nx-red hover:text-white"
        >
          Enviar outra mensagem →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-muted">
          NOME
        </span>
        <input
          type="text"
          name="nome"
          required
          autoComplete="name"
          placeholder="Seu nome"
          className="nx-input"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-muted">
          E-MAIL
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="voce@empresa.com"
          className="nx-input"
        />
      </label>

      {compact ? null : (
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-muted">
            EMPRESA <span className="text-nx-dim">(OPCIONAL)</span>
          </span>
          <input
            type="text"
            name="empresa"
            autoComplete="organization"
            placeholder="Nome da empresa"
            className="nx-input"
          />
        </label>
      )}

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-muted">
          DESAFIO EM UMA FRASE
        </span>
        <textarea
          name="desafio"
          rows={3}
          required
          placeholder="Ex.: nosso atendimento não escala."
          className="nx-input resize-none"
        />
      </label>

      {compact ? null : (
        <div className="flex flex-col gap-[10px]">
          <span className="font-mono text-[12px]/[1] font-medium tracking-[0.16em] text-nx-muted">
            INTERESSE
          </span>
          <div className="flex flex-wrap gap-[10px]">
            {INTERESTS.map((option) => {
              const active = interest === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setInterest(active ? null : option.value)}
                  className={`cursor-pointer rounded-[4px] border px-[14px] py-[11px] font-mono text-[12px]/[1] font-medium tracking-[0.14em] uppercase transition-all duration-160 ${
                    active
                      ? "border-nx-red bg-nx-red text-white"
                      : "border-[#262626] bg-transparent text-nx-text-2"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
          Não conseguimos enviar agora. Tente de novo ou chame no WhatsApp.
        </p>
      ) : null}

      <p className="text-[13px]/[1.5] font-light text-nx-dim">
        Sem sequência de e-mail. Resposta humana.
      </p>
    </form>
  );
}
