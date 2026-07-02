import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { officialSources } from "@/lib/official-sources";
import { pillarPageBySlug } from "@/lib/seo-content";
import { siteUrl } from "@/lib/site";

const officialHosts = new Set([
  "www.service-public.gouv.fr",
  "www.legifrance.gouv.fr",
  "www.francetravail.fr",
  "mon-entreprise.urssaf.fr"
]);

function read(path: string) {
  return readFileSync(path, "utf8");
}

describe("trust and methodology", () => {
  it("utilise uniquement des sources officielles vérifiées en HTTPS", () => {
    expect(officialSources).toHaveLength(4);

    for (const source of officialSources) {
      const url = new URL(source.url);

      expect(url.protocol).toBe("https:");
      expect(officialHosts.has(url.hostname), source.url).toBe(true);
      expect(source.label.trim().length).toBeGreaterThan(8);
      expect(source.description.trim().length).toBeGreaterThan(20);
      expect(source.topics.length).toBeGreaterThan(0);
    }
  });

  it("renforce la page existante de méthodologie sans créer une nouvelle route", () => {
    const page = pillarPageBySlug["sources-juridiques"];
    const sitemapUrls = sitemap().map((entry) => entry.url);

    expect(page.h1).toBe("Méthodologie des estimations");
    expect(page.updatedAt).toBe("2026-07-02");
    expect(page.sections.map((section) => section.title)).toEqual(
      expect.arrayContaining([
        "À quoi servent les simulateurs ?",
        "Ce que les calculs prennent en compte",
        "Pourquoi les résultats restent indicatifs",
        "Ce que les calculs ne remplacent pas",
        "Quand vérifier votre situation"
      ])
    );
    expect(sitemapUrls).toContain(`${siteUrl}/sources-juridiques`);
  });

  it("garde un lien de confiance discret et des notices sur les trois résultats", () => {
    const footer = read("components/Footer.tsx");
    const termination = read("components/tools/TerminationCalculatorTool.tsx");
    const unemployment = read("components/tools/UnemploymentProjectionTool.tsx");
    const salary = read("components/tools/SalaryNetCalculatorTool.tsx");

    expect(footer).toContain('href="/sources-juridiques"');
    expect(termination).toContain('<TrustNotice className="mt-4" tool="termination" />');
    expect(unemployment).toContain('<TrustNotice tool="unemployment" />');
    expect(salary).toContain('<TrustNotice className="mt-4" tool="salary" />');
  });

  it("rappelle que le modèle de lettre doit être adapté avant envoi", () => {
    const source = read("components/seo/ProfessionalLetterBlock.tsx");

    expect(source).toContain("À adapter avant envoi");
    expect(source).toContain("libre de l’accepter ou de la");
  });
});
