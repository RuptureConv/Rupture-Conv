import type { MetadataRoute } from "next";
import { hrTools } from "@/lib/calculators/tools-registry";
import { parseProgrammaticSeoSlug } from "@/lib/seo-helpers";
import { blogPosts, pillarPageBySlug, pillarPages } from "@/lib/seo-content";
import { siteUrl } from "@/lib/site";

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
    createRoute("/simulateur-rupture-conventionnelle", 1, "weekly", 7)
  ];
}

function getSeoPages(): SitemapRoute[] {
  return pillarPages
    .filter((page) => page.slug !== "simulateur-rupture-conventionnelle")
    .filter((page) => !parseProgrammaticSeoSlug(page.slug))
    .filter((page) => !["a-propos", "sources-juridiques"].includes(page.slug))
    .map((page) => createRoute(`/${page.slug}`, 0.9, "weekly", 14));
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
