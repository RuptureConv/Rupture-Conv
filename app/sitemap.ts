import type { MetadataRoute } from "next";
import { hrTools } from "@/lib/calculators/tools-registry";
import { comparisonPages } from "@/lib/comparison-pages";
import { parseProgrammaticSeoSlug } from "@/lib/seo-helpers";
import { blogPosts, pillarPageBySlug, pillarPages } from "@/lib/seo-content";
import { salarySeoPages } from "@/lib/salary-seo-pages";
import { siteUrl } from "@/lib/site";
import { unemploymentSeoPages } from "@/lib/unemployment-seo-pages";

type SitemapRoute = {
  path: string;
  lastModified: Date;
  priority: number;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
};

const NON_CANONICAL_BLOG_SLUGS = new Set(
  blogPosts
    .filter((post) => pillarPageBySlug[post.slug])
    .map((post) => post.slug)
);

const REFORM_2026_SLUGS = new Set([
  "reforme-rupture-conventionnelle-2026",
  "rupture-conventionnelle-chomage-2026",
  "rupture-conventionnelle-senior-55-ans-2026",
  "rupture-conventionnelle-employeur-cout-2026",
  "rupture-conventionnelle-avant-apres-reforme-2026"
]);

const REFORM_2026_LAST_MODIFIED = new Date("2026-06-03T08:00:00.000Z");
const UNEMPLOYMENT_SEO_SLUGS = new Set(
  unemploymentSeoPages.map((page) => page.slug)
);

function daysAgo(days: number): Date {
  const date = new Date();
  date.setUTCHours(8, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - days);
  return date;
}

function getStableOffset(path: string, maxDays: number): number {
  const checksum = Array.from(path).reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  );

  return checksum % maxDays;
}

function createRoute(
  path: string,
  priority: SitemapRoute["priority"],
  changeFrequency: SitemapRoute["changeFrequency"],
  freshnessWindowDays: number
): SitemapRoute {
  return {
    path,
    lastModified: daysAgo(getStableOffset(path || "/", freshnessWindowDays)),
    priority,
    changeFrequency
  };
}

function getMainPages(): SitemapRoute[] {
  return [
    {
      path: "",
      lastModified: daysAgo(0),
      priority: 1,
      changeFrequency: "weekly"
    },
    createRoute("/rupture-conventionnelle", 1, "weekly", 7),
    createRoute("/simulateur-rupture-conventionnelle", 1, "weekly", 7),
    createRoute("/simulateur-chomage-rupture-conventionnelle", 1, "weekly", 7),
    createRoute("/salaire-brut-net", 0.9, "weekly", 14)
  ];
}

function getSeoPages(): SitemapRoute[] {
  return [
    ...pillarPages
      .filter((page) => page.slug !== "simulateur-rupture-conventionnelle")
      .filter((page) => !UNEMPLOYMENT_SEO_SLUGS.has(page.slug))
      .filter((page) => !parseProgrammaticSeoSlug(page.slug))
      .filter((page) => !["a-propos", "sources-juridiques"].includes(page.slug))
      .map((page) => {
        if (REFORM_2026_SLUGS.has(page.slug)) {
          return {
            path: `/${page.slug}`,
            lastModified: REFORM_2026_LAST_MODIFIED,
            priority: page.slug === "reforme-rupture-conventionnelle-2026" ? 1 : 0.9,
            changeFrequency: "daily" as const
          };
        }

        return createRoute(`/${page.slug}`, 0.9, "weekly", 14);
      }),
    ...comparisonPages.map((page) => createRoute(`/${page.slug}`, 0.9, "weekly", 14))
  ];
}

function getSalarySeoPages(): SitemapRoute[] {
  return salarySeoPages.map((page) =>
    createRoute(`/${page.slug}`, page.category === "Smic" ? 0.85 : 0.8, "monthly", 21)
  );
}

function getUnemploymentSeoPages(): SitemapRoute[] {
  return unemploymentSeoPages.map((page) =>
    createRoute(`/${page.slug}`, page.slug === "chomage" ? 1 : 0.9, "weekly", 14)
  );
}

function getProgrammaticPages(): SitemapRoute[] {
  return pillarPages
    .filter((page) => parseProgrammaticSeoSlug(page.slug))
    .map((page) => createRoute(`/${page.slug}`, 0.7, "monthly", 45));
}

function getBlogPages(): SitemapRoute[] {
  return [
    createRoute("/blog", 0.6, "monthly", 21),
    ...blogPosts
      .filter((post) => !NON_CANONICAL_BLOG_SLUGS.has(post.slug))
      .map((post) => createRoute(`/blog/${post.slug}`, 0.6, "monthly", 60))
  ];
}

function getToolPages(): SitemapRoute[] {
  return hrTools
    .filter((tool) => tool.status === "planned")
    .map((tool) => createRoute(tool.href, 0.6, "monthly", 45));
}

function getLegalPages(): SitemapRoute[] {
  return [
    {
      path: "/mentions-legales",
      lastModified: daysAgo(120),
      priority: 0.4,
      changeFrequency: "yearly"
    },
    {
      path: "/politique-confidentialite",
      lastModified: daysAgo(120),
      priority: 0.4,
      changeFrequency: "yearly"
    },
    {
      path: "/politique-cookies",
      lastModified: daysAgo(120),
      priority: 0.4,
      changeFrequency: "yearly"
    },
    {
      path: "/contact",
      lastModified: daysAgo(90),
      priority: 0.3,
      changeFrequency: "yearly"
    },
    createRoute("/a-propos", 0.5, "yearly", 120),
    createRoute("/sources-juridiques", 0.5, "yearly", 120)
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const allRoutes: SitemapRoute[] = [
    ...getMainPages(),
    ...getSeoPages(),
    ...getSalarySeoPages(),
    ...getUnemploymentSeoPages(),
    ...getProgrammaticPages(),
    ...getBlogPages(),
    ...getToolPages(),
    ...getLegalPages()
  ];

  return allRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
