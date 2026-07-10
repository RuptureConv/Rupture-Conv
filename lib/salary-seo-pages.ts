import {
  calculateSalaryNet,
  type SalaryPeriod,
  type SalaryProfileKey,
  salaryProfiles,
  smicReference
} from "@/lib/calculators/salary-net";

export type SalarySeoCategory =
  | "Guide salaire"
  | "Montant mensuel"
  | "Salaire annuel"
  | "Smic"
  | "Fiche de paie";

export type SalarySeoSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SalarySeoTableRow = {
  label: string;
  value: string;
  note: string;
};

export type SalarySeoFaq = {
  question: string;
  answer: string;
};

export type SalarySeoInternalLink = {
  href: string;
  label: string;
  description: string;
};

export type SalarySeoExample = {
  title: string;
  description: string;
  inputLabel: string;
  profileLabel: string;
  grossHourly: string;
  grossMonthly: string;
  grossAnnual: string;
  netMonthly: string;
  netAnnual: string;
  netAfterTaxMonthly: string | null;
  estimatedContributionsMonthly: string;
  contributionRateLabel: string;
};

export type SalarySeoPage = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category: SalarySeoCategory;
  readingTime: string;
  lastUpdated: string;
  hero: {
    eyebrow: string;
    summary: string;
  };
  immediateAnswer?: string;
  sections: SalarySeoSection[];
  examples: SalarySeoExample[];
  tableRows?: SalarySeoTableRow[];
  schemaSteps?: string[];
  mistakes?: string[];
  faq: SalarySeoFaq[];
  internalLinks: SalarySeoInternalLink[];
  cta: {
    title: string;
    body: string;
    label: string;
  };
  warning: string;
};

const lastUpdated = "4 juin 2026";

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

const percentFormatter = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  maximumFractionDigits: 1
});

const commonLinks = {
  hub: {
    href: "/salaire",
    label: "Guide salaire",
    description: "Revenir au guide central pour comprendre brut, net, impôt et annuel."
  },
  tool: {
    href: "/salaire-brut-net",
    label: "Simulateur salaire brut/net",
    description: "Affiner le calcul avec votre statut, vos heures et votre taux d'impôt."
  },
  annual: {
    href: "/salaire-annuel-brut-net",
    label: "Salaire annuel brut en net",
    description: "Passer d'une rémunération annuelle à un salaire mensuel estimé."
  },
  hourly: {
    href: "/salaire-horaire-brut-en-net",
    label: "Salaire horaire brut en net",
    description: "Comprendre le taux horaire net sur une base de travail donnée."
  },
  executive: {
    href: "/salaire-brut-net-cadre",
    label: "Salaire brut en net cadre",
    description: "Voir pourquoi le statut cadre peut modifier le salaire net."
  },
  nonExecutive: {
    href: "/salaire-brut-net-non-cadre",
    label: "Salaire brut en net non-cadre",
    description: "Obtenir un repère simple pour un salarié du privé non-cadre."
  },
  tax: {
    href: "/salaire-net-avant-impot",
    label: "Net avant impôt ou après impôt",
    description: "Distinguer le salaire net de la retenue à la source."
  },
  taxAfter: {
    href: "/salaire-net-apres-impot",
    label: "Salaire net après impôt",
    description: "Comprendre le montant réellement versé après prélèvement à la source."
  },
  difference: {
    href: "/difference-brut-net",
    label: "Différence brut/net",
    description: "Comprendre simplement pourquoi le brut annoncé n'est pas le net versé."
  },
  calculateNet: {
    href: "/calcul-salaire-net",
    label: "Calcul salaire net",
    description: "Voir la méthode pour estimer son salaire net à partir du brut."
  },
  unemployment: {
    href: "/calcul-allocation-chomage",
    label: "Calcul allocation chômage",
    description: "Préparer la suite si votre salaire sert à estimer une allocation."
  },
  termination: {
    href: "/rupture-conventionnelle",
    label: "Rupture conventionnelle",
    description: "Relier salaire, indemnité de rupture et préparation du départ."
  },
  simulator: {
    href: "/simulateur-rupture-conventionnelle",
    label: "Simulateur rupture conventionnelle",
    description: "Estimer une indemnité de rupture à partir du salaire de référence."
  },
  taxable: {
    href: "/salaire-net-imposable",
    label: "Salaire net imposable",
    description: "Comprendre la ligne utilisée pour le calcul de l'impôt."
  },
  smic: {
    href: "/smic-brut-net",
    label: "Smic brut en net",
    description: "Consulter les repères du salaire minimum en vigueur."
  },
  payslip: {
    href: "/fiche-de-paie-comprendre-brut-net",
    label: "Comprendre sa fiche de paie",
    description: "Relier brut, net, impôt et cotisations sur le bulletin de salaire."
  },
  terminationMinimum: {
    href: "/rupture-conventionnelle-indemnite-minimum",
    label: "Indemnité de rupture conventionnelle",
    description: "Comparer salaire habituel et indemnité minimale de départ."
  },
  negotiation: {
    href: "/rupture-conventionnelle-combien-demander",
    label: "Combien demander en rupture conventionnelle",
    description: "Préparer une négociation avec des montants plus lisibles."
  }
} satisfies Record<string, SalarySeoInternalLink>;

function formatEuro(value: number, rounded = false): string {
  return (rounded ? integerEuroFormatter : euroFormatter).format(value);
}

function formatPercent(value: number): string {
  return percentFormatter.format(value);
}

function periodLabel(period: SalaryPeriod): string {
  if (period === "hourly") return "horaire";
  if (period === "annual") return "annuel";
  return "mensuel";
}

export function getSalarySeoExample(
  grossAmount: number,
  period: SalaryPeriod,
  profile: SalaryProfileKey,
  withholdingTaxRate = 5,
  title?: string,
  description?: string
): SalarySeoExample {
  const result = calculateSalaryNet({
    grossAmount,
    period,
    profile,
    withholdingTaxRate
  });

  return {
    title:
      title ??
      `${formatEuro(grossAmount, period !== "hourly")} brut ${periodLabel(period)}`,
    description:
      description ??
      `Estimation avec le profil ${salaryProfiles[profile].label.toLocaleLowerCase("fr-FR")}.`,
    inputLabel: `${formatEuro(grossAmount, period !== "hourly")} brut ${periodLabel(period)}`,
    profileLabel: result.profileLabel,
    grossHourly: formatEuro(result.grossHourly),
    grossMonthly: formatEuro(result.grossMonthly),
    grossAnnual: formatEuro(result.grossAnnual, true),
    netMonthly: formatEuro(result.netBeforeTaxMonthly),
    netAnnual: formatEuro(result.netBeforeTaxAnnual, true),
    netAfterTaxMonthly:
      result.netAfterTaxMonthly === null
        ? null
        : formatEuro(result.netAfterTaxMonthly),
    estimatedContributionsMonthly: formatEuro(result.estimatedContributionsMonthly),
    contributionRateLabel: formatPercent(result.contributionRate)
  };
}

function warning(topic: string): string {
  return `Cette estimation donne un ordre de grandeur pour ${topic}. Le montant exact peut varier selon votre contrat, votre convention collective, vos primes, votre mutuelle, vos titres-restaurant, votre temps de travail, vos absences et votre taux de prélèvement à la source.`;
}

function faqFor(topic: string): SalarySeoFaq[] {
  return [
    {
      question: `Comment obtenir une estimation fiable pour ${topic} ?`,
      answer:
        "Le plus simple est de partir du brut, de choisir le bon statut, puis de vérifier le résultat avec le volume d'heures et le taux de prélèvement à la source si vous le connaissez."
    },
    {
      question: "Le résultat correspond-il exactement à une fiche de paie ?",
      answer:
        "Non. Le calcul donne un repère rapide. Une fiche de paie tient aussi compte des primes, absences, avantages, mutuelle, titres-restaurant et règles propres à l'employeur."
    },
    {
      question: "Faut-il comparer les salaires en brut ou en net ?",
      answer:
        "Pour une offre ou un contrat, le brut reste la référence habituelle. Pour votre budget personnel, le net avant impôt puis le net après impôt sont plus parlants."
    },
    {
      question: "Le prélèvement à la source est-il inclus ?",
      answer:
        "Les exemples affichent d'abord le net avant impôt. Quand un taux est indiqué, une estimation après prélèvement à la source est aussi proposée."
    }
  ];
}

function baseCta(topic: string): SalarySeoPage["cta"] {
  return {
    title: "Affiner votre estimation",
    body: `Pour ${topic}, saisissez votre montant brut dans le simulateur salaire brut/net. Vous pourrez ajuster le statut, le temps de travail et le taux de prélèvement à la source.`,
    label: "Utiliser le simulateur"
  };
}

function makePage(page: Omit<SalarySeoPage, "lastUpdated">): SalarySeoPage {
  return {
    ...page,
    lastUpdated
  };
}

function createGuidePage(config: {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category?: SalarySeoCategory;
  eyebrow: string;
  summary: string;
  example: SalarySeoExample;
  sections: SalarySeoSection[];
  links: SalarySeoInternalLink[];
  warningTopic: string;
  faqTopic: string;
}): SalarySeoPage {
  return makePage({
    slug: config.slug,
    title: config.title,
    seoTitle: config.seoTitle,
    description: config.description,
    excerpt: config.excerpt,
    category: config.category ?? "Guide salaire",
    readingTime: "5 min",
    hero: {
      eyebrow: config.eyebrow,
      summary: config.summary
    },
    sections: config.sections,
    examples: [config.example],
    faq: faqFor(config.faqTopic),
    internalLinks: [commonLinks.tool, ...config.links].slice(0, 6),
    cta: baseCta(config.faqTopic),
    warning: warning(config.warningTopic)
  });
}

