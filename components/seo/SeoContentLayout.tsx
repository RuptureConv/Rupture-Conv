import Link from "next/link";
import type { Route } from "next";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import type { FaqEntry, SeoSection } from "@/lib/seo-content";
import { absoluteUrl, mandatoryDisclaimer } from "@/lib/seo-content";

type SeoContentLayoutProps = {
  canonicalPath: string;
  conclusion: string[];
  faq: FaqEntry[];
  h1: string;
  intro: string[];
  relatedLinks: string[];
  sections: SeoSection[];
};

function formatRelatedLinkLabel(href: string) {
  return href
    .replace(/^\/blog\//, "Article : ")
    .replace(/^\//, "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function SeoContentLayout({
  canonicalPath,
  conclusion,
  faq,
  h1,
  intro,
  relatedLinks,
  sections
}: SeoContentLayoutProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
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
        name: h1,
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
            Guide rupture conventionnelle
          </p>

          <h1 className="mt-5 text-3xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl">
            {h1}
          </h1>

          <div className="mt-5 space-y-4 text-base leading-8 text-[#5B6B7C] sm:text-lg">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Link
            href="/#simulateur"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
          >
            Faire une simulation gratuite →
          </Link>
        </header>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
                {section.title}
              </h2>

              <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.bullets ? (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#061B3A]">
            Questions fréquentes
          </h2>

          <div className="mt-5 divide-y divide-[#E5EEF0]">
            {faq.map((item, index) => (
              <details key={item.question} className="group py-5" open={index === 0}>
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

        <section className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#061B3A]">Conclusion</h2>

          <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
            {conclusion.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <p className="rounded-2xl bg-[#F7FBFA] p-4 text-sm font-semibold leading-7 text-[#102A4C]">
              {mandatoryDisclaimer}
            </p>
          </div>

          <Link
            href="/#simulateur"
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
          >
            Ouvrir le simulateur →
          </Link>
        </section>

        {relatedLinks.length > 0 ? (
          <nav
            aria-label="Pages complémentaires"
            className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm"
          >
            <h2 className="text-2xl font-extrabold text-[#061B3A]">
              À lire aussi
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm font-semibold leading-7 text-[#102A4C]">
              {relatedLinks.map((href) => (
                <li key={href}>
                  <Link
                    className="transition hover:text-[#22AFA3]"
                    href={href as Route}
                  >
                    {formatRelatedLinkLabel(href)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </article>
    </main>
  );
}