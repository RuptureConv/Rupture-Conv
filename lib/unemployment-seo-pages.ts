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
  sections: UnemploymentSeoSection[];
  scenarios: UnemploymentSeoScenario[];
  tableRows: UnemploymentSeoTableRow[];
  schemaSteps: string[];
  premiumFlow?: string[];
  mistakes: string[];
  faq: UnemploymentSeoFaq[];
  internalLinks: UnemploymentSeoLink[];
  cta: {
    title: string;
    body: string;
    label: string;
    href: string;
  };
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
    href: "/simulateur",
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

const commonMistakes = [
  "Confondre indemnité de rupture et allocation chômage : ce sont deux calculs séparés.",
  "Penser que l'ARE est versée dès le lendemain de la fin du contrat, sans différé ni délai d'attente.",
  "Utiliser le salaire net au lieu du salaire brut pour estimer le SJR.",
  "Oublier les congés payés et les indemnités supra-légales dans le calendrier du premier paiement.",
  "Assimiler une démission classique à une rupture conventionnelle ou à une fin de CDD."
];

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
    sections: config.sections,
    scenarios: commonScenarios,
    tableRows: standardTableRows(),
    schemaSteps: commonSchemaSteps,
    premiumFlow: config.premium ? premiumFlow : undefined,
    mistakes: commonMistakes,
    faq: faqFor(config.title.toLocaleLowerCase("fr-FR")),
    internalLinks: internalLinks.slice(0, 8),
    cta: {
      title: "Simuler votre ARE maintenant",
      body:
        "La projection chômage existante estime l'ARE, les différés, la date probable du premier paiement et la durée selon votre situation.",
      label: "Lancer le simulateur ARE",
      href: "/simulateur-chomage-rupture-conventionnelle"
    }
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
      "Le SJR, ou salaire journalier de référence, sert de base au calcul de l'allocation. Une estimation simple consiste à partir du salaire brut moyen et à le rapporter à une base journalière, mais le calcul officiel peut intégrer des périodes travaillées et non travaillées plus précisément.",
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
    title: "Exemples chiffrés avec 1 800 €, 2 500 €, 3 000 € et 4 000 €",
    paragraphs: [
      "Les exemples ci-dessous partent d'un salarié de 38 ans, à temps plein, avec une fin de contrat au 31 juillet 2026 et une activité suffisante. Ils donnent un repère réaliste, sans remplacer le calcul officiel de France Travail.",
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
      "Calculez le chômage en 2026 : SJR, formule ARE, différés, délai d'attente, exemples à 1 800 €, 2 500 €, 3 000 € et 4 000 €.",
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
          "Le calcul officiel ne se limite pas à diviser un salaire mensuel par un nombre de jours. France Travail prend en compte les salaires de la période de référence, les périodes travaillées, certaines périodes non travaillées et les règles de plafonnement.",
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
      "Estimez combien vous allez toucher au chômage avec la méthode ARE 2026, des exemples à 1 800 €, 2 500 €, 3 000 € et 4 000 € brut.",
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
