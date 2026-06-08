import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: "/simulateur",
        destination: "/simulateur-rupture-conventionnelle",
        permanent: true
      },
      {
        source: "/simulateur-chomage",
        destination: "/simulateur-chomage-rupture-conventionnelle",
        permanent: true
      },
      {
        source: "/chomage",
        destination: "/chomage-are",
        permanent: true
      },
      {
        source: "/calcul-chomage",
        destination: "/calcul-allocation-chomage",
        permanent: true
      },
      {
        source: "/delai-carence-chomage",
        destination: "/delai-de-carence-chomage",
        permanent: true
      },
      {
        source: "/cumul-salaire-et-chomage",
        destination: "/cumul-are-salaire",
        permanent: true
      },
      {
        source: "/chomage-apres-cdd",
        destination: "/chomage-fin-cdd",
        permanent: true
      },
      {
        source: "/rupture-conventionnelle-et-are",
        destination: "/rupture-conventionnelle-et-allocation-chomage",
        permanent: true
      },
      {
        source: "/comment-est-calcule-le-sjr",
        destination: "/comment-est-calculee-l-are",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload"
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()"
          }
        ]
      }
    ];
  }
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

export default withBundleAnalyzer(nextConfig);
