import { BenefitCard } from "@/components/marketing/BenefitCard";
import { CTAButton } from "@/components/marketing/CTAButton";
import { ResultPreviewCard } from "@/components/marketing/ResultPreviewCard";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7FBFA]">
      <div className="mx-auto grid min-h-[calc(100vh-90px)] max-w-7xl items-center gap-12 px-4 pb-12 pt-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:pb-16 lg:pt-16">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-[#D7E7E8] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#168F86] shadow-[0_12px_36px_rgba(6,27,58,0.06)]">
            Simulateur RH gratuit et confidentiel
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#061B3A] sm:text-5xl lg:text-6xl">
            Calculez votre indemnité
            <br />
            de rupture conventionnelle
            <br />
            <span className="text-[#22AFA3]">en quelques minutes.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5B6B7C]">
            Obtenez une estimation claire, immédiate et personnalisée de votre
            indemnité, sans inscription et en toute confidentialité.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#102A4C]">
            Estimez votre indemnité de rupture conventionnelle en moins de 30
            secondes.
          </p>

          <ul className="mt-4 space-y-1 text-sm font-bold leading-7 text-[#5B6B7C]">
            <li>✔ Calcul basé sur le Code du travail</li>
            <li>✔ Résultat immédiat</li>
            <li>✔ Gratuit et sans inscription</li>
          </ul>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <BenefitCard
              icon="shield"
              text="Basé sur la législation en vigueur"
              title="Fiable & à jour"
            />
            <BenefitCard
              icon="bolt"
              text="Résultat immédiat, sans inscription"
              title="Rapide & gratuit"
            />
            <BenefitCard
              icon="lock"
              text="Vos données ne sont jamais enregistrées"
              title="100% confidentiel"
            />
          </div>

          <div className="mt-9 flex flex-col items-start gap-3">
            <CTAButton size="lg">Calculer mon indemnité →</CTAButton>
            <div className="flex flex-wrap gap-2 text-xs font-extrabold sm:text-sm">
              <span className="rounded-full bg-white px-4 py-2 text-[#061B3A] shadow-[0_12px_34px_rgba(6,27,58,0.06)] ring-1 ring-[#E5EEF0]">
                Simulation en moins de 30 secondes, gratuitement et sans inscription
              </span>
              <span className="rounded-full bg-[#EAF8F6] px-4 py-2 text-[#168F86] ring-1 ring-[#D7E7E8]">
                Basé sur la législation en vigueur
              </span>
            </div>
          </div>
        </div>

        <div className="lg:pl-4">
          <ResultPreviewCard />
        </div>
      </div>

      <div id="etapes" className="border-y border-[#E5EEF0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="text-base font-extrabold text-[#061B3A]">
            Un outil simple, clair et fiable pour vous accompagner dans votre projet.
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-bold text-[#102A4C]">
            <span className="rounded-full bg-[#F7FBFA] px-4 py-2">À jour des dernières lois</span>
            <span className="rounded-full bg-[#F7FBFA] px-4 py-2">Sécurisé</span>
            <span className="rounded-full bg-[#F7FBFA] px-4 py-2">Conçu par des experts RH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
