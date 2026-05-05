import { ToolCard } from "@/components/tools/ToolCard";
import { hrTools } from "@/lib/calculators/tools-registry";

export function SeoContent() {
  const complementaryTools = hrTools
    .filter((tool) => tool.status === "planned")
    .slice(0, 3);

  return (
    <>
      <section
        id="comprendre"
        className="mt-12 border-t border-[#E5EEF0] pt-10"
        aria-labelledby="seo-content-title"
      >
        <article className="mx-auto max-w-[900px] text-[#102A4C]">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#22AFA3]">
            Guide pratique
          </p>
          <h2
            id="seo-content-title"
            className="mt-3 text-3xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-4xl"
          >
            Rupture conventionnelle : comprendre, calculer et préparer son
            indemnité
          </h2>

          <div className="mt-6 space-y-8 text-base leading-8 text-[#5B6B7C]">
            <section aria-labelledby="intro-rupture-conventionnelle">
              <h3
                id="intro-rupture-conventionnelle"
                className="text-xl font-extrabold text-[#061B3A]"
              >
                Introduction
              </h3>
              <p className="mt-3">
                La rupture conventionnelle permet à un salarié et à un employeur
                de mettre fin à un contrat à durée indéterminée d’un commun
                accord. Elle est souvent choisie parce qu’elle offre un cadre
                plus souple qu’un licenciement ou qu’une démission, tout en
                ouvrant droit à une indemnité spécifique. Avant de signer, il est
                utile de comprendre les montants en jeu, les limites du calcul et
                les points à vérifier. Un simulateur rupture conventionnelle
                donne un premier repère chiffré : il aide à estimer l’indemnité
                rupture conventionnelle, à comparer les bases de salaire et à
                préparer une discussion plus claire, sans remplacer une analyse
                juridique ou paie personnalisée.
              </p>
            </section>

            <section aria-labelledby="definition-rupture-conventionnelle">
              <h3
                id="definition-rupture-conventionnelle"
                className="text-xl font-extrabold text-[#061B3A]"
              >
                Qu’est-ce qu’une rupture conventionnelle ?
              </h3>
              <p className="mt-3">
                La rupture conventionnelle est une procédure encadrée qui repose
                sur l’accord libre des deux parties. Elle ne peut pas être
                imposée unilatéralement par le salarié ou par l’employeur. En
                pratique, elle comprend généralement un ou plusieurs échanges,
                la signature d’une convention, un délai de rétractation, puis une
                demande d’homologation auprès de l’administration compétente.
              </p>
              <p className="mt-3">
                Son intérêt principal est de fixer une date de fin de contrat et
                une indemnité de rupture conventionnelle dans un cadre formalisé.
                Le montant ne peut pas être inférieur au minimum légal applicable.
                Dans certains cas, une convention collective, un usage
                d’entreprise ou une négociation individuelle peuvent conduire à
                un montant plus favorable. C’est pourquoi le résultat d’un outil
                de calcul doit rester présenté comme une estimation indicative.
              </p>
            </section>

            <section aria-labelledby="calcul-indemnite">
              <h3
                id="calcul-indemnite"
                className="text-xl font-extrabold text-[#061B3A]"
              >
                Comment est calculée l’indemnité ?
              </h3>
              <p className="mt-3">
                Le calcul de l’indemnité repose principalement sur deux éléments :
                l’ancienneté retenue et le salaire de référence. Le simulateur
                compare les données disponibles pour retenir une base cohérente,
                puis applique la formule légale minimale. Lorsque certaines
                absences récentes ont pu réduire la rémunération, il peut être
                pertinent de vérifier si le salaire habituel avant absence doit
                être pris en compte.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  Ancienneté : elle correspond à la durée prise en compte entre
                  l’entrée dans l’entreprise et la date de rupture envisagée.
                </li>
                <li>
                  Salaire de référence : il peut être apprécié à partir du
                  salaire mensuel brut moyen ou de moyennes récentes lorsque ces
                  informations sont disponibles.
                </li>
                <li>
                  Minimum légal : la base utilisée est d’un quart de mois de
                  salaire par année d’ancienneté jusqu’à 10 ans, puis d’un tiers
                  de mois par année au-delà.
                </li>
                <li>
                  Montant négocié : un accord peut prévoir plus que le minimum,
                  mais le simulateur ne transforme pas cette possibilité en
                  recommandation personnalisée.
                </li>
              </ul>
            </section>

            <section aria-labelledby="exemple-calcul">
              <h3
                id="exemple-calcul"
                className="text-xl font-extrabold text-[#061B3A]"
              >
                Exemple concret de calcul
              </h3>
              <p className="mt-3">
                Prenons un salarié avec 6 ans d’ancienneté et un salaire brut
                mensuel de référence de 2 500 €. Le minimum légal indicatif est
                calculé sur la base d’un quart de mois de salaire par année
                d’ancienneté. Le calcul donne donc : 2 500 € x 1/4 x 6, soit
                environ 3 750 € brut. Si une moyenne sur 3 mois ou 12 mois donne
                un salaire de référence plus favorable, cette base peut changer
                le résultat affiché.
              </p>
              <p className="mt-3">
                Cet exemple reste volontairement simple. Dans une situation
                réelle, le montant peut être influencé par des primes, des
                absences, une convention collective, une négociation ou des règles
                sociales et fiscales spécifiques. Pour cette raison, un calcul
                rupture conventionnelle employeur ou salarié doit être utilisé
                comme un point de départ fiable, pas comme une validation finale.
              </p>
            </section>

            <section aria-labelledby="pourquoi-simulateur">
              <h3
                id="pourquoi-simulateur"
                className="text-xl font-extrabold text-[#061B3A]"
              >
                Pourquoi utiliser un simulateur ?
              </h3>
              <p className="mt-3">
                Un simulateur rupture conventionnelle permet de gagner du temps
                et d’éviter les estimations approximatives faites de tête. Il
                rend le montant plus lisible, explique la méthode et met en
                évidence les informations qui peuvent modifier le résultat :
                dates, salaire brut, moyennes récentes, convention collective,
                statut et absences ayant réduit le salaire.
              </p>
              <p className="mt-3">
                Pour un salarié, l’intérêt est de comprendre ce qu’il peut
                percevoir au minimum et de préparer une discussion plus sereine.
                Pour un employeur, l’outil aide à cadrer une enveloppe de départ
                et à éviter une base de calcul manifestement incohérente. Dans
                les deux cas, le simulateur apporte de la pédagogie : il clarifie
                le brut, le net indicatif et la logique retenue sans demander de
                compte utilisateur ni enregistrer les informations saisies.
              </p>
            </section>

            <section aria-labelledby="conseils-negociation">
              <h3
                id="conseils-negociation"
                className="text-xl font-extrabold text-[#061B3A]"
              >
                Conseils pour négocier sa rupture conventionnelle
              </h3>
              <p className="mt-3">
                La négociation d’une rupture conventionnelle doit rester adaptée
                à la situation de chaque dossier. Il est préférable d’arriver à
                l’échange avec des éléments simples, vérifiables et présentés de
                manière calme. Le montant minimum estimé n’est qu’un socle : la
                discussion peut aussi porter sur la date de départ, la transition,
                les documents de fin de contrat ou l’accompagnement du salarié.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  Vérifier son ancienneté exacte et les périodes d’absence
                  récentes.
                </li>
                <li>
                  Comparer le salaire mensuel moyen avec les moyennes sur 3 et
                  12 mois si ces montants sont connus.
                </li>
                <li>
                  Identifier la convention collective applicable sur le bulletin
                  de paie ou le contrat de travail.
                </li>
                <li>
                  Préparer une fourchette réaliste plutôt qu’un montant unique
                  présenté comme automatique.
                </li>
                <li>
                  Faire vérifier les points sensibles lorsque la situation est
                  complexe ou lorsqu’un doute subsiste.
                </li>
              </ul>
            </section>

            <section aria-labelledby="conclusion-seo">
              <h3
                id="conclusion-seo"
                className="text-xl font-extrabold text-[#061B3A]"
              >
                Conclusion
              </h3>
              <p className="mt-3">
                La rupture conventionnelle est un dispositif utile lorsqu’elle
                est comprise, préparée et formalisée correctement. L’indemnité
                rupture conventionnelle dépend de l’ancienneté, du salaire de
                référence et parfois d’éléments complémentaires comme une
                convention collective ou une période d’absence. RuptureConv aide
                à obtenir rapidement une estimation claire, en brut et en net
                indicatif, tout en rappelant les limites du calcul. Le bon réflexe
                consiste à utiliser ce résultat comme un repère de discussion,
                puis à vérifier les règles applicables avant toute signature.
              </p>
              <p className="mt-3">
                Ce simulateur fournit une estimation indicative et ne remplace
                pas un conseil juridique personnalisé.
              </p>
            </section>
          </div>
        </article>
      </section>

      <section className="mx-auto mt-8 max-w-[900px]">
        <h2 className="text-2xl font-bold text-[#061B3A]">Sources et méthode</h2>
        <div className="mt-4 rounded-2xl border border-[#E5EEF0] bg-white p-5 text-sm leading-7 text-[#5B6B7C] shadow-sm">
          <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold text-[#168F86]">
            Basé sur les règles du Code du travail français
          </p>
          <p className="mt-4">
            La méthode de calcul affichée par le simulateur reprend la logique
            légale minimale utilisée par le moteur de calcul : ancienneté, salaire
            de référence, indemnité brute minimale, puis comparaison avec le
            montant négocié lorsqu’il est renseigné.
          </p>
          <p className="mt-3">
            Les limites sont volontairement visibles : la convention collective,
            l’éligibilité à la retraite, les règles d’exonération, la paie et la
            fiscalité peuvent modifier le résultat réel. Le site fournit une
            estimation pédagogique, pas un avis juridique personnalisé.
          </p>
        </div>
      </section>

      <section id="outils" className="mx-auto mt-10 max-w-[900px]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#061B3A]">
              Maillage vers les outils RH
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
              Des pages dédiées élargissent le parcours autour du
              coût employeur, du préavis et du licenciement.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {complementaryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
