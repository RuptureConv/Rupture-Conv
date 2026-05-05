import Link from "next/link";
import type { Route } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { InternalLinksBlock } from "@/components/seo/InternalLinksBlock";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { SimulatorCTA } from "@/components/seo/SimulatorCTA";
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
        </header>

        <div className="mt-10 space-y-10">
          <AdSlot format="horizontal" position="top" />

          <section className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
              Exemple concret
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5B6B7C]">
              Pour {estimate.years} {estimate.years === 1 ? "an" : "ans"}{" "}
              d&apos;ancienneté et un salaire brut de référence de{" "}
              {formatEuro(estimate.salary)}, l&apos;indemnité minimale indicative est
              de {formatEuro(estimate.amount)} bruts. Le calcul applique la règle
              du quart de mois jusqu&apos;à dix ans, puis du tiers de mois pour les
              années au-delà.
            </p>
          </section>

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
          <SimulatorCTA />

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

          <section className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-[#061B3A]">
              Questions fréquentes
            </h2>
            <div className="mt-5 divide-y divide-[#E5EEF0]">
              {dynamicText.faq.map((item, index) => (
                <details
                  key={item.question}
                  className="group py-5"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-semibold leading-7 text-[#061B3A]">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xl leading-7 text-[#22AFA3] transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[#5B6B7C]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
