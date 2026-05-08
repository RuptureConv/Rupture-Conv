import type { FaqEntry } from "@/lib/seo-content";

export type ComparisonRow = {
  criteria: string;
  first: string;
  second: string;
  note?: string;
};

export type ComparisonPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  subtitle: string;
  takeaways: string[];
  firstOption: string;
  secondOption: string;
  rows: ComparisonRow[];
  sections: {
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  example: {
    situation: string;
    body: string;
    result?: string;
  };
  faq: FaqEntry[];
  relatedLinks: {
    href: string;
    label: string;
  }[];
  comparisonCards: {
    title: string;
    items: readonly [
      {
        title: string;
        points: readonly string[];
      },
      {
        title: string;
        points: readonly string[];
      }
    ];
  };
};

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "rupture-conventionnelle-ou-demission",
    title: "Rupture conventionnelle ou démission : que choisir ?",
    description:
      "Comparez rupture conventionnelle et démission : chômage, indemnité, préavis, négociation et sécurité avant de choisir la bonne option.",
    h1: "Rupture conventionnelle ou démission : quelle option choisir ?",
    eyebrow: "Comparatif salarié",
    subtitle:
      "Vous envisagez de quitter votre emploi, mais vous hésitez entre une démission et une rupture conventionnelle ? Voici les différences à comprendre avant d’engager la discussion.",
    firstOption: "Rupture conventionnelle",
    secondOption: "Démission",
    takeaways: [
      "La rupture conventionnelle suppose un accord entre le salarié et l’employeur.",
      "La démission est une décision du salarié, mais elle n’ouvre pas toujours droit au chômage.",
      "L’indemnité spécifique est un point majeur de différence entre les deux options.",
      "Le bon choix dépend du calendrier, du projet professionnel et du niveau de sécurité recherché."
    ],
    rows: [
      {
        criteria: "Droit au chômage",
        first: "Possible après homologation, sous conditions France Travail.",
        second: "En principe non, sauf cas particuliers ou réexamen."
      },
      {
        criteria: "Indemnité de départ",
        first: "Indemnité spécifique obligatoire, au moins égale au minimum applicable.",
        second: "Pas d’indemnité de rupture liée à la démission."
      },
      {
        criteria: "Accord employeur",
        first: "Indispensable : aucune partie ne peut l’imposer.",
        second: "Non, le salarié peut démissionner seul."
      },
      {
        criteria: "Préavis",
        first: "Pas de préavis classique, la date est fixée dans la convention.",
        second: "Préavis généralement prévu par le contrat ou la convention collective."
      },
      {
        criteria: "Négociation",
        first: "Possible sur le montant, la date et les conditions de départ.",
        second: "Limitée, sauf accord amiable sur le préavis ou l’organisation."
      },
      {
        criteria: "Sécurité financière",
        first: "Souvent plus protectrice si l’accord est clair et le montant vérifié.",
        second: "Plus simple, mais financièrement plus exposée."
      }
    ],
    comparisonCards: {
      title: "Deux logiques très différentes",
      items: [
        {
          title: "Rupture conventionnelle",
          points: [
            "Départ négocié et formalisé.",
            "Indemnité spécifique à prévoir.",
            "Accès au chômage possible sous conditions."
          ]
        },
        {
          title: "Démission",
          points: [
            "Décision unilatérale du salarié.",
            "Pas d’indemnité de rupture.",
            "Droits au chômage plus incertains."
          ]
        }
      ]
    },
    sections: [
      {
        title: "Quand la rupture conventionnelle peut être plus intéressante",
        paragraphs: [
          "La rupture conventionnelle peut être intéressante lorsque le salarié souhaite partir avec un cadre clair, une indemnité et une meilleure visibilité sur la suite. Elle peut aussi permettre d’organiser une transition plus apaisée avec l’employeur.",
          "Elle reste toutefois fondée sur un accord libre. Si l’employeur refuse, le salarié ne peut pas l’imposer. Le montant proposé doit également être vérifié avant signature."
        ]
      },
      {
        title: "Quand la démission peut être plus adaptée",
        paragraphs: [
          "La démission peut être adaptée lorsqu’un nouveau poste est déjà trouvé, lorsque le salarié souhaite partir rapidement ou lorsque la relation de travail ne permet plus d’attendre une négociation.",
          "Elle est plus simple à déclencher, mais elle doit être anticipée : préavis, absence d’indemnité spécifique, droits au chômage généralement limités et organisation du départ."
        ]
      },
      {
        title: "Ce qu’il faut vérifier avant de choisir",
        paragraphs: [
          "Avant de choisir, il faut regarder le projet réel : avez-vous déjà un nouvel emploi ? Souhaitez-vous sécuriser une période de transition ? Le montant de l’indemnité est-il important pour votre situation ?",
          "Il est aussi utile d’estimer l’indemnité potentielle avant de discuter avec l’employeur. Cela permet de savoir si une rupture conventionnelle vaut la peine d’être proposée."
        ],
        bullets: [
          "Le montant indicatif de l’indemnité.",
          "Les droits au chômage selon la situation.",
          "Le préavis éventuel en cas de démission.",
          "La position probable de l’employeur.",
          "Le calendrier souhaité pour quitter l’entreprise."
        ]
      }
    ],
    example: {
      situation: "Salarié en CDI avec un nouveau projet encore incertain",
      body:
        "Un salarié qui veut quitter son poste sans nouvel emploi signé peut avoir intérêt à étudier la rupture conventionnelle avant de démissionner. Elle peut offrir une indemnité et un cadre plus sécurisant, si l’employeur accepte.",
      result:
        "Le simulateur permet d’obtenir un premier montant indicatif avant l’échange."
    },
    faq: [
      {
        question: "Peut-on toucher le chômage après une démission ?",
        answer:
          "En principe, une démission n’ouvre pas automatiquement droit au chômage. Certains cas particuliers existent, et un réexamen peut être possible après une période donnée."
      },
      {
        question: "Une rupture conventionnelle peut-elle être refusée ?",
        answer:
          "Oui. L’employeur comme le salarié peuvent refuser. La rupture conventionnelle repose toujours sur un accord commun."
      },
      {
        question: "Quel choix est le plus avantageux financièrement ?",
        answer:
          "La rupture conventionnelle est souvent plus protectrice financièrement, car elle prévoit une indemnité spécifique. Le résultat dépend toutefois du montant négocié et de la situation."
      },
      {
        question: "Peut-on démissionner après un refus de rupture conventionnelle ?",
        answer:
          "Oui, mais la démission a des conséquences différentes. Il faut notamment vérifier le préavis et les droits au chômage avant de décider."
      }
    ],
    relatedLinks: [
      { href: "/#simulateur", label: "Calculer mon indemnité" },
      { href: "/rupture-conventionnelle-chomage", label: "Rupture conventionnelle et chômage" },
      { href: "/modele-lettre-rupture-conventionnelle", label: "Modèle de demande" },
      { href: "/negocier-rupture-conventionnelle", label: "Préparer une négociation" }
    ]
  },
  {
    slug: "rupture-conventionnelle-ou-licenciement",
    title: "Rupture conventionnelle ou licenciement : comparer",
    description:
      "Comparez rupture conventionnelle et licenciement : indemnité, chômage, procédure, négociation, délais et points de vigilance.",
    h1: "Rupture conventionnelle ou licenciement : quelles différences ?",
    eyebrow: "Comparatif RH",
    subtitle:
      "Ces deux modes de rupture peuvent mettre fin à un CDI, mais ils ne répondent pas à la même logique. L’un repose sur un accord, l’autre sur une décision de l’employeur.",
    firstOption: "Rupture conventionnelle",
    secondOption: "Licenciement",
    takeaways: [
      "La rupture conventionnelle est négociée, le licenciement est décidé par l’employeur.",
      "Les deux situations peuvent ouvrir droit au chômage sous conditions.",
      "L’indemnité doit être analysée avec le salaire, l’ancienneté et le contexte.",
      "Le niveau de conflit et la sécurité juridique changent fortement la lecture."
    ],
    rows: [
      {
        criteria: "Origine de la rupture",
        first: "Accord commun entre salarié et employeur.",
        second: "Décision de l’employeur fondée sur un motif."
      },
      {
        criteria: "Droit au chômage",
        first: "Possible après homologation, sous conditions.",
        second: "Possible sous conditions après la fin du contrat."
      },
      {
        criteria: "Indemnité",
        first: "Indemnité spécifique au moins égale au minimum applicable.",
        second: "Indemnité de licenciement si les conditions sont remplies."
      },
      {
        criteria: "Procédure",
        first: "Entretien, convention, rétractation, homologation.",
        second: "Convocation, entretien préalable, notification, motif."
      },
      {
        criteria: "Négociation",
        first: "Possible sur le montant et la date de rupture.",
        second: "Plus limitée, sauf transaction ou discussion séparée."
      },
      {
        criteria: "Risque de conflit",
        first: "Souvent plus apaisée si le consentement est réel.",
        second: "Plus conflictuel selon le motif et le contexte."
      }
    ],
    comparisonCards: {
      title: "Accord commun ou décision employeur",
      items: [
        {
          title: "Rupture conventionnelle",
          points: [
            "Cadre négocié entre les parties.",
            "Homologation administrative.",
            "Montant parfois négociable."
          ]
        },
        {
          title: "Licenciement",
          points: [
            "Décision portée par l’employeur.",
            "Motif à formaliser.",
            "Contentieux possible selon le dossier."
          ]
        }
      ]
    },
    sections: [
      {
        title: "Quand la rupture conventionnelle peut être plus adaptée",
        paragraphs: [
          "La rupture conventionnelle peut être plus adaptée lorsque les deux parties souhaitent organiser un départ sans entrer dans une logique conflictuelle. Elle permet de discuter de la date, du montant et des modalités pratiques.",
          "Elle suppose un consentement réel. Elle ne doit pas servir à contourner une difficulté disciplinaire, économique ou relationnelle qui nécessiterait une autre procédure."
        ]
      },
      {
        title: "Quand le licenciement peut devenir le cadre pertinent",
        paragraphs: [
          "Le licenciement relève d’une décision de l’employeur. Il peut être envisagé lorsqu’un motif existe et que l’employeur choisit d’assumer cette procédure plutôt que de rechercher un accord.",
          "Pour le salarié, la lecture dépend beaucoup du motif, des éléments du dossier et du respect de la procédure. En cas de doute, une analyse personnalisée est préférable."
        ]
      },
      {
        title: "Ce qu’il faut comparer avant d’accepter",
        paragraphs: [
          "Comparer les deux options ne revient pas seulement à comparer deux montants. Il faut aussi regarder le calendrier, le contexte, les risques de contestation, la possibilité de négocier et les documents de fin de contrat.",
          "Une estimation de l’indemnité de rupture conventionnelle aide à savoir si la proposition constitue une base sérieuse ou si elle mérite d’être discutée."
        ],
        bullets: [
          "Le minimum applicable selon l’ancienneté.",
          "Le montant éventuellement négocié.",
          "La solidité du motif en cas de licenciement.",
          "Les délais et la date de fin souhaitée.",
          "Le niveau de tension entre les parties."
        ]
      }
    ],
    example: {
      situation: "Départ discuté après une période de tension",
      body:
        "Lorsqu’un employeur envisage une séparation et que le salarié souhaite éviter une procédure conflictuelle, la rupture conventionnelle peut être une piste. Le montant, la date et les conditions doivent toutefois être discutés clairement.",
      result:
        "L’estimation de l’indemnité donne un repère utile avant de comparer les scénarios."
    },
    faq: [
      {
        question: "Rupture conventionnelle et licenciement donnent-ils droit au chômage ?",
        answer:
          "Les deux peuvent ouvrir droit au chômage sous conditions. Les démarches et les documents de fin de contrat doivent être correctement établis."
      },
      {
        question: "L’indemnité est-elle la même dans les deux cas ?",
        answer:
          "Pas toujours. Les bases peuvent être proches, mais le montant dépend du minimum applicable, de la convention collective et d’une éventuelle négociation."
      },
      {
        question: "Un employeur peut-il proposer une rupture conventionnelle au lieu d’un licenciement ?",
        answer:
          "Oui, mais le salarié reste libre d’accepter ou de refuser. Le consentement doit être réel et la procédure doit être respectée."
      },
      {
        question: "Quel choix limite le plus le conflit ?",
        answer:
          "La rupture conventionnelle peut être plus apaisée si elle est librement négociée. Mais elle n’est pas adaptée à toutes les situations, notamment lorsque le désaccord est profond."
      }
    ],
    relatedLinks: [
      { href: "/licenciement-indemnite", label: "Indemnité de licenciement" },
      { href: "/calcul-indemnite-rupture-conventionnelle", label: "Calcul de l’indemnité" },
      { href: "/indemnite-legale-rupture-conventionnelle", label: "Indemnité légale" },
      { href: "/#simulateur", label: "Faire une simulation" }
    ]
  },
  {
    slug: "rupture-conventionnelle-ou-abandon-de-poste",
    title: "Rupture conventionnelle ou abandon de poste : comparer",
    description:
      "Comparez rupture conventionnelle et abandon de poste : risques, chômage, indemnité, procédure et alternatives plus sécurisées.",
    h1: "Rupture conventionnelle ou abandon de poste : que faut-il savoir ?",
    eyebrow: "Comparatif vigilance",
    subtitle:
      "L’abandon de poste peut sembler être une sortie rapide, mais il comporte des risques importants. La rupture conventionnelle offre un cadre plus lisible lorsqu’un accord est possible.",
    firstOption: "Rupture conventionnelle",
    secondOption: "Abandon de poste",
    takeaways: [
      "L’abandon de poste est risqué et ne doit pas être vu comme une solution simple.",
      "La rupture conventionnelle offre un cadre écrit, une indemnité et une procédure connue.",
      "Les conséquences chômage d’un abandon de poste doivent être vérifiées avec prudence.",
      "Avant d’agir, il vaut mieux comparer les délais, le montant et le niveau de risque."
    ],
    rows: [
      {
        criteria: "Cadre juridique",
        first: "Procédure organisée et homologuée.",
        second: "Situation non sécurisée, souvent conflictuelle."
      },
      {
        criteria: "Indemnité",
        first: "Indemnité spécifique obligatoire si la rupture est homologuée.",
        second: "Pas d’indemnité spécifique liée à l’abandon."
      },
      {
        criteria: "Chômage",
        first: "Possible sous conditions après homologation.",
        second: "Analyse délicate, à vérifier selon la situation et les règles applicables."
      },
      {
        criteria: "Délais",
        first: "Calendrier encadré par la procédure.",
        second: "Durée incertaine, dépend de la réaction de l’employeur."
      },
      {
        criteria: "Risque de conflit",
        first: "Réduit si l’accord est clair.",
        second: "Élevé : absence injustifiée, mise en demeure, procédure possible."
      },
      {
        criteria: "Lisibilité pour la suite",
        first: "Documents de fin de contrat dans un cadre défini.",
        second: "Situation plus difficile à expliquer et à anticiper."
      }
    ],
    comparisonCards: {
      title: "Cadre négocié ou situation subie",
      items: [
        {
          title: "Rupture conventionnelle",
          points: [
            "Accord écrit et procédure connue.",
            "Indemnité minimale à vérifier.",
            "Meilleure lisibilité pour la suite."
          ]
        },
        {
          title: "Abandon de poste",
          points: [
            "Absence non sécurisée.",
            "Conséquences incertaines.",
            "Risque de conflit plus élevé."
          ]
        }
      ]
    },
    sections: [
      {
        title: "Pourquoi l’abandon de poste est une option risquée",
        paragraphs: [
          "L’abandon de poste consiste à cesser de venir travailler sans autorisation ni justification. Même si cette situation peut conduire à une rupture du contrat, elle crée une période d’incertitude et peut dégrader fortement la relation avec l’employeur.",
          "Les conséquences peuvent être importantes : absence de rémunération, mise en demeure, procédure disciplinaire, délais imprévisibles et lecture plus complexe des droits au chômage."
        ]
      },
      {
        title: "Quand la rupture conventionnelle mérite d’être proposée",
        paragraphs: [
          "Si le salarié souhaite partir mais veut éviter une sortie brutale, la rupture conventionnelle peut être une piste plus lisible. Elle permet de poser le sujet, de discuter du calendrier et d’estimer une indemnité.",
          "L’employeur peut refuser. Mais même en cas de refus, avoir formulé une demande claire et professionnelle est souvent préférable à une absence non expliquée."
        ]
      },
      {
        title: "Ce qu’il faut vérifier avant de prendre une décision",
        paragraphs: [
          "Avant d’envisager une option risquée, il faut regarder les alternatives : demande de rupture conventionnelle, démission, négociation d’un départ, arrêt justifié si l’état de santé le nécessite, ou accompagnement personnalisé.",
          "Le montant potentiel de l’indemnité, la situation financière immédiate et les droits chômage doivent être analysés avant tout choix."
        ],
        bullets: [
          "La possibilité réelle d’un accord avec l’employeur.",
          "Le montant indicatif de l’indemnité.",
          "Les conséquences sur les revenus pendant la transition.",
          "Les droits chômage selon la situation.",
          "Le risque de conflit et la trace laissée dans le dossier."
        ]
      }
    ],
    example: {
      situation: "Salarié épuisé qui veut partir rapidement",
      body:
        "Un salarié qui ne se projette plus dans son poste peut être tenté de ne plus revenir. Avant d’en arriver là, il est souvent plus prudent d’évaluer une rupture conventionnelle, une démission préparée ou une autre solution adaptée.",
      result:
        "Une simulation d’indemnité aide à mesurer ce qui pourrait être discuté si l’employeur accepte d’ouvrir le dialogue."
    },
    faq: [
      {
        question: "L’abandon de poste est-il risqué ?",
        answer:
          "Oui. Il peut entraîner une période sans salaire, une réaction disciplinaire de l’employeur et des conséquences difficiles à anticiper."
      },
      {
        question: "L’abandon de poste donne-t-il droit au chômage ?",
        answer:
          "La situation doit être vérifiée avec prudence. Les règles ont évolué et l’analyse dépend du contexte, des démarches de l’employeur et de la situation du salarié."
      },
      {
        question: "La rupture conventionnelle est-elle toujours préférable ?",
        answer:
          "Elle est souvent plus lisible si un accord est possible, mais elle ne peut pas être imposée. Chaque situation doit être examinée avec prudence."
      },
      {
        question: "Que faire si l’employeur refuse la rupture conventionnelle ?",
        answer:
          "Il faut réévaluer les options : nouvelle discussion, démission préparée, accompagnement RH ou juridique, ou autre solution adaptée au contexte."
      }
    ],
    relatedLinks: [
      { href: "/modele-lettre-rupture-conventionnelle", label: "Demander une rupture conventionnelle" },
      { href: "/rupture-conventionnelle-chomage", label: "Comprendre le chômage" },
      { href: "/negocier-rupture-conventionnelle", label: "Préparer la négociation" },
      { href: "/#simulateur", label: "Estimer mon indemnité" }
    ]
  }
];

export const comparisonPageBySlug = Object.fromEntries(
  comparisonPages.map((page) => [page.slug, page])
) as Record<string, ComparisonPage>;
