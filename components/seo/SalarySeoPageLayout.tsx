import type { Route } from "next";
import Link from "next/link";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import type { SalarySeoPage } from "@/lib/salary-seo-pages";
import { siteName, siteUrl } from "@/lib/site";

type SalarySeoPageLayoutProps = {
  page: SalarySeoPage;
};

export function SalarySeoPageLayout({ page }: SalarySeoPageLayoutProps) {
  const canonicalUrl = `${siteUrl}/${page.slug}`;
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
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    url: canonicalUrl,
    dateModified: "2026-06-04",
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: siteName
    }
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Salaire",
        item: `${siteUrl}/salaire`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: canonicalUrl
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#F7FBFA]">
      <SeoJsonLd data={faqJsonLd} />
      <SeoJsonLd data={articleJsonLd} />
      <SeoJsonLd data={breadcrumbJsonLd} />

      <article className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Link
          href="/salaire-brut-net"
          className="inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22AFA3]"
        >
          Retour au simulateur salaire
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.45fr)] lg:items-end">
          <div>
            <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#168F86]">
              {page.category}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#5B6B7C]">
              {page.excerpt}
            </p>
          </div>

          <aside className="rounded-2xl border border-[#D7E7E8] bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#168F86]">
              {page.hero.eyebrow}
            </p>
            <p className="mt-3 text-sm font-bold leading-7 text-[#102A4C]">
              {page.hero.summary}
            </p>
            <p className="mt-4 text-xs font-semibold text-[#5B6B7C]">
              Mis à jour le {page.lastUpdated} · Lecture {page.readingTime}
            </p>
          </aside>
        </header>

        {page.immediateAnswer ? (
          <section className="mt-10 rounded-2xl border border-[#BFE5E1] bg-[#EAF8F6] p-6 shadow-sm lg:p-8">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#168F86]">
              Réponse immédiate
            </p>
            <p className="mt-3 text-lg font-bold leading-8 text-[#061B3A]">
              {page.immediateAnswer}
            </p>
          </section>
        ) : null}

        <section className="mt-10 rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(280px,0.45fr)] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#168F86]">
                Estimation rapide
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
                {page.cta.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base font-semibold leading-8 text-[#5B6B7C]">
                {page.cta.body}
              </p>
            </div>
            <Link
              href="/salaire-brut-net"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#061B3A] px-5 py-3 text-center text-sm font-black text-white shadow-sm transition hover:bg-[#102A4C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22AFA3]"
            >
              {page.cta.label}
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          {page.examples.map((example) => (
            <div
              key={`${page.slug}-${example.title}`}
              className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-black text-[#168F86]">{example.title}</p>
              <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
                {example.description}
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Metric label="Brut mensuel" value={example.grossMonthly} />
                <Metric label="Net mensuel" value={example.netMonthly} strong />
                <Metric label="Brut annuel" value={example.grossAnnual} />
                <Metric label="Net annuel" value={example.netAnnual} />
                <Metric label="Brut horaire" value={example.grossHourly} />
                <Metric label="Cotisations estimées" value={example.estimatedContributionsMonthly} />
              </dl>
              {example.netAfterTaxMonthly ? (
                <p className="mt-4 rounded-xl bg-[#F7FBFA] p-3 text-sm font-bold leading-6 text-[#102A4C]">
                  Avec un taux de prélèvement à la source de 5 %, le net versé
                  mensuel estimé serait de {example.netAfterTaxMonthly}.
                </p>
              ) : null}
              <p className="mt-3 text-xs font-semibold text-[#5B6B7C]">
                Taux indicatif utilisé : {example.contributionRateLabel} · {example.profileLabel}
              </p>
            </div>
          ))}
        </section>

        {page.tableRows || page.schemaSteps ? (
          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            {page.tableRows ? (
              <div className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
                  Tableau récapitulatif
                </h2>
                <div className="mt-5 overflow-hidden rounded-xl border border-[#E5EFF0]">
                  <table className="w-full border-collapse text-left text-sm">
                    <tbody className="divide-y divide-[#E5EFF0]">
                      {page.tableRows.map((row) => (
                        <tr key={`${page.slug}-${row.label}`} className="bg-white">
                          <th className="w-1/3 align-top bg-[#F7FBFA] px-4 py-3 font-black text-[#102A4C]">
                            {row.label}
                          </th>
                          <td className="px-4 py-3">
                            <span className="block font-black text-[#061B3A]">
                              {row.value}
                            </span>
                            <span className="mt-1 block leading-6 text-[#5B6B7C]">
                              {row.note}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {page.schemaSteps ? (
              <div className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
                  Schéma explicatif
                </h2>
                <ol className="mt-5 space-y-3">
                  {page.schemaSteps.map((step, index) => (
                    <li key={`${page.slug}-${step}`} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF8F6] text-sm font-black text-[#168F86]">
                        {index + 1}
                      </span>
                      <span className="rounded-xl bg-[#F7FBFA] px-4 py-2 text-sm font-bold leading-6 text-[#102A4C]">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </section>
        ) : null}

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.38fr)]">
          <div className="space-y-6">
            {page.sections.map((section) => (
              <section
                key={`${page.slug}-${section.title}`}
                className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm"
              >
                <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-5 space-y-2 text-sm font-bold leading-7 text-[#102A4C]">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-xl bg-[#F7FBFA] px-4 py-3">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {page.mistakes ? (
              <section className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
                  Erreurs fréquentes
                </h2>
                <ul className="mt-5 space-y-3 text-sm font-bold leading-7 text-[#102A4C]">
                  {page.mistakes.map((mistake) => (
                    <li key={`${page.slug}-${mistake}`} className="rounded-xl bg-[#FFF8ED] px-4 py-3">
                      {mistake}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
                Questions fréquentes
              </h2>
              <div className="mt-5 divide-y divide-[#E5EFF0]">
                {page.faq.map((item) => (
                  <details key={item.question} className="group py-4">
                    <summary className="cursor-pointer list-none text-base font-black text-[#102A4C] marker:hidden">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-[#5B6B7C]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#061B3A]">
                Points à garder en tête
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-[#5B6B7C]">
                {page.warning}
              </p>
            </section>

            <section className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#061B3A]">
                Continuer la lecture
              </h2>
              <ul className="mt-4 space-y-3">
                {page.internalLinks.map((link) => (
                  <li key={`${page.slug}-${link.href}`}>
                    <Link
                      href={link.href as Route}
                      className="block rounded-xl border border-[#E5EFF0] p-4 transition hover:border-[#22AFA3] hover:bg-[#F7FBFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22AFA3]"
                    >
                      <span className="block text-sm font-black text-[#061B3A]">
                        {link.label}
                      </span>
                      <span className="mt-1 block text-xs font-semibold leading-5 text-[#5B6B7C]">
                        {link.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}

function Metric({
  label,
  value,
  strong = false
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="rounded-xl bg-[#F7FBFA] p-3">
      <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#5B6B7C]">
        {label}
      </dt>
      <dd
        className={
          strong
            ? "mt-1 text-lg font-black text-[#061B3A]"
            : "mt-1 text-base font-extrabold text-[#102A4C]"
        }
      >
        {value}
      </dd>
    </div>
  );
}
