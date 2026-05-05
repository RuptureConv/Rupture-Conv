import { Disclaimer } from "@/components/Disclaimer";
import { Faq, faqItems } from "@/components/Faq";
import { Header } from "@/components/Header";
import { CTAButton } from "@/components/marketing/CTAButton";
import { ExampleBlock } from "@/components/marketing/ExampleBlock";
import { Hero } from "@/components/marketing/Hero";
import { MiniFAQ } from "@/components/marketing/MiniFAQ";
import { SimulatorSection } from "@/components/marketing/SimulatorSection";
import { TrustBlock } from "@/components/marketing/TrustBlock";
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
      <TrustBlock />
      <ExampleBlock />
      <MiniFAQ />
      <RecommendedResourcesBlock />
      <PartnerHelpBlock />
      <SimulatorSection />
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
        <div className="min-w-0">
          <SeoContent />
          <aside className="mt-10 rounded-[28px] border border-[#E5EEF0] bg-white p-6 shadow-[0_16px_50px_rgba(6,27,58,0.04)] sm:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#168F86]">
              Estimation personnalisée
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-3xl">
              Passez de la méthode au montant
            </h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-[#5B6B7C]">
              Renseignez vos dates, votre salaire brut et vos éléments de paie
              pour obtenir une estimation indicative adaptée à votre situation.
            </p>
            <div className="mt-6">
              <CTAButton>Relancer une simulation →</CTAButton>
            </div>
          </aside>
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
