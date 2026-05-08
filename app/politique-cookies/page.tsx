import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

const contactEmail = "contact@rupture-conv.fr";

export const metadata: Metadata = {
  title: "Politique cookies | RuptureConv",
  description:
    "Politique cookies de RuptureConv : cookies techniques, mesure d’audience, publicité Google AdSense et gestion du consentement.",
  alternates: {
    canonical: "/politique-cookies"
  }
};

export default function CookiesPolicyPage() {
  return (
    <LegalPage
      title="Politique cookies"
      intro="Cette page explique l’utilisation possible des cookies et traceurs sur rupture-conv.fr."
      sections={[
        {
          title: "Qu’est-ce qu’un cookie ?",
          body: (
            <p>
              Un cookie est un petit fichier déposé ou lu sur votre terminal
              lors de la consultation d’un site. Il peut permettre le
              fonctionnement technique du site, la mesure d’audience, la
              personnalisation ou l’affichage de publicités.
            </p>
          )
        },
        {
          title: "Cookies techniques",
          body: (
            <p>
              Les cookies ou stockages strictement nécessaires au fonctionnement
              du site peuvent être utilisés sans consentement préalable. Ils
              servent notamment à assurer l’affichage des pages, la sécurité et
              les fonctionnalités essentielles.
            </p>
          )
        },
        {
          title: "Mesure d’audience",
          body: (
            <p>
              RuptureConv peut utiliser des outils de mesure d’audience afin de
              comprendre la fréquentation du site et d’améliorer les contenus.
              Lorsque ces outils ne sont pas strictement nécessaires ou ne sont
              pas exemptés de consentement, ils ne doivent être activés qu’après
              votre accord.
            </p>
          )
        },
        {
          title: "Cookies publicitaires",
          body: (
            <p>
              Des cookies publicitaires peuvent être utilisés pour afficher des
              annonces, notamment via Google AdSense, mesurer leur performance
              ou limiter leur répétition. Aucun cookie publicitaire ne doit être
              déposé avant consentement.
            </p>
          )
        },
        {
          title: "Consentement",
          body: (
            <p>
              Lorsque des cookies soumis à consentement sont utilisés, vous
              devez pouvoir les accepter, les refuser ou retirer votre
              consentement à tout moment. Le refus des cookies non essentiels ne
              doit pas empêcher l’accès au simulateur.
            </p>
          )
        },
        {
          title: "Paramétrage du navigateur",
          body: (
            <p>
              Vous pouvez également configurer votre navigateur pour bloquer ou
              supprimer les cookies. Les paramètres varient selon le navigateur
              utilisé : Chrome, Safari, Firefox, Edge ou autre.
            </p>
          )
        },
        {
          title: "Durée de conservation",
          body: (
            <p>
              Les cookies sont conservés pour une durée limitée, proportionnée à
              leur finalité et conforme aux recommandations applicables. Les
              durées exactes peuvent dépendre des outils utilisés et de leurs
              paramètres.
            </p>
          )
        },
        {
          title: "Contact",
          body: (
            <p>
              Pour toute question concernant les cookies ou traceurs, vous
              pouvez écrire à{" "}
              <a className="font-bold text-[#168F86]" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              .
            </p>
          )
        }
      ]}
    />
  );
}