const guidePages: SalarySeoPage[] = [
  createGuidePage({
    slug: "salaire-brut-net-cadre",
    title: "Salaire brut en net cadre : comment estimer votre salaire net ?",
    seoTitle: "Salaire brut en net cadre : calcul et exemple",
    description:
      "Estimez un salaire brut en net pour un cadre, avec les cotisations indicatives, un exemple à 3 000 € brut et les points à vérifier.",
    excerpt:
      "Un cadre obtient souvent un net légèrement différent d'un non-cadre à brut égal. L'écart vient surtout de certaines cotisations, notamment autour de la retraite complémentaire.",
    eyebrow: "Statut cadre",
    summary:
      "À salaire brut égal, le statut cadre peut modifier le net estimé. Le calcul reste simple, mais il mérite d'être lu avec les bons repères.",
    example: getSalarySeoExample(
      3000,
      "monthly",
      "privateExecutive",
      5,
      "Exemple avec 3 000 € brut cadre",
      "Pour un cadre du privé, l'estimation retient un taux indicatif de cotisations plus élevé qu'en non-cadre."
    ),
    sections: [
      {
        title: "Le repère rapide pour un salaire cadre",
        paragraphs: [
          "Pour estimer un salaire cadre en net, on part du brut indiqué dans le contrat ou l'offre d'emploi, puis on applique un taux moyen de cotisations salariales.",
          "Dans l'outil, le profil cadre utilise un taux indicatif de 25 %. Ce n'est pas une paie complète, mais cela donne un repère lisible avant de comparer une proposition."
        ]
      },
      {
        title: "Pourquoi le net cadre peut être plus bas",
        paragraphs: [
          "Le statut cadre peut entraîner des cotisations spécifiques, notamment sur la retraite complémentaire et certains régimes de prévoyance.",
          "L'écart n'est pas toujours spectaculaire, mais il peut compter quand on compare deux offres proches ou une augmentation exprimée en brut annuel."
        ]
      },
      {
        title: "Exemple concret avec 3 000 € brut",
        paragraphs: [
          "Avec 3 000 € brut par mois, le simulateur donne une estimation du net mensuel avant impôt. Si vous ajoutez un taux de prélèvement à la source, vous obtenez aussi une projection du montant versé après impôt.",
          "Ce double affichage est utile pour distinguer la rémunération contractuelle du montant réellement disponible sur le compte bancaire."
        ]
      },
      {
        title: "Les points à vérifier sur la fiche de paie",
        paragraphs: [
          "La mutuelle, les tickets restaurant, la prévoyance, les primes et les avantages en nature peuvent faire bouger le net.",
          "Pour un poste cadre, vérifiez aussi si la rémunération comprend une part variable, une prime annuelle ou un forfait jours. Ces éléments changent la lecture du salaire."
        ]
      },
      {
        title: "Quand utiliser le simulateur",
        paragraphs: [
          "Le simulateur est pratique avant un entretien, une négociation ou une rupture conventionnelle. Il permet de traduire rapidement un brut annuel ou mensuel en montant net comparable.",
          "Pour une décision importante, gardez ensuite votre bulletin de paie ou une simulation RH comme référence finale."
        ]
      }
    ],
    links: [commonLinks.nonExecutive, commonLinks.annual, commonLinks.tax, commonLinks.negotiation],
    warningTopic: "un salaire cadre",
    faqTopic: "un salaire brut cadre en net"
  }),
  createGuidePage({
    slug: "salaire-brut-net-non-cadre",
    title: "Salaire brut en net non-cadre : calcul simple et rapide",
    seoTitle: "Salaire brut en net non-cadre : estimation simple",
    description:
      "Convertissez un salaire brut non-cadre en net avant impôt, avec des exemples à 2 000 € et 2 500 € brut mensuel.",
    excerpt:
      "Pour un salarié non-cadre du privé, une estimation rapide consiste à retirer environ 22 % de cotisations salariales au brut.",
    eyebrow: "Non-cadre",
    summary:
      "Le calcul brut/net non-cadre sert souvent à lire une offre, une augmentation ou une promesse d'embauche sans attendre la fiche de paie.",
    example: getSalarySeoExample(
      2500,
      "monthly",
      "privateNonExecutive",
      5,
      "Exemple avec 2 500 € brut non-cadre",
      "Un repère courant pour traduire un salaire mensuel brut en net avant impôt."
    ),
    sections: [
      {
        title: "Une conversion utile au quotidien",
        paragraphs: [
          "Le brut figure souvent dans le contrat, l'offre d'emploi ou l'avenant. Le net, lui, sert à savoir ce qui restera réellement avant impôt.",
          "Pour un non-cadre du privé, l'estimation utilisée ici retient un taux indicatif de cotisations salariales de 22 %."
        ]
      },
      {
        title: "Exemples à 2 000 € et 2 500 € brut",
        paragraphs: [
          "À 2 000 € brut mensuel, l'ordre de grandeur tourne autour de 1 560 € net avant impôt avec ce profil.",
          "À 2 500 € brut mensuel, l'estimation donne un net plus confortable, mais le montant versé peut encore varier avec la mutuelle, les titres-restaurant ou une prime."
        ]
      },
      {
        title: "Ce que le calcul ne voit pas",
        paragraphs: [
          "Un simulateur rapide ne lit pas votre convention collective, vos absences, vos heures supplémentaires ou les règles de votre entreprise.",
          "C'est pour cela qu'il faut parler d'estimation. Elle est très utile pour se situer, mais elle ne remplace pas le bulletin de salaire."
        ]
      },
      {
        title: "Net avant impôt ou net versé",
        paragraphs: [
          "Le net avant impôt correspond au salaire après cotisations sociales. Le net versé dépend ensuite du prélèvement à la source.",
          "Si vous connaissez votre taux, vous pouvez l'ajouter dans le simulateur pour obtenir une estimation après impôt."
        ]
      },
      {
        title: "Bien comparer deux propositions",
        paragraphs: [
          "Comparez toujours deux salaires sur la même base : brut annuel avec brut annuel, ou net mensuel avec net mensuel.",
          "Un 13e mois, une prime variable ou un temps partiel peuvent rendre la comparaison trompeuse si on se limite au montant mensuel."
        ]
      }
    ],
    links: [commonLinks.executive, commonLinks.annual, commonLinks.tax, commonLinks.payslip],
    warningTopic: "un salaire non-cadre",
    faqTopic: "un salaire brut non-cadre en net"
  }),
  createGuidePage({
    slug: "salaire-annuel-brut-en-net",
    title: "Salaire annuel brut en net : convertir une rémunération annuelle",
    seoTitle: "Salaire annuel brut en net : calcul mensuel et annuel",
    description:
      "Transformez un salaire annuel brut en net mensuel, avec les bons repères pour une offre d'emploi ou une négociation salariale.",
    excerpt:
      "Les offres d'emploi parlent souvent en brut annuel. Pour savoir ce que cela représente chaque mois, il faut d'abord ramener le montant sur 12 mois.",
    eyebrow: "Salaire annuel",
    summary:
      "Un salaire annuel brut devient lisible quand on le transforme en brut mensuel, puis en net avant impôt.",
    example: getSalarySeoExample(
      35000,
      "annual",
      "privateNonExecutive",
      5,
      "Exemple avec 35 000 € brut annuel",
      "Une base fréquente dans les offres d'emploi, ramenée ici sur 12 mois."
    ),
    sections: [
      {
        title: "Passer de l'annuel au mensuel",
        paragraphs: [
          "La méthode la plus simple consiste à diviser le brut annuel par 12. Un salaire de 35 000 € brut annuel correspond ainsi à environ 2 916,67 € brut par mois.",
          "Le simulateur applique ensuite le taux indicatif lié au statut pour estimer le net mensuel avant impôt."
        ]
      },
      {
        title: "Pourquoi les recruteurs parlent en annuel",
        paragraphs: [
          "Le brut annuel permet de comparer des rémunérations avec primes, 13e mois ou package global.",
          "Mais pour votre budget, le montant mensuel reste plus parlant. C'est lui qui permet d'anticiper un loyer, un crédit ou une capacité d'épargne."
        ]
      },
      {
        title: "Attention au 13e mois",
        paragraphs: [
          "Si le salaire est versé sur 13 mois, le brut annuel ne change pas, mais le montant reçu chaque mois peut être plus faible hors mois de prime.",
          "Le calculateur raisonne par défaut sur 12 mois. Pour une lecture fine, vérifiez le rythme de versement indiqué dans l'offre."
        ]
      },
      {
        title: "Cadre, non-cadre ou fonction publique",
        paragraphs: [
          "À brut annuel identique, le net varie selon le statut choisi. Un cadre peut avoir une retenue estimée plus forte qu'un non-cadre.",
          "Dans la fonction publique, le raisonnement est encore différent : primes, traitement indiciaire et régime de cotisations peuvent changer le résultat réel."
        ]
      },
      {
        title: "Le bon réflexe avant de négocier",
        paragraphs: [
          "Avant de répondre à une proposition, convertissez le brut annuel en net mensuel. Vous évitez ainsi de négocier sur un chiffre qui paraît élevé mais reste abstrait.",
          "Gardez aussi une marge pour les éléments non inclus : variable, intéressement, avantages, télétravail ou mutuelle."
        ]
      }
    ],
    links: [commonLinks.executive, commonLinks.nonExecutive, commonLinks.tax, commonLinks.negotiation],
    warningTopic: "un salaire annuel",
    faqTopic: "un salaire annuel brut en net"
  }),
  createGuidePage({
    slug: "salaire-mensuel-brut-en-net",
    title: "Salaire mensuel brut en net : estimer le montant réellement perçu",
    seoTitle: "Salaire mensuel brut en net : estimation avant impôt",
    description:
      "Calculez rapidement le net mensuel à partir d'un salaire brut, selon le statut cadre, non-cadre ou fonction publique.",
    excerpt:
      "Le salaire mensuel brut est le repère le plus direct pour estimer ce qui tombe chaque mois avant ou après impôt.",
    eyebrow: "Mensuel",
    summary:
      "Indiquez un brut mensuel, choisissez votre statut, puis obtenez un net estimé sans entrer dans le détail d'une fiche de paie.",
    example: getSalarySeoExample(
      2200,
      "monthly",
      "privateNonExecutive",
      5,
      "Exemple avec 2 200 € brut mensuel",
      "Une conversion simple pour lire une offre ou vérifier une augmentation."
    ),
    sections: [
      {
        title: "Le calcul mensuel en une phrase",
        paragraphs: [
          "On part du salaire brut mensuel, on retire les cotisations salariales estimées, puis on obtient le net avant impôt.",
          "Si vous renseignez un taux de prélèvement à la source, le simulateur estime aussi le net après impôt."
        ]
      },
      {
        title: "Pourquoi le brut reste affiché partout",
        paragraphs: [
          "Le brut est la base contractuelle. Il sert à définir le salaire dans le contrat de travail et à calculer de nombreux droits.",
          "Le net est plus concret pour le salarié, mais il dépend de paramètres individuels et de lignes de paie qui peuvent varier."
        ]
      },
      {
        title: "Temps plein ou temps partiel",
        paragraphs: [
          "À temps plein, la référence utilisée est 35 heures par semaine. Si votre contrat prévoit un autre volume, le simulateur permet de personnaliser les heures.",
          "C'est important pour les temps partiels, les contrats étudiants ou les changements d'organisation."
        ]
      },
      {
        title: "Net avant impôt : le repère principal",
        paragraphs: [
          "Le net avant impôt est souvent le meilleur point de comparaison entre deux salaires. Il neutralise le taux fiscal personnel, qui dépend du foyer.",
          "Le net après impôt sert plutôt à anticiper le montant qui sera effectivement versé."
        ]
      },
      {
        title: "Une estimation à relire avec la paie",
        paragraphs: [
          "La mutuelle obligatoire, les tickets restaurant, les primes et les absences peuvent expliquer un écart entre l'estimation et le bulletin.",
          "L'outil reste utile pour obtenir un ordre de grandeur immédiat et éviter les mauvaises surprises."
        ]
      }
    ],
    links: [commonLinks.annual, commonLinks.hourly, commonLinks.tax, commonLinks.payslip],
    warningTopic: "un salaire mensuel",
    faqTopic: "un salaire mensuel brut en net"
  }),
  createGuidePage({
    slug: "salaire-horaire-brut-en-net",
    title: "Salaire horaire brut en net : calculer son taux horaire net",
    seoTitle: "Salaire horaire brut en net : calcul du taux horaire",
    description:
      "Convertissez un salaire horaire brut en net mensuel et annuel, utile pour les temps partiels, extras, jobs étudiants et contrats horaires.",
    excerpt:
      "Un taux horaire brut devient plus parlant quand il est ramené en net horaire, mensuel et annuel.",
    eyebrow: "Taux horaire",
    summary:
      "Le salaire horaire concerne souvent les temps partiels, les extras ou les contrats avec un volume d'heures variable.",
    example: getSalarySeoExample(
      15,
      "hourly",
      "privateNonExecutive",
      5,
      "Exemple avec 15 € brut de l'heure",
      "Estimation sur une base temps plein de 35 heures par semaine."
    ),
    sections: [
      {
        title: "Du taux horaire au salaire mensuel",
        paragraphs: [
          "Pour convertir un taux horaire brut, le simulateur multiplie le montant par le nombre d'heures mensualisées.",
          "Sur une base de 35 heures, on retient environ 151,67 heures par mois. Un autre temps de travail peut être renseigné."
        ]
      },
      {
        title: "Un repère utile pour les contrats courts",
        paragraphs: [
          "Extras, renforts, jobs étudiants ou temps partiels : le taux horaire est souvent plus visible que le salaire mensuel.",
          "Le convertir en net permet de mieux anticiper ce que représentera réellement la mission."
        ]
      },
      {
        title: "Attention aux heures supplémentaires",
        paragraphs: [
          "Les heures supplémentaires peuvent être majorées et parfois exonérées selon les règles applicables.",
          "La V1 du simulateur ne détaille pas ces mécanismes. Elle transforme le taux horaire sur la base d'un volume d'heures régulier."
        ]
      },
      {
        title: "Comparer deux taux horaires",
        paragraphs: [
          "Deux taux bruts ne se comparent pas toujours seuls. Regardez aussi le nombre d'heures garanties, les primes, les frais et les avantages.",
          "Un taux horaire un peu plus élevé peut être moins intéressant si le volume d'heures est très variable."
        ]
      },
      {
        title: "Net avant ou après impôt",
        paragraphs: [
          "Le net horaire avant impôt donne un repère simple. Le net après impôt dépend du taux transmis par l'administration fiscale.",
          "Si vous connaissez ce taux, vous pouvez l'ajouter pour obtenir une estimation du salaire versé."
        ]
      }
    ],
    links: [commonLinks.annual, commonLinks.nonExecutive, commonLinks.smic, commonLinks.tax],
    warningTopic: "un salaire horaire",
    faqTopic: "un salaire horaire brut en net"
  }),
  createGuidePage({
    slug: "net-avant-impot-net-apres-impot",
    title: "Net avant impôt et net après impôt : quelle différence ?",
    seoTitle: "Net avant impôt et net après impôt : comprendre l'écart",
    description:
      "Comprenez la différence entre salaire net avant impôt, net après impôt et prélèvement à la source sur la fiche de paie.",
    excerpt:
      "Le net avant impôt est le salaire après cotisations. Le net après impôt est le montant restant après prélèvement à la source.",
    eyebrow: "Impôt sur le revenu",
    summary:
      "La fiche de paie affiche plusieurs nets. Les confondre peut fausser une comparaison de salaire ou une négociation.",
    example: getSalarySeoExample(
      2500,
      "monthly",
      "privateNonExecutive",
      5,
      "Exemple avec 5 % de prélèvement à la source",
      "Le net avant impôt est calculé d'abord, puis le taux de prélèvement est appliqué."
    ),
    sections: [
      {
        title: "Le net avant impôt",
        paragraphs: [
          "Le net avant impôt correspond au salaire après cotisations salariales, mais avant retenue de l'impôt sur le revenu.",
          "C'est souvent le montant le plus utile pour comparer deux rémunérations, car il ne dépend pas de votre situation fiscale personnelle."
        ]
      },
      {
        title: "Le net après impôt",
        paragraphs: [
          "Le net après impôt correspond au montant versé après prélèvement à la source.",
          "Il dépend du taux transmis par l'administration fiscale ou du taux neutre appliqué si vous ne transmettez pas votre taux personnalisé."
        ]
      },
      {
        title: "Pourquoi l'écart varie d'une personne à l'autre",
        paragraphs: [
          "Deux salariés au même salaire brut peuvent avoir le même net avant impôt, mais un net après impôt différent.",
          "La différence vient du taux fiscal : foyer, revenus du conjoint, autres revenus, choix du taux individualisé ou neutre."
        ]
      },
      {
        title: "Le bon montant pour négocier",
        paragraphs: [
          "En négociation salariale, partez du brut annuel ou mensuel, puis convertissez en net avant impôt.",
          "Le net après impôt est utile pour votre budget, mais il ne reflète pas uniquement la valeur du salaire proposé par l'employeur."
        ]
      },
      {
        title: "Où le voir sur la fiche de paie",
        paragraphs: [
          "La fiche de paie fait apparaître le net à payer avant impôt et le montant de l'impôt prélevé à la source.",
          "Le montant réellement versé correspond au net après cette retenue."
        ]
      }
    ],
    links: [commonLinks.taxable, commonLinks.payslip, commonLinks.annual, commonLinks.tool],
    warningTopic: "le net avant et après impôt",
    faqTopic: "le net avant impôt et le net après impôt"
  }),
  createGuidePage({
    slug: "salaire-net-imposable",
    title: "Salaire net imposable : comprendre la différence avec le net à payer",
    seoTitle: "Salaire net imposable : définition et différence avec le net",
    description:
      "Comprenez le salaire net imposable, son rôle pour le prélèvement à la source et sa différence avec le net à payer.",
    excerpt:
      "Le net imposable n'est pas toujours égal au salaire versé. Il sert de base fiscale et peut être légèrement supérieur au net perçu.",
    category: "Fiche de paie",
    eyebrow: "Fiche de paie",
    summary:
      "Le net imposable est une ligne clé du bulletin de salaire. Elle explique parfois pourquoi l'impôt est calculé sur un montant différent du net versé.",
    example: getSalarySeoExample(
      2400,
      "monthly",
      "privateNonExecutive",
      5,
      "Exemple de lecture brut, net et impôt",
      "Le simulateur estime le net avant impôt, puis le net après prélèvement si un taux est renseigné."
    ),
    sections: [
      {
        title: "À quoi sert le net imposable",
        paragraphs: [
          "Le net imposable sert de base au calcul du prélèvement à la source. Il apparaît sur la fiche de paie et dans les cumuls annuels.",
          "Il ne faut pas le confondre avec le net payé sur le compte bancaire."
        ]
      },
      {
        title: "Pourquoi il peut être différent du net à payer",
        paragraphs: [
          "Certaines contributions, notamment une part de CSG-CRDS, peuvent être imposables. Cela explique que le net imposable soit parfois supérieur au net perçu.",
          "Le détail exact dépend de la paie réelle et du paramétrage de l'employeur."
        ]
      },
      {
        title: "Lien avec le prélèvement à la source",
        paragraphs: [
          "L'impôt prélevé chaque mois est calculé en appliquant le taux de prélèvement au revenu imposable du mois.",
          "Le simulateur brut/net donne un ordre de grandeur du net, mais il ne reconstitue pas toutes les lignes fiscales du bulletin."
        ]
      },
      {
        title: "Le bon réflexe sur votre bulletin",
        paragraphs: [
          "Repérez trois lignes : brut, net à payer avant impôt, et net imposable. Elles ne répondent pas à la même question.",
          "Le brut décrit la rémunération contractuelle, le net avant impôt votre salaire après cotisations, le net imposable la base fiscale."
        ]
      },
      {
        title: "Pour comparer un salaire",
        paragraphs: [
          "Pour comparer deux offres, utilisez plutôt le brut annuel et le net avant impôt estimé.",
          "Le net imposable sert surtout à comprendre l'impôt et à vérifier les informations déclarées."
        ]
      }
    ],
    links: [commonLinks.tax, commonLinks.payslip, commonLinks.tool, commonLinks.annual],
    warningTopic: "le salaire net imposable",
    faqTopic: "le salaire net imposable"
  }),
  createGuidePage({
    slug: "salaire-brut-net-fonction-publique",
    title: "Salaire brut en net dans la fonction publique : estimation et limites",
    seoTitle: "Salaire brut en net fonction publique : estimation prudente",
    description:
      "Estimez un salaire brut en net dans la fonction publique, avec les limites liées au traitement indiciaire, aux primes et aux retenues.",
    excerpt:
      "Dans la fonction publique, le passage du brut au net ne se lit pas exactement comme dans le privé. Les primes et le traitement indiciaire comptent beaucoup.",
    eyebrow: "Fonction publique",
    summary:
      "L'estimation fonction publique utilise un taux indicatif plus faible, mais la fiche de paie réelle dépend fortement du profil et des primes.",
    example: getSalarySeoExample(
      2200,
      "monthly",
      "publicSector",
      5,
      "Exemple avec 2 200 € brut dans la fonction publique",
      "Repère indicatif pour un agent public, à relire avec la fiche de paie."
    ),
    sections: [
      {
        title: "Un calcul différent du privé",
        paragraphs: [
          "Le salaire public peut combiner traitement indiciaire, primes, indemnités et retenues spécifiques.",
          "Pour une estimation rapide, l'outil retient un taux indicatif de 16,5 %. Il ne remplace pas le détail d'une paie publique."
        ]
      },
      {
        title: "Primes et indemnités",
        paragraphs: [
          "Certaines primes peuvent représenter une part importante de la rémunération. Elles peuvent aussi avoir un traitement social différent.",
          "C'est l'une des raisons pour lesquelles deux agents avec un brut proche peuvent avoir des nets différents."
        ]
      },
      {
        title: "Traitement indiciaire et temps de travail",
        paragraphs: [
          "Le traitement indiciaire suit des règles propres à la fonction publique. Le temps partiel, les absences ou certaines sujétions peuvent modifier le montant versé.",
          "Le simulateur donne donc un ordre de grandeur, pas une simulation administrative complète."
        ]
      },
      {
        title: "Comparer avec une offre du privé",
        paragraphs: [
          "Comparer un salaire public et un salaire privé demande de regarder le net, mais aussi les primes, les horaires, la stabilité et les avantages.",
          "Un même brut ne produit pas toujours le même net selon le régime."
        ]
      },
      {
        title: "Quand l'utiliser",
        paragraphs: [
          "L'outil est utile pour transformer rapidement un brut en net avant impôt, notamment lors d'une mobilité ou d'une comparaison de poste.",
          "Pour une validation précise, reportez-vous au bulletin de paie ou au service RH."
        ]
      }
    ],
    links: [commonLinks.tax, commonLinks.payslip, commonLinks.annual, commonLinks.smic],
    warningTopic: "un salaire dans la fonction publique",
    faqTopic: "un salaire brut en net dans la fonction publique"
  }),
  createGuidePage({
    slug: "calculer-son-salaire-net",
    title: "Calculer son salaire net : méthode simple et erreurs à éviter",
    seoTitle: "Calculer son salaire net : méthode simple",
    description:
      "Apprenez à calculer votre salaire net à partir du brut, avec les erreurs fréquentes à éviter avant d'accepter une offre.",
    excerpt:
      "Calculer son salaire net revient à transformer un brut contractuel en montant réellement comparable, avant puis après impôt.",
    eyebrow: "Méthode",
    summary:
      "La bonne méthode tient en trois étapes : partir du bon brut, choisir le bon statut, puis distinguer net avant impôt et net versé.",
    example: getSalarySeoExample(
      2800,
      "monthly",
      "privateNonExecutive",
      5,
      "Exemple avec 2 800 € brut mensuel",
      "Une conversion utile pour vérifier une augmentation ou une promesse d'embauche."
    ),
    sections: [
      {
        title: "Partir du bon montant brut",
        paragraphs: [
          "Le brut peut être horaire, mensuel ou annuel. Avant de calculer, vérifiez la période indiquée.",
          "Une offre à 35 000 € brut annuel ne se lit pas comme 3 500 € brut mensuel. La première étape consiste donc à remettre les montants sur la même base."
        ]
      },
      {
        title: "Choisir le bon statut",
        paragraphs: [
          "Le statut cadre, non-cadre ou fonction publique influence le taux de conversion utilisé dans l'estimation.",
          "Le choix n'a pas besoin d'être technique : sélectionnez simplement la situation qui correspond le mieux au contrat."
        ]
      },
      {
        title: "Ne pas confondre net et net après impôt",
        paragraphs: [
          "Le net avant impôt correspond au salaire après cotisations. Le net après impôt dépend du taux de prélèvement à la source.",
          "Pour comparer deux offres, le net avant impôt est souvent plus juste. Pour votre budget, le net après impôt est plus concret."
        ]
      },
      {
        title: "Les erreurs fréquentes",
        paragraphs: [
          "La première erreur consiste à diviser un brut annuel par 12 sans vérifier l'existence d'un 13e mois.",
          "La deuxième consiste à oublier les primes, la mutuelle ou les avantages qui peuvent modifier le net réel."
        ]
      },
      {
        title: "Utiliser le résultat avec prudence",
        paragraphs: [
          "Une estimation brut/net permet de décider plus vite et de poser de meilleures questions.",
          "Elle doit ensuite être relue à partir des documents RH, surtout si le package comporte une part variable ou des avantages importants."
        ]
      }
    ],
    links: [commonLinks.annual, commonLinks.executive, commonLinks.tax, commonLinks.payslip],
    warningTopic: "le calcul de votre salaire net",
    faqTopic: "le calcul de son salaire net"
  }),
  createGuidePage({
    slug: "difference-brut-net",
    title: "Salaire brut et salaire net : quelle différence ?",
    seoTitle: "Salaire brut et salaire net : différence simple",
    description:
      "Comprenez simplement la différence entre salaire brut, salaire net avant impôt et salaire net après impôt.",
    excerpt:
      "Le brut est le salaire avant cotisations. Le net est le montant après cotisations, avant ou après impôt selon la ligne regardée.",
    eyebrow: "Comprendre son salaire",
    summary:
      "La différence brut/net explique l'écart entre le montant annoncé dans une offre et ce qui arrive réellement sur le compte.",
    example: getSalarySeoExample(
      2000,
      "monthly",
      "privateNonExecutive",
      5,
      "Exemple avec 2 000 € brut",
      "Un exemple volontairement simple pour visualiser l'écart brut/net."
    ),
    sections: [
      {
        title: "Le salaire brut",
        paragraphs: [
          "Le salaire brut correspond au montant avant cotisations salariales. C'est le chiffre qui figure le plus souvent dans le contrat de travail.",
          "Il sert de base à de nombreux calculs : retraite, indemnités, primes et comparaisons de rémunération."
        ]
      },
      {
        title: "Le salaire net",
        paragraphs: [
          "Le salaire net avant impôt correspond au brut après déduction des cotisations salariales.",
          "C'est le montant le plus utile pour comprendre ce que votre travail rapporte avant intervention de l'impôt sur le revenu."
        ]
      },
      {
        title: "Le salaire versé",
        paragraphs: [
          "Depuis le prélèvement à la source, le montant versé peut être inférieur au net avant impôt.",
          "L'écart dépend de votre taux fiscal personnel. Deux salariés au même salaire peuvent donc recevoir un montant après impôt différent."
        ]
      },
      {
        title: "Pourquoi les cotisations existent",
        paragraphs: [
          "Les cotisations financent notamment la protection sociale : retraite, santé, chômage selon les régimes et contributions applicables.",
          "Elles expliquent l'essentiel de l'écart entre brut et net, même si chaque fiche de paie a ses particularités."
        ]
      },
      {
        title: "Le bon réflexe",
        paragraphs: [
          "Quand on vous annonce un salaire, demandez toujours s'il s'agit d'un brut annuel, d'un brut mensuel ou d'un net.",
          "Puis convertissez-le sur la même base que vos dépenses : le plus souvent le net mensuel."
        ]
      }
    ],
    links: [commonLinks.tax, commonLinks.taxable, commonLinks.payslip, commonLinks.smic],
    warningTopic: "la différence entre brut et net",
    faqTopic: "la différence entre salaire brut et salaire net"
  })
];

