import { ResourceCard } from "@/components/monetization/ResourceCard";
import { monetizationLinks } from "@/lib/monetization.config";

const recommendations = [
  {
    title: "Préparer sa négociation",
    text: "Les points essentiels à vérifier avant d’accepter une proposition de rupture conventionnelle.",
    link: monetizationLinks.negotiationGuide
  },
  {
    title: "Comprendre ses droits au chômage",
    text: "Découvrez l’impact d’une rupture conventionnelle sur vos droits France Travail.",
    link: monetizationLinks.unemploymentEstimate
  },
  {
    title: "Modèle de lettre RC",
    text: "Un exemple clair de demande de rupture conventionnelle à adapter à votre situation.",
    link: monetizationLinks.documentTemplate
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
            badge={recommendation.link.badge}
            cta={recommendation.link.label}
            href={recommendation.link.href}
            key={recommendation.title}
            text={recommendation.text}
            title={recommendation.title}
          />
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-[#5B6B7C]">
        Informations générales à adapter selon votre situation.
      </p>
    </section>
  );
}
