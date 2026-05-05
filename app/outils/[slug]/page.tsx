import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hrTools } from "@/lib/calculators/tools-registry";
import { toolContentBySlug } from "@/lib/tools-content";

type ToolPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return hrTools
    .filter((tool) => tool.status === "planned")
    .map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({
  params
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = hrTools.find((item) => item.id === slug);

  if (!tool) {
    return {};
  }

  const content = toolContentBySlug[slug];

  return {
    title: content?.metaTitle ?? `${tool.title} | Guide RH à venir`,
    description:
      content?.metaDescription ??
      `${tool.description} Page préparée pour les prochains outils RH de rupture-conv.fr.`
  };
}

export default async function FutureToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = hrTools.find((item) => item.id === slug);

  if (!tool || tool.status !== "planned") {
    notFound();
  }

  const content = toolContentBySlug[slug];

  if (content) {
    return (
      <main className="min-h-screen bg-[#F7FBFA]">
        <article className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6 lg:py-16">
          <Link
            href="/"
            className="mb-8 inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
          >
            Retour au simulateur
          </Link>

          <header className="rounded-3xl border border-[#E5EEF0] bg-white p-6 shadow-sm sm:p-8">
            <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#168F86]">
              Guide RH
            </p>
            <h1 className="mt-5 text-3xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-[#5B6B7C] sm:text-lg">
              {content.intro}
            </p>
          </header>

          <div className="mt-10 space-y-10">
            {content.sections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm"
              >
                <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
                  {section.paragraphs?.map((paragraph) => (
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

          <aside className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-[#061B3A]">
              Estimer une rupture conventionnelle
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#5B6B7C]">
              Utilisez le simulateur principal pour obtenir une estimation
              indicative de l’indemnité brute, du net indicatif et de la base de
              calcul retenue.
            </p>
            <Link
              href="/#simulateur"
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
            >
              Ouvrir le simulateur →
            </Link>
          </aside>
        </article>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
      >
        Retour au simulateur
      </Link>
      <section className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
        <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold text-[#22AFA3]">
          Outil RH en préparation
        </p>
        <h1 className="mt-4 text-3xl font-bold text-[#061B3A]">{tool.title}</h1>
        <p className="mt-3 text-base leading-7 text-[#5B6B7C]">{tool.description}</p>
        <p className="mt-4 text-sm leading-6 text-[#5B6B7C]">
          Cette page réserve l&apos;emplacement du futur outil afin de préparer
          le maillage interne, les contenus SEO et l&apos;extension progressive de
          rupture-conv.fr.
        </p>
      </section>
    </main>
  );
}
