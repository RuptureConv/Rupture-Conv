"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { CTAButton } from "@/components/marketing/CTAButton";

const simulatorLinks = [
  {
    href: "/#simulateur",
    title: "Indemnité rupture conventionnelle",
    description: "Estimez votre indemnité de départ."
  },
  {
    href: "/salaire-brut-net",
    title: "Salaire brut en net",
    description: "Convertissez votre salaire brut en net."
  },
  {
    href: "/simulateur-chomage-rupture-conventionnelle",
    title: "Chômage après rupture",
    description: "Projetez ARE, différés et premier versement."
  }
] as const;

export function Header() {
  const [isSimulatorMenuOpen, setIsSimulatorMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const simulatorMenuRef = useRef<HTMLDivElement>(null);
  const desktopMenuId = "desktop-simulators-menu";
  const mobileMenuId = "mobile-main-menu";

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        simulatorMenuRef.current &&
        !simulatorMenuRef.current.contains(event.target as Node)
      ) {
        setIsSimulatorMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSimulatorMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function closeMenus() {
    setIsSimulatorMenuOpen(false);
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5EEF0]/75 bg-white/88 shadow-[0_10px_35px_rgba(6,27,58,0.035)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/78">
      <div className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:min-h-[84px] lg:px-8">
        <Logo />
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-2 rounded-full border border-[#E5EEF0] bg-white/70 p-1 text-sm font-bold text-[#102A4C] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] lg:flex"
        >
          <div
            className="relative"
            onMouseEnter={() => setIsSimulatorMenuOpen(true)}
            ref={simulatorMenuRef}
          >
            <button
              aria-controls={desktopMenuId}
              aria-expanded={isSimulatorMenuOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-1 rounded-full px-4 py-2 transition hover:bg-[#EAF8F6] hover:text-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
              onClick={() => setIsSimulatorMenuOpen((current) => !current)}
              type="button"
            >
              Simulateurs
              <span
                aria-hidden="true"
                className={`text-xs transition ${isSimulatorMenuOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>

            {isSimulatorMenuOpen ? (
              <div
                className="absolute left-0 top-[calc(100%+0.65rem)] w-[330px] rounded-2xl border border-[#E5EEF0] bg-white p-2 text-left shadow-[0_22px_70px_rgba(6,27,58,0.14)]"
                id={desktopMenuId}
                onMouseLeave={() => setIsSimulatorMenuOpen(false)}
                role="menu"
              >
                {simulatorLinks.map((item) => (
                  <Link
                    className="block rounded-xl px-4 py-3 transition hover:bg-[#EAF8F6] focus:bg-[#EAF8F6] focus:outline-none"
                    href={item.href}
                    key={item.href}
                    onClick={closeMenus}
                    role="menuitem"
                  >
                    <span className="block text-sm font-extrabold text-[#061B3A]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-[#5B6B7C]">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link className="rounded-full px-4 py-2 transition hover:bg-[#EAF8F6] hover:text-[#168F86]" href="/rupture-conventionnelle">
            Guide complet
          </Link>
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
        <div className="flex items-center gap-2">
          <CTAButton className="hidden sm:inline-flex">Calculer mon indemnité →</CTAButton>
          <button
            aria-controls={mobileMenuId}
            aria-expanded={isMobileMenuOpen}
            aria-label="Ouvrir le menu"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#E5EEF0] bg-white px-4 text-sm font-extrabold text-[#061B3A] shadow-sm transition hover:bg-[#EAF8F6] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2 lg:hidden"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            type="button"
          >
            Menu
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div
          className="border-t border-[#E5EEF0] bg-white px-4 py-4 shadow-[0_20px_50px_rgba(6,27,58,0.08)] lg:hidden"
          id={mobileMenuId}
        >
          <nav aria-label="Navigation mobile" className="mx-auto max-w-7xl">
            <section className="rounded-2xl bg-[#F7FBFA] p-3">
              <p className="px-2 pb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
                Simulateurs
              </p>
              <div className="grid gap-2">
                {simulatorLinks.map((item) => (
                  <Link
                    className="rounded-xl border border-[#E5EEF0] bg-white px-4 py-3 text-left transition hover:border-[#22AFA3] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
                    href={item.href}
                    key={item.href}
                    onClick={closeMenus}
                  >
                    <span className="block text-sm font-extrabold text-[#061B3A]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-[#5B6B7C]">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <div className="mt-3 grid gap-2 text-sm font-bold text-[#102A4C]">
              <Link
                className="rounded-xl px-4 py-3 transition hover:bg-[#EAF8F6]"
                href="/rupture-conventionnelle"
                onClick={closeMenus}
              >
                Guide complet
              </Link>
              <Link
                className="rounded-xl px-4 py-3 transition hover:bg-[#EAF8F6]"
                href="/#comprendre"
                onClick={closeMenus}
              >
                Comprendre
              </Link>
              <Link
                className="rounded-xl px-4 py-3 transition hover:bg-[#EAF8F6]"
                href="/#etapes"
                onClick={closeMenus}
              >
                Les étapes
              </Link>
              <Link
                className="rounded-xl px-4 py-3 transition hover:bg-[#EAF8F6]"
                href="/#faq"
                onClick={closeMenus}
              >
                FAQ
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
