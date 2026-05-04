import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Simulateur rupture conventionnelle 2026 | Indemnité brute et net indicatif",
    template: "%s | RuptureConv."
  },
  description:
    "Estimez une indemnité de rupture conventionnelle brute minimale, comparez un montant négocié et obtenez un net indicatif. Outil gratuit pour salarié, employeur et RH.",
  alternates: {
    canonical: "/"
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
  return (
    <html lang="fr">
      <body>
        {/* 🔥 Script AdSense forcé */}
        <Script
          id="adsense-script"
          async
          crossOrigin="anonymous"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4203111381073354"
        />

        {children}
        <Footer />
      </body>
    </html>
  );
}