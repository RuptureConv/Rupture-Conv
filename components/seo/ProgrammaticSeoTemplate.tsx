import Link from "next/link";
import type { Route } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { CalculationSchema } from "@/components/seo/CalculationSchema";
import { ConcreteExample } from "@/components/seo/ConcreteExample";
import { InternalLinksBlock } from "@/components/seo/InternalLinksBlock";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { MiniFaq } from "@/components/seo/MiniFaq";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { SimulatorCTA } from "@/components/seo/SimulatorCTA";
import { TrackedSimulatorLink } from "@/components/seo/TrackedSimulatorLink";
import { TrustPanel } from "@/components/seo/TrustPanel";
import { absoluteUrl, mandatoryDisclaimer } from "@/lib/seo-content";
import {
  formatEuro,
  generateDynamicText,
  generateEstimate,
  generateTableData,
  type ProgrammaticSeoParams
} from "@/lib/seo-helpers";

type ProgrammaticSeoTemplateProps = ProgrammaticSeoParams & {
  canonicalPath: string;
};

function buildSmartLinks({ type, value }: ProgrammaticSeoParams) {
  if (type === "salaire") {
    return [
      value >= 1400
        ? {
            href: `/indemnite-rupture-conventionnelle-salaire-${value - 200}`,
            label: `Salaire ${value - 200}€`
          }
        : null,
      value <= 4800
        ? {
            href: `/indemnite-rupture-conventionnelle-salaire-${value + 200}`,
            label: `Salaire ${value + 200}€`
          }
        : null
    ].filter(Boolean) as { href: string; label: string }[];
  }

  return [
    value > 1
      ? {
          href: `/indemnite-rupture-conventionnelle-${value - 1}-ans`,
          label: `${value - 1} ${value - 1 === 1 ? "an" : "ans"} d'ancienneté`
        }
      : null,
    value < 40
      ? {
          href: `/indemnite-rupture-conventionnelle-${value + 1}-ans`,
          label: `${value + 1} ans d'ancienneté`
        }
      : null
  ].filter(Boolean) as { href: string; label: string }[];
}

