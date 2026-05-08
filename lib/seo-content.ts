import { siteName, siteUrl } from "@/lib/site";

export type FaqEntry = {
  question: string;
  answer: string;
};

export type SeoSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  boxedText?: string[];
};

export type PillarPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
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
      "Oui. L'outil peut aider un employeur, un dirigeant ou un service RH à préparer une première enveloppe. Il ne remplace pas une validation paie, juridique ou conventionnelle, notamment en cas de rémunération variable, absence longue ou statut particulier."
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
          "Le bon réflexe consiste à faire une première simulation avant l'entretien, puis à refaire le calcul avec les informations vérifiées : ancienneté exacte, salaire moyen, primes, congés restants et convention collective. Cela permet d'arriver avec une vision plus claire du dossier."
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
      "Pour obtenir une estimation plus fiable, il est recommandé de vérifier les informations saisies, de relire la convention collective et de demander un accompagnement personnalisé en cas de situation complexe."
    ]
  },

  {
    slug: "calcul-indemnite-rupture-conventionnelle",
    title: `Calcul indemnité rupture conventionnelle | ${siteName}`,
    h1: "Calcul de l’indemnité de rupture conventionnelle",
    description:
      "Méthode complète pour calculer l'indemnité de rupture conventionnelle : ancienneté, salaire de référence, formule légale, exemples chiffrés et simulateur.",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
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
        ]
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
      "Comprendre l'indemnité légale minimale de rupture conventionnelle : formule, ancienneté, salaire de référence, exemples et vérifications nécessaires.",
    relatedLinks: [
      "/calcul-indemnite-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle",
      "/rupture-conventionnelle-cdi",
      "/blog/montant-minimum-rupture-conventionnelle"
    ],
    intro: [
      "L'indemnité légale de rupture conventionnelle représente le montant minimum que le salarié doit recevoir lors d'une rupture conventionnelle homologuée. Elle constitue un plancher : l'employeur et le salarié peuvent convenir d'un montant supérieur, mais pas d'un montant inférieur au minimum applicable.",
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
      "Découvrez les outils RH de RuptureConv pour calculer, comparer et préparer les indemnités de rupture conventionnelle, licenciement et démarches RH.",
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
  "/simulateur-rupture-conventionnelle",
  "/calcul-indemnite-rupture-conventionnelle",
  "/indemnite-legale-rupture-conventionnelle"
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
  angle
}: {
  slug: string;
  h1: string;
  description: string;
  example: string;
  angle: string;
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
      }
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
      }
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
      "Comprenez le calcul net d'une indemnité de rupture conventionnelle avec simulateur gratuit 2026, brut, net indicatif et exemple.",
    angle:
      "Le net dépend du traitement social et fiscal ; il doit donc être lu comme une estimation indicative, jamais comme un montant garanti.",
    example:
      "Exemple : une indemnité brute minimale de 5 000 euros peut donner un net différent selon la part exonérée, la part supra-légale et la situation personnelle du salarié."
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
      "Estimez l'indemnité de rupture conventionnelle pour 10 ans d'ancienneté avec calcul, simulateur gratuit 2026 et exemple concret.",
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
      "/simulateur-rupture-conventionnelle",
      "/negocier-rupture-conventionnelle",
      "/rupture-conventionnelle-chomage",
      "/calcul-indemnite-rupture-conventionnelle",
      "/rupture-conventionnelle-cdi"
    ],
    intro: [
      "Un modèle de lettre de demande de rupture conventionnelle sert à ouvrir une discussion claire avec l’employeur. Il ne valide pas la rupture à lui seul : la rupture conventionnelle repose sur un accord commun, une procédure encadrée, un délai de rétractation et une homologation.",
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
      "Découvrez la mission de RuptureConv : rendre le calcul de rupture conventionnelle plus clair, prudent et accessible en 2026.",
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
    title: "Sources juridiques rupture conventionnelle : calcul simulateur 2026",
    h1: "Sources juridiques",
    description:
      "Références utiles pour comprendre le calcul de l'indemnité de rupture conventionnelle : Code du travail, prudence juridique et mise à jour 2026.",
    relatedLinks: requiredInternalLinks,
    intro: [
      "Cette page rassemble les références juridiques générales utilisées pour structurer les contenus sur la rupture conventionnelle.",
      `Elle rappelle aussi les limites d'un simulateur public : chaque situation peut dépendre d'une convention collective, d'un accord ou d'éléments de paie spécifiques. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Références du Code du travail",
        paragraphs: [
          "Les contenus s'appuient notamment sur les règles générales relatives à la rupture conventionnelle individuelle, à son homologation et au minimum d'indemnité spécifique.",
          "Les références utiles incluent les dispositions du Code du travail relatives à la rupture conventionnelle et à l'indemnité légale de licenciement, qui sert de plancher."
        ],
        bullets: [
          "Code du travail : rupture conventionnelle individuelle.",
          "Code du travail : indemnité légale de licenciement.",
          "Convention collective applicable au salarié.",
          "Bulletins de paie et éléments variables de rémunération."
        ]
      },
      {
        title: "Informations prudentes",
        paragraphs: [
          "Les exemples du site simplifient volontairement les calculs afin de donner des repères compréhensibles. Ils ne remplacent pas une analyse paie, sociale, fiscale ou juridique.",
          "Une vérification personnalisée est recommandée en cas de rémunération variable, statut particulier, conflit, absence longue ou montant supra-légal important."
        ]
      }
    ],
    faq: commonFaq.slice(0, 3),
    conclusion: [
      "Les sources juridiques donnent un cadre, mais le calcul réel dépend toujours du dossier.",
      "Pour une première estimation, utilisez le simulateur puis vérifiez les règles applicables."
    ]
  }
];

export const pillarPages: PillarPage[] = [
  ...basePillarPages,
  ...highIntentPages,
  ...resourcePlaceholderPages,
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
      "Calculer une indemnité de rupture conventionnelle avec 10 ans d'ancienneté : formule, exemple et points de vigilance.",
    relatedPillars: [
      "/calcul-indemnite-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle"
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
    title: "Calcul indemnité : brut ou net ?",
    description:
      "Comprendre la différence entre indemnité brute et nette lors d'une rupture conventionnelle : minimum légal, net indicatif et vigilance.",
    relatedPillars: [
      "/calcul-indemnite-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle"
    ],
    intro: [
      "La question brut ou net revient systématiquement lors d'un calcul d'indemnité. Le minimum légal se raisonne en brut, mais le salarié veut souvent connaître ce qu'il percevra réellement.",
      `Le net indicatif est utile, mais il ne doit pas être confondu avec une garantie de paiement. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Pourquoi le brut est la base",
        paragraphs: [
          "Les règles de calcul utilisent généralement le salaire brut de référence. C'est donc en brut que l'on calcule le minimum applicable.",
          "Le net dépend ensuite du traitement social et fiscal."
        ]
      },
      {
        title: "Pourquoi le net peut varier",
        paragraphs: [
          "Le net peut varier selon les exonérations, la part supra-légale, la situation du salarié et le traitement en paie.",
          "Il est donc préférable de lire le net comme un ordre de grandeur."
        ]
      },
      {
        title: "Bon réflexe",
        paragraphs: [
          "Calculez d'abord le minimum brut, puis demandez une vérification paie pour le net final.",
          commonSimulatorCta
        ]
      }
    ],
    faq: commonFaq
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
      "Existe-t-il un préavis en rupture conventionnelle ? Comprendre la date de rupture, le calendrier et les différences avec le licenciement.",
    relatedPillars: [
      "/rupture-conventionnelle-cdi",
      "/simulateur-rupture-conventionnelle",
      "/licenciement-indemnite"
    ],
    intro: [
      "La rupture conventionnelle ne fonctionne pas comme une démission ou un licenciement avec préavis classique. La date de rupture est fixée dans la convention, après respect de la procédure.",
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
