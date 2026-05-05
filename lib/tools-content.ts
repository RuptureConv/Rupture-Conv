export type ToolContentSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ToolContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: ToolContentSection[];
};

export const toolContentBySlug: Record<string, ToolContent> = {
  "cout-employeur": {
    slug: "cout-employeur",
    title: "Comprendre le coût employeur avant une rupture conventionnelle",
    metaTitle: "Coût employeur rupture conventionnelle | Guide RH",
    metaDescription:
      "Comprendre le coût employeur d'une rupture conventionnelle : indemnité, salaire, charges, budget de négociation et points de vigilance RH.",
    intro:
      "Le coût employeur d'une rupture conventionnelle ne se limite pas au montant affiché dans l'indemnité brute. Pour préparer une discussion sérieuse, l'entreprise doit aussi anticiper la rémunération due jusqu'à la date de départ, les congés payés, les éventuelles primes, les documents de fin de contrat et le traitement social du montant versé. Côté salarié, comprendre cette logique permet de mieux situer la marge de négociation et d'éviter de confondre indemnité brute, net indicatif et budget global pour l'employeur.",
    sections: [
      {
        title: "Pourquoi distinguer indemnité et coût total ?",
        paragraphs: [
          "L'indemnité de rupture conventionnelle correspond au montant spécifique versé à l'occasion de la rupture du CDI. Elle doit respecter un minimum légal, et parfois un montant conventionnel plus favorable lorsque la convention collective le prévoit. Le coût total pour l'entreprise est plus large : il additionne ce montant avec les éléments de paie dus jusqu'à la sortie effective du salarié.",
          "Cette distinction est importante dans une négociation. Un salarié regarde souvent ce qu'il va percevoir, tandis qu'un employeur raisonne aussi en enveloppe budgétaire. Les deux visions ne sont pas opposées, mais elles ne parlent pas exactement du même chiffre. Une estimation claire évite les malentendus et permet de discuter sur une base plus professionnelle."
        ]
      },
      {
        title: "Les principaux éléments à intégrer",
        paragraphs: [
          "Pour préparer un budget, il faut d'abord identifier la date envisagée de fin de contrat. Plus cette date est éloignée, plus la rémunération restant à verser peut peser dans l'enveloppe globale. Il faut ensuite vérifier les congés payés non pris, les primes déjà acquises, les variables éventuels, les avantages en nature et les dispositions prévues par la convention collective.",
          "L'indemnité elle-même doit être comparée au minimum légal. Si le salarié a une ancienneté importante, des primes récurrentes ou une rémunération variable, le salaire de référence mérite une attention particulière. Une erreur sur cette base peut conduire à sous-estimer le montant minimal et créer une discussion inutilement fragile."
        ],
        bullets: [
          "Indemnité minimale de rupture conventionnelle.",
          "Salaire dû jusqu'à la date effective de fin de contrat.",
          "Indemnité compensatrice de congés payés si des jours restent acquis.",
          "Primes, variables ou éléments de rémunération déjà dus.",
          "Éventuel montant négocié au-delà du minimum."
        ]
      },
      {
        title: "Lecture côté employeur",
        paragraphs: [
          "Pour un employeur, l'enjeu est de sécuriser une enveloppe cohérente avant d'ouvrir ou de finaliser la discussion. Le calcul rupture conventionnelle employeur sert alors à répondre à une question simple : quel budget faut-il prévoir pour conclure proprement cette séparation ? Cette approche est utile pour les dirigeants de petites entreprises, les responsables RH et les managers qui doivent valider un montant avant signature.",
          "Un budget trop bas peut retarder la négociation ou donner une impression de manque de préparation. À l'inverse, une enveloppe claire facilite un échange apaisé. Elle permet aussi d'identifier les points à faire vérifier par la paie ou par un conseil lorsque la situation sort du cas simple : absence longue, temps partiel, rémunération variable, convention collective spécifique ou statut particulier."
        ]
      },
      {
        title: "Lecture côté salarié",
        paragraphs: [
          "Pour un salarié, comprendre le coût employeur ne signifie pas renoncer à négocier. Cela permet surtout de mieux lire le rapport entre ce qui est demandé, ce qui sera réellement perçu et ce que l'entreprise devra budgéter. Une demande formulée avec des chiffres clairs est souvent plus crédible qu'un montant arbitraire.",
          "Le salarié peut préparer plusieurs scénarios : le minimum légal, une fourchette de négociation raisonnable, puis un montant plus ambitieux s'il existe des arguments objectifs. Ces arguments peuvent être liés à l'ancienneté, au contexte de départ, à la transition, à la confidentialité, au calendrier ou à la contribution du salarié au sein de l'entreprise. Le simulateur donne un repère, mais il ne remplace pas l'analyse complète du dossier."
        ]
      },
      {
        title: "Points de vigilance avant signature",
        paragraphs: [
          "Avant de signer une convention de rupture, il est prudent de vérifier que le montant brut est correctement indiqué, que la date de rupture est cohérente avec le délai de rétractation et l'homologation, et que les éléments de fin de contrat sont bien anticipés. Une rupture conventionnelle mal préparée peut créer des incompréhensions sur le solde de tout compte ou sur le montant réellement versé.",
          "Le coût employeur reste donc une estimation de pilotage. Il doit être rapproché des règles de paie, de la convention collective et de la situation exacte. RuptureConv aide à poser une première base de calcul claire, mais la validation finale appartient toujours aux parties et, si nécessaire, aux professionnels compétents."
        ]
      }
    ]
  },
  preavis: {
    slug: "preavis",
    title: "Préavis et rupture conventionnelle : ce qu'il faut comprendre",
    metaTitle: "Préavis rupture conventionnelle | Dates, délais et vigilance",
    metaDescription:
      "Guide clair sur le préavis, les délais et la date de départ dans une rupture conventionnelle pour salariés et employeurs.",
    intro:
      "La rupture conventionnelle est souvent confondue avec les règles de préavis applicables à une démission ou à un licenciement. Pourtant, son fonctionnement est différent : les parties fixent ensemble une date de rupture, sous réserve du respect de la procédure et de l'homologation. Comprendre cette différence est essentiel pour préparer un calendrier réaliste, éviter les erreurs de date et sécuriser la fin du contrat de travail.",
    sections: [
      {
        title: "Y a-t-il un préavis en rupture conventionnelle ?",
        paragraphs: [
          "Dans une rupture conventionnelle, on ne parle généralement pas de préavis au sens classique. Contrairement à une démission ou à un licenciement, il n'existe pas automatiquement une période de préavis imposée par la rupture elle-même. Le salarié et l'employeur conviennent d'une date de fin de contrat dans la convention, en tenant compte du délai de rétractation et de la demande d'homologation.",
          "Cette souplesse est l'un des intérêts du dispositif. Elle permet d'adapter le calendrier à la situation réelle : passation de dossiers, recrutement d'un remplaçant, fin d'une mission, contraintes personnelles du salarié ou organisation interne de l'entreprise. Mais cette liberté ne doit pas conduire à négliger les délais obligatoires de procédure."
        ]
      },
      {
        title: "Les délais à ne pas oublier",
        paragraphs: [
          "Après la signature de la convention, un délai de rétractation doit être respecté. Pendant ce délai, chaque partie peut revenir sur sa décision. Une fois ce délai expiré, la demande d'homologation peut être transmise à l'administration. La date de rupture ne doit pas être fixée avant la fin du processus applicable.",
          "En pratique, il est préférable de prévoir une marge de sécurité dans le calendrier. Une date trop proche peut créer de la confusion, notamment si le dossier nécessite une correction, si un jour non ouvrable est mal anticipé ou si l'entreprise doit préparer les documents de fin de contrat."
        ],
        bullets: [
          "Date de signature de la convention.",
          "Délai de rétractation.",
          "Transmission de la demande d'homologation.",
          "Délai d'instruction par l'administration.",
          "Date effective de rupture du contrat."
        ]
      },
      {
        title: "Pourquoi le calendrier compte pour le salarié",
        paragraphs: [
          "Pour un salarié, la date de rupture influence l'organisation personnelle et professionnelle. Elle peut avoir un impact sur la recherche d'emploi, la date d'inscription auprès de France Travail, la perception du solde de tout compte, les congés payés restants ou le démarrage d'un nouveau projet. Il est donc utile de ne pas se concentrer uniquement sur le montant de l'indemnité.",
          "Un calendrier bien préparé permet aussi de clarifier la période pendant laquelle le salarié continue à travailler. Même s'il ne s'agit pas d'un préavis automatique, les parties peuvent convenir que le salarié reste présent jusqu'à une date donnée. Cette période doit être cohérente avec les besoins de transition et avec la volonté réelle des deux parties."
        ]
      },
      {
        title: "Pourquoi le calendrier compte pour l'employeur",
        paragraphs: [
          "Côté employeur, la date de départ conditionne l'organisation de l'équipe, le transfert des informations, la clôture des accès, la préparation de la paie et la remise des documents obligatoires. Une rupture conventionnelle ne doit pas être traitée comme une simple formalité administrative. Le calendrier est un élément de pilotage RH à part entière.",
          "L'entreprise doit également veiller à ce que le consentement du salarié soit libre et que les étapes de la procédure soient respectées. Une date mal fixée ou une pression excessive peut fragiliser la démarche. Un outil de calcul ou de préparation peut aider à cadrer les montants, mais il ne remplace pas la vigilance sur la procédure."
        ]
      },
      {
        title: "Bonnes pratiques pour fixer une date de rupture",
        paragraphs: [
          "La meilleure approche consiste à partir d'une date souhaitée, puis à vérifier si elle est compatible avec les délais nécessaires. Il faut aussi prévoir le temps de préparer la convention, de relire les informations, de calculer l'indemnité et de réunir les éléments de paie. Lorsque la situation est sensible, une marge supplémentaire est souvent préférable.",
          "Pour le salarié comme pour l'employeur, l'objectif est d'obtenir une date claire, comprise par tous, et compatible avec les contraintes légales et pratiques. La rupture conventionnelle est plus simple lorsqu'elle est lisible : montant estimé, calendrier réaliste, étapes connues et documents préparés."
        ],
        bullets: [
          "Ne pas fixer une date de départ trop proche.",
          "Conserver une trace claire des échanges et documents signés.",
          "Vérifier les congés payés et les éléments de rémunération dus.",
          "Anticiper la remise du certificat de travail, du reçu pour solde de tout compte et de l'attestation employeur.",
          "Demander une vérification si la procédure ou les délais semblent incertains."
        ]
      }
    ]
  },
  licenciement: {
    slug: "licenciement",
    title: "Indemnité de licenciement et rupture conventionnelle : quelles différences ?",
    metaTitle: "Indemnité licenciement et rupture conventionnelle | Comparatif",
    metaDescription:
      "Comparer indemnité de licenciement et indemnité de rupture conventionnelle : calcul, contexte, droits et points de vigilance.",
    intro:
      "L'indemnité de licenciement et l'indemnité de rupture conventionnelle sont souvent rapprochées, car elles reposent toutes les deux sur l'ancienneté et le salaire de référence. Pourtant, elles s'inscrivent dans des contextes différents. Le licenciement est une décision de l'employeur fondée sur un motif, tandis que la rupture conventionnelle repose sur un accord commun. Comprendre cette distinction aide salariés et employeurs à comparer les montants, les risques et les conséquences pratiques.",
    sections: [
      {
        title: "Deux logiques différentes",
        paragraphs: [
          "Le licenciement suppose une initiative de l'employeur et l'existence d'un motif. Selon les cas, il peut être personnel, économique, disciplinaire ou non disciplinaire. La rupture conventionnelle, elle, repose sur une volonté commune de mettre fin au contrat. Elle ne sert pas à sanctionner le salarié et ne doit pas être utilisée pour contourner les règles protectrices applicables à certaines situations.",
          "Cette différence de logique influence la façon de discuter le montant. Dans une rupture conventionnelle, les parties peuvent négocier une indemnité supérieure au minimum. Dans un licenciement, le montant dépend de la règle applicable et du contexte. Une contestation peut parfois conduire à d'autres sommes, mais cela relève d'une analyse juridique distincte."
        ]
      },
      {
        title: "Des bases de calcul proches, mais pas toujours identiques",
        paragraphs: [
          "Le minimum légal de l'indemnité de rupture conventionnelle ne peut pas être inférieur à l'indemnité légale de licenciement. C'est pour cette raison que les simulateurs utilisent souvent une base de calcul comparable : ancienneté, salaire de référence, proratisation des années incomplètes et application des seuils légaux.",
          "La comparaison doit toutefois rester prudente. Une convention collective peut prévoir une indemnité plus favorable. Des règles particulières peuvent aussi dépendre du statut, de l'ancienneté, du motif de rupture ou de la situation du salarié. Le résultat affiché par un simulateur constitue donc un repère, pas une conclusion définitive sur tous les droits possibles."
        ],
        bullets: [
          "Ancienneté retenue dans l'entreprise.",
          "Salaire brut de référence.",
          "Règle légale minimale.",
          "Éventuelle règle conventionnelle plus favorable.",
          "Contexte précis de la rupture du contrat."
        ]
      },
      {
        title: "Ce que doit regarder un salarié",
        paragraphs: [
          "Un salarié qui compare licenciement et rupture conventionnelle doit regarder au-delà du montant brut. Il faut comprendre la date de départ, le traitement des congés payés, les documents remis, la possibilité de s'inscrire auprès de France Travail et le délai de carence éventuel. Le net indicatif peut aussi différer du brut affiché selon le traitement social et fiscal applicable.",
          "La rupture conventionnelle peut être intéressante lorsqu'elle permet une sortie négociée, plus lisible et moins conflictuelle. Mais elle suppose un consentement libre. Si le salarié subit une pression, ne comprend pas les conséquences ou se trouve dans une situation protégée, il doit prendre le temps de vérifier avant de signer."
        ]
      },
      {
        title: "Ce que doit regarder un employeur",
        paragraphs: [
          "Pour un employeur, la comparaison entre licenciement et rupture conventionnelle ne doit pas se limiter au coût immédiat. Il faut aussi tenir compte du motif, du risque de contestation, du climat social, des délais et de la capacité à documenter la décision. Une rupture conventionnelle mal utilisée peut être fragile si elle masque en réalité une situation conflictuelle ou une pression sur le salarié.",
          "L'employeur a intérêt à préparer une base de calcul claire et à vérifier les règles conventionnelles. Lorsque la rupture conventionnelle est choisie, le montant doit au minimum respecter la base légale, et la discussion peut porter sur une enveloppe supérieure si les parties souhaitent trouver un accord équilibré."
        ]
      },
      {
        title: "Comparer sans tirer de conclusion automatique",
        paragraphs: [
          "Il n'existe pas de réponse universelle entre licenciement et rupture conventionnelle. Le bon choix dépend du contexte, du consentement des parties, du motif éventuel, du calendrier et des objectifs de chacun. Une estimation chiffrée aide à clarifier la discussion, mais elle ne dit pas à elle seule quelle procédure choisir.",
          "RuptureConv se concentre sur une estimation pédagogique de l'indemnité de rupture conventionnelle. Cette estimation peut servir de point de comparaison avec l'indemnité de licenciement, notamment parce que le minimum légal repose sur une base proche. Pour une décision finale, les parties doivent vérifier la convention collective, les données de paie et les particularités du dossier."
        ]
      },
      {
        title: "Points pratiques à retenir",
        paragraphs: [
          "Avant d'engager une discussion, il est utile de réunir les informations essentielles : date d'entrée, salaire brut moyen, moyennes récentes, convention collective, statut et périodes d'absence. Ces données améliorent la qualité de l'estimation et évitent de discuter sur un montant incomplet.",
          "Le simulateur rupture conventionnelle donne une base claire et rapide. Il peut aider le salarié à préparer ses questions et l'employeur à cadrer son budget. Sa valeur principale est de rendre le calcul lisible, sans prétendre remplacer une consultation juridique ou une validation par la paie."
        ]
      }
    ]
  }
};