export function ProgrammaticSeoTemplate({
  canonicalPath,
  type,
  value
}: ProgrammaticSeoTemplateProps) {
  const estimate = generateEstimate({ type, value });
  const tableData = generateTableData({ type, value });
  const dynamicText = generateDynamicText({ type, value });
  const smartLinks = buildSmartLinks({ type, value });
  const contentWordCount = dynamicText.differentiated.join(" ").split(/\s+/).length + 280;
  const shouldShowMidAd = contentWordCount > 300;
  const takeaways =
    type === "salaire"
      ? [
          "Le montant dépend surtout de votre ancienneté.",
          "Le calcul se fait à partir du salaire brut de référence.",
          "Le salaire net ne suffit pas pour calculer l’indemnité.",
          "Une convention collective ou une négociation peut augmenter le montant."
        ]
      : [
          "L’ancienneté influence directement le minimum indicatif.",
          "Le salaire brut de référence reste l’autre donnée essentielle.",
          "La convention collective peut prévoir un montant plus favorable.",
          "Le simulateur permet de tester votre situation réelle."
        ];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dynamicText.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dynamicText.h1,
        item: absoluteUrl(canonicalPath)
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#F7FBFA]">
      <SeoJsonLd data={faqJsonLd} />
      <SeoJsonLd data={breadcrumbJsonLd} />

      <article className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6 lg:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
        >
          ← Retour au simulateur
        </Link>

        <header className="rounded-3xl border border-[#E5EEF0] bg-white p-6 shadow-sm sm:p-8">
          <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#168F86]">
            Calcul rupture conventionnelle
          </p>
          <h1 className="mt-5 text-3xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl">
            {dynamicText.h1}
          </h1>
          <p className="mt-5 text-base leading-8 text-[#5B6B7C] sm:text-lg">
            {dynamicText.introAnswer}
          </p>
          <p className="mt-4 text-base leading-8 text-[#5B6B7C]">
            {dynamicText.lead}
          </p>
          <TrackedSimulatorLink
            buttonType="programmatic_hero"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
          >
            Calcul gratuit sans inscription →
          </TrackedSimulatorLink>
        </header>

        <div className="mt-10 space-y-10">
          <AdSlot format="horizontal" position="top" />
          <KeyTakeaways items={takeaways} />
          <TrustPanel />
          <CalculationSchema compact />

          {type === "salaire" ? (
            <section className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
                Réponse rapide
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[#5B6B7C]">
                <li>
                  Avec {formatEuro(value)} brut mensuels, le montant dépend surtout
                  de l&apos;ancienneté.
                </li>
                <li>
                  Le calcul part du salaire brut de référence, pas du salaire net.
                </li>
                <li>
                  Des primes, variables ou un 13e mois peuvent modifier la base.
                </li>
                <li>
                  La convention collective ou la négociation peut prévoir davantage.
                </li>
              </ul>
            </section>
          ) : null}

          <ConcreteExample
            body={`Pour ${estimate.years} ${
              estimate.years === 1 ? "an" : "ans"
            } d’ancienneté et un salaire brut de référence de ${formatEuro(
              estimate.salary
            )}, le simulateur donne un repère indicatif selon les données saisies.`}
            result={`Dans cet exemple, l’indemnité minimale indicative ressort à ${formatEuro(
              estimate.amount
            )} bruts.`}
            situation="Une estimation à partir de données simples"
          />

          <section className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
              Tableau estimatif
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm leading-6 text-[#5B6B7C]">
                <thead>
                  <tr className="border-b border-[#E5EEF0] text-[#061B3A]">
                    <th className="py-3 pr-4 font-extrabold">Ancienneté</th>
                    <th className="py-3 font-extrabold">Indemnité</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.seniority} className="border-b border-[#E5EEF0]">
                      <td className="py-3 pr-4">{row.seniority}</td>
                      <td className="py-3 font-bold text-[#102A4C]">
                        {row.indemnity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <AdSlot format="horizontal" position="after-content" />
          <SimulatorCTA
            buttonText="Simuler avec mes données →"
            buttonType="programmatic_after_table"
            description="Utilisez vos dates exactes et votre salaire brut de référence pour obtenir un montant plus utile que l'exemple standard."
            title="Affinez ce calcul avec le simulateur"
          />

          {type === "salaire" ? (
            <section className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
                Brut ou net : quel salaire saisir ?
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
                <p>
                  Pour une rupture conventionnelle, saisissez le salaire brut de
                  référence. Le salaire net est utile pour votre budget, mais il
                  ne permet pas de calculer le minimum légal.
                </p>
                <p>
                  Si votre rémunération comprend des primes, une part variable ou
                  un 13e mois, vérifiez les moyennes brutes avant de retenir une
                  base. C&apos;est souvent le point qui explique les écarts entre
                  une estimation rapide et le montant réellement proposé.
                </p>
              </div>
            </section>
          ) : null}
          <MiniFaq items={dynamicText.faq} />

          <section className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
              Ce qui peut modifier le montant
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
              {dynamicText.differentiated.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>{mandatoryDisclaimer}</p>
            </div>
          </section>

          {shouldShowMidAd ? (
            <AdSlot desktopOnly format="rectangle" position="mid" />
          ) : null}

          <InternalLinksBlock />

          {smartLinks.length > 0 ? (
            <nav
              aria-label="Estimations proches"
              className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-extrabold text-[#061B3A]">
                Estimations proches
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-sm font-semibold leading-7 text-[#102A4C]">
                {smartLinks.map((link) => (
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
          ) : null}

          <nav
            aria-label="Calculs complémentaires"
            className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm"
          >
            <h2 className="text-2xl font-extrabold text-[#061B3A]">
              Calculs liés
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm font-semibold leading-7 text-[#102A4C]">
              {[
                {
                  href: "/blog/calcul-indemnite-brut-ou-net",
                  label: "rupture conventionnelle brut ou net"
                },
                {
                  href: "/calcul-indemnite-rupture-conventionnelle-net",
                  label: "calcul de l'indemnité nette"
                },
                {
                  href: "/calcul-indemnite-rupture-conventionnelle",
                  label: "méthode complète de calcul"
                },
                {
                  href: "/indemnite-legale-rupture-conventionnelle",
                  label: "minimum légal à vérifier"
                },
                {
                  href: "/modele-lettre-rupture-conventionnelle",
                  label: "modèle de demande à copier"
                }
              ].map((link) => (
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

          <section className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
              Combien touche-t-on en rupture conventionnelle ?
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[#5B6B7C]">
              <li>Le minimum dépend du salaire brut et de l&apos;ancienneté.</li>
              <li>La formule applique 1/4 de mois par année jusqu&apos;à 10 ans.</li>
              <li>Au-delà de 10 ans, les années supplémentaires passent à 1/3.</li>
            </ul>
          </section>

          <AdSlot format="horizontal" position="bottom" />

        </div>
      </article>
    </main>
  );
}
