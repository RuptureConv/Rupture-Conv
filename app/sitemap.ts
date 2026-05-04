import type { MetadataRoute } from "next";
import { hrTools } from "@/lib/calculators/tools-registry";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/mentions-legales",
    "/politique-confidentialite",
    "/politique-cookies",
    "/contact"
  ];
  const plannedToolRoutes = hrTools
    .filter((tool) => tool.status === "planned")
    .map((tool) => tool.href);

  return [...staticRoutes, ...plannedToolRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6
  }));
}
