import type { MetadataRoute } from "next";
import { hrTools } from "@/lib/calculators/tools-registry";
import { comparisonPages } from "@/lib/comparison-pages";
import { nonCanonicalBlogSlugs } from "@/lib/legacy-routes";
import { parseProgrammaticSeoSlug } from "@/lib/seo-helpers";
import { blogPosts, pillarPageBySlug, pillarPages } from "@/lib/seo-content";
import { salarySeoPages } from "@/lib/salary-seo-pages";
import { siteUrl } from "@/lib/site";
import { toolContentBySlug } from "@/lib/tools-content";
import { unemploymentSeoPages } from "@/lib/unemployment-seo-pages";

const NON_CANONICAL_BLOG_SLUGS = new Set(
  blogPosts
    .filter((post) => pillarPageBySlug[post.slug])
    .map((post) => post.slug)
    .concat([...nonCanonicalBlogSlugs])
);

const UNEMPLOYMENT_SEO_SLUGS = new Set(
  unemploymentSeoPages.map((page) => page.slug)
);

const NON_CANONICAL_SEO_SLUGS = new Set([
  "chomage",
  "calcul-chomage",
  "delai-carence-chomage",
  "cumul-salaire-et-chomage",
  "chomage-apres-cdd",
  "rupture-conventionnelle-et-are",
  "comment-est-calcule-le-sjr"
]);

function getMainPages(): string[] {
  return [
    "",
    "/rupture-conventionnelle",
    "/simulateur-rupture-conventionnelle",
    "/simulateur-chomage-rupture-conventionnelle",
    "/salaire-brut-net",
    "/guides-complets"
  ];
}

function getSeoPages(): string[] {
  return [
    ...pillarPages
      .filter((page) => page.slug !== "simulateur-rupture-conventionnelle")
      .filter((page) => !UNEMPLOYMENT_SEO_SLUGS.has(page.slug))
      .filter((page) => !NON_CANONICAL_SEO_SLUGS.has(page.slug))
      .filter((page) => !parseProgrammaticSeoSlug(page.slug))
      .filter((page) => !["a-propos", "sources-juridiques"].includes(page.slug))
      .map((page) => `/${page.slug}`),
    ...comparisonPages.map((page) => `/${page.slug}`)
  ];
}

function getProgrammaticPages(): string[] {
  return pillarPages
    .filter((page) => parseProgrammaticSeoSlug(page.slug))
    .map((page) => `/${page.slug}`);
}

function getBlogPages(): string[] {
  return [
    "/blog",
    ...blogPosts
      .filter((post) => !NON_CANONICAL_BLOG_SLUGS.has(post.slug))
      .map((post) => `/blog/${post.slug}`)
  ];
}

function getToolPages(): string[] {
  return hrTools
    .filter((tool) => tool.status === "planned" && toolContentBySlug[tool.id])
    .map((tool) => tool.href);
}

function getLegalPages(): string[] {
  return [
    "/mentions-legales",
    "/politique-confidentialite",
    "/politique-cookies",
    "/contact",
    "/a-propos",
    "/sources-juridiques"
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set([
    ...getMainPages(),
    ...getSeoPages(),
    ...salarySeoPages.map((page) => `/${page.slug}`),
    ...unemploymentSeoPages.map((page) => `/${page.slug}`),
    ...getProgrammaticPages(),
    ...getBlogPages(),
    ...getToolPages(),
    ...getLegalPages()
  ]);

  return [...paths].map((path) => ({
    url: `${siteUrl}${path}`
  }));
}
