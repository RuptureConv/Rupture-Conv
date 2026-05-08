import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

const contactEmail = "contact@rupture-conv.fr";

export const metadata: Metadata = {
  title: "Mentions légales | RuptureConv",
  description:
    "Mentions légales de RuptureConv, éditeur, hébergement, responsabilité, publicité et nature indicative du simulateur.",
  alternates: {
    canonical: "/mentions-legales"
  }
};

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Mentions légales"
      intro="Informations légales applicables au site rupture-conv.fr, simulateur indicatif de rupture conventionnelle."
      sections={[
        {
          title: "Éditeur du site",
          body: (
            <>
              <p>Le site rupture-conv.fr est édité par Vincent G., particulier.</p>
              <p>Adresse : Adresse communiquée à l’hébergeur.</p>
              <p>
                Contact :{" "}
                <a className="font-bold text-[#168F86]" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                .
              </p>
            </>
          )
        },
        {
          title: "Responsable de publication",
          body: <p>Le responsable de publication est Vincent G.</p>
        },
        {
          title: "Hébergement",
          body: (
            <p>
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, États-Unis.
            </p>
          )
        },
        {
          title: "Nature du service",
          body: (
            <p>
              RuptureConv met à disposition un simulateur d’indemnité de rupture
              conventionnelle. Les résultats fournis sont des estimations
              indicatives, calculées à partir des informations saisies par
              la personne qui utilise le site. Le simulateur ne remplace pas un conseil juridique,
              RH, fiscal, social ou paie personnalisé.
            </p>
          )
        },
        {
          title: "Absence de conseil juridique personnalisé",
          body: (
            <p>
              Les informations publiées sur le site sont générales et
              pédagogiques. Elles ne tiennent pas compte de l’ensemble des
              situations individuelles, des conventions collectives, des accords
              d’entreprise ou des règles spécifiques applicables. Pour toute
              décision engageante, il est recommandé de se rapprocher d’un
              professionnel compétent.
            </p>
          )
        },
        {
          title: "Propriété intellectuelle",
          body: (
            <p>
              Les contenus, textes, interfaces, composants, éléments graphiques
              et codes présents sur rupture-conv.fr sont protégés par le droit de
              la propriété intellectuelle. Toute reproduction, adaptation,
              extraction ou réutilisation substantielle sans autorisation
              préalable est interdite.
            </p>
          )
        },
        {
          title: "Limitation de responsabilité",
          body: (
            <p>
              L’éditeur s’efforce de proposer un service clair et à jour, mais
              ne garantit pas l’exactitude complète, l’exhaustivité ou
              l’adéquation des résultats à une situation particulière.
              Chaque personne reste responsable de l’utilisation des
              estimations affichées et des décisions prises sur cette base.
            </p>
          )
        },
        {
          title: "Publicité et partenaires",
          body: (
            <p>
              Le site peut afficher des publicités, notamment via Google
              AdSense, ainsi que des liens vers des ressources ou partenaires.
              Certains liens peuvent être sponsorisés ou donner lieu à une
              rémunération. Ces contenus ne constituent pas une recommandation
              personnalisée ni un conseil juridique.
            </p>
          )
        },
        {
          title: "Liens externes",
          body: (
            <p>
              Le site peut contenir des liens vers des sites tiers. L’éditeur ne
              contrôle pas ces sites et ne peut être tenu responsable de leur
              contenu, de leurs pratiques de confidentialité, de leurs services
              ou de leurs mises à jour.
            </p>
          )
        }
      ]}
    />
  );
}
