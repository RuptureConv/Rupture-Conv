import Link from "next/link";
import type { Route } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { CalculationSchema } from "@/components/seo/CalculationSchema";
import { CommonMistakes } from "@/components/seo/CommonMistakes";
import { ComparisonCards } from "@/components/seo/ComparisonCards";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { ConcreteExample } from "@/components/seo/ConcreteExample";
import { DelayTimeline } from "@/components/seo/DelayTimeline";
import { HubCtaBlock } from "@/components/seo/HubCtaBlock";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import { MiniFaq } from "@/components/seo/MiniFaq";
import { PageSummary } from "@/components/seo/PageSummary";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { SimulatorCTA } from "@/components/seo/SimulatorCTA";
import { TrustPanel } from "@/components/seo/TrustPanel";
import type { ComparisonPage } from "@/lib/comparison-pages";
import { absoluteUrl, mandatoryDisclaimer } from "@/lib/seo-content";
import { siteName } from "@/lib/site";

type ComparisonPageLayoutProps = {
  page: ComparisonPage;
};

export function ComparisonPageLayout({ page }: ComparisonPageLayoutProps) {
  const canonicalPath = `/${page.slug}`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
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
        name: page.h1,
        item: absoluteUrl(canonicalPath)
      }
    ]
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    mainEntityOfPage: absoluteUrl(canonicalPath),
    dateModified: "2026-05-08",
    author: {
      "@type": "Organization",
      name: siteName
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.ico")
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FBFA]">
      <SeoJsonLd data={faqJsonLd} />
      <SeoJsonLd data={breadcrumbJsonLd} />
      <SeoJsonLd data={articleJsonLd} />

      <article className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <Link
          className="mb-8 inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
          href="/"
        >
          ← Retour au simulateur
        </Link>

        <header className="relative overflow-hidden rounded-[34px] border border-[#D7E7E8] bg-white p-6 shadow-[0_24px_80px_rgba(6,27,58,0.07)] sm:p-8 lg:p-10">
          <span
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#EAF8F6]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#168F86]">
                {page.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl">
                {page.h1}
              </h1>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-[#5B6B7C] sm:text-lg">
                {page.subtitle}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#22AFA3] px-6 text-sm font-black text-white shadow-[0_18px_36px_rgba(34,175,163,0.24)] transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
                  href="/#simulateur"
                >
                  Calculer mon indemnité →
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D7E7E8] bg-white px-6 text-sm font-black text-[#061B3A] transition hover:bg-[#EAF8F6]"
                  href="#comparatif"
                >
                  Voir le comparatif
                </Link>
              </div>
            </div>

            <aside className="rounded-[28px] border border-[#E5EEF0] bg-[#F7FBFA] p-5">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#168F86]">
                Lecture rapide
              </p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl bg-white p-4 ring-1 ring-[#E5EEF0]">
                  <p className="text-sm font-black text-[#061B3A]">{page.firstOption}</p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-[#5B6B7C]">
                    Cadre plus sécurisé si un accord clair est possible.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 ring-1 ring-[#E5EEF0]">
                  <p className="text-sm font-black text-[#061B3A]">{page.secondOption}</p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-[#5B6B7C]">
                    À comparer selon le calendrier, le risque et les droits.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.55fr)]">
          <KeyTakeaways items={page.takeaways} />
          <TrustPanel
            items={[
              "Simulation gratuite",
              "Sans inscription",
              "Résultat immédiat",
              "Lecture prudente selon votre situation"
            ]}
          />
        </div>

        <div className="mt-10 space-y-10">
          <AdSlot format="horizontal" position="top" />
          <PageSummary sections={["Comparatif", ...page.sections.map((section) => section.title), "FAQ"]} />

          <div id="comparatif">
            <ComparisonTable
              firstOption={page.firstOption}
              rows={page.rows}
              secondOption={page.secondOption}
            />
          </div>

          <ComparisonCards
            items={page.comparisonCards.items}
            title={page.comparisonCards.title}
          />

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.55fr)]">
            <ConcreteExample {...page.example} />
            <CalculationSchema compact />
          </section>

          <SimulatorCTA />
          {page.slug === "rupture-conventionnelle-ou-licenciement" ? (
            <HubCtaBlock
              ctaLabel="Voir le parcours complet"
              description="Si vous hésitez entre rupture conventionnelle et licenciement, commencez par comparer, puis replacez le calcul dans la procédure complète."
              title="Besoin de comprendre la rupture conventionnelle avant de choisir ?"
            />
          ) : null}

          {page.slug === "rupture-conventionnelle-ou-licenciement" ? (
            <DelayTimeline />
          ) : null}

          <div className="grid gap-10">
            {page.sections.map((section) => (
              <section
                className="rounded-[28px] border border-[#E5EEF0] bg-white p-6 shadow-[0_18px_55px_rgba(6,27,58,0.04)] sm:p-8"
                id={section.title
                  .toLocaleLowerCase("fr-FR")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "")}
                key={section.title}
              >
                <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-[#5B6B7C]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li
                          className="flex gap-3 rounded-2xl bg-[#F7FBFA] p-4 text-sm font-bold leading-6 text-[#102A4C]"
                          key={bullet}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#22AFA3]"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <CommonMistakes />
          <div id="faq">
            <MiniFaq items={page.faq} />
          </div>

          <section className="rounded-[28px] border border-[#D7E7E8] bg-[#EAF8F6] p-6 shadow-[0_18px_55px_rgba(6,27,58,0.04)] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#168F86]">
              Aller plus loin
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#061B3A]">
              Comparez avec vos propres chiffres
            </h2>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-[#5B6B7C]">
              Une comparaison devient vraiment utile lorsqu’elle est reliée à
              votre ancienneté, votre salaire et votre calendrier de départ.
              {` ${mandatoryDisclaimer}`}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#061B3A] px-6 text-sm font-black text-white transition hover:bg-[#102A4C]"
                href="/#simulateur"
              >
                Faire une simulation gratuite →
              </Link>
            </div>
          </section>

          <nav
            aria-label="Guides complémentaires"
            className="rounded-[28px] border border-[#E5EEF0] bg-white p-6 shadow-[0_18px_55px_rgba(6,27,58,0.04)] sm:p-8"
          >
            <h2 className="text-2xl font-black text-[#061B3A]">Guides liés</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="block rounded-2xl bg-[#F7FBFA] px-4 py-3 text-sm font-black text-[#102A4C] transition hover:bg-[#EAF8F6] hover:text-[#168F86]"
                    href={link.href as Route}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </article>
    </main>
  );
}
