import Script from "next/script";
import { GA_MEASUREMENT_ID, isGoogleAnalyticsReady } from "@/lib/analytics";

export function GoogleAnalytics() {
  if (!isGoogleAnalyticsReady()) {
    return null;
  }

  return (
    <>
      <Script
        async
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`
        }}
      />
    </>
  );
}
