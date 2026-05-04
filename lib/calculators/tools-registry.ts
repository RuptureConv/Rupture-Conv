export type HrToolDefinition = {
  id: string;
  title: string;
  description: string;
  href: string;
  status: "live" | "planned";
};

export const hrTools: HrToolDefinition[] = [
  {
    id: "rupture-conventionnelle",
    title: "Rupture conventionnelle",
    description: "Indemnité brute, montant retenu et net indicatif.",
    href: "/#simulateur",
    status: "live"
  },
  {
    id: "cout-employeur",
    title: "Coût employeur",
    description: "Estimer le coût global d'une rémunération.",
    href: "/outils/cout-employeur",
    status: "planned"
  },
  {
    id: "preavis",
    title: "Calcul préavis",
    description: "Vérifier les dates et durées de préavis.",
    href: "/outils/preavis",
    status: "planned"
  },
  {
    id: "licenciement",
    title: "Indemnité licenciement",
    description: "Comparer les bases légales et conventionnelles.",
    href: "/outils/licenciement",
    status: "planned"
  },
  {
    id: "conges-payes",
    title: "Congés payés",
    description: "Calculer les droits acquis et l'indemnité compensatrice.",
    href: "/outils/conges-payes",
    status: "planned"
  },
  {
    id: "brut-net",
    title: "Brut / net",
    description: "Convertir une rémunération mensuelle rapidement.",
    href: "/outils/brut-net",
    status: "planned"
  }
];
