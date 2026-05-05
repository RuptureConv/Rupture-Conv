import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoContentLayout } from "@/components/seo/SeoContentLayout";
import {
  absoluteUrl,
  blogPostBySlug,
  blogPosts
} from "@/lib/seo-content";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug[slug];

  if (!post) {
    return {};
  }

  const canonicalPath = `/blog/${post.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  return {
    title: `${post.title} | RuptureConv`,
    description: post.description,

    alternates: {
      canonical: canonicalUrl
    },

    robots: {
      index: true,
      follow: true
    },

    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      locale: "fr_FR"
    },

    twitter: {
      card: "summary",
      title: post.title,
      description: post.description
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
      canonicalPath={`/blog/${post.slug}`}
      conclusion={[
        "Le bon calcul dépend toujours de données concrètes : dates, salaire brut, ancienneté, primes, absences et convention collective. Une méthode rigoureuse évite les écarts les plus courants.",
        "Pour passer de la théorie à un ordre de grandeur personnalisé, lancez le simulateur puis relisez le résultat avec les documents de paie et les règles applicables."
      ]}
      faq={post.faq}
      h1={post.title}
      intro={post.intro}
      relatedLinks={post.relatedPillars}
      sections={post.sections}
    />
  );
}
