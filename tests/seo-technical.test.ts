import { describe, expect, it } from "vitest";
import { metadata as rootMetadata } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { generateMetadata as generateDynamicMetadata } from "@/app/[slug]/page";
import { generateMetadata as generateToolMetadata } from "@/app/outils/[slug]/page";
import { serializeJsonLd } from "@/lib/json-ld";
import { homeSeoSnippet, getPillarSeoSnippet } from "@/lib/seo-metadata";
import { pillarPageBySlug } from "@/lib/seo-content";
import { siteUrl } from "@/lib/site";
import { buildWebApplicationStructuredData } from "@/lib/structured-data";

const importantPaths = [
  "",
  "/simulateur-rupture-conventionnelle",
  "/simulateur-chomage-rupture-conventionnelle",
  "/salaire-brut-net",
  "/rupture-conventionnelle",
  "/chomage-are",
  "/delai-de-carence-chomage",
  "/modele-lettre-rupture-conventionnelle",
  "/guide-preavis"
];

describe("technical SEO foundations", () => {
  it("génère un sitemap canonique, unique et sans date artificielle", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url === siteUrl || url.startsWith(`${siteUrl}/`))).toBe(true);
    expect(urls.some((url) => url.includes("localhost"))).toBe(false);
    expect(urls.some((url) => new URL(url).pathname.includes("//"))).toBe(false);

    for (const path of importantPaths) {
      expect(urls).toContain(`${siteUrl}${path}`);
    }

    expect(urls).not.toContain(`${siteUrl}/outils/conges-payes`);
    expect(urls).not.toContain(
      `${siteUrl}/blog/rupture-conventionnelle-ou-licenciement-que-choisir`
    );
    expect(entries.every((entry) => !("lastModified" in entry))).toBe(true);
  });

  it("autorise le crawl public et déclare le sitemap canonique", () => {
    const rules = robots();

    expect(rules.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(rules.sitemap).toBe(`${siteUrl}/sitemap.xml`);
    expect(rules.host).toBe(siteUrl);
  });

  it("verrouille metadataBase et les canonical sur le domaine de production", async () => {
    expect(rootMetadata.metadataBase?.toString()).toBe(`${siteUrl}/`);

    for (const slug of ["simulateur-rupture-conventionnelle", "chomage-are", "salaire"]) {
      const metadata = await generateDynamicMetadata({
        params: Promise.resolve({ slug })
      });
      const canonical = metadata.alternates?.canonical;

      expect(String(canonical)).toBe(`${siteUrl}/${slug}`);
    }
  });

  it("garde la route d’outil sans contenu hors index", async () => {
    const metadata = await generateToolMetadata({
      params: Promise.resolve({ slug: "conges-payes" })
    });

    expect(metadata.robots).toMatchObject({ index: false, follow: true });
  });

  it("évite le doublon de title entre accueil et page simulateur", () => {
    const simulatorPage = pillarPageBySlug["simulateur-rupture-conventionnelle"];
    const simulatorSnippet = getPillarSeoSnippet(simulatorPage);

    expect(homeSeoSnippet.title).not.toBe(simulatorSnippet.title);
    expect(homeSeoSnippet.description).toContain("indicatif");
  });

  it("garde les titles programmatiques d’ancienneté lisibles dans la SERP", () => {
    for (const years of [1, 10, 25, 40]) {
      const page = pillarPageBySlug[`indemnite-rupture-conventionnelle-${years}-ans`];
      const snippet = getPillarSeoSnippet(page, {
        type: "anciennete",
        value: years
      });

      expect(snippet.title.length).toBeLessThanOrEqual(60);
      expect(snippet.title).toContain(`${years} ${years === 1 ? "an" : "ans"}`);
    }
  });

  it("produit un WebApplication valide et sans schéma commercial ou avis", () => {
    const data = buildWebApplicationStructuredData({
      name: "Simulateur de rupture conventionnelle",
      url: `${siteUrl}/`,
      description: "Estimation indicative d’une indemnité.",
      applicationCategory: "BusinessApplication"
    });
    const serialized = serializeJsonLd(data);

    expect(JSON.parse(serialized)).toEqual(data);
    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      isAccessibleForFree: true
    });

    for (const forbiddenField of [
      "offers",
      "review",
      "aggregateRating",
      "Product",
      "HowTo",
      "SearchAction"
    ]) {
      expect(serialized).not.toContain(forbiddenField);
    }
  });
});
