export const ENABLE_ADSENSE = process.env.NEXT_PUBLIC_ENABLE_ADSENSE !== "false";

export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-4203111381073354";

export const ADSENSE_SLOTS = {
  "ad-top-leaderboard": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP ?? "",
  "ad-before-simulator": process.env.NEXT_PUBLIC_ADSENSE_SLOT_BEFORE_SIMULATOR ?? "",
  "ad-simulator-sidebar": process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "",
  "ad-content-rectangle": process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT ?? "",
  "ad-after-result": process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTER_RESULT ?? "",
  "ad-footer-banner": process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER ?? "",
  "ad-seo-top": process.env.NEXT_PUBLIC_ADSENSE_SLOT_SEO_TOP ?? "",
  "ad-seo-after-content": process.env.NEXT_PUBLIC_ADSENSE_SLOT_SEO_AFTER_CONTENT ?? "",
  "ad-seo-mid": process.env.NEXT_PUBLIC_ADSENSE_SLOT_SEO_MID ?? "",
  "ad-seo-bottom": process.env.NEXT_PUBLIC_ADSENSE_SLOT_SEO_BOTTOM ?? ""
} as const;

export type AdsenseSlotId = keyof typeof ADSENSE_SLOTS;

export function isAdsenseReady(): boolean {
  return ENABLE_ADSENSE && ADSENSE_CLIENT.startsWith("ca-pub-");
}

export function getAdsenseSlot(slotId: string): string | undefined {
  return ADSENSE_SLOTS[slotId as AdsenseSlotId] || undefined;
}
