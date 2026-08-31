# Site Nodex Labs

Site institucional da Nodex Labs. Next.js 16 (App Router) + Tailwind v4, dark-only.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## De onde vem o conteúdo

| Fonte | O que define |
| --- | --- |
| Canvas Claude Design `Nodex Labs Site.dc.html` | Layout, copy final, dados de contato, fotos |
| `docs/copy-orientacao.md` | Tom de voz, regras de copy, o que não entra |
| Brand Book v1.0 | Tokens, tipografia, grid, critérios de aceite |

O canvas é a fonte da verdade quando diverge do doc de copy — ele é mais novo.
Divergências conhecidas: não existe `/blog`, a nav é `Sistemas · Chatbots ·
Automações · Cases · Sobre`.

## Estrutura

```
src/
  app/            uma pasta por rota; api/contato é a única rota dinâmica
  components/     blocos compartilhados entre páginas
  lib/site.ts     telefone, e-mail, nav e as mensagens de WhatsApp por página
  app/globals.css tokens do Brand Book + classes .nx-*
public/assets/    logo, símbolo, fotos do time, logos de case
```

`/` é a página de **Sistemas** — a frente principal ocupa a raiz, e por isso
"Sistemas" no menu aponta para `/`.

## Design system

Os tokens do Brand Book §03 vivem em `@theme static` no `globals.css`. As
classes `.nx-*` (tipografia, cards, botões) cobrem o que se repete; o resto é
Tailwind utilitário.

Dois detalhes que quebram silenciosamente se alterados:

- **`@theme static`** — sem `static`, o Tailwind v4 poda as variáveis que não
  viram utilitário e as `--font-*` somem.
- **As variáveis do `next/font` ficam no `<html>`, não no `<body>`** — os tokens
  `--font-display/body/mono` são declarados em `:root` e referenciam essas
  var(). A substituição acontece onde a variável é declarada, então se elas só
  existissem no `<body>` os tokens resolveriam como inválidos.

A tipografia usa propriedades longhand em vez do atalho `font:` de propósito:
no atalho, uma única `var()` indefinida derruba a declaração inteira, inclusive
o `font-size`.

## Imagens

`next/image` serve WebP/AVIF a partir dos PNG em `public/assets` — os 911 KB do
mockup da Cleanox saem como ~57 KB. O cache do otimizador fica em
`.next/dev/cache/images` e é indexado por caminho, não por conteúdo: ao
substituir um arquivo em `public/`, limpe o cache ou a versão antiga continua
sendo servida em alguns tamanhos.

```bash
find .next/dev/cache/images -mindepth 1 -delete
```

## Pendências

- **`POST /api/contato` manda a ficha ao n8n** (grupo Nodex + confirmação no
  WhatsApp do lead, instância da Mari). Override: `N8N_CONTATO_WEBHOOK_URL`.
- **Logo em PNG, não SVG.** O checklist de aceite do Brand Book §10 pede SVG nos
  quatro formatos oficiais; o projeto de design só tem PNG.
- **`© 2024` no rodapé** — veio assim do canvas.
