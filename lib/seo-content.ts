import { siteName, siteUrl } from "@/lib/site";
import { editorialArticlePages } from "@/lib/editorial-article-pages";

export type FaqEntry = {
  question: string;
  answer: string;
};

export type SeoSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  boxedText?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type PillarPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  updatedAt?: string;
  updatedLabel?: string;
  intro: string[];
  sections: SeoSection[];
  faq: FaqEntry[];
  conclusion: string[];
  relatedLinks: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  intro: string[];
  sections: SeoSection[];
  faq: FaqEntry[];
  relatedPillars: string[];
};

export const mandatoryDisclaimer =
  "Ce simulateur fournit une estimation indicative et ne remplace pas un conseil juridique personnalisé.";

export const reform2026Disclaimer =
  "Réforme 2026 : le minimum légal dû au salarié n'est pas réduit. Le coût employeur augmente avec la contribution patronale spécifique portée à 40 % sur la part de l'indemnité exonérée de cotisations sociales.";

export const reform2026MainPath = "/reforme-rupture-conventionnelle-2026";

const reform2026Links = [
  "/reforme-rupture-conventionnelle-2026",
  "/rupture-conventionnelle-chomage-2026",
  "/rupture-conventionnelle-senior-55-ans-2026",
  "/rupture-conventionnelle-employeur-cout-2026",
  "/rupture-conventionnelle-avant-apres-reforme-2026"
];

const reform2026RelatedLinks = [
  "/simulateur-rupture-conventionnelle",
  "/rupture-conventionnelle-chomage",
  "/indemnite-legale-rupture-conventionnelle",
  "/modele-lettre-rupture-conventionnelle",
  ...reform2026Links
];

const reformSourceBullets = [
  "Assemblée nationale : dossier législatif du projet de loi adopté sans modification en deuxième lecture le 2 juin 2026.",
  "Sénat : dossier législatif et rapports sur le projet de loi de transposition de l'avenant n°3 du 25 février 2026.",
  "Conseil d'État : avis du 19 mars 2026 sur le projet de loi et la base légale de la modulation.",
  "Service-Public.fr : rappel que la rupture conventionnelle permet toujours, sous conditions, une indemnisation France Travail et que l'indemnité minimale reste due.",
  "Service-Public.fr : contribution patronale spécifique portée à 40 % sur la part exonérée de cotisations sociales."
];

const reform2026Faq: FaqEntry[] = [
  {
    question: "La rupture conventionnelle donne-t-elle encore droit au chômage en 2026 ?",
    answer:
      "Oui, elle continue de pouvoir ouvrir droit au chômage si les conditions habituelles sont remplies. La réforme 2026 porte surtout sur la durée maximale d'indemnisation, pas sur la disparition du droit."
  },
  {
    question: "La réforme supprime-t-elle l'indemnité de rupture conventionnelle ?",
    answer:
      "Non. L'indemnité spécifique de rupture conventionnelle reste due et ne peut pas être inférieure au minimum légal ou conventionnel applicable."
  },
  {
    question: "Qu'est-ce qui change pour la rupture conventionnelle en 2026 ?",
    answer:
      "La réforme 2026 augmente la contribution patronale due par l'employeur. Elle passe de 30 % à 40 % sur la part de l'indemnité exonérée de cotisations sociales. Le montant minimum dû au salarié n'est pas diminué par cette réforme."
  },
  {
    question: "Qu'est-ce qui change pour les moins de 55 ans ?",
    answer:
      "La durée maximale d'indemnisation chômage après une rupture conventionnelle individuelle serait réduite à 15 mois en métropole, contre 18 mois auparavant, sous réserve des textes définitivement applicables."
  },
  {
    question: "Qu'est-ce qui change pour les salariés de 55 ans et plus ?",
    answer:
      "La durée maximale serait réduite à 20,5 mois pour les salariés seniors concernés, avec une vérification nécessaire selon l'âge exact, la date de fin de contrat et les textes d'agrément."
  },
  {
    question: "La réforme concerne-t-elle le montant de l'ARE ?",
    answer:
      "Les informations disponibles visent principalement la durée maximale d'indemnisation. Le montant de l'allocation dépend toujours des règles France Travail et de la situation individuelle."
  },
  {
    question: "Les règles sont-elles déjà applicables ?",
    answer:
      "Le Parlement a adopté le texte le 2 juin 2026, mais il faut rester prudent sur l'entrée en vigueur concrète : publication au Journal officiel, agrément et textes d'application doivent être vérifiés."
  },
  {
    question: "Que doit vérifier un employeur en 2026 ?",
    answer:
      "L'employeur doit vérifier le coût global, notamment l'indemnité, les congés payés, le calendrier, les documents de fin de contrat et la contribution patronale spécifique de 40 % sur la part exonérée de cotisations sociales."
  }
];

const reformNoticeSection: SeoSection = {
  title: "Réforme 2026 : ce qu'il faut garder en tête",
  paragraphs: [
    "Le Parlement a adopté le 2 juin 2026 le texte de transposition de l'avenant n°3 relatif à l'assurance chômage. Pour une rupture conventionnelle individuelle, la réforme vise surtout la durée maximale d'indemnisation chômage.",
    "La rupture conventionnelle continue de pouvoir ouvrir droit au chômage si les conditions habituelles sont remplies. Le calcul de l'indemnité minimale n'est pas supprimé par cette réforme.",
    reform2026Disclaimer
  ],
  bullets: [
    "Moins de 55 ans : durée maximale annoncée à 15 mois en métropole.",
    "Seniors : durée maximale annoncée à 20,5 mois pour les salariés concernés.",
    "Outre-mer hors Mayotte : durées spécifiques annoncées selon l'âge.",
    "Employeurs : contribution patronale spécifique de 40 % depuis le 1er janvier 2026 sur la part exonérée de cotisations sociales.",
    "Lire le guide complet : /reforme-rupture-conventionnelle-2026"
  ]
};

const commonSimulatorCta =
  "Utilisez le simulateur de rupture conventionnelle pour obtenir une première estimation du minimum brut, un net indicatif et une base de discussion. Le résultat doit ensuite être vérifié avec les bulletins de paie, la convention collective applicable et le contexte exact du dossier.";

const commonFaq: FaqEntry[] = [
  {
    question: "Le simulateur de rupture conventionnelle donne-t-il un montant définitif ?",
    answer:
      "Non. Il fournit une estimation indicative à partir des informations saisies. Le montant réel dépend du salaire de référence, de l'ancienneté, de la convention collective, des éléments variables de paie et du traitement social ou fiscal applicable."
  },
  {
    question: "L'indemnité de rupture conventionnelle se calcule-t-elle en brut ou en net ?",
    answer:
      "Le minimum légal est généralement raisonné en brut. Le net indicatif permet d'avoir un ordre de grandeur du montant perçu, mais il peut varier selon les exonérations, la part supra-légale, les cotisations et la situation individuelle."
  },
  {
    question: "La convention collective peut-elle prévoir une indemnité plus élevée ?",
    answer:
      "Oui. Certaines conventions collectives ou accords d'entreprise peuvent prévoir une indemnité plus favorable que le minimum légal. Il faut donc toujours vérifier le texte applicable avant de valider un montant."
  },
  {
    question: "Un employeur peut-il utiliser le simulateur ?",
    answer:
      "Oui. L'outil peut aider un employeur, un dirigeant ou un service RH à préparer une première enveloppe. En 2026, la contribution patronale applicable à la part exonérée de cotisations sociales passe de 30 % à 40 %, ce qui augmente le coût employeur sans réduire le minimum dû au salarié. Le simulateur reste indicatif et ne remplace pas une validation paie, juridique ou conventionnelle."
  },
  {
    question: "Quels documents préparer avant de faire le calcul ?",
    answer:
      "Il est conseillé de réunir la date d'entrée, la date de rupture envisagée, les derniers bulletins de paie, les primes, les absences éventuelles, les congés restants et la convention collective indiquée sur le bulletin de salaire."
  }
];

