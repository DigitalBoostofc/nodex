/**
 * Dados de contato e navegação do site.
 *
 * Os valores vêm do canvas "Nodex Labs Site.dc.html" — foram eles que
 * resolveram os campos marcados como [PREENCHER] em docs/copy-orientacao.md.
 */

export const PHONE_E164 = "5514981221882";
export const PHONE_DISPLAY = "+55 14 98122-1882";
export const EMAIL = "contato@nodexlabsbr.com.br";

export type PageKey =
  | "home"
  | "solucoes"
  | "chatbots"
  | "automacoes"
  | "cases"
  | "cleanox"
  | "sobre"
  | "contato";

/**
 * O WhatsApp abre com a mensagem já escrita, variando por página, para que a
 * primeira conversa comece no assunto que trouxe a pessoa até ali.
 */
const WHATSAPP_MESSAGES: Record<PageKey, string> = {
  home: "Olá! Vim pelo site da Nodex Labs e gostaria de saber mais sobre o desenvolvimento de um sistema sob medida para a minha operação.",
  chatbots:
    "Olá! Vim pelo site da Nodex Labs e gostaria de saber mais sobre chatbots com IA para o atendimento da minha empresa.",
  automacoes:
    "Olá! Vim pelo site da Nodex Labs e gostaria de saber mais sobre automações de processo com IA.",
  solucoes:
    "Olá! Vim pelo site da Nodex Labs e gostaria de entender qual solução faz mais sentido para a minha operação.",
  cases:
    "Olá! Vim pelo site da Nodex Labs, vi os cases e gostaria de conversar sobre um sistema para a minha empresa.",
  cleanox:
    "Olá! Vim pelo site da Nodex Labs, li o case da Cleanox e tenho uma operação de campo parecida. Gostaria de conversar.",
  sobre:
    "Olá! Vim pelo site da Nodex Labs e gostaria de conversar sobre um projeto de sistema com IA.",
  contato:
    "Olá! Vim pelo site da Nodex Labs e gostaria de falar com um especialista sobre o meu projeto.",
};

export function whatsappHref(page: PageKey = "home"): string {
  const message = WHATSAPP_MESSAGES[page] ?? WHATSAPP_MESSAGES.home;
  return `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message)}`;
}

/**
 * Menu principal. "Sistemas" é a home: a frente de sistemas é o carro-chefe,
 * então ela ocupa a raiz em vez de uma página própria.
 */
export const NAV = [
  { href: "/", label: "Sistemas" },
  { href: "/solucoes/chatbots", label: "Chatbots" },
  { href: "/solucoes/automacoes", label: "Automações" },
  { href: "/cases", label: "Cases" },
  { href: "/sobre", label: "Sobre" },
] as const;
