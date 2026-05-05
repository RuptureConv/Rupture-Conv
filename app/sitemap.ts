import type { MetadataRoute } from "next";
import { hrTools } from "@/lib/calculators/tools-registry";
import { blogPosts, pillarPages } from "@/lib/seo-content";
import { siteUrl } from "@/lib/site";

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: SitemapRoute[] = [
    {
      path: "",
      priority: 1,
      changeFrequency: "weekly"
    },
    {
      path: "/mentions-legales",
      priority: 0.5,
      changeFrequency: "yearly"
    },
    {
      path: "/politique-confidentialite",
      priority: 0.5,
      changeFrequency: "yearly"
    },
    {
      path: "/politique-cookies",
      priority: 0.5,
      changeFrequency: "yearly"
    },
    {
      path: "/contact",
      priority: 0.5,
      changeFrequency: "yearly"
    }
  ];

  const pillarRoutes: SitemapRoute[] = pillarPages.map((page) => ({
    path: `/${page.slug}`,
    priority: 0.9,
    changeFrequency: "weekly"
  }));

  const blogRoutes: SitemapRoute[] = [
    {
      path: "/blog",
      priority: 0.85,
      changeFrequency: "weekly"
    },
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const
    }))
  ];

  const plannedToolRoutes: SitemapRoute[] = hrTools
    .filter((tool) => tool.status === "planned")
    .map((tool) => ({
      path: tool.href,
      priority: 0.6,
      changeFrequency: "monthly"
    }));

  const allRoutes: SitemapRoute[] = [
    ...staticRoutes,
    ...pillarRoutes,
    ...blogRoutes,
    ...plannedToolRoutes
  ];

  return allRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}