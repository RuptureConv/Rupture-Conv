import { RULES_2026 } from "@/lib/are-rules";
import { calculateUnemploymentProjection } from "@/lib/calculators/unemployment-projection";

export type UnemploymentSeoSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type UnemploymentSeoFaq = {
  question: string;
  answer: string;
};

export type UnemploymentSeoTableRow = {
  label: string;
  value: string;
  note: string;
};

export type UnemploymentSeoLink = {
  href: string;
  label: string;
  description: string;
};

export type UnemploymentSeoCta = {
  title: string;
  body: string;
  label: string;
  href: string;
};

export type UnemploymentSeoScenario = {
  salary: string;
  sjr: string;
  dailyAre: string;
  monthlyGrossAre: string;
  monthlyNetAre: string;
  duration: string;
  firstPayment: string;
};

export type UnemploymentSeoPage = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category: "Chômage" | "ARE" | "France Travail" | "Rupture conventionnelle";
  updatedAt: string;
  readingTime: string;
  hero: {
    eyebrow: string;
    summary: string;
  };
  immediateAnswer: string;
  takeaways: string[];
  sections: UnemploymentSeoSection[];
  scenarios: UnemploymentSeoScenario[];
  examplesTitle: string;
  examplesIntro: string;
  showSalaryExamples: boolean;
  tableTitle: string;
  tableIntro: string;
  tableRows: UnemploymentSeoTableRow[];
  flowTitle: string;
  flowIntro: string;
  schemaSteps: string[];
  premiumFlow?: string[];
  mistakes: string[];
  faq: UnemploymentSeoFaq[];
  internalLinks: UnemploymentSeoLink[];
  cta: UnemploymentSeoCta;
};

const updatedAt = "6 juin 2026";

const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2
});

const integerEuroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

function formatEuro(value: number, rounded = false): string {
  return (rounded ? integerEuroFormatter : euroFormatter).format(value);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${value}T00:00:00.000Z`));
}

const links = {
  chomage: {
    href: "/chomage-are",
    label: "Guide chômage ARE",
    description: "Revenir à la page pilier sur France Travail, l'ARE, le calcul et les délais."
  },
  calcul: {
    href: "/calcul-allocation-chomage",
    label: "Calcul allocation chômage",
    description: "Comprendre le calcul du SJR, de l'ARE et des différés."
  },
  simulator: {
    href: "/simulateur-allocation-chomage",
    label: "Simulateur allocation chômage",
    description: "Comprendre l'outil avant de lancer la projection ARE détaillée."
  },
  currentSimulator: {
    href: "/simulateur-chomage-rupture-conventionnelle",
    label: "Projection chômage actuelle",
    description: "Tester ARE, différés et premier versement avec l'outil déjà disponible."
  },
  rupture: {
    href: "/rupture-conventionnelle",
    label: "Rupture conventionnelle",
    description: "Relier l'indemnité de départ, le calendrier de fin de contrat et l'ARE."
  },
  simulateur: {
    href: "/simulateur-rupture-conventionnelle",
    label: "Simulateur rupture conventionnelle",
    description: "Estimer l'indemnité minimale avant de projeter le chômage."
  },
  salaire: {
    href: "/salaire",
    label: "Guide salaire",
    description: "Comprendre brut, net et salaire de référence avant de calculer l'ARE."
  },
  salaireBrutNet: {
    href: "/salaire-brut-net",
    label: "Salaire brut en net",
    description: "Convertir le salaire brut utilisé dans les exemples."
  },
  brutNet: {
    href: "/difference-brut-net",
    label: "Différence brut/net",
    description: "Éviter de confondre salaire brut, net et allocation."
  }
} satisfies Record<string, UnemploymentSeoLink>;

function scenarioFor(salary: number): UnemploymentSeoScenario {
  const result = calculateUnemploymentProjection({
    age: 38,
    averageMonthlyGrossSalary: salary,
    contractEndDate: "2026-07-31",
    exitMode: "rupture_conventionnelle",
    workedDays: 520,
    workedHours: 3640,
    seniorityYears: 6,
    workTime: "full_time",
    supraLegalIndemnity: 0,
    paidLeaveDays: 0
  });

  return {
    salary: formatEuro(salary, true),
    sjr: formatEuro(result.salary.estimatedSjr),
    dailyAre: formatEuro(result.salary.dailyGrossAre),
    monthlyGrossAre: formatEuro(result.salary.monthlyGrossAre),
    monthlyNetAre: formatEuro(result.salary.monthlyNetAre),
    duration: `${result.duration.estimatedDays} jours`,
    firstPayment: formatDate(result.waitingPeriods.estimatedFirstPaymentDate)
  };
}

const commonScenarios = [2000, 2500, 3000, 3500, 4000].map(scenarioFor);

function standardTableRows(primary = commonScenarios[1]): UnemploymentSeoTableRow[] {
  return [
    {
      label: "Affiliation minimale",
      value: `${RULES_2026.affiliation.minimumWorkedDays} jours ou ${RULES_2026.affiliation.minimumWorkedHours} heures`,
      note: "À rechercher en principe sur 24 mois, ou 36 mois à partir de 55 ans."
    },
    {
      label: "SJR estimé",
      value: primary.sjr,
      note: `Exemple avec ${primary.salary} brut mensuel moyen, sur une estimation simplifiée.`
    },
    {
      label: "ARE journalière",
      value: primary.dailyAre,
      note: "Le calcul retient le meilleur résultat entre les deux formules, dans la limite de 75 % du SJR."
    },
    {
      label: "Délai d'attente",
      value: `${RULES_2026.waitingPeriods.legalWaitingDays} jours`,
      note: "Il peut s'ajouter aux différés congés payés et spécifique."
    },
    {
      label: "Durée maximale générale",
      value: "18 mois avant 55 ans",
      note: "Repère général en métropole : 548 jours, avec durées plus longues à 55-56 ans et 57 ans ou plus."
    }
  ];
}

function tableRowsFor(slug: string): UnemploymentSeoTableRow[] {
  const primary = commonScenarios[1];

  switch (slug) {
    case "calcul-allocation-chomage":
    case "comment-est-calculee-l-are":
      return [
        {
          label: "Point de départ",
          value: "Salaire brut de référence",
          note: "France Travail part des rémunérations retenues dans la période de référence, pas du salaire net versé sur le compte."
        },
        {
          label: "Base du calcul",
          value: `SJR estimé : ${primary.sjr}`,
          note: `Repère simplifié avec ${primary.salary} brut mensuel moyen. Le SJR officiel peut différer si le parcours n'est pas linéaire.`
        },
        {
          label: "Formules comparées",
          value: "40,4 % du SJR + 13,18 € ou 57 % du SJR",
          note: "Le simulateur compare les deux repères intégrés au calcul et garde un résultat encadré."
        },
        {
          label: "Montant mensuel",
          value: `${primary.monthlyNetAre} net estimé`,
          note: "Le montant mensuel reste indicatif, car l'allocation est d'abord une allocation journalière."
        },
        {
          label: "Ce qui peut changer",
          value: "Temps partiel, primes, interruptions, reliquat",
          note: "Ces situations justifient de relire l'estimation avec les justificatifs France Travail."
        }
      ];

    case "delai-de-carence-chomage":
    case "premier-paiement-france-travail":
    case "quand-touche-t-on-le-chomage":
    case "chomage-et-conges-payes":
      return [
        {
          label: "Délai d'attente",
          value: `${RULES_2026.waitingPeriods.legalWaitingDays} jours`,
          note: "Repère fixe appliqué avant le début possible de l'indemnisation, selon la situation."
        },
        {
          label: "Congés payés",
          value: `Plafond ${RULES_2026.waitingPeriods.paidLeaveMaxDays} jours`,
          note: "Le différé dépend des indemnités compensatrices de congés payés et du SJR."
        },
        {
          label: "Indemnités de rupture",
          value: `Sommes supra-légales / ${RULES_2026.waitingPeriods.specificDivisor}`,
          note: `Le différé spécifique est plafonné à ${RULES_2026.waitingPeriods.specificMaxDays} jours dans le cas général.`
        },
        {
          label: "Paiement mensuel",
          value: "Au début du mois suivant",
          note: "France Travail verse l'allocation à terme échu, après actualisation mensuelle."
        },
        {
          label: "Point à vérifier",
          value: "Attestation employeur",
          note: "Une erreur sur les dates, salaires ou indemnités peut retarder l'examen du dossier."
        }
      ];

    case "chomage-apres-rupture-conventionnelle":
    case "rupture-conventionnelle-et-allocation-chomage":
    case "indemnite-rupture-et-chomage":
      return [
        {
          label: "Droit possible",
          value: "Rupture homologuée + conditions ARE",
          note: "La rupture conventionnelle permet un examen des droits, mais France Travail confirme le dossier."
        },
        {
          label: "Indemnité minimale",
          value: "À séparer de l'ARE",
          note: "L'indemnité de rupture est versée par l'employeur ; l'ARE est versée par France Travail."
        },
        {
          label: "Part supra-légale",
          value: "Peut créer un différé",
          note: "Plus la part négociée au-delà du minimum est élevée, plus le premier paiement peut être décalé."
        },
        {
          label: "À simuler avant signature",
          value: "Indemnité + ARE + délai",
          note: "La bonne décision dépend souvent du calendrier, pas seulement du montant négocié."
        },
        {
          label: "Document sensible",
          value: "Attestation employeur",
          note: "Elle sert à qualifier la fin de contrat, les salaires et les indemnités."
        }
      ];

    case "chomage-apres-demission":
      return [
        {
          label: "Démission classique",
          value: "Pas de droit automatique",
          note: "Il faut éviter de l'assimiler à une rupture conventionnelle ou à un licenciement."
        },
        {
          label: "Exceptions possibles",
          value: "Légitime, reconversion, reliquat",
          note: "Chaque cas dépend des justificatifs et de la chronologie des démarches."
        },
        {
          label: "Réexamen",
          value: "Après 121 jours",
          note: "Le réexamen n'est pas un versement automatique ; France Travail apprécie le dossier."
        },
        {
          label: "Avant de partir",
          value: "Valider le scénario",
          note: "Une vérification préalable évite plusieurs mois sans revenu de remplacement."
        },
        {
          label: "Alternative à comparer",
          value: "Rupture conventionnelle",
          note: "Si elle est possible, elle change fortement la lecture chômage."
        }
      ];

    case "chomage-fin-cdd":
    case "chomage-apres-licenciement":
    case "chomage-apres-cdi":
      return [
        {
          label: "Nature de la fin",
          value: "Perte d'emploi ou situation assimilée",
          note: "Fin de CDD, licenciement et rupture conventionnelle peuvent permettre un examen des droits."
        },
        {
          label: "Activité minimale",
          value: `${RULES_2026.affiliation.minimumWorkedDays} jours ou ${RULES_2026.affiliation.minimumWorkedHours} heures`,
          note: "Repère général à vérifier sur la période de référence applicable."
        },
        {
          label: "Documents",
          value: "Attestation, solde, certificat",
          note: "Sans documents cohérents, le paiement peut être retardé."
        },
        {
          label: "Premier paiement",
          value: "Après différés éventuels",
          note: "Congés payés et indemnités peuvent décaler le départ de l'indemnisation."
        },
        {
          label: "Cas particulier",
          value: "CSP en licenciement économique",
          note: "Le licenciement économique peut ouvrir un parcours spécifique à étudier séparément."
        }
      ];

    case "chomage-cadre":
      return [
        {
          label: "Salaire variable",
          value: "Bonus, primes, avantages",
          note: "Les rémunérations variables rendent l'estimation plus sensible."
        },
        {
          label: "Allocation élevée",
          value: "Dégressivité possible",
          note: `Elle peut concerner certains dossiers après ${RULES_2026.degressivity.startsAfterDays} jours, hors exclusion liée à l'âge.`
        },
        {
          label: "Indemnité négociée",
          value: "Différé spécifique possible",
          note: "Une indemnité supra-légale améliore le départ mais peut repousser l'ARE."
        },
        {
          label: "Lecture utile",
          value: "Mois 1 puis projection longue",
          note: "Pour un cadre, la baisse éventuelle dans le temps compte autant que le montant initial."
        },
        {
          label: "À préparer",
          value: "Bulletins + variable",
          note: "Les justificatifs évitent une estimation trop lisse."
        }
      ];

    case "chomage-senior":
    case "duree-indemnisation-chomage":
      return [
        {
          label: "Moins de 55 ans",
          value: `${RULES_2026.duration.standardMaxDays.under55} jours max`,
          note: "Repère général, sous réserve de l'activité réellement retenue."
        },
        {
          label: "55 à 56 ans",
          value: `${RULES_2026.duration.standardMaxDays.age55To56} jours max`,
          note: "La période de recherche d'affiliation est aussi plus longue à partir de 55 ans."
        },
        {
          label: "57 ans et plus",
          value: `${RULES_2026.duration.standardMaxDays.age57Plus} jours max`,
          note: "La proximité de la retraite doit être vérifiée avec le dossier personnel."
        },
        {
          label: "Dégressivité",
          value: `Exclusion à partir de ${RULES_2026.degressivity.excludedFromAge} ans`,
          note: "Selon les repères intégrés au calcul, les allocataires de 55 ans et plus ne sont pas concernés."
        },
        {
          label: "Point sensible",
          value: "Retraite et maintien des droits",
          note: "Le simulateur ne remplace pas une vérification retraite."
        }
      ];

    case "france-travail-inscription":
    case "france-travail-actualisation":
      return [
        {
          label: "Inscription",
          value: "Déclenche l'étude du dossier",
          note: "Elle ne supprime pas les différés et ne garantit pas le paiement immédiat."
        },
        {
          label: "Actualisation",
          value: "Chaque mois",
          note: "Elle conditionne le paiement et doit déclarer les changements de situation."
        },
        {
          label: "Paiement",
          value: "À terme échu",
          note: "L'allocation d'un mois est versée au début du mois suivant."
        },
        {
          label: "Risque",
          value: "Blocage ou trop-perçu",
          note: "Une déclaration incomplète peut retarder le paiement ou provoquer une régularisation."
        },
        {
          label: "À garder",
          value: "Justificatifs",
          note: "Bulletins, attestations et preuves d'activité peuvent être demandés."
        }
      ];

    case "cumul-are-salaire":
      return [
        {
          label: "Principe",
          value: "Salaire déclaré + ARE ajustée",
          note: "France Travail recalcule le mois selon l'activité reprise."
        },
        {
          label: "Actualisation",
          value: "Indispensable",
          note: "Heures, revenus et justificatifs doivent être déclarés avec précision."
        },
        {
          label: "Effet possible",
          value: "Droits consommés moins vite",
          note: "Les jours non indemnisés peuvent prolonger la durée potentielle des droits."
        },
        {
          label: "Limite",
          value: "Pas un double revenu garanti",
          note: "Le cumul dépend du salaire repris et des règles appliquées au dossier."
        },
        {
          label: "À comparer",
          value: "Salaire net + ARE restante",
          note: "Le bon repère est le revenu total du mois, pas seulement l'allocation."
        }
      ];

    default:
      return standardTableRows();
  }
}

