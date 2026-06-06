import { describe, expect, it } from "vitest";
import {
  unemploymentSeoPageBySlug,
  unemploymentSeoPages
} from "@/lib/unemployment-seo-pages";

const requestedSlugs = [
  "chomage",
  "calcul-chomage",
  "chomage-apres-rupture-conventionnelle",
  "combien-vais-je-toucher-au-chomage",
  "are-2026",
  "delai-carence-chomage",
  "conditions-pour-toucher-le-chomage",
  "duree-indemnisation-chomage",
  "cumul-salaire-et-chomage",
  "chomage-apres-cdi",
  "chomage-apres-cdd",
  "chomage-apres-licenciement",
  "comment-est-calcule-le-sjr",
  "france-travail-inscription",
  "chomage-et-conges-payes",
  "rupture-conventionnelle-et-are"
];

describe("unemployment SEO pages", () => {
  it("creates every requested chômage and ARE page", () => {
    for (const slug of requestedSlugs) {
      expect(unemploymentSeoPageBySlug[slug]?.title).toBeTruthy();
    }
  });

  it("keeps slugs, titles and descriptions unique", () => {
    const slugs = new Set(unemploymentSeoPages.map((page) => page.slug));
    const titles = new Set(unemploymentSeoPages.map((page) => page.title));
    const descriptions = new Set(
      unemploymentSeoPages.map((page) => page.description)
    );

    expect(slugs.size).toBe(unemploymentSeoPages.length);
    expect(titles.size).toBe(unemploymentSeoPages.length);
    expect(descriptions.size).toBe(unemploymentSeoPages.length);
  });

  it("keeps every page above the editorial floor", () => {
    for (const page of unemploymentSeoPages) {
      expect(page.immediateAnswer.length).toBeGreaterThan(120);
      expect(page.sections.length).toBeGreaterThanOrEqual(5);
      expect(page.scenarios.map((scenario) => scenario.salary)).toEqual([
        "1 800 €",
        "2 500 €",
        "3 000 €",
        "4 000 €"
      ]);
      expect(page.tableRows.length).toBeGreaterThanOrEqual(5);
      expect(page.schemaSteps.length).toBeGreaterThanOrEqual(5);
      expect(page.mistakes.length).toBeGreaterThanOrEqual(5);
      expect(page.faq.length).toBeGreaterThanOrEqual(5);
      expect(page.internalLinks.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("adds premium visual flows on the priority pages", () => {
    for (const slug of [
      "calcul-chomage",
      "chomage-apres-rupture-conventionnelle",
      "combien-vais-je-toucher-au-chomage",
      "delai-carence-chomage",
      "rupture-conventionnelle-et-are"
    ]) {
      expect(unemploymentSeoPageBySlug[slug]?.premiumFlow).toEqual([
        "Salaire brut moyen",
        "Calcul du SJR",
        "Calcul ARE",
        "Différés éventuels",
        "Montant versé"
      ]);
    }
  });
});
