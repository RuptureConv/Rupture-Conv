export const AD_PLACEMENTS = [
  "guide_after_content",
  "article_bottom"
] as const;

export type AdPlacement = (typeof AD_PLACEMENTS)[number];
export type AdsProvider = "none" | "adsense";

export type AdsConfig = {
  enabled: boolean;
  provider: AdsProvider;
  clientId: string;
  testMode: boolean;
  slots: Record<AdPlacement, string>;
};

export type AdsEnvironment = {
  NEXT_PUBLIC_ADS_ENABLED?: string;
  NEXT_PUBLIC_ADS_PROVIDER?: string;
  NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT?: string;
  NEXT_PUBLIC_ADS_TEST_MODE?: string;
  NEXT_PUBLIC_ADS_SLOT_GUIDE_AFTER_CONTENT?: string;
  NEXT_PUBLIC_ADS_SLOT_ARTICLE_BOTTOM?: string;
  NODE_ENV?: string;
};

const publicAdsEnvironment: AdsEnvironment = {
  NEXT_PUBLIC_ADS_ENABLED: process.env.NEXT_PUBLIC_ADS_ENABLED,
  NEXT_PUBLIC_ADS_PROVIDER: process.env.NEXT_PUBLIC_ADS_PROVIDER,
  NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT:
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT,
  NEXT_PUBLIC_ADS_TEST_MODE: process.env.NEXT_PUBLIC_ADS_TEST_MODE,
  NEXT_PUBLIC_ADS_SLOT_GUIDE_AFTER_CONTENT:
    process.env.NEXT_PUBLIC_ADS_SLOT_GUIDE_AFTER_CONTENT,
  NEXT_PUBLIC_ADS_SLOT_ARTICLE_BOTTOM:
    process.env.NEXT_PUBLIC_ADS_SLOT_ARTICLE_BOTTOM,
  NODE_ENV: process.env.NODE_ENV
};

const ADSENSE_CLIENT_PATTERN = /^ca-pub-\d+$/;
const ADSENSE_SLOT_PATTERN = /^\d+$/;
const AD_FREE_PATHS = new Set([
  "/",
  "/simulateur-rupture-conventionnelle",
  "/simulateur-chomage-rupture-conventionnelle",
  "/salaire-brut-net",
  "/modele-lettre-rupture-conventionnelle",
  "/sources-juridiques"
]);

function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

export function getAdsConfig(
  environment: AdsEnvironment = publicAdsEnvironment
): AdsConfig {
  const requestedProvider = clean(environment.NEXT_PUBLIC_ADS_PROVIDER);

  return {
    enabled: environment.NEXT_PUBLIC_ADS_ENABLED === "true",
    provider: requestedProvider === "adsense" ? "adsense" : "none",
    clientId: clean(environment.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT),
    testMode:
      environment.NEXT_PUBLIC_ADS_TEST_MODE === "true" &&
      environment.NODE_ENV !== "production",
    slots: {
      guide_after_content: clean(
        environment.NEXT_PUBLIC_ADS_SLOT_GUIDE_AFTER_CONTENT
      ),
      article_bottom: clean(
        environment.NEXT_PUBLIC_ADS_SLOT_ARTICLE_BOTTOM
      )
    }
  };
}

export function isAllowedAdPlacement(
  placement: string
): placement is AdPlacement {
  return AD_PLACEMENTS.includes(placement as AdPlacement);
}

export function isAdEligibleEditorialPath(path: string): boolean {
  return !AD_FREE_PATHS.has(path) && !path.startsWith("/outils/");
}

export function hasValidAdsenseClient(config: AdsConfig): boolean {
  return ADSENSE_CLIENT_PATTERN.test(config.clientId);
}

export function getValidAdSlot(
  placement: AdPlacement,
  config: AdsConfig = getAdsConfig()
): string | undefined {
  const slot = config.slots[placement];

  return ADSENSE_SLOT_PATTERN.test(slot) ? slot : undefined;
}

export function canLoadAds(
  config: AdsConfig = getAdsConfig(),
  consentGranted = false
): boolean {
  return (
    consentGranted &&
    config.enabled &&
    config.provider === "adsense" &&
    hasValidAdsenseClient(config)
  );
}

export function canPreviewAdSlot(
  placement: string,
  config: AdsConfig = getAdsConfig()
): placement is AdPlacement {
  return config.enabled && config.testMode && isAllowedAdPlacement(placement);
}