const commonSchemaSteps = [
  "Fin du contrat",
  "Inscription France Travail",
  "Calcul du SJR",
  "Calcul de l'ARE",
  "Application des différés",
  "Versement des allocations"
];

const premiumFlow = [
  "Salaire brut moyen",
  "Calcul du SJR",
  "Calcul ARE",
  "Différés éventuels",
  "Montant versé"
];

function flowFor(slug: string, premium?: boolean): string[] | undefined {
  switch (slug) {
    case "delai-de-carence-chomage":
    case "quand-touche-t-on-le-chomage":
    case "premier-paiement-france-travail":
      return [
        "Fin du contrat",
        "Inscription",
        "Différés",
        "Actualisation",
        "Paiement"
      ];

    case "chomage-apres-demission":
      return [
        "Démission",
        "Motif à vérifier",
        "Dossier France Travail",
        "Décision",
        "Réexamen éventuel"
      ];

    case "chomage-cadre":
      return [
        "Salaire variable",
        "SJR",
        "ARE élevée",
        "Dégressivité éventuelle",
        "Projection"
      ];

    case "chomage-senior":
    case "duree-indemnisation-chomage":
      return [
        "Âge",
        "Période de référence",
        "Durée maximale",
        "Retraite",
        "Retour à l'emploi"
      ];

    case "france-travail-inscription":
    case "france-travail-actualisation":
      return [
        "Inscription",
        "Documents",
        "Actualisation",
        "Calcul du mois",
        "Paiement"
      ];

    case "cumul-are-salaire":
      return [
        "Reprise d'emploi",
        "Salaire déclaré",
        "ARE ajustée",
        "Jours non payés",
        "Droits prolongés"
      ];

    default:
      return premium ? premiumFlow : undefined;
  }
}

function pageProfile(slug: string): {
  takeaways: string[];
  examplesTitle: string;
  examplesIntro: string;
  showSalaryExamples: boolean;
  tableTitle: string;
  tableIntro: string;
  flowTitle: string;
  flowIntro: string;
} {
  const defaultProfile = {
    takeaways: [
      "Le résultat reste une estimation : France Travail confirme seul les droits.",
      "Le montant de l'ARE dépend du salaire de référence, de l'activité passée et de la situation personnelle.",
      "Le premier paiement peut être décalé par les congés payés ou une indemnité supra-légale."
    ],
    examplesTitle: "Exemples de montants ARE selon le salaire brut",
    examplesIntro:
      "Repères indicatifs pour un salarié de 38 ans à temps plein, avec activité suffisante et sans différé autre que le délai d'attente.",
    showSalaryExamples: true,
    tableTitle: "Repères utiles",
    tableIntro: "Les points à relire avant de tirer une conclusion à partir d'une estimation.",
    flowTitle: "Parcours à suivre",
    flowIntro: "La lecture la plus simple consiste à séparer droit, montant, délai et paiement."
  };

  const profiles: Record<string, Partial<typeof defaultProfile>> = {
    "calcul-allocation-chomage": {
      takeaways: [
        "Le calcul commence par le salaire brut retenu, pas par le net bancaire.",
        "Le SJR sert de base à l'allocation journalière.",
        "Un résultat fiable doit aussi regarder les différés, pas seulement le montant mensuel."
      ],
      tableTitle: "Ce qui influence vraiment le calcul",
      tableIntro: "Ce tableau aide à distinguer les variables de calcul des simples repères pédagogiques.",
      flowTitle: "Lecture du calcul ARE",
      flowIntro: "L'objectif est de comprendre comment France Travail passe des anciens salaires à une allocation."
    },
    "simulateur-allocation-chomage": {
      takeaways: [
        "Le simulateur doit vous aider à décider, pas seulement afficher un chiffre.",
        "Les montants sont estimatifs et doivent être lus avec le calendrier.",
        "Après une rupture conventionnelle, l'indemnité négociée peut modifier le délai."
      ],
      tableTitle: "Ce que le simulateur vérifie",
      tableIntro: "Chaque champ sert à expliquer une partie du résultat : montant, durée ou date de paiement.",
      flowTitle: "Ce que l'outil transforme",
      flowIntro: "Le parcours part de votre situation réelle pour produire une projection lisible."
    },
    "chomage-apres-rupture-conventionnelle": {
      takeaways: [
        "La rupture conventionnelle peut ouvrir un examen des droits ARE, sous réserve du dossier.",
        "L'indemnité de rupture et l'allocation chômage sont deux calculs séparés.",
        "Une part supra-légale peut repousser le premier paiement."
      ],
      tableTitle: "Rupture conventionnelle : points à vérifier",
      tableIntro: "Ce tableau relie la procédure, l'indemnité versée et le calendrier France Travail.",
      flowTitle: "Après signature",
      flowIntro: "La bonne lecture suit le calendrier réel : homologation, fin de contrat, inscription, différés."
    },
    "combien-vais-je-toucher-au-chomage": {
      takeaways: [
        "Le montant mensuel dépend du SJR et des formules ARE.",
        "L'ARE n'est pas un pourcentage simple du salaire net.",
        "La date de paiement peut compter autant que le montant."
      ],
      tableTitle: "Ce qui fait varier le montant",
      tableIntro: "Les exemples donnent un ordre de grandeur ; ce tableau explique pourquoi le résultat peut bouger.",
      flowTitle: "Du salaire au montant perçu",
      flowIntro: "La question du montant se traite avec le salaire, le SJR, la formule ARE et les différés."
    },
    "delai-de-carence-chomage": {
      takeaways: [
        "Le chômage ne commence pas toujours dès le lendemain de la fin du contrat.",
        "Trois mécanismes peuvent se cumuler : attente, congés payés, indemnités de rupture.",
        "Le différé décale le paiement ; il ne signifie pas forcément perte du droit."
      ],
      examplesTitle: "Exemple de délai selon les sommes de fin de contrat",
      examplesIntro:
        "Ces repères montrent pourquoi deux salariés avec la même ARE peuvent ne pas être payés à la même date.",
      showSalaryExamples: false,
      tableTitle: "Les trois délais à distinguer",
      tableIntro: "C'est le tableau le plus utile avant de prévoir sa trésorerie.",
      flowTitle: "Du départ au premier paiement",
      flowIntro: "Le calendrier se lit dans l'ordre : fin de contrat, différés, actualisation, paiement."
    },
    "quand-touche-t-on-le-chomage": {
      takeaways: [
        "L'allocation d'un mois est versée au début du mois suivant.",
        "L'actualisation mensuelle reste indispensable.",
        "La première date de paiement dépend du dossier, des différés et des documents transmis."
      ],
      showSalaryExamples: false,
      tableTitle: "Ce qui décale ou déclenche le paiement",
      tableIntro: "Cette page se concentre sur le moment où l'argent arrive réellement.",
      flowTitle: "Calendrier de paiement",
      flowIntro: "Le paiement dépend d'une chaîne complète, pas d'une seule date."
    },
    "premier-paiement-france-travail": {
      takeaways: [
        "Le premier paiement arrive après examen du dossier et différés éventuels.",
        "Une attestation employeur erronée peut ralentir le traitement.",
        "Le simulateur donne une date probable, pas une promesse de virement."
      ],
      showSalaryExamples: false,
      tableTitle: "Points qui influencent le premier paiement",
      tableIntro: "À vérifier avant d'organiser les premières semaines après la fin du contrat.",
      flowTitle: "Date probable de versement",
      flowIntro: "Le premier paiement dépend à la fois des règles et de la qualité du dossier."
    },
    "chomage-apres-demission": {
      takeaways: [
        "Une démission classique n'ouvre pas automatiquement droit à l'ARE.",
        "Les exceptions doivent être vérifiées avant de quitter son poste.",
        "Le réexamen après 121 jours n'est pas une garantie de paiement."
      ],
      showSalaryExamples: false,
      tableTitle: "Démission : les cas à ne pas mélanger",
      tableIntro: "Le risque principal est de croire qu'une démission se traite comme une rupture conventionnelle.",
      flowTitle: "Lecture prudente d'une démission",
      flowIntro: "Avant toute décision, il faut qualifier le motif et la chronologie des démarches."
    },
    "conditions-pour-toucher-le-chomage": {
      takeaways: [
        "L'activité minimale ne suffit pas seule : la nature de la fin de contrat compte aussi.",
        "L'inscription et la recherche d'emploi font partie du dossier.",
        "Une démission classique doit être traitée à part."
      ],
      showSalaryExamples: false,
      tableTitle: "Conditions à relire avant l'estimation",
      tableIntro: "Ces repères évitent de confondre activité suffisante, ouverture des droits et paiement.",
      flowTitle: "Ouverture des droits",
      flowIntro: "Avant le calcul du montant, il faut vérifier si le dossier peut être étudié."
    },
    "chomage-cadre": {
      takeaways: [
        "Les bonus, variables et indemnités négociées rendent l'estimation plus sensible.",
        "La dégressivité peut concerner certains dossiers avec allocation élevée.",
        "Le bon repère est la projection dans le temps, pas seulement le premier montant."
      ],
      tableTitle: "Cadres : points de vigilance",
      tableIntro: "Les situations cadres demandent souvent une lecture plus fine que les salaires linéaires.",
      flowTitle: "Projection cadre",
      flowIntro: "La lecture doit intégrer montant, différé spécifique et évolution éventuelle de l'allocation."
    },
    "chomage-senior": {
      takeaways: [
        "À partir de 55 ans, la période de référence et la durée maximale changent.",
        "La retraite peut devenir le vrai sujet de décision.",
        "Le simulateur aide à se situer mais ne remplace pas une vérification retraite."
      ],
      tableTitle: "Seniors : âge, durée et retraite",
      tableIntro: "Ces repères aident à comprendre ce qui change à 55 ans et à 57 ans.",
      flowTitle: "Parcours senior",
      flowIntro: "Le chômage senior se lit avec l'âge exact, l'activité passée et la retraite."
    },
    "duree-indemnisation-chomage": {
      takeaways: [
        "La durée dépend de l'activité retenue et de l'âge à la fin du contrat.",
        "Les plafonds ne garantissent pas une durée maximale pour chaque dossier.",
        "À partir de 55 ans, la lecture change nettement."
      ],
      tableTitle: "Durée : plafonds et âge",
      tableIntro: "Ce tableau donne les repères d'âge sans promettre une durée automatique.",
      flowTitle: "Calcul de la durée",
      flowIntro: "La durée se lit à partir de l'activité passée, puis des bornes liées à l'âge."
    },
    "chomage-fin-cdd": {
      takeaways: [
        "Une fin de CDD peut permettre un examen des droits si l'activité est suffisante.",
        "Les documents de fin de contrat conditionnent la qualité du dossier.",
        "Les congés payés peuvent décaler le premier paiement."
      ],
      showSalaryExamples: false,
      tableTitle: "Fin de CDD : repères pratiques",
      tableIntro: "Le sujet n'est pas seulement le montant : documents, activité et calendrier comptent aussi.",
      flowTitle: "Après la fin du CDD",
      flowIntro: "Récupérer les documents puis vérifier les droits et le paiement probable."
    },
    "chomage-apres-licenciement": {
      takeaways: [
        "Un licenciement permet en principe un examen des droits si les conditions sont remplies.",
        "Le licenciement économique peut ouvrir un parcours spécifique comme le CSP.",
        "Les indemnités et congés payés peuvent repousser le paiement."
      ],
      showSalaryExamples: false,
      tableTitle: "Licenciement : ARE, documents et calendrier",
      tableIntro: "Ces repères distinguent le cas général des situations économiques ou documentaires plus sensibles.",
      flowTitle: "Après notification",
      flowIntro: "Le parcours dépend du motif, des documents et des éventuels différés."
    },
    "france-travail-inscription": {
      takeaways: [
        "L'inscription lance l'étude du dossier, pas forcément le paiement immédiat.",
        "L'attestation employeur est le document le plus sensible.",
        "Les différés continuent de s'appliquer même avec une inscription rapide."
      ],
      showSalaryExamples: false,
      tableTitle: "Inscription : documents et effets",
      tableIntro: "Ce tableau aide à savoir ce qui déclenche l'étude du dossier et ce qui peut retarder la suite.",
      flowTitle: "De l'inscription au paiement",
      flowIntro: "Le parcours administratif doit rester simple à vérifier."
    },
    "france-travail-actualisation": {
      takeaways: [
        "Sans actualisation, le paiement peut être bloqué.",
        "Les activités reprises doivent être déclarées avec les revenus correspondants.",
        "Une erreur peut créer un trop-perçu ou une régularisation."
      ],
      showSalaryExamples: false,
      tableTitle: "Actualisation : ce qui compte",
      tableIntro: "Cette page est centrée sur le paiement mensuel et les déclarations.",
      flowTitle: "Du mois travaillé au versement",
      flowIntro: "Chaque mois, la déclaration permet de recalculer ce qui doit être versé."
    },
    "cumul-are-salaire": {
      takeaways: [
        "Le cumul dépend du salaire repris et de la déclaration mensuelle.",
        "L'ARE peut être ajustée, pas simplement ajoutée au salaire.",
        "Le revenu total du mois est le repère le plus utile."
      ],
      showSalaryExamples: false,
      tableTitle: "Cumul emploi et ARE",
      tableIntro: "Ce tableau distingue le revenu repris, l'allocation ajustée et l'effet sur la durée des droits.",
      flowTitle: "Reprise d'emploi",
      flowIntro: "La reprise d'activité modifie le mois payé et peut ralentir la consommation des droits."
    }
  };

  return {
    ...defaultProfile,
    ...(profiles[slug] ?? {})
  };
}

