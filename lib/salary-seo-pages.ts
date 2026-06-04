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
  sections: SalarySeoSection[];
  examples: SalarySeoExample[];
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
  tool: {
    href: "/salaire-brut-net",
    label: "Simulateur salaire brut/net",
    description: "Affiner le calcul avec votre statut, vos heures et votre taux d'impôt."
  },
  annual: {
    href: "/salaire-annuel-brut-en-net",
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
    href: "/net-avant-impot-net-apres-impot",
    label: "Net avant impôt ou après impôt",
    description: "Distinguer le salaire net de la retenue à la source."
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

export const salarySeoPages: SalarySeoPage[] = [
  ...guidePages,
  ...monthlyAmountPages,
  ...annualPages,
  ...smicPages,
  ...conceptPages
];

export const salarySeoPageBySlug: Record<string, SalarySeoPage> =
  Object.fromEntries(salarySeoPages.map((page) => [page.slug, page]));