const monthlyAmountPagesConfig = [
  {
    amount: 1800,
    slug: "1800-brut-en-net",
    title: "1800 € brut en net : estimation du salaire mensuel",
    seoTitle: "1800 € brut en net : salaire mensuel estimé",
    description:
      "Estimez 1800 € brut en net pour un salarié cadre ou non-cadre, avec l'équivalent annuel et un exemple après prélèvement à la source.",
    angle:
      "Ce niveau de salaire se situe tout près du Smic revalorisé. Le bon réflexe consiste à vérifier le net, mais aussi les primes éventuelles et le temps de travail.",
    context: "début de carrière ou poste proche du salaire minimum",
    focus: "proche du Smic"
  },
  {
    amount: 1900,
    slug: "1900-brut-en-net",
    title: "1900 € brut en net : combien reste-t-il après cotisations ?",
    seoTitle: "1900 € brut en net : estimation avant impôt",
    description:
      "Calculez 1900 € brut en net avant impôt, comparez cadre et non-cadre et voyez l'impact d'un taux de prélèvement à la source.",
    angle:
      "À 1 900 € brut, l'écart avec le minimum légal reste limité. Quelques avantages, une prime ou une mutuelle peuvent donc peser dans la comparaison.",
    context: "salaire d'entrée ou rémunération opérationnelle",
    focus: "premier palier au-dessus du Smic"
  },
  {
    amount: 2000,
    slug: "2000-brut-en-net",
    title: "2000 € brut en net : combien gagne-t-on réellement ?",
    seoTitle: "2000 € brut en net : calcul mensuel et annuel",
    description:
      "Transformez 2000 € brut mensuel en net avant impôt, avec estimation cadre, non-cadre, annuel et après impôt.",
    angle:
      "2 000 € brut est un repère très courant. Le montant paraît simple, mais le net varie selon le statut et le prélèvement à la source.",
    context: "salaire courant dans de nombreux métiers",
    focus: "repère mensuel fréquent"
  },
  {
    amount: 2200,
    slug: "2200-brut-en-net",
    title: "2200 € brut en net : estimation mensuelle et annuelle",
    seoTitle: "2200 € brut en net : salaire net estimé",
    description:
      "Estimez 2200 € brut en net mensuel et annuel, avec comparaison cadre/non-cadre et exemple après impôt.",
    angle:
      "À 2 200 € brut, la conversion aide à mesurer une proposition ou une augmentation sans se limiter au chiffre annoncé.",
    context: "salaire courant avec première progression",
    focus: "progression salariale"
  },
  {
    amount: 2300,
    slug: "2300-brut-en-net",
    title: "2300 € brut en net : calcul du salaire net estimé",
    seoTitle: "2300 € brut en net : estimation simple",
    description:
      "Calculez 2300 € brut en net avant et après impôt, avec l'équivalent annuel et les limites de l'estimation.",
    angle:
      "2 300 € brut peut correspondre à un poste confirmé ou à une rémunération avec responsabilités. La lecture en net permet de comparer plus sereinement.",
    context: "poste confirmé ou évolution récente",
    focus: "lecture du net mensuel"
  },
  {
    amount: 2500,
    slug: "2500-brut-en-net",
    title: "2500 € brut en net : estimation mensuelle et annuelle",
    seoTitle: "2500 € brut en net : calcul avant impôt",
    description:
      "Convertissez 2500 € brut en net mensuel et annuel, avec estimation non-cadre, cadre et prélèvement à la source.",
    angle:
      "À 2 500 € brut, l'enjeu est souvent de savoir si une hausse promise se voit réellement sur le net mensuel.",
    context: "augmentation ou changement de poste",
    focus: "progression salariale"
  },
  {
    amount: 2800,
    slug: "2800-brut-en-net",
    title: "2800 € brut en net : combien en net avant impôt ?",
    seoTitle: "2800 € brut en net : salaire net estimé",
    description:
      "Estimez 2800 € brut en net avant impôt, avec comparaison cadre/non-cadre, annuel et impact d'un PAS à 5 %.",
    angle:
      "2 800 € brut commence souvent à entrer dans une logique de négociation. Le net mensuel aide à apprécier l'effort réel.",
    context: "négociation ou mobilité interne",
    focus: "net avant impôt"
  },
  {
    amount: 3000,
    slug: "3000-brut-en-net",
    title: "3000 € brut en net : calcul du salaire net estimé",
    seoTitle: "3000 € brut en net : cadre et non-cadre",
    description:
      "Calculez 3000 € brut en net pour un salarié cadre ou non-cadre, avec équivalent annuel et net après impôt indicatif.",
    angle:
      "À 3 000 € brut, la différence cadre/non-cadre devient plus visible dans l'estimation. C'est un bon palier pour comparer deux offres.",
    context: "poste qualifié ou cadre débutant",
    focus: "comparaison cadre/non-cadre"
  },
  {
    amount: 3500,
    slug: "3500-brut-en-net",
    title: "3500 € brut en net : estimation cadre et non-cadre",
    seoTitle: "3500 € brut en net : estimation mensuelle",
    description:
      "Transformez 3500 € brut en net avant impôt, comparez cadre et non-cadre et estimez l'impact du prélèvement à la source.",
    angle:
      "3 500 € brut est souvent annoncé en contexte de prise de responsabilités. Il faut regarder le net, mais aussi la part variable et le forfait éventuel.",
    context: "prise de responsabilités",
    focus: "salaire cadre ou confirmé"
  },
  {
    amount: 4000,
    slug: "4000-brut-en-net",
    title: "4000 € brut en net : salaire net estimé avant impôt",
    seoTitle: "4000 € brut en net : calcul mensuel et annuel",
    description:
      "Estimez 4000 € brut en net avant impôt et après impôt, avec comparaison cadre/non-cadre et équivalent annuel.",
    angle:
      "À 4 000 € brut, la rémunération se lit rarement seule : variable, primes, statut cadre et avantages peuvent changer l'intérêt réel du package.",
    context: "négociation salariale ou évolution cadre",
    focus: "package de rémunération"
  }
] as const;

function createMonthlyAmountPage(config: (typeof monthlyAmountPagesConfig)[number]): SalarySeoPage {
  const nonExecutive = getSalarySeoExample(
    config.amount,
    "monthly",
    "privateNonExecutive",
    5,
    `${formatEuro(config.amount, true)} brut en non-cadre`,
    "Estimation avant impôt pour un salarié du privé non-cadre."
  );
  const executive = getSalarySeoExample(
    config.amount,
    "monthly",
    "privateExecutive",
    5,
    `${formatEuro(config.amount, true)} brut en cadre`,
    "Estimation avant impôt pour un salarié du privé cadre."
  );

  return makePage({
    slug: config.slug,
    title: config.title,
    seoTitle: config.seoTitle,
    description: config.description,
    excerpt: `${formatEuro(config.amount, true)} brut par mois représente environ ${nonExecutive.netMonthly} net avant impôt en non-cadre et ${executive.netMonthly} en cadre, selon les taux indicatifs du simulateur.`,
    category: "Montant mensuel",
    readingTime: "4 min",
    hero: {
      eyebrow: config.focus,
      summary: config.angle
    },
    sections: [
      {
        title: `${formatEuro(config.amount, true)} brut en net : le repère immédiat`,
        paragraphs: [
          `Avec ${formatEuro(config.amount, true)} brut mensuel, l'estimation non-cadre donne environ ${nonExecutive.netMonthly} net avant impôt.`,
          `En profil cadre, le résultat est estimé autour de ${executive.netMonthly} net avant impôt, car le taux de cotisations retenu est plus élevé.`
        ]
      },
      {
        title: "Ce que cela représente sur un an",
        paragraphs: [
          `Sur 12 mois, ${formatEuro(config.amount, true)} brut mensuel correspond à ${nonExecutive.grossAnnual} brut annuel.`,
          `En non-cadre, cela donne un ordre de grandeur de ${nonExecutive.netAnnual} net annuel avant impôt. Ce montant peut être différent si un 13e mois ou une prime annuelle existe.`
        ]
      },
      {
        title: "Après prélèvement à la source",
        paragraphs: [
          `Avec un taux de prélèvement à la source de 5 %, le net versé estimé serait d'environ ${nonExecutive.netAfterTaxMonthly} par mois en non-cadre.`,
          "Votre propre taux peut être différent. Il dépend de votre foyer fiscal, pas seulement de votre salaire."
        ]
      },
      {
        title: `Un montant à situer dans son contexte`,
        paragraphs: [
          `Pour un ${config.context}, le montant net ne suffit pas toujours à juger une proposition.`,
          "Regardez aussi les horaires, la mutuelle, les tickets restaurant, les primes, le télétravail et le rythme de versement."
        ]
      },
      {
        title: "Comment affiner le calcul",
        paragraphs: [
          "Le simulateur permet de changer le statut, de saisir un taux d'impôt et de passer d'une base mensuelle à une base annuelle ou horaire.",
          "C'est utile si le montant annoncé par l'employeur n'est pas présenté dans le même format que votre budget personnel."
        ]
      }
    ],
    examples: [nonExecutive, executive],
    faq: [
      {
        question: `${formatEuro(config.amount, true)} brut correspond à combien en net ?`,
        answer: `Avec le profil non-cadre du simulateur, ${formatEuro(config.amount, true)} brut mensuel correspond à environ ${nonExecutive.netMonthly} net avant impôt. En cadre, l'estimation est d'environ ${executive.netMonthly}.`
      },
      {
        question: "Pourquoi le net cadre est-il différent ?",
        answer:
          "Le profil cadre applique un taux indicatif de cotisations plus élevé, notamment pour tenir compte de différences possibles sur la retraite complémentaire et la prévoyance."
      },
      {
        question: "Le montant annuel est-il calculé sur 12 mois ?",
        answer:
          "Oui, l'estimation annuelle multiplie le mensuel par 12. Si votre entreprise verse un 13e mois, la répartition mensuelle peut être différente."
      },
      {
        question: "Le prélèvement à la source est-il inclus ?",
        answer:
          "Le résultat principal est avant impôt. Un exemple avec 5 % est affiché pour donner un ordre de grandeur après prélèvement à la source."
      }
    ],
    internalLinks: [
      commonLinks.tool,
      commonLinks.annual,
      commonLinks.executive,
      commonLinks.nonExecutive,
      commonLinks.tax,
      config.amount <= 1900 ? commonLinks.smic : commonLinks.negotiation
    ],
    cta: baseCta(`${formatEuro(config.amount, true)} brut en net`),
    warning: warning(`${formatEuro(config.amount, true)} brut mensuel`)
  });
}