const commonMistakes = [
  "Confondre indemnité de rupture et allocation chômage : ce sont deux calculs séparés.",
  "Penser que l'ARE est versée dès le lendemain de la fin du contrat, sans différé ni délai d'attente.",
  "Utiliser le salaire net au lieu du salaire brut pour estimer le SJR.",
  "Oublier les congés payés et les indemnités supra-légales dans le calendrier du premier paiement.",
  "Assimiler une démission classique à une rupture conventionnelle ou à une fin de CDD."
];

function mistakesFor(slug: string): string[] {
  const specific: Record<string, string[]> = {
    "delai-de-carence-chomage": [
      "Croire que le différé spécifique supprime les droits au lieu de décaler le paiement.",
      "Oublier d'ajouter les congés payés au délai d'attente de 7 jours.",
      "Confondre indemnité minimale et part supra-légale dans le calcul du différé."
    ],
    "chomage-apres-demission": [
      "Quitter son poste avant d'avoir vérifié si la démission est reconnue.",
      "Penser que le réexamen après 121 jours déclenche automatiquement l'ARE.",
      "Présenter une démission classique comme une rupture involontaire."
    ],
    "france-travail-actualisation": [
      "Oublier l'actualisation mensuelle alors que les droits sont ouverts.",
      "Ne pas déclarer une mission courte ou un revenu repris.",
      "Valider trop vite sans conserver les justificatifs."
    ],
    "chomage-cadre": [
      "Simuler un salaire fixe alors que la rémunération contient une part variable importante.",
      "Oublier la dégressivité possible sur certaines allocations élevées.",
      "Ne regarder que le premier mois alors que la projection dans le temps est décisive."
    ],
    "chomage-senior": [
      "Lire les règles seniors sans vérifier l'âge exact à la fin du contrat.",
      "Oublier la retraite dans la décision de départ.",
      "Confondre durée maximale possible et durée automatiquement acquise."
    ],
    "cumul-are-salaire": [
      "Additionner salaire et ARE comme deux revenus fixes.",
      "Oublier que l'actualisation recalcule le paiement du mois.",
      "Comparer uniquement l'ARE sans regarder le revenu total."
    ]
  };

  return [...(specific[slug] ?? []), ...commonMistakes].slice(0, 6);
}

function faqFor(topic: string): UnemploymentSeoFaq[] {
  return [
    {
      question: `Quelle est la règle essentielle à retenir pour ${topic} ?`,
      answer:
        "Il faut séparer trois sujets : l'ouverture des droits, le montant de l'ARE et la date du premier versement. Une situation peut ouvrir droit à l'ARE tout en générant un paiement différé à cause des congés payés, du délai d'attente ou d'une indemnité supérieure au minimum légal."
    },
    {
      question: "Quelles sont les conditions d'activité en 2026 ?",
      answer:
        `Le repère général est d'avoir travaillé au moins ${RULES_2026.affiliation.minimumWorkedDays} jours ou ${RULES_2026.affiliation.minimumWorkedHours} heures. La période de recherche est en principe de ${RULES_2026.affiliation.defaultLookbackMonths} mois, portée à ${RULES_2026.affiliation.seniorLookbackMonths} mois à partir de ${RULES_2026.affiliation.seniorLookbackAge} ans. France Travail vérifie aussi l'inscription, l'aptitude au travail et la recherche effective d'emploi.`
    },
    {
      question: "Comment le montant de l'ARE est-il calculé ?",
      answer:
        `L'allocation journalière est calculée à partir du SJR. France Travail compare notamment ${Math.round(RULES_2026.areFormula.variableSjrRate * 1000) / 10} % du SJR plus ${formatEuro(RULES_2026.areFormula.fixedDailyPart)} et ${Math.round(RULES_2026.areFormula.alternativeSjrRate * 100)} % du SJR. Le montant retenu ne peut pas dépasser ${Math.round(RULES_2026.areFormula.maxSjrRate * 100)} % du SJR.`
    },
    {
      question: "Pourquoi le premier paiement peut-il être retardé ?",
      answer:
        `Le paiement peut être repoussé par le délai d'attente de ${RULES_2026.waitingPeriods.legalWaitingDays} jours, le différé congés payés et le différé spécifique calculé sur les indemnités supra-légales. Le différé congés payés est plafonné à ${RULES_2026.waitingPeriods.paidLeaveMaxDays} jours et le différé spécifique à ${RULES_2026.waitingPeriods.specificMaxDays} jours dans le cas général.`
    },
    {
      question: "La réforme 2026 change-t-elle le montant de l'ARE ?",
      answer:
        "Les règles applicables depuis le 1er avril 2025 ont modifié plusieurs repères, notamment la mensualisation du paiement sur 30 jours et certaines durées. À partir du 1er avril 2026, la durée minimale peut être de 5 mois pour une première ouverture ou une réadmission après au moins 20 ans sans droit ouvert. Le montant reste calculé à partir du SJR et des formules ARE."
    },
    {
      question: "Le simulateur peut-il remplacer France Travail ?",
      answer:
        "Non. Un simulateur aide à comprendre et à préparer une estimation. France Travail reste seul compétent pour confirmer l'ouverture des droits, le montant exact, la durée et la date du premier paiement à partir du dossier réel et des justificatifs."
    }
  ];
}

function specificFaqFor(slug: string): UnemploymentSeoFaq[] {
  const items: Record<string, UnemploymentSeoFaq[]> = {
    "chomage-are": [
      {
        question: "Qui peut toucher l'ARE ?",
        answer:
          "Un salarié privé involontairement d'emploi peut faire examiner ses droits s'il remplit les conditions d'activité, d'inscription et de recherche d'emploi."
      },
      {
        question: "Quel salaire est pris en compte pour le chômage ?",
        answer:
          "France Travail part des rémunérations de la période de référence pour calculer le SJR. Le dernier salaire seul ne suffit pas toujours."
      },
      {
        question: "Quand commence le paiement après une rupture conventionnelle ?",
        answer:
          "Après la fin du contrat, l'inscription, l'étude du dossier et les différés éventuels. L'attestation employeur doit être correcte."
      },
      {
        question: "Les indemnités de rupture retardent-elles le chômage ?",
        answer:
          "La part supérieure au minimum applicable peut créer un différé spécifique. Le minimum obligatoire ne se lit pas de la même façon."
      },
      {
        question: "Peut-on cumuler chômage et salaire ?",
        answer:
          "Oui dans certains cas, mais l'activité doit être déclarée. France Travail ajuste ensuite l'allocation du mois."
      },
      {
        question: "Quels documents garder après la fin du contrat ?",
        answer:
          "Gardez le certificat de travail, le solde de tout compte, l'attestation France Travail, les bulletins de paie et les échanges sur la date de fin."
      }
    ],
    "delai-de-carence-chomage": [
      {
        question: "Le délai de carence réduit-il mes droits au chômage ?",
        answer:
          "En principe, un différé décale le point de départ de l'indemnisation. Il ne signifie pas à lui seul que vos droits sont supprimés. La durée et le montant restent à confirmer par France Travail."
      },
      {
        question: "Une grosse indemnité de rupture repousse-t-elle toujours le chômage ?",
        answer:
          `Seule la part supérieure au minimum prévu peut créer un différé spécifique. Le calcul indicatif divise cette part par ${RULES_2026.waitingPeriods.specificDivisor}, avec un plafond général de ${RULES_2026.waitingPeriods.specificMaxDays} jours.`
      }
    ],
    "chomage-apres-demission": [
      {
        question: "Puis-je toucher le chômage après une démission classique ?",
        answer:
          "Pas automatiquement. Une démission classique est une situation à risque : il faut vérifier les exceptions reconnues, un reliquat éventuel ou la possibilité d'un réexamen après 121 jours."
      },
      {
        question: "Faut-il démissionner avant de faire valider une reconversion ?",
        answer:
          "Non, l'ordre des démarches est essentiel. Pour un projet de reconversion, la validation doit être préparée avant le départ afin d'éviter une rupture de revenus."
      }
    ],
    "cumul-are-salaire": [
      {
        question: "Le salaire repris s'ajoute-t-il simplement à l'ARE ?",
        answer:
          "Non. Le salaire doit être déclaré et France Travail ajuste le nombre de jours indemnisables du mois. Le bon repère est le revenu total du mois après recalcul."
      },
      {
        question: "Le cumul peut-il prolonger mes droits ?",
        answer:
          "Dans certains cas, les jours non indemnisés ne sont pas consommés de la même façon. L'effet exact dépend de l'activité déclarée et du dossier."
      }
    ],
    "chomage-cadre": [
      {
        question: "Un cadre est-il forcément concerné par la dégressivité ?",
        answer:
          "Non. La dégressivité vise certaines allocations élevées et dépend notamment de l'âge à la fin du contrat. Elle ne doit pas être déduite du seul statut cadre."
      },
      {
        question: "Les primes et bonus changent-ils le calcul ?",
        answer:
          "Ils peuvent modifier le salaire de référence lorsqu'ils sont retenus dans le dossier. Une estimation simple doit donc être relue avec les bulletins et l'attestation employeur."
      }
    ],
    "chomage-senior": [
      {
        question: "Pourquoi 55 ans est-il un seuil important ?",
        answer:
          `À partir de ${RULES_2026.affiliation.seniorLookbackAge} ans, la période de recherche d'activité passe à ${RULES_2026.affiliation.seniorLookbackMonths} mois et les durées maximales peuvent être plus longues.`
      },
      {
        question: "Le simulateur remplace-t-il une vérification retraite ?",
        answer:
          "Non. Pour un senior, la retraite, le taux plein et le maintien éventuel des droits doivent être vérifiés avec les organismes compétents."
      }
    ],
    "france-travail-actualisation": [
      {
        question: "Que se passe-t-il si j'oublie l'actualisation ?",
        answer:
          "Le paiement peut être suspendu ou retardé. Il faut régulariser la situation auprès de France Travail et conserver les justificatifs utiles."
      },
      {
        question: "Dois-je déclarer une courte mission ?",
        answer:
          "Oui, toute activité reprise doit être déclarée avec les informations demandées. France Travail ajuste ensuite l'allocation du mois."
      }
    ],
    "premier-paiement-france-travail": [
      {
        question: "Pourquoi le premier paiement n'arrive-t-il pas tout de suite ?",
        answer:
          "Le dossier doit être étudié, les différés éventuels appliqués et l'actualisation réalisée. Une date estimée ne remplace pas le calendrier officiel."
      },
      {
        question: "Un retard signifie-t-il que je n'ai pas droit au chômage ?",
        answer:
          "Pas forcément. Un retard peut venir d'un document manquant, d'un différé ou d'une actualisation. Le statut du droit doit être confirmé dans l'espace France Travail."
      }
    ]
  };

  return items[slug] ?? [];
}

function ctaFor(slug: string): UnemploymentSeoCta {
  const ctas: Record<string, UnemploymentSeoCta> = {
    "calcul-allocation-chomage": {
      title: "Calculer mon allocation ARE",
      body:
        "Passez de la méthode au cas concret : salaire brut, âge, activité passée, congés payés et indemnité de départ.",
      label: "Calculer mon allocation ARE",
      href: "/simulateur-chomage-rupture-conventionnelle"
    },
    "combien-vais-je-toucher-au-chomage": {
      title: "Estimer mes droits au chômage",
      body:
        "Obtenez une estimation mensuelle, puis vérifiez la durée et la date probable du premier paiement.",
      label: "Estimer mes droits au chômage",
      href: "/simulateur-chomage-rupture-conventionnelle"
    },
    "delai-de-carence-chomage": {
      title: "Comprendre mon délai de carence",
      body:
        "Indiquez vos congés payés et votre indemnité supra-légale pour visualiser le délai avant paiement.",
      label: "Comprendre mon délai de carence",
      href: "/simulateur-chomage-rupture-conventionnelle"
    },
    "chomage-apres-rupture-conventionnelle": {
      title: "Simuler indemnité + chômage",
      body:
        "Comparez l'indemnité de rupture, l'ARE estimée, les différés et le revenu de transition.",
      label: "Simuler indemnité + chômage",
      href: "/simulateur-chomage-rupture-conventionnelle"
    },
    "rupture-conventionnelle-et-allocation-chomage": {
      title: "Vérifier l'impact d'une rupture conventionnelle",
      body:
        "Avant de signer, regardez ensemble l'indemnité, la date de premier paiement et la durée probable.",
      label: "Vérifier l'impact d'une rupture",
      href: "/simulateur-chomage-rupture-conventionnelle"
    },
    "indemnite-rupture-et-chomage": {
      title: "Comparer indemnité, salaire et ARE",
      body:
        "Une indemnité négociée peut sécuriser le départ tout en décalant l'ARE. Simulez les deux effets.",
      label: "Comparer indemnité, salaire et ARE",
      href: "/simulateur-chomage-rupture-conventionnelle"
    },
    "chomage-apres-demission": {
      title: "Vérifier avant de quitter son poste",
      body:
        "La démission classique est risquée côté ARE. Testez le scénario et comparez-le à une rupture conventionnelle si elle est envisageable.",
      label: "Vérifier mon scénario",
      href: "/simulateur-chomage-rupture-conventionnelle"
    },
    "france-travail-inscription": {
      title: "Préparer mon inscription avec des chiffres",
      body:
        "Avant le dossier France Travail, estimez le montant, les différés et les documents qui peuvent peser sur le calendrier.",
      label: "Préparer mon estimation",
      href: "/simulateur-chomage-rupture-conventionnelle"
    },
    "france-travail-actualisation": {
      title: "Anticiper mon paiement mensuel",
      body:
        "Si vous reprenez une activité, comparez salaire déclaré, ARE ajustée et revenu total du mois.",
      label: "Comparer salaire et ARE",
      href: "/cumul-are-salaire"
    },
    "cumul-are-salaire": {
      title: "Comparer salaire repris et ARE",
      body:
        "Relisez votre salaire brut/net puis estimez l'effet d'une reprise d'activité sur le revenu du mois.",
      label: "Comparer salaire et ARE",
      href: "/salaire-brut-net"
    }
  };

  return (
    ctas[slug] ?? {
      title: "Estimer mes droits au chômage",
      body:
        "Le simulateur vous aide à lire ensemble montant mensuel, différés, premier paiement et durée probable.",
      label: "Estimer mes droits au chômage",
      href: "/simulateur-chomage-rupture-conventionnelle"
    }
  );
}

function makePage(config: {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category?: UnemploymentSeoPage["category"];
  eyebrow: string;
  summary: string;
  immediateAnswer: string;
  sections: UnemploymentSeoSection[];
  links?: UnemploymentSeoLink[];
  premium?: boolean;
}): UnemploymentSeoPage {
  const profile = pageProfile(config.slug);
  const internalLinks = [
    links.chomage,
    links.calcul,
    links.simulator,
    links.currentSimulator,
    ...(config.links ?? []),
    links.salaire,
    links.brutNet
  ].filter(
    (link, index, allLinks) =>
      link.href !== `/${config.slug}` &&
      allLinks.findIndex((candidate) => candidate.href === link.href) === index
  );

  return {
    slug: config.slug,
    title: config.title,
    seoTitle: config.seoTitle,
    description: config.description,
    excerpt: config.excerpt,
    category: config.category ?? "Chômage",
    updatedAt,
    readingTime: "8 min",
    hero: {
      eyebrow: config.eyebrow,
      summary: config.summary
    },
    immediateAnswer: config.immediateAnswer,
    takeaways: profile.takeaways,
    sections: config.sections,
    scenarios: commonScenarios,
    examplesTitle: profile.examplesTitle,
    examplesIntro: profile.examplesIntro,
    showSalaryExamples: profile.showSalaryExamples,
    tableTitle: profile.tableTitle,
    tableIntro: profile.tableIntro,
    tableRows: tableRowsFor(config.slug),
    flowTitle: profile.flowTitle,
    flowIntro: profile.flowIntro,
    schemaSteps: commonSchemaSteps,
    premiumFlow: flowFor(config.slug, config.premium),
    mistakes: mistakesFor(config.slug),
    faq: [
      ...specificFaqFor(config.slug),
      ...faqFor(config.title.toLocaleLowerCase("fr-FR"))
    ].slice(0, config.slug === "chomage-are" ? 12 : 7),
    internalLinks: internalLinks.slice(0, 8),
    cta: ctaFor(config.slug)
  };
}

const detailedSections = {
  rules2026: {
    title: "Les règles France Travail à connaître en 2026",
    paragraphs: [
      "Depuis le 1er avril 2025, plusieurs repères de l'assurance chômage ont été stabilisés : paiement mensualisé sur 30 jours, nouvelles bornes d'âge pour les seniors, durées maximales adaptées et période de recherche d'affiliation allongée à 36 mois à partir de 55 ans.",
      "Au 1er avril 2026, une évolution ciblée concerne la durée minimale d'indemnisation : elle passe à 5 mois pour les premières ouvertures de droits et pour les réadmissions lorsque la personne n'a pas ouvert de droit depuis au moins 20 ans. Pour les autres situations, la durée minimale générale reste de 6 mois sous réserve des conditions remplies."
    ]
  },
  calculation: {
    title: "Comment le SJR conduit au montant de l'ARE",
    paragraphs: [
      "Le SJR, ou salaire journalier de référence, sert de base au calcul de l'allocation. Une estimation simple consiste à partir du salaire brut moyen et à le rapporter à une base journalière, mais France Travail peut intégrer plus précisément des périodes travaillées et non travaillées.",
      `L'allocation journalière compare deux formules : ${Math.round(RULES_2026.areFormula.variableSjrRate * 1000) / 10} % du SJR plus ${formatEuro(RULES_2026.areFormula.fixedDailyPart)}, ou ${Math.round(RULES_2026.areFormula.alternativeSjrRate * 100)} % du SJR. Le résultat est encadré, notamment par le plafond de ${Math.round(RULES_2026.areFormula.maxSjrRate * 100)} % du SJR.`
    ]
  },
  waiting: {
    title: "Différés et premier versement",
    paragraphs: [
      "L'ouverture des droits ne signifie pas toujours paiement immédiat. France Travail applique d'abord un délai d'attente de 7 jours, puis peut ajouter un différé congés payés et un différé spécifique si des indemnités supérieures au minimum légal ont été versées.",
      `Le différé congés payés est plafonné à ${RULES_2026.waitingPeriods.paidLeaveMaxDays} jours. Le différé spécifique est calculé en divisant les indemnités supra-légales par ${RULES_2026.waitingPeriods.specificDivisor}, avec un plafond de ${RULES_2026.waitingPeriods.specificMaxDays} jours dans le cas général.`
    ]
  },
  examples: {
    title: "Exemples chiffrés avec 2 000 €, 2 500 €, 3 000 €, 3 500 € et 4 000 €",
    paragraphs: [
      "Les exemples ci-dessous partent d'un salarié de 38 ans, à temps plein, avec une fin de contrat au 31 juillet 2026 et une activité suffisante. Ils donnent un repère réaliste, sans remplacer le calcul réalisé par France Travail.",
      "On voit que l'ARE ne correspond ni au salaire brut ni au salaire net habituel. Elle dépend du SJR et des formules réglementaires, puis le calendrier de versement dépend des différés."
    ]
  },
  practical: {
    title: "Cas pratiques à bien distinguer",
    paragraphs: [
      "Un salarié en rupture conventionnelle, un salarié licencié et un salarié en fin de CDD peuvent tous faire examiner leurs droits, mais les documents, les indemnités et le calendrier ne sont pas identiques. La nature de la fin de contrat influence surtout l'éligibilité et les différés.",
      "Une démission classique reste le cas le plus sensible : elle n'ouvre pas automatiquement droit à l'ARE. Il faut vérifier les exceptions, comme la démission légitime, la reconversion validée, un reliquat ou un réexamen après 121 jours."
    ]
  }
} satisfies Record<string, UnemploymentSeoSection>;

