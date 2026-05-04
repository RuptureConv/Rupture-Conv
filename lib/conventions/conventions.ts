import type { CollectiveAgreementStatus } from "@/types/termination";

export type CollectiveAgreement = {
  idcc: string;
  slug: string;
  name: string;
  shortName?: string;
  status: CollectiveAgreementStatus;
  notes?: string;
};

export const collectiveAgreements: CollectiveAgreement[] = [
  {
    idcc: "1486",
    slug: "syntec",
    name: "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
    shortName: "Syntec",
    status: "legal_only"
  },
  {
    idcc: "3248",
    slug: "metallurgie",
    name: "Métallurgie",
    status: "legal_only"
  },
  {
    idcc: "2216",
    slug: "commerce-detail-gros-predominance-alimentaire",
    name: "Commerce de détail et de gros à prédominance alimentaire",
    status: "legal_only"
  },
  {
    idcc: "1517",
    slug: "commerces-detail-non-alimentaires",
    name: "Commerces de détail non alimentaires",
    status: "legal_only"
  },
  {
    idcc: "1501",
    slug: "restauration-rapide",
    name: "Restauration rapide",
    status: "legal_only"
  },
  {
    idcc: "1979",
    slug: "hotels-cafes-restaurants",
    name: "Hôtels, cafés, restaurants",
    shortName: "HCR",
    status: "legal_only"
  },
  {
    idcc: "1090",
    slug: "services-automobile",
    name: "Services de l'automobile",
    status: "legal_only"
  },
  {
    idcc: "2098",
    slug: "prestataires-services-secteur-tertiaire",
    name: "Prestataires de services dans le secteur tertiaire",
    status: "legal_only"
  },
  {
    idcc: "2120",
    slug: "banque",
    name: "Banque",
    status: "legal_only"
  },
  {
    idcc: "1672",
    slug: "societes-assurances",
    name: "Sociétés d'assurances",
    status: "legal_only"
  },
  {
    idcc: "1527",
    slug: "immobilier",
    name: "Immobilier : administrateurs de biens, sociétés immobilières, agents immobiliers",
    shortName: "Immobilier",
    status: "legal_only"
  },
  {
    idcc: "1351",
    slug: "prevention-securite",
    name: "Prévention et sécurité",
    status: "legal_only"
  },
  {
    idcc: "0413",
    slug: "etablissements-services-personnes-inadaptees-handicapees",
    name: "Établissements et services pour personnes inadaptées et handicapées",
    shortName: "Convention 66",
    status: "legal_only",
    notes: "La convention dite « 66 » correspond à l'IDCC 0413 dans le Code du travail numérique."
  },
  {
    idcc: "2264",
    slug: "hospitalisation-privee",
    name: "Hospitalisation privée",
    status: "legal_only"
  },
  {
    idcc: "0029",
    slug: "hospitalisation-privee-fehap",
    name: "Hospitalisation privée à but non lucratif",
    shortName: "FEHAP - convention 51",
    status: "legal_only",
    notes: "La convention dite « 51 » FEHAP correspond à l'IDCC 0029 dans le Code du travail numérique."
  },
  {
    idcc: "1596",
    slug: "batiment-ouvriers-jusqua-10-salaries",
    name: "Bâtiment ouvriers jusqu'à 10 salariés",
    status: "legal_only"
  },
  {
    idcc: "1597",
    slug: "batiment-ouvriers-plus-de-10-salaries",
    name: "Bâtiment ouvriers plus de 10 salariés",
    status: "legal_only"
  },
  {
    idcc: "1702",
    slug: "travaux-publics-ouvriers",
    name: "Travaux publics ouvriers",
    status: "legal_only"
  },
  {
    idcc: "0016",
    slug: "transports-routiers",
    name: "Transports routiers et activités auxiliaires du transport",
    status: "legal_only"
  }
];

export function findCollectiveAgreementByIdcc(
  idcc: string | undefined
): CollectiveAgreement | undefined {
  if (!idcc) {
    return undefined;
  }

  const normalized = idcc.padStart(4, "0");
  return collectiveAgreements.find((agreement) => agreement.idcc === normalized);
}