const monthlyAmountPages = monthlyAmountPagesConfig.map(createMonthlyAmountPage);

const annualPagesConfig = [
  { amount: 25000, slug: "25000-brut-annuel-en-net", title: "25 000 € brut annuel en net : combien par mois ?", angle: "Un niveau fréquent pour une première offre ou un poste opérationnel." },
  { amount: 30000, slug: "30000-brut-annuel-en-net", title: "30 000 € brut annuel en net : estimation mensuelle", angle: "Un repère courant dans les offres d'emploi, à traduire en budget mensuel." },
  { amount: 35000, slug: "35000-brut-annuel-en-net", title: "35 000 € brut annuel en net : salaire mensuel estimé", angle: "Un palier souvent cité en négociation, surtout quand la rémunération est annoncée en annuel." },
  { amount: 40000, slug: "40000-brut-annuel-en-net", title: "40 000 € brut annuel en net : combien par mois ?", angle: "Un niveau qui mérite de regarder le statut, les primes et le rythme de versement." },
  { amount: 45000, slug: "45000-brut-annuel-en-net", title: "45 000 € brut annuel en net : estimation cadre et non-cadre", angle: "Un montant souvent associé à un profil confirmé ou cadre, à comparer avec le package complet." },
  { amount: 50000, slug: "50000-brut-annuel-en-net", title: "50 000 € brut annuel en net : salaire net mensuel estimé", angle: "À ce niveau, le net mensuel doit être lu avec la part variable, les avantages et le taux d'impôt." }
] as const;

function createAnnualPage(config: (typeof annualPagesConfig)[number]): SalarySeoPage {
  const nonExecutive = getSalarySeoExample(
    config.amount,
    "annual",
    "privateNonExecutive",
    5,
    `${formatEuro(config.amount, true)} brut annuel en non-cadre`,
    "Estimation ramenée sur 12 mois."
  );
  const executive = getSalarySeoExample(
    config.amount,
    "annual",
    "privateExecutive",
    5,
    `${formatEuro(config.amount, true)} brut annuel en cadre`,
    "Estimation cadre ramenée sur 12 mois."
  );

  return makePage({
    slug: config.slug,
    title: config.title,
    seoTitle: `${formatEuro(config.amount, true)} brut annuel en net : calcul mensuel`,
    description: `Convertissez ${formatEuro(config.amount, true)} brut annuel en net mensuel, avec estimation cadre/non-cadre, équivalent sur 12 mois et prélèvement à la source.`,
    excerpt: `${formatEuro(config.amount, true)} brut annuel correspond à ${nonExecutive.grossMonthly} brut par mois sur 12 mois, soit environ ${nonExecutive.netMonthly} net mensuel avant impôt en non-cadre.`,
    category: "Salaire annuel",
    readingTime: "4 min",
    hero: {
      eyebrow: "Offre d'emploi",
      summary: config.angle
    },
    sections: [
      {
        title: "Conversion annuelle en mensuel",
        paragraphs: [
          `Sur une base de 12 mois, ${formatEuro(config.amount, true)} brut annuel correspond à ${nonExecutive.grossMonthly} brut mensuel.`,
          `Le net mensuel estimé est d'environ ${nonExecutive.netMonthly} en non-cadre et ${executive.netMonthly} en cadre.`
        ]
      },
      {
        title: "Pourquoi le brut annuel peut tromper",
        paragraphs: [
          "Un salaire annuel paraît parfois plus élevé qu'il ne le sera dans votre budget mensuel.",
          "Il faut vérifier s'il est versé sur 12 mois, 13 mois, avec une part variable ou avec des primes conditionnelles."
        ]
      },
      {
        title: "Net annuel et net mensuel",
        paragraphs: [
          `L'estimation non-cadre donne environ ${nonExecutive.netAnnual} net annuel avant impôt.`,
          "Le net mensuel sert à piloter le quotidien. Le net annuel sert plutôt à comparer une trajectoire de rémunération."
        ]
      },
      {
        title: "Effet du prélèvement à la source",
        paragraphs: [
          `Avec un taux indicatif de 5 %, le net après impôt serait estimé autour de ${nonExecutive.netAfterTaxMonthly} par mois en non-cadre.`,
          "Votre taux réel peut être plus faible ou plus élevé selon votre foyer fiscal."
        ]
      },
      {
        title: "Avant d'accepter une offre",
        paragraphs: [
          "Demandez le détail du package : fixe, variable, primes, avantages, mutuelle, forfait jours et rythme de versement.",
          "Une offre se compare toujours avec la même base de calcul, sinon l'impression laissée par le brut annuel peut être trompeuse."
        ]
      }
    ],
    examples: [nonExecutive, executive],
    faq: [
      {
        question: `${formatEuro(config.amount, true)} brut annuel fait combien par mois ?`,
        answer: `Sur 12 mois, cela représente ${nonExecutive.grossMonthly} brut mensuel avant conversion en net.`
      },
      {
        question: "Le calcul tient-il compte d'un 13e mois ?",
        answer:
          "Non, la page présente une lecture sur 12 mois. Avec un 13e mois, le total annuel reste comparable, mais le versement mensuel peut changer."
      },
      {
        question: "Faut-il choisir cadre ou non-cadre ?",
        answer:
          "Oui si vous connaissez le statut prévu. À brut annuel identique, le profil cadre peut donner un net mensuel légèrement inférieur dans cette estimation."
      },
      {
        question: "Puis-je ajouter mon taux d'impôt ?",
        answer:
          "Oui, le simulateur salaire brut/net permet de renseigner votre taux de prélèvement à la source pour affiner le net après impôt."
      }
    ],
    internalLinks: [
      commonLinks.tool,
      commonLinks.annual,
      commonLinks.executive,
      commonLinks.tax,
      commonLinks.payslip,
      config.amount >= 40000 ? commonLinks.negotiation : commonLinks.nonExecutive
    ],
    cta: baseCta(`${formatEuro(config.amount, true)} brut annuel en net`),
    warning: warning(`${formatEuro(config.amount, true)} brut annuel`)
  });
}

const annualPages = annualPagesConfig.map(createAnnualPage);

const smicPages: SalarySeoPage[] = [
  makePage({
    slug: "smic-brut-net",
    title: "Smic brut en net : montant horaire, mensuel et annuel",
    seoTitle: "Smic brut en net 2026 : horaire, mensuel et annuel",
    description:
      "Consultez le Smic brut et net en vigueur au 1er juin 2026, avec les repères horaire, mensuel et annuel et les limites à vérifier.",
    excerpt: `Au 1er juin 2026, le Smic mensuel brut est de ${formatEuro(smicReference.monthlyGross)} pour 35 heures, avec un net indicatif de ${formatEuro(smicReference.monthlyNetIndicative)}.`,
    category: "Smic",
    readingTime: "5 min",
    hero: {
      eyebrow: `Données vérifiées au ${lastUpdated}`,
      summary:
        "Le Smic change lorsqu'il est revalorisé. Les montants sont donc centralisés et datés pour rester maintenables."
    },
    sections: [
      {
        title: "Les montants du Smic au 1er juin 2026",
        paragraphs: [
          `Le Smic horaire brut est de ${formatEuro(smicReference.hourlyGross)}. Le Smic mensuel brut pour 35 heures est de ${formatEuro(smicReference.monthlyGross)}.`,
          `Le net mensuel indicatif publié est de ${formatEuro(smicReference.monthlyNetIndicative)}. Ce montant reste indicatif, car le net peut varier selon les retenues et la situation de paie.`
        ],
        bullets: [
          `Smic horaire net indicatif : ${formatEuro(smicReference.hourlyNetIndicative)}`,
          `Smic annuel brut : ${formatEuro(smicReference.annualGross)}`,
          `Smic annuel net indicatif : ${formatEuro(smicReference.annualNetIndicative)}`
        ]
      },
      {
        title: "Brut, net et salaire minimum",
        paragraphs: [
          "Le Smic est d'abord un minimum légal brut horaire. Le net correspond au montant après déduction des cotisations salariales.",
          "Sur une fiche de paie, le montant versé peut ensuite être réduit par le prélèvement à la source si un taux d'impôt s'applique."
        ]
      },
      {
        title: "Temps plein ou temps partiel",
        paragraphs: [
          "Les montants mensuels habituels reposent sur la durée légale de 35 heures par semaine.",
          "À temps partiel, le raisonnement se fait au prorata du nombre d'heures, sauf règles particulières ou majorations."
        ]
      },
      {
        title: "Ce qui peut s'ajouter au Smic",
        paragraphs: [
          "Certaines primes ou majorations peuvent s'ajouter selon le poste, les horaires ou la convention collective.",
          "À l'inverse, certains éléments comme les absences peuvent modifier le montant réellement versé sur un mois donné."
        ]
      },
      {
        title: "Pourquoi vérifier la date",
        paragraphs: [
          "Le Smic est revalorisé au 1er janvier et peut aussi évoluer en cours d'année lorsque les conditions légales sont réunies.",
          "Avant une décision RH ou une comparaison précise, vérifiez toujours que les montants utilisés sont à jour."
        ]
      }
    ],
    examples: [
      getSalarySeoExample(
        smicReference.monthlyGross,
        "monthly",
        "privateNonExecutive",
        0,
        "Estimation avec le Smic mensuel brut",
        "Le simulateur applique son taux indicatif non-cadre ; le repère officiel net peut différer légèrement."
      )
    ],
    faq: [
      {
        question: "Quel est le Smic brut au 1er juin 2026 ?",
        answer: `Le Smic horaire brut est de ${formatEuro(smicReference.hourlyGross)} et le Smic mensuel brut de ${formatEuro(smicReference.monthlyGross)} sur la base de 35 heures.`
      },
      {
        question: "Quel est le Smic net mensuel indicatif ?",
        answer: `Le montant net mensuel indicatif est de ${formatEuro(smicReference.monthlyNetIndicative)} au 1er juin 2026.`
      },
      {
        question: "Le Smic net est-il toujours identique sur la fiche de paie ?",
        answer:
          "Non. Le montant net peut varier selon les retenues, les absences, les avantages, le régime local éventuel et le prélèvement à la source."
      },
      {
        question: "Le simulateur remplace-t-il une vérification officielle ?",
        answer:
          "Non. Il donne un repère pratique. Pour un contrôle juridique ou paie, il faut vérifier les textes et les montants officiels en vigueur."
      }
    ],
    internalLinks: [commonLinks.tool, commonLinks.hourly, commonLinks.annual, commonLinks.payslip, commonLinks.tax],
    cta: baseCta("convertir un salaire proche du Smic"),
    warning:
      "Les montants du Smic sont datés et doivent être maintenus à jour. Le net publié reste indicatif et peut différer de votre fiche de paie selon les retenues réellement appliquées."
  }),
  createGuidePage({
    slug: "smic-horaire-brut-net",
    title: "Smic horaire brut en net : combien gagne-t-on par heure ?",
    seoTitle: "Smic horaire brut en net 2026 : montant par heure",
    description:
      "Comprenez le Smic horaire brut et net au 1er juin 2026, avec une estimation pour temps partiel, extras et contrats horaires.",
    category: "Smic",
    excerpt: `Le Smic horaire brut est de ${formatEuro(smicReference.hourlyGross)} au 1er juin 2026, soit ${formatEuro(smicReference.hourlyNetIndicative)} net indicatif. C'est le repère de base pour convertir un contrat à l'heure.`,
    eyebrow: "Smic horaire",
    summary:
      "Le taux horaire est le bon repère pour les temps partiels, les extras et les contrats avec un volume d'heures variable.",
    example: getSalarySeoExample(
      smicReference.hourlyGross,
      "hourly",
      "privateNonExecutive",
      0,
      "Estimation sur une heure au Smic",
      "Projection avec le calculateur brut/net sur une base de 35 heures."
    ),
    sections: [
      {
        title: "Le montant horaire",
        paragraphs: [
          `Au 1er juin 2026, le Smic horaire brut est de ${formatEuro(smicReference.hourlyGross)}. Le net horaire indicatif publié est de ${formatEuro(smicReference.hourlyNetIndicative)}.`,
          "Ce taux horaire sert de minimum légal pour un salarié majeur, sauf cas particuliers prévus par les textes."
        ]
      },
      {
        title: "Passer de l'heure au mois",
        paragraphs: [
          "Pour un temps plein à 35 heures, le taux horaire est mensualisé sur environ 151,67 heures.",
          `Cela donne un Smic mensuel brut de ${formatEuro(smicReference.monthlyGross)}.`
        ]
      },
      {
        title: "Temps partiel et volume d'heures",
        paragraphs: [
          "À temps partiel, le salaire dépend du nombre d'heures réellement prévues au contrat.",
          "Il faut donc convertir le taux horaire avec le bon volume hebdomadaire, plutôt que reprendre directement le montant mensuel du temps plein."
        ]
      },
      {
        title: "Heures majorées",
        paragraphs: [
          "Les heures supplémentaires, le travail de nuit, le dimanche ou les jours fériés peuvent obéir à des règles de majoration.",
          "La page donne un repère de base. Les majorations doivent être vérifiées avec la convention collective ou l'accord applicable."
        ]
      },
      {
        title: "Pourquoi le net reste indicatif",
        paragraphs: [
          "Le net dépend des cotisations et de certaines situations de paie. Le montant officiel net est donc présenté comme indicatif.",
          "Sur votre fiche de paie, le prélèvement à la source peut aussi modifier le montant versé."
        ]
      }
    ],
    links: [commonLinks.smic, commonLinks.hourly, commonLinks.tool, commonLinks.tax],
    warningTopic: "le Smic horaire",
    faqTopic: "le Smic horaire brut en net"
  }),
  createGuidePage({
    slug: "smic-mensuel-net",
    title: "Smic mensuel net : montant estimé et points à vérifier",
    seoTitle: "Smic mensuel net 2026 : montant indicatif",
    description:
      "Consultez le Smic mensuel net indicatif au 1er juin 2026 et les points à vérifier sur une fiche de paie.",
    category: "Smic",
    excerpt: `Le Smic mensuel net indicatif est de ${formatEuro(smicReference.monthlyNetIndicative)} au 1er juin 2026 pour un temps plein de 35 heures.`,
    eyebrow: "Smic mensuel",
    summary:
      "Le Smic net mensuel donne un repère de revenu, mais la fiche de paie peut varier selon la situation réelle.",
    example: getSalarySeoExample(
      smicReference.monthlyGross,
      "monthly",
      "privateNonExecutive",
      0,
      "Estimation du Smic mensuel brut en net",
      "Projection indicative avec les taux simplifiés du simulateur."
    ),
    sections: [
      {
        title: "Le montant net indicatif",
        paragraphs: [
          `Au 1er juin 2026, le Smic mensuel net indicatif est de ${formatEuro(smicReference.monthlyNetIndicative)} pour 35 heures.`,
          `Le brut mensuel correspondant est de ${formatEuro(smicReference.monthlyGross)}.`
        ]
      },
      {
        title: "Pourquoi il peut varier",
        paragraphs: [
          "Le net peut changer selon les cotisations, les absences, certains avantages, le régime local ou les règles de paie.",
          "Le prélèvement à la source intervient ensuite si un taux d'impôt s'applique."
        ]
      },
      {
        title: "Temps plein et temps partiel",
        paragraphs: [
          "Le montant mensuel usuel correspond à un temps plein de 35 heures.",
          "Pour un temps partiel, il faut recalculer le salaire en fonction du nombre d'heures prévues."
        ]
      },
      {
        title: "Comparer une offre au Smic",
        paragraphs: [
          "Si une offre est proche du Smic, regardez le brut, le volume horaire, les primes et les éventuelles majorations.",
          "Une rémunération mensuelle peut sembler correcte tout en reposant sur un temps de travail différent."
        ]
      },
      {
        title: "Le réflexe de vérification",
        paragraphs: [
          "Les montants du Smic peuvent changer en cours d'année.",
          "Pour une vérification paie, utilisez toujours la date d'effet du salaire et les montants officiels en vigueur."
        ]
      }
    ],
    links: [commonLinks.smic, commonLinks.hourly, commonLinks.payslip, commonLinks.tax],
    warningTopic: "le Smic mensuel net",
    faqTopic: "le Smic mensuel net"
  }),
  createGuidePage({
    slug: "smic-annuel-brut-net",
    title: "Smic annuel brut en net : estimation sur 12 mois",
    seoTitle: "Smic annuel brut en net 2026 : estimation sur 12 mois",
    description:
      "Convertissez le Smic annuel brut en net indicatif sur 12 mois, avec les montants en vigueur au 1er juin 2026.",
    category: "Smic",
    excerpt: `Sur 12 mois, le Smic annuel brut est de ${formatEuro(smicReference.annualGross)} et le net annuel indicatif de ${formatEuro(smicReference.annualNetIndicative)}.`,
    eyebrow: "Smic annuel",
    summary:
      "Le Smic annuel est utile pour comparer une offre, mais il faut vérifier le rythme de versement et le temps de travail.",
    example: getSalarySeoExample(
      smicReference.annualGross,
      "annual",
      "privateNonExecutive",
      0,
      "Estimation du Smic annuel brut en net",
      "Projection sur 12 mois avec le calculateur brut/net."
    ),
    sections: [
      {
        title: "Le montant annuel",
        paragraphs: [
          `Le Smic annuel brut est de ${formatEuro(smicReference.annualGross)} au 1er juin 2026 sur une base de 35 heures.`,
          `Le net annuel indicatif publié est de ${formatEuro(smicReference.annualNetIndicative)}.`
        ]
      },
      {
        title: "Pourquoi raisonner sur 12 mois",
        paragraphs: [
          "L'annualisation permet de comparer une offre au Smic avec une rémunération exprimée en brut annuel.",
          "Elle reste une présentation théorique si le contrat prévoit des primes ou un rythme de versement particulier."
        ]
      },
      {
        title: "Mensuel, horaire et annuel",
        paragraphs: [
          "Les trois lectures doivent rester cohérentes : taux horaire, salaire mensuel et total annuel.",
          "Le simulateur permet de passer d'une période à l'autre sans refaire les calculs à la main."
        ]
      },
      {
        title: "À temps partiel",
        paragraphs: [
          "Un temps partiel au Smic ne donne pas le Smic mensuel temps plein.",
          "Il faut multiplier le taux horaire par le volume d'heures prévu, puis convertir en net indicatif."
        ]
      },
      {
        title: "À maintenir à jour",
        paragraphs: [
          "Les montants du Smic doivent être revérifiés après chaque revalorisation.",
          "C'est pour cela que les valeurs utilisées dans le site sont regroupées dans une configuration unique."
        ]
      }
    ],
    links: [commonLinks.smic, commonLinks.annual, commonLinks.hourly, commonLinks.tool],
    warningTopic: "le Smic annuel",
    faqTopic: "le Smic annuel brut en net"
  })
];

