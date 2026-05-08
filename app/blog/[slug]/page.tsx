import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoContentLayout } from "@/components/seo/SeoContentLayout";
import {
  absoluteUrl,
  blogPostBySlug,
  blogPosts,
  pillarPageBySlug
} from "@/lib/seo-content";
import { getBlogSeoSnippet } from "@/lib/seo-metadata";
import { siteName } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function getCanonicalPath(slug: string): string {
  if (pillarPageBySlug[slug]) {
    return `/${slug}`;
  }

  return `/blog/${slug}`;
}

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug[slug];

  if (!post) {
    return {};
  }

  const canonicalPath = getCanonicalPath(post.slug);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const seoSnippet = getBlogSeoSnippet(post);

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPostBySlug[slug];

  if (!post) {
    notFound();
  }

  return (
    <SeoContentLayout
      canonicalPath={getCanonicalPath(post.slug)}
      conclusion={[
        "Le bon calcul dépend toujours de données concrètes : dates, salaire brut, ancienneté, primes, absences et convention collective. Une méthode rigoureuse évite les écarts les plus courants.",
        "Lancez une simulation avec vos propres données, puis relisez le résultat avec les documents de paie et les règles applicables."
      ]}
      faq={post.faq}
      h1={post.title}
      intro={post.intro}
      relatedLinks={post.relatedPillars}
      sections={post.sections}
    />
  );
}
