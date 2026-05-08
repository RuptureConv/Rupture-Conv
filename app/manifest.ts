import type { MetadataRoute } from "next";
import { siteName } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteName,
    description:
      "Simulateur indicatif d'indemnité de rupture conventionnelle.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7FBFA",
    theme_color: "#22AFA3",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon"
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