const conceptPagesConfig = [
  {
    slug: "net-a-payer-avant-impot",
    title: "Net à payer avant impôt : comprendre cette ligne de la fiche de paie",
    seoTitle: "Net à payer avant impôt : définition simple",
    description:
      "Comprenez la ligne net à payer avant impôt sur le bulletin de salaire et sa différence avec le montant versé.",
    topic: "le net à payer avant impôt",
    intro:
      "Le net à payer avant impôt correspond au salaire après cotisations, avant prélèvement à la source. C'est une ligne centrale pour comprendre votre paie.",
    sections: [
      "Ce que signifie cette ligne",
      "Pourquoi elle est mise en avant",
      "Différence avec le net versé",
      "Lien avec le prélèvement à la source",
      "Comment l'utiliser pour comparer un salaire"
    ]
  },
  {
    slug: "net-a-payer-apres-impot",
    title: "Net à payer après impôt : le montant réellement versé",
    seoTitle: "Net à payer après impôt : comprendre le montant versé",
    description:
      "Comprenez le net à payer après impôt, le prélèvement à la source et le montant réellement reçu sur votre compte.",
    topic: "le net à payer après impôt",
    intro:
      "Le net à payer après impôt est le montant qui arrive réellement sur votre compte bancaire, une fois le prélèvement à la source déduit.",
    sections: [
      "Le montant réellement versé",
      "Comment le prélèvement est retiré",
      "Pourquoi deux salariés peuvent recevoir un net différent",
      "Ce qu'il faut regarder sur la fiche de paie",
      "Utiliser ce montant pour son budget"
    ]
  },
  {
    slug: "prelevement-source-salaire",
    title: "Prélèvement à la source sur salaire : comment est-il calculé ?",
    seoTitle: "Prélèvement à la source sur salaire : calcul et fiche de paie",
    description:
      "Comprenez comment le prélèvement à la source est calculé sur un salaire et pourquoi il dépend du taux transmis par l'administration fiscale.",
    topic: "le prélèvement à la source sur salaire",
    intro:
      "Le prélèvement à la source est retenu par l'employeur sur la base du revenu imposable et du taux transmis par l'administration fiscale.",
    sections: [
      "Le rôle du taux de prélèvement",
      "La base utilisée sur la paie",
      "Taux personnalisé, individualisé ou neutre",
      "Pourquoi le prélèvement peut changer",
      "Estimer le net après impôt"
    ]
  },
  {
    slug: "cotisations-salariales",
    title: "Cotisations salariales : ce qui explique l'écart entre brut et net",
    seoTitle: "Cotisations salariales : comprendre l'écart brut/net",
    description:
      "Comprenez les cotisations salariales et leur rôle dans l'écart entre salaire brut et salaire net.",
    topic: "les cotisations salariales",
    intro:
      "Les cotisations salariales expliquent l'essentiel de l'écart entre le brut annoncé et le net avant impôt.",
    sections: [
      "Ce que financent les cotisations",
      "Pourquoi le taux varie selon le statut",
      "Cadre, non-cadre et fonction publique",
      "Ce qui peut modifier le net",
      "Lire les cotisations sans se perdre"
    ]
  },
  {
    slug: "fiche-de-paie-comprendre-brut-net",
    title: "Comprendre sa fiche de paie : brut, net, impôt et cotisations",
    seoTitle: "Comprendre sa fiche de paie : brut, net et impôt",
    description:
      "Apprenez à lire les lignes essentielles de la fiche de paie : brut, net avant impôt, net imposable, impôt et net versé.",
    topic: "la fiche de paie",
    intro:
      "Une fiche de paie devient plus lisible quand on repère les lignes qui comptent vraiment : brut, net avant impôt, net imposable et net versé.",
    sections: [
      "Le salaire brut",
      "Les cotisations salariales",
      "Le net à payer avant impôt",
      "Le net imposable et le prélèvement",
      "Les lignes à vérifier chaque mois"
    ]
  },
  {
    slug: "salaire-net-avant-impot",
    title: "Salaire net avant impôt : définition et calcul simple",
    seoTitle: "Salaire net avant impôt : définition et calcul",
    description:
      "Comprenez le salaire net avant impôt, son calcul à partir du brut et son intérêt pour comparer deux rémunérations.",
    topic: "le salaire net avant impôt",
    intro:
      "Le salaire net avant impôt est le montant après cotisations salariales, avant la retenue fiscale du prélèvement à la source.",
    sections: [
      "Définition simple",
      "Calcul à partir du brut",
      "Pourquoi c'est le bon repère de comparaison",
      "Différence avec le net après impôt",
      "Les limites de l'estimation"
    ]
  },
  {
    slug: "salaire-net-apres-impot",
    title: "Salaire net après impôt : comprendre le montant versé",
    seoTitle: "Salaire net après impôt : calcul et explication",
    description:
      "Comprenez le salaire net après impôt, son lien avec le prélèvement à la source et son impact sur votre budget mensuel.",
    topic: "le salaire net après impôt",
    intro:
      "Le salaire net après impôt est le montant restant après cotisations salariales et prélèvement à la source.",
    sections: [
      "Définition du net après impôt",
      "Comment le taux est appliqué",
      "Pourquoi il varie selon le foyer",
      "Comparer sans se tromper",
      "Anticiper son budget mensuel"
    ]
  },
  {
    slug: "salaire-brut-net-temps-partiel",
    title: "Salaire brut en net à temps partiel : méthode de calcul",
    seoTitle: "Salaire brut en net temps partiel : méthode simple",
    description:
      "Calculez un salaire brut en net à temps partiel en tenant compte du volume d'heures hebdomadaire.",
    topic: "un salaire brut en net à temps partiel",
    intro:
      "À temps partiel, le bon calcul consiste à partir du brut ou du taux horaire, puis à utiliser le nombre d'heures réellement prévu.",
    sections: [
      "Partir du bon volume d'heures",
      "Mensualiser le temps partiel",
      "Convertir le brut en net",
      "Attention aux heures complémentaires",
      "Comparer avec un temps plein"
    ]
  },
  {
    slug: "salaire-brut-net-35h",
    title: "Salaire brut en net sur 35h : calcul mensuel et horaire",
    seoTitle: "Salaire brut en net 35h : calcul mensuel et horaire",
    description:
      "Comprenez le calcul brut/net sur une base 35 heures, avec mensualisation à 151,67 heures environ.",
    topic: "un salaire brut en net sur 35 heures",
    intro:
      "Sur une base de 35 heures, la mensualisation utilisée en paie correspond à environ 151,67 heures par mois.",
    sections: [
      "La base de 35 heures",
      "La mensualisation des heures",
      "Du taux horaire au mensuel",
      "Du mensuel au annuel",
      "Ce qui change si les heures varient"
    ]
  },
  {
    slug: "convertir-salaire-annuel-mensuel",
    title: "Convertir un salaire annuel en mensuel : méthode simple",
    seoTitle: "Convertir salaire annuel en mensuel : méthode simple",
    description:
      "Convertissez un salaire annuel brut en salaire mensuel brut et net, avec les points à vérifier sur 12 ou 13 mois.",
    topic: "la conversion d'un salaire annuel en mensuel",
    intro:
      "Pour convertir un salaire annuel en mensuel, on divise d'abord le brut annuel par 12, puis on estime le net selon le statut.",
    sections: [
      "La formule la plus simple",
      "Le cas du 13e mois",
      "Passer ensuite du brut au net",
      "Comparer deux offres annuelles",
      "Les erreurs à éviter"
    ]
  }
] as const;

function createConceptPage(config: (typeof conceptPagesConfig)[number]): SalarySeoPage {
  const example = getSalarySeoExample(
    config.slug.includes("temps-partiel") ? 20 : 2500,
    config.slug.includes("temps-partiel") ? "hourly" : "monthly",
    "privateNonExecutive",
    5,
    "Exemple de lecture salaire",
    "Un exemple chiffré pour relier le brut, le net avant impôt et le net après impôt."
  );

  return makePage({
    slug: config.slug,
    title: config.title,
    seoTitle: config.seoTitle,
    description: config.description,
    excerpt: config.intro,
    category: "Fiche de paie",
    readingTime: "5 min",
    hero: {
      eyebrow: "Repère paie",
      summary: config.intro
    },
    sections: config.sections.map((title, index) => ({
      title,
      paragraphs: buildConceptParagraphs(config.topic, title, index)
    })),
    examples: [example],
    faq: faqFor(config.topic),
    internalLinks: [
      commonLinks.tool,
      commonLinks.tax,
      commonLinks.taxable,
      commonLinks.payslip,
      config.slug.includes("annuel") ? commonLinks.annual : commonLinks.hourly,
      config.slug.includes("temps-partiel") || config.slug.includes("35h")
        ? commonLinks.smic
        : commonLinks.executive
    ],
    cta: baseCta(config.topic),
    warning: warning(config.topic)
  });
}

function buildConceptParagraphs(topic: string, sectionTitle: string, index: number): string[] {
  const lower = sectionTitle.toLocaleLowerCase("fr-FR");

  if (lower.includes("définition") || lower.includes("signifie")) {
    return [
      `${sectionTitle} revient à poser une question simple : quel montant parle-t-on vraiment quand on lit ${topic} ?`,
      "En paie, deux lignes proches peuvent répondre à deux usages différents : comparer un salaire, payer l'impôt ou connaître le montant versé."
    ];
  }

  if (lower.includes("impôt") || lower.includes("prélèvement") || lower.includes("taux")) {
    return [
      "Le prélèvement à la source arrive après le calcul des cotisations sociales. Il dépend du taux fiscal transmis à l'employeur.",
      "C'est pour cela que le même salaire brut peut donner un montant versé différent selon les personnes."
    ];
  }

  if (lower.includes("heures") || lower.includes("mensualis")) {
    return [
      "La paie mensuelle transforme souvent un temps de travail hebdomadaire en volume moyen mensuel.",
      "Sur 35 heures, on retient environ 151,67 heures par mois. Pour un autre rythme, il faut adapter le calcul."
    ];
  }

  if (lower.includes("comparer") || lower.includes("erreurs")) {
    return [
      "Pour comparer proprement, gardez toujours la même base : brut annuel avec brut annuel, net mensuel avec net mensuel.",
      "Les primes, le 13e mois, les avantages et la mutuelle peuvent changer la lecture d'une offre."
    ];
  }

  if (lower.includes("cotisations") || lower.includes("brut")) {
    return [
      "Le brut est le montant de départ. Les cotisations salariales expliquent ensuite l'écart avec le net avant impôt.",
      "Le taux exact dépend du statut, du régime et des lignes de paie réellement appliquées."
    ];
  }

  return [
    `${sectionTitle} est un repère pratique pour comprendre ${topic} sans entrer dans tous les détails techniques de la paie.`,
    index % 2 === 0
      ? "L'objectif est de savoir quel montant utiliser pour décider, négocier ou vérifier une fiche de paie."
      : "Le simulateur permet ensuite de tester votre propre montant brut avec un résultat immédiatement lisible."
  ];
}

const conceptPages = conceptPagesConfig.map(createConceptPage);

