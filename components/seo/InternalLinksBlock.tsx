import Link from "next/link";
import type { Route } from "next";

const internalLinks = [
  {
    href: "/rupture-conventionnelle",
    label: "guide complet rupture conventionnelle"
  },
  {
    href: "/calcul-indemnite-rupture-conventionnelle-net",
    label: "calcul indemnité rupture conventionnelle nette"
  },
  {
    href: "/calcul-indemnite-rupture-conventionnelle",
    label: "méthode de calcul de l'indemnité"
  },
  {
    href: "/indemnite-legale-rupture-conventionnelle",
    label: "indemnité légale de rupture conventionnelle"
  },
  {
    href: "/simulateur-rupture-conventionnelle",
    label: "simulateur de rupture conventionnelle"
  },
  {
    href: "/modele-lettre-rupture-conventionnelle",
    label: "modèle de lettre de rupture conventionnelle"
  },
  {
    href: "/rupture-conventionnelle-ou-demission",
    label: "rupture conventionnelle ou démission"
  },
  {
    href: "/rupture-conventionnelle-ou-licenciement",
    label: "rupture conventionnelle ou licenciement"
  },
  {
    href: "/rupture-conventionnelle-ou-abandon-de-poste",
    label: "rupture conventionnelle ou abandon de poste"
  }
] as const;

export function InternalLinksBlock() {
  return (
    <nav
      aria-label="Liens essentiels rupture conventionnelle"
      className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-extrabold text-[#061B3A]">
        Guides utiles
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-sm font-semibold leading-7 text-[#102A4C]">
        {internalLinks.map((link) => (
          <li key={link.href}>
            <Link
              className="transition hover:text-[#22AFA3]"
              href={link.href as Route}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
