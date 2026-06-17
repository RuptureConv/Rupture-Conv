import { describe, expect, it } from "vitest";
import { noticeSeoPages } from "@/lib/notice-seo-pages";

const requestedSlugs = [
  "guide-preavis",
  "preavis-demission",
  "preavis-rupture-conventionnelle",
  "preavis-licenciement",
  "dispense-de-preavis",
  "calcul-preavis",
  "preavis-cadre",
  "preavis-non-cadre",
  "conges-payes-pendant-preavis",
  "arret-maladie-pendant-preavis",
  "reduction-preavis",
  "duree-preavis-anciennete",
  "date-fin-contrat-preavis",
  "travailler-ailleurs-pendant-preavis",
  "preavis-abandon-de-poste",
  "indemnite-compensatrice-preavis"
];

const forbiddenPhrases = [
  "Il est important de noter que",
  "Il convient de préciser que",
  "Dans le cadre de",
  "En effet",
  "Ainsi",
  "De plus",
  "Par ailleurs",
  "En conclusion"
];

const pillarForbiddenPhrases = [
  ...forbiddenPhrases,
  "dans un monde professionnel",
  "il convient de",
  "pour résumer",
  "à retenir",
  "de nos jours",
  "cet article explore",
  "découvrez",
  "guide ultime",
  "homologation",
  "DREETS",
  "signature de convention"
];

describe("notice SEO pages", () => {
  it("creates the complete préavis cluster", () => {
    const pageBySlug = Object.fromEntries(
      noticeSeoPages.map((page) => [page.slug, page])
    );

    for (const slug of requestedSlugs) {
      expect(pageBySlug[slug]?.title).toBeTruthy();
    }
  });

  it("keeps titles, descriptions and slugs unique", () => {
    expect(new Set(noticeSeoPages.map((page) => page.slug)).size).toBe(
      noticeSeoPages.length
    );
    expect(new Set(noticeSeoPages.map((page) => page.title)).size).toBe(
      noticeSeoPages.length
    );
    expect(new Set(noticeSeoPages.map((page) => page.description)).size).toBe(
      noticeSeoPages.length
    );
  });

  it("keeps every page above the editorial floor", () => {
    for (const page of noticeSeoPages) {
      const body = [
        page.title,
        page.h1,
        page.description,
        ...page.intro,
        ...page.sections.flatMap((section) => [
          section.title,
          ...section.paragraphs,
          ...(section.bullets ?? []),
          ...(section.boxedText ?? [])
        ]),
        ...page.faq.flatMap((item) => [item.question, item.answer]),
        ...page.conclusion
      ].join(" ");

      expect(page.sections.length).toBeGreaterThanOrEqual(5);
      expect(page.faq.length).toBeGreaterThanOrEqual(5);
      expect(page.relatedLinks.length).toBeGreaterThanOrEqual(10);
      expect(body.split(/\s+/).filter(Boolean).length).toBeGreaterThan(650);

      for (const phrase of forbiddenPhrases) {
        expect(body).not.toContain(phrase);
      }
    }
  });

  it("turns guide-preavis into a focused pillar page", () => {
    const page = noticeSeoPages.find((item) => item.slug === "guide-preavis");
    expect(page).toBeTruthy();

    const body = [
      page?.title,
      page?.h1,
      page?.description,
      ...(page?.intro ?? []),
      ...(page?.sections.flatMap((section) => [
        section.title,
        ...section.paragraphs,
        ...(section.bullets ?? []),
        ...(section.boxedText ?? []),
        ...(section.table?.headers ?? []),
        ...(section.table?.rows.flat() ?? [])
      ]) ?? []),
      ...(page?.faq.flatMap((item) => [item.question, item.answer]) ?? []),
      ...(page?.conclusion ?? [])
    ].join(" ");

    expect(page?.sections.map((section) => section.title)).toEqual(
      expect.arrayContaining([
        "Préavis : ce qu'il faut retenir en 30 secondes",
        "Tableau récapitulatif du préavis",
        "Comment calculer la date de fin du préavis ?",
        "Préavis et ancienneté",
        "Le préavis est-il différent pour un cadre ?",
        "Les erreurs les plus fréquentes"
      ])
    );
    expect(page?.faq.length).toBeGreaterThanOrEqual(15);
    expect(body.split(/\s+/).filter(Boolean).length).toBeGreaterThan(1300);

    for (const phrase of pillarForbiddenPhrases) {
      expect(body.toLocaleLowerCase("fr-FR")).not.toContain(
        phrase.toLocaleLowerCase("fr-FR")
      );
    }
  });
});