export const unemploymentSeoPages: UnemploymentSeoPage[] = [
  makePage({
    slug: "chomage-are",
    title: "Chômage ARE : guide complet France Travail, calcul et délais",
    seoTitle: "Chômage ARE 2026 : conditions, calcul et délais",
    description:
      "Guide complet du chômage en 2026 : conditions France Travail, calcul ARE, SJR, durée d'indemnisation, carence, cumul emploi chômage et réforme.",
    excerpt:
      "Comprendre le chômage en 2026 demande de relier conditions d'ouverture des droits, calcul de l'ARE, durée, différés et inscription France Travail.",
    eyebrow: "Page pilier",
    summary:
      "Le point d'entrée du cocon chômage/ARE pour comprendre les règles, les montants et le calendrier.",
    immediateAnswer:
      `En 2026, l'ARE dépend d'abord de l'activité travaillée, avec un repère de ${RULES_2026.affiliation.minimumWorkedDays} jours ou ${RULES_2026.affiliation.minimumWorkedHours} heures. Le montant est calculé à partir du SJR, puis le paiement peut être retardé par le délai d'attente, les congés payés et les indemnités supra-légales.`,
    sections: [
      detailedSections.rules2026,
      detailedSections.calculation,
      detailedSections.waiting,
      detailedSections.examples,
      detailedSections.practical
    ],
    links: [links.rupture, links.simulateur, links.salaireBrutNet]
  }),
  makePage({
    slug: "calcul-allocation-chomage",
    title: "Calcul allocation chômage : SJR, ARE, différés et exemples",
    seoTitle: "Calcul allocation chômage 2026 : méthode ARE",
    description:
      "Calculez le chômage en 2026 : SJR, formule ARE, différés, délai d'attente, exemples à 2 000 €, 2 500 €, 3 000 €, 3 500 € et 4 000 €.",
    excerpt:
      "Le calcul chômage part du salaire brut, estime le SJR, applique les formules ARE et ajoute les différés avant le premier versement.",
    category: "ARE",
    eyebrow: "Calcul ARE",
    summary: "La page de référence pour comprendre le calcul de l'allocation chômage.",
    immediateAnswer:
      `Le calcul chômage suit quatre étapes : vérifier l'affiliation, calculer le SJR, comparer les deux formules ARE, puis appliquer les différés. Avec ${commonScenarios[1].salary} brut mensuel moyen, l'estimation donne un SJR de ${commonScenarios[1].sjr} et une ARE nette mensuelle indicative de ${commonScenarios[1].monthlyNetAre}.`,
    sections: [
      detailedSections.calculation,
      detailedSections.rules2026,
      detailedSections.waiting,
      detailedSections.examples,
      {
        title: "Pourquoi le résultat officiel peut différer",
        paragraphs: [
          "Le calcul réalisé par France Travail ne se limite pas à diviser un salaire mensuel par un nombre de jours. Il prend en compte les salaires de la période de référence, les périodes travaillées, certaines périodes non travaillées et les règles de plafonnement.",
          "L'objectif d'une estimation fiable est donc de donner un ordre de grandeur exploitable : montant journalier, montant mensuel, date probable du premier paiement et points à vérifier dans le dossier."
        ]
      }
    ],
    links: [links.salaire, links.salaireBrutNet, links.rupture],
    premium: true
  }),
  makePage({
    slug: "simulateur-allocation-chomage",
    title: "Simulateur allocation chômage : estimer ARE, durée et premier paiement",
    seoTitle: "Simulateur allocation chômage ARE 2026",
    description:
      "Utilisez le simulateur allocation chômage pour estimer ARE nette, délai de carence, durée d'indemnisation et premier paiement France Travail.",
    excerpt:
      "Un bon simulateur allocation chômage ne doit pas seulement donner un montant : il doit aussi expliquer le calendrier et les différés.",
    category: "ARE",
    eyebrow: "Page outil",
    summary: "La page passerelle qui pousse naturellement vers le simulateur ARE existant.",
    immediateAnswer:
      `Le simulateur allocation chômage de RuptureConv permet de projeter l'ARE à partir du salaire brut moyen, du mode de fin de contrat, de l'âge, des congés payés et d'une éventuelle indemnité supra-légale. Avec ${commonScenarios[1].salary} brut, l'exemple donne environ ${commonScenarios[1].monthlyNetAre} nets par mois, hors cas particulier.`,
    sections: [
      {
        title: "Ce que le simulateur doit afficher",
        paragraphs: [
          "L'utilisateur ne cherche pas seulement une formule. Il veut savoir combien il peut toucher, quand le premier paiement peut arriver, pendant combien de temps l'indemnisation peut durer et ce qui change dans son cas.",
          "C'est pourquoi la projection doit combiner ARE brute, ARE nette indicative, SJR, différés, date probable de paiement, durée et avertissements sur les situations à confirmer."
        ]
      },
      detailedSections.calculation,
      detailedSections.waiting,
      detailedSections.examples,
      {
        title: "Pourquoi utiliser le simulateur avant une rupture",
        paragraphs: [
          "Avant une rupture conventionnelle, le montant négocié peut influencer le différé spécifique. Une indemnité plus élevée peut donc sécuriser le départ tout en repoussant le début de l'ARE.",
          "L'intérêt de simuler avant de signer est de comparer l'indemnité de départ, le délai sans allocation et le revenu total potentiel sur la période."
        ]
      }
    ],
    links: [links.currentSimulator, links.calcul, links.rupture],
    premium: true
  }),
  makePage({
    slug: "chomage-apres-rupture-conventionnelle",
    title: "Chômage après rupture conventionnelle : droits, ARE et délai",
    seoTitle: "Chômage après rupture conventionnelle : ARE 2026",
    description:
      "Comprenez le chômage après rupture conventionnelle : droit ARE, inscription France Travail, différés, indemnité supra-légale et exemples 2026.",
    excerpt:
      "Une rupture conventionnelle homologuée peut ouvrir droit à l'ARE si les conditions France Travail sont remplies, mais le versement n'est pas toujours immédiat.",
    category: "Rupture conventionnelle",
    eyebrow: "Forte intention",
    summary: "La passerelle essentielle entre départ négocié, indemnité et indemnisation chômage.",
    immediateAnswer:
      "Après une rupture conventionnelle homologuée, le salarié peut s'inscrire à France Travail et faire examiner ses droits à l'ARE. Le droit n'est pas automatique au sens administratif : il faut remplir les conditions d'activité, fournir les documents de fin de contrat et tenir compte des différés.",
    sections: [
      {
        title: "Le principe : une rupture conventionnelle peut ouvrir droit à l'ARE",
        paragraphs: [
          "La rupture conventionnelle individuelle est une fin de CDI d'un commun accord. Elle n'est pas assimilée à une démission classique pour l'assurance chômage. Le salarié peut donc faire examiner ses droits par France Travail.",
          "La validation dépend ensuite des conditions habituelles : activité suffisante, inscription, recherche effective d'emploi, aptitude au travail et dossier complet."
        ]
      },
      detailedSections.waiting,
      detailedSections.calculation,
      detailedSections.examples,
      {
        title: "Indemnité de rupture et différé spécifique",
        paragraphs: [
          "L'indemnité minimale de rupture conventionnelle n'est pas le problème principal pour le différé spécifique. Le sujet apparaît surtout lorsqu'une part supra-légale est versée, c'est-à-dire au-delà du minimum applicable.",
          "Plus cette part supra-légale est élevée, plus le premier paiement ARE peut être repoussé, dans la limite réglementaire. C'est pourquoi il faut regarder ensemble le montant négocié et la trésorerie des premières semaines."
        ]
      }
    ],
    links: [links.rupture, links.simulateur, links.salaireBrutNet],
    premium: true
  }),
  makePage({
    slug: "combien-vais-je-toucher-au-chomage",
    title: "Combien vais-je toucher au chômage ? Méthode et exemples",
    seoTitle: "Combien vais-je toucher au chômage : exemples ARE 2026",
    description:
      "Estimez combien vous allez toucher au chômage avec la méthode ARE 2026, des exemples à 2 000 €, 2 500 €, 3 000 €, 3 500 € et 4 000 € brut.",
    excerpt:
      "Le montant touché au chômage dépend du SJR, des formules ARE et du calendrier de versement.",
    category: "ARE",
    eyebrow: "Montant mensuel",
    summary: "Une réponse concrète à la question la plus fréquente avant une fin de contrat.",
    immediateAnswer:
      `Avec ${commonScenarios[0].salary} brut mensuel moyen, l'ARE nette indicative est d'environ ${commonScenarios[0].monthlyNetAre}. Avec ${commonScenarios[2].salary}, elle est d'environ ${commonScenarios[2].monthlyNetAre}. Ces montants restent indicatifs : France Travail calcule le droit exact à partir du dossier complet.`,
    sections: [
      detailedSections.calculation,
      detailedSections.examples,
      detailedSections.waiting,
      {
        title: "Pourquoi l'ARE n'est pas un pourcentage simple du salaire",
        paragraphs: [
          "On lit souvent des approximations rapides sur le chômage. Elles peuvent aider à se situer, mais elles masquent la mécanique réelle : l'allocation est journalière, calculée à partir du SJR et encadrée par plusieurs règles.",
          "Le montant mensuel affiché dépend ensuite du nombre de jours payés dans le mois. Depuis les règles applicables en 2025, le paiement est mensualisé sur une base de 30 jours."
        ]
      },
      detailedSections.practical
    ],
    links: [links.calcul, links.salaire, links.salaireBrutNet],
    premium: true
  }),
  makePage({
    slug: "are-2026",
    title: "ARE 2026 : règles, calcul, durée et réforme",
    seoTitle: "ARE 2026 : règles France Travail et calcul",
    description:
      "Toutes les règles ARE 2026 : conditions d'activité, SJR, formule de calcul, durée d'indemnisation, différés, seniors et réforme.",
    excerpt:
      "L'ARE 2026 combine les règles issues de 2025, la durée minimale à 5 mois dans certains cas au 1er avril 2026 et les repères seniors.",
    category: "ARE",
    eyebrow: "Règles 2026",
    summary: "La page de référence pour lire les règles en vigueur sans mélange entre anciennes et nouvelles dates.",
    immediateAnswer:
      "En 2026, l'ARE reste calculée à partir du SJR. Les règles issues du 1er avril 2025 s'appliquent, avec une évolution au 1er avril 2026 : la durée minimale d'indemnisation passe à 5 mois pour certaines premières ouvertures ou réadmissions après 20 ans sans droit.",
    sections: [
      detailedSections.rules2026,
      detailedSections.calculation,
      detailedSections.waiting,
      detailedSections.examples,
      {
        title: "Seniors, durée et dégressivité",
        paragraphs: [
          "À partir de 55 ans, la période de recherche d'activité passe à 36 mois. La durée maximale est également plus longue : 685 jours pour 55-56 ans et 822 jours à partir de 57 ans dans les repères généraux.",
          "La dégressivité vise certaines allocations élevées, mais elle ne s'applique pas aux allocataires âgés de 55 ans ou plus à la date de fin de contrat."
        ]
      }
    ],
    links: [links.chomage, links.calcul, links.salaire]
  }),
  makePage({
    slug: "delai-de-carence-chomage",
    title: "Délai de carence chômage : congés payés, différé spécifique et 7 jours",
    seoTitle: "Délai de carence chômage 2026 : calcul et exemples",
    description:
      "Comprenez le délai de carence chômage : délai d'attente de 7 jours, différé congés payés, différé spécifique et exemples après rupture.",
    excerpt:
      "Le délai avant chômage additionne souvent le délai d'attente, les congés payés et un différé spécifique lié aux indemnités supra-légales.",
    category: "France Travail",
    eyebrow: "Premier versement",
    summary: "Le guide pour comprendre pourquoi l'ARE peut commencer plus tard que prévu.",
    immediateAnswer:
      `Le délai de carence chômage regroupe plusieurs mécanismes. Il y a d'abord ${RULES_2026.waitingPeriods.legalWaitingDays} jours d'attente, puis un différé congés payés plafonné à ${RULES_2026.waitingPeriods.paidLeaveMaxDays} jours et, le cas échéant, un différé spécifique plafonné à ${RULES_2026.waitingPeriods.specificMaxDays} jours.`,
    sections: [
      detailedSections.waiting,
      {
        title: "Différé congés payés",
        paragraphs: [
          "Lorsque des congés payés sont indemnisés à la fin du contrat, France Travail peut appliquer un différé correspondant. L'idée est d'éviter que l'allocation chômage couvre une période déjà indemnisée par l'employeur.",
          "Ce différé dépend du montant des indemnités compensatrices de congés payés et du SJR. Il est plafonné à 30 jours."
        ]
      },
      {
        title: "Différé spécifique",
        paragraphs: [
          "Le différé spécifique concerne les sommes versées au-delà des indemnités légales ou conventionnelles. En rupture conventionnelle, il apparaît souvent lorsqu'une indemnité supra-légale est négociée.",
          `Le calcul indicatif divise les sommes supra-légales par ${RULES_2026.waitingPeriods.specificDivisor}. Le résultat est plafonné à ${RULES_2026.waitingPeriods.specificMaxDays} jours dans le cas général.`
        ]
      },
      detailedSections.examples,
      {
        title: "Cas pratique après rupture conventionnelle",
        paragraphs: [
          "Un salarié qui obtient une indemnité supérieure au minimum peut gagner en sécurité financière au moment du départ, mais retarder le début de l'ARE. Ce n'est pas forcément défavorable : tout dépend du montant reçu et de la trésorerie disponible.",
          "Le bon calcul consiste à regarder le total : indemnité de départ, durée du différé, premier mois sans allocation et budget nécessaire avant le premier paiement."
        ]
      }
    ],
    links: [links.rupture, links.simulateur, links.calcul],
    premium: true
  }),
  makePage({
    slug: "quand-touche-t-on-le-chomage",
    title: "Quand touche-t-on le chômage ? Délais, actualisation et paiement",
    seoTitle: "Quand touche-t-on le chômage : premier paiement ARE",
    description:
      "Quand touche-t-on le chômage après une fin de contrat ? Comprenez inscription France Travail, actualisation, délai de carence et date de paiement.",
    excerpt:
      "Le premier paiement chômage dépend de la fin du contrat, de l'inscription, des différés, de l'actualisation et du calendrier de paiement France Travail.",
    category: "France Travail",
    eyebrow: "Question urgente",
    summary: "Une réponse claire pour anticiper la trésorerie des premières semaines.",
    immediateAnswer:
      `On ne touche pas forcément le chômage dès la fin du contrat. Il faut d'abord s'inscrire, faire examiner les droits, attendre le délai de ${RULES_2026.waitingPeriods.legalWaitingDays} jours et les éventuels différés congés payés ou indemnités supra-légales, puis actualiser sa situation pour déclencher le paiement mensuel.`,
    sections: [
      {
        title: "Les étapes avant le premier versement",
        paragraphs: [
          "La chronologie habituelle commence par la fin effective du contrat, puis l'inscription France Travail, l'étude du dossier, l'application des différés et enfin le paiement selon le calendrier mensuel.",
          "Un dossier complet peut aller vite, mais des congés payés non pris, une indemnité supra-légale ou une attestation employeur erronée peuvent repousser le versement."
        ]
      },
      detailedSections.waiting,
      {
        title: "Actualisation et paiement mensuel",
        paragraphs: [
          "L'actualisation mensuelle confirme la situation du demandeur d'emploi. Sans actualisation, le paiement peut être bloqué même si les droits sont ouverts.",
          "Le paiement porte en pratique sur une période passée. Il faut donc distinguer date de fin de contrat, date d'ouverture des droits et date de virement."
        ]
      },
      detailedSections.examples,
      detailedSections.practical
    ],
    links: [links.currentSimulator, links.calcul, links.rupture],
    premium: true
  }),
  makePage({
    slug: "premier-paiement-france-travail",
    title: "Premier paiement France Travail : calculer la date probable",
    seoTitle: "Premier paiement France Travail : délai chômage 2026",
    description:
      "Estimez la date du premier paiement France Travail : inscription, délai d'attente, différé congés payés, différé spécifique et actualisation.",
    excerpt:
      "Le premier paiement France Travail arrive après l'examen des droits, les différés éventuels et l'actualisation mensuelle.",
    category: "France Travail",
    eyebrow: "Calendrier ARE",
    summary: "La page dédiée au moment où l'argent arrive réellement.",
    immediateAnswer:
      `La date du premier paiement France Travail dépend de trois blocs : ${RULES_2026.waitingPeriods.legalWaitingDays} jours d'attente, le différé congés payés plafonné à ${RULES_2026.waitingPeriods.paidLeaveMaxDays} jours et le différé spécifique lié aux indemnités supra-légales, plafonné en général à ${RULES_2026.waitingPeriods.specificMaxDays} jours.`,
    sections: [
      detailedSections.waiting,
      {
        title: "Ce qui peut bloquer ou retarder le paiement",
        paragraphs: [
          "Les retards les plus fréquents viennent d'une inscription tardive, d'une attestation employeur manquante ou erronée, d'un solde de tout compte complexe ou d'une actualisation non réalisée.",
          "Le paiement dépend aussi des informations déclarées : reprise d'activité, maladie, formation, absence ou changement de situation."
        ]
      },
      {
        title: "Rupture conventionnelle : vigilance sur l'indemnité négociée",
        paragraphs: [
          "Une rupture conventionnelle avec une part supra-légale peut déclencher un différé spécifique. Ce différé ne supprime pas les droits, mais décale le premier versement.",
          "Avant de signer, il est donc utile de comparer le montant de l'indemnité et le nombre de jours sans allocation."
        ]
      },
      detailedSections.examples,
      detailedSections.practical
    ],
    links: [links.currentSimulator, links.calcul, links.rupture],
    premium: true
  }),
  makePage({
    slug: "conditions-pour-toucher-le-chomage",
    title: "Conditions pour toucher le chômage : droits ARE en 2026",
    seoTitle: "Conditions chômage 2026 : toucher l'ARE",
    description:
      "Liste complète des conditions pour toucher le chômage en 2026 : activité minimale, fin de contrat, inscription France Travail et recherche d'emploi.",
    excerpt:
      "Pour toucher le chômage, il faut remplir les conditions d'activité, être privé involontairement d'emploi ou assimilé, s'inscrire et rechercher un emploi.",
    category: "France Travail",
    eyebrow: "Ouverture des droits",
    summary: "Une lecture claire des conditions avant d'estimer le montant.",
    immediateAnswer:
      `La condition d'activité principale est d'avoir travaillé au moins ${RULES_2026.affiliation.minimumWorkedDays} jours ou ${RULES_2026.affiliation.minimumWorkedHours} heures. Il faut aussi être inscrit à France Travail, être apte au travail, rechercher un emploi et ne pas avoir quitté volontairement son poste hors cas reconnus.`,
    sections: [
      detailedSections.rules2026,
      {
        title: "La condition de privation d'emploi",
        paragraphs: [
          "Le chômage indemnisé concerne en principe une perte involontaire d'emploi ou une situation assimilée. Licenciement, fin de CDD, fin de mission et rupture conventionnelle peuvent entrer dans ce cadre si les autres conditions sont réunies.",
          "La démission classique ne doit pas être traitée comme un droit automatique. Certaines démissions légitimes ou projets de reconversion validés peuvent ouvrir des droits, mais l'ordre des démarches et les justificatifs sont essentiels."
        ]
      },
      {
        title: "Inscription et recherche d'emploi",
        paragraphs: [
          "L'inscription auprès de France Travail déclenche l'examen du dossier. Elle ne remplace pas les justificatifs : attestation employeur, pièces d'identité, relevé d'identité bancaire et éléments permettant de calculer le droit.",
          "L'allocataire doit aussi accomplir des actes positifs et répétés de recherche d'emploi, sauf cas particuliers prévus par les règles applicables."
        ]
      },
      detailedSections.examples,
      detailedSections.practical
    ],
    links: [links.calcul, links.currentSimulator, links.rupture]
  }),
  makePage({
    slug: "duree-indemnisation-chomage",
    title: "Durée d'indemnisation chômage : calcul, âge et règles 2026",
    seoTitle: "Durée chômage 2026 : calcul et plafonds ARE",
    description:
      "Comprenez la durée d'indemnisation chômage en 2026 : coefficient, durée minimale, plafonds selon l'âge, réforme et exemples.",
    excerpt:
      "La durée du chômage dépend de l'activité retenue, d'un coefficient, de l'âge et de plafonds réglementaires.",
    category: "ARE",
    eyebrow: "Durée des droits",
    summary: "La durée est aussi importante que le montant mensuel pour préparer une transition.",
    immediateAnswer:
      "Dans les repères généraux 2026, la durée est liée aux jours travaillés et au coefficient de 0,75, avec des plafonds : 548 jours avant 55 ans, 685 jours à 55-56 ans et 822 jours à partir de 57 ans. Certaines premières ouvertures depuis le 1er avril 2026 peuvent avoir une durée minimale de 5 mois.",
    sections: [
      detailedSections.rules2026,
      {
        title: "Le coefficient de durée",
        paragraphs: [
          "La durée d'indemnisation ne correspond pas mécaniquement à toute la période travaillée. Les règles appliquent un coefficient, puis des bornes minimales et maximales.",
          "Cela explique pourquoi deux salariés avec le même salaire peuvent avoir des durées différentes si leur historique d'activité ou leur âge ne sont pas identiques."
        ]
      },
      {
        title: "Les plafonds selon l'âge",
        paragraphs: [
          "Avant 55 ans, le plafond général est de 548 jours. À 55 et 56 ans, il est de 685 jours. À 57 ans et plus, il atteint 822 jours dans les repères généraux.",
          "Ces durées doivent être relues avec la date exacte de fin de contrat, les règles territoriales éventuelles et les situations spécifiques comme la retraite."
        ]
      },
      detailedSections.examples,
      detailedSections.practical
    ],
    links: [links.calcul, links.chomage, links.rupture]
  }),
  makePage({
    slug: "cumul-are-salaire",
    title: "Cumul ARE salaire : reprendre un emploi sans perdre ses repères",
    seoTitle: "Cumul ARE salaire 2026 : emploi et chômage",
    description:
      "Guide du cumul salaire et chômage : reprise d'activité, déclaration mensuelle, calcul de l'ARE restante et erreurs à éviter.",
    excerpt:
      "Le cumul emploi chômage permet de reprendre une activité tout en conservant une partie de l'ARE, sous conditions et après déclaration.",
    category: "ARE",
    eyebrow: "Reprise d'activité",
    summary: "Un sujet clé pour reprendre un emploi sans perdre la lecture de ses droits.",
    immediateAnswer:
      "Le cumul emploi chômage permet de conserver une partie de l'ARE lorsqu'une activité reprise ne compense pas totalement l'ancien revenu. Le salaire doit être déclaré chaque mois et France Travail recalcule le nombre de jours indemnisables.",
    sections: [
      {
        title: "Le principe du cumul emploi ARE",
        paragraphs: [
          "Le cumul vise à encourager la reprise d'activité, même partielle ou moins rémunératrice. L'allocataire déclare son salaire, puis France Travail ajuste l'allocation du mois.",
          "Le montant total salaire plus ARE ne doit pas conduire à dépasser les limites prévues par les règles d'assurance chômage."
        ]
      },
      {
        title: "Pourquoi l'actualisation mensuelle est centrale",
        paragraphs: [
          "Chaque mois, l'allocataire doit déclarer les heures et les revenus de l'activité reprise. Une erreur peut provoquer un trop-perçu ou retarder le paiement.",
          "Il est prudent de conserver les bulletins de salaire et de vérifier les informations déclarées avant validation."
        ]
      },
      detailedSections.examples,
      {
        title: "Cas pratique : reprise à temps partiel",
        paragraphs: [
          "Un salarié indemnisé reprend une mission à temps partiel. Il ne faut pas comparer seulement le salaire repris à l'ancienne ARE : le bon repère est le revenu total du mois et l'effet sur la durée des droits.",
          "Dans certains cas, les jours non indemnisés prolongent la durée potentielle des droits. Le mécanisme exact doit être confirmé dans l'espace France Travail."
        ]
      },
      detailedSections.practical
    ],
    links: [links.salaire, links.salaireBrutNet, links.calcul]
  }),
  makePage({
    slug: "comment-est-calculee-l-are",
    title: "Comment est calculée l'ARE ? Formule, SJR et exemples",
    seoTitle: "Comment est calculée l'ARE : formule 2026",
    description:
      "Comprenez comment est calculée l'ARE : salaire journalier de référence, formules France Travail, plafond, net indicatif et exemples.",
    excerpt:
      "L'ARE est calculée à partir du SJR, puis France Travail compare deux formules avant d'appliquer les règles de montant et de durée.",
    category: "ARE",
    eyebrow: "Formule ARE",
    summary: "La page pédagogique pour viser les featured snippets sur la méthode de calcul.",
    immediateAnswer:
      `L'ARE est calculée à partir du salaire journalier de référence. France Travail compare notamment ${Math.round(RULES_2026.areFormula.variableSjrRate * 1000) / 10} % du SJR plus ${formatEuro(RULES_2026.areFormula.fixedDailyPart)} et ${Math.round(RULES_2026.areFormula.alternativeSjrRate * 100)} % du SJR, puis retient le résultat applicable dans la limite de ${Math.round(RULES_2026.areFormula.maxSjrRate * 100)} % du SJR.`,
    sections: [
      detailedSections.calculation,
      {
        title: "Étape 1 : déterminer le SJR",
        paragraphs: [
          "Le SJR résume les rémunérations de référence sous forme journalière. Il dépend des salaires bruts retenus et de la période prise en compte.",
          "Une estimation par salaire mensuel moyen donne un ordre de grandeur utile, mais le calcul France Travail peut intégrer des périodes et justificatifs plus précis."
        ]
      },
      {
        title: "Étape 2 : comparer les formules ARE",
        paragraphs: [
          "La première formule combine une part proportionnelle au SJR et une partie fixe. La seconde applique un pourcentage du SJR. Le montant retenu est ensuite encadré.",
          "Cette mécanique explique pourquoi deux salaires proches peuvent produire des allocations dont l'écart n'est pas parfaitement linéaire."
        ]
      },
      detailedSections.examples,
      detailedSections.waiting
    ],
    links: [links.calcul, links.currentSimulator, links.salaireBrutNet],
    premium: true
  }),
  makePage({
    slug: "chomage-apres-demission",
    title: "Chômage après démission : cas possibles, ARE et réexamen",
    seoTitle: "Chômage après démission : droits ARE 2026",
    description:
      "Comprenez le chômage après démission : absence de droit automatique, démission légitime, reconversion, reliquat et réexamen après 121 jours.",
    excerpt:
      "Une démission classique n'ouvre pas automatiquement droit au chômage, mais certains cas peuvent permettre un examen ou un réexamen.",
    eyebrow: "Cas sensible",
    summary: "Une page prudente pour éviter les mauvaises décisions avant de quitter un CDI.",
    immediateAnswer:
      "Après une démission classique, le chômage n'est pas automatique. Il faut vérifier les cas reconnus : démission légitime, projet de reconversion validé avant le départ, reliquat de droits, reprise d'emploi suffisante ou réexamen possible après 121 jours de chômage.",
    sections: [
      {
        title: "La règle de base",
        paragraphs: [
          "La démission est une rupture volontaire du contrat. Elle ne doit donc pas être présentée comme équivalente à une rupture conventionnelle, un licenciement ou une fin de CDD.",
          "Avant de démissionner, il faut vérifier si un dispositif spécifique s'applique réellement à votre situation. Une erreur peut créer plusieurs mois sans revenu de remplacement."
        ]
      },
      {
        title: "Les cas à examiner",
        paragraphs: [
          "Certaines démissions légitimes peuvent ouvrir droit à l'ARE selon les justificatifs. Un projet de reconversion peut aussi être pris en compte s'il a été validé dans le bon ordre.",
          "Un reliquat de droits ou une reprise d'emploi après démission peut modifier l'analyse, mais ces situations doivent être confirmées par France Travail."
        ]
      },
      detailedSections.rules2026,
      detailedSections.examples,
      detailedSections.practical
    ],
    links: [links.currentSimulator, links.calcul, links.rupture]
  }),
  makePage({
    slug: "chomage-apres-cdi",
    title: "Chômage après CDI : rupture, licenciement, démission et ARE",
    seoTitle: "Chômage après CDI : droits ARE selon la rupture",
    description:
      "Comprenez le chômage après un CDI : rupture conventionnelle, licenciement, démission, conditions ARE, différés et exemples 2026.",
    excerpt:
      "Après un CDI, le droit au chômage dépend surtout du mode de rupture et des conditions d'activité.",
    eyebrow: "Fin de CDI",
    summary: "La page pour distinguer rupture conventionnelle, licenciement et démission.",
    immediateAnswer:
      "Après un CDI, une rupture conventionnelle ou un licenciement peut ouvrir droit à l'ARE si les conditions sont remplies. Une démission classique n'ouvre pas automatiquement droit au chômage, sauf exception reconnue ou dispositif spécifique.",
    sections: [
      detailedSections.practical,
      detailedSections.rules2026,
      detailedSections.calculation,
      detailedSections.waiting,
      detailedSections.examples
    ],
    links: [links.rupture, links.simulateur, links.calcul]
  }),
  makePage({
    slug: "chomage-fin-cdd",
    title: "Chômage fin CDD : conditions, ARE et démarches France Travail",
    seoTitle: "Chômage fin CDD : droit ARE et calcul 2026",
    description:
      "Comprenez le chômage après CDD : fin de contrat, activité minimale, inscription France Travail, montant ARE, différés et exemples.",
    excerpt:
      "Une fin de CDD peut ouvrir droit à l'ARE si l'activité minimale est atteinte et si le dossier France Travail est complet.",
    eyebrow: "Fin de CDD",
    summary: "Un guide concret pour préparer l'inscription après une fin de contrat.",
    immediateAnswer:
      `Après un CDD, le chômage peut être ouvert si vous remplissez les conditions générales, notamment ${RULES_2026.affiliation.minimumWorkedDays} jours ou ${RULES_2026.affiliation.minimumWorkedHours} heures d'activité. L'indemnité de fin de contrat n'empêche pas en elle-même l'examen des droits.`,
    sections: [
      {
        title: "La fin de CDD est une privation d'emploi",
        paragraphs: [
          "La fin normale d'un CDD peut permettre un examen des droits à l'ARE. Le point central devient alors l'activité suffisante et la qualité des documents transmis.",
          "Le salarié doit récupérer l'attestation employeur, le certificat de travail, le solde de tout compte et les éléments utiles à l'inscription."
        ]
      },
      detailedSections.rules2026,
      detailedSections.calculation,
      detailedSections.waiting,
      detailedSections.examples
    ],
    links: [links.calcul, links.currentSimulator, links.salaire]
  }),
  makePage({
    slug: "chomage-cadre",
    title: "Chômage cadre : ARE, dégressivité, délai et rupture conventionnelle",
    seoTitle: "Chômage cadre 2026 : calcul ARE et dégressivité",
    description:
      "Guide chômage cadre : calcul ARE avec salaire élevé, dégressivité, rupture conventionnelle, différés, indemnité supra-légale et exemples.",
    excerpt:
      "Pour un cadre, le sujet chômage porte souvent autant sur la dégressivité et les différés que sur le montant mensuel.",
    category: "ARE",
    eyebrow: "Cadres",
    summary: "Une page à fort potentiel pour les salaires élevés et les négociations de départ.",
    immediateAnswer:
      `Un cadre peut percevoir l'ARE si les conditions sont remplies, mais les allocations élevées peuvent être concernées par la dégressivité après ${RULES_2026.degressivity.startsAfterDays} jours, sauf à partir de ${RULES_2026.degressivity.excludedFromAge} ans. Les indemnités supra-légales peuvent aussi repousser le premier paiement.`,
    sections: [
      {
        title: "Pourquoi le chômage cadre est particulier",
        paragraphs: [
          "Les cadres ont souvent une rémunération variable, des bonus, une ancienneté plus forte ou une indemnité négociée. Ces éléments peuvent compliquer le calcul du SJR et le calendrier de paiement.",
          "Le montant mensuel ne suffit pas : il faut aussi regarder le différé spécifique, la dégressivité éventuelle et la durée des droits."
        ]
      },
      detailedSections.calculation,
      detailedSections.waiting,
      {
        title: "Dégressivité et salaires élevés",
        paragraphs: [
          "La dégressivité concerne certaines allocations journalières élevées. Elle ne s'applique pas immédiatement et ne concerne pas les allocataires âgés de 55 ans ou plus à la fin du contrat.",
          "Un cadre en rupture conventionnelle doit donc simuler le premier mois, mais aussi la projection après plusieurs mois d'indemnisation."
        ]
      },
      detailedSections.examples
    ],
    links: [links.currentSimulator, links.salaireBrutNet, links.rupture],
    premium: true
  }),
  makePage({
    slug: "chomage-senior",
    title: "Chômage senior : durée ARE, 55 ans, 57 ans et retraite",
    seoTitle: "Chômage senior 2026 : durée ARE après 55 ans",
    description:
      "Comprenez le chômage senior : durée d'indemnisation à 55 ans, 57 ans et plus, période de référence, dégressivité et retraite.",
    excerpt:
      "À partir de 55 ans, l'âge modifie la période de référence, la durée maximale et plusieurs points de vigilance.",
    category: "ARE",
    eyebrow: "Seniors",
    summary: "Une page essentielle pour les fins de carrière et ruptures conventionnelles seniors.",
    immediateAnswer:
      `À partir de ${RULES_2026.affiliation.seniorLookbackAge} ans, la période de recherche d'activité passe à ${RULES_2026.affiliation.seniorLookbackMonths} mois. La durée maximale peut atteindre ${RULES_2026.duration.standardMaxDays.age55To56} jours à 55-56 ans et ${RULES_2026.duration.standardMaxDays.age57Plus} jours à partir de 57 ans, sous réserve du dossier.`,
    sections: [
      {
        title: "Ce que l'âge change",
        paragraphs: [
          "L'âge ne change pas seulement la durée. Il modifie aussi la période de recherche d'activité et peut rendre certains sujets plus sensibles : retraite, formation, maintien éventuel des droits et retour à l'emploi.",
          "Un salarié senior doit donc lire ensemble montant mensuel, durée, date de premier paiement et situation retraite."
        ]
      },
      detailedSections.rules2026,
      detailedSections.calculation,
      detailedSections.waiting,
      {
        title: "Rupture conventionnelle senior",
        paragraphs: [
          "La rupture conventionnelle d'un senior demande une prudence particulière. L'indemnité négociée, les congés payés et la proximité de la retraite peuvent changer la trésorerie réelle.",
          "Le simulateur donne une projection utile, mais il faut compléter par une vérification retraite et France Travail lorsque la situation est proche du taux plein."
        ]
      }
    ],
    links: [links.currentSimulator, links.rupture, links.calcul],
    premium: true
  }),
  makePage({
    slug: "chomage-apres-licenciement",
    title: "Chômage après licenciement : ARE, CSP, différés et durée",
    seoTitle: "Chômage après licenciement : droit ARE 2026",
    description:
      "Comprenez le chômage après licenciement : conditions ARE, calcul, différés, CSP éventuel, durée d'indemnisation et exemples.",
    excerpt:
      "Après un licenciement, le salarié peut faire examiner ses droits à l'ARE, avec des règles particulières possibles en cas de CSP.",
    eyebrow: "Licenciement",
    summary: "La lecture complète du chômage après licenciement, au-delà du seul montant mensuel.",
    immediateAnswer:
      "Un licenciement peut ouvrir droit à l'ARE si les conditions générales sont remplies. En licenciement économique, le CSP peut modifier le parcours et doit être étudié séparément. Les indemnités et congés payés peuvent aussi repousser le premier paiement.",
    sections: [
      {
        title: "Licenciement et ouverture des droits",
        paragraphs: [
          "Le licenciement correspond à une perte involontaire d'emploi. Il permet donc en principe un examen des droits par France Travail, sous réserve de l'activité suffisante et des conditions habituelles.",
          "Le motif du licenciement, les documents transmis et l'existence éventuelle d'un CSP peuvent modifier la suite pratique du dossier."
        ]
      },
      detailedSections.rules2026,
      detailedSections.calculation,
      detailedSections.waiting,
      detailedSections.examples
    ],
    links: [links.calcul, links.rupture, links.salaire]
  }),
  makePage({
    slug: "france-travail-inscription",
    title: "Inscription France Travail : démarches, documents et calendrier",
    seoTitle: "Inscription France Travail : guide étape par étape",
    description:
      "Guide d'inscription France Travail : quand s'inscrire, quels documents préparer, actualisation, ARE, délais et erreurs à éviter.",
    excerpt:
      "L'inscription France Travail déclenche l'examen des droits, mais le paiement dépend des documents, des différés et de l'actualisation.",
    category: "France Travail",
    eyebrow: "Démarches",
    summary: "Un guide étape par étape pour éviter les retards évitables.",
    immediateAnswer:
      "Inscrivez-vous auprès de France Travail dès la fin du contrat ou lorsque votre situation le permet. Préparez l'attestation employeur, une pièce d'identité, un RIB, les informations de paie et les justificatifs nécessaires. L'inscription ne supprime pas les différés éventuels.",
    sections: [
      {
        title: "Quand s'inscrire",
        paragraphs: [
          "Le bon moment dépend de la date exacte de fin de contrat et de votre situation. L'inscription permet à France Travail d'examiner le dossier, mais le paiement peut commencer plus tard à cause des délais et différés.",
          "Ne confondez pas inscription, ouverture des droits et paiement effectif. Ce sont trois étapes différentes."
        ]
      },
      {
        title: "Les documents à préparer",
        paragraphs: [
          "L'attestation employeur est centrale, car elle permet à France Travail de connaître le motif de fin de contrat, les salaires et les indemnités. Le certificat de travail, le solde de tout compte et les bulletins de paie peuvent aussi être utiles.",
          "En cas d'erreur sur l'attestation, le dossier peut être retardé. Il faut donc vérifier les dates, les montants et la qualification des indemnités."
        ]
      },
      detailedSections.waiting,
      detailedSections.examples,
      {
        title: "Actualisation mensuelle",
        paragraphs: [
          "Après l'inscription, l'actualisation mensuelle reste indispensable. Elle confirme votre situation, vos éventuelles activités et permet le paiement.",
          "Une absence d'actualisation ou une déclaration incomplète peut bloquer l'allocation ou créer un trop-perçu."
        ]
      }
    ],
    links: [links.calcul, links.currentSimulator, links.rupture]
  }),
  makePage({
    slug: "france-travail-actualisation",
    title: "France Travail actualisation : calendrier, paiement et erreurs",
    seoTitle: "France Travail actualisation : paiement chômage",
    description:
      "Comprenez l'actualisation France Travail : quand la faire, quoi déclarer, impact sur le paiement ARE et erreurs à éviter.",
    excerpt:
      "L'actualisation mensuelle est indispensable pour recevoir l'ARE et éviter les blocages ou trop-perçus.",
    category: "France Travail",
    eyebrow: "Paiement mensuel",
    summary: "La page opérationnelle pour relier droits ouverts et versement réel.",
    immediateAnswer:
      "L'actualisation France Travail sert à déclarer votre situation du mois : emploi repris, salaire, formation, maladie, absence ou changement personnel. Sans actualisation, le paiement de l'ARE peut être suspendu même si vos droits sont ouverts.",
    sections: [
      {
        title: "Pourquoi l'actualisation est décisive",
        paragraphs: [
          "L'ouverture des droits ne suffit pas à déclencher chaque paiement. France Travail a besoin d'une déclaration mensuelle pour calculer ce qui doit être versé.",
          "Une activité reprise, même courte, doit être déclarée avec prudence afin d'éviter un blocage, une régularisation ou un trop-perçu."
        ]
      },
      {
        title: "Que déclarer",
        paragraphs: [
          "Il faut déclarer les heures travaillées, les revenus, les formations, les arrêts maladie, les absences et tout changement pouvant influencer l'indemnisation.",
          "Conservez les justificatifs, notamment bulletins de salaire et attestations, car France Travail peut demander une vérification."
        ]
      },
      detailedSections.waiting,
      detailedSections.examples,
      detailedSections.practical
    ],
    links: [links.currentSimulator, links.calcul, links.salaire]
  }),
  makePage({
    slug: "chomage-et-conges-payes",
    title: "Chômage et congés payés : impact sur le délai avant ARE",
    seoTitle: "Chômage congés payés : différé ARE 2026",
    description:
      "Comprenez l'impact des congés payés sur le chômage : indemnité compensatrice, différé congés payés, plafond et exemples.",
    excerpt:
      "Les congés payés indemnisés à la fin du contrat peuvent repousser le début du paiement ARE.",
    category: "France Travail",
    eyebrow: "Congés payés",
    summary: "Le guide pour comprendre un des différés les plus fréquents.",
    immediateAnswer:
      `Les congés payés non pris peuvent créer un différé avant le versement de l'ARE. Ce différé est calculé à partir de l'indemnité compensatrice et du SJR, avec un plafond de ${RULES_2026.waitingPeriods.paidLeaveMaxDays} jours.`,
    sections: [
      {
        title: "Pourquoi les congés payés repoussent le chômage",
        paragraphs: [
          "Lorsque l'employeur paie des congés non pris à la fin du contrat, France Travail considère que cette somme couvre une période déjà indemnisée.",
          "Le paiement de l'ARE peut donc commencer après un différé congés payés, auquel s'ajoute le délai d'attente de 7 jours."
        ]
      },
      detailedSections.waiting,
      detailedSections.examples,
      {
        title: "Cas pratique avec solde de congés",
        paragraphs: [
          "Un salarié qui termine son contrat avec plusieurs jours de congés non pris peut voir le premier paiement repoussé. Ce n'est pas une suppression du droit, mais un décalage dans le calendrier.",
          "Pour préparer sa trésorerie, il faut additionner congés payés, délai d'attente et éventuel différé spécifique."
        ]
      },
      detailedSections.practical
    ],
    links: [links.calcul, links.rupture, links.currentSimulator]
  }),
  makePage({
    slug: "indemnite-rupture-et-chomage",
    title: "Indemnité de rupture et chômage : impact sur l'ARE et le délai",
    seoTitle: "Indemnité rupture et chômage : différé ARE",
    description:
      "Comprenez l'impact d'une indemnité de rupture sur le chômage : indemnité légale, supra-légale, différé spécifique et premier paiement ARE.",
    excerpt:
      "L'indemnité de rupture ne supprime pas le chômage, mais une part supra-légale peut repousser le premier versement ARE.",
    category: "Rupture conventionnelle",
    eyebrow: "Indemnité et délai",
    summary: "La page clé pour expliquer le lien entre montant négocié et carence chômage.",
    immediateAnswer:
      `L'indemnité minimale de rupture n'empêche pas l'examen des droits au chômage. En revanche, la part supérieure au minimum légal ou conventionnel peut créer un différé spécifique, calculé en divisant les sommes supra-légales par ${RULES_2026.waitingPeriods.specificDivisor}, avec un plafond général de ${RULES_2026.waitingPeriods.specificMaxDays} jours.`,
    sections: [
      {
        title: "Indemnité légale et indemnité supra-légale",
        paragraphs: [
          "L'indemnité légale ou conventionnelle correspond au minimum applicable. Elle doit être distinguée de la part supra-légale, qui résulte d'une négociation ou d'un versement supérieur au minimum.",
          "C'est principalement cette part supra-légale qui peut modifier le calendrier du premier paiement chômage."
        ]
      },
      detailedSections.waiting,
      detailedSections.calculation,
      detailedSections.examples,
      {
        title: "Arbitrer entre montant de départ et trésorerie",
        paragraphs: [
          "Une indemnité plus élevée peut rester intéressante même si elle repousse l'ARE. La bonne lecture consiste à comparer le cash disponible au départ, le nombre de jours sans allocation et le revenu total potentiel.",
          "Avant de signer une rupture conventionnelle, simulez les deux scénarios : indemnité au minimum et indemnité négociée."
        ]
      }
    ],
    links: [links.currentSimulator, links.rupture, links.simulateur],
    premium: true
  }),
  makePage({
    slug: "rupture-conventionnelle-et-allocation-chomage",
    title: "Rupture conventionnelle et allocation chômage : droits, calcul et délai",
    seoTitle: "Rupture conventionnelle et allocation chômage 2026",
    description:
      "Page passerelle entre rupture conventionnelle et allocation chômage : droit ARE, calcul, différés, indemnité supra-légale et exemples 2026.",
    excerpt:
      "La rupture conventionnelle peut ouvrir droit à l'ARE, mais il faut relier indemnité, SJR, différés et inscription France Travail.",
    category: "Rupture conventionnelle",
    eyebrow: "Passerelle stratégique",
    summary: "Le pont naturel entre le calcul de l'indemnité de rupture et le calcul de l'allocation chômage.",
    immediateAnswer:
      "La rupture conventionnelle et l'ARE sont liées, mais ne se calculent pas ensemble. L'indemnité relève de la rupture du CDI ; l'ARE relève de France Travail. Une indemnité supra-légale peut toutefois repousser le premier paiement chômage via le différé spécifique.",
    sections: [
      {
        title: "Deux calculs à séparer",
        paragraphs: [
          "Le premier calcul porte sur l'indemnité de rupture conventionnelle : ancienneté, salaire de référence, minimum légal ou conventionnel, montant négocié. Le second porte sur l'ARE : SJR, formule d'allocation, durée et différés.",
          "Les mélanger conduit souvent à une mauvaise décision. Une indemnité élevée peut être intéressante, mais elle doit être comparée au calendrier du chômage."
        ]
      },
      detailedSections.calculation,
      detailedSections.waiting,
      detailedSections.examples,
      {
        title: "Préparer l'entretien avec des chiffres utiles",
        paragraphs: [
          "Avant de négocier, préparez le minimum d'indemnité, la part supra-légale envisagée, le solde de congés payés et l'estimation ARE. Vous pourrez ainsi discuter d'un montant sans découvrir trop tard un décalage de paiement.",
          "Le bon repère n'est pas seulement le chèque de départ : c'est la combinaison indemnité, premier versement ARE et budget de transition."
        ]
      }
    ],
    links: [links.rupture, links.simulateur, links.salaireBrutNet],
    premium: true
  })
];

export const unemploymentSeoPageBySlug: Record<string, UnemploymentSeoPage> =
  Object.fromEntries(unemploymentSeoPages.map((page) => [page.slug, page]));
