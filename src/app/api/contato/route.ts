import { NextResponse } from "next/server";

const N8N_CONTATO_WEBHOOK =
  process.env.N8N_CONTATO_WEBHOOK_URL?.trim() ||
  "https://n8n.envsync.com.br/webhook/nodex-contato";

/**
 * Recebe o formulário e manda a ficha para o n8n (grupo Nodex + confirmação
 * no WhatsApp do lead, instância da Mari).
 */
export async function POST(request: Request) {
  const form = await request.formData();

  const nome = String(form.get("nome") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const whatsapp = String(form.get("whatsapp") ?? "").trim();
  const servico = String(form.get("servico") ?? "").trim();
  const investimento = String(form.get("investimento") ?? "").trim();
  const mensagem = String(form.get("mensagem") ?? "").trim();
  const empresa = String(form.get("empresa") ?? "").trim();

  if (
    !nome ||
    !empresa ||
    !email ||
    !whatsapp ||
    !servico ||
    !investimento ||
    !mensagem
  ) {
    return NextResponse.json(
      { error: "Preencha todos os campos." },
      { status: 400 },
    );
  }

  const payload = {
    nome,
    email,
    whatsapp,
    empresa,
    servico,
    investimento,
    mensagem,
  };

  console.info("[contato] nova mensagem", payload);

  try {
    const response = await fetch(N8N_CONTATO_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        email,
        whatsapp,
        empresa,
        servico,
        investimento,
        mensagem,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      console.error("[contato] n8n webhook falhou", response.status);
      return NextResponse.json(
        { error: "Não conseguimos enviar agora. Tente de novo." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contato] n8n webhook erro", error);
    return NextResponse.json(
      { error: "Não conseguimos enviar agora. Tente de novo." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
