"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { NAV } from "@/lib/site";

import { WaLink } from "./wa-link";

/** "Sistemas" fica na raiz, então a home é o item ativo dela. */
function isActive(pathname: string, href: string) {
  return pathname === href;
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Trocar de página fecha o menu — sem isso ele fica aberto sobre o conteúdo
  // novo. Ajustado durante o render, e não num efeito, para não renderizar uma
  // vez com o menu aberto sobre a página que já mudou.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-60 border-b border-nx-border-soft bg-black/82 backdrop-blur-[14px]">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-8 px-5 md:px-8 lg:px-12">
        <Link href="/" aria-label="Nodex Labs — início">
          <Image
            src="/assets/logo-on-black.png"
            alt="Nodex Labs"
            width={352}
            height={72}
            priority
            className="block h-9 w-auto mix-blend-screen"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`border-b-2 pt-4 pb-[14px] text-[15px]/[1] transition-colors duration-160 ${
                isActive(pathname, item.href)
                  ? "border-nx-red text-white"
                  : "border-transparent text-nx-text-2 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <WaLink className="nx-btn px-5 py-[15px] text-[14px]/[1]">
            Fale com a Nodex
          </WaLink>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          className="-mr-3 flex h-11 w-11 items-center justify-center rounded-[10px] text-white lg:hidden"
        >
          <span className="sr-only">
            {menuOpen ? "Fechar menu" : "Abrir menu"}
          </span>
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {menuOpen ? (
              <>
                <path d="M3 1.5 17 12.5" />
                <path d="M17 1.5 3 12.5" />
              </>
            ) : (
              <>
                <path d="M0 1.5h20" />
                <path d="M0 7h20" />
                <path d="M0 12.5h20" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="menu-mobile"
          className="border-t border-nx-border-soft bg-black px-5 pt-2 pb-6 md:px-8 lg:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`block border-b border-nx-border py-4 text-[17px]/[1] font-light ${
                isActive(pathname, item.href) ? "text-white" : "text-nx-text-2"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <WaLink className="nx-btn mt-6 w-full text-center">
            Fale com a Nodex
          </WaLink>
        </nav>
      ) : null}
    </header>
  );
}
