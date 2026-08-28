"use client";

import { usePathname } from "next/navigation";

import { pageKeyFor } from "@/lib/page-key";
import { whatsappHref } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * CTA primário do site. Abre o WhatsApp com a mensagem já escrita para a
 * página em que a pessoa está — quem chega pelo case da Cleanox começa a
 * conversa falando de operação de campo, não de "um projeto".
 */
export function WaLink({ children, className }: Props) {
  const page = pageKeyFor(usePathname());

  return (
    <a
      href={whatsappHref(page)}
      target="_blank"
      rel="noopener"
      className={className}
    >
      {children}
    </a>
  );
}