function richFaq(topic: string): SalarySeoFaq[] {
  return [
    {
      question: `Quel montant faut-il regarder pour ${topic} ?`,
      answer:
        "Le bon montant dépend de votre besoin. Pour comparer une offre ou une augmentation, le brut annuel et le net avant impôt sont les repères les plus stables. Pour organiser votre budget mensuel, le net après impôt est plus concret, car il correspond au montant qui arrive réellement sur le compte bancaire."
    },
    {
      question: "Pourquoi le résultat reste-t-il une estimation ?",
      answer:
        "Une fiche de paie dépend de lignes que le simulateur ne peut pas toutes connaître : mutuelle, prévoyance, titres-restaurant, absences, heures supplémentaires, primes, convention collective, régime local ou avantages en nature. L'estimation donne un ordre de grandeur fiable pour se repérer, mais le bulletin de paie reste la référence finale."
    },
    {
      question: "Cadre et non-cadre donnent-ils toujours un net différent ?",
      answer:
        "À brut égal, le statut cadre peut produire un net légèrement plus bas dans une estimation simplifiée, car certaines cotisations sont différentes. L'écart réel dépend toutefois du paramétrage de paie, de la retraite complémentaire, de la prévoyance et des accords appliqués par l'entreprise."
    },
    {
      question: "Faut-il inclure le prélèvement à la source dans la comparaison ?",
      answer:
        "Pour comparer deux salaires, il vaut mieux raisonner en net avant impôt, car le taux de prélèvement dépend du foyer fiscal et non uniquement de l'employeur. Pour savoir ce qui restera chaque mois, ajoutez ensuite votre taux de prélèvement à la source afin d'obtenir un net après impôt indicatif."
    },
    {
      question: "Comment utiliser ces repères avant une rupture conventionnelle ?",
      answer:
        "Le salaire sert souvent de base à plusieurs calculs liés à la fin du contrat : indemnité minimale, négociation, projections chômage et budget de transition. Avant un échange RH, il est utile de clarifier le brut, le net avant impôt et les primes récurrentes pour éviter de discuter sur des montants incomparables."
    },
    {
      question: "Le salaire annuel doit-il être divisé par 12 ou par 13 ?",
      answer:
        "Pour comparer deux rémunérations annuelles, on raisonne d'abord sur le total brut annuel. Pour anticiper le versement mensuel, il faut ensuite vérifier le rythme réel : 12 mois, 13 mois, prime annuelle ou variable. Un même brut annuel peut donc produire un mois habituel différent selon l'entreprise."
    }
  ];
}

function salaryTableRows(example: SalarySeoExample): SalarySeoTableRow[] {
  return [
    {
      label: "Brut mensuel",
      value: example.grossMonthly,
      note: "Montant avant cotisations salariales, souvent utilisé dans le contrat ou l'offre."
    },
    {
      label: "Net avant impôt",
      value: example.netMonthly,
      note: "Montant après cotisations, utile pour comparer deux salaires."
    },
    {
      label: "Net après impôt",
      value: example.netAfterTaxMonthly ?? "À calculer selon votre taux",
      note: "Montant indicatif après prélèvement à la source si un taux est renseigné."
    },
    {
      label: "Brut annuel",
      value: example.grossAnnual,
      note: "Base fréquente des offres d'emploi et des négociations."
    },
    {
      label: "Net annuel",
      value: example.netAnnual,
      note: "Repère annuel avant impôt, hors primes non intégrées."
    }
  ];
}

function salarySchemaSteps(kind = "standard"): string[] {
  if (kind === "reverse") {
    return [
      "Salaire net souhaité",
      "Réintégration des cotisations estimées",
      "Salaire brut mensuel approché",
      "Salaire brut annuel sur 12 mois",
      "Vérification avec le statut et les primes"
    ];
  }

  if (kind === "tax") {
    return [
      "Salaire brut",
      "Cotisations salariales",
      "Salaire net avant impôt",
      "Prélèvement à la source",
      "Salaire net après impôt"
    ];
  }

  return [
    "Salaire brut",
    "Cotisations salariales",
    "Salaire net avant impôt",
    "Net imposable sur la fiche de paie",
    "Net versé après impôt"
  ];
}

const standardMistakes = [
  "Comparer un brut annuel avec un net mensuel sans les remettre sur la même période.",
  "Oublier le 13e mois, une prime variable ou une prime d'ancienneté dans le package global.",
  "Confondre net avant impôt, net imposable et net réellement versé sur le compte.",
  "Appliquer un taux brut/net unique sans tenir compte du statut cadre, non-cadre ou fonction publique.",
  "Décider uniquement sur le salaire mensuel sans regarder la mutuelle, les titres-restaurant et les horaires."
];

function makeRichGuidePage(config: {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  eyebrow: string;
  summary: string;
  immediateAnswer: string;
  exampleAmount: number;
  period?: SalaryPeriod;
  profile?: SalaryProfileKey;
  sections: SalarySeoSection[];
  links: SalarySeoInternalLink[];
  schemaKind?: string;
  category?: SalarySeoCategory;
}): SalarySeoPage {
  const example = getSalarySeoExample(
    config.exampleAmount,
    config.period ?? "monthly",
    config.profile ?? "privateNonExecutive",
    5,
    "Exemple chiffré",
    "Cas simple pour relier le brut, le net avant impôt et le net après impôt."
  );

  return makePage({
    slug: config.slug,
    title: config.title,
    seoTitle: config.seoTitle,
    description: config.description,
    excerpt: config.excerpt,
    category: config.category ?? "Guide salaire",
    readingTime: "7 min",
    hero: {
      eyebrow: config.eyebrow,
      summary: config.summary
    },
    immediateAnswer: config.immediateAnswer,
    sections: config.sections,
    examples: [example],
    tableRows: salaryTableRows(example),
    schemaSteps: salarySchemaSteps(config.schemaKind),
    mistakes: standardMistakes,
    faq: richFaq(config.title.toLocaleLowerCase("fr-FR")),
    internalLinks: [commonLinks.hub, commonLinks.tool, ...config.links].slice(0, 8),
    cta: baseCta(config.title.toLocaleLowerCase("fr-FR")),
    warning: warning(config.title.toLocaleLowerCase("fr-FR"))
  });
}

