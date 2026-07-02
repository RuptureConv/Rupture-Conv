import Link from "next/link";
import { OfficialSourcesBlock } from "@/components/seo/OfficialSourcesBlock";
import { getSectionAnchor, PageSummary } from "@/components/seo/PageSummary";
import type { PillarPage } from "@/lib/seo-content";

type MethodologyPageProps = {
  page: PillarPage;
};

export function MethodologyPage({ page }: MethodologyPageProps) {
  return (
    <main className="min-h-screen bg-[#F7FBFA]">
      <article className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6 lg:py-16">
        <Link
          className="inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
          href="/"
        >
          ← Retour à l’accueil
        </Link>

        <header className="mt-8 rounded-3xl border border-[#E5EEF0] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
            Méthode et sources
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl">
            {page.h1}
          </h1>
          <div className="mt-5 space-y-4 text-base leading-8 text-[#5B6B7C] sm:text-lg">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {page.updatedLabel ? (
            <p className="mt-5 rounded-xl bg-[#F7FBFA] p-4 text-sm font-bold text-[#102A4C]">
              {page.updatedLabel}
            </p>
          ) : null}
        </header>

        <div className="mt-8 space-y-8">
          <PageSummary sections={page.sections.map((section) => section.title)} />
          <OfficialSourcesBlock />

          {page.sections.map((section) => (
            <section
              className="scroll-mt-28 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm"
              id={getSectionAnchor(section.title)}
              key={section.title}
            >
              <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-2xl border border-[#BFE5E1] bg-[#EAF8F6] p-6">
            <h2 className="text-xl font-black text-[#061B3A]">
              Utiliser le résultat comme un repère
            </h2>
            <div className="mt-3 space-y-3 text-sm font-semibold leading-7 text-[#102A4C]">
              {page.conclusion.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
