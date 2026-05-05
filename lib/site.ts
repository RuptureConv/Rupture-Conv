export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rupture-conv.fr"
)
  .replace(/^https:\/\/rupture-conv\.fr$/, "https://www.rupture-conv.fr")
  .replace(/\/$/, "");

export const siteName = "RuptureConv.";
