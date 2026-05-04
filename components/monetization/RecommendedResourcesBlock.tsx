import { ResourceCard } from "@/components/monetization/ResourceCard";
import { monetizationLinks } from "@/lib/monetization.config";

const resources = [
  {
    title: "Préparer sa négociation",
    text: "Découvrez les points clés à vérifier avant d'accepter une rupture conventionnelle.",
    link: monetizationLinks.negotiationGuide
  },
  {
    title: "Estimer ses droits au chômage",
    text: "Comprenez l'impact potentiel de votre rupture sur vos droits France Travail.",
    link: monetizationLinks.unemploymentEstimate
  },
  {
    title: "Modèle de courrier",
    text: "Accédez à un modèle simple pour formaliser votre demande ou vos échanges.",
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
              Ressources utiles pour préparer votre rupture conventionnelle
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#5B6B7C]">
              Des outils complémentaires pour mieux comprendre vos droits et
              anticiper votre négociation.
            </p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard
                cta={resource.link.label}
                href={resource.link.href}
                key={resource.title}
                sponsored={resource.link.sponsored}
                text={resource.text}
                title={resource.title}
              />
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-[#5B6B7C]">
            Certains liens peuvent être sponsorisés.
          </p>
        </div>
      </div>
    </section>
  );
}
