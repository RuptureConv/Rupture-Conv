import type { Metadata } from "next";
import Link from "next/link";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { comparisonPages } from "@/lib/comparison-pages";
import {
  absoluteUrl,
  blogPosts,
  pillarPages
} from "@/lib/seo-content";
import { blogIndexSeoSnippet } from "@/lib/seo-metadata";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: blogIndexSeoSnippet.title
  },
  description: blogIndexSeoSnippet.description,
  alternates: {
    canonical: absoluteUrl("/blog")
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: blogIndexSeoSnippet.title,
    description: blogIndexSeoSnippet.description,
    url: absoluteUrl("/blog"),
    siteName,
    type: "website",
    locale: "fr_FR"
  },
  twitter: {
    card: "summary",
    title: blogIndexSeoSnippet.title,
    description: blogIndexSeoSnippet.description
  }
};

export default function BlogIndexPage() {
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
        name: "Blog",
        item: absoluteUrl("/blog")
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#F7FBFA]">
      <SeoJsonLd data={breadcrumbJsonLd} />
      <section className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6 lg:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
        >
          Retour au simulateur
        </Link>

        <header className="rounded-3xl border border-[#E5EEF0] bg-white p-6 shadow-sm sm:p-8">
          <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#168F86]">
            Ressources RH
          </p>
          <h1 className="mt-5 text-3xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl">
            Blog rupture conventionnelle
          </h1>
          <p className="mt-5 text-base leading-8 text-[#5B6B7C] sm:text-lg">
            Guides pratiques pour comprendre le calcul d&apos;indemnité, comparer les
            options de rupture du CDI, préparer une négociation et utiliser le
            simulateur avec des données plus fiables.
          </p>
        </header>

        <section className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#061B3A]">
            Comparatifs populaires
          </h2>
          <ul className="mt-4 grid gap-3 text-sm font-semibold leading-7 text-[#102A4C] sm:grid-cols-3">
            {comparisonPages.map((page) => (
              <li key={page.slug}>
                <Link
                  className="block rounded-2xl bg-[#F7FBFA] px-4 py-3 transition hover:bg-[#EAF8F6] hover:text-[#168F86]"
                  href={`/${page.slug}`}
                >
                  {page.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#061B3A]">Pages piliers</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm font-semibold leading-7 text-[#102A4C]">
            {pillarPages.map((page) => (
              <li key={page.slug}>
                <Link className="transition hover:text-[#22AFA3]" href={`/${page.slug}`}>
                  {page.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 grid gap-5">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
                <Link className="transition hover:text-[#22AFA3]" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-base leading-8 text-[#5B6B7C]">
                {post.description}
              </p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
