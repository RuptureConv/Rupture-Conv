export type PostSimulationLink = {
  description: string;
  eventName?: "post_simulation_click" | "tool_crosslink_click";
  href: string;
  label: string;
  targetPage: string;
};

export const terminationNextStepLinks: PostSimulationLink[] = [
  {
    label: "Estimer mes droits au chômage",
    description: "Vérifiez l'ARE possible après la rupture et la date probable du premier paiement.",
    href: "/simulateur-chomage-rupture-conventionnelle",
    targetPage: "simulateur_chomage_rupture_conventionnelle",
    eventName: "post_simulation_click"
  },
  {
    label: "Comprendre le délai de carence",
    description: "Regardez pourquoi le chômage ne commence pas toujours juste après la fin du contrat.",
    href: "/delai-de-carence-chomage",
    targetPage: "delai_de_carence_chomage",
    eventName: "post_simulation_click"
  },
  {
    label: "Préparer ma demande",
    description: "Consultez un modèle de lettre simple avant d'échanger avec l'employeur.",
    href: "/modele-lettre-rupture-conventionnelle",
    targetPage: "modele_lettre_rupture_conventionnelle",
    eventName: "post_simulation_click"
  },
  {
    label: "Lire le guide complet",
    description: "Revoyez les étapes, les délais, le chômage et les points à vérifier avant de signer.",
    href: "/rupture-conventionnelle",
    targetPage: "rupture_conventionnelle",
    eventName: "post_simulation_click"
  },
  {
    label: "Comparer brut et net",
    description: "Utile si vous voulez relire un salaire ou une indemnité avec un repère mensuel clair.",
    href: "/salaire-brut-net",
    targetPage: "salaire_brut_net",
    eventName: "post_simulation_click"
  }
];

export const unemploymentNextStepLinks: PostSimulationLink[] = [
  {
    label: "Comprendre mon délai de carence",
    description: "Vérifiez les jours d'attente, les congés payés et le différé spécifique.",
    href: "/delai-de-carence-chomage",
    targetPage: "delai_de_carence_chomage",
    eventName: "post_simulation_click"
  },
  {
    label: "Relier rupture conventionnelle et ARE",
    description: "Revoyez ce qui change après une rupture conventionnelle avant l'inscription.",
    href: "/rupture-conventionnelle-et-allocation-chomage",
    targetPage: "rupture_conventionnelle_et_allocation_chomage",
    eventName: "post_simulation_click"
  },
  {
    label: "Lire le guide chômage ARE",
    description: "Revoyez les conditions, les délais et les points à confirmer avec France Travail.",
    href: "/chomage-are",
    targetPage: "chomage_are",
    eventName: "post_simulation_click"
  },
  {
    label: "Calculer un salaire brut en net",
    description: "Gardez un repère mensuel si vous comparez salaire, indemnité et allocation.",
    href: "/salaire-brut-net",
    targetPage: "salaire_brut_net",
    eventName: "post_simulation_click"
  }
];

export const salaryNextStepLinks: PostSimulationLink[] = [
  {
    label: "Estimer une indemnité de rupture",
    description: "Utilisez votre salaire brut mensuel pour obtenir un premier montant indicatif.",
    href: "/simulateur-rupture-conventionnelle",
    targetPage: "simulateur_rupture_conventionnelle",
    eventName: "post_simulation_click"
  },
  {
    label: "Estimer mes droits au chômage",
    description: "Vérifiez l'ARE possible si votre fin de contrat ouvre droit au chômage.",
    href: "/simulateur-chomage-rupture-conventionnelle",
    targetPage: "simulateur_chomage_rupture_conventionnelle",
    eventName: "post_simulation_click"
  },
  {
    label: "Lire le guide chômage ARE",
    description: "Revoyez les conditions, les délais et les points à confirmer avec France Travail.",
    href: "/chomage-are",
    targetPage: "chomage_are",
    eventName: "post_simulation_click"
  }
];
