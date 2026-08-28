import { WaLink } from "./wa-link";

/** Banner de anúncio — uma linha só, conforme docs/copy-orientacao.md §13. */
export function Banner() {
  return (
    <div className="border-b border-nx-border-warm bg-[#0B0505]">
      <WaLink className="mx-auto flex h-9 max-w-[1280px] items-center justify-center gap-2 px-4 text-inherit hover:text-inherit md:h-11 md:gap-[14px] md:px-8 lg:px-12">
        <span className="shrink-0 rounded-full bg-nx-red px-2 py-1 font-mono text-[9px]/[1] font-medium tracking-[0.14em] text-white md:px-[11px] md:py-[7px] md:text-[10px] md:tracking-[0.18em]">
          NOVO
        </span>
        <span className="min-w-0 truncate text-[12px]/[1] font-light text-nx-text-2 md:text-[14px]/[1.4]">
          Chatbots, automações e sistemas. Um time.
        </span>
        <span className="hidden shrink-0 font-medium text-nx-red-hover md:inline">
          Fale com a Nodex →
        </span>
      </WaLink>
    </div>
  );
}