const basePillarPages: PillarPage[] = [
  {
    slug: "simulateur-rupture-conventionnelle",
    title: `Simulateur rupture conventionnelle gratuit | ${siteName}`,
    h1: "Simulateur de rupture conventionnelle",
    description:
      "Simulez gratuitement votre indemnité de rupture conventionnelle en CDI : estimation brute, net indicatif, ancienneté, salaire de référence, exemples et points de vigilance.",
    relatedLinks: [
      "/calcul-indemnite-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle",
      "/rupture-conventionnelle-cdi",
      "/blog/comment-calculer-une-rupture-conventionnelle-facilement"
    ],
    intro: [
      `Le simulateur rupture conventionnelle de ${siteName} permet d'obtenir rapidement une première estimation de l'indemnité spécifique due lors d'une rupture conventionnelle en CDI. Il s'adresse aussi bien aux salariés qui veulent vérifier un montant proposé qu'aux employeurs, dirigeants de TPE/PME ou responsables RH qui souhaitent préparer une discussion claire et chiffrée.`,
      `L'objectif n'est pas de remplacer une analyse juridique complète, mais de donner un repère fiable à partir des éléments essentiels : salaire brut de référence, ancienneté, date d'entrée, date de rupture envisagée et éventuels éléments variables. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "À quoi sert un simulateur de rupture conventionnelle ?",
        paragraphs: [
          "Un simulateur de rupture conventionnelle transforme une règle de calcul parfois abstraite en estimation concrète. Vous renseignez les informations principales et obtenez un ordre de grandeur de l'indemnité minimale.",
          "Cette estimation est utile avant un entretien, pendant une négociation ou simplement pour comprendre si le montant proposé semble cohérent. Elle permet aussi de distinguer le minimum légal, le montant éventuellement négocié et le net indicatif."
        ],
        bullets: [
          "Estimer rapidement le minimum légal brut.",
          "Comprendre l'impact de l'ancienneté.",
          "Comparer plusieurs hypothèses de salaire de référence.",
          "Préparer une discussion avec l'employeur ou le salarié.",
          "Éviter les erreurs fréquentes de calcul."
        ]
      },
      {
        title: "Comment est calculée l'indemnité de rupture conventionnelle ?",
        paragraphs: [
          "L'indemnité spécifique de rupture conventionnelle ne peut pas être inférieure à l'indemnité légale de licenciement. La formule de référence est généralement d'un quart de mois de salaire par année d'ancienneté jusqu'à dix ans, puis d'un tiers de mois par année au-delà de dix ans.",
          "La difficulté pratique ne vient pas seulement de la formule. Elle vient surtout du choix du salaire de référence, de la prise en compte des primes, des absences, du temps partiel éventuel et de la convention collective applicable. Une estimation sérieuse doit donc rester prudente."
        ]
      },
      {
        title: "Exemple concret de simulation",
        paragraphs: [
          "Exemple : un salarié en CDI avec 6 ans d'ancienneté et un salaire brut de référence de 2 500 euros peut obtenir un minimum indicatif de 3 750 euros bruts. Le calcul est le suivant : 2 500 x 1/4 x 6 = 3 750.",
          "Si ce salarié perçoit une prime régulière qui augmente son salaire de référence, ou si sa convention collective prévoit une règle plus favorable, l'indemnité peut être supérieure. C'est pourquoi le simulateur donne une base utile, mais ne dispense pas de vérifier les règles applicables."
        ]
      },
      {
        title: "Cas où le résultat peut varier",
        paragraphs: [
          "Le résultat peut varier en présence d'une rémunération variable, d'une prime annuelle, d'une absence longue, d'un congé maternité, d'un arrêt maladie, d'un temps partiel ou d'un changement de rémunération récent. Ces situations peuvent modifier la base de calcul ou nécessiter une interprétation plus précise.",
          "Les salariés cadres, les salariés proches de la retraite, les salariés ayant une forte part variable ou les dossiers avec tension entre les parties doivent faire l'objet d'une vigilance particulière. Dans ces cas, le simulateur doit être vu comme une première étape."
        ]
      },
      {
        title: "Rupture conventionnelle, licenciement et démission : ne pas confondre",
        paragraphs: [
          "La rupture conventionnelle repose sur un accord entre le salarié et l'employeur. Le licenciement est une décision de l'employeur qui suppose un motif. La démission est une décision du salarié. Ces trois modes de rupture n'ont pas les mêmes conséquences en matière d'indemnité, de procédure et de droits éventuels à l'assurance chômage.",
          "Comparer ces situations permet d'éviter une erreur d'analyse. Une rupture conventionnelle peut être intéressante lorsqu'elle est librement acceptée, correctement formalisée et accompagnée d'un montant cohérent. Elle ne doit toutefois pas être utilisée pour masquer un conflit ou contourner une procédure."
        ]
      },
      {
        title: "Utiliser le simulateur au bon moment",
        paragraphs: [
          commonSimulatorCta,
          "Le bon réflexe consiste à faire une première simulation avant l'entretien, puis à refaire le calcul avec les informations vérifiées : ancienneté exacte, salaire moyen, primes, congés restants et convention collective. Cela permet d'arriver avec une vision plus claire du dossier.",
          "En 2026, la réforme ne change pas le minimum légal dû au salarié, mais elle augmente le coût de la rupture conventionnelle pour l'employeur. La contribution patronale applicable à la part exonérée de cotisations sociales passe de 30 % à 40 %."
        ],
        bullets: [
          "Préparer les bulletins de paie récents.",
          "Identifier la date d'entrée exacte.",
          "Vérifier la convention collective.",
          "Tester plusieurs hypothèses de salaire brut.",
          "Conserver le résultat comme support de discussion."
        ]
      },
      {
        title: "Erreurs fréquentes à éviter",
        paragraphs: [
          "L'erreur la plus fréquente est de calculer l'indemnité sur un salaire trop faible ou avec une ancienneté incomplète. Une autre erreur consiste à confondre minimum légal et montant négocié. Le minimum est un plancher, pas forcément le montant final.",
          "Il faut aussi éviter de raisonner uniquement en net. Le brut, le net indicatif, la fiscalité et les éventuelles exonérations ne répondent pas à la même logique. Une simulation claire doit donc séparer les différents niveaux de lecture."
        ]
      }
    ],
    faq: commonFaq,
    conclusion: [
      "Le simulateur de rupture conventionnelle est un outil pratique pour comprendre rapidement le montant minimum indicatif et préparer une discussion plus structurée. Il permet de sécuriser les premières hypothèses sans se perdre dans un calcul manuel approximatif.",
      "Pour obtenir une estimation plus fiable, il est recommandé de vérifier les informations saisies, de relire la convention collective et de demander l’avis d’un service compétent ou d’un professionnel en cas de situation complexe."
    ]
  },

  {
    slug: "calcul-indemnite-rupture-conventionnelle",
    title: `Calcul indemnité rupture conventionnelle | ${siteName}`,
    h1: "Calcul de l’indemnité de rupture conventionnelle",
    description:
      "Méthode complète pour calculer l'indemnité de rupture conventionnelle : ancienneté, salaire de référence, formule légale, exemples chiffrés et simulateur.",
    relatedLinks: [
      "/blog/calcul-indemnite-brut-ou-net",
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle-net",
      "/indemnite-legale-rupture-conventionnelle",
      "/rupture-conventionnelle-cdi",
      "/blog/calcul-indemnite-rupture-conventionnelle-exemple"
    ],
    intro: [
      "Le calcul de l'indemnité de rupture conventionnelle repose sur une méthode précise : déterminer l'ancienneté, choisir le bon salaire de référence, appliquer le minimum légal puis vérifier si une règle plus favorable s'applique. Ce calcul est essentiel car l'indemnité spécifique ne peut pas être inférieure à l'indemnité légale de licenciement.",
      `Cette page explique la méthode étape par étape, avec des exemples simples et les principaux pièges à éviter. Elle permet de comprendre le résultat affiché par le simulateur et de préparer une vérification plus complète si le dossier présente des particularités. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Réponse rapide : quel salaire utiliser ?",
        paragraphs: [
          "Pour calculer une indemnité de rupture conventionnelle, on part du salaire brut de référence. Le salaire net versé sur le compte bancaire ne suffit pas pour déterminer le minimum légal.",
          "Le salaire de référence doit être relu avec les bulletins de paie : primes régulières, variables, 13e mois, absences ou changement récent de rémunération peuvent modifier la base retenue."
        ],
        bullets: [
          "Base du calcul : salaire brut de référence.",
          "Le net sert surtout à comprendre le montant réellement perçu.",
          "Les primes et variables peuvent modifier la moyenne.",
          "La convention collective peut prévoir un montant plus favorable.",
          "Le simulateur permet de tester la base avec votre ancienneté exacte."
        ]
      },
      {
        title: "Les trois données indispensables",
        paragraphs: [
          "Pour calculer correctement une indemnité de rupture conventionnelle, il faut au minimum connaître trois éléments : l'ancienneté du salarié, le salaire brut de référence et la date de rupture envisagée. Sans ces informations, le calcul risque d'être imprécis.",
          "L'ancienneté mesure la durée de présence dans l'entreprise. Le salaire de référence sert de base au calcul. La date de rupture permet de vérifier si une année supplémentaire ou une fraction d'année doit être prise en compte."
        ],
        bullets: [
          "Date d'entrée dans l'entreprise.",
          "Date de rupture envisagée.",
          "Salaire brut mensuel de référence.",
          "Primes régulières éventuelles.",
          "Convention collective applicable."
        ]
      },
      {
        title: "Formule légale de calcul",
        paragraphs: [
          "La formule de base est la suivante : un quart de mois de salaire par année d'ancienneté jusqu'à dix ans, puis un tiers de mois de salaire par année d'ancienneté au-delà de dix ans. Les années incomplètes peuvent être prises en compte proportionnellement.",
          "Cette formule permet d'obtenir le minimum légal brut. Le montant réellement versé peut être supérieur si une convention collective, un accord d'entreprise ou une négociation individuelle prévoit une indemnité plus favorable."
        ]
      },
      {
        title: "Exemples chiffrés",
        paragraphs: [
          "Exemple 1 : un salarié avec 8 ans d'ancienneté et un salaire brut de référence de 2 800 euros obtient un minimum indicatif de 5 600 euros bruts. Le calcul est : 2 800 x 1/4 x 8.",
          "Exemple 2 : un salarié avec 12 ans d'ancienneté et 3 000 euros bruts de salaire de référence obtient environ 9 500 euros bruts : 7 500 euros pour les dix premières années, puis 2 000 euros pour les deux années au-delà de dix ans."
        ]
      },
      {
        title: "Salaire de référence : le point le plus sensible",
        paragraphs: [
          "Le salaire de référence doit être déterminé avec attention. Il peut être influencé par les primes, les variables, les absences, les commissions ou les changements récents de rémunération. Une base trop basse entraîne mécaniquement une indemnité sous-estimée.",
          "En pratique, il est souvent utile de comparer plusieurs moyennes et de vérifier les éléments figurant sur les bulletins de paie. Le calcul doit rester cohérent avec la situation réelle du salarié."
        ],
        table: {
          headers: [
            "Élément",
            "Rôle dans le calcul",
            "Point de vigilance"
          ],
          rows: [
            [
              "Salaire brut mensuel",
              "Point de départ le plus courant pour estimer la base.",
              "Ne pas le remplacer par le salaire net payé."
            ],
            [
              "Moyennes 3 ou 12 mois",
              "Permettent de relire la rémunération récente ou habituelle.",
              "Comparer les moyennes si la paie a changé."
            ],
            [
              "Primes régulières",
              "Peuvent augmenter le salaire de référence selon leur nature.",
              "Ne pas oublier un 13e mois, une prime variable ou une commission régulière."
            ],
            [
              "Absences",
              "Peuvent compliquer la lecture des derniers bulletins.",
              "Vérifier si le salaire habituel doit être pris en compte."
            ],
            [
              "Convention collective",
              "Peut prévoir une règle plus favorable.",
              "Toujours vérifier le texte applicable avant signature."
            ]
          ]
        }
      },
      {
        title: "Indemnité légale, conventionnelle et supra-légale",
        paragraphs: [
          "L'indemnité légale correspond au minimum prévu par la règle générale. L'indemnité conventionnelle peut être plus favorable si la convention collective le prévoit. L'indemnité supra-légale correspond à la part négociée au-delà du minimum applicable.",
          "Cette distinction est importante pour comprendre le montant total, mais aussi pour analyser le traitement social et fiscal. Un montant global ne doit donc pas être interprété sans savoir ce qu'il contient."
        ]
      },
      {
        title: "Quand utiliser le simulateur ?",
        paragraphs: [
          commonSimulatorCta,
          "Le simulateur est particulièrement utile lorsque l'on veut tester plusieurs hypothèses : date de départ différente, salaire moyen différent, ancienneté avec fraction d'année, montant négocié supérieur au minimum."
        ]
      },
      {
        title: "Erreurs fréquentes sur le salaire de référence",
        paragraphs: [
          "La plupart des écarts viennent d'une base trop rapide : dernier mois pris seul, net confondu avec le brut, prime oubliée ou ancienneté arrondie. Ces erreurs peuvent faire baisser artificiellement le minimum affiché.",
          "Avant de signer, relisez la base avec vos bulletins et utilisez la simulation comme point de contrôle. Si la rémunération comprend beaucoup de variable, une vérification paie ou conventionnelle devient préférable."
        ],
        bullets: [
          "Confondre salaire brut et salaire net.",
          "Prendre uniquement le dernier mois sans regarder les moyennes.",
          "Oublier les primes régulières, commissions ou 13e mois.",
          "Ignorer une absence qui a réduit la paie récente.",
          "Oublier la convention collective."
        ]
      }
    ],
    faq: commonFaq,
    conclusion: [
      "Le calcul de l'indemnité de rupture conventionnelle doit être fait avec méthode. L'ancienneté et le salaire de référence sont les deux piliers du calcul, mais la convention collective et les éléments variables peuvent modifier le résultat.",
      "Le simulateur RuptureConv permet de gagner du temps et d'obtenir une première estimation claire, à compléter par une vérification personnalisée lorsque le dossier le nécessite."
    ]
  },

  {
    slug: "indemnite-legale-rupture-conventionnelle",
    title: `Indemnité légale rupture conventionnelle | ${siteName}`,
    h1: "Indemnité légale de rupture conventionnelle",
    description:
      "Calcul 2026 de l'indemnité légale minimale de rupture conventionnelle : formule, ancienneté, salaire de référence, exemples et simulateur gratuit.",
    relatedLinks: [
      "/calcul-indemnite-rupture-conventionnelle-net",
      "/calcul-indemnite-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle",
      "/modele-lettre-rupture-conventionnelle",
      "/rupture-conventionnelle-cdi",
      "/blog/montant-minimum-rupture-conventionnelle"
    ],
    intro: [
      "L'indemnité légale de rupture conventionnelle représente le montant minimum que le salarié doit recevoir lors d'une rupture conventionnelle homologuée. Vous pouvez l'estimer gratuitement avec le simulateur, puis vérifier la formule, l'ancienneté et le salaire de référence.",
      `Comprendre cette indemnité est indispensable avant de signer une convention. Elle dépend principalement de l'ancienneté et du salaire brut de référence, mais elle peut aussi être influencée par la convention collective et par la structure de rémunération du salarié. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Définition de l'indemnité légale",
        paragraphs: [
          "L'indemnité légale correspond au minimum prévu par les règles applicables lorsque le contrat de travail prend fin dans le cadre d'une rupture conventionnelle. Elle sert de socle de calcul et permet de vérifier que le montant proposé respecte le minimum dû.",
          "Elle ne doit pas être confondue avec une indemnité négociée plus élevée. Une rupture conventionnelle peut prévoir une indemnité supérieure, notamment lorsque le salarié dispose d'une ancienneté importante, d'un poste stratégique ou d'un contexte de négociation favorable."
        ]
      },
      {
        title: "Formule minimale",
        paragraphs: [
          "La méthode couramment utilisée consiste à appliquer un quart de mois de salaire par année d'ancienneté jusqu'à dix ans, puis un tiers de mois de salaire par année au-delà de dix ans. Cette formule donne une base brute indicative.",
          "Lorsque l'ancienneté n'est pas un nombre entier d'années, la fraction d'année peut être prise en compte. Il faut donc raisonner avec précision sur les dates, et non simplement arrondir l'ancienneté au hasard."
        ]
      },
      {
        title: "Exemple simple",
        paragraphs: [
          "Exemple : un salarié ayant 4 ans d'ancienneté et un salaire brut de référence de 2 200 euros obtient un minimum indicatif de 2 200 euros bruts. Le calcul est : 2 200 x 1/4 x 4.",
          "Avec 15 ans d'ancienneté et 3 200 euros bruts mensuels, le calcul devient plus important : dix années à un quart de mois, puis cinq années à un tiers de mois. Le montant dépasse alors largement le simple calcul linéaire des premières années."
        ]
      },
      {
        title: "Pourquoi vérifier la convention collective ?",
        paragraphs: [
          "Certaines conventions collectives prévoient des règles plus favorables que le minimum légal. Dans ce cas, il faut appliquer la règle la plus avantageuse pour le salarié. Ne pas vérifier la convention collective peut conduire à sous-estimer l'indemnité.",
          "La convention collective figure généralement sur le bulletin de paie. Elle doit être lue avec attention, car les règles peuvent varier selon le statut, la catégorie professionnelle, l'ancienneté ou la rémunération."
        ]
      },
      {
        title: "Minimum légal et négociation",
        paragraphs: [
          "Le minimum légal n'interdit pas de négocier davantage. Il sert simplement de seuil de départ. Dans certains cas, une indemnité supra-légale peut être proposée pour tenir compte d'un contexte particulier, d'une transition, d'une confidentialité ou d'une volonté d'accord rapide.",
          "La négociation doit toutefois rester claire. Il est recommandé de distinguer le minimum obligatoire, la part négociée et les autres sommes dues comme les congés payés ou éléments variables."
        ]
      }
    ],
    faq: commonFaq,
    conclusion: [
      "L'indemnité légale de rupture conventionnelle est le point de départ du calcul. Elle permet de vérifier que le montant proposé respecte le minimum applicable, mais elle ne suffit pas toujours à connaître le montant final.",
      "Pour sécuriser l'estimation, il faut vérifier l'ancienneté, le salaire de référence, la convention collective et les éventuels éléments négociés."
    ]
  },

  {
    slug: "rupture-conventionnelle-cdi",
    title: `Rupture conventionnelle CDI : procédure, calcul et indemnité | ${siteName}`,
    h1: "Rupture conventionnelle CDI",
    description:
      "Guide complet de la rupture conventionnelle en CDI : conditions, procédure, indemnité, chômage, délai, erreurs à éviter et simulateur.",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle",
      "/blog/rupture-conventionnelle-cdi-conditions"
    ],
    intro: [
      "La rupture conventionnelle CDI permet à un salarié et à un employeur de mettre fin d'un commun accord à un contrat à durée indéterminée. Elle est très utilisée car elle offre un cadre plus souple qu'un licenciement et plus protecteur qu'une démission, à condition de respecter la procédure.",
      `Cette page présente les conditions, les étapes, le calcul de l'indemnité, les délais et les erreurs à éviter. Elle permet de préparer une rupture conventionnelle avec davantage de clarté, que l'on soit salarié, employeur ou responsable RH. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Principe de la rupture conventionnelle en CDI",
        paragraphs: [
          "La rupture conventionnelle repose sur un accord libre entre les deux parties. Elle ne peut pas être imposée par l'employeur au salarié, ni par le salarié à l'employeur. Le consentement doit être réel, éclairé et formalisé.",
          "Elle concerne le CDI. Elle ne s'applique pas de la même manière aux autres formes de contrat ou à certains statuts particuliers. Avant de l'envisager, il faut donc vérifier le cadre contractuel exact."
        ]
      },
      {
        title: "Les étapes de la procédure",
        paragraphs: [
          "La procédure comprend généralement un ou plusieurs entretiens, la signature d'une convention, un délai de rétractation puis une demande d'homologation. La date de rupture ne peut pas être fixée n'importe comment : elle doit tenir compte de ces délais.",
          "Une erreur de calendrier peut retarder la sortie ou fragiliser le dossier. Il est donc utile de préparer les dates avant de signer et de vérifier que les documents correspondent au scénario retenu."
        ],
        bullets: [
          "Échanger sur le principe de la rupture.",
          "Organiser un ou plusieurs entretiens.",
          "Signer la convention de rupture.",
          "Respecter le délai de rétractation.",
          "Attendre l'homologation avant la rupture effective."
        ]
      },
      {
        title: "Indemnité de rupture conventionnelle en CDI",
        paragraphs: [
          "Le salarié doit percevoir une indemnité spécifique de rupture conventionnelle au moins égale au minimum applicable. Le calcul dépend de l'ancienneté et du salaire brut de référence. Il peut être augmenté par la convention collective ou par la négociation.",
          "Exemple : un salarié avec 3 ans et 6 mois d'ancienneté et 2 400 euros bruts mensuels peut obtenir un montant indicatif autour de 2 100 euros bruts avant vérification conventionnelle et prise en compte exacte de la fraction d'année."
        ]
      },
      {
        title: "Rupture conventionnelle et chômage",
        paragraphs: [
          "La rupture conventionnelle homologuée peut ouvrir droit à l'assurance chômage si les conditions habituelles sont remplies. Il faut toutefois distinguer le principe d'ouverture des droits, les délais d'inscription, les différés éventuels et la situation individuelle du salarié.",
          "Le montant de l'indemnité, notamment lorsqu'il existe une part supra-légale, peut avoir un impact sur les délais de prise en charge. Ce point mérite une vérification spécifique lorsque l'indemnité négociée est importante."
        ]
      },
      {
        title: "Erreurs à éviter",
        paragraphs: [
          "La première erreur est de signer sans avoir vérifié le montant. La deuxième est de négliger la convention collective. La troisième est de confondre la rupture conventionnelle avec une démission négociée ou un licenciement déguisé.",
          "Il faut aussi éviter les pressions. Une rupture conventionnelle doit rester un accord libre. Si l'une des parties se sent contrainte, le dossier peut devenir sensible et nécessiter un avis personnalisé."
        ]
      }
    ],
    faq: commonFaq,
    conclusion: [
      "La rupture conventionnelle CDI est un outil utile lorsqu'elle est librement acceptée, bien préparée et correctement chiffrée. Elle suppose de respecter une procédure, un calendrier et un minimum d'indemnité.",
      "Le simulateur RuptureConv permet d'obtenir une première estimation de l'indemnité et d'aborder la discussion avec des repères plus fiables."
    ]
  },

  {
    slug: "licenciement-indemnite",
    title: `Licenciement indemnité : calcul et comparaison | ${siteName}`,
    h1: "Indemnité de Licenciement",
    description:
      "Comprendre l'indemnité de licenciement, la comparer à la rupture conventionnelle, calculer un montant indicatif et éviter les erreurs.",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/rupture-conventionnelle-cdi",
      "/blog/rupture-conventionnelle-ou-licenciement-que-choisir"
    ],
    intro: [
      "L'indemnité de licenciement est une somme versée au salarié lorsque le contrat est rompu à l'initiative de l'employeur, sous réserve des conditions applicables. Elle sert aussi de référence minimale pour l'indemnité spécifique de rupture conventionnelle.",
      `Comparer indemnité de licenciement et rupture conventionnelle permet de mieux comprendre les enjeux financiers d'une fin de CDI. Les deux mécanismes peuvent utiliser une base de calcul proche, mais ils ne répondent pas à la même logique juridique. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Définition de l'indemnité de licenciement",
        paragraphs: [
          "L'indemnité de licenciement vise à compenser la rupture du contrat lorsque celle-ci intervient à l'initiative de l'employeur. Elle dépend principalement de l'ancienneté et du salaire de référence.",
          "Elle peut être légale, conventionnelle ou contractuelle. La règle la plus favorable doit être prise en compte lorsque plusieurs bases existent."
        ]
      },
      {
        title: "Lien avec la rupture conventionnelle",
        paragraphs: [
          "La rupture conventionnelle ne peut pas prévoir une indemnité inférieure à l'indemnité légale de licenciement. C'est pourquoi comprendre l'indemnité de licenciement aide aussi à vérifier une rupture conventionnelle.",
          "La différence principale tient à la procédure : le licenciement suppose un motif et une initiative employeur, tandis que la rupture conventionnelle repose sur un accord entre les parties."
        ]
      },
      {
        title: "Exemple chiffré",
        paragraphs: [
          "Exemple : avec 11 ans d'ancienneté et 2 600 euros bruts mensuels, le calcul indicatif donne environ 7 366 euros bruts : dix ans à un quart de mois, puis un an à un tiers de mois.",
          "Ce montant peut être supérieur si la convention collective prévoit une règle plus favorable ou si d'autres sommes sont dues au moment de la rupture."
        ]
      },
      {
        title: "Licenciement ou rupture conventionnelle : quelle différence pratique ?",
        paragraphs: [
          "Le licenciement et la rupture conventionnelle n'ont pas le même sens. Le licenciement répond à une décision unilatérale de l'employeur. La rupture conventionnelle suppose un accord. Cette différence peut influencer la discussion, les documents et la perception du départ.",
          "Le choix entre les deux ne doit pas se faire uniquement sur le montant. Il faut aussi regarder le contexte, les relations entre les parties, le calendrier, les risques et les droits associés."
        ]
      },
      {
        title: "Points de vigilance",
        paragraphs: [
          "Il faut vérifier l'ancienneté, le salaire de référence, le motif éventuel, la convention collective et les autres sommes dues. Les congés payés, primes, préavis ou indemnités spécifiques peuvent modifier le coût global.",
          "En cas de conflit, de pression ou de doute sur le motif, une analyse personnalisée devient préférable."
        ]
      }
    ],
    faq: commonFaq,
    conclusion: [
      "L'indemnité de licenciement est un repère important pour comprendre le minimum applicable dans de nombreuses situations de rupture du CDI.",
      "Pour comparer licenciement et rupture conventionnelle, il faut regarder le calcul, mais aussi la procédure, le contexte et les conséquences pratiques."
    ]
  },

  {
    slug: "outils-rh",
    title: `Outils RH gratuits pour employeurs et salariés | ${siteName}`,
    h1: "Outils RH",
    description:
      "Outils RH pour calculer, comparer et préparer les indemnités de rupture conventionnelle, licenciement et démarches RH.",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/licenciement-indemnite",
      "/blog"
    ],
    intro: [
      `${siteName} est une boîte à outils RH simple, accessible et fiable pour les salariés, employeurs, dirigeants et responsables RH. La plateforme est dédiée au calcul des indemnités, à la compréhension des fins de contrat et à la préparation des démarches utiles en droit du travail.`,
      `L'idée est de rendre les sujets RH plus compréhensibles : indemnité, ancienneté, salaire de référence, départ négocié, licenciement, congés payés, préavis ou coût employeur. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Pourquoi utiliser des outils RH en ligne ?",
        paragraphs: [
          "Les sujets RH sont souvent techniques, mais les premières questions sont très concrètes : combien coûte une rupture ? Quel montant minimum prévoir ? Quelle différence entre brut et net ? Quel délai anticiper ?",
          "Un outil RH bien conçu ne remplace pas un professionnel, mais il permet de préparer les échanges, d'éviter les erreurs grossières et de gagner du temps avant une validation plus complète."
        ]
      },
      {
        title: "Simulateur de rupture conventionnelle",
        paragraphs: [
          "Le simulateur de rupture conventionnelle permet d'obtenir une estimation du minimum brut et un net indicatif. Il est utile pour les salariés qui préparent une négociation, mais aussi pour les employeurs qui veulent cadrer une enveloppe de départ.",
          "L'outil repose sur les données renseignées : ancienneté, salaire, dates et informations complémentaires. Plus ces données sont précises, plus l'estimation est exploitable."
        ]
      },
      {
        title: "Outils RH complémentaires",
        paragraphs: [
          "Les guides RH couvrent les sujets clés autour des fins de contrat : indemnité de licenciement, préavis, congés payés, coût employeur, comparaison rupture conventionnelle/licenciement et préparation d'un départ.",
          "Cette logique offre une ressource complète autour des décisions RH du quotidien, avec des repères pratiques et des calculs lisibles."
        ],
        bullets: [
          "Simulateur d'indemnité de licenciement.",
          "Calcul de préavis.",
          "Estimation de congés payés.",
          "Comparateur rupture conventionnelle / licenciement.",
          "Guides pratiques RH."
        ]
      },
      {
        title: "Pour les salariés",
        paragraphs: [
          "Un salarié peut utiliser les outils pour comprendre ses droits, préparer un entretien, vérifier un montant proposé et distinguer les sommes réellement dues des montants négociables.",
          "Cette préparation aide à aborder la discussion avec davantage de calme et de précision."
        ]
      },
      {
        title: "Pour les employeurs et RH",
        paragraphs: [
          "Un employeur ou un responsable RH peut utiliser les outils pour cadrer une première estimation, anticiper le coût global et préparer un dossier plus clair.",
          "L'objectif n'est pas de remplacer la paie ou le conseil juridique, mais de disposer d'un repère rapide avant validation."
        ]
      }
    ],
    faq: commonFaq,
    conclusion: [
      "Les outils RH de RuptureConv visent à simplifier les sujets complexes sans les dénaturer. Ils donnent des repères rapides, utiles et prudents.",
      "Le simulateur de rupture conventionnelle s'inscrit dans une plateforme dédiée aux calculs RH et aux fins de contrat."
    ]
  }
];

const requiredInternalLinks = [
  "/blog/calcul-indemnite-brut-ou-net",
  "/calcul-indemnite-rupture-conventionnelle-net",
  "/simulateur-rupture-conventionnelle",
  "/calcul-indemnite-rupture-conventionnelle",
  "/indemnite-legale-rupture-conventionnelle",
  "/rupture-conventionnelle-chomage",
  "/modele-lettre-rupture-conventionnelle"
];

function calculateMinimumIndemnity(years: number, salary: number) {
  const firstPeriod = Math.min(years, 10) * salary * 0.25;
  const secondPeriod = Math.max(years - 10, 0) * salary * (1 / 3);
  return Math.round(firstPeriod + secondPeriod);
}

function formatEuro(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "EUR"
  }).format(amount);
}

function highIntentPage({
  slug,
  h1,
  description,
  example,
  angle,
  extraSections = [],
  extraFaq = []
}: {
  slug: string;
  h1: string;
  description: string;
  example: string;
  angle: string;
  extraSections?: SeoSection[];
  extraFaq?: FaqEntry[];
}): PillarPage {
  return {
    slug,
    title: h1,
    h1,
    description,
    relatedLinks: requiredInternalLinks,
    intro: [
      "Vous souhaitez obtenir un montant clair avant un échange avec votre employeur, votre salarié ou votre service RH ? Le simulateur gratuit vous aide à partir des bons repères : salaire, ancienneté, minimum légal et net indicatif.",
      `${angle} ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Comprendre le calcul",
        paragraphs: [
          "Le calcul repose sur deux variables principales : l'ancienneté et le salaire brut de référence. Le minimum légal est calculé en brut, puis le net indicatif permet seulement de visualiser un ordre de grandeur.",
          "La convention collective, les primes, le statut cadre ou non-cadre et les absences peuvent modifier la lecture du résultat. Une simulation est donc un point de départ utile, pas une validation juridique définitive."
        ]
      },
      {
        title: "Exemple concret",
        paragraphs: [
          example,
          "Pour obtenir votre propre montant, il faut saisir vos dates exactes, votre salaire brut et les informations complémentaires connues. Le résultat peut ensuite servir de base de discussion avec l'employeur, le salarié ou le service paie."
        ]
      },
      ...extraSections
    ],
    faq: [
      {
        question: "Le calcul est-il le même pour tous les salariés ?",
        answer:
          "La formule minimale est commune, mais le résultat peut varier selon le salaire, l'ancienneté, la convention collective, les primes et le contexte du dossier."
      },
      {
        question: "Le montant affiché est-il brut ou net ?",
        answer:
          "Le minimum se raisonne en brut. Le net indicatif est une estimation simplifiée qui peut varier selon le traitement social et fiscal."
      },
      {
        question: "Pourquoi utiliser le simulateur ?",
        answer:
          "Le simulateur évite les calculs approximatifs et donne une base claire pour préparer une négociation ou vérifier un montant proposé."
      },
      ...extraFaq
    ],
    conclusion: [
      "Le bon réflexe consiste à comprendre la règle, regarder un exemple, puis lancer une simulation avec vos propres données.",
      "Pour les situations complexes, il faut vérifier la convention collective et les éléments de paie avant toute signature."
    ]
  };
}

const highIntentPages: PillarPage[] = [
  highIntentPage({
    slug: "calcul-rupture-conventionnelle-cdi-anciennete",
    h1: "Calcul de rupture conventionnelle CDI selon l’ancienneté",
    description:
      "Calculez une rupture conventionnelle CDI selon l'ancienneté avec un simulateur gratuit 2026, un exemple chiffré et une FAQ rapide.",
    angle:
      "L'ancienneté détermine la part principale de l'indemnité minimale et doit être vérifiée avec les dates exactes du CDI.",
    example:
      "Exemple : avec 7 ans d'ancienneté et 2 600 euros bruts mensuels, le minimum indicatif est de 2 600 x 1/4 x 7, soit environ 4 550 euros bruts."
  }),
  highIntentPage({
    slug: "calcul-indemnite-rupture-conventionnelle-net",
    h1: "Calcul de l’indemnité de rupture conventionnelle nette",
    description:
      "Calcul gratuit de l'indemnité de rupture conventionnelle nette 2026 : brut, net indicatif, minimum légal, exemple et simulation sans inscription.",
    angle:
      "Le calcul est gratuit, rapide et sans inscription : il permet de distinguer le minimum brut, le net indicatif et la part éventuellement négociée.",
    example:
      "Exemple : avec 8 ans d'ancienneté et 2 700 euros bruts mensuels, le minimum indicatif est de 2 700 x 1/4 x 8, soit 5 400 euros bruts avant estimation du net.",
    extraSections: [
      {
        title: "Indemnité brute et indemnité nette : la différence",
        paragraphs: [
          "Le minimum de rupture conventionnelle se calcule d'abord sur une base brute. C'est ce montant brut qui sert à vérifier le plancher applicable avant signature.",
          "Le net indicatif correspond à une lecture pratique de ce qui pourrait être perçu. Il peut varier selon le traitement social et fiscal, la part supra-légale, les exonérations possibles et la situation individuelle. Il doit donc rester un repère prudent."
        ]
      },
      {
        title: "Indemnité légale ou indemnité négociée",
        paragraphs: [
          "L'indemnité légale correspond au minimum à respecter. La convention collective peut parfois prévoir mieux, et les parties peuvent aussi négocier une indemnité supérieure.",
          "Pour comparer correctement une proposition, séparez toujours trois niveaux : minimum légal ou conventionnel, part négociée au-delà du minimum, puis net indicatif. Cette séparation évite de confondre un droit minimum avec une enveloppe de sortie."
        ]
      },
      {
        title: "Ancienneté et salaire de référence",
        paragraphs: [
          "L'ancienneté pèse directement sur le montant : jusqu'à 10 ans, la formule courante applique un quart de mois par année. Au-delà, les années supplémentaires sont généralement calculées au tiers de mois.",
          "Le salaire de référence doit être relu avec attention. Primes régulières, variables, commissions, absences ou changement récent de rémunération peuvent modifier la base de calcul. Une erreur sur cette base peut faire varier fortement le résultat."
        ]
      },
      {
        title: "Deux exemples chiffrés",
        paragraphs: [
          "Exemple 1 : avec 3 ans d'ancienneté et 2 200 euros bruts mensuels, le minimum indicatif est de 2 200 x 1/4 x 3, soit 1 650 euros bruts avant lecture du net indicatif.",
          "Exemple 2 : avec 12 ans d'ancienneté et 3 000 euros bruts mensuels, les dix premières années représentent 7 500 euros, puis les deux années suivantes environ 2 000 euros. Le total indicatif atteint 9 500 euros bruts avant vérification conventionnelle."
        ]
      },
      {
        title: "Erreurs fréquentes avant de signer",
        paragraphs: [
          "Les erreurs les plus courantes consistent à calculer sur le salaire net, à oublier une prime régulière, à arrondir l'ancienneté trop vite ou à ne pas vérifier la convention collective.",
          "Autre piège : comparer uniquement le montant net affiché sans comprendre la part brute minimale et la part éventuellement négociée. Le simulateur aide à remettre ces montants dans le bon ordre."
        ],
        bullets: [
          "Calculer sur le brut avant de regarder le net indicatif.",
          "Vérifier l'ancienneté avec les dates exactes.",
          "Relire le salaire de référence et les primes.",
          "Comparer minimum légal, convention collective et montant négocié.",
          "Garder le résultat comme base de discussion, pas comme garantie définitive."
        ]
      }
    ],
    extraFaq: [
      {
        question: "Peut-on connaître exactement le net à l'avance ?",
        answer:
          "Pas toujours. Le net dépend de paramètres sociaux et fiscaux qui peuvent varier. Le simulateur donne un net indicatif utile pour se repérer, mais le montant final doit être confirmé avec la paie ou un conseil adapté."
      },
      {
        question: "Faut-il négocier en brut ou en net ?",
        answer:
          "Le minimum et la convention sont généralement relus en brut. Le net indicatif aide à comprendre l'ordre de grandeur perçu, mais la négociation doit rester claire sur la base utilisée."
      }
    ]
  }),
  highIntentPage({
    slug: "simulateur-indemnite-rupture-conventionnelle-net",
    h1: "Simulateur d’indemnité de rupture conventionnelle nette",
    description:
      "Utilisez un simulateur d'indemnité de rupture conventionnelle net indicatif 2026 pour estimer rapidement brut, net et montant minimum.",
    angle:
      "Le simulateur affiche un repère brut et un net indicatif afin de préparer une discussion plus lisible.",
    example:
      "Exemple : avec 5 ans d'ancienneté et 2 400 euros bruts mensuels, le minimum brut indicatif est d'environ 3 000 euros avant estimation du net."
  }),
  highIntentPage({
    slug: "indemnite-rupture-conventionnelle-anciennete-10-ans",
    h1: "Indemnité de rupture conventionnelle avec 10 ans d’ancienneté",
    description:
      "Estimez l'indemnité de rupture conventionnelle après 10 ans d'ancienneté avec exemple de calcul 2026, simulateur gratuit et repères brut/net.",
    angle:
      "À 10 ans d'ancienneté, le calcul atteint le seuil important avant le passage à la règle du tiers de mois au-delà.",
    example:
      "Exemple : avec 10 ans d'ancienneté et 2 800 euros bruts mensuels, le minimum indicatif est de 2 800 x 1/4 x 10, soit 7 000 euros bruts."
  }),
  highIntentPage({
    slug: "calcul-indemnite-cadre",
    h1: "Calcul de l’indemnité de rupture conventionnelle pour cadre",
    description:
      "Calculez l'indemnité d'un salarié cadre avec simulateur gratuit 2026, ancienneté, salaire de référence, primes et points de vigilance.",
    angle:
      "Le statut cadre ne change pas automatiquement la formule légale, mais il peut influencer la convention collective, les primes et la négociation.",
    example:
      "Exemple : un cadre avec 9 ans d'ancienneté et 4 000 euros bruts mensuels obtient un minimum indicatif de 9 000 euros bruts avant vérification conventionnelle."
  }),
  highIntentPage({
    slug: "calcul-indemnite-non-cadre",
    h1: "Calcul de l’indemnité de rupture conventionnelle pour non-cadre",
    description:
      "Calculez l'indemnité d'un salarié non-cadre avec simulateur gratuit 2026, méthode simple, exemple et FAQ rapide.",
    angle:
      "Pour un non-cadre, la priorité reste de vérifier le salaire brut de référence, l'ancienneté exacte et les éventuelles primes régulières.",
    example:
      "Exemple : un salarié non-cadre avec 6 ans d'ancienneté et 2 100 euros bruts mensuels obtient un minimum indicatif de 3 150 euros bruts."
  })
];

const resourcePlaceholderPages: PillarPage[] = [
  {
    slug: "modele-lettre-rupture-conventionnelle",
    title: "Modèle lettre rupture conventionnelle CDI",
    h1: "Modèle de lettre de demande de rupture conventionnelle",
    description:
      "Modèle de lettre rupture conventionnelle à copier : courrier, email, variantes prudentes, erreurs à éviter et étapes après l'envoi.",
    relatedLinks: [
      "/calcul-indemnite-rupture-conventionnelle-net",
      "/simulateur-rupture-conventionnelle",
      "/negocier-rupture-conventionnelle",
      "/rupture-conventionnelle-chomage",
      "/calcul-indemnite-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle",
      "/rupture-conventionnelle-cdi"
    ],
    intro: [
      "Ce modèle gratuit de lettre de rupture conventionnelle peut être copié puis adapté pour demander un entretien à votre employeur. Il sert à ouvrir une discussion claire, sans valider la rupture à lui seul.",
      "La rupture conventionnelle repose sur un accord commun, une procédure encadrée, un délai de rétractation et une homologation.",
      `L’objectif d’un courrier ou d’un email est donc de formuler une demande professionnelle, factuelle et prudente, sans pression ni ultimatum. Avant d’envoyer votre demande, il est utile d’estimer votre indemnité indicative pour savoir de quoi vous parlez si un échange s’ouvre. Les informations présentées sont générales et indicatives. Elles ne remplacent pas un conseil juridique personnalisé.`
    ],
    sections: [
      {
        title: "Avant d’envoyer votre demande",
        paragraphs: [
          "Avant d’écrire, clarifiez votre objectif : souhaitez-vous ouvrir une discussion, proposer un calendrier, vérifier une enveloppe financière ou simplement demander un entretien ? Une lettre trop directe sur le montant peut fermer la discussion si le contexte n’est pas mûr.",
          "Préparez aussi les éléments chiffrés : date d’entrée, date de rupture souhaitée, salaire brut de référence, primes éventuelles et convention collective. Une estimation indicative de l’indemnité de rupture conventionnelle permet d’aborder l’échange avec un repère concret.",
          "La formulation doit rester professionnelle. Évitez les reproches détaillés, les menaces, les accusations ou les phrases qui pourraient laisser penser que vous subissez une pression. Une demande de rupture conventionnelle doit rester compatible avec l’idée d’un accord libre entre les deux parties.",
          "Gardez une copie du courrier ou de l’email envoyé. Si vous utilisez un email, conservez aussi la date d’envoi et les éventuelles réponses. Si le sujet est sensible, une lettre recommandée peut être envisagée, mais elle n’est pas toujours nécessaire pour ouvrir un échange."
        ],
        bullets: [
          "Vérifier son objectif avant d’écrire.",
          "Préparer une estimation indicative de l’indemnité.",
          "Rester factuel et courtois.",
          "Demander un entretien plutôt qu’imposer une décision.",
          "Conserver une copie de la demande."
        ]
      },
      {
        title: "Modèle de lettre simple à copier",
        paragraphs: [
          "Voici un exemple de courrier prudent, conçu pour demander l’ouverture d’un échange. Il doit être adapté à votre situation, à votre relation avec l’employeur et au niveau de formalité souhaité.",
          "Ce modèle ne signifie pas que l’employeur est obligé d’accepter. Il sert uniquement à formaliser votre souhait de discuter d’une éventuelle rupture conventionnelle."
        ],
        boxedText: [
          "[Vos nom et prénom]\n[Votre adresse]\n[Votre téléphone]\n[Votre email]",
          "[Nom de l’entreprise]\nÀ l’attention de [Madame/Monsieur ...]\n[Adresse de l’entreprise]",
          "Objet : Demande d’entretien en vue d’échanger sur une éventuelle rupture conventionnelle",
          "Madame, Monsieur,",
          "Salarié(e) de l’entreprise depuis le [date d’entrée] en qualité de [poste occupé], je souhaite solliciter un entretien afin d’échanger avec vous sur la possibilité d’une rupture conventionnelle de mon contrat de travail.",
          "Cette démarche a pour objectif d’ouvrir une discussion dans un cadre serein et constructif. Elle ne préjuge pas de l’issue de nos échanges et suppose naturellement l’accord des deux parties, conformément au principe de la rupture conventionnelle.",
          "Je reste disponible pour convenir d’un rendez-vous à une date qui vous conviendra, afin d’évoquer les conditions éventuelles de cette rupture, son calendrier et les modalités pratiques associées.",
          "Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.",
          "[Signature]"
        ]
      },
      {
        title: "Variante courte par email",
        paragraphs: [
          "L’email peut être adapté lorsque la relation est fluide et que vous souhaitez simplement demander un rendez-vous. Il doit rester bref et éviter les formulations définitives.",
          "Si le contexte est tendu, il peut être utile de demander conseil avant d’envoyer un message trop détaillé."
        ],
        boxedText: [
          "Objet : Demande d’échange",
          "Bonjour [Madame/Monsieur],",
          "Je souhaiterais convenir d’un entretien afin d’échanger sur la possibilité d’une rupture conventionnelle de mon contrat de travail.",
          "Ma démarche vise à ouvrir une discussion constructive, sans préjuger de l’issue de nos échanges, qui supposera naturellement l’accord des deux parties.",
          "Seriez-vous disponible prochainement pour en discuter ?",
          "Bien cordialement,\n[Votre prénom et nom]"
        ]
      },
      {
        title: "Variante après un premier échange oral",
        paragraphs: [
          "Si vous avez déjà évoqué le sujet oralement, le courrier peut servir à confirmer que vous souhaitez poursuivre l’échange. Il est préférable de ne pas présenter l’accord comme acquis tant qu’aucune convention n’est signée et homologuée.",
          "La formulation ci-dessous reste prudente : elle confirme une discussion, sans transformer l’échange oral en engagement définitif."
        ],
        boxedText: [
          "Objet : Suite à notre échange concernant une éventuelle rupture conventionnelle",
          "Madame, Monsieur,",
          "À la suite de notre échange du [date], je vous confirme mon souhait de poursuivre la discussion concernant la possibilité d’une rupture conventionnelle de mon contrat de travail.",
          "Je reste disponible pour convenir d’un nouvel entretien afin d’examiner, dans un cadre serein, les conditions éventuelles de cette rupture, son calendrier et les modalités pratiques associées.",
          "Cette démarche s’inscrit naturellement dans le cadre d’un accord commun entre les parties.",
          "Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.",
          "[Signature]"
        ]
      },
      {
        title: "Ce qu’il vaut mieux éviter d’écrire",
        paragraphs: [
          "Une demande mal formulée peut fragiliser la discussion. Le but n’est pas de régler tout l’historique de la relation de travail dans la lettre, mais d’ouvrir une porte professionnelle.",
          "Les éléments sensibles doivent être traités avec prudence. Si le contexte implique un conflit, une pression, une maladie, une situation disciplinaire ou une rupture déjà imposée, il est préférable de demander un avis spécialisé avant de formaliser."
        ],
        bullets: [
          "Les menaces ou ultimatums.",
          "Les reproches détaillés contre l’employeur ou les collègues.",
          "Une demande de paiement non justifiée ou présentée comme automatique.",
          "Une reconnaissance de faute ou une phrase ambiguë sur votre responsabilité.",
          "Des formulations trop émotionnelles ou agressives.",
          "L’idée que l’employeur serait obligé d’accepter."
        ]
      },
      {
        title: "Courrier, email ou lettre recommandée : que choisir ?",
        paragraphs: [
          "L’email est rapide, simple et souvent suffisant pour demander un entretien lorsque la relation est saine. Il laisse une trace écrite, mais peut sembler moins formel qu’un courrier.",
          "Le courrier simple donne une forme plus professionnelle à la demande, notamment dans les petites structures ou lorsque vous souhaitez garder une formulation posée.",
          "La lettre recommandée permet de dater l’envoi et la réception. Elle peut être utile en contexte sensible, mais elle peut aussi donner une tonalité plus formelle ou tendue. Elle n’est pas obligatoire pour demander une rupture conventionnelle.",
          "Dans tous les cas, le support choisi doit rester cohérent avec votre objectif : ouvrir un échange, pas créer une tension inutile."
        ],
        bullets: [
          "Email : rapide, pratique, adapté aux relations fluides.",
          "Courrier simple : plus posé, utile pour formaliser sans dramatiser.",
          "Lettre recommandée : traçabilité forte, à réserver aux contextes plus sensibles."
        ]
      },
      {
        title: "Que faire après l’envoi ?",
        paragraphs: [
          "Après l’envoi, laissez à l’employeur un délai raisonnable pour répondre. Une relance trop rapide peut être mal perçue. Si un entretien est proposé, préparez les sujets à aborder : date de départ, passation, documents de fin de contrat, indemnité et calendrier.",
          "Avant l’entretien, estimez votre indemnité indicative. Cela vous aide à distinguer le minimum légal, une éventuelle part négociée et les autres sommes qui peuvent être dues, comme les congés payés.",
          "Si l’employeur refuse, la rupture conventionnelle ne peut pas être imposée. Vous pouvez demander les raisons du refus, proposer un autre calendrier ou envisager d’autres options selon votre situation.",
          "Si l’échange avance, vérifiez les délais légaux, notamment le délai de rétractation et la phase d’homologation. La signature d’une convention ne produit pas immédiatement la rupture du contrat."
        ]
      },
      {
        title: "Phrases utiles pour négocier l’indemnité",
        paragraphs: [
          "La négociation gagne à rester factuelle. Évitez de présenter votre demande comme un droit automatique si elle dépasse le minimum applicable. Appuyez-vous plutôt sur votre ancienneté, votre contribution, la passation, le calendrier ou la volonté de trouver une sortie équilibrée.",
          "Voici quelques formulations prudentes à adapter à votre situation."
        ],
        bullets: [
          "« Avant de nous positionner sur un montant, je souhaite vérifier l’indemnité minimale applicable à ma situation. »",
          "« Compte tenu de mon ancienneté et de la passation à organiser, pouvons-nous échanger sur une indemnité supérieure au minimum légal ? »",
          "« Je souhaite que nous abordions le calendrier, les documents de fin de contrat et le montant de l’indemnité dans un cadre clair. »",
          "« Pour préparer l’échange, j’ai réalisé une estimation indicative que je souhaite comparer avec votre proposition. »"
        ]
      },
      {
        title: "Avant d’envoyer votre demande, estimez votre indemnité indicative",
        paragraphs: [
          "Le courrier ouvre la discussion, mais le montant est souvent le point central de l’échange. En quelques informations, le simulateur RuptureConv permet d’obtenir un repère brut minimal et un net indicatif.",
          "Cette estimation ne remplace pas une vérification paie, juridique ou conventionnelle. Elle permet simplement d’arriver mieux préparé et de comparer une proposition réelle avec un ordre de grandeur cohérent."
        ],
        bullets: [
          "Lien utile : /simulateur-rupture-conventionnelle",
          "Guide complémentaire : /negocier-rupture-conventionnelle",
          "Droits après rupture : /rupture-conventionnelle-chomage"
        ]
      },
      {
        title: "Sources officielles à consulter",
        paragraphs: [
          "Pour vérifier le cadre général, vous pouvez consulter les ressources publiques officielles : Service-Public.fr pour la procédure de rupture conventionnelle, Légifrance pour les textes du Code du travail, et France Travail pour les règles générales d’indemnisation chômage.",
          "Ces sources ne remplacent pas l’analyse de votre cas particulier, mais elles permettent de vérifier les grandes étapes et les termes utilisés avant un échange avec l’employeur."
        ]
      }
    ],
    faq: [
      {
        question: "L’employeur est-il obligé d’accepter une demande de rupture conventionnelle ?",
        answer:
          "Non. La rupture conventionnelle repose sur un accord commun entre le salarié et l’employeur. Une lettre ou un email peut ouvrir une discussion, mais aucune des parties n’est obligée d’accepter."
      },
      {
        question: "Peut-on demander une rupture conventionnelle par email ?",
        answer:
          "Oui, un email peut suffire pour demander un entretien ou ouvrir un échange. Il est toutefois conseillé de rester prudent, factuel et de conserver une copie du message envoyé."
      },
      {
        question: "Faut-il envoyer une lettre recommandée ?",
        answer:
          "Ce n’est pas obligatoire pour demander une rupture conventionnelle. La lettre recommandée peut être utile si vous souhaitez une preuve de réception, mais elle peut aussi donner une tonalité plus formelle."
      },
      {
        question: "Peut-on retirer sa demande de rupture conventionnelle ?",
        answer:
          "Tant qu’aucun accord n’est formalisé, une demande d’échange peut en principe être abandonnée. Après signature d’une convention, un délai de rétractation légal existe ; les modalités exactes doivent être vérifiées."
      },
      {
        question: "Peut-on demander une rupture conventionnelle pendant un arrêt maladie ?",
        answer:
          "La situation doit être analysée avec prudence. Certaines ruptures peuvent être possibles, mais il faut vérifier l’absence de pression, le consentement libre et les règles applicables à la situation."
      },
      {
        question: "Que faire si l’employeur refuse ?",
        answer:
          "L’employeur peut refuser. Vous pouvez demander un échange sur les raisons du refus, proposer un autre calendrier ou envisager d’autres options selon votre situation professionnelle."
      },
      {
        question: "Faut-il indiquer un montant d’indemnité dans la lettre ?",
        answer:
          "Ce n’est pas obligatoire. Dans beaucoup de cas, il est plus prudent de demander d’abord un entretien, puis d’aborder le montant après avoir estimé le minimum applicable."
      },
      {
        question: "Cette lettre suffit-elle pour valider la rupture conventionnelle ?",
        answer:
          "Non. La lettre ne fait qu’ouvrir une discussion. La rupture conventionnelle suppose ensuite une procédure, une convention signée, un délai de rétractation et une homologation."
      }
    ],
    conclusion: [
      "Un bon modèle de lettre de rupture conventionnelle doit être clair, prudent et professionnel. Il doit ouvrir une discussion sans présenter l’accord comme acquis ni exercer de pression sur l’employeur.",
      "Avant d’envoyer votre demande, estimez votre indemnité indicative et préparez les points à aborder : calendrier, passation, montant, documents et délais. Vous pourrez ensuite adapter le courrier à votre situation réelle."
    ]
  },
  {
    slug: "rupture-conventionnelle-chomage",
    title: "Rupture conventionnelle chômage : droits ARE",
    h1: "Rupture conventionnelle et chômage",
    description:
      "Rupture conventionnelle et chômage : droits ARE, France Travail, différés d'indemnisation, congés payés, délai d'attente et erreurs.",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/modele-lettre-rupture-conventionnelle",
      "/negocier-rupture-conventionnelle",
      "/rupture-conventionnelle-cdi",
      "/calcul-indemnite-rupture-conventionnelle"
    ],
    intro: [
      "Une rupture conventionnelle peut ouvrir droit à l’assurance chômage lorsque les conditions générales d’indemnisation sont réunies. Elle ne garantit pas automatiquement une indemnisation immédiate : l’inscription, les documents de fin de contrat, les différés et la situation personnelle doivent être vérifiés.",
      "L’enjeu est de comprendre la différence entre le droit potentiel à l’ARE, le point de départ effectif de l’indemnisation et les sommes versées lors de la rupture. Les informations présentées sont générales et indicatives. Elles ne remplacent pas un conseil juridique personnalisé."
    ],
    sections: [
      {
        title: "Rupture conventionnelle et droit au chômage",
        paragraphs: [
          "Contrairement à une démission classique, la rupture conventionnelle homologuée est en principe un mode de rupture qui peut permettre d’ouvrir des droits à l’assurance chômage, sous réserve de remplir les conditions applicables.",
          "Il faut notamment tenir compte de la durée d’activité, de l’inscription auprès de France Travail, de la recherche d’emploi et des règles en vigueur au moment de la fin du contrat. La situation exacte doit toujours être vérifiée avec les documents de fin de contrat."
        ]
      },
      {
        title: "Les étapes après la rupture",
        paragraphs: [
          "Après la rupture, le salarié reçoit généralement les documents de fin de contrat : certificat de travail, reçu pour solde de tout compte et attestation destinée à France Travail. Ces documents servent à instruire le dossier d’indemnisation.",
          "L’inscription auprès de France Travail doit être faite avec attention. Les informations déclarées doivent correspondre aux documents transmis par l’employeur, notamment les dates, les salaires et les sommes versées."
        ],
        bullets: [
          "Vérifier la date réelle de fin de contrat.",
          "Récupérer l’attestation employeur.",
          "Contrôler les indemnités et congés payés.",
          "S’inscrire auprès de France Travail.",
          "Suivre les éventuels différés avant le premier paiement."
        ]
      },
      {
        title: "Différés d’indemnisation et délai d’attente",
        paragraphs: [
          "Même lorsque la rupture conventionnelle peut ouvrir droit à l’ARE, le paiement ne commence pas toujours immédiatement. Il peut exister un délai d’attente et des différés liés notamment aux congés payés ou à certaines indemnités supra-légales.",
          "Le différé lié aux congés payés dépend des indemnités compensatrices versées. Le différé spécifique peut être influencé par les sommes qui dépassent le minimum légal ou conventionnel. Les règles exactes doivent être vérifiées auprès de France Travail."
        ]
      },
      {
        title: "Documents à contrôler avant l’inscription",
        paragraphs: [
          "Avant de finaliser votre dossier, prenez le temps de relire les documents remis par l’employeur. Une erreur sur la date de fin de contrat, le salaire de référence ou la qualification des sommes versées peut ralentir l’instruction du dossier.",
          "L’attestation employeur est particulièrement importante, car elle sert de base à France Travail. Si une information ne correspond pas au solde de tout compte ou à la convention de rupture, il vaut mieux demander une correction rapidement plutôt que découvrir le problème au moment du premier paiement."
        ],
        bullets: [
          "Date de fin de contrat identique sur les documents.",
          "Montant de l’indemnité de rupture clairement identifié.",
          "Congés payés distincts de l’indemnité de rupture.",
          "Derniers salaires cohérents avec les bulletins de paie.",
          "Absence d’erreur sur l’identité ou le numéro de sécurité sociale."
        ]
      },
      {
        title: "Indemnité supra-légale : pourquoi elle compte",
        paragraphs: [
          "Une indemnité supérieure au minimum peut améliorer la sortie financière immédiate, mais elle peut aussi avoir un effet sur le calendrier d’indemnisation chômage. C’est pourquoi il faut regarder à la fois le montant brut versé et le moment où l’ARE pourrait commencer.",
          "La bonne approche consiste à distinguer le minimum obligatoire, la part négociée et les autres sommes dues. Une estimation de l’indemnité de rupture conventionnelle aide à comprendre cette répartition avant de signer."
        ]
      },
      {
        title: "Comparer le montant de départ et le calendrier ARE",
        paragraphs: [
          "Pour prendre une décision éclairée, il ne suffit pas de regarder l’indemnité versée au départ. Il faut aussi se demander quand l’indemnisation pourrait commencer, quelles sommes seront disponibles pendant la période d’attente et si le montant négocié couvre réellement ce délai.",
          "Cette comparaison reste indicative, car RuptureConv ne calcule pas les droits ARE. En revanche, connaître l’indemnité minimale et la part potentiellement négociée permet de préparer des questions plus précises pour France Travail ou pour un accompagnement spécialisé."
        ]
      },
      {
        title: "Exemple simple",
        paragraphs: [
          "Exemple : un salarié signe une rupture conventionnelle avec une indemnité minimale et une indemnité compensatrice de congés payés. Il peut avoir un droit potentiel à l’ARE, mais le début de paiement peut être décalé par les congés payés et le délai d’attente.",
          "Si une part supra-légale importante est négociée, un différé supplémentaire peut s’ajouter selon les règles applicables. Le montant négocié doit donc être comparé à l’effet possible sur le calendrier d’indemnisation."
        ]
      },
      {
        title: "Erreurs fréquentes à éviter",
        paragraphs: [
          "La première erreur consiste à croire que la rupture conventionnelle donne toujours droit à un paiement immédiat. Le droit potentiel et la date de versement effective sont deux sujets différents.",
          "La deuxième erreur est de ne regarder que le net perçu le jour du départ. Il faut aussi prendre en compte les documents de fin de contrat, les congés payés, la part supra-légale et les délais France Travail.",
          "Enfin, il faut éviter de signer sans avoir estimé l’indemnité minimale. Cette estimation permet de vérifier si la proposition respecte au moins le plancher applicable."
        ]
      },
      {
        title: "CTA : estimer avant de comparer",
        paragraphs: [
          "Avant de comparer une proposition de rupture conventionnelle avec vos droits chômage, commencez par estimer l’indemnité indicative. Vous pourrez ensuite mieux distinguer ce qui relève du minimum, de la négociation et des délais d’indemnisation.",
          "Le simulateur RuptureConv fournit une estimation indicative utile pour préparer vos questions, sans remplacer les informations officielles de France Travail."
        ],
        bullets: [
          "Calculer l’indemnité : /simulateur-rupture-conventionnelle",
          "Préparer la négociation : /negocier-rupture-conventionnelle",
          "Formuler une demande : /modele-lettre-rupture-conventionnelle"
        ]
      },
      {
        title: "Sources officielles à consulter",
        paragraphs: [
          "Pour vérifier les règles applicables, consultez les ressources de France Travail, Service-Public.fr et les textes disponibles sur Légifrance. Les règles d’indemnisation peuvent évoluer et dépendent de votre situation.",
          "En cas de doute sur une situation particulière, notamment arrêt maladie, départ contraint, montant supra-légal important ou conflit, un accompagnement spécialisé peut être nécessaire."
        ]
      }
    ],
    faq: [
      {
        question: "La rupture conventionnelle donne-t-elle automatiquement droit au chômage ?",
        answer:
          "Elle peut ouvrir droit à l’assurance chômage si les conditions générales sont réunies. Le droit et la date de paiement doivent être vérifiés auprès de France Travail."
      },
      {
        question: "Quand faut-il s’inscrire à France Travail ?",
        answer:
          "L’inscription se fait après la fin du contrat, avec les documents remis par l’employeur. Il est conseillé de préparer ces documents dès la signature de la rupture."
      },
      {
        question: "Qu’est-ce qu’un différé d’indemnisation ?",
        answer:
          "C’est une période pendant laquelle l’indemnisation ne commence pas encore, notamment en raison de congés payés ou de certaines indemnités supra-légales."
      },
      {
        question: "L’indemnité supra-légale retarde-t-elle le chômage ?",
        answer:
          "Elle peut influencer un différé spécifique selon les règles applicables. Il faut vérifier le calcul avec France Travail."
      },
      {
        question: "Les congés payés ont-ils un impact ?",
        answer:
          "Une indemnité compensatrice de congés payés peut créer un différé avant le début de l’indemnisation."
      },
      {
        question: "Le simulateur calcule-t-il mes droits ARE ?",
        answer:
          "Non. Il estime l’indemnité de rupture conventionnelle. Les droits ARE doivent être vérifiés avec France Travail."
      },
      {
        question: "Que faire si l’attestation employeur contient une erreur ?",
        answer:
          "Il faut demander une correction à l’employeur, car France Travail s’appuie sur ces informations pour instruire le dossier."
      }
    ],
    conclusion: [
      "La rupture conventionnelle peut être compatible avec une indemnisation chômage, mais le calendrier dépend des règles France Travail, des documents remis et des sommes versées.",
      "Avant de signer, estimez votre indemnité, vérifiez les éventuels différés et conservez une lecture prudente de votre situation."
    ]
  },
  {
    slug: "negocier-rupture-conventionnelle",
    title: "Négocier rupture conventionnelle : méthode",
    h1: "Négocier une rupture conventionnelle",
    description:
      "Comment négocier une rupture conventionnelle : indemnité minimale, arguments, calendrier, montant supra-légal, entretien et erreurs à éviter.",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/modele-lettre-rupture-conventionnelle",
      "/rupture-conventionnelle-chomage",
      "/calcul-indemnite-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle"
    ],
    intro: [
      "Négocier une rupture conventionnelle ne consiste pas seulement à demander un montant plus élevé. Il faut comprendre le minimum applicable, préparer ses arguments, rester professionnel et proposer un cadre de discussion réaliste.",
      "Une négociation réussie repose sur des données vérifiées : ancienneté, salaire de référence, calendrier, passation, convention collective et éventuelle indemnité supra-légale. Les informations présentées sont générales et indicatives. Elles ne remplacent pas un conseil juridique personnalisé."
    ],
    sections: [
      {
        title: "Pourquoi préparer la négociation ?",
        paragraphs: [
          "La rupture conventionnelle suppose un accord entre le salarié et l’employeur. Chacun peut accepter, refuser ou proposer d’autres conditions. Arriver avec une méthode permet de réduire les malentendus et de discuter sur des bases concrètes.",
          "La préparation permet aussi d’éviter deux excès : demander un montant sans justification ou accepter trop vite une proposition sans vérifier le minimum applicable."
        ]
      },
      {
        title: "Connaître son indemnité minimale",
        paragraphs: [
          "Avant de négocier une indemnité supérieure, il faut connaître le minimum. Ce plancher dépend principalement de l’ancienneté et du salaire brut de référence, avec une règle qui distingue les dix premières années et les années au-delà.",
          "La convention collective peut prévoir une règle plus favorable. Les primes, variables, absences ou changements récents de rémunération peuvent aussi influencer la base de calcul."
        ],
        bullets: [
          "Date d’entrée exacte.",
          "Date de rupture envisagée.",
          "Salaire brut de référence.",
          "Primes et variables régulières.",
          "Convention collective applicable."
        ]
      },
      {
        title: "Identifier ses arguments",
        paragraphs: [
          "Une demande d’indemnité supra-légale doit être présentée avec mesure. Les arguments peuvent concerner l’ancienneté, la contribution au poste, la passation, un calendrier favorable à l’entreprise ou la volonté de conclure un accord serein.",
          "Évitez les arguments flous ou agressifs. Une phrase factuelle est souvent plus efficace qu’un reproche détaillé. L’objectif est de montrer pourquoi une enveloppe plus élevée peut être équilibrée pour les deux parties."
        ]
      },
      {
        title: "Préparer une fourchette de négociation",
        paragraphs: [
          "Une négociation sérieuse se prépare souvent avec une fourchette plutôt qu’un seul chiffre. Le bas de la fourchette correspond au minimum que vous ne souhaitez pas franchir, tandis que le haut représente votre demande argumentée.",
          "Cette méthode permet de garder une marge de discussion sans improviser. Elle évite aussi de confondre le minimum légal, le montant souhaité et le montant réellement acceptable selon votre situation."
        ],
        bullets: [
          "Un montant plancher basé sur l’estimation minimale.",
          "Un montant cible justifié par vos arguments.",
          "Une marge de discussion réaliste.",
          "Les points non financiers à négocier : date, passation, congés, documents."
        ]
      },
      {
        title: "Négocier l’indemnité supra-légale",
        paragraphs: [
          "L’indemnité supra-légale correspond à la part qui dépasse le minimum obligatoire. Elle n’est pas automatique : elle dépend du contexte, de l’accord des parties et de la capacité à présenter une demande cohérente.",
          "Il est prudent de la formuler comme une proposition de sortie équilibrée, et non comme une exigence. Vous pouvez lier cette demande à une passation organisée, à une date de départ compatible avec l’activité ou à la volonté d’éviter une situation conflictuelle."
        ]
      },
      {
        title: "Proposer un calendrier réaliste",
        paragraphs: [
          "Le calendrier compte autant que le montant. Une date de départ trop rapide peut inquiéter l’employeur ; une date trop lointaine peut être incompatible avec votre projet. Préparez une proposition qui tient compte de la passation, des congés restants et de l’homologation.",
          "Un calendrier clair peut devenir un argument de négociation : vous facilitez la transition, l’entreprise sécurise l’organisation, et les échanges sont plus simples."
        ]
      },
      {
        title: "Exemple de discussion",
        paragraphs: [
          "Exemple : « J’aimerais que nous échangions sur une rupture conventionnelle dans un cadre serein. J’ai préparé une estimation indicative du minimum applicable et je souhaiterais discuter du calendrier, de la passation et d’une indemnité tenant compte de mon ancienneté. »",
          "Cette formulation reste prudente : elle n’impose pas l’accord, ne menace pas l’employeur et ouvre plusieurs sujets concrets."
        ]
      },
      {
        title: "Erreurs à éviter",
        paragraphs: [
          "La principale erreur est de commencer par un ultimatum. Une rupture conventionnelle exige un accord ; une pression trop forte peut bloquer la discussion ou fragiliser le dossier.",
          "Évitez aussi de négocier sans connaître le minimum légal, de confondre brut et net, ou de négliger l’impact possible sur l’indemnisation chômage."
        ],
        bullets: [
          "Arriver sans estimation.",
          "Demander un montant sans justification.",
          "Confondre minimum légal et montant négocié.",
          "Oublier les congés payés et documents de fin de contrat.",
          "Présenter la rupture comme déjà décidée."
        ]
      },
      {
        title: "Checklist avant entretien",
        paragraphs: [
          "Avant l’entretien, préparez une fiche simple avec vos dates, votre salaire, votre estimation, vos arguments et vos questions. Cela évite de se perdre dans l’émotion ou dans des demandes imprécises.",
          "Si la situation est conflictuelle ou si vous ressentez une pression, prenez le temps de vérifier vos options avant de signer."
        ],
        bullets: [
          "Faire une estimation indicative de l’indemnité.",
          "Lister les points à négocier.",
          "Préparer un calendrier souhaité.",
          "Vérifier la convention collective.",
          "Relire les conséquences chômage.",
          "Préparer une formulation écrite prudente."
        ]
      },
      {
        title: "Après l’entretien : formaliser sans précipitation",
        paragraphs: [
          "Après un premier échange, évitez de considérer l’accord comme acquis tant que rien n’est signé et homologué. Reformulez les points évoqués, vérifiez les montants, relisez le calendrier et demandez les précisions nécessaires avant d’avancer.",
          "Si une proposition chiffrée vous est faite, comparez-la à votre estimation et distinguez le minimum, la part supra-légale, les congés payés et les éventuelles conséquences sur le chômage. Cette étape limite les mauvaises surprises au moment du solde de tout compte."
        ]
      },
      {
        title: "CTA : calculer avant de négocier",
        paragraphs: [
          "Le simulateur permet d’obtenir un repère utile avant l’entretien. Il ne remplace pas une vérification personnalisée, mais il aide à discuter avec des chiffres plus clairs.",
          "Une fois le minimum estimé, vous pouvez comparer une proposition, préparer une contre-proposition et vérifier si une indemnité supra-légale mérite d’être discutée."
        ],
        bullets: [
          "Calculer l’indemnité : /simulateur-rupture-conventionnelle",
          "Modèle de lettre RC : /modele-lettre-rupture-conventionnelle",
          "Droits chômage : /rupture-conventionnelle-chomage"
        ]
      }
    ],
    faq: [
      {
        question: "Peut-on négocier une indemnité plus élevée ?",
        answer:
          "Oui, une indemnité supérieure au minimum peut être négociée si les deux parties l’acceptent. Elle doit être distinguée du minimum légal ou conventionnel."
      },
      {
        question: "L’employeur peut-il refuser une rupture conventionnelle ?",
        answer:
          "Oui. La rupture conventionnelle repose sur un accord commun. L’employeur comme le salarié peuvent refuser."
      },
      {
        question: "Faut-il annoncer un montant dès le premier échange ?",
        answer:
          "Pas toujours. Il peut être préférable d’ouvrir d’abord la discussion, puis d’aborder le montant après avoir estimé le minimum applicable."
      },
      {
        question: "Quels arguments utiliser ?",
        answer:
          "Les arguments les plus solides sont factuels : ancienneté, passation, calendrier, contribution au poste, contexte de sortie et volonté de sécuriser l’accord."
      },
      {
        question: "Le montant se négocie-t-il en brut ou en net ?",
        answer:
          "Le minimum se raisonne en brut. Le net indicatif peut aider à comprendre ce qui pourrait être perçu, mais il reste une estimation."
      },
      {
        question: "La convention collective peut-elle changer le montant ?",
        answer:
          "Oui. Certaines conventions peuvent prévoir des règles plus favorables. Il faut vérifier le texte applicable avant de signer."
      },
      {
        question: "Que faire en cas de pression ?",
        answer:
          "Il faut être prudent. Une rupture conventionnelle suppose un consentement libre. En cas de pression ou de conflit, un accompagnement spécialisé peut être nécessaire."
      }
    ],
    conclusion: [
      "Négocier une rupture conventionnelle demande de la méthode : connaître le minimum, préparer ses arguments, rester professionnel et vérifier les conséquences pratiques.",
      "Le simulateur RuptureConv vous aide à obtenir un premier repère chiffré avant l’entretien, à comparer une proposition et à préparer une discussion plus sereine."
    ]
  }
];

function buildSeniorityPage(years: number): PillarPage {
  const salary = years % 3 === 0 ? 2400 : years % 3 === 1 ? 2800 : 3200;
  const amount = calculateMinimumIndemnity(years, salary);
  const yearsLabel = `${years} ${years === 1 ? "an" : "ans"}`;
  const wording =
    years <= 10
      ? "la règle du quart de mois par année s'applique sur toute la période"
      : "les dix premières années se calculent au quart de mois, puis les années suivantes au tiers de mois";

  return {
    slug: `indemnite-rupture-conventionnelle-${years}-ans`,
    title: `Indemnité de rupture conventionnelle après ${yearsLabel}`,
    h1: `Indemnité de rupture conventionnelle après ${yearsLabel} d’ancienneté`,
    description: `Estimez l'indemnité de rupture conventionnelle pour ${yearsLabel} d'ancienneté avec calcul, simulateur gratuit 2026 et exemple chiffré.`,
    relatedLinks: requiredInternalLinks,
    intro: [
      `Vous avez ${yearsLabel} d'ancienneté et vous voulez estimer le montant possible ? Le calcul dépend surtout du salaire brut de référence, des dates retenues et du minimum légal applicable.`,
      `Dans ce cas, ${wording}. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Comprendre le montant",
        paragraphs: [
          `Avec ${yearsLabel} d'ancienneté, le montant minimum est calculé en multipliant le salaire brut de référence par la fraction de mois applicable. Les primes régulières et la convention collective peuvent améliorer le montant.`,
          "Le résultat doit être distingué du net indicatif et d'une éventuelle part négociée au-delà du minimum."
        ]
      },
      {
        title: "Exemple concret",
        paragraphs: [
          `Exemple : avec ${yearsLabel} d'ancienneté et ${formatEuro(salary)} bruts mensuels, le minimum indicatif est d'environ ${formatEuro(amount)} bruts.`,
          "Refaites le calcul avec votre propre salaire pour obtenir une estimation plus pertinente."
        ]
      }
    ],
    faq: commonFaq.slice(0, 3),
    conclusion: [
      `Pour ${yearsLabel} d'ancienneté, la qualité du calcul dépend surtout du salaire brut retenu et de la vérification conventionnelle.`,
      "Le simulateur permet de tester rapidement votre situation réelle."
    ]
  };
}

function buildSalaryPage(salary: number): PillarPage {
  const years = salary % 400 === 0 ? 8 : salary % 300 === 0 ? 10 : 6;
  const amount = calculateMinimumIndemnity(years, salary);
  const variant =
    salary < 2000
      ? "sur un salaire modéré, chaque année d'ancienneté pèse fortement dans le montant final"
      : salary < 3500
        ? "le salaire de référence donne un repère central pour préparer la négociation"
        : "avec un salaire élevé, les primes et variables doivent être vérifiés avec attention";

  return {
    slug: `indemnite-rupture-conventionnelle-salaire-${salary}`,
    title: `Indemnité de rupture conventionnelle avec un salaire de ${salary}€`,
    h1: `Indemnité de rupture conventionnelle avec un salaire de ${salary}€`,
    description: `Calculez une indemnité de rupture conventionnelle avec un salaire de ${salary} euros grâce au simulateur gratuit 2026 et à un exemple clair.`,
    relatedLinks: requiredInternalLinks,
    intro: [
      `Vous souhaitez estimer une indemnité à partir d'un salaire brut mensuel de ${formatEuro(salary)} ? Le montant dépend aussi de l'ancienneté, de la convention collective et des éléments variables de rémunération.`,
      `Dans cette hypothèse, ${variant}. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Comprendre le montant",
        paragraphs: [
          `Le salaire de ${formatEuro(salary)} sert de base au calcul minimal si c'est le salaire brut de référence pertinent. Il faut ensuite appliquer la règle d'ancienneté : un quart de mois par année jusqu'à dix ans, puis un tiers au-delà.`,
          "Si des primes régulières existent, elles peuvent modifier la base. Le simulateur aide à tester plusieurs hypothèses sans modifier la logique légale."
        ]
      },
      {
        title: "Exemple concret",
        paragraphs: [
          `Exemple : avec ${years} ans d'ancienneté et ${formatEuro(salary)} bruts mensuels, le minimum indicatif est d'environ ${formatEuro(amount)} bruts.`,
          "Ce montant doit ensuite être comparé à la convention collective et à l'éventuel montant négocié."
        ]
      }
    ],
    faq: commonFaq.slice(0, 3),
    conclusion: [
      `Avec un salaire de ${formatEuro(salary)}, l'estimation devient utile dès lors que l'ancienneté est exacte et que les primes sont correctement identifiées.`,
      "La simulation reste le moyen le plus rapide pour obtenir un montant personnalisé."
    ]
  };
}

