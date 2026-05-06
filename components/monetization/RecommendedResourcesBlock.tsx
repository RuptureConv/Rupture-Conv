import { ResourceCard } from "@/components/monetization/ResourceCard";
import { monetizationLinks } from "@/lib/monetization.config";

const resources = [
  {
    title: "Préparer sa négociation",
    text: "Les points essentiels à vérifier avant d’accepter une proposition de rupture conventionnelle.",
    link: monetizationLinks.negotiationGuide
  },
  {
    title: "Comprendre ses droits au chômage",
    text: "Découvrez l’impact d’une rupture conventionnelle sur vos droits France Travail et vos délais d’indemnisation.",
    link: monetizationLinks.unemploymentEstimate
  },
  {
    title: "Modèle de demande",
    text: "Un exemple clair de demande de rupture conventionnelle à adapter à votre situation.",
    link: monetizationLinks.documentTemplate
  }
];

export function RecommendedResourcesBlock() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#E5EEF0] bg-[#F7FBFA] p-5 shadow-[0_18px_60px_rgba(6,27,58,0.04)] sm:p-6">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#22AFA3]">
              Ressources
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#061B3A]">
              Ressources utiles pour mieux préparer votre rupture conventionnelle
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#5B6B7C]">
              Guides pratiques, conseils et modèles pour comprendre vos droits,
              préparer votre échange avec l’employeur et avancer sereinement.
            </p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard
                badge={resource.link.badge}
                cta={resource.link.label}
                href={resource.link.href}
                key={resource.title}
                text={resource.text}
                title={resource.title}
              />
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-[#5B6B7C]">
            Ressources informatives, sans inscription et mises à jour selon le
            droit du travail français.
          </p>
        </div>
      </div>
    </section>
  );
}
