import type { PageKey } from "./site";

/**
 * Traduz a rota atual na chave usada para escolher a mensagem do WhatsApp.
 * A rota mais específica ganha, então a lista é varrida do fim para o começo.
 */
const ROUTES: ReadonlyArray<readonly [string, PageKey]> = [
  ["/", "home"],
  ["/solucoes", "solucoes"],
  ["/solucoes/chatbots", "chatbots"],
  ["/solucoes/automacoes", "automacoes"],
  ["/cases", "cases"],
  ["/cases/cleanox", "cleanox"],
  ["/cases/appexcrm", "appexcrm"],
  ["/sobre", "sobre"],
  ["/contato", "contato"],
];

export function pageKeyFor(pathname: string): PageKey {
  const exact = ROUTES.find(([route]) => route === pathname);
  if (exact) return exact[1];

  // Páginas legais e qualquer rota nova caem na mensagem padrão.
  return "home";
}