const programmaticSeniorityPages: PillarPage[] = Array.from(
  { length: 40 },
  (_, index) => buildSeniorityPage(index + 1)
);

const programmaticSalaryPages: PillarPage[] = Array.from(
  { length: 39 },
  (_, index) => buildSalaryPage(1200 + index * 100)
);

const eeatPages: PillarPage[] = [
  {
    slug: "a-propos",
    title: "Calcul rupture conventionnelle : à propos du simulateur 2026",
    h1: "À propos",
    description:
      "RuptureConv aide à rendre le calcul de rupture conventionnelle plus clair, prudent et accessible en 2026.",
    relatedLinks: requiredInternalLinks,
    intro: [
      `${siteName} aide les salariés, employeurs et responsables RH à comprendre les montants liés à une rupture conventionnelle en CDI.`,
      `Le site fournit des estimations pédagogiques, des exemples et des guides pratiques mis à jour pour 2026. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Notre approche",
        paragraphs: [
          "Les contenus privilégient une méthode simple : expliquer le minimum légal, montrer des exemples et rappeler les limites d'une estimation en ligne.",
          "Les pages sont conçues pour préparer une discussion RH, pas pour remplacer une consultation personnalisée."
        ]
      },
      {
        title: "Mise à jour 2026",
        paragraphs: [
          "Les contenus et simulateurs sont structurés pour rester cohérents avec les règles générales du Code du travail applicables à l'indemnité de rupture conventionnelle.",
          "Les situations particulières doivent toujours être vérifiées avec les textes applicables, la convention collective et les données de paie."
        ]
      }
    ],
    faq: commonFaq.slice(0, 3),
    conclusion: [
      "RuptureConv vise une information claire, prudente et utile pour préparer une rupture conventionnelle.",
      "Le simulateur reste indicatif et doit être complété par une vérification personnalisée si nécessaire."
    ]
  },
  {
    slug: "sources-juridiques",
    title: "Méthodologie des estimations et sources officielles",
    h1: "Méthodologie des estimations",
    description:
      "Comprendre ce que les simulateurs estiment, leurs limites et les sources officielles utilisées comme repères.",
    updatedAt: "2026-07-02",
    updatedLabel: "Dernière vérification de la méthodologie : 2 juillet 2026",
    relatedLinks: requiredInternalLinks,
    intro: [
      "Les simulateurs donnent des repères pour mieux comprendre une situation. Ils ne remplacent pas l’analyse d’un dossier complet ni la réponse d’un organisme compétent.",
      "La méthode est expliquée ici pour que vous puissiez comprendre les grandes étapes du calcul, les hypothèses retenues et les vérifications qui restent nécessaires."
    ],
    sections: [
      {
        title: "À quoi servent les simulateurs ?",
        paragraphs: [
          "Ils transforment des informations saisies en une estimation lisible : indemnité de rupture, projection chômage ou conversion d’un salaire brut en net.",
          "L’objectif est de fournir une première base de compréhension avant de relire les documents utiles ou d’échanger avec l’employeur, France Travail ou un professionnel compétent."
        ]
      },
      {
        title: "Ce que les calculs prennent en compte",
        paragraphs: [
          "Selon l’outil, le calcul utilise les dates, l’ancienneté, le salaire brut, le statut, le temps de travail ou les indemnités renseignées. Les résultats suivent ensuite les hypothèses générales décrites sur la page concernée.",
          "Aucune donnée saisie ne permet toutefois de reconstituer l’ensemble d’un contrat, d’un bulletin de paie, d’une convention collective ou d’un dossier France Travail."
        ]
      },
      {
        title: "Pourquoi les résultats restent indicatifs",
        paragraphs: [
          "Le résultat dépend directement des informations saisies. Une date inexacte, une prime oubliée, une période non travaillée ou une règle conventionnelle plus favorable peut modifier le montant.",
          "Pour le chômage, France Travail détermine les rémunérations retenues, les différés et la situation au moment de l’inscription. Pour le salaire net, le bulletin réel peut intégrer des cotisations et avantages que le calcul simplifié ne connaît pas."
        ]
      },
      {
        title: "Ce que les calculs ne remplacent pas",
        paragraphs: [
          "Une estimation ne vaut ni décision de l’employeur, ni ouverture de droits par France Travail, ni validation d’un bulletin de paie. Elle ne constitue pas non plus un conseil juridique personnalisé.",
          "Elle sert à repérer les points à vérifier et à préparer des questions plus précises."
        ]
      },
      {
        title: "Quand vérifier votre situation",
        paragraphs: [
          "Une vérification adaptée est particulièrement utile avant de signer, lorsque la rémunération est variable, en présence d’une absence longue, d’un temps partiel, d’une convention collective particulière ou d’une indemnité négociée importante.",
          "Pour une projection ARE, comparez toujours l’estimation avec la notification et le calendrier communiqués par France Travail. Pour le brut-net, le bulletin de paie reste le document de référence pour le montant réellement versé."
        ]
      }
    ],
    faq: commonFaq.slice(0, 3),
    conclusion: [
      "Les sources officielles donnent le cadre général. Le résultat final dépend toujours des informations et des vérifications propres au dossier.",
      "Utilisez l’estimation comme un repère, puis vérifiez les éléments qui peuvent modifier votre situation."
    ]
  }
];

const reform2026Pages: PillarPage[] = [
  {
    slug: "reforme-rupture-conventionnelle-2026",
    title: "Réforme rupture conventionnelle 2026 : ce qui change pour le chômage",
    h1: "Réforme rupture conventionnelle 2026 : ce qui change pour le chômage",
    description:
      "La rupture conventionnelle donne-t-elle toujours droit au chômage en 2026 ? Durée réduite, salariés de moins de 55 ans, seniors, employeurs : le point clair sur la réforme.",
    updatedAt: "2026-06-03",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: reform2026RelatedLinks,
    intro: [
      "La réforme 2026 ne signe pas la fin de la rupture conventionnelle. Elle ne supprime pas non plus l'indemnité spécifique. Le changement principal annoncé concerne la durée maximale d'indemnisation chômage après une rupture conventionnelle individuelle.",
      "À la date du 3 juin 2026, le Parlement a définitivement adopté le texte transposant l'avenant n°3 du 25 février 2026 relatif à l'assurance chômage. Le contenu doit toutefois rester prudent jusqu'à la publication au Journal officiel et aux textes d'application ou d'agrément.",
      reform2026Disclaimer
    ],
    sections: [
      {
        title: "Ce qui change vraiment",
        paragraphs: [
          "La réforme vise principalement la durée maximale pendant laquelle une personne peut être indemnisée par l'assurance chômage après une rupture conventionnelle individuelle, lorsque les conditions d'ouverture de droits sont remplies.",
          "Pour les salariés de moins de 55 ans en métropole, la durée maximale annoncée passerait de 18 mois à 15 mois. Pour les salariés seniors concernés, la durée maximale serait réduite à 20,5 mois. Des durées spécifiques sont prévues pour l'outre-mer hors Mayotte."
        ],
        bullets: [
          "Durée maximale d'indemnisation réduite pour les moins de 55 ans.",
          "Durée maximale également réduite pour les salariés seniors concernés.",
          "Accompagnement renforcé par France Travail annoncé.",
          "Durées particulières pour l'outre-mer hors Mayotte.",
          "Entrée en vigueur concrète à vérifier avec les textes publiés."
        ]
      },
      {
        title: "Ce qui ne change pas",
        paragraphs: [
          "La rupture conventionnelle homologuée continue de pouvoir ouvrir droit au chômage si les conditions habituelles sont réunies. Il ne faut donc pas écrire ou retenir que la rupture conventionnelle ne donne plus droit au chômage.",
          "L'indemnité spécifique de rupture conventionnelle reste due. Son minimum continue de dépendre notamment de l'ancienneté, du salaire de référence et, le cas échéant, d'une convention collective plus favorable."
        ],
        bullets: [
          "Le principe d'ouverture possible des droits au chômage est maintenu.",
          "L'indemnité minimale n'est pas supprimée.",
          "La procédure de rupture conventionnelle reste encadrée.",
          "Les différés France Travail et les documents de fin de contrat restent à vérifier."
        ]
      },
      {
        title: "Avant / après réforme 2026",
        paragraphs: [
          "Le tableau ci-dessous résume les principaux repères connus au 3 juin 2026. Il simplifie volontairement la lecture et doit être vérifié avec les textes d'application et les règles France Travail à jour."
        ],
        table: {
          headers: ["Situation", "Avant", "Après réforme annoncée"],
          rows: [
            ["Moins de 55 ans en métropole", "18 mois maximum", "15 mois maximum"],
            [
              "55 ans et plus / seniors concernés",
              "22,5 mois ou 27 mois selon les cas",
              "20,5 mois maximum annoncé"
            ],
            [
              "Outre-mer hors Mayotte",
              "Durées spécifiques selon les règles applicables",
              "20 mois ou 30 mois selon l'âge"
            ],
            [
              "Droit au chômage après rupture conventionnelle",
              "Possible sous conditions",
              "Toujours possible sous conditions"
            ],
            [
              "Indemnité minimale de rupture",
              "Minimum légal ou conventionnel",
              "Pas de suppression annoncée"
            ]
          ]
        }
      },
      {
        title: "Cas des salariés de moins de 55 ans",
        paragraphs: [
          "Pour un salarié de moins de 55 ans, le point de vigilance principal devient la durée maximale d'indemnisation. Le droit peut exister, mais la période maximale couverte serait plus courte qu'auparavant.",
          "Exemple : un salarié de 42 ans qui signe une rupture conventionnelle peut toujours faire examiner ses droits par France Travail. En revanche, la durée maximale annoncée serait de 15 mois, sous réserve de son dossier et des textes applicables."
        ]
      },
      {
        title: "Cas des salariés de 55 ans et plus",
        paragraphs: [
          "Pour les salariés seniors, la réforme réduit aussi la durée maximale annoncée. Le sujet doit être traité avec prudence, car l'âge exact, la date de rupture, les règles d'affiliation et les textes d'application peuvent changer l'analyse.",
          "Avant de signer une rupture conventionnelle proche de 55 ans ou après 55 ans, il est conseillé de vérifier séparément le montant de l'indemnité, le calendrier de départ, les droits France Travail et la situation retraite."
        ]
      },
      {
        title: "Cas de l'outre-mer hors Mayotte",
        paragraphs: [
          "Les informations disponibles prévoient des durées spécifiques pour l'outre-mer hors Mayotte : 20 mois ou 30 mois selon l'âge. Cette mention doit être maniée avec prudence, car le territoire, l'âge et les textes applicables peuvent modifier le résultat.",
          "Pour une situation en outre-mer, il est préférable de vérifier les règles auprès de France Travail et des sources officielles au moment de la fin du contrat."
        ]
      },
      {
        title: "Impact pour les salariés",
        paragraphs: [
          "Le premier impact est pratique : si la durée maximale d'indemnisation baisse, la transition professionnelle doit être préparée avec davantage d'anticipation. Cela ne signifie pas que les droits disparaissent, mais que le calendrier peut devenir plus contraint.",
          "Le bon réflexe reste de distinguer trois sujets : l'indemnité versée à la rupture, le droit potentiel à l'ARE et le début effectif du paiement après les éventuels différés."
        ]
      },
      {
        title: "Impact pour les employeurs",
        paragraphs: [
          "Pour l'employeur, la réforme chômage ne modifie pas le minimum d'indemnité à verser au salarié. En revanche, le coût global doit être regardé avec la contribution patronale spécifique sur les indemnités de rupture conventionnelle et de mise à la retraite, portée à 40 % au 1er janvier 2026 sur la part exonérée de cotisations sociales.",
          "Le dossier doit aussi rester clair pour éviter une mauvaise information du salarié : la rupture conventionnelle n'est pas privée de chômage, mais la durée maximale d'indemnisation peut être réduite."
        ]
      },
      {
        title: "Impact sur le calcul de l'indemnité",
        paragraphs: [
          "La réforme 2026 ne change pas le calcul de l'indemnité minimale de rupture conventionnelle. Le simulateur RuptureConv continue donc d'estimer le minimum brut à partir de l'ancienneté et du salaire de référence.",
          "En pratique, il faut continuer à vérifier la convention collective, les primes, les absences, la date de rupture et la part éventuellement négociée au-delà du minimum."
        ]
      },
      {
        title: "Exemple concret",
        paragraphs: [
          "Une salariée de 38 ans avec 6 ans d'ancienneté et 2 500 euros bruts mensuels peut estimer son indemnité minimale avec la formule habituelle : 2 500 x 1/4 x 6, soit 3 750 euros bruts avant vérification conventionnelle.",
          "La réforme ne retire pas cette indemnité. Le changement se situe plutôt du côté de la durée maximale d'indemnisation chômage, qui serait de 15 mois pour un profil de moins de 55 ans en métropole, sous réserve des règles applicables."
        ]
      },
      {
        title: "À retenir",
        paragraphs: [
          "La bonne lecture est simple : l'indemnité minimale reste à calculer comme avant, l'ouverture possible au chômage est maintenue sous conditions, mais la durée maximale d'indemnisation annoncée baisse.",
          "Avant une signature en 2026, vérifiez donc à la fois le montant de rupture, le coût employeur éventuel, les textes de publication et les règles France Travail à jour."
        ],
        bullets: [
          "La rupture conventionnelle continue de pouvoir ouvrir droit au chômage.",
          "La durée maximale d'indemnisation serait réduite.",
          "L'indemnité minimale n'est pas supprimée.",
          "Les employeurs doivent intégrer la contribution patronale spécifique de 40 %.",
          "Le simulateur reste utile pour le calcul de l'indemnité, pas pour calculer les droits ARE."
        ]
      },
      {
        title: "Sources officielles à vérifier",
        paragraphs: [
          "Cette page est fondée sur les sources officielles et institutionnelles disponibles au 3 juin 2026. Les règles doivent être revérifiées avant mise en production définitive et après publication des textes attendus."
        ],
        bullets: reformSourceBullets
      }
    ],
    faq: reform2026Faq,
    conclusion: [
      "La réforme 2026 doit être expliquée sans dramatiser : elle réduit la durée maximale d'indemnisation chômage annoncée, mais elle ne supprime ni le principe d'un droit possible au chômage, ni le minimum d'indemnité de rupture conventionnelle.",
      "Pour une décision concrète, estimez l'indemnité avec vos chiffres, puis vérifiez les droits France Travail selon la date exacte de rupture et les textes publiés."
    ]
  },
  {
    slug: "rupture-conventionnelle-chomage-2026",
    title: "Rupture conventionnelle et chômage en 2026",
    h1: "La rupture conventionnelle donne-t-elle encore droit au chômage en 2026 ?",
    description:
      "Rupture conventionnelle et chômage en 2026 : droit maintenu sous conditions, durée maximale réduite, salariés de moins de 55 ans et points à vérifier.",
    updatedAt: "2026-06-03",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: reform2026RelatedLinks,
    intro: [
      "Oui, une rupture conventionnelle peut encore ouvrir droit au chômage en 2026 si les conditions habituelles sont remplies. La réforme annoncée ne supprime pas ce principe.",
      "Le changement à retenir concerne surtout la durée maximale d'indemnisation : elle serait réduite pour les moins de 55 ans et pour les salariés seniors concernés. Il faut toutefois vérifier l'entrée en vigueur concrète avec les textes publiés.",
      reform2026Disclaimer
    ],
    sections: [
      {
        title: "Le droit au chômage reste possible",
        paragraphs: [
          "La rupture conventionnelle homologuée reste un mode de rupture qui peut permettre une indemnisation par France Travail. Le salarié doit toutefois remplir les conditions générales : affiliation suffisante, inscription, recherche d'emploi et dossier conforme.",
          "Il ne faut donc pas confondre deux choses : le principe d'ouverture possible des droits, qui reste maintenu, et la durée maximale d'indemnisation, qui est le point visé par la réforme."
        ]
      },
      {
        title: "Ce qui change en 2026",
        paragraphs: [
          "Pour les moins de 55 ans, la durée maximale annoncée passerait à 15 mois en métropole. Pour les salariés de 55 ans et plus concernés, la durée maximale serait réduite à 20,5 mois.",
          "Ces repères doivent être confirmés selon la date de rupture, les textes d'application, l'agrément et les informations France Travail à jour."
        ],
        table: {
          headers: ["Profil", "Repère annoncé 2026", "À vérifier"],
          rows: [
            ["Moins de 55 ans", "15 mois maximum", "Date de fin de contrat et droits ouverts"],
            ["55 ans et plus", "20,5 mois maximum", "Âge exact et règles applicables"],
            ["Outre-mer hors Mayotte", "20 ou 30 mois", "Territoire, âge et textes publiés"]
          ]
        }
      },
      {
        title: "Exemple simple pour un salarié inquiet",
        paragraphs: [
          "Un salarié de 45 ans signe une rupture conventionnelle en 2026. Il peut toujours faire examiner ses droits au chômage après la fin du contrat, avec l'attestation employeur et son inscription France Travail.",
          "La différence est que la durée maximale annoncée serait plus courte : 15 mois au lieu de 18 mois en métropole, si les textes applicables confirment ce régime pour sa date de rupture."
        ]
      },
      {
        title: "Ce que la réforme ne change pas",
        paragraphs: [
          "La réforme ne supprime pas l'indemnité spécifique de rupture conventionnelle. Elle ne modifie pas non plus le besoin de vérifier le salaire de référence, l'ancienneté, les congés payés et la convention collective.",
          "Une indemnité supra-légale peut toujours avoir un effet sur les différés d'indemnisation. Ce point reste distinct de la durée maximale totale."
        ]
      },
      {
        title: "Avant de signer",
        paragraphs: [
          "Avant de signer, estimez l'indemnité minimale, relisez le calendrier, vérifiez les documents de fin de contrat et posez explicitement la question de vos droits à France Travail.",
          "Le simulateur RuptureConv aide à estimer l'indemnité de rupture. Il ne calcule pas les droits ARE, qui doivent être vérifiés auprès des sources officielles."
        ],
        bullets: [
          "Simuler l'indemnité : /simulateur-rupture-conventionnelle",
          "Lire le guide réforme : /reforme-rupture-conventionnelle-2026",
          "Préparer une demande : /modele-lettre-rupture-conventionnelle",
          "Comprendre les différés : /rupture-conventionnelle-chomage"
        ]
      },
      {
        title: "Sources officielles à vérifier",
        paragraphs: [
          "La situation doit être suivie après publication au Journal officiel et mise à jour des fiches France Travail, Service-Public.fr ou Unédic."
        ],
        bullets: reformSourceBullets
      }
    ],
    faq: reform2026Faq.slice(0, 6),
    conclusion: [
      "La réponse rassurante est oui : la rupture conventionnelle peut encore ouvrir droit au chômage en 2026. La réponse prudente est qu'il faut vérifier la durée maximale applicable à votre date de rupture.",
      "Ne signez pas uniquement sur une idée générale de la réforme : séparez l'indemnité, les droits chômage, les différés et les textes applicables."
    ]
  },
  {
    slug: "rupture-conventionnelle-senior-55-ans-2026",
    title: "Rupture conventionnelle senior 55 ans 2026",
    h1: "Rupture conventionnelle après 55 ans : ce que la réforme change pour le chômage",
    description:
      "Rupture conventionnelle après 55 ans en 2026 : durée maximale d'indemnisation réduite, droit au chômage maintenu sous conditions et prudence avant signature.",
    updatedAt: "2026-06-03",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: reform2026RelatedLinks,
    intro: [
      "Après 55 ans, une rupture conventionnelle doit être préparée avec une attention particulière : indemnité, chômage, retraite, calendrier et documents de fin de contrat se répondent.",
      "La réforme 2026 ne supprime pas le droit possible au chômage, mais elle réduit la durée maximale annoncée pour les salariés seniors concernés. Les règles exactes doivent être vérifiées selon l'âge, la date de rupture et les textes applicables.",
      reform2026Disclaimer
    ],
    sections: [
      {
        title: "Ce qui change pour les seniors",
        paragraphs: [
          "La durée maximale d'indemnisation des salariés seniors concernés serait ramenée à 20,5 mois. Cette baisse doit être comparée aux durées antérieures de 22,5 mois ou 27 mois selon les cas.",
          "La situation d'un salarié proche de 55 ans ou au-delà de 55 ans doit rester individualisée. Un mois de différence, une date de fin de contrat ou un texte d'application peuvent modifier la lecture."
        ],
        table: {
          headers: ["Sujet", "Repère prudent"],
          rows: [
            ["Droit au chômage", "Maintenu sous conditions"],
            ["Durée maximale annoncée", "20,5 mois pour les seniors concernés"],
            ["Indemnité minimale", "Non supprimée par la réforme"],
            ["Retraite", "À vérifier séparément selon la situation"]
          ]
        }
      },
      {
        title: "Exemple de situation",
        paragraphs: [
          "Un salarié de 57 ans avec 18 ans d'ancienneté envisage une rupture conventionnelle. Il doit d'abord estimer son indemnité minimale avec la règle habituelle, puis vérifier s'il existe une règle conventionnelle plus favorable.",
          "Ensuite seulement, il doit regarder les droits France Travail, la durée maximale applicable, les éventuels différés et le lien avec son calendrier retraite. La réforme chômage ne remplace pas cette analyse globale."
        ]
      },
      {
        title: "Points à vérifier avant signature",
        paragraphs: [
          "La vigilance porte surtout sur les dates : date d'entrée, date de rupture, date d'inscription France Travail, date d'âge pivot éventuelle et date de départ à la retraite envisagée.",
          "Il est aussi utile de comparer le montant négocié avec le calendrier d'indemnisation. Une indemnité plus élevée peut aider à financer la transition, mais elle peut aussi interagir avec certains différés."
        ],
        bullets: [
          "Ancienneté et salaire de référence.",
          "Convention collective et part négociée.",
          "Durée maximale d'indemnisation applicable.",
          "Différés France Travail éventuels.",
          "Situation retraite et accompagnement France Travail."
        ]
      },
      {
        title: "Ce qui ne change pas",
        paragraphs: [
          "La rupture conventionnelle reste un accord libre entre salarié et employeur. Elle ne peut pas être imposée et doit respecter la procédure d'homologation.",
          "Le minimum d'indemnité reste dû. La réforme ne transforme pas la rupture conventionnelle en démission et ne supprime pas l'accès possible au chômage."
        ]
      },
      {
        title: "Sources officielles à vérifier",
        paragraphs: [
          "Pour les seniors, la prudence est particulièrement importante : vérifiez les textes publiés, les informations France Travail et, si nécessaire, la situation retraite avec les organismes compétents."
        ],
        bullets: reformSourceBullets
      }
    ],
    faq: [
      ...reform2026Faq.slice(0, 2),
      reform2026Faq[4],
      {
        question: "Faut-il attendre 55 ans pour signer ?",
        answer:
          "Il ne faut pas décider uniquement sur ce critère. L'âge exact, la date de rupture, les textes applicables, l'indemnité, les différés et la retraite doivent être regardés ensemble."
      },
      {
        question: "La retraite est-elle calculée par RuptureConv ?",
        answer:
          "Non. RuptureConv estime l'indemnité de rupture conventionnelle. Les effets retraite et France Travail doivent être vérifiés auprès des organismes compétents."
      },
      {
        question: "Un senior peut-il négocier plus que le minimum ?",
        answer:
          "Oui, si l'employeur l'accepte. Le minimum reste un plancher, et une part supra-légale peut être discutée selon le contexte."
      }
    ],
    conclusion: [
      "Pour un salarié senior, la réforme 2026 impose surtout de mieux anticiper la durée maximale d'indemnisation. Elle ne supprime pas l'indemnité ni le droit possible au chômage.",
      "Avant de signer, estimez l'indemnité, vérifiez les textes à jour et relisez la situation France Travail et retraite avec prudence."
    ]
  },
  {
    slug: "rupture-conventionnelle-employeur-cout-2026",
    title: "Rupture conventionnelle employeur coût 2026",
    h1: "Rupture conventionnelle en 2026 : coût employeur, contribution patronale 40 %, chômage et vigilance RH",
    description:
      "Rupture conventionnelle côté employeur en 2026 : indemnité, contribution patronale 40 %, coût global, chômage du salarié et points RH à vérifier.",
    updatedAt: "2026-06-03",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: reform2026RelatedLinks,
    intro: [
      "Côté employeur, la réforme chômage 2026 ne dispense pas de calculer correctement l'indemnité de rupture conventionnelle. Le minimum reste dû et le salarié peut toujours ouvrir des droits au chômage sous conditions.",
      "Le point coût à intégrer en 2026 est la contribution patronale spécifique portée à 40 % au 1er janvier 2026 sur la part exonérée de cotisations sociales des indemnités de rupture conventionnelle et de mise à la retraite.",
      reform2026Disclaimer
    ],
    sections: [
      {
        title: "Les postes de coût à anticiper",
        paragraphs: [
          "Le coût employeur ne se limite pas à l'indemnité spécifique. Il faut aussi intégrer les congés payés, les salaires jusqu'à la date de rupture, les éventuelles primes, les documents de fin de contrat et la contribution patronale spécifique.",
          "La réforme chômage doit être présentée au salarié avec prudence : elle réduit une durée maximale annoncée, mais ne supprime pas le droit possible au chômage."
        ],
        bullets: [
          "Indemnité minimale ou conventionnelle.",
          "Part supra-légale éventuellement négociée.",
          "Congés payés et éléments variables.",
          "Contribution patronale spécifique de 40 %.",
          "Calendrier et documents de fin de contrat."
        ]
      },
      {
        title: "Contribution patronale 40 %",
        paragraphs: [
          "Depuis le 1er janvier 2026, la contribution patronale spécifique sur les indemnités de rupture conventionnelle et de mise à la retraite est indiquée à 40 % sur la part exonérée de cotisations sociales.",
          "Cette contribution doit être vérifiée avec la paie ou le conseil social, notamment en cas d'indemnité importante, de part supra-légale ou de situation proche de la retraite."
        ]
      },
      {
        title: "Exemple de lecture RH",
        paragraphs: [
          "Une entreprise envisage une rupture conventionnelle avec une indemnité minimale de 6 000 euros bruts et une part négociée supplémentaire. Elle doit distinguer le minimum, la part supra-légale, le traitement social, fiscal et la contribution patronale applicable.",
          "Le simulateur donne une première estimation de l'indemnité. Il ne remplace pas un bulletin de paie de sortie ni une validation sociale complète."
        ]
      },
      {
        title: "Informer sans inquiéter",
        paragraphs: [
          "Un employeur doit éviter les formulations alarmistes comme « vous n'aurez plus droit au chômage ». La formulation correcte est plus nuancée : la rupture conventionnelle peut ouvrir droit au chômage sous conditions, mais la durée maximale d'indemnisation est réduite par la réforme annoncée.",
          "Cette précision évite de fragiliser l'échange et montre que l'entreprise distingue bien le calcul de l'indemnité, le coût employeur et les droits France Travail."
        ]
      },
      {
        title: "Checklist avant homologation",
        paragraphs: [
          "Avant l'envoi du dossier, vérifiez que le montant respecte le minimum, que les dates sont cohérentes, que la convention collective a été relue et que le salarié reçoit une information claire sur les documents de fin de contrat.",
          "En cas de doute sur la date d'application de la réforme, il est préférable d'ajouter une mention de prudence plutôt qu'une affirmation définitive."
        ],
        bullets: [
          "Montant minimal contrôlé.",
          "Contribution patronale 40 % intégrée au budget.",
          "Date de rupture compatible avec les délais.",
          "Information chômage formulée sans promesse absolue.",
          "Textes 2026 revérifiés avant signature."
        ]
      },
      {
        title: "Sources officielles à vérifier",
        paragraphs: [
          "Les règles sociales et paie doivent être vérifiées avec les sources officielles au moment de la rupture, surtout si la signature intervient peu après la publication des textes."
        ],
        bullets: reformSourceBullets
      }
    ],
    faq: [
      reform2026Faq[0],
      reform2026Faq[1],
      reform2026Faq[7],
      {
        question: "La réforme change-t-elle le calcul employeur de l'indemnité minimale ?",
        answer:
          "Non. La réforme chômage annoncée ne modifie pas la formule du minimum. L'employeur doit toujours vérifier l'ancienneté, le salaire de référence et la convention collective."
      },
      {
        question: "Faut-il informer le salarié sur la réforme ?",
        answer:
          "Il est utile de donner une information prudente et claire, sans affirmer que le droit au chômage disparaît. Les droits exacts relèvent de France Travail."
      },
      {
        question: "Le simulateur calcule-t-il le coût employeur complet ?",
        answer:
          "Non. Il estime l'indemnité de rupture. Le coût global employeur doit être validé avec la paie, notamment pour la contribution patronale et le traitement social."
      }
    ],
    conclusion: [
      "En 2026, l'employeur doit raisonner en trois blocs : indemnité minimale, coût social de sortie et information prudente sur le chômage.",
      "La réforme ne change pas le minimum d'indemnité, mais elle impose une vigilance accrue sur la durée maximale d'indemnisation et sur la contribution patronale spécifique."
    ]
  },
  {
    slug: "rupture-conventionnelle-avant-apres-reforme-2026",
    title: "Rupture conventionnelle avant après réforme 2026",
    h1: "Avant / après réforme : tableau simple des nouvelles règles",
    description:
      "Tableau avant/après de la réforme 2026 de la rupture conventionnelle : chômage, moins de 55 ans, seniors, outre-mer, indemnité et coût employeur.",
    updatedAt: "2026-06-03",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: reform2026RelatedLinks,
    intro: [
      "Ce tableau résume les effets annoncés de la réforme 2026 sur la rupture conventionnelle et l'assurance chômage. Il sert de repère rapide, pas de consultation juridique personnalisée.",
      "La règle clé : la réforme réduit surtout la durée maximale d'indemnisation chômage. Elle ne supprime ni l'indemnité minimale de rupture conventionnelle, ni le principe d'un droit possible au chômage sous conditions.",
      reform2026Disclaimer
    ],
    sections: [
      {
        title: "Tableau avant / après",
        paragraphs: [
          "Les repères ci-dessous sont volontairement synthétiques. Ils doivent être relus avec la date de publication au Journal officiel, les textes d'application et les fiches France Travail à jour."
        ],
        table: {
          headers: ["Thème", "Avant réforme", "Après réforme annoncée"],
          rows: [
            ["Moins de 55 ans", "18 mois maximum", "15 mois maximum"],
            ["Seniors concernés", "22,5 mois ou 27 mois selon les cas", "20,5 mois maximum"],
            ["Outre-mer hors Mayotte", "Durées spécifiques", "20 ou 30 mois selon l'âge"],
            ["Droit au chômage", "Possible sous conditions", "Possible sous conditions"],
            ["Indemnité minimale", "Due", "Toujours due"],
            ["Contribution employeur", "30 % auparavant", "40 % depuis le 1er janvier 2026"]
          ]
        }
      },
      {
        title: "Lecture rapide pour un salarié",
        paragraphs: [
          "Si vous êtes salarié, ne retenez pas que vos droits disparaissent. Retenez plutôt que la durée maximale peut être plus courte et que votre situation doit être vérifiée selon la date de rupture.",
          "L'indemnité de rupture conventionnelle reste un sujet séparé : elle dépend de votre ancienneté, de votre salaire brut de référence et de la convention collective."
        ]
      },
      {
        title: "Lecture rapide pour un employeur",
        paragraphs: [
          "Si vous êtes employeur, le tableau ne remplace pas une validation paie. Il rappelle seulement les points à intégrer dans l'échange : indemnité, contribution spécifique de 40 %, documents de fin de contrat et information prudente sur le chômage.",
          "Évitez les raccourcis : la rupture conventionnelle reste compatible avec une indemnisation chômage sous conditions."
        ]
      },
      {
        title: "Exemple synthétique",
        paragraphs: [
          "Un salarié de 50 ans en métropole ne perd pas mécaniquement son droit au chômage parce qu'il signe une rupture conventionnelle. En revanche, la durée maximale annoncée serait de 15 mois, contre 18 mois auparavant.",
          "Le même salarié doit continuer à calculer son indemnité minimale comme avant. Une convention collective plus favorable ou une négociation peut augmenter le montant versé."
        ]
      },
      {
        title: "Sources officielles à vérifier",
        paragraphs: [
          "Ce comparatif doit être revérifié après publication et mise à jour des organismes publics. Les fiches opérationnelles de France Travail ou Service-Public peuvent préciser l'application concrète."
        ],
        bullets: reformSourceBullets
      }
    ],
    faq: reform2026Faq,
    conclusion: [
      "Le tableau avant / après permet de retenir l'essentiel : durée maximale réduite, droit au chômage maintenu sous conditions, indemnité minimale maintenue.",
      "Pour agir, faites ensuite deux vérifications séparées : le montant de votre indemnité avec le simulateur, puis vos droits France Travail avec les textes à jour."
    ]
  }
];

const reformNoticeTargetSlugs = new Set([
  "simulateur-rupture-conventionnelle",
  "calcul-indemnite-rupture-conventionnelle",
  "calcul-indemnite-rupture-conventionnelle-net",
  "indemnite-legale-rupture-conventionnelle",
  "rupture-conventionnelle-cdi",
  "rupture-conventionnelle-chomage",
  "modele-lettre-rupture-conventionnelle"
]);

function withReformNotice(page: PillarPage): PillarPage {
  if (!reformNoticeTargetSlugs.has(page.slug)) {
    return page;
  }

  return {
    ...page,
    updatedAt: page.updatedAt ?? "2026-06-03",
    updatedLabel: page.updatedLabel ?? "Dernière mise à jour : juin 2026",
    relatedLinks: Array.from(new Set([reform2026MainPath, ...page.relatedLinks])),
    sections: [reformNoticeSection, ...page.sections]
  };
}

const unemploymentClusterConfigs = [
  {
    slug: "chomage-apres-rupture-conventionnelle",
    title: "Chômage après rupture conventionnelle : montant, délai et durée",
    intent: "comprendre les droits chômage après une rupture conventionnelle",
    focus:
      "La rupture conventionnelle peut ouvrir droit à l'ARE, mais le calendrier dépend des différés, des congés payés et des documents transmis à France Travail."
  },
  {
    slug: "allocation-chomage-rupture-conventionnelle",
    title: "Allocation chômage après rupture conventionnelle",
    intent: "estimer l'allocation chômage après une rupture conventionnelle",
    focus:
      "L'allocation dépend du salaire journalier de référence, de l'âge, de la durée d'activité et des éventuels différés."
  },
  {
    slug: "calcul-are-rupture-conventionnelle",
    title: "Calcul ARE après rupture conventionnelle",
    intent: "calculer l'ARE après une rupture conventionnelle",
    focus:
      "Le calcul compare deux formules à partir du SJR et doit être complété par une lecture du premier versement probable."
  },
  {
    slug: "combien-chomage-apres-rupture-conventionnelle",
    title: "Combien de chômage après une rupture conventionnelle ?",
    intent: "savoir combien toucher chaque mois après une rupture conventionnelle",
    focus:
      "Le montant mensuel ne suffit pas : il faut aussi regarder l'indemnité de départ, les différés et le total potentiel."
  },
  {
    slug: "delai-chomage-apres-rupture-conventionnelle",
    title: "Délai chômage après rupture conventionnelle",
    intent: "anticiper le délai avant le premier versement chômage",
    focus:
      "Le délai combine l'attente légale, les congés payés et le différé spécifique lié aux indemnités supérieures au minimum."
  },
  {
    slug: "carence-chomage-rupture-conventionnelle",
    title: "Carence chômage après rupture conventionnelle",
    intent: "comprendre la carence et les différés France Travail",
    focus:
      "Le terme carence regroupe souvent plusieurs mécanismes distincts qu'il faut séparer pour estimer la trésorerie."
  },
  {
    slug: "rupture-conventionnelle-et-france-travail",
    title: "Rupture conventionnelle et France Travail",
    intent: "préparer l'inscription France Travail après la rupture",
    focus:
      "L'attestation employeur, la date de fin, les indemnités et les congés payés doivent être cohérents avant l'inscription."
  },
  {
    slug: "rupture-conventionnelle-et-are",
    title: "Rupture conventionnelle et ARE",
    intent: "relier rupture conventionnelle et allocation de retour à l'emploi",
    focus:
      "L'ARE peut être ouverte après homologation si les conditions sont remplies, mais elle n'est pas toujours versée immédiatement."
  },
  {
    slug: "rupture-conventionnelle-et-retraite",
    title: "Rupture conventionnelle, chômage et retraite",
    intent: "évaluer les conséquences chômage retraite",
    focus:
      "À partir de 55 ans, puis 57 ans et 60 ans, la projection doit intégrer durée d'indemnisation, retraite et maintien éventuel."
  },
  {
    slug: "chomage-apres-demission",
    title: "Chômage après démission : droits, exceptions et 121 jours",
    intent: "comprendre les droits après une démission",
    focus:
      "Une démission classique n'ouvre pas automatiquement droit à l'ARE ; les exceptions doivent être vérifiées avant de quitter son emploi."
  },
  {
    slug: "demission-legitime-chomage",
    title: "Démission légitime et chômage",
    intent: "savoir quand une démission peut être légitime",
    focus:
      "La démission légitime dépend d'un motif reconnu et de justificatifs. Le simulateur aide à projeter le montant, pas à valider le motif."
  },
  {
    slug: "reconversion-et-chomage",
    title: "Reconversion et chômage après démission",
    intent: "préparer une reconversion avec indemnisation chômage",
    focus:
      "Une reconversion doit être validée dans le bon ordre. Démissionner avant validation peut créer une période sans indemnisation."
  },
  {
    slug: "reexamen-121-jours",
    title: "Réexamen après 121 jours de chômage",
    intent: "comprendre le réexamen France Travail après démission",
    focus:
      "Après une démission non indemnisée, un réexamen peut être demandé après 121 jours, mais il n'est pas automatique."
  },
  {
    slug: "reliquat-droits-chomage",
    title: "Reliquat de droits chômage : reprise et démission",
    intent: "comprendre l'effet d'un reliquat de droits ARE",
    focus:
      "Un reliquat peut modifier la lecture d'une nouvelle fin de contrat. La confirmation France Travail est indispensable."
  },
  {
    slug: "calcul-sjr",
    title: "Calcul du SJR : salaire journalier de référence",
    intent: "comprendre le calcul du salaire journalier de référence",
    focus:
      "Le SJR est la base de l'ARE. Une estimation à partir du salaire mensuel moyen reste utile, mais le calcul réalisé par France Travail est plus fin."
  },
  {
    slug: "salaire-journalier-reference",
    title: "Salaire journalier de référence : définition et impact",
    intent: "comprendre l'impact du SJR sur l'allocation",
    focus:
      "Une variation du SJR change directement l'ARE, les différés congés payés et la projection financière."
  },
  ...[1500, 2000, 2500, 3000, 3500, 4000, 5000].map((salary) => ({
    slug: `chomage-salaire-${salary}`,
    title: `Chômage avec ${salary} € brut : estimation ARE`,
    intent: `estimer le chômage avec ${salary} euros brut`,
    focus: `Avec ${salary} € brut mensuels, l'ARE dépend du SJR estimé, du mode de rupture, de l'âge et des différés éventuels.`
  })),
  {
    slug: "chomage-apres-50-ans",
    title: "Chômage après 50 ans : durée, ARE et vigilance",
    intent: "préparer une période de chômage après 50 ans",
    focus:
      "Après 50 ans, la durée, le retour à l'emploi et la retraite doivent être intégrés dans la décision de départ."
  },
  {
    slug: "chomage-apres-55-ans",
    title: "Chômage après 55 ans : règles seniors",
    intent: "comprendre les règles chômage à partir de 55 ans",
    focus:
      "À partir de 55 ans, la période de recherche d'activité s'allonge et la dégressivité ne s'applique pas selon les repères France Travail."
  },
  {
    slug: "chomage-apres-57-ans",
    title: "Chômage après 57 ans : durée maximale et retraite",
    intent: "comprendre la durée d'indemnisation après 57 ans",
    focus:
      "À 57 ans et plus, la durée maximale peut être plus longue, mais la retraite et les formations peuvent modifier l'analyse."
  },
  {
    slug: "duree-indemnisation-chomage",
    title: "Durée d'indemnisation chômage : comment l'estimer ?",
    intent: "estimer la durée potentielle d'indemnisation",
    focus:
      "La durée dépend de l'activité retenue, du coefficient applicable, de l'âge et des plafonds réglementaires."
  },
  {
    slug: "degressivite-are",
    title: "Dégressivité ARE : qui est concerné ?",
    intent: "comprendre la dégressivité de l'allocation chômage",
    focus:
      "La dégressivité vise certaines allocations élevées et ne concerne pas les allocataires ayant 55 ans ou plus à la fin du contrat."
  },
  {
    slug: "chomage-apres-cdd",
    title: "Chômage après fin de CDD",
    intent: "estimer le chômage après une fin de CDD",
    focus:
      "Une fin de CDD peut ouvrir une indemnisation si les conditions d'activité sont remplies et si les documents sont cohérents."
  },
  {
    slug: "chomage-apres-licenciement",
    title: "Chômage après licenciement",
    intent: "estimer le chômage après licenciement",
    focus:
      "Après un licenciement, l'analyse porte sur l'ARE, les différés, le CSP éventuel et la date probable du premier versement."
  }
] satisfies Array<{
  slug: string;
  title: string;
  intent: string;
  focus: string;
}>;

const unemploymentClusterPages: PillarPage[] = unemploymentClusterConfigs.map(
  (config) => ({
    slug: config.slug,
    title: config.title,
    h1: config.title,
    description: `${config.title} : estimez ARE, différés, date de versement et projection financière avec le simulateur chômage gratuit.`,
    relatedLinks: [
      "/simulateur-chomage-rupture-conventionnelle",
      "/rupture-conventionnelle-chomage",
      "/rupture-conventionnelle-chomage-2026",
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle-net"
    ],
    intro: [
      `Cette page répond à une intention précise : ${config.intent}. ${config.focus}`,
      `L'objectif n'est pas d'affirmer un droit, mais de préparer une projection prudente avant inscription, négociation ou échange avec France Travail. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Réponse rapide",
        paragraphs: [
          config.focus,
          "Le plus utile est de regarder ensemble trois montants : l'indemnité de départ éventuelle, l'allocation mensuelle estimée et le total potentiel sur la durée probable."
        ],
        bullets: [
          "Éligibilité probable, jamais garantie.",
          "ARE estimée à partir du salaire brut moyen et du SJR.",
          "Différés possibles avant le premier versement.",
          "Durée adaptée selon l'âge et l'activité retenue.",
          "Confirmation nécessaire auprès de France Travail."
        ]
      },
      {
        title: "Pourquoi utiliser le simulateur chômage ?",
        paragraphs: [
          "Une décision de départ ne se prend pas seulement avec un montant mensuel. Le calendrier du premier versement, les congés payés, une indemnité supra-légale ou une démission peuvent changer fortement la situation réelle.",
          "Le simulateur chômage RuptureConv transforme ces informations en projection : ARE brute, ARE nette indicative, différés, durée estimative et revenu total potentiel."
        ]
      },
      {
        title: "Points de vigilance",
        paragraphs: [
          "Le salaire journalier de référence officiel peut différer d'une estimation rapide si la rémunération est variable, si le temps partiel est irrégulier ou si plusieurs contrats se succèdent.",
          "La démission classique doit être traitée avec une prudence particulière. Elle ne doit pas être assimilée à une rupture conventionnelle ou à un licenciement."
        ],
        bullets: [
          "Vérifier l'attestation employeur.",
          "Distinguer indemnité légale, supra-légale et congés payés.",
          "Prévoir une trésorerie si le différé est important.",
          "Demander confirmation à France Travail pour les cas atypiques."
        ]
      },
      {
        title: "Passer à une projection personnalisée",
        paragraphs: [
          "La page donne les repères, mais le montant dépend de vos propres données : âge, salaire, date de fin, mode de rupture, activité travaillée, congés payés et indemnité supra-légale.",
          "Le simulateur dédié permet de tester ces hypothèses sans création de compte et sans stockage des données."
        ],
        bullets: [
          "Lien utile : /simulateur-chomage-rupture-conventionnelle",
          "Calcul de l'indemnité de rupture : /simulateur-rupture-conventionnelle",
          "Chômage et rupture conventionnelle : /rupture-conventionnelle-chomage"
        ]
      }
    ],
    faq: [
      {
        question: "Le résultat vaut-il confirmation de droits ?",
        answer:
          "Non. Le résultat est indicatif. Il aide à préparer une décision, mais seul France Travail confirme les droits."
      },
      {
        question: "Le simulateur calcule-t-il le premier versement ?",
        answer:
          "Il estime une date probable en additionnant attente légale, différé congés payés et différé spécifique."
      },
      {
        question: "Faut-il saisir le salaire brut ou net ?",
        answer:
          "Il faut partir du salaire brut moyen. Le net affiché reste une estimation pratique du montant perçu."
      },
      {
        question: "La démission est-elle indemnisée ?",
        answer:
          "Pas automatiquement. Les cas légitimes, reconversions validées, reliquats et réexamens doivent être confirmés."
      }
    ],
    conclusion: [
      "Une bonne projection chômage doit relier montant, délai et durée. C'est cette combinaison qui permet d'évaluer la situation réelle après la fin du contrat.",
      "Avant toute décision, utilisez le simulateur puis confrontez le résultat aux documents employeur et aux informations France Travail."
    ]
  })
);