const requestedSalaryClusterPages: SalarySeoPage[] = [
  makeRichGuidePage({
    slug: "salaire",
    title: "Salaire : comprendre le brut, le net, l'impôt et le salaire annuel",
    seoTitle: "Salaire : guide complet brut, net, impôt et annuel",
    description:
      "Guide complet pour comprendre son salaire : brut, net, net imposable, prélèvement à la source, charges, temps partiel et salaire annuel.",
    excerpt:
      "Comprendre son salaire, c'est savoir passer du brut au net, distinguer le net avant impôt du net versé et lire une offre annuelle sans se tromper.",
    eyebrow: "Page pilier",
    summary:
      "Le salaire ne se résume pas au montant versé. Cette page sert de porte d'entrée vers tout le cluster salaire de RuptureConv.",
    immediateAnswer:
      "Le salaire brut est le montant avant cotisations. Le salaire net avant impôt est le montant après cotisations. Le net après impôt est le montant versé après prélèvement à la source. Pour comparer une offre, partez du brut annuel et du net avant impôt ; pour votre budget, regardez le net après impôt.",
    exampleAmount: 2500,
    sections: [
      {
        title: "Comprendre son salaire sans parler comme un bulletin de paie",
        paragraphs: [
          "La plupart des confusions viennent d'un vocabulaire trop proche : brut, net, net imposable, net à payer avant impôt, net versé. Pourtant chaque ligne répond à une question simple. Le brut dit combien l'employeur rémunère le poste avant retenues salariales. Le net avant impôt dit ce qu'il reste après cotisations. Le net après impôt dit ce qui arrive réellement sur votre compte.",
          "Cette distinction est utile dans des situations très concrètes : accepter une offre, négocier une augmentation, comparer un CDI avec un autre poste, préparer une rupture conventionnelle ou estimer une période de chômage. Une bonne lecture du salaire évite de surestimer un montant annoncé en brut ou de sous-estimer l'effet d'une prime."
        ]
      },
      {
        title: "Brut, net et cotisations : le mécanisme central",
        paragraphs: [
          "Le passage du brut au net repose principalement sur les cotisations salariales. Elles financent notamment une partie de la protection sociale et varient selon le statut, le régime et certaines lignes de paie. Pour un salarié du privé non-cadre, l'ordre de grandeur utilisé pour une estimation rapide tourne autour de 22 %. Pour un cadre, il peut être plus élevé.",
          "Ce taux n'est pas une vérité universelle. Deux salariés au même brut peuvent avoir un net différent à cause de la mutuelle, de la prévoyance, des titres-restaurant, d'une absence, d'heures supplémentaires ou d'une convention collective. C'est pourquoi le simulateur donne un repère immédiatement exploitable, pas une copie de fiche de paie."
        ]
      },
      {
        title: "Net avant impôt, net imposable et net après impôt",
        paragraphs: [
          "Le net avant impôt est souvent le meilleur montant pour comparer deux rémunérations, car il neutralise votre situation fiscale personnelle. Le net imposable, lui, sert à calculer l'impôt et peut être différent du net à payer. Le net après impôt correspond au montant versé après la retenue à la source.",
          "Dans la vraie vie, cette différence compte. Deux collègues au même salaire peuvent recevoir un montant différent après impôt si l'un a un taux personnalisé élevé et l'autre un taux neutre ou individualisé. Cela ne veut pas dire que l'employeur paie différemment : c'est l'impôt qui intervient après le salaire net."
        ]
      },
      {
        title: "Salaire mensuel, annuel et temps partiel",
        paragraphs: [
          "Les offres d'emploi sont souvent exprimées en brut annuel, tandis que les dépenses se pilotent au mois. La méthode simple consiste à diviser le brut annuel par 12, puis à convertir en net selon le statut. Mais il faut vérifier si la rémunération est versée sur 12 ou 13 mois, avec une part variable ou des primes conditionnelles.",
          "À temps partiel, la difficulté vient du volume d'heures. Un taux horaire brut doit être multiplié par les heures réellement prévues au contrat, puis converti en net. Un salarié à 24 heures par semaine et un salarié à 35 heures ne peuvent pas comparer uniquement un taux horaire sans regarder le volume mensuel."
        ]
      },
      {
        title: "Salaire et rupture conventionnelle",
        paragraphs: [
          "Le salaire est aussi une donnée clé lorsqu'un salarié prépare une rupture conventionnelle. Il sert à comprendre le niveau de vie avant départ, à vérifier les primes régulières et à construire une base de discussion pour l'indemnité. Un montant mal lu au départ peut fausser toute la négociation.",
          "Avant un entretien RH, le bon réflexe consiste à clarifier trois chiffres : le brut mensuel ou annuel, le net avant impôt et les éléments récurrents de rémunération. Ensuite, le simulateur de rupture conventionnelle peut aider à estimer une première base d'indemnité."
        ]
      }
    ],
    links: [
      commonLinks.difference,
      commonLinks.calculateNet,
      commonLinks.tax,
      commonLinks.taxAfter,
      commonLinks.termination,
      commonLinks.simulator
    ]
  }),
  makeRichGuidePage({
    slug: "difference-brut-net",
    title: "Différence brut net : comprendre l'écart sur votre salaire",
    seoTitle: "Différence brut net : explication simple et exemple",
    description:
      "Comprenez la différence entre salaire brut et salaire net, avec exemple chiffré, tableau, schéma, impôt à la source et erreurs fréquentes.",
    excerpt:
      "La différence brut/net correspond principalement aux cotisations salariales, puis au prélèvement à la source si l'on parle du net versé.",
    eyebrow: "Comprendre le salaire",
    summary:
      "La page pour ne plus confondre le montant annoncé dans une offre et le montant réellement disponible.",
    immediateAnswer:
      "Le salaire brut est le montant avant cotisations salariales. Le salaire net avant impôt est le montant après cotisations. Le net après impôt est le montant versé une fois le prélèvement à la source retiré. Exemple : 2 000 € brut non-cadre donnent environ 1 560 € net avant impôt.",
    exampleAmount: 2000,
    schemaKind: "tax",
    sections: [
      {
        title: "La différence en une idée simple",
        paragraphs: [
          "Le brut est le montant de départ. Le net est ce qu'il reste après les cotisations salariales. C'est pour cela qu'une offre à 2 000 € brut ne signifie pas 2 000 € sur le compte.",
          "Cette différence n'est pas une pénalité cachée. Elle correspond à des retenues sociales qui financent une partie des droits sociaux et des régimes de protection."
        ]
      },
      {
        title: "Pourquoi l'écart varie",
        paragraphs: [
          "L'écart brut/net varie selon le statut, le secteur, certaines cotisations et les lignes propres à la fiche de paie. Un cadre et un non-cadre peuvent donc avoir un net différent à brut égal.",
          "La mutuelle, la prévoyance, les titres-restaurant ou certaines absences peuvent ensuite modifier le montant réellement versé."
        ]
      },
      {
        title: "Ne pas mélanger impôt et cotisations",
        paragraphs: [
          "Les cotisations transforment le brut en net avant impôt. Le prélèvement à la source intervient ensuite, à partir d'un taux fiscal transmis par l'administration.",
          "Deux salariés au même brut peuvent donc avoir un net avant impôt proche, mais un net après impôt différent."
        ]
      },
      {
        title: "Le bon montant pour comparer",
        paragraphs: [
          "Pour comparer deux offres, utilisez le brut annuel et le net avant impôt. Ces repères évitent de mélanger une rémunération avec une situation fiscale personnelle.",
          "Pour votre budget, regardez ensuite le net après impôt, car c'est le montant qui arrivera réellement sur le compte bancaire."
        ]
      },
      {
        title: "Cas concret dans une négociation",
        paragraphs: [
          "Si un recruteur propose 30 000 € brut annuel, commencez par le ramener à 2 500 € brut mensuel, puis estimez le net selon votre statut.",
          "Vous pouvez alors poser des questions utiles : 13e mois, variable, prime garantie, mutuelle, forfait jours ou titres-restaurant."
        ]
      }
    ],
    links: [commonLinks.calculateNet, commonLinks.tax, commonLinks.taxAfter, commonLinks.annual, commonLinks.termination]
  }),
  makeRichGuidePage({
    slug: "calcul-salaire-net",
    title: "Calcul salaire net : méthode fiable pour partir du brut",
    seoTitle: "Calcul salaire net : formule, exemple et simulateur",
    description:
      "Calculez un salaire net à partir du brut avec une méthode claire, des exemples, un tableau récapitulatif et les erreurs à éviter.",
    excerpt:
      "Le calcul du salaire net consiste à retirer les cotisations salariales du brut, puis éventuellement le prélèvement à la source.",
    eyebrow: "Méthode de calcul",
    summary:
      "Une méthode pratique pour transformer un brut mensuel ou annuel en net exploitable dans votre budget.",
    immediateAnswer:
      "Pour calculer un salaire net, partez du brut, appliquez un taux indicatif de cotisations selon le statut, puis retirez le prélèvement à la source uniquement si vous voulez le net après impôt. Exemple : 2 500 € brut non-cadre donnent environ 1 950 € net avant impôt avec un taux indicatif de 22 %.",
    exampleAmount: 2500,
    sections: [
      {
        title: "La formule simple",
        paragraphs: [
          "La formule d'estimation est volontairement lisible : salaire brut - cotisations salariales estimées = salaire net avant impôt. Pour un salarié non-cadre du privé, un ordre de grandeur de 22 % permet d'obtenir une première réponse rapide. Pour un cadre, on retient souvent un taux plus élevé dans une estimation simplifiée.",
          "Cette formule n'a pas vocation à refaire toute la paie. Elle sert à répondre vite à une question concrète : le montant annoncé dans une offre correspond-il à mon budget réel ?"
        ]
      },
      {
        title: "Calculer depuis un brut mensuel",
        paragraphs: [
          "Lorsque le salaire est exprimé en brut mensuel, le calcul est direct. On applique le taux de cotisations au montant du mois, puis on obtient le net avant impôt. C'est le cas le plus fréquent pour vérifier une augmentation ou une promesse d'embauche.",
          "Si l'offre mentionne aussi des primes, ne les mélangez pas trop vite avec le fixe. Une prime exceptionnelle ne doit pas être traitée comme un salaire garanti tous les mois."
        ]
      },
      {
        title: "Calculer depuis un brut annuel",
        paragraphs: [
          "Quand le salaire est annoncé en brut annuel, divisez d'abord par 12 pour obtenir une base mensuelle comparable. Ensuite seulement, appliquez le taux de conversion brut/net. Cette étape évite de se laisser impressionner par un montant annuel qui semble élevé mais reste abstrait.",
          "Le cas du 13e mois mérite une vérification : le total annuel peut être identique, mais le montant habituel versé chaque mois peut être inférieur hors mois de prime."
        ]
      },
      {
        title: "Ajouter l'impôt à la source",
        paragraphs: [
          "Le prélèvement à la source ne transforme pas le brut en net. Il intervient après le net avant impôt. Si votre taux est de 5 %, il faut d'abord estimer le net avant impôt, puis appliquer ce taux pour obtenir le net après impôt.",
          "Pour comparer deux offres, gardez le net avant impôt. Pour savoir combien restera sur votre compte, regardez le net après impôt."
        ]
      },
      {
        title: "Utiliser le résultat intelligemment",
        paragraphs: [
          "Une estimation est utile si elle déclenche les bonnes questions : le salaire est-il sur 12 ou 13 mois ? La mutuelle est-elle chère ? Les primes sont-elles garanties ? Le statut cadre change-t-il la conversion ?",
          "C'est cette lecture qui rend le calcul réellement utile, notamment avant une négociation salariale ou une rupture conventionnelle."
        ]
      }
    ],
    links: [commonLinks.difference, commonLinks.tax, commonLinks.taxAfter, commonLinks.annual, commonLinks.termination]
  }),
  makeRichGuidePage({
    slug: "salaire-net-avant-impot",
    title: "Salaire net avant impôt : définition, calcul et bon usage",
    seoTitle: "Salaire net avant impôt : définition et calcul simple",
    description:
      "Comprenez le salaire net avant impôt, son calcul à partir du brut, sa différence avec le net après impôt et son rôle pour comparer un salaire.",
    excerpt:
      "Le net avant impôt est le salaire après cotisations salariales, avant retenue du prélèvement à la source.",
    eyebrow: "Fiche de paie",
    summary:
      "Le repère le plus propre pour comparer deux rémunérations sans intégrer votre fiscalité personnelle.",
    immediateAnswer:
      "Le salaire net avant impôt correspond au salaire brut après déduction des cotisations salariales, mais avant prélèvement à la source. C'est souvent le meilleur montant pour comparer une offre, car il ne dépend pas de votre taux d'impôt personnel.",
    exampleAmount: 2600,
    sections: [
      {
        title: "Définition du net avant impôt",
        paragraphs: [
          "Le net avant impôt apparaît sur la fiche de paie après les cotisations salariales. Il montre ce que produit le salaire avant intervention de l'impôt sur le revenu.",
          "Il ne faut pas le confondre avec le net payé, qui est le montant après prélèvement à la source."
        ]
      },
      {
        title: "Pourquoi c'est un bon repère",
        paragraphs: [
          "Le net avant impôt dépend du salaire et des cotisations, pas directement de la composition de votre foyer fiscal. Il permet donc de comparer deux offres plus proprement.",
          "C'est particulièrement utile lorsqu'un salarié hésite entre deux postes ou veut mesurer l'effet réel d'une augmentation."
        ]
      },
      {
        title: "Comment il est calculé",
        paragraphs: [
          "On part du brut, puis on retire les cotisations salariales. Dans une estimation rapide, on utilise un taux indicatif selon le statut : non-cadre, cadre ou fonction publique.",
          "Le taux exact dépend de la fiche de paie. Le simulateur donne un ordre de grandeur lisible avant vérification."
        ]
      },
      {
        title: "Différence avec le net imposable",
        paragraphs: [
          "Le net imposable sert à l'impôt. Il peut être différent du net avant impôt, notamment parce que certaines contributions ont un traitement fiscal particulier.",
          "Sur un bulletin, ces lignes proches ne doivent pas être mélangées : elles n'ont pas le même usage."
        ]
      },
      {
        title: "Quand l'utiliser",
        paragraphs: [
          "Utilisez le net avant impôt pour comparer un salaire, préparer une négociation ou comprendre une proposition RH.",
          "Utilisez ensuite le net après impôt pour votre budget personnel, car il tient compte de votre taux de prélèvement à la source."
        ]
      }
    ],
    links: [commonLinks.taxAfter, commonLinks.difference, commonLinks.calculateNet, commonLinks.taxable, commonLinks.termination]
  }),
  makeRichGuidePage({
    slug: "salaire-net-apres-impot",
    title: "Salaire net après impôt : calculer le montant vraiment versé",
    seoTitle: "Salaire net après impôt : calcul et exemple",
    description:
      "Comprenez le salaire net après impôt, le rôle du prélèvement à la source, les différences avec le net avant impôt et les erreurs à éviter.",
    excerpt:
      "Le net après impôt est le montant versé sur votre compte après cotisations salariales et prélèvement à la source.",
    eyebrow: "Prélèvement à la source",
    summary:
      "Le montant le plus concret pour votre budget mensuel, mais pas toujours le meilleur pour comparer deux offres.",
    immediateAnswer:
      "Le salaire net après impôt correspond au net avant impôt diminué du prélèvement à la source. Exemple : si votre net avant impôt est de 1 950 € et votre taux de prélèvement de 5 %, le net après impôt est d'environ 1 852,50 €.",
    exampleAmount: 2500,
    schemaKind: "tax",
    sections: [
      {
        title: "Définition du net après impôt",
        paragraphs: [
          "Le net après impôt est le montant réellement versé sur votre compte bancaire. Il arrive après deux étapes : les cotisations salariales puis le prélèvement à la source.",
          "C'est le chiffre le plus parlant pour payer un loyer, prévoir une mensualité ou organiser son budget."
        ]
      },
      {
        title: "Le rôle du taux de prélèvement",
        paragraphs: [
          "Le taux de prélèvement à la source est transmis par l'administration fiscale. Il peut être personnalisé, individualisé ou neutre selon votre choix et votre situation.",
          "Ce taux explique pourquoi deux salariés au même brut peuvent recevoir un montant différent après impôt."
        ]
      },
      {
        title: "Pourquoi ne pas comparer uniquement ce montant",
        paragraphs: [
          "Le net après impôt dépend du foyer fiscal. Il peut donc donner une image faussée si vous comparez deux offres ou deux collègues.",
          "Pour comparer la rémunération proposée par l'employeur, regardez d'abord le brut et le net avant impôt."
        ]
      },
      {
        title: "Exemple avec un taux de 5 %",
        paragraphs: [
          "Avec 2 500 € brut mensuel en non-cadre, l'estimation donne environ 1 950 € net avant impôt. Un taux de 5 % retire ensuite environ 97,50 €.",
          "Le net après impôt estimé serait donc d'environ 1 852,50 € dans ce cas simplifié."
        ]
      },
      {
        title: "Que faire si le taux change",
        paragraphs: [
          "Un changement de taux peut modifier le montant versé sans changement de salaire brut. Cela arrive après une déclaration, une actualisation ou un changement de situation.",
          "Si votre net après impôt varie, vérifiez d'abord la ligne de prélèvement à la source avant de conclure à une erreur de salaire."
        ]
      }
    ],
    links: [commonLinks.tax, commonLinks.difference, commonLinks.calculateNet, commonLinks.taxable, commonLinks.annual]
  }),
  makeRichGuidePage({
    slug: "salaire-annuel-brut-net",
    title: "Salaire annuel brut en net : convertir une offre en montant mensuel",
    seoTitle: "Salaire annuel brut en net : calcul mensuel et exemple",
    description:
      "Convertissez un salaire annuel brut en net mensuel, avec méthode sur 12 mois, exemples cadre/non-cadre et erreurs fréquentes.",
    excerpt:
      "Un salaire annuel brut devient utile quand on le transforme en brut mensuel puis en net avant impôt.",
    eyebrow: "Salaire annuel",
    summary:
      "La page pour lire correctement une offre d'emploi exprimée en brut annuel.",
    immediateAnswer:
      "Pour convertir un salaire annuel brut en net, divisez le brut annuel par 12, puis retirez les cotisations salariales estimées selon le statut. Exemple : 36 000 € brut annuel correspondent à 3 000 € brut mensuel, soit environ 2 340 € net mensuel avant impôt en non-cadre.",
    exampleAmount: 36000,
    period: "annual",
    sections: [
      {
        title: "Pourquoi les offres parlent en brut annuel",
        paragraphs: [
          "Le brut annuel permet aux entreprises de présenter une rémunération globale : fixe, parfois 13e mois, et comparaison plus simple entre candidats. C'est le langage naturel du recrutement et de la négociation.",
          "Pour le salarié, le besoin est différent. Le loyer, les charges et l'épargne se pilotent au mois. Il faut donc traduire l'annuel en mensuel, puis le brut en net."
        ]
      },
      {
        title: "La méthode sur 12 mois",
        paragraphs: [
          "La méthode la plus lisible consiste à diviser le brut annuel par 12. Un salaire de 36 000 € brut annuel donne 3 000 € brut mensuel. On applique ensuite le taux de cotisations du statut choisi.",
          "Cette méthode donne une base comparable, mais elle doit être ajustée si le contrat prévoit un 13e mois, une prime semestrielle ou une part variable importante."
        ]
      },
      {
        title: "Cadre ou non-cadre",
        paragraphs: [
          "À salaire annuel identique, l'estimation cadre peut donner un net légèrement inférieur à l'estimation non-cadre. Cette différence vient de cotisations indicatives différentes.",
          "L'écart n'est pas le seul critère de décision. Un statut cadre peut aussi s'accompagner d'un forfait jours, d'une prévoyance différente, d'une autonomie plus forte ou d'une part variable."
        ]
      },
      {
        title: "Le piège du 13e mois",
        paragraphs: [
          "Un salaire annuel de 39 000 € sur 13 mois ne produit pas le même versement habituel qu'un salaire de 39 000 € sur 12 mois. Le total annuel est comparable, mais la trésorerie mensuelle change.",
          "Avant d'accepter une offre, demandez comment le salaire est versé : 12 mensualités égales, 13e mois, prime de vacances, variable garanti ou variable conditionnel."
        ]
      },
      {
        title: "Lien avec chômage et rupture conventionnelle",
        paragraphs: [
          "Le salaire annuel aide aussi à reconstituer une rémunération de référence. C'est utile lorsque l'on prépare une rupture conventionnelle, une négociation ou une projection de revenus après la fin du contrat.",
          "Conservez les bulletins de paie et les informations sur les primes : ils seront plus fiables qu'une simple moyenne mentale."
        ]
      }
    ],
    links: [commonLinks.calculateNet, commonLinks.tax, commonLinks.termination, commonLinks.simulator, commonLinks.unemployment]
  }),
  makeRichGuidePage({
    slug: "salaire-annuel-net-brut",
    title: "Salaire annuel net en brut : estimer le brut à partir du net",
    seoTitle: "Salaire annuel net en brut : calcul inverse et exemple",
    description:
      "Estimez un salaire annuel brut à partir d'un objectif net, avec méthode de calcul inverse, tableau et limites à connaître.",
    excerpt:
      "Le calcul net vers brut permet de traduire un objectif de revenu en montant brut à négocier.",
    eyebrow: "Calcul inverse",
    summary:
      "Utile quand vous savez ce que vous voulez toucher et devez formuler une demande en brut.",
    immediateAnswer:
      "Pour estimer un brut à partir d'un net, divisez le net souhaité par le pourcentage restant après cotisations. Avec un taux indicatif non-cadre de 22 %, 30 000 € net annuel avant impôt correspondent à environ 38 462 € brut annuel.",
    exampleAmount: 38462,
    period: "annual",
    schemaKind: "reverse",
    sections: [
      {
        title: "Pourquoi raisonner du net vers le brut",
        paragraphs: [
          "En entretien, l'employeur parle presque toujours en brut annuel. Le salarié, lui, pense souvent en net mensuel ou annuel, parce que c'est le montant qui finance la vie quotidienne.",
          "Le calcul inverse sert à faire le pont entre ces deux langages. Il permet de transformer un objectif de revenu en demande salariale compréhensible par un recruteur ou un service RH."
        ]
      },
      {
        title: "La formule inverse",
        paragraphs: [
          "Si le taux de cotisations estimé est de 22 %, le net avant impôt représente environ 78 % du brut. Pour retrouver le brut, on divise donc le net par 0,78. Cette méthode reste indicative, mais elle évite une demande formulée au hasard.",
          "Pour un cadre, le diviseur peut être plus proche de 0,75 dans une estimation rapide. Le brut nécessaire sera donc plus élevé pour atteindre le même net avant impôt."
        ]
      },
      {
        title: "Ne pas confondre objectif net et net après impôt",
        paragraphs: [
          "Si votre objectif est un montant réellement versé après impôt, il faut intégrer le prélèvement à la source en plus des cotisations. C'est plus personnel, car votre taux dépend du foyer fiscal.",
          "Dans une négociation, il est généralement plus clair de viser un net avant impôt puis de traduire en brut annuel."
        ]
      },
      {
        title: "Exemple de demande salariale",
        paragraphs: [
          "Une personne qui souhaite environ 2 500 € net avant impôt par mois vise 30 000 € net annuel. En non-cadre, l'ordre de grandeur brut est d'environ 38 500 € brut annuel.",
          "Cette demande peut ensuite être ajustée selon le marché, le niveau d'expérience, les primes et les avantages."
        ]
      },
      {
        title: "Les limites à garder en tête",
        paragraphs: [
          "Le calcul inverse amplifie les imprécisions. Une mutuelle coûteuse, un statut différent ou une prime non garantie peuvent modifier le résultat final.",
          "Utilisez-le comme base de discussion, puis vérifiez avec une simulation plus détaillée lorsque l'offre devient concrète."
        ]
      }
    ],
    links: [commonLinks.annual, commonLinks.calculateNet, commonLinks.difference, commonLinks.tax, commonLinks.termination]
  }),
  makeRichGuidePage({
    slug: "comment-calculer-son-salaire-net",
    title: "Comment calculer son salaire net sans se tromper ?",
    seoTitle: "Comment calculer son salaire net : étapes et exemple",
    description:
      "Comprenez comment calculer votre salaire net étape par étape, du brut au net après impôt, avec exemples et erreurs fréquentes.",
    excerpt:
      "Calculer son salaire net demande surtout de partir du bon brut, de choisir le bon statut et de distinguer avant et après impôt.",
    eyebrow: "Mode d'emploi",
    summary:
      "Une approche pas à pas pour les salariés qui veulent vérifier une offre ou une fiche de paie.",
    immediateAnswer:
      "Pour calculer votre salaire net, identifiez d'abord si le montant est horaire, mensuel ou annuel. Convertissez-le en base mensuelle, retirez les cotisations salariales estimées, puis appliquez votre taux de prélèvement à la source seulement si vous cherchez le net après impôt.",
    exampleAmount: 2800,
    sections: [
      {
        title: "Étape 1 : identifier le bon brut",
        paragraphs: [
          "Le calcul échoue souvent dès le départ parce que le montant utilisé n'est pas le bon. Une offre peut parler en brut annuel, un contrat en brut mensuel, et une annonce en taux horaire.",
          "Avant toute conversion, notez la période exacte et le volume de travail. Un salaire à temps partiel ou un forfait jours ne se lit pas comme un temps plein classique."
        ]
      },
      {
        title: "Étape 2 : choisir le statut",
        paragraphs: [
          "Le statut influence le taux de conversion. Non-cadre, cadre et fonction publique n'ont pas les mêmes ordres de grandeur de cotisations.",
          "Si vous hésitez, faites deux simulations. Cela vous donnera une fourchette prudente et vous évitera de retenir un net trop optimiste."
        ]
      },
      {
        title: "Étape 3 : convertir en net avant impôt",
        paragraphs: [
          "Le net avant impôt est obtenu après déduction des cotisations salariales. C'est le chiffre le plus propre pour comparer deux propositions, car il ne dépend pas de votre foyer fiscal.",
          "Sur un brut de 2 800 € en non-cadre, le net avant impôt estimé tourne autour de 2 184 € avec un taux indicatif de 22 %."
        ]
      },
      {
        title: "Étape 4 : estimer le net après impôt",
        paragraphs: [
          "Si vous connaissez votre taux de prélèvement à la source, appliquez-le au net avant impôt pour estimer le montant versé. Un taux de 5 % retire environ 5 % du net avant impôt.",
          "Si vous ne connaissez pas votre taux, gardez le net avant impôt comme repère de comparaison et vérifiez ensuite votre espace fiscal."
        ]
      },
      {
        title: "Étape 5 : confronter avec la fiche de paie",
        paragraphs: [
          "Quand le premier bulletin arrive, comparez l'estimation avec les lignes réelles : mutuelle, titres-restaurant, impôt, primes et absences.",
          "Un écart n'est pas forcément une erreur. Il signale souvent une ligne de paie que le calcul simplifié ne pouvait pas anticiper."
        ]
      }
    ],
    links: [commonLinks.calculateNet, commonLinks.difference, commonLinks.tax, commonLinks.payslip, commonLinks.simulator]
  }),
  makeRichGuidePage({
    slug: "que-signifie-salaire-brut",
    title: "Que signifie salaire brut ? Définition claire et exemples",
    seoTitle: "Que signifie salaire brut : définition et différence avec net",
    description:
      "Comprenez ce que signifie le salaire brut, pourquoi il figure dans les contrats et comment le convertir en salaire net.",
    excerpt:
      "Le salaire brut est le montant avant cotisations salariales. Il sert de base au contrat, aux droits sociaux et aux comparaisons.",
    eyebrow: "Définition",
    summary:
      "La définition simple du salaire brut, avec les pièges à éviter quand on lit une offre.",
    immediateAnswer:
      "Le salaire brut signifie le montant de rémunération avant déduction des cotisations salariales. Ce n'est pas le montant versé sur votre compte. Il sert de base au contrat de travail, aux cotisations, à certaines indemnités et à la comparaison des offres.",
    exampleAmount: 2200,
    sections: [
      {
        title: "Le brut est le montant de départ",
        paragraphs: [
          "Quand une entreprise annonce un salaire, elle parle généralement en brut. Ce montant inclut la part qui sera ensuite retenue au titre des cotisations salariales.",
          "Le brut est donc plus élevé que le net. Il n'est pas moins réel : il sert à financer des droits et à construire la paie."
        ]
      },
      {
        title: "Pourquoi le contrat parle en brut",
        paragraphs: [
          "Le brut est une base commune. Il ne dépend pas de votre taux d'impôt personnel et il permet à l'employeur de formuler une rémunération contractuelle stable.",
          "C'est aussi une base utilisée pour de nombreux calculs : primes, maintien de salaire, indemnités ou comparaisons de rémunération."
        ]
      },
      {
        title: "Ce qui est retiré du brut",
        paragraphs: [
          "Les cotisations salariales expliquent l'essentiel de l'écart entre brut et net. Selon le statut, elles peuvent représenter un ordre de grandeur différent.",
          "Certaines retenues comme la mutuelle ou les titres-restaurant peuvent aussi influencer le montant final visible sur la fiche de paie."
        ]
      },
      {
        title: "Exemple concret",
        paragraphs: [
          "Si une offre indique 2 200 € brut mensuel, cela ne signifie pas 2 200 € versés. En non-cadre, l'estimation du net avant impôt tourne autour de 1 716 € avec un taux indicatif de 22 %.",
          "Le montant après impôt dépendra ensuite de votre taux de prélèvement à la source."
        ]
      },
      {
        title: "Quand le brut devient essentiel",
        paragraphs: [
          "Le brut est indispensable pour comparer deux offres, demander une augmentation ou préparer une rupture conventionnelle.",
          "Même si le net parle davantage au quotidien, le brut reste la langue commune de la paie et du droit du travail."
        ]
      }
    ],
    links: [commonLinks.difference, commonLinks.calculateNet, commonLinks.tax, commonLinks.termination, commonLinks.simulator]
  }),
  makeRichGuidePage({
    slug: "que-signifie-salaire-net",
    title: "Que signifie salaire net ? Définition, impôt et fiche de paie",
    seoTitle: "Que signifie salaire net : avant impôt, après impôt",
    description:
      "Comprenez ce que signifie le salaire net, la différence entre net avant impôt et net après impôt, avec exemples simples.",
    excerpt:
      "Le salaire net est le montant après cotisations salariales. Il peut être présenté avant ou après prélèvement à la source.",
    eyebrow: "Définition",
    summary:
      "Le salaire net paraît simple, mais il existe plusieurs lignes nettes sur une fiche de paie.",
    immediateAnswer:
      "Le salaire net signifie le montant restant après déduction des cotisations salariales. Le net avant impôt sert à comparer les salaires. Le net après impôt correspond au montant versé après prélèvement à la source.",
    exampleAmount: 2400,
    schemaKind: "tax",
    sections: [
      {
        title: "Le net n'est pas toujours le montant versé",
        paragraphs: [
          "Avant le prélèvement à la source, beaucoup de salariés associaient le net au montant reçu. Aujourd'hui, il faut distinguer le net avant impôt et le net après impôt.",
          "Le net avant impôt est calculé après les cotisations salariales. Le net après impôt retire en plus la retenue fiscale."
        ]
      },
      {
        title: "Pourquoi le net avant impôt est utile",
        paragraphs: [
          "Le net avant impôt permet de comparer deux salaires sans mélanger votre situation fiscale personnelle. C'est le repère le plus juste pour lire une offre ou une augmentation.",
          "Deux salariés au même brut peuvent avoir le même net avant impôt, mais pas le même net versé si leurs taux fiscaux diffèrent."
        ]
      },
      {
        title: "Le net après impôt pour le budget",
        paragraphs: [
          "Le net après impôt est le montant le plus concret pour organiser ses dépenses. C'est celui qui arrive sur le compte bancaire après prélèvement à la source.",
          "Il peut varier si votre taux change en cours d'année, par exemple après une déclaration de revenus ou une mise à jour de votre situation."
        ]
      },
      {
        title: "Net imposable : une autre ligne à ne pas confondre",
        paragraphs: [
          "Le net imposable sert de base fiscale. Il peut être différent du net avant impôt, notamment à cause du traitement de certaines contributions.",
          "Sur une fiche de paie, prenez le temps de repérer ces trois lignes : net avant impôt, net imposable, net payé."
        ]
      },
      {
        title: "Exemple simple",
        paragraphs: [
          "Avec 2 400 € brut mensuel en non-cadre, l'estimation donne environ 1 872 € net avant impôt. Avec un taux de prélèvement de 5 %, le net après impôt serait inférieur.",
          "Ce type de calcul suffit souvent pour comprendre rapidement une offre, avant de vérifier le bulletin réel."
        ]
      }
    ],
    links: [commonLinks.tax, commonLinks.taxAfter, commonLinks.taxable, commonLinks.difference, commonLinks.calculateNet]
  })
];

