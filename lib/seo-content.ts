import { siteName, siteUrl } from "@/lib/site";

export type FaqEntry = {
  question: string;
  answer: string;
};

export type SeoSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
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

export const pillarPages: PillarPage[] = [
  {
    slug: "simulateur-rupture-conventionnelle",
    title: `Simulateur rupture conventionnelle gratuit | ${siteName}`,
    h1: "Simulateur rupture conventionnelle",
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
          "Un simulateur de rupture conventionnelle sert à transformer une règle de calcul parfois abstraite en estimation concrète. Plutôt que de faire un calcul manuel approximatif, l'utilisateur renseigne ses informations principales et obtient un ordre de grandeur de l'indemnité minimale.",
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
    h1: "Calcul indemnité rupture conventionnelle",
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
    h1: "Indemnité légale rupture conventionnelle",
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
    h1: "Licenciement indemnité",
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
      "Découvrez les outils RH de RuptureConv pour calculer, comparer et préparer les indemnités de rupture conventionnelle, licenciement et futures démarches RH.",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/licenciement-indemnite",
      "/blog"
    ],
    intro: [
      `${siteName} a vocation à devenir une boîte à outils RH simple, accessible et fiable pour les salariés, employeurs, dirigeants et responsables RH. Le premier outil disponible concerne la simulation d'indemnité de rupture conventionnelle, avec l'objectif d'étendre progressivement le site à d'autres calculs utiles en droit du travail.`,
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
        title: "Premier outil : simulateur de rupture conventionnelle",
        paragraphs: [
          "Le simulateur de rupture conventionnelle permet d'obtenir une estimation du minimum brut et un net indicatif. Il est utile pour les salariés qui préparent une négociation, mais aussi pour les employeurs qui veulent cadrer une enveloppe de départ.",
          "L'outil repose sur les données saisies par l'utilisateur : ancienneté, salaire, dates et informations complémentaires. Plus les données sont précises, plus l'estimation est exploitable."
        ]
      },
      {
        title: "Outils RH à développer",
        paragraphs: [
          "À moyen terme, le site pourra accueillir d'autres simulateurs : indemnité de licenciement, préavis, congés payés, coût employeur, comparaison rupture conventionnelle/licenciement ou encore outils d'aide à la préparation d'un départ.",
          "Cette logique permet de construire une ressource complète autour des fins de contrat, mais aussi plus largement autour des décisions RH du quotidien."
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
      "Le simulateur de rupture conventionnelle constitue la première brique d'une plateforme plus large dédiée aux calculs RH et aux fins de contrat."
    ]
  }
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