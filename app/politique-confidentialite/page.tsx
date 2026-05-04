import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

const contactEmail = "contact@rupture-conv.fr";

export const metadata: Metadata = {
  title: "Politique de confidentialité | RuptureConv",
  description:
    "Politique de confidentialité de RuptureConv : données, finalités, cookies, publicité, droits RGPD et contact.",
  alternates: {
    canonical: "/politique-confidentialite"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Cette politique explique comment les données peuvent être traitées lors de l’utilisation de rupture-conv.fr."
      sections={[
        {
          title: "Responsable du traitement",
          body: (
            <p>
              Le responsable du traitement est Vincent G., éditeur du site
              rupture-conv.fr. Pour toute question relative aux données
              personnelles :{" "}
              <a className="font-bold text-[#168F86]" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              .
            </p>
          )
        },
        {
          title: "Données collectées",
          body: (
            <>
              <p>
                Le site peut traiter des données de navigation : adresse IP,
                type de navigateur, pages consultées, informations techniques,
                événements de mesure d’audience et interactions avec les pages.
              </p>
              <p>
                Les données saisies dans le simulateur servent uniquement à
                calculer l’estimation affichée dans le navigateur. Elles ne sont
                pas enregistrées ni conservées par RuptureConv.
              </p>
              <p>
                Si vous contactez le site par email, votre adresse email et le
                contenu de votre message sont traités afin de répondre à votre
                demande.
              </p>
            </>
          )
        },
        {
          title: "Finalités du traitement",
          body: (
            <p>
              Les données peuvent être utilisées pour assurer le fonctionnement
              du site, améliorer le service, sécuriser l’accès, mesurer
              l’audience, comprendre l’utilisation des contenus et afficher des
              publicités ou ressources partenaires lorsque cela est activé.
            </p>
          )
        },
        {
          title: "Outils tiers",
          body: (
            <p>
              Le site est hébergé par Vercel. Il peut utiliser Google AdSense
              pour l’affichage publicitaire et Google Analytics ou une solution
              équivalente de mesure d’audience si ces services sont activés avec
              les paramètres et consentements requis.
            </p>
          )
        },
        {
          title: "Transferts hors Union européenne",
          body: (
            <p>
              Certains prestataires, notamment Vercel ou Google, peuvent être
              établis aux États-Unis ou traiter des données hors de l’Union
              européenne. Dans ce cas, les transferts sont encadrés selon les
              mécanismes prévus par la réglementation applicable.
            </p>
          )
        },
        {
          title: "Durées de conservation",
          body: (
            <p>
              Les données saisies dans le simulateur ne sont pas conservées. Les
              données de contact sont conservées pendant une durée raisonnable
              nécessaire au traitement de la demande. Les données de mesure
              d’audience et publicitaires, lorsqu’elles existent, sont conservées
              selon les durées définies par les outils concernés et la
              réglementation applicable.
            </p>
          )
        },
        {
          title: "Vos droits RGPD",
          body: (
            <p>
              Vous pouvez demander l’accès, la rectification, la suppression,
              l’opposition au traitement, la limitation du traitement et la
              portabilité de vos données lorsque ces droits sont applicables.
              Pour exercer ces droits, contactez{" "}
              <a className="font-bold text-[#168F86]" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              .
            </p>
          )
        },
        {
          title: "Réclamation auprès de la CNIL",
          body: (
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez
              adresser une réclamation à la CNIL, autorité française de
              protection des données personnelles : www.cnil.fr.
            </p>
          )
        }
      ]}
    />
  );
}