function createRequestedAmountPage(amount: number): SalarySeoPage {
  const nonExecutive = getSalarySeoExample(
    amount,
    "monthly",
    "privateNonExecutive",
    5,
    `${formatEuro(amount, true)} brut en non-cadre`,
    "Estimation avant impôt pour un salarié du privé non-cadre."
  );
  const executive = getSalarySeoExample(
    amount,
    "monthly",
    "privateExecutive",
    5,
    `${formatEuro(amount, true)} brut en cadre`,
    "Estimation avant impôt pour un salarié du privé cadre."
  );
  const context =
    amount < 2200
      ? "un salaire proche du bas de grille ou d'une première expérience"
      : amount < 3500
        ? "une rémunération courante lors d'une progression ou d'un changement de poste"
        : "un salaire souvent associé à un profil confirmé, cadre ou spécialisé";

  return makePage({
    slug: `salaire-brut-net-${amount}`,
    title: `${formatEuro(amount, true)} brut en net : calcul mensuel, annuel, cadre et non-cadre`,
    seoTitle: `${formatEuro(amount, true)} brut en net : salaire net estimé`,
    description: `Calculez ${formatEuro(amount, true)} brut en net mensuel et annuel, avec estimation cadre, non-cadre, prélèvement à la source et tableau détaillé.`,
    excerpt: `${formatEuro(amount, true)} brut par mois représente environ ${nonExecutive.netMonthly} net avant impôt en non-cadre et ${executive.netMonthly} en cadre, selon les taux indicatifs utilisés.`,
    category: "Montant mensuel",
    readingTime: "6 min",
    hero: {
      eyebrow: "Conversion brut/net",
      summary: `Un repère chiffré pour situer ${formatEuro(amount, true)} brut dans votre budget mensuel et annuel.`
    },
    immediateAnswer: `Avec ${formatEuro(amount, true)} brut mensuel, le net avant impôt est estimé à ${nonExecutive.netMonthly} pour un salarié non-cadre et à ${executive.netMonthly} pour un cadre. Après un prélèvement à la source indicatif de 5 %, le non-cadre recevrait environ ${nonExecutive.netAfterTaxMonthly} par mois.`,
    sections: [
      {
        title: `${formatEuro(amount, true)} brut en net : le calcul rapide`,
        paragraphs: [
          `Pour convertir ${formatEuro(amount, true)} brut en net, on retire les cotisations salariales estimées. En non-cadre, le taux indicatif utilisé est de 22 %, ce qui donne ${nonExecutive.netMonthly} net avant impôt.`,
          `En cadre, l'estimation retient un taux de 25 %, soit environ ${executive.netMonthly} net avant impôt. L'écart vient du statut et des cotisations associées dans cette méthode simplifiée.`
        ]
      },
      {
        title: "Ce que cela représente sur l'année",
        paragraphs: [
          `${formatEuro(amount, true)} brut mensuel correspond à ${nonExecutive.grossAnnual} brut annuel sur 12 mois. En non-cadre, cela donne environ ${nonExecutive.netAnnual} net annuel avant impôt.`,
          "Si votre entreprise verse un 13e mois, le total annuel peut rester proche, mais le montant habituel reçu chaque mois sera réparti différemment."
        ]
      },
      {
        title: "Net avant impôt et net après impôt",
        paragraphs: [
          `Le net avant impôt de référence est ${nonExecutive.netMonthly} en non-cadre. Avec un taux de prélèvement à la source de 5 %, le net après impôt estimé est ${nonExecutive.netAfterTaxMonthly}.`,
          "Votre taux réel peut être plus bas ou plus haut. Il dépend de votre foyer fiscal, pas uniquement de ce salaire."
        ]
      },
      {
        title: "Comment interpréter ce niveau de salaire",
        paragraphs: [
          `À ${formatEuro(amount, true)} brut, on se situe généralement dans ${context}. Le montant net aide à juger le budget, mais il ne dit pas tout du poste.`,
          "Regardez aussi les horaires, les primes, le télétravail, la mutuelle, les tickets restaurant, le variable et les perspectives d'évolution."
        ]
      },
      {
        title: "Avant une négociation ou une rupture conventionnelle",
        paragraphs: [
          "Ce montant peut servir de repère pour discuter d'une augmentation, comparer une offre ou préparer une fin de contrat.",
          "En rupture conventionnelle, gardez le brut et les primes récurrentes sous la main : ils peuvent aider à mieux comprendre la rémunération de référence."
        ]
      }
    ],
    examples: [nonExecutive, executive],
    tableRows: salaryTableRows(nonExecutive),
    schemaSteps: salarySchemaSteps("tax"),
    mistakes: [
      `Penser que ${formatEuro(amount, true)} brut correspond au montant versé sur le compte.`,
      "Oublier que le statut cadre peut modifier le net à brut égal.",
      "Comparer ce montant avec une offre annuelle sans vérifier le rythme de versement.",
      "Négliger le prélèvement à la source dans le budget mensuel.",
      "Ignorer les primes et avantages qui peuvent changer l'intérêt réel du package."
    ],
    faq: [
      {
        question: `${formatEuro(amount, true)} brut correspond à combien en net ?`,
        answer: `${formatEuro(amount, true)} brut mensuel correspond à environ ${nonExecutive.netMonthly} net avant impôt pour un salarié non-cadre du privé. Pour un cadre, l'estimation est d'environ ${executive.netMonthly}.`
      },
      {
        question: `${formatEuro(amount, true)} brut fait combien par an ?`,
        answer: `Sur 12 mois, ${formatEuro(amount, true)} brut mensuel représente ${nonExecutive.grossAnnual} brut annuel. Le net annuel avant impôt est estimé à ${nonExecutive.netAnnual} en non-cadre.`
      },
      {
        question: "Quel est le net après impôt avec 5 % de prélèvement ?",
        answer: `Avec un taux indicatif de prélèvement à la source de 5 %, le net après impôt serait d'environ ${nonExecutive.netAfterTaxMonthly} par mois en non-cadre. Votre montant réel dépend de votre taux personnel.`
      },
      {
        question: "Pourquoi le cadre touche-t-il moins en net dans l'estimation ?",
        answer:
          "Le profil cadre applique un taux indicatif de cotisations plus élevé. Cela reflète certaines différences possibles de retraite complémentaire et de prévoyance, même si la fiche de paie réelle peut varier."
      },
      {
        question: "Ce calcul tient-il compte des primes ?",
        answer:
          "Non, le calcul part du salaire brut mensuel indiqué. Les primes régulières, le 13e mois ou le variable doivent être ajoutés séparément pour comparer le package annuel complet."
      },
      {
        question: "Puis-je utiliser ce montant pour préparer une rupture conventionnelle ?",
        answer:
          "Oui comme repère de rémunération, mais l'indemnité de rupture dépend d'une méthode spécifique, de l'ancienneté et parfois des primes. Utilisez ensuite le simulateur dédié pour estimer l'indemnité."
      }
    ],
    internalLinks: [
      commonLinks.hub,
      commonLinks.tool,
      commonLinks.difference,
      commonLinks.calculateNet,
      commonLinks.tax,
      amount >= 3000 ? commonLinks.termination : commonLinks.annual,
      commonLinks.simulator
    ],
    cta: baseCta(`${formatEuro(amount, true)} brut en net`),
    warning: warning(`${formatEuro(amount, true)} brut en net`)
  });
}

const requestedAmountPages = [1800, 2000, 2200, 2500, 3000, 3500, 4000, 4500, 5000].map(
  createRequestedAmountPage
);

function uniqueSalaryPages(pages: SalarySeoPage[]): SalarySeoPage[] {
  return Array.from(new Map(pages.map((page) => [page.slug, page])).values());
}

export const salarySeoPages: SalarySeoPage[] = [
  ...uniqueSalaryPages([
    ...guidePages,
    ...monthlyAmountPages,
    ...annualPages,
    ...smicPages,
    ...conceptPages,
    ...requestedSalaryClusterPages,
    ...requestedAmountPages
  ])
];

export const salarySeoPageBySlug: Record<string, SalarySeoPage> =
  Object.fromEntries(salarySeoPages.map((page) => [page.slug, page]));
