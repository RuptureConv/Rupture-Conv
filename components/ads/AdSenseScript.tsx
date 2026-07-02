import Script from "next/script";
import { canLoadAds, getAdsConfig } from "@/lib/ads";

type AdSenseScriptProps = {
  consentGranted?: boolean;
};

export function AdSenseScript({
  consentGranted = false
}: AdSenseScriptProps) {
  const config = getAdsConfig();

  if (!canLoadAds(config, consentGranted)) {
    return null;
  }

  return (
    <Script
      async
      crossOrigin="anonymous"
      id="adsense-script"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.clientId}`}
      strategy="lazyOnload"
    />
  );
}
