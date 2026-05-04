import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

const contactEmail = "contact@rupture-conv.fr";

export const metadata: Metadata = {
  title: "Contact | RuptureConv",
  description:
    "Contacter RuptureConv pour une question sur le simulateur, les données personnelles, les partenariats ou le site.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact"
      intro="Pour toute question concernant RuptureConv, le simulateur, vos données personnelles ou les partenariats, vous pouvez nous contacter à l’adresse suivante :"
      sections={[
        {
          title: "Adresse de contact",
          body: (
            <p>
              <a className="text-lg font-black text-[#168F86]" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </p>
          )
        },
        {
          title: "Important",
          body: (
            <p>
              RuptureConv ne fournit pas de conseil juridique personnalisé par
              email. Pour une situation individuelle engageante, rapprochez-vous
              d’un professionnel compétent.
            </p>
          )
        }
      ]}
    />
  );
}
