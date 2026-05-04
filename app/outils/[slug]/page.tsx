import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hrTools } from "@/lib/calculators/tools-registry";

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

  return {
    title: `${tool.title} | Outil RH à venir`,
    description: `${tool.description} Page préparée pour les prochains outils RH de rupture-conv.fr.`
  };
}

export default async function FutureToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = hrTools.find((item) => item.id === slug);

  if (!tool || tool.status !== "planned") {
    notFound();
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
