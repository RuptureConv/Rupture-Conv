const DEFAULT_SITE_URL = "https://www.rupture-conv.fr";

function normalizeSiteUrl(url: string | undefined): string {
  const candidate = (url ?? DEFAULT_SITE_URL)
    .replace(/^https:\/\/rupture-conv\.fr$/, DEFAULT_SITE_URL)
    .replace(/\/$/, "");

  try {
    const parsed = new URL(candidate);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return DEFAULT_SITE_URL;
    }

    return parsed.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const siteName = "Rupture-Conv";
export const siteAlternateName = "rupture-conv.fr";
