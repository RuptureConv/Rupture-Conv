import { Disclaimer } from "@/components/Disclaimer";
import { Faq, faqItems } from "@/components/Faq";
import { Header } from "@/components/Header";
import { Hero } from "@/components/marketing/Hero";
import { SimulatorSection } from "@/components/marketing/SimulatorSection";
import { PartnerHelpBlock } from "@/components/monetization/PartnerHelpBlock";
import { RecommendedResourcesBlock } from "@/components/monetization/RecommendedResourcesBlock";
import { UsefulLinksFooter } from "@/components/monetization/UsefulLinksFooter";
import { SeoContent } from "@/components/SeoContent";
import { siteName, siteUrl } from "@/lib/site";

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    url: siteUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR"
    },
    description:
      "Simulateur gratuit d'indemnité de rupture conventionnelle pour obtenir une estimation brute et un net indicatif."
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
      <Header />
      <Hero />
      <RecommendedResourcesBlock />
      <PartnerHelpBlock />
      <SimulatorSection />
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
        <div className="min-w-0">
          <SeoContent />
          <Faq />

          <section className="mt-8">
            <h2 className="sr-only">Mentions de prudence</h2>
            <Disclaimer />
          </section>

          <UsefulLinksFooter />
        </div>
      </section>
    </main>
  );
}
