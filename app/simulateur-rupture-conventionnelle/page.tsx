import type { Metadata } from "next";
import { SeoContentLayout } from "@/components/seo/SeoContentLayout";
import { TerminationCalculatorTool } from "@/components/tools/TerminationCalculatorTool";
import { absoluteUrl, pillarPageBySlug } from "@/lib/seo-content";
import { getPillarSeoSnippet } from "@/lib/seo-metadata";
import { siteName } from "@/lib/site";

const page = pillarPageBySlug["simulateur-rupture-conventionnelle"];
const canonicalPath = "/simulateur-rupture-conventionnelle";
const canonicalUrl = absoluteUrl(canonicalPath);
const seoSnippet = getPillarSeoSnippet(page);

export const metadata: Metadata = {
  title: {
    absolute: seoSnippet.title
  },
  description: seoSnippet.description,
  alternates: {
    canonical: canonicalUrl
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: seoSnippet.title,
    description: seoSnippet.description,
    url: canonicalUrl,
    siteName,
    type: "website",
    locale: "fr_FR"
  },
  twitter: {
    card: "summary",
    title: seoSnippet.title,
    description: seoSnippet.description
  }
};

export default function TerminationSimulatorPage() {
  return (
    <SeoContentLayout
      canonicalPath={canonicalPath}
      conclusion={page.conclusion}
      faq={page.faq}
      h1={page.h1}
      intro={page.intro}
      relatedLinks={page.relatedLinks}
      sections={page.sections}
      terminationCalculator={<TerminationCalculatorTool />}
      updatedAt={page.updatedAt}
      updatedLabel={page.updatedLabel}
    />
  );
}
