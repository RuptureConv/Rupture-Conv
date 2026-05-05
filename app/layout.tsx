import type { Metadata } from "next";
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

  // ✅ AJOUT GOOGLE SEARCH CONSOLE
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
        {/* 🔥 Script AdSense pour validation */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4203111381073354"
          crossOrigin="anonymous"
        ></script>

        {/* JSON-LD Organization */}
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