export type OfficialSourceTopic =
  | "termination"
  | "unemployment"
  | "salary";

export type OfficialSource = {
  label: string;
  url: string;
  description: string;
  topics: OfficialSourceTopic[];
};

export const officialSources: OfficialSource[] = [
  {
    label: "Service Public — rupture conventionnelle",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19030",
    description:
      "Procédure, accord des parties, indemnité, délais et homologation.",
    topics: ["termination"]
  },
  {
    label: "Légifrance — Code du travail, article L1237-11",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019071187",
    description:
      "Principe de l’accord commun et cadre de la rupture conventionnelle individuelle.",
    topics: ["termination"]
  },
  {
    label: "France Travail — calcul de l’ARE",
    url: "https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati/lessentiel-a-savoir-sur-lallocat/quelle-somme-vais-je-recevoir/comment-est-calcule-le-montant-d.html",
    description:
      "Salaire de référence, montant de l’allocation et vérifications appliquées au dossier.",
    topics: ["unemployment"]
  },
  {
    label: "Mon-entreprise Urssaf — salaire brut/net",
    url: "https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net",
    description:
      "Simulateur public de référence pour comparer salaire brut, cotisations et net.",
    topics: ["salary"]
  }
];
