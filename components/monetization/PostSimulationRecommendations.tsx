import { ResourceCard } from "@/components/monetization/ResourceCard";
import { monetizationLinks } from "@/lib/monetization.config";

const recommendations = [
  {
    title: "Optimiser sa négociation",
    text: "Identifiez les arguments qui peuvent vous aider à obtenir une indemnité supérieure.",
    link: monetizationLinks.negotiationGuide
  },
  {
    title: "Faire relire son accord",
    text: "Un professionnel peut vérifier les points sensibles avant signature.",
    link: monetizationLinks.legalReview
  },
  {
    title: "Anticiper l'après-rupture",
    text: "Préparez votre transition : chômage, délai de carence, projet professionnel.",
    link: monetizationLinks.transitionGuide
  }
];

export function PostSimulationRecommendations() {
  return (
    <section className="mt-5 rounded-[24px] border border-[#E5EEF0] bg-[#F7FBFA] p-4">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#22AFA3]">
        Suite de votre démarche
      </p>
      <h3 className="mt-2 text-lg font-black text-[#061B3A]">
        Votre estimation est prête. Et maintenant ?
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
        Ces ressources peuvent vous aider à mieux préparer la suite de votre démarche.
      </p>
      <div className="mt-4 grid gap-3">
        {recommendations.map((recommendation) => (
          <ResourceCard
            cta={recommendation.link.label}
            href={recommendation.link.href}
            key={recommendation.title}
            sponsored={recommendation.link.sponsored}
            text={recommendation.text}
            title={recommendation.title}
          />
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-[#5B6B7C]">
        Certains liens peuvent être sponsorisés.
      </p>
    </section>
  );
}
