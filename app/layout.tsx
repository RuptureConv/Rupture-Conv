import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import {
  GoogleTagManagerBody,
  GoogleTagManagerHead
} from "@/components/GoogleTagManager";
import { StickyMobileCTA } from "@/components/seo/StickyMobileCTA";
import { ADSENSE_CLIENT, isAdsenseReady } from "@/lib/adsense";
import { homeSeoSnippet } from "@/lib/seo-metadata";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: homeSeoSnippet.title,
    template: "%s"
  },

  description: homeSeoSnippet.description,

  alternates: {
    canonical: "/"
  },

  verification: {
    google: "m9cDeMi4TyzceUF4V6KsuQcYqaG95ObYZwsm5OrQnd8"
  },

  openGraph: {
    title: homeSeoSnippet.title,
    description: homeSeoSnippet.description,
    url: siteUrl,
    siteName,
    locale: "fr_FR",
    type: "website"
  },

  twitter: {
    card: "summary",
    title: homeSeoSnippet.title,
    description: homeSeoSnippet.description
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  }
};

export const viewport: Viewport = {
  themeColor: "#19c2b4"
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
    logo: `${siteUrl}/favicon.ico`
  };

  return (
    <html lang="fr">
      <head>
        <GoogleTagManagerHead />

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
            strategy="lazyOnload"
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
        <GoogleTagManagerBody />
        {children}
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
