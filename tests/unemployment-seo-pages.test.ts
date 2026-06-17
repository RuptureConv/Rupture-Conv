import { describe, expect, it } from "vitest";
import {
  unemploymentSeoPageBySlug,
  unemploymentSeoPages
} from "@/lib/unemployment-seo-pages";

const requestedSlugs = [
  "chomage-are",
  "calcul-allocation-chomage",
  "simulateur-allocation-chomage",
  "chomage-apres-rupture-conventionnelle",
  "combien-vais-je-toucher-au-chomage",
  "delai-de-carence-chomage",
  "quand-touche-t-on-le-chomage",
  "premier-paiement-france-travail",
  "conditions-pour-toucher-le-chomage",
  "duree-indemnisation-chomage",
  "cumul-are-salaire",
  "comment-est-calculee-l-are",
  "chomage-apres-demission",
  "chomage-apres-licenciement",
  "chomage-fin-cdd",
  "chomage-cadre",
  "chomage-senior",
  "france-travail-inscription",
  "france-travail-actualisation",
  "indemnite-rupture-et-chomage",
  "rupture-conventionnelle-et-allocation-chomage",
  "are-2026",
  "chomage-apres-cdi",
  "chomage-et-conges-payes"
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
        "2 000 €",
        "2 500 €",
        "3 000 €",
        "3 500 €",
        "4 000 €"
      ]);
      expect(page.tableRows.length).toBeGreaterThanOrEqual(5);
      expect(page.schemaSteps.length).toBeGreaterThanOrEqual(5);
      expect(page.mistakes.length).toBeGreaterThanOrEqual(5);
      expect(page.faq.length).toBeGreaterThanOrEqual(5);
      expect(page.internalLinks.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("differentiates flows, tables and CTAs by search intent", () => {
    expect(unemploymentSeoPageBySlug["calcul-allocation-chomage"]?.premiumFlow).toEqual([
      "Salaire brut moyen",
      "Calcul du SJR",
      "Calcul ARE",
      "Différés éventuels",
      "Montant versé"
    ]);
    expect(unemploymentSeoPageBySlug["premier-paiement-france-travail"]?.premiumFlow).toEqual([
      "Fin du contrat",
      "Inscription",
      "Différés",
      "Actualisation",
      "Paiement"
    ]);
    expect(unemploymentSeoPageBySlug["chomage-apres-demission"]?.showSalaryExamples).toBe(false);
    expect(unemploymentSeoPageBySlug["chomage-apres-demission"]?.tableTitle).toContain("Démission");
    expect(unemploymentSeoPageBySlug["delai-de-carence-chomage"]?.cta.label).toBe(
      "Comprendre mon délai de carence"
    );
    expect(unemploymentSeoPageBySlug["chomage-apres-rupture-conventionnelle"]?.cta.label).toBe(
      "Simuler indemnité + chômage"
    );
  });

  it("keeps the unemployment hub navigable without self-linking", () => {
    const hub = unemploymentSeoPageBySlug["chomage-are"];

    expect(hub?.faq.length).toBeGreaterThanOrEqual(12);
    expect(hub?.internalLinks.some((link) => link.href === "/chomage-are")).toBe(
      false
    );
  });
});
