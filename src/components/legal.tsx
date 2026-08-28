import type { ReactNode } from "react";

/** Cabeçalho das páginas legais — sem hero animado, só a hierarquia de texto. */
export function LegalHeader({
  badge,
  title,
  lead,
  updatedAt,
}: {
  badge: string;
  title: string;
  lead: string;
  updatedAt: string;
}) {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pt-28 pb-[72px] md:px-8 lg:px-12">
      <span className="nx-label tracking-[0.22em]">LEGAL</span>
      <p className="nx-label-red mt-[18px] text-[13px]">{badge}</p>
      <h1 className="nx-h1-sub mt-[22px]">{title}</h1>
      <p className="nx-body-l mt-6 max-w-[62ch]">{lead}</p>
      <p className="mt-[26px] font-mono text-[13px]/[1.6] text-nx-dim">
        ÚLTIMA ATUALIZAÇÃO · {updatedAt}
      </p>
    </section>
  );
}

/** Coluna estreita de leitura — 900px, o confortável para texto corrido. */
export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto max-w-[900px] px-5 pb-28 md:px-8 lg:px-12">
      <div className="flex flex-col gap-11">{children}</div>
    </section>
  );
}

export function LegalArticle({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article>
      <span className="nx-label-red">{label}</span>
      <h2 className="mt-[18px] mb-[14px] font-display text-[24px]/[1.3] font-medium text-white">
        {title}
      </h2>
      {children}
    </article>
  );
}

export function LegalText({ children }: { children: ReactNode }) {
  return (
    <p className="text-[17px]/[1.75] font-light text-nx-muted">{children}</p>
  );
}

/** Item com filete quente à esquerda, usado nas listas de texto corrido. */
export function LegalBullet({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-nx-border-warm pl-[18px] text-[17px]/[1.7] font-light text-nx-muted">
      {children}
    </p>
  );
}

/** Tabela de duas colunas: o que fazemos e sob qual base legal. */
export function LegalTable({
  rows,
}: {
  rows: ReadonlyArray<{ term: string; definition: string }>;
}) {
  return (
    <div className="border-t border-nx-border">
      {rows.map((row) => (
        <div
          key={row.term}
          className="grid gap-6 border-b border-nx-border py-5 sm:grid-cols-[minmax(200px,1fr)_1.6fr]"
        >
          <p className="font-display text-[16px]/[1.4] font-medium text-white">
            {row.term}
          </p>
          <p className="text-[16px]/[1.65] font-light text-nx-muted">
            {row.definition}
          </p>
        </div>
      ))}
    </div>
  );
}
