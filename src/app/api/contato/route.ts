import { NextResponse } from "next/server";

/**
 * Recebe o formulário de contato.
 *
 * PENDENTE: hoje a mensagem só é registrada no log do servidor. O destino real
 * (e-mail para contato@nodexlabs.com.br, CRM ou webhook) ainda não foi
 * definido — enquanto não for, nenhum lead enviado por aqui chega a ninguém.
 * O canvas de design também não define o destino: lá o submit só troca o
 * estado da tela.
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

  if (!nome || !email || !whatsapp || !servico || !investimento || !mensagem) {
    return NextResponse.json(
      { error: "Preencha nome, e-mail, WhatsApp, serviço, investimento e mensagem." },
      { status: 400 },
    );
  }

  console.info("[contato] nova mensagem", {
    nome,
    email,
    whatsapp,
    empresa: empresa || null,
    servico,
    investimento,
    mensagem,
  });

  return NextResponse.json({ ok: true });
}
