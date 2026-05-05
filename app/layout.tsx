import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { buildCtrTitle } from "@/lib/seo-content";
import { ADSENSE_CLIENT, isAdsenseReady } from "@/lib/adsense";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: buildCtrTitle("simulateur rupture conventionnelle"),
    template: "%s"
  },

  description:
    "Estimez une indemnité de rupture conventionnelle brute minimale, comparez un montant négocié et obtenez un net indicatif. Outil gratuit pour salarié, employeur et RH.",

  alternates: {
    canonical: "/"
  },

  verification: {
    google: "m9cDeMi4TyzceUF4V6KsuQcYqaG95ObYZwsm5OrQnd8"
  },

  openGraph: {
    title: "Simulateur de rupture conventionnelle",
    description:
      "Estimez une indemnité brute minimale, le montant retenu et un net indicatif en quelques secondes.",
    url: siteUrl,
    siteName,
    locale: "fr_FR",
    type: "website"
  },

  twitter: {
    card: "summary",
    title: "Simulateur rupture conventionnelle",
    description:
      "Estimez une indemnité brute minimale, le montant retenu et un net indicatif."
  },

  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const shouldLoadAdsense = isAdsenseReady();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`
  };

  return (
    <html lang="fr">
      <head>
        <meta
          name="google-site-verification"
          content="m9cDeMi4TyzceUF4V6KsuQcYqaG95ObYZwsm5OrQnd8"
        />

        {shouldLoadAdsense ? (
          <Script
            async
            crossOrigin="anonymous"
            id="adsense-script"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            strategy="afterInteractive"
          />
        ) : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd)
          }}
        />
      </head>

      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
