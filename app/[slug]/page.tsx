import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticSeoTemplate } from "@/components/seo/ProgrammaticSeoTemplate";
import { SeoContentLayout } from "@/components/seo/SeoContentLayout";
import {
  absoluteUrl,
  pillarPageBySlug,
  pillarPages
} from "@/lib/seo-content";
import { parseProgrammaticSeoSlug } from "@/lib/seo-helpers";
import { getPillarSeoSnippet } from "@/lib/seo-metadata";

type PillarPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return pillarPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: PillarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pillarPageBySlug[slug];

  if (!page) {
    return {};
  }

  const canonicalPath = `/${page.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const programmaticParams = parseProgrammaticSeoSlug(slug);
  const seoSnippet = getPillarSeoSnippet(page, programmaticParams);

  return {
    title: {
      absolute: seoSnippet.title
    },
    description: seoSnippet.description,
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: seoSnippet.title,
      description: seoSnippet.description,
      url: canonicalUrl,
      type: "article",
      locale: "fr_FR"
    },
    twitter: {
      card: "summary",
      title: seoSnippet.title,
      description: seoSnippet.description
    }
  };
}

export default async function PillarPage({ params }: PillarPageProps) {
  const { slug } = await params;
  const page = pillarPageBySlug[slug];

  if (!page) {
    notFound();
  }

  const programmaticParams = parseProgrammaticSeoSlug(slug);

  if (programmaticParams) {
    return (
      <ProgrammaticSeoTemplate
        canonicalPath={`/${page.slug}`}
        type={programmaticParams.type}
        value={programmaticParams.value}
      />
    );
  }

  return (
    <SeoContentLayout
      canonicalPath={`/${page.slug}`}
      conclusion={page.conclusion}
      faq={page.faq}
      h1={page.h1}
      intro={page.intro}
      relatedLinks={page.relatedLinks}
      sections={page.sections}
    />
  );
}
