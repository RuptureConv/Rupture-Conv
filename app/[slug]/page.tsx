import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonPageLayout } from "@/components/seo/ComparisonPageLayout";
import { ProgrammaticSeoTemplate } from "@/components/seo/ProgrammaticSeoTemplate";
import { SalarySeoPageLayout } from "@/components/seo/SalarySeoPageLayout";
import { SeoContentLayout } from "@/components/seo/SeoContentLayout";
import {
  comparisonPageBySlug,
  comparisonPages
} from "@/lib/comparison-pages";
import {
  absoluteUrl,
  pillarPageBySlug,
  pillarPages
} from "@/lib/seo-content";
import { parseProgrammaticSeoSlug } from "@/lib/seo-helpers";
import { getPillarSeoSnippet } from "@/lib/seo-metadata";
import {
  salarySeoPageBySlug,
  salarySeoPages
} from "@/lib/salary-seo-pages";
import { siteName } from "@/lib/site";

type PillarPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...pillarPages.map((page) => ({ slug: page.slug })),
    ...comparisonPages.map((page) => ({ slug: page.slug })),
    ...salarySeoPages.map((page) => ({ slug: page.slug }))
  ];
}

export async function generateMetadata({
  params
}: PillarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparisonPage = comparisonPageBySlug[slug];
  const salaryPage = salarySeoPageBySlug[slug];
  const page = pillarPageBySlug[slug];

  if (salaryPage) {
    const canonicalPath = `/${salaryPage.slug}`;
    const canonicalUrl = absoluteUrl(canonicalPath);

    return {
      title: {
        absolute: salaryPage.seoTitle
      },
      description: salaryPage.description,
      alternates: {
        canonical: canonicalUrl
      },
      robots: {
        index: true,
        follow: true
      },
      openGraph: {
        title: salaryPage.seoTitle,
        description: salaryPage.description,
        url: canonicalUrl,
        siteName,
        type: "article",
        locale: "fr_FR"
      },
      twitter: {
        card: "summary",
        title: salaryPage.seoTitle,
        description: salaryPage.description
      }
    };
  }

  if (comparisonPage) {
    const canonicalPath = `/${comparisonPage.slug}`;
    const canonicalUrl = absoluteUrl(canonicalPath);

    return {
      title: {
        absolute: comparisonPage.title
      },
      description: comparisonPage.description,
      alternates: {
        canonical: canonicalUrl
      },
      robots: {
        index: true,
        follow: true
      },
      openGraph: {
        title: comparisonPage.title,
        description: comparisonPage.description,
        url: canonicalUrl,
        siteName,
        type: "article",
        locale: "fr_FR"
      },
      twitter: {
        card: "summary",
        title: comparisonPage.title,
        description: comparisonPage.description
      }
    };
  }

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
      siteName,
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
  const comparisonPage = comparisonPageBySlug[slug];
  const salaryPage = salarySeoPageBySlug[slug];
  const page = pillarPageBySlug[slug];

  if (salaryPage) {
    return <SalarySeoPageLayout page={salaryPage} />;
  }

  if (comparisonPage) {
    return <ComparisonPageLayout page={comparisonPage} />;
  }

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
      updatedAt={page.updatedAt}
      updatedLabel={page.updatedLabel}
    />
  );
}
