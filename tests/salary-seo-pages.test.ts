import { describe, expect, it } from "vitest";
import { calculateSalaryNet, smicReference } from "@/lib/calculators/salary-net";
import {
  getSalarySeoExample,
  salarySeoPageBySlug,
  salarySeoPages
} from "@/lib/salary-seo-pages";

describe("salary SEO pages", () => {
  it("creates the expected salary SEO cluster", () => {
    expect(salarySeoPages).toHaveLength(40);
    expect(salarySeoPageBySlug["salaire-brut-net-cadre"]?.title).toContain(
      "Salaire brut en net cadre"
    );
    expect(salarySeoPageBySlug["4000-brut-en-net"]?.category).toBe(
      "Montant mensuel"
    );
    expect(salarySeoPageBySlug["smic-brut-net"]?.category).toBe("Smic");
  });

  it("keeps slugs, titles and descriptions unique", () => {
    const slugs = new Set(salarySeoPages.map((page) => page.slug));
    const titles = new Set(salarySeoPages.map((page) => page.title));
    const descriptions = new Set(salarySeoPages.map((page) => page.description));

    expect(slugs.size).toBe(salarySeoPages.length);
    expect(titles.size).toBe(salarySeoPages.length);
    expect(descriptions.size).toBe(salarySeoPages.length);
  });

  it("keeps every page above the editorial minimum", () => {
    for (const page of salarySeoPages) {
      expect(page.title.length).toBeGreaterThan(20);
      expect(page.excerpt.length).toBeGreaterThan(80);
      expect(page.sections.length).toBeGreaterThanOrEqual(5);
      expect(page.sections.length).toBeLessThanOrEqual(7);
      expect(page.examples.length).toBeGreaterThanOrEqual(1);
      expect(page.faq.length).toBeGreaterThanOrEqual(4);
      expect(page.internalLinks.length).toBeGreaterThanOrEqual(4);
      expect(page.warning.length).toBeGreaterThan(120);
      expect(page.cta.body).toContain("simulateur");
    }
  });

  it("uses the central salary calculator for examples", () => {
    const seoExample = getSalarySeoExample(
      2000,
      "monthly",
      "privateNonExecutive",
      5
    );
    const calculatorResult = calculateSalaryNet({
      grossAmount: 2000,
      period: "monthly",
      profile: "privateNonExecutive",
      withholdingTaxRate: 5
    });

    expect(seoExample.netMonthly).toBe("1 560,00 €");
    expect(calculatorResult.netBeforeTaxMonthly).toBe(1560);
    expect(seoExample.netAfterTaxMonthly).toBe("1 482,00 €");
  });

  it("centralizes Smic reference values", () => {
    const smicPage = salarySeoPageBySlug["smic-brut-net"];

    expect(smicReference.effectiveDate).toBe("2026-06-01");
    expect(smicPage?.excerpt).toContain("1 867,02 €");
    expect(smicPage?.warning).toContain("maintenus à jour");
  });
});
