import type { Route } from "next";
import Link from "next/link";
import {
  getSectionAnchor,
  PageSummary
} from "@/components/seo/PageSummary";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { TrustNotice } from "@/components/seo/TrustNotice";
import type { UnemploymentSeoPage } from "@/lib/unemployment-seo-pages";
import { siteName, siteUrl } from "@/lib/site";

type UnemploymentSeoPageLayoutProps = {
  page: UnemploymentSeoPage;
};

export function UnemploymentSeoPageLayout({ page }: UnemploymentSeoPageLayoutProps) {
  const isUnemploymentHub = page.slug === "chomage-are";
  const currentPath = `/${page.slug}`;
  const backLink =
    page.slug === "chomage-are"
      ? {
          href: "/guides-complets",
          label: "Retour aux guides complets"
        }
      : {
          href: "/chomage-are",
          label: "Retour au guide chômage ARE"
        };
  const internalLinks = page.internalLinks.filter(
    (link) => link.href !== currentPath
  );
  const summarySections = [
    "À retenir",
    "Quelle page lire selon votre situation ?",
    ...page.sections.map((section) => section.title),
    "Questions fréquentes"
  ];
  const situationLinks = [
    {
      href: "/simulateur-chomage-rupture-conventionnelle",
      label: "Je veux estimer mon allocation chômage"
    },
    {
      href: "/delai-de-carence-chomage",
      label: "Je veux comprendre le délai de carence"
    },
    {
      href: "/chomage-apres-rupture-conventionnelle",
      label: "Je viens de signer une rupture conventionnelle"
    },
    {
      href: "/premier-paiement-france-travail",
      label: "Je veux savoir quand je serai payé"
    },
    {
      href: "/cumul-are-salaire",
      label: "Je reprends un emploi"
    },
    {
      href: "/france-travail-inscription",
      label: "Je dois m'inscrire à France Travail"
    }
  ] as const;
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
        name: "Chômage ARE",
        item: `${siteUrl}/chomage-are`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: canonicalUrl
      }
    ]
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    mainEntityOfPage: canonicalUrl,
    dateModified: "2026-06-06",
    inLanguage: "fr-FR",
    author: {
      "@type": "Organization",
      name: siteName
    },
    publisher: {
      "@type": "Organization",
      name: siteName
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FBFA]">
      <SeoJsonLd data={faqJsonLd} />
      <SeoJsonLd data={breadcrumbJsonLd} />
      <SeoJsonLd data={articleJsonLd} />

      <article className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Link
          href={backLink.href as Route}
          className="inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22AFA3]"
        >
          ← {backLink.label}
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.45fr)] lg:items-end">
          <div>
            <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#168F86]">
              {page.category}
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl lg:text-6xl">
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
              Mis à jour le {page.updatedAt} · Lecture {page.readingTime}
            </p>
          </aside>
        </header>

        {isUnemploymentHub ? (
          <div className="mt-10">
            <PageSummary sections={summarySections} />
          </div>
        ) : null}

        <section
          className="mt-10 grid scroll-mt-28 gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.38fr)]"
          id="a-retenir"
        >
          <div className="rounded-2xl border border-[#BFE5E1] bg-[#EAF8F6] p-6 shadow-sm lg:p-8">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#168F86]">
              Réponse immédiate
            </p>
            <p className="mt-3 text-lg font-bold leading-8 text-[#061B3A]">
              {page.immediateAnswer}
            </p>
          </div>
          <aside className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#061B3A]">À retenir</h2>
            <ul className="mt-4 space-y-3 text-sm font-bold leading-6 text-[#102A4C]">
              {page.takeaways.map((item) => (
                <li className="rounded-xl bg-[#F7FBFA] px-4 py-3" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {page.slug === "delai-de-carence-chomage" ? (
          <TrustNotice className="mt-6" tool="unemployment" />
        ) : null}

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.38fr)]">
          {page.showSalaryExamples ? (
            <SalaryExamplesTable page={page} />
          ) : (
            <ContextTable page={page} />
          )}

          {page.premiumFlow ? (
            <PremiumFlow
              intro={page.flowIntro}
              steps={page.premiumFlow}
              title={page.flowTitle}
            />
          ) : (
            <SchemaSteps
              intro={page.flowIntro}
              steps={page.schemaSteps}
              title={page.flowTitle}
            />
          )}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {page.showSalaryExamples ? <ContextTable page={page} /> : null}

          <section className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
              Étape suivante
            </h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
              Ne vous arrêtez pas au montant isolé. Relisez le droit possible,
              le délai avant paiement et les documents qui peuvent modifier le
              résultat.
            </p>
            <Link
              href={page.cta.href as Route}
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-black text-white transition hover:bg-[#168F86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22AFA3]"
            >
              {page.cta.label}
            </Link>
          </section>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.38fr)]">
          <div className="space-y-6">
            {isUnemploymentHub ? (
              <section
                className="scroll-mt-28 rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm"
                id="quelle-page-lire-selon-votre-situation"
              >
                <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
                  Quelle page lire selon votre situation ?
                </h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
                  La bonne page dépend surtout de votre question immédiate :
                  montant, délai, inscription ou reprise d&apos;emploi.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {situationLinks.map((link) => (
                    <Link
                      className="rounded-xl border border-[#E5EFF0] bg-[#F7FBFA] px-4 py-3 text-sm font-bold leading-6 text-[#102A4C] transition hover:border-[#22AFA3] hover:bg-[#EAF8F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22AFA3]"
                      href={link.href as Route}
                      key={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            {page.sections.map((section) => (
              <section
                id={getSectionAnchor(section.title)}
                key={`${page.slug}-${section.title}`}
                className="scroll-mt-28 rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm"
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

            <section
              className="scroll-mt-28 rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm"
              id="questions-frequentes"
            >
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

            <section className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
                Questions fréquentes
              </h2>
              <div className="mt-5 divide-y divide-[#E5EFF0]">
                {page.faq.map((item, index) => (
                  <details key={item.question} className="group py-4" open={index === 0}>
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
            <section className="rounded-2xl bg-[#061B3A] p-6 text-white shadow-sm">
              <h2 className="text-xl font-black">{page.cta.title}</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#D8F5F2]">
                {page.cta.body}
              </p>
              <Link
                href={page.cta.href as Route}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22AFA3]"
              >
                {page.cta.label}
              </Link>
            </section>

            <section className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#061B3A]">
                Continuer selon votre question
              </h2>
              <ul className="mt-4 space-y-3">
                {internalLinks.map((link) => (
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

function SalaryExamplesTable({ page }: { page: UnemploymentSeoPage }) {
  return (
    <div className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
        {page.examplesTitle}
      </h2>
      <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
        {page.examplesIntro}
      </p>
      <div className="mt-5 overflow-x-auto rounded-xl border border-[#E5EFF0]">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="bg-[#F7FBFA] text-[#102A4C]">
            <tr>
              <th className="px-4 py-3 font-black">Salaire brut</th>
              <th className="px-4 py-3 font-black">SJR estimé</th>
              <th className="px-4 py-3 font-black">ARE brute</th>
              <th className="px-4 py-3 font-black">ARE nette/mois</th>
              <th className="px-4 py-3 font-black">Durée</th>
              <th className="px-4 py-3 font-black">Premier paiement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5EFF0] text-[#5B6B7C]">
            {page.scenarios.map((scenario) => (
              <tr key={`${page.slug}-${scenario.salary}`}>
                <td className="px-4 py-3 font-black text-[#061B3A]">
                  {scenario.salary}
                </td>
                <td className="px-4 py-3">{scenario.sjr}</td>
                <td className="px-4 py-3">{scenario.monthlyGrossAre}</td>
                <td className="px-4 py-3 font-bold text-[#102A4C]">
                  {scenario.monthlyNetAre}
                </td>
                <td className="px-4 py-3">{scenario.duration}</td>
                <td className="px-4 py-3">{scenario.firstPayment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs font-semibold leading-5 text-[#5B6B7C]">
        Estimations pédagogiques : France Travail confirme le montant, la durée
        et la date de paiement à partir du dossier réel.
      </p>
    </div>
  );
}

function ContextTable({ page }: { page: UnemploymentSeoPage }) {
  return (
    <div className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
        {page.tableTitle}
      </h2>
      <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
        {page.tableIntro}
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-[#E5EFF0]">
        <table className="w-full border-collapse text-left text-sm">
          <tbody className="divide-y divide-[#E5EFF0]">
            {page.tableRows.map((row) => (
              <tr key={`${page.slug}-${row.label}`}>
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
  );
}

function SchemaSteps({
  intro,
  steps,
  title
}: {
  intro: string;
  steps: string[];
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
        {title}
      </h2>
      <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
        {intro}
      </p>
      <ol className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3">
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
  );
}

function PremiumFlow({
  intro,
  steps,
  title
}: {
  intro: string;
  steps: string[];
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-[#BFE5E1] bg-[#061B3A] p-6 text-white shadow-sm">
      <h2 className="text-2xl font-black tracking-[-0.01em]">
        {title}
      </h2>
      <p className="mt-3 text-sm font-semibold leading-7 text-[#D8F5F2]">
        {intro}
      </p>
      <div className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <div key={step}>
            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-black">
              {step}
            </div>
            {index < steps.length - 1 ? (
              <div className="py-2 text-center text-xl font-black text-[#8CE7DE]">
                ↓
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
