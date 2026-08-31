import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Poppins } from "next/font/google";

import { Banner } from "@/components/banner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import "./globals.css";

/**
 * Brand Book §04 — três fontes, cada uma com um papel fixo.
 * next/font auto-hospeda os arquivos e aplica font-display:swap, que é o que o
 * checklist de aceite (§10) pede.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500"],
  variable: "--font-poppins",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nodexlabsbr.com.br"),
  title: {
    default: "Nodex Labs — Chatbots, automações e sistemas",
    template: "%s · Nodex Labs",
  },
  description:
    "Nodex Labs constrói chatbots, automações e sistemas sob medida. Engenharia e IA no mesmo time.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Nodex Labs",
    title: "Sistemas com IA que trabalham sozinhos.",
    description:
      "Nodex Labs constrói chatbots, automações e sistemas sob medida. Engenharia e IA no mesmo time.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // As variáveis do next/font ficam no <html>, e não no <body>: os tokens
    // --font-* do @theme são declarados em :root e referenciam estas var().
    // A substituição acontece onde a variável é declarada, então se elas só
    // existissem no <body> os tokens resolveriam como inválidos.
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${plex.variable} ${jetbrains.variable}`}
    >
      <body>
        <a href="#conteudo" className="nx-btn sr-only focus:not-sr-only">
          Pular para o conteúdo
        </a>
        <Banner />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
