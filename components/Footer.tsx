import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="border-t border-[#E5EEF0] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm leading-6 text-[#5B6B7C] sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <nav
            aria-label="Liens légaux"
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            <Link className="font-semibold hover:text-[#22AFA3]" href="/mentions-legales">
              Mentions légales
            </Link>
            <Link className="font-semibold hover:text-[#22AFA3]" href="/politique-confidentialite">
              Confidentialité
            </Link>
            <Link className="font-semibold hover:text-[#22AFA3]" href="/politique-cookies">
              Politique cookies
            </Link>
            <Link className="font-semibold hover:text-[#22AFA3]" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
        <p>
          Simulation indicative, sans conseil juridique personnalisé. Vérifiez
          toujours les données applicables à votre situation.
        </p>
      </div>
    </footer>
  );
}
