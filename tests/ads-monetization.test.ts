import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  AD_PLACEMENTS,
  canLoadAds,
  getAdsConfig,
  getValidAdSlot,
  isAdEligibleEditorialPath
} from "@/lib/ads";

function read(path: string) {
  return readFileSync(path, "utf8");
}

describe("advertising monetization safeguards", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("reste entièrement désactivé sans configuration explicite", () => {
    const config = getAdsConfig({ NODE_ENV: "production" });

    expect(config).toMatchObject({
      enabled: false,
      provider: "none",
      clientId: "",
      testMode: false
    });
    expect(canLoadAds(config, true)).toBe(false);
    expect(renderToStaticMarkup(createElement(AdSenseScript))).toBe("");
    expect(
      renderToStaticMarkup(
        createElement(AdSlot, { placement: "guide_after_content" })
      )
    ).toBe("");
  });

  it("exige une configuration complète et un consentement explicite", () => {
    const config = getAdsConfig({
      NEXT_PUBLIC_ADS_ENABLED: "true",
      NEXT_PUBLIC_ADS_PROVIDER: "adsense",
      NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT: "ca-pub-1234567890123456",
      NEXT_PUBLIC_ADS_SLOT_GUIDE_AFTER_CONTENT: "1234567890",
      NODE_ENV: "production"
    });

    expect(canLoadAds(config)).toBe(false);
    expect(canLoadAds(config, true)).toBe(true);
    expect(getValidAdSlot("guide_after_content", config)).toBe("1234567890");
  });

  it("limite les emplacements aux fins de guides et d’articles", () => {
    expect(AD_PLACEMENTS).toEqual([
      "guide_after_content",
      "article_bottom"
    ]);

    const calculator = read("components/tools/TerminationCalculatorTool.tsx");
    const seoLayout = read("components/seo/SeoContentLayout.tsx");
    const programmatic = read("components/seo/ProgrammaticSeoTemplate.tsx");

    expect(calculator).not.toContain("AdSlot");
    expect(seoLayout).not.toContain('position="top"');
    expect(seoLayout).not.toContain('position="mid"');
    expect(programmatic).not.toContain('position="top"');
    expect(programmatic).not.toContain('position="mid"');

    for (const protectedPath of [
      "/",
      "/simulateur-rupture-conventionnelle",
      "/simulateur-chomage-rupture-conventionnelle",
      "/salaire-brut-net",
      "/modele-lettre-rupture-conventionnelle",
      "/sources-juridiques",
      "/outils/preavis"
    ]) {
      expect(isAdEligibleEditorialPath(protectedPath)).toBe(false);
    }

    expect(isAdEligibleEditorialPath("/guide-preavis")).toBe(true);
  });

  it("neutralise le mode aperçu en production", () => {
    const config = getAdsConfig({
      NEXT_PUBLIC_ADS_ENABLED: "true",
      NEXT_PUBLIC_ADS_TEST_MODE: "true",
      NODE_ENV: "production"
    });

    expect(config.testMode).toBe(false);
  });

  it("affiche un aperçu identifié uniquement en mode test hors production", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADS_TEST_MODE", "true");
    vi.stubEnv("NODE_ENV", "development");
    vi.resetModules();

    const { AdSlot: PreviewAdSlot } = await import("@/components/ads/AdSlot");
    const html = renderToStaticMarkup(
      createElement(PreviewAdSlot, { placement: "article_bottom" })
    );

    expect(html).toContain('aria-label="Publicité"');
    expect(html).toContain("Aperçu de l’emplacement publicitaire");
    expect(html).not.toContain("adsbygoogle");
  });
});
