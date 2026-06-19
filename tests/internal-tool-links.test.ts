import { afterEach, describe, expect, it, vi } from "vitest";
import { trackInternalLinkClick } from "@/lib/analytics";
import { pillarPages } from "@/lib/seo-content";
import { salarySeoPages } from "@/lib/salary-seo-pages";
import {
  salaryNextStepLinks,
  terminationNextStepLinks,
  unemploymentNextStepLinks
} from "@/lib/internal-tool-links";
import { unemploymentSeoPages } from "@/lib/unemployment-seo-pages";

const appRoutes = new Set([
  "/",
  "/rupture-conventionnelle",
  "/salaire-brut-net",
  "/simulateur-chomage-rupture-conventionnelle"
]);

const knownRoutes = new Set([
  ...appRoutes,
  ...pillarPages.map((page) => `/${page.slug}`),
  ...salarySeoPages.map((page) => `/${page.slug}`),
  ...unemploymentSeoPages.map((page) => `/${page.slug}`)
]);

const allNextStepLinks = [
  ...terminationNextStepLinks,
  ...unemploymentNextStepLinks,
  ...salaryNextStepLinks
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("internal tool links", () => {
  it("oriente le résultat de rupture vers ARE, carence, brut-net, lettre et guide", () => {
    expect(terminationNextStepLinks).toHaveLength(5);
    expect(terminationNextStepLinks.map((link) => link.href)).toEqual([
      "/simulateur-chomage-rupture-conventionnelle",
      "/delai-de-carence-chomage",
      "/modele-lettre-rupture-conventionnelle",
      "/rupture-conventionnelle",
      "/salaire-brut-net"
    ]);
  });

  it("ne pointe pas vers des routes inconnues", () => {
    for (const link of allNextStepLinks) {
      expect(knownRoutes.has(link.href), link.href).toBe(true);
    }
  });

  it("garde des liens complets et sans doublons dans chaque bloc", () => {
    for (const links of [
      terminationNextStepLinks,
      unemploymentNextStepLinks,
      salaryNextStepLinks
    ]) {
      const hrefs = links.map((link) => link.href);

      expect(new Set(hrefs).size).toBe(hrefs.length);

      for (const link of links) {
        expect(link.href.startsWith("/")).toBe(true);
        expect(link.label.trim().length).toBeGreaterThan(8);
        expect(link.description.trim().length).toBeGreaterThan(20);
        expect(link.targetPage).toMatch(/^[a-z0-9_]+$/);
      }
    }
  });

  it("garde un wording concret pour les liens ajoutés", () => {
    const bannedPhrases = [
      "optimisez",
      "boostez",
      "solution complète",
      "contenu à forte valeur ajoutée",
      "ressources pertinentes",
      "parcours utilisateur",
      "maximisez"
    ];
    const text = allNextStepLinks
      .flatMap((link) => [link.label, link.description])
      .join(" ")
      .toLowerCase();

    for (const phrase of bannedPhrases) {
      expect(text).not.toContain(phrase);
    }
  });
});

describe("internal link analytics", () => {
  it("n'envoie rien si gtag est absent", () => {
    vi.stubGlobal("window", {});

    expect(() =>
      trackInternalLinkClick("post_simulation_click", {
        source_tool: "termination_calculator",
        target_page: "simulateur_chomage_rupture_conventionnelle",
        link_label: "Estimer mes droits au chômage",
        location: "termination_result"
      })
    ).not.toThrow();
  });

  it("envoie un événement léger si gtag existe", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });

    trackInternalLinkClick("post_simulation_click", {
      source_tool: "termination_calculator",
      target_page: "simulateur_chomage_rupture_conventionnelle",
      link_label: "Estimer mes droits au chômage",
      location: "termination_result"
    });

    expect(gtag).toHaveBeenCalledWith("event", "post_simulation_click", {
      event_category: "internal_link",
      source_tool: "termination_calculator",
      target_page: "simulateur_chomage_rupture_conventionnelle",
      link_label: "Estimer mes droits au chômage",
      location: "termination_result"
    });
  });

  it("ne bloque pas si gtag échoue", () => {
    vi.stubGlobal("window", {
      gtag: vi.fn(() => {
        throw new Error("gtag unavailable");
      })
    });

    expect(() =>
      trackInternalLinkClick("tool_crosslink_click", {
        source_tool: "salary_net_calculator",
        target_page: "chomage_are",
        link_label: "Lire le guide chômage ARE",
        location: "salary_result"
      })
    ).not.toThrow();
  });
});
