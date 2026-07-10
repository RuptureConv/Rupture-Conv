import { describe, expect, it } from "vitest";
import { hrTools } from "@/lib/calculators/tools-registry";
import { comparisonPages } from "@/lib/comparison-pages";
import {
  salaryNextStepLinks,
  terminationNextStepLinks,
  unemploymentNextStepLinks
} from "@/lib/internal-tool-links";
import { nonCanonicalBlogSlugs } from "@/lib/legacy-routes";
import { blogPosts, pillarPages } from "@/lib/seo-content";
import { salarySeoPages } from "@/lib/salary-seo-pages";
import { unemploymentSeoPages } from "@/lib/unemployment-seo-pages";

const staticRoutes = [
  "/",
  "/blog",
  "/contact",
  "/guides-complets",
  "/mentions-legales",
  "/politique-confidentialite",
  "/politique-cookies",
  "/rupture-conventionnelle",
  "/salaire-brut-net",
  "/simulateur-chomage-rupture-conventionnelle"
];

const knownRoutes = new Set([
  ...staticRoutes,
  ...pillarPages.map((page) => `/${page.slug}`),
  ...salarySeoPages.map((page) => `/${page.slug}`),
  ...unemploymentSeoPages.map((page) => `/${page.slug}`),
  ...comparisonPages.map((page) => `/${page.slug}`),
  ...blogPosts
    .filter((post) => !nonCanonicalBlogSlugs.has(post.slug))
    .map((post) => `/blog/${post.slug}`),
  ...hrTools.map((tool) => tool.href)
]);

function canonicalPath(href: string): string {
  return href.split(/[?#]/)[0] || "/";
}

describe("SEO internal links", () => {
  it("ne pointe vers aucune route interne inconnue", () => {
    const hrefs = [
      ...pillarPages.flatMap((page) => page.relatedLinks),
      ...blogPosts.flatMap((post) => post.relatedPillars),
      ...salarySeoPages.flatMap((page) =>
        page.internalLinks.map((link) => link.href)
      ),
      ...unemploymentSeoPages.flatMap((page) => [
        page.cta.href,
        ...page.internalLinks.map((link) => link.href)
      ]),
      ...comparisonPages.flatMap((page) =>
        page.relatedLinks.map((link) => link.href)
      ),
      ...terminationNextStepLinks.map((link) => link.href),
      ...unemploymentNextStepLinks.map((link) => link.href),
      ...salaryNextStepLinks.map((link) => link.href)
    ];

    const brokenRoutes = Array.from(
      new Set(
        hrefs
          .filter((href) => href.startsWith("/") && !knownRoutes.has(canonicalPath(href)))
          .map(canonicalPath)
      )
    );

    expect(brokenRoutes).toEqual([]);
  });
});
