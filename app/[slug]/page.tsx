import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoContentLayout } from "@/components/seo/SeoContentLayout";
import {
  absoluteUrl,
  pillarPageBySlug,
  pillarPages
} from "@/lib/seo-content";

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

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: page.h1,
      description: page.description,
      url: canonicalUrl,
      type: "article",
      locale: "fr_FR"
    },
    twitter: {
      card: "summary",
      title: page.h1,
      description: page.description
    }
  };
}

export default async function PillarPage({ params }: PillarPageProps) {
  const { slug } = await params;
  const page = pillarPageBySlug[slug];

  if (!page) {
    notFound();
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
