import type { Metadata } from "next";
import Link from "next/link";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { absoluteUrl } from "@/lib/seo-content";
import { siteName } from "@/lib/site";

const canonicalPath = "/guides-complets";
const canonicalUrl = absoluteUrl(canonicalPath);
const pageTitle = "Guides droit du travail, chômage et salaire | RuptureConv";

const guides = [
  {
    href: "/rupture-conventionnelle",
    title: "Guide complet rupture conventionnelle",
    description:
      "Procédure, indemnité, homologation, négociation, chômage et erreurs à éviter avant de signer."
  },
  {
    href: "/chomage-are",
    title: "Guide complet chômage / ARE",
    description:
      "Conditions d'ouverture, calcul ARE, différés, premier paiement France Travail et cas de départ."
  },
  {
    href: "/salaire-brut-net",
    title: "Guide complet salaire brut / net",
    description:
      "Salaire brut, net avant impôt, net après impôt, statut cadre, non cadre et exemples chiffrés."
  },
  {
    href: "/guide-preavis",
    title: "Guide complet préavis",
    description:
      "Démission, licenciement, rupture conventionnelle, dispense, congés payés, maladie et date de fin."
  }
] as const;

const situations = [
  {
    href: "/rupture-conventionnelle",
    label: "Je veux quitter mon entreprise à l'amiable"
  },
  {
    href: "/chomage-are",
    label: "Je viens de perdre mon emploi"
  },
  {
    href: "/guide-preavis",
    label: "Je dois calculer une date de préavis"
  },
  {
    href: "/salaire-brut-net",
    label: "Je veux convertir un salaire brut en net"
  },
  {
    href: "/negocier-rupture-conventionnelle",
    label: "Je prépare une négociation"
  },
  {
    href: "/rupture-conventionnelle-pieges",
    label: "Je vérifie mes droits avant de signer"
  }
] as const;

const simulators = [
  {
    href: "/#simulateur",
    label: "Estimer une indemnité de rupture conventionnelle"
  },
  {
    href: "/simulateur-chomage-rupture-conventionnelle",
    label: "Projeter chômage, différés et premier paiement"
  },
  {
    href: "/salaire-brut-net",
    label: "Convertir un salaire brut en net"
  },
  {
    href: "/calcul-preavis",
    label: "Calculer un préavis"
  }
] as const;

export const metadata: Metadata = {
  title: {
    absolute: pageTitle
  },
  description:
    "Tous les guides complets RuptureConv : rupture conventionnelle, chômage ARE, salaire brut net, préavis et fin de contrat.",
  alternates: {
    canonical: canonicalUrl
  },
  openGraph: {
    title: pageTitle,
    description:
      "Le centre des guides RuptureConv pour comprendre une fin de contrat, calculer les montants utiles et préparer la suite.",
    url: canonicalUrl,
    siteName,
    type: "website",
    locale: "fr_FR"
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description:
      "Rupture conventionnelle, chômage ARE, salaire brut net, préavis et fin de contrat."
  }
};

export default function CompleteGuidesPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guides complets RuptureConv",
    description:
      "Centre des guides complets sur la rupture conventionnelle, le chômage, le salaire et le préavis.",
    url: canonicalUrl,
    hasPart: guides.map((guide) => ({
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      url: absoluteUrl(guide.href)
    }))
  };

  return (
    <main className="min-h-screen bg-[#F7FBFA]">
      <SeoJsonLd data={collectionJsonLd} />

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
        >
          ← Retour à l&apos;accueil
        </Link>

        <header className="max-w-3xl">
          <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#168F86]">
            Guides complets
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl">
            Tous les guides pour préparer une fin de contrat
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#5B6B7C]">
            Retrouvez les pages centrales de RuptureConv : rupture
            conventionnelle, chômage ARE, salaire brut/net et préavis. Chaque
            guide renvoie vers ses pages spécialisées pour aller droit au point.
          </p>
          <p className="mt-4 text-base leading-7 text-[#5B6B7C]">
            Cette page sert de point de départ quand vous ne savez pas encore
            quelle règle vérifier : départ négocié, indemnisation chômage,
            préavis, salaire ou documents de fin de contrat.
          </p>
          <p className="mt-4 text-base font-semibold leading-7 text-[#102A4C]">
            Vous ne savez pas par où commencer ? Choisissez votre situation :
            départ négocié, chômage, préavis ou salaire.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-[#E5EEF0] bg-white p-5 shadow-sm">
          <h2 className="text-xl font-extrabold text-[#061B3A]">
            Vous êtes dans quelle situation ?
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {situations.map((situation) => (
              <Link
                className="rounded-xl border border-[#E5EEF0] bg-[#F7FBFA] px-4 py-3 text-sm font-bold leading-6 text-[#102A4C] transition hover:border-[#22AFA3] hover:bg-[#EAF8F6] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
                href={situation.href}
                key={situation.href}
              >
                {situation.label}
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#22AFA3] hover:shadow-[0_18px_55px_rgba(6,27,58,0.08)] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
              href={guide.href}
              key={guide.href}
            >
              <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
                {guide.title}
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
                {guide.description}
              </p>
              <span className="mt-5 inline-flex text-sm font-black text-[#168F86]">
                Ouvrir le guide →
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#061B3A]">
            Les simulateurs utiles
          </h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
            Si vous avez déjà des chiffres sous les yeux, commencez par l&apos;outil
            le plus proche de votre question.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {simulators.map((simulator) => (
              <Link
                className="rounded-xl border border-[#E5EEF0] bg-[#F7FBFA] px-4 py-3 text-sm font-bold leading-6 text-[#102A4C] transition hover:border-[#22AFA3] hover:bg-[#EAF8F6] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
                href={simulator.href}
                key={simulator.href}
              >
                {simulator.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#061B3A]">
            Une architecture prête à évoluer
          </h2>
          <p className="mt-4 text-base leading-8 text-[#5B6B7C]">
            Cette page sert de centre pour les grands dossiers éditoriaux. Les
            prochains guides pourront être ajoutés dans la même grille, avec le
            même niveau de maillage vers les simulateurs, les pages pratiques et
            les clusters spécialisés.
          </p>
          <p className="mt-4 rounded-xl bg-[#F7FBFA] p-4 text-sm font-bold leading-7 text-[#102A4C]">
            Mis à jour le 17 juin 2026. Les guides sont repris progressivement
            pour rester clairs, pratiques et cohérents avec les démarches les
            plus fréquentes des salariés.
          </p>
        </section>
      </section>
    </main>
  );
}