export const pillarPages: PillarPage[] = [
  ...reform2026Pages,
  ...basePillarPages.map(withReformNotice),
  ...editorialArticlePages.map(withReformNotice),
  ...highIntentPages.map(withReformNotice),
  ...resourcePlaceholderPages.map(withReformNotice),
  ...unemploymentClusterPages,
  ...programmaticSeniorityPages,
  ...programmaticSalaryPages,
  ...eeatPages
];

export const pillarPageBySlug = Object.fromEntries(
  pillarPages.map((page) => [page.slug, page])
) as Record<string, PillarPage>;

const blogPostsData: BlogPost[] = [
  {
    slug: "comment-calculer-une-rupture-conventionnelle-facilement",
    title: "Comment calculer une rupture conventionnelle facilement",
    description:
      "Méthode simple pour calculer une rupture conventionnelle : ancienneté, salaire brut, minimum légal, exemple et simulateur.",
    relatedPillars: [
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/rupture-conventionnelle-cdi"
    ],
    intro: [
      "Calculer une rupture conventionnelle facilement suppose de partir des bonnes données : date d'entrée, ancienneté, salaire brut de référence et date de rupture envisagée. Une fois ces éléments réunis, la formule devient plus simple à appliquer.",
      `L'objectif est d'obtenir un minimum brut indicatif, puis de vérifier si une règle plus favorable ou une négociation peut augmenter ce montant. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "La méthode rapide",
        paragraphs: [
          "Commencez par déterminer l'ancienneté exacte du salarié. Appliquez ensuite un quart de mois de salaire par année jusqu'à dix ans, puis un tiers de mois par année au-delà.",
          "Ce calcul donne le minimum indicatif. Il faut ensuite vérifier la convention collective et les éléments variables de rémunération."
        ],
        bullets: [
          "Identifier l'ancienneté.",
          "Retenir le salaire brut de référence.",
          "Appliquer la formule minimale.",
          "Vérifier la convention collective.",
          "Comparer avec le résultat du simulateur."
        ]
      },
      {
        title: "Exemple",
        paragraphs: [
          "Avec 5 ans d'ancienneté et 2 400 euros bruts mensuels, l'indemnité minimale indicative est de 2 400 x 1/4 x 5, soit 3 000 euros bruts.",
          "Si une prime régulière augmente la rémunération moyenne, le montant peut être supérieur."
        ]
      },
      {
        title: "À retenir",
        paragraphs: [
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "indemnite-rupture-conventionnelle-anciennete-10-ans",
    title: "Indemnité rupture conventionnelle ancienneté 10 ans",
    description:
      "Calculer une indemnité de rupture conventionnelle après 10 ans d'ancienneté : formule 2026, exemple chiffré et simulateur gratuit.",
    relatedPillars: [
      "/calcul-indemnite-rupture-conventionnelle-net",
      "/calcul-indemnite-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle",
      "/indemnite-rupture-conventionnelle-9-ans",
      "/indemnite-rupture-conventionnelle-11-ans"
    ],
    intro: [
      "Avec 10 ans d'ancienneté, le calcul de l'indemnité de rupture conventionnelle est particulièrement important, car le salarié atteint le seuil avant l'application de la tranche au-delà de dix ans.",
      `La formule de base reste simple, mais la vérification du salaire de référence devient essentielle. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Calcul avec 10 ans d'ancienneté",
        paragraphs: [
          "Pour 10 ans d'ancienneté, le minimum indicatif correspond à un quart de mois de salaire par année. Il faut donc multiplier le salaire brut de référence par 2,5.",
          "Exemple : avec 2 700 euros bruts mensuels, le minimum indicatif est de 6 750 euros bruts."
        ]
      },
      {
        title: "Pourquoi ce seuil est important",
        paragraphs: [
          "Au-delà de dix ans, la formule devient plus favorable pour les années supplémentaires, avec un tiers de mois par année. Le passage de 10 à 11 ou 12 ans peut donc avoir un effet visible.",
          "Il faut éviter d'arrondir l'ancienneté ou d'oublier une fraction d'année."
        ]
      },
      {
        title: "À vérifier",
        paragraphs: [
          "Le salaire de référence doit intégrer les éléments pertinents. Les primes régulières, variables ou commissions peuvent parfois modifier la base de calcul.",
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "rupture-conventionnelle-ou-licenciement-que-choisir",
    title: "Rupture conventionnelle ou licenciement : que choisir ?",
    description:
      "Comparer rupture conventionnelle et licenciement : indemnité, procédure, droits, risques et critères de choix.",
    relatedPillars: [
      "/rupture-conventionnelle-cdi",
      "/licenciement-indemnite",
      "/simulateur-rupture-conventionnelle"
    ],
    intro: [
      "Rupture conventionnelle ou licenciement : la question revient souvent lorsqu'un CDI doit prendre fin. Les deux solutions peuvent conduire à une indemnité, mais elles ne reposent pas sur la même logique.",
      `Le bon choix dépend du contexte, du consentement des parties, du motif éventuel, du calendrier et du montant envisagé. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Différence principale",
        paragraphs: [
          "La rupture conventionnelle repose sur un accord entre salarié et employeur. Le licenciement est une décision de l'employeur fondée sur un motif.",
          "Cette différence influence la procédure, les documents, les risques et la manière de discuter du départ."
        ]
      },
      {
        title: "Comparaison des indemnités",
        paragraphs: [
          "La rupture conventionnelle doit prévoir une indemnité au moins égale au minimum applicable. Le licenciement obéit également à une logique d'indemnité, sauf situations particulières.",
          "Dans les deux cas, le salaire de référence et l'ancienneté sont essentiels."
        ]
      },
      {
        title: "Quel choix privilégier ?",
        paragraphs: [
          "La rupture conventionnelle peut être adaptée lorsque les deux parties souhaitent se séparer sans conflit ouvert. Le licenciement correspond davantage à une décision employeur motivée.",
          "Il ne faut pas utiliser la rupture conventionnelle pour contourner une difficulté juridique ou exercer une pression."
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "delai-rupture-conventionnelle-combien-de-temps",
    title: "Délai rupture conventionnelle : combien de temps prévoir ?",
    description:
      "Comprendre les délais d'une rupture conventionnelle : entretien, signature, rétractation, homologation et date de départ.",
    relatedPillars: [
      "/rupture-conventionnelle-cdi",
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle"
    ],
    intro: [
      "Le délai d'une rupture conventionnelle ne dépend pas seulement de la date souhaitée par le salarié ou l'employeur. Il faut respecter plusieurs étapes : échange préalable, signature, rétractation et homologation.",
      `Anticiper le calendrier évite les erreurs de date et les ruptures trop rapides. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Les grandes étapes",
        paragraphs: [
          "La procédure commence généralement par un ou plusieurs entretiens. Les parties signent ensuite une convention, puis disposent d'un délai de rétractation avant l'envoi pour homologation.",
          "La rupture ne peut intervenir qu'après validation de la procédure."
        ]
      },
      {
        title: "Pourquoi le calendrier compte",
        paragraphs: [
          "Une date mal choisie peut retarder le départ ou fragiliser le dossier. Il faut aussi tenir compte des congés, de la passation, des documents de fin de contrat et de l'inscription éventuelle à France Travail.",
          "Le montant de l'indemnité doit être vérifié avant signature."
        ]
      },
      {
        title: "Préparer le dossier",
        paragraphs: [
          "Avant de fixer une date, il est utile de simuler l'indemnité et de vérifier les sommes dues.",
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "montant-minimum-rupture-conventionnelle",
    title: "Montant minimum rupture conventionnelle",
    description:
      "Comprendre le montant minimum d'une rupture conventionnelle : formule légale, exemple, convention collective et simulateur.",
    relatedPillars: [
      "/indemnite-legale-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle"
    ],
    intro: [
      "Le montant minimum d'une rupture conventionnelle correspond au plancher que l'indemnité spécifique doit respecter. Il dépend principalement de l'ancienneté et du salaire brut de référence.",
      `Ce montant peut être augmenté par la convention collective ou par une négociation. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Formule du minimum",
        paragraphs: [
          "Le minimum indicatif repose sur un quart de mois de salaire par année d'ancienneté jusqu'à dix ans, puis un tiers de mois par année au-delà.",
          "Ce montant est exprimé en brut et doit être vérifié avec les éléments de paie."
        ]
      },
      {
        title: "Exemple",
        paragraphs: [
          "Pour 4 ans d'ancienneté et 2 200 euros bruts mensuels, le minimum indicatif est de 2 200 euros bruts.",
          "Une règle conventionnelle plus favorable peut augmenter ce montant."
        ]
      },
      {
        title: "Utiliser le simulateur",
        paragraphs: [
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "rupture-conventionnelle-cadre-indemnite",
    title: "Rupture conventionnelle cadre : quelle indemnité ?",
    description:
      "Calculer l'indemnité de rupture conventionnelle d'un cadre : salaire variable, primes, ancienneté, négociation et exemple.",
    relatedPillars: [
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/rupture-conventionnelle-cdi"
    ],
    intro: [
      "La rupture conventionnelle d'un cadre demande une attention particulière, car la rémunération peut inclure une part variable, des primes, un bonus ou des avantages qui compliquent le calcul.",
      `Le minimum légal reste une base, mais la négociation peut prendre une place plus importante selon le poste et le contexte. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Particularités du statut cadre",
        paragraphs: [
          "Le statut cadre n'entraîne pas automatiquement une formule différente, mais il peut rendre le salaire de référence plus complexe à déterminer.",
          "Les bonus, primes d'objectifs et rémunérations variables doivent être analysés avec prudence."
        ]
      },
      {
        title: "Exemple",
        paragraphs: [
          "Un cadre avec 7 ans d'ancienneté, 4 000 euros bruts fixes et une prime régulière peut voir son indemnité varier selon l'intégration ou non de cette prime dans la base.",
          "Le minimum doit donc être calculé sur une rémunération représentative."
        ]
      },
      {
        title: "Négociation",
        paragraphs: [
          "Dans les postes cadres, la négociation peut porter sur l'indemnité supra-légale, la date de sortie, la transition ou d'autres éléments annexes.",
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "calcul-indemnite-brut-ou-net",
    title: "Rupture conventionnelle : faut-il calculer avec le salaire brut ou net ?",
    description:
      "Quel salaire utiliser pour une rupture conventionnelle : brut, net, salaire de référence, primes, indemnité nette, exemples et simulateur gratuit.",
    relatedPillars: [
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle-net",
      "/indemnite-legale-rupture-conventionnelle",
      "/rupture-conventionnelle-chomage",
      "/indemnite-rupture-conventionnelle-salaire-1500",
      "/indemnite-rupture-conventionnelle-salaire-2000",
      "/indemnite-rupture-conventionnelle-salaire-2500",
      "/indemnite-rupture-conventionnelle-salaire-3000"
    ],
    intro: [
      "Pour calculer une indemnité de rupture conventionnelle, on ne part pas du salaire net versé sur le compte bancaire, mais du salaire brut de référence. C'est ce montant qui sert de base au calcul légal minimum.",
      `Le salaire net reste utile pour comprendre le montant réellement perçu, mais il ne remplace pas la base brute du calcul. Les primes, variables, absences et règles conventionnelles peuvent modifier le salaire de référence. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Réponse rapide",
        paragraphs: [
          "Le calcul se fait avec le salaire brut de référence. Le salaire net sert surtout à se projeter sur le montant perçu après traitement social et fiscal.",
          "L'indemnité légale est un minimum. La convention collective ou la négociation peuvent prévoir davantage."
        ],
        bullets: [
          "Le calcul se fait avec le salaire brut de référence.",
          "Le salaire net ne suffit pas pour calculer l'indemnité minimale.",
          "Les primes, variables et 13e mois peuvent modifier la base.",
          "L'indemnité légale est un plancher, pas un plafond.",
          "La convention collective ou la négociation peuvent augmenter le montant."
        ]
      },
      {
        title: "Brut, net, salaire de référence : quelle différence ?",
        paragraphs: [
          "Ces notions répondent à des questions différentes. Les confondre peut conduire à une estimation trop basse ou à une mauvaise lecture de la proposition.",
          "Le tableau ci-dessous permet de savoir quel montant regarder avant de lancer une simulation ou de relire une convention de rupture."
        ],
        table: {
          headers: [
            "Notion",
            "Ce que cela signifie",
            "Utilité pour la rupture conventionnelle",
            "Erreur fréquente"
          ],
          rows: [
            [
              "Salaire brut",
              "Rémunération avant cotisations salariales.",
              "Point de départ pour déterminer le salaire de référence.",
              "Le confondre avec le net à payer."
            ],
            [
              "Salaire net",
              "Montant après cotisations, avant ou après impôt selon la ligne lue.",
              "Aide à comprendre le budget personnel, pas le minimum légal.",
              "Calculer l'indemnité sur le net bancaire."
            ],
            [
              "Salaire de référence",
              "Base retenue pour appliquer la formule d'indemnité.",
              "Donnée centrale du calcul avec l'ancienneté.",
              "Prendre seulement le dernier mois sans vérifier les moyennes."
            ],
            [
              "Indemnité brute",
              "Montant calculé avant lecture du traitement social et fiscal.",
              "Sert à vérifier le minimum légal ou conventionnel.",
              "La comparer directement au net espéré."
            ],
            [
              "Indemnité nette perçue",
              "Montant indicatif susceptible d'être versé après traitement en paie.",
              "Permet de se projeter sur la somme disponible.",
              "La considérer comme garantie sans vérification paie."
            ],
            [
              "Primes et variables",
              "Éléments de rémunération réguliers ou variables selon le contrat.",
              "Peuvent modifier le salaire de référence.",
              "Oublier un 13e mois, une commission ou une prime régulière."
            ]
          ]
        }
      },
      {
        title: "Quel salaire utiliser pour le calcul ?",
        paragraphs: [
          "Le bon réflexe consiste à partir du salaire brut de référence, puis à vérifier si la rémunération habituelle doit être corrigée par des primes, variables, absences ou changements récents.",
          "Si votre paie est stable, le salaire brut mensuel donne souvent un repère simple. Si votre rémunération varie, comparez les moyennes utiles et gardez les bulletins sous la main."
        ]
      },
      {
        title: "Le salaire net est-il pris en compte ?",
        paragraphs: [
          "Le salaire net n'est pas la base de calcul du minimum. Il sert plutôt à comprendre ce que le salarié pourrait réellement percevoir une fois l'indemnité traitée en paie.",
          "C'est pourquoi une page ou un simulateur sérieux doit séparer le minimum brut, le net indicatif et le montant éventuellement négocié."
        ]
      },
      {
        title: "Les primes et variables comptent-elles ?",
        paragraphs: [
          "Des primes régulières, commissions, variables ou un 13e mois peuvent modifier le salaire de référence selon leur nature et les règles applicables. Il faut donc éviter de saisir un salaire trop simplifié si la rémunération n'est pas fixe.",
          "En cas de doute, testez plusieurs hypothèses dans le simulateur : salaire fixe seul, moyenne avec primes, puis montant éventuellement négocié."
        ]
      },
      {
        title: "Indemnité brute et montant net perçu : attention à la différence",
        paragraphs: [
          "L'indemnité minimale est d'abord lue en brut. Le montant net perçu dépend ensuite du traitement social et fiscal, notamment si une part supra-légale est négociée.",
          "Le net indicatif reste utile pour préparer son budget, mais il doit être confirmé avec la paie lorsque le montant devient important ou que la situation est particulière."
        ]
      },
      {
        title: "Exemples avec 1 500 €, 2 000 €, 2 500 € et 3 000 € brut",
        paragraphs: [
          "Avec un salaire brut mensuel de 1 500 €, 2 000 €, 2 500 € ou 3 000 €, le montant ne dépend pas seulement du salaire. L'ancienneté change fortement le résultat.",
          "Exemple indicatif avec 10 ans d'ancienneté : 1 500 € brut donne environ 3 750 € bruts, 2 000 € brut donne environ 5 000 € bruts, 2 500 € brut donne environ 6 250 € bruts et 3 000 € brut donne environ 7 500 € bruts avant vérification conventionnelle."
        ],
        bullets: [
          "Voir l'exemple avec 1 500 € brut : /indemnite-rupture-conventionnelle-salaire-1500",
          "Voir l'exemple avec 2 000 € brut : /indemnite-rupture-conventionnelle-salaire-2000",
          "Voir l'exemple avec 2 500 € brut : /indemnite-rupture-conventionnelle-salaire-2500",
          "Voir l'exemple avec 3 000 € brut : /indemnite-rupture-conventionnelle-salaire-3000"
        ]
      },
      {
        title: "Les erreurs fréquentes",
        paragraphs: [
          "Les erreurs les plus courantes viennent d'une confusion entre le brut, le net, la base de référence et le montant final perçu.",
          "Avant de signer, vérifiez aussi la convention collective et l'impact possible d'une indemnité élevée sur les délais d'indemnisation chômage."
        ],
        bullets: [
          "Confondre salaire brut et salaire net.",
          "Oublier les primes, commissions ou variables réguliers.",
          "Prendre uniquement le dernier mois.",
          "Oublier la convention collective.",
          "Croire que l'indemnité légale est un maximum.",
          "Oublier l'impact possible sur le chômage."
        ]
      },
      {
        title: "Faire une simulation avec le bon salaire",
        paragraphs: [
          commonSimulatorCta,
          "Saisissez d'abord votre salaire brut mensuel, puis ajoutez les moyennes brutes sur 3 ou 12 mois si elles sont plus représentatives. Le résultat sera plus utile qu'un calcul fait à partir du net bancaire."
        ]
      }
    ],
    faq: [
      {
        question: "Pour une rupture conventionnelle, faut-il utiliser le salaire brut ou net ?",
        answer:
          "Il faut utiliser le salaire brut de référence. Le salaire net sert surtout à comprendre le montant réellement perçu, mais il ne suffit pas pour calculer le minimum."
      },
      {
        question: "Quel salaire sert de base au calcul de l'indemnité ?",
        answer:
          "La base est le salaire brut de référence, à relire avec les bulletins de paie, les primes, les variables et les règles conventionnelles applicables."
      },
      {
        question: "Le salaire net est-il pris en compte ?",
        answer:
          "Le salaire net n'est pas la base du minimum légal. Il sert à donner un ordre de grandeur du montant disponible après traitement social et fiscal."
      },
      {
        question: "Les primes comptent-elles dans le salaire de référence ?",
        answer:
          "Des primes régulières, variables, commissions ou un 13e mois peuvent parfois modifier la base. Il faut vérifier leur nature et les règles applicables."
      },
      {
        question: "L'indemnité de rupture conventionnelle est-elle versée en brut ou en net ?",
        answer:
          "La convention mentionne généralement un montant brut. Le net perçu dépend ensuite du traitement en paie, des exonérations possibles et de la situation individuelle."
      },
      {
        question: "Peut-on toucher plus que le minimum légal ?",
        answer:
          "Oui. Le minimum légal est un plancher. Une convention collective plus favorable ou une négociation peut conduire à une indemnité supérieure."
      },
      {
        question: "La convention collective peut-elle changer le montant ?",
        answer:
          "Oui. Si elle prévoit une règle plus favorable, il faut en tenir compte avant de valider le montant proposé."
      },
      {
        question: "Quel est l'impact sur le chômage après une rupture conventionnelle ?",
        answer:
          "La rupture conventionnelle peut ouvrir droit au chômage sous conditions. Une indemnité supra-légale peut toutefois influencer certains différés d'indemnisation."
      }
    ]
  },

  {
    slug: "rupture-conventionnelle-refus-employeur-que-faire",
    title: "Rupture conventionnelle refus employeur : que faire ?",
    description:
      "Que faire si l'employeur refuse une rupture conventionnelle : alternatives, discussion, stratégie et points de vigilance.",
    relatedPillars: [
      "/rupture-conventionnelle-cdi",
      "/simulateur-rupture-conventionnelle",
      "/licenciement-indemnite"
    ],
    intro: [
      "Un employeur peut refuser une rupture conventionnelle. Ce mode de rupture repose sur un accord, il n'existe donc pas de droit automatique à l'obtenir.",
      `En cas de refus, il faut comprendre les raisons, préparer une discussion structurée et éviter les décisions précipitées. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Pourquoi l'employeur peut refuser",
        paragraphs: [
          "L'employeur peut refuser pour des raisons d'organisation, de coût, de calendrier, de remplacement ou de stratégie RH.",
          "Le refus n'est pas forcément définitif, mais il impose de revoir la manière de présenter la demande."
        ]
      },
      {
        title: "Comment préparer une nouvelle discussion",
        paragraphs: [
          "Il est utile d'arriver avec une date réaliste, une proposition de transition et une estimation chiffrée.",
          commonSimulatorCta
        ]
      },
      {
        title: "Alternatives possibles",
        paragraphs: [
          "Selon le contexte, d'autres solutions peuvent exister : mobilité interne, démission, négociation différée ou autre mode de rupture.",
          "Chaque option a des conséquences différentes, notamment sur l'indemnité et les droits éventuels."
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "rupture-conventionnelle-chomage-conditions",
    title: "Rupture conventionnelle et chômage : conditions",
    description:
      "Comprendre les liens entre rupture conventionnelle et chômage : droits, inscription, différés, indemnité et points à vérifier.",
    relatedPillars: [
      "/rupture-conventionnelle-cdi",
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle"
    ],
    intro: [
      "La rupture conventionnelle homologuée peut permettre une ouverture de droits à l'assurance chômage lorsque les conditions générales sont remplies.",
      `Il faut toutefois distinguer l'ouverture des droits, les délais d'inscription, les différés éventuels et la situation personnelle du salarié. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Principe général",
        paragraphs: [
          "La rupture conventionnelle est différente d'une démission classique. Elle peut permettre au salarié de s'inscrire à France Travail et de faire examiner ses droits.",
          "Le droit effectif dépend toutefois de la situation individuelle et des règles applicables."
        ]
      },
      {
        title: "Impact de l'indemnité",
        paragraphs: [
          "Une indemnité importante, notamment supra-légale, peut avoir des effets sur les différés d'indemnisation.",
          "Il est donc important d'estimer le montant avant de signer."
        ]
      },
      {
        title: "Bon réflexe",
        paragraphs: [
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "simulateur-indemnite-licenciement-vs-rupture",
    title: "Simulateur indemnité licenciement vs rupture",
    description:
      "Comparer une indemnité de licenciement et une rupture conventionnelle : méthode, exemples, différences et simulateur.",
    relatedPillars: [
      "/licenciement-indemnite",
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle"
    ],
    intro: [
      "Comparer indemnité de licenciement et rupture conventionnelle permet de comprendre les montants en jeu lors d'une fin de CDI.",
      `Les règles peuvent être proches sur le minimum, mais la procédure et le contexte sont différents. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Base commune",
        paragraphs: [
          "La rupture conventionnelle ne peut pas être inférieure au minimum légal utilisé comme repère. C'est pourquoi la comparaison avec l'indemnité de licenciement est utile.",
          "Dans les deux cas, l'ancienneté et le salaire brut de référence sont déterminants."
        ]
      },
      {
        title: "Différences",
        paragraphs: [
          "Le licenciement est une décision employeur. La rupture conventionnelle est un accord. Le montant ne suffit donc pas à choisir.",
          "Il faut comparer procédure, calendrier, risques et droits."
        ]
      },
      {
        title: "Simulation",
        paragraphs: [
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "rupture-conventionnelle-avantage-et-inconvenients",
    title: "Rupture conventionnelle : avantages et inconvénients",
    description:
      "Avantages et inconvénients de la rupture conventionnelle pour le salarié et l'employeur : indemnité, procédure, chômage et risques.",
    relatedPillars: [
      "/rupture-conventionnelle-cdi",
      "/simulateur-rupture-conventionnelle",
      "/licenciement-indemnite"
    ],
    intro: [
      "La rupture conventionnelle présente des avantages, mais aussi des limites. Elle peut faciliter une séparation amiable, mais elle doit rester librement consentie et bien préparée.",
      `${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Avantages",
        paragraphs: [
          "Pour le salarié, elle permet de percevoir une indemnité et de sortir d'un CDI dans un cadre organisé. Pour l'employeur, elle peut sécuriser une séparation lorsque les deux parties sont d'accord.",
          "Elle offre aussi une meilleure lisibilité qu'un conflit prolongé."
        ]
      },
      {
        title: "Inconvénients",
        paragraphs: [
          "Elle suppose un accord. Si l'une des parties refuse, elle ne peut pas être imposée.",
          "Elle peut aussi être mal utilisée si le consentement est discutable ou si le montant est mal vérifié."
        ]
      },
      {
        title: "Avant de décider",
        paragraphs: [
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "rupture-conventionnelle-salaire-eleve-calcul",
    title: "Rupture conventionnelle salaire élevé : calcul",
    description:
      "Calculer une rupture conventionnelle avec un salaire élevé : minimum légal, net indicatif, fiscalité et négociation.",
    relatedPillars: [
      "/calcul-indemnite-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle"
    ],
    intro: [
      "Avec un salaire élevé, le montant de rupture conventionnelle peut devenir significatif. Le calcul doit être particulièrement rigoureux, car les enjeux sociaux, fiscaux et de négociation sont plus importants.",
      `${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Calcul du minimum",
        paragraphs: [
          "Le minimum dépend toujours du salaire brut de référence et de l'ancienneté. Plus le salaire est élevé, plus l'impact d'une erreur de base est important.",
          "Il faut donc vérifier les primes, bonus, variables et avantages éventuels."
        ]
      },
      {
        title: "Net indicatif et fiscalité",
        paragraphs: [
          "Le net indicatif peut varier fortement lorsque l'indemnité dépasse certains seuils ou contient une part supra-légale.",
          "Une validation paie est recommandée avant signature."
        ]
      },
      {
        title: "Simulation",
        paragraphs: [
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "fiscalite-indemnite-rupture-conventionnelle",
    title: "Fiscalité indemnité rupture conventionnelle",
    description:
      "Comprendre la fiscalité d'une indemnité de rupture conventionnelle : brut, net, exonérations possibles, part supra-légale et vigilance.",
    relatedPillars: [
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle"
    ],
    intro: [
      "La fiscalité de l'indemnité de rupture conventionnelle est un sujet sensible, car le montant brut ne correspond pas toujours au montant réellement perçu.",
      `Le traitement social et fiscal dépend notamment du montant, de la part légale ou supra-légale et de la situation du salarié. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Brut, net et fiscalité",
        paragraphs: [
          "Le calcul du minimum se fait d'abord en brut. Le net dépend ensuite du traitement en paie et des règles sociales et fiscales applicables.",
          "Il ne faut donc pas confondre estimation brute et montant final versé."
        ]
      },
      {
        title: "Part supra-légale",
        paragraphs: [
          "Lorsque le montant négocié dépasse le minimum, la part supra-légale peut avoir un traitement différent.",
          "C'est un point à vérifier avant de signer, surtout en cas d'indemnité importante."
        ]
      },
      {
        title: "Bon réflexe",
        paragraphs: [
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "rupture-conventionnelle-fonction-publique-possible",
    title: "Rupture conventionnelle fonction publique : est-ce possible ?",
    description:
      "Comprendre la rupture conventionnelle dans la fonction publique : principe, différences avec le privé, vigilance et limites du simulateur.",
    relatedPillars: [
      "/outils-rh",
      "/rupture-conventionnelle-cdi",
      "/simulateur-rupture-conventionnelle"
    ],
    intro: [
      "La rupture conventionnelle existe également dans certains cadres de la fonction publique, mais elle ne répond pas exactement aux mêmes règles qu'une rupture conventionnelle de CDI dans le secteur privé.",
      `Il faut donc éviter d'utiliser un simulateur privé sans vérifier le statut applicable. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Attention au statut",
        paragraphs: [
          "Les règles varient selon que la personne relève du secteur privé, de la fonction publique, d'un contrat de droit public ou d'un statut particulier.",
          "Le simulateur RuptureConv est d'abord conçu pour le cadre du CDI en droit privé."
        ]
      },
      {
        title: "Pourquoi vérifier avant de calculer",
        paragraphs: [
          "Les montants, procédures et conditions peuvent différer. Une estimation faite avec les règles du privé peut donc être inadaptée.",
          "Il faut se référer aux textes applicables au statut concerné."
        ]
      },
      {
        title: "Utilité de l'outil",
        paragraphs: [
          "L'outil peut aider à comprendre la logique générale d'une indemnité, mais il ne doit pas être utilisé comme validation pour un dossier de fonction publique."
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "rupture-conventionnelle-cdi-conditions",
    title: "Rupture conventionnelle CDI : conditions",
    description:
      "Les conditions à respecter pour une rupture conventionnelle en CDI : accord libre, procédure, indemnité, homologation et vigilance.",
    relatedPillars: [
      "/rupture-conventionnelle-cdi",
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle"
    ],
    intro: [
      "La rupture conventionnelle CDI suppose plusieurs conditions : un accord libre, une convention écrite, un délai de rétractation, une homologation et le versement d'une indemnité minimale.",
      `${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Accord libre",
        paragraphs: [
          "La rupture ne doit pas être imposée. Le consentement du salarié et de l'employeur doit être réel.",
          "En cas de pression, le dossier peut devenir contestable."
        ]
      },
      {
        title: "Indemnité minimale",
        paragraphs: [
          "L'indemnité doit respecter le minimum applicable. Elle peut être supérieure en cas de négociation.",
          commonSimulatorCta
        ]
      },
      {
        title: "Homologation",
        paragraphs: [
          "La procédure doit être homologuée avant que la rupture devienne effective.",
          "Le calendrier doit donc être anticipé."
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "indemnite-supra-legale-explication",
    title: "Indemnité supra légale : explication",
    description:
      "Comprendre l'indemnité supra-légale dans une rupture conventionnelle : définition, négociation, fiscalité et exemple.",
    relatedPillars: [
      "/indemnite-legale-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle"
    ],
    intro: [
      "L'indemnité supra-légale correspond à la part d'indemnité versée au-delà du minimum légal ou conventionnel. Elle est souvent liée à une négociation.",
      `Elle doit être distinguée du minimum obligatoire, car son traitement peut être différent. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Définition",
        paragraphs: [
          "Le minimum légal ou conventionnel constitue le plancher. Tout montant ajouté au-delà peut être qualifié de supra-légal.",
          "Cette part peut refléter un accord de départ, un contexte particulier ou une négociation."
        ]
      },
      {
        title: "Exemple",
        paragraphs: [
          "Si le minimum applicable est de 5 000 euros et que les parties conviennent de 8 000 euros, la part supra-légale est de 3 000 euros.",
          "Il faut ensuite vérifier le traitement social et fiscal."
        ]
      },
      {
        title: "Simulation",
        paragraphs: [
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "rupture-conventionnelle-et-conges-payes",
    title: "Rupture conventionnelle et congés payés",
    description:
      "Comprendre le traitement des congés payés lors d'une rupture conventionnelle : indemnité, solde de tout compte et vigilance.",
    relatedPillars: [
      "/rupture-conventionnelle-cdi",
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle"
    ],
    intro: [
      "Lors d'une rupture conventionnelle, les congés payés restants doivent être traités séparément de l'indemnité spécifique de rupture.",
      `Il ne faut donc pas confondre indemnité de rupture et indemnité compensatrice de congés payés. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Deux sommes différentes",
        paragraphs: [
          "L'indemnité de rupture conventionnelle correspond à la rupture du contrat. Les congés payés correspondent aux droits acquis non pris.",
          "Ces montants peuvent apparaître ensemble dans le solde de tout compte, mais ils n'ont pas la même nature."
        ]
      },
      {
        title: "À vérifier",
        paragraphs: [
          "Il faut vérifier le compteur de congés, la date de rupture et les éventuels jours pris avant le départ.",
          "Une erreur sur les congés peut modifier le montant total versé."
        ]
      },
      {
        title: "Simulation",
        paragraphs: [
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "rupture-conventionnelle-et-preavis",
    title: "Rupture conventionnelle et préavis",
    description:
      "Rupture conventionnelle et préavis : règles 2026, délais, date de rupture, différence avec licenciement et calcul de l'indemnité.",
    relatedPillars: [
      "/calcul-indemnite-rupture-conventionnelle-net",
      "/rupture-conventionnelle-cdi",
      "/simulateur-rupture-conventionnelle",
      "/licenciement-indemnite",
      "/indemnite-legale-rupture-conventionnelle",
      "/modele-lettre-rupture-conventionnelle"
    ],
    intro: [
      "En rupture conventionnelle, il n'y a pas de préavis classique comme dans une démission ou un licenciement. La date de rupture est fixée dans la convention, après le délai de rétractation et l'homologation.",
      `${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Pas de préavis classique",
        paragraphs: [
          "En rupture conventionnelle, les parties fixent une date de rupture en tenant compte du délai de rétractation et de l'homologation.",
          "Il ne s'agit pas d'un préavis imposé de la même manière qu'en licenciement ou démission."
        ]
      },
      {
        title: "Pourquoi anticiper",
        paragraphs: [
          "Même sans préavis classique, il faut organiser la transition, la passation, les congés et les documents de fin de contrat.",
          "La date doit rester compatible avec la procédure."
        ]
      },
      {
        title: "Avant de signer",
        paragraphs: [
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "calcul-indemnite-rupture-conventionnelle-exemple",
    title: "Calcul indemnité rupture conventionnelle : exemple",
    description:
      "Exemples de calcul d'indemnité de rupture conventionnelle avec salaires, anciennetés et méthode détaillée.",
    relatedPillars: [
      "/calcul-indemnite-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle"
    ],
    intro: [
      "Les exemples de calcul permettent de comprendre concrètement comment fonctionne l'indemnité de rupture conventionnelle.",
      `Ils donnent un ordre de grandeur, mais chaque dossier doit être vérifié avec ses données réelles. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Exemple avec 3 ans d'ancienneté",
        paragraphs: [
          "Avec 3 ans d'ancienneté et 2 100 euros bruts mensuels, le minimum indicatif est de 2 100 x 1/4 x 3, soit 1 575 euros bruts.",
          "Ce montant peut changer si le salaire de référence doit inclure des primes."
        ]
      },
      {
        title: "Exemple avec 8 ans d'ancienneté",
        paragraphs: [
          "Avec 8 ans d'ancienneté et 2 800 euros bruts, le minimum indicatif est de 5 600 euros bruts.",
          "La convention collective doit ensuite être vérifiée."
        ]
      },
      {
        title: "Exemple avec 12 ans d'ancienneté",
        paragraphs: [
          "Avec 12 ans d'ancienneté et 3 000 euros bruts, les dix premières années représentent 7 500 euros, puis les deux années suivantes environ 2 000 euros. Le total indicatif atteint 9 500 euros bruts.",
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  },

  {
    slug: "erreur-calcul-indemnite-rupture-conventionnelle",
    title: "Erreur calcul indemnité rupture conventionnelle",
    description:
      "Les erreurs fréquentes dans le calcul d'une indemnité de rupture conventionnelle : salaire, ancienneté, convention collective, brut/net.",
    relatedPillars: [
      "/calcul-indemnite-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle"
    ],
    intro: [
      "Une erreur de calcul d'indemnité de rupture conventionnelle peut venir d'une ancienneté mal retenue, d'un salaire de référence incomplet ou d'une convention collective oubliée.",
      `Identifier ces erreurs avant signature permet d'éviter une mauvaise estimation. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Erreur sur l'ancienneté",
        paragraphs: [
          "Une date d'entrée ou de rupture mal prise en compte peut modifier le nombre d'années retenues.",
          "Les fractions d'année doivent être traitées avec attention."
        ]
      },
      {
        title: "Erreur sur le salaire",
        paragraphs: [
          "Oublier une prime régulière, une variable ou une moyenne plus favorable peut sous-estimer le montant.",
          "Le salaire brut de référence doit être cohérent avec la rémunération réelle."
        ]
      },
      {
        title: "Erreur sur la convention collective",
        paragraphs: [
          "Certaines conventions prévoient mieux que le minimum légal. Ne pas les vérifier peut conduire à un montant trop faible.",
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
  }
];

export const blogPosts: BlogPost[] = blogPostsData;

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post])
) as Record<string, BlogPost>;

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildCtrTitle(title: string) {
  const normalized = title
    .replace(/\s+\|\s+RuptureConv\.?$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  const sentence = normalized.toLocaleLowerCase("fr-FR");

  return sentence
    .replace(/^[^\p{L}]*\p{L}/u, (match) => match.toLocaleUpperCase("fr-FR"))
    .replace(/\bcdi\b/giu, "CDI")
    .replace(/\brh\b/giu, "RH")
    .replace(/\bare\b/giu, "ARE")
    .replace(/\bfaq\b/giu, "FAQ")
    .replace(/\bfrance travail\b/giu, "France Travail")
    .replace(/\bruptureconv\b/giu, "RuptureConv");
}
