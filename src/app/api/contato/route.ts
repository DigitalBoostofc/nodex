import { NextResponse } from "next/server";

/**
 * Recebe o formulário de contato.
 *
 * PENDENTE: hoje a mensagem só é registrada no log do servidor. O destino real
 * (e-mail para contato@nodexlabsbr.com.br, CRM ou webhook) ainda não foi
 * definido — enquanto não for, nenhum lead enviado por aqui chega a ninguém.
 * O canvas de design também não define o destino: lá o submit só troca o
 * estado da tela.
 */
export async function POST(request: Request) {
  const form = await request.formData();

  const nome = String(form.get("nome") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const desafio = String(form.get("desafio") ?? "").trim();
  const empresa = String(form.get("empresa") ?? "").trim();
  const interesse = String(form.get("interesse") ?? "").trim();

  if (!nome || !email || !desafio) {
    return NextResponse.json(
      { error: "Nome, e-mail e desafio são obrigatórios." },
      { status: 400 },
    );
  }

  console.info("[contato] nova mensagem", {
    nome,
    email,
    empresa: empresa || null,
    interesse: interesse || null,
    desafio,
  });

  return NextResponse.json({ ok: true });
}
