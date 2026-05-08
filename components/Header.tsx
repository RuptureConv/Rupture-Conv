import { Logo } from "@/components/brand/Logo";
import { CTAButton } from "@/components/marketing/CTAButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E5EEF0]/75 bg-white/88 shadow-[0_10px_35px_rgba(6,27,58,0.035)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/78">
      <div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:min-h-[84px] lg:px-8">
        <Logo />
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-2 rounded-full border border-[#E5EEF0] bg-white/70 p-1 text-sm font-bold text-[#102A4C] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] lg:flex"
        >
          <a className="rounded-full px-4 py-2 transition hover:bg-[#EAF8F6] hover:text-[#168F86]" href="#simulateur">
            Simulateur
          </a>
          <a className="rounded-full px-4 py-2 transition hover:bg-[#EAF8F6] hover:text-[#168F86]" href="#comprendre">
            Comprendre
          </a>
          <a className="rounded-full px-4 py-2 transition hover:bg-[#EAF8F6] hover:text-[#168F86]" href="#etapes">
            Les étapes
          </a>
          <a className="rounded-full px-4 py-2 transition hover:bg-[#EAF8F6] hover:text-[#168F86]" href="#faq">
            FAQ
          </a>
        </nav>
        <CTAButton className="hidden sm:inline-flex">Calculer mon indemnité →</CTAButton>
      </div>
    </header>
  );
}
