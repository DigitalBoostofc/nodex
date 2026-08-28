import { WaLink } from "./wa-link";

/** Banner de anúncio — uma linha só, conforme docs/copy-orientacao.md §13. */
export function Banner() {
  return (
    <div className="border-b border-nx-border-warm bg-[#0B0505]">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-[14px] px-5 py-[2px] md:px-8 lg:px-12">
        <span className="rounded-full bg-nx-red px-[11px] py-[7px] font-mono text-[10px]/[1] font-medium tracking-[0.18em] text-white">
          NOVO
        </span>
        <span className="text-[14px]/[1.4] font-light text-nx-text-2">
          Chatbots, automações e sistemas. Um time.
        </span>
        <WaLink className="inline-block px-[6px] py-[14px] text-[14px]/[1.4] font-medium text-nx-red-hover hover:text-white">
          Fale com a Nodex →
        </WaLink>
      </div>
    </div>
  );
}
