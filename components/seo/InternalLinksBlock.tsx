import Link from "next/link";
import type { Route } from "next";

const internalLinks = [
  {
    href: "/reforme-rupture-conventionnelle-2026",
    label: "réforme rupture conventionnelle 2026"
  },
  {
    href: "/rupture-conventionnelle-chomage-2026",
    label: "chômage après rupture conventionnelle en 2026"
  },
  {
    href: "/rupture-conventionnelle",
    label: "guide complet rupture conventionnelle"
  },
  {
    href: "/calcul-indemnite-rupture-conventionnelle-net",
    label: "calcul indemnité rupture conventionnelle nette"
  },
  {
    href: "/blog/calcul-indemnite-brut-ou-net",
    label: "rupture conventionnelle brut ou net"
  },
  {
    href: "/calcul-indemnite-rupture-conventionnelle",
    label: "salaire brut de référence"
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
    href: "/rupture-conventionnelle-chomage",
    label: "chômage après rupture conventionnelle"
  },
  {
    href: "/simulateur-chomage-rupture-conventionnelle",
    label: "simulateur chômage rupture conventionnelle"
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
  },
  {
    href: "/guide-preavis",
    label: "guide complet du préavis"
  },
  {
    href: "/preavis-demission",
    label: "préavis de démission"
  },
  {
    href: "/preavis-licenciement",
    label: "préavis de licenciement"
  },
  {
    href: "/preavis-rupture-conventionnelle",
    label: "préavis et rupture conventionnelle"
  }
] as const;

type InternalLinksBlockProps = {
  ariaLabel?: string;
  links?: readonly {
    href: string;
    label: string;
  }[];
  title?: string;
};

export function InternalLinksBlock({
  ariaLabel = "Liens utiles",
  links = internalLinks,
  title = "Guides utiles"
}: InternalLinksBlockProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-extrabold text-[#061B3A]">
        {title}
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-sm font-semibold leading-7 text-[#102A4C]">
        {links.map((link) => (
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
