import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RuptureConv.",
    short_name: "RuptureConv.",
    description:
      "Simulateur indicatif d'indemnité de rupture conventionnelle.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7FBFA",
    theme_color: "#22AFA3",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon"
      }
    ]
  };
}
