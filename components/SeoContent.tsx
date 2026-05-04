import { AdSlot } from "@/components/AdSlot";
import { ToolCard } from "@/components/tools/ToolCard";
import { adSlots } from "@/lib/ads.config";
import { hrTools } from "@/lib/calculators/tools-registry";

export function SeoContent() {
  const futureTools = hrTools.filter((tool) => tool.status === "planned").slice(0, 3);

  return (
    <>
      <section id="comprendre" className="mt-10 border-t border-[#E5EEF0] pt-8">
        <h2 className="text-2xl font-bold text-[#061B3A]">
          Calcul de l&apos;indemnité de rupture conventionnelle : méthode simple et rapide
        </h2>
        <div className="mt-4 grid gap-4 text-sm leading-7 text-[#5B6B7C] lg:grid-cols-2">
          <p>
            Un simulateur de rupture conventionnelle aide à obtenir rapidement un
            ordre de grandeur avant une discussion entre salarié, employeur ou
            équipe RH. Il permet de comparer l&apos;indemnité rupture
            conventionnelle minimale estimée, le montant éventuellement négocié
            et le brut retenu.
          </p>
          <p>
            Le net d&apos;une rupture conventionnelle reste une estimation indicative :
            le montant réellement perçu dépend du traitement social et fiscal,
            des exonérations applicables et de la situation du salarié. Le
            résultat affiché sert donc de repère clair, sans valeur de validation
            juridique ou paie.
          </p>
          <p>
            Côté entreprise, le calcul rupture conventionnelle employeur donne
            un premier cadrage pour anticiper une enveloppe de négociation. Les
            champs avancés permettent de renseigner les moyennes brutes sur 3
            ou 12 mois lorsque ces montants sont utiles à la comparaison.
          </p>
          <p>
            La V1 conserve volontairement une approche simple : quelques champs,
            un résultat lisible et une méthode affichée sous la simulation. Les
            prochaines pages d&apos;outils RH pourront compléter ce parcours sans
            ralentir le simulateur principal.
          </p>
        </div>
      </section>

      <AdSlot
        {...adSlots.contentRectangle}
        className="my-8"
      />

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-[#061B3A]">Sources et méthode</h2>
        <div className="mt-4 rounded-2xl border border-[#E5EEF0] bg-white p-5 text-sm leading-7 text-[#5B6B7C] shadow-sm">
          <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold text-[#168F86]">
            Basé sur les règles du Code du travail français
          </p>
          <p className="mt-4">
            La méthode de calcul affichée par le simulateur reprend la logique
            légale minimale déjà intégrée dans le moteur V1 : ancienneté,
            salaire de référence, indemnité brute minimale, puis comparaison
            avec le montant négocié lorsqu&apos;il est renseigné.
          </p>
          <p className="mt-3">
            Les limites sont volontairement visibles : la convention collective,
            l&apos;éligibilité à la retraite, les règles d&apos;exonération, la
            paie et la fiscalité peuvent modifier le résultat réel. Le site
            fournit une estimation pédagogique, pas un avis juridique personnalisé.
          </p>
        </div>
      </section>

      <section id="outils" className="mt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#061B3A]">
              Maillage vers les futurs outils RH
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
              Des pages dédiées sont préparées pour élargir le parcours autour
              du coût employeur, du préavis et du licenciement.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {futureTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
