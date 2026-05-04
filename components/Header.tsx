import { Logo } from "@/components/brand/Logo";
import { CTAButton } from "@/components/marketing/CTAButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E5EEF0]/90 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[90px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-8 text-sm font-bold text-[#102A4C] lg:flex"
        >
          <a className="transition hover:text-[#22AFA3]" href="#simulateur">
            Simulateur
          </a>
          <a className="transition hover:text-[#22AFA3]" href="#comprendre">
            Comprendre
          </a>
          <a className="transition hover:text-[#22AFA3]" href="#etapes">
            Les étapes
          </a>
          <a className="transition hover:text-[#22AFA3]" href="#faq">
            FAQ
          </a>
        </nav>
        <CTAButton className="hidden sm:inline-flex">Calculer mon indemnité →</CTAButton>
      </div>
    </header>
  );
}
