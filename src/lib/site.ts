/**
 * Dados de contato e navegação do site.
 *
 * Os valores vêm do canvas "Nodex Labs Site.dc.html" — foram eles que
 * resolveram os campos marcados como [PREENCHER] em docs/copy-orientacao.md.
 */

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
