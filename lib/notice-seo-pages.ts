import type { PillarPage, SeoSection } from "@/lib/seo-content";

const updatedAt = "2026-06-17";
const updatedLabel = "Dernière mise à jour : juin 2026";

const disclaimer =
  "Les règles de préavis varient selon le contrat, la convention collective, le statut et le motif de rupture. Cette page donne un repère pratique, à vérifier avec vos documents.";

const clusterSlugs = [
  "/guide-preavis",
  "/preavis-demission",
  "/preavis-rupture-conventionnelle",
  "/preavis-licenciement",
  "/dispense-de-preavis",
  "/calcul-preavis",
  "/preavis-cadre",
  "/preavis-non-cadre",
  "/conges-payes-pendant-preavis",
  "/arret-maladie-pendant-preavis",
  "/reduction-preavis",
  "/duree-preavis-anciennete",
  "/date-fin-contrat-preavis",
  "/travailler-ailleurs-pendant-preavis",
  "/preavis-abandon-de-poste",
  "/indemnite-compensatrice-preavis"
];

const crossClusterLinks = [
  "/rupture-conventionnelle",
  "/rupture-conventionnelle-delai",
  "/rupture-conventionnelle-chomage",
  "/chomage-are",
  "/chomage-apres-demission",
  "/chomage-apres-licenciement",
  "/simulateur-chomage-rupture-conventionnelle",
  "/salaire-brut-net",
  "/salaire-brut-net-cadre",
  "/salaire-brut-net-non-cadre",
  "/simulateur-rupture-conventionnelle"
];

function linksFor(...paths: string[]) {
  return Array.from(new Set([...paths, ...clusterSlugs, ...crossClusterLinks]));
}

function section(
  title: string,
  paragraphs: string[],
  bullets?: string[],
  boxedText?: string[],
  table?: SeoSection["table"]
): SeoSection {
  return { title, paragraphs, bullets, boxedText, table };
}

const commonFaq = [
  {
    question: "Le préavis commence-t-il le jour de l'envoi du courrier ?",
    answer:
      "Pas toujours. Il démarre en pratique quand l'employeur reçoit l'information ou la notification, sauf règle plus précise prévue par la convention collective, le contrat ou la procédure concernée."
  },
  {
    question: "Peut-on raccourcir un préavis ?",
    answer:
      "Oui, si l'employeur accepte ou si un texte prévoit un cas particulier. Sans accord clair, le salarié reste exposé à une demande d'indemnité pour la partie non exécutée."
  },
  {
    question: "Les congés payés prolongent-ils le préavis ?",
    answer:
      "Des congés fixés avant la rupture peuvent suspendre le préavis. Des congés pris d'un commun accord après la rupture ne le prolongent pas forcément. Il faut regarder les dates et l'accord écrit."
  },
  {
    question: "Un arrêt maladie repousse-t-il la fin du préavis ?",
    answer:
      "En maladie non professionnelle, le préavis continue généralement à courir. En accident du travail ou maladie professionnelle, l'analyse peut changer et mérite une vérification plus prudente."
  },
  {
    question: "La rupture conventionnelle prévoit-elle un préavis ?",
    answer:
      "Non, pas au sens classique. Les parties fixent une date de rupture dans la convention, après le délai de rétractation et l'homologation."
  },
  {
    question: "Quels documents vérifier à la fin du préavis ?",
    answer:
      "Relisez le certificat de travail, le reçu pour solde de tout compte, l'attestation France Travail et la dernière fiche de paie. Les dates, les congés payés et les sommes liées au préavis doivent raconter la même histoire."
  }
];

const quickTable: SeoSection["table"] = {
  headers: ["Situation", "Réflexe utile", "Point à vérifier"],
  rows: [
    ["Démission", "Lire le contrat et la convention collective", "Durée applicable au poste"],
    ["Licenciement", "Relire la lettre et le motif", "Faute grave, faute lourde ou dispense"],
    ["Rupture conventionnelle", "Raisonner en date de rupture", "Rétractation et homologation"],
    ["Congés payés", "Comparer date de pose et date de rupture", "Suspension possible"],
    ["Arrêt maladie", "Identifier l'origine de l'arrêt", "Maladie simple ou professionnelle"]
  ]
};

function makePage(input: {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string[];
  sections: SeoSection[];
  faq?: typeof commonFaq;
  conclusion: string[];
  links?: string[];
}): PillarPage {
  const finalChecklist = section("Avant de prendre une décision", [
    "Gardez une trace écrite de la date de notification, de la durée retenue et de toute dispense ou réduction. En cas de désaccord, ce sont ces éléments qui permettent de reconstruire le calendrier sans s'appuyer sur des souvenirs différents.",
    "Relisez aussi la convention collective, le dernier bulletin de paie et les documents remis en fin de contrat. Une incohérence sur une date ou une somme se corrige plus facilement avant l'inscription France Travail ou l'arrivée chez un nouvel employeur."
  ]);

  return {
    slug: input.slug,
    title: input.title,
    h1: input.h1,
    description: input.description,
    updatedAt,
    updatedLabel,
    intro: input.intro,
    sections: [...input.sections, finalChecklist],
    faq: input.faq ?? commonFaq,
    conclusion: input.conclusion,
    relatedLinks: linksFor(...(input.links ?? []))
  };
}

export const noticeSeoPages: PillarPage[] = [
  makePage({
    slug: "guide-preavis",
    title: "Guide complet du préavis : durée, calcul et date de fin du contrat",
    h1: "Guide complet du préavis",
    description:
      "Guide complet du préavis : durée, calcul de la date de fin, démission, licenciement, dispense, congés payés, arrêt maladie, cadre et non cadre.",
    intro: [
      "Vous avez démissionné et vous voulez savoir quand votre contrat s'arrête vraiment. Votre employeur parle d'une dispense. Vous avez des congés déjà posés. Un nouveau poste vous attend peut-être dans deux semaines. Dans ces moments-là, la vraie question n'est pas théorique : quelle date puis-je retenir sans me mettre en difficulté ?",
      `Le préavis sert justement à répondre à cette question. Il fixe une période entre l'annonce du départ et la fin du contrat, avec des effets très concrets sur le salaire, les documents de fin de contrat, les congés payés et parfois l'inscription France Travail. ${disclaimer}`
    ],
    sections: [
      section(
        "Préavis : ce qu'il faut retenir en 30 secondes",
        [
          "Le préavis dépend d'abord du motif de départ : démission, licenciement, période d'essai, départ négocié. Il dépend ensuite de la convention collective, du contrat, du statut et parfois de l'ancienneté.",
          "Pour éviter les erreurs, ne partez jamais seulement du dernier jour travaillé. La bonne date est celle qui tient compte du préavis exécuté, payé, réduit ou dispensé."
        ],
        [
          "Le préavis ne démarre pas toujours le jour où le courrier est envoyé.",
          "La convention collective peut changer la durée attendue.",
          "Une dispense par l'employeur ne veut pas forcément dire perte de salaire.",
          "Des congés déjà posés peuvent modifier la date de fin.",
          "Un arrêt maladie simple ne repousse généralement pas le préavis.",
          "Avant de commencer ailleurs, vérifiez que le contrat est vraiment terminé."
        ],
        ["Le réflexe utile : notez la date de notification, la durée du préavis, les congés déjà validés, puis demandez une confirmation écrite de la date de fin."]
      ),
      section(
        "Tableau récapitulatif du préavis",
        [
          "Ce tableau donne des repères de lecture. Il ne remplace pas la convention collective, parce que c'est souvent elle qui donne la réponse la plus précise.",
          "Le bon usage consiste à identifier votre situation, puis à vérifier le texte applicable avant de communiquer une date ferme à un employeur, à France Travail ou à un futur recruteur."
        ],
        undefined,
        undefined,
        {
          headers: [
            "Situation",
            "Point de départ à vérifier",
            "Durée habituelle",
            "Ce qui peut modifier la date",
            "Page utile"
          ],
          rows: [
            [
              "Démission non cadre",
              "Réception de la démission",
              "Selon convention collective, contrat ou usage",
              "Congés déjà validés, accord de réduction",
              "Préavis démission|/preavis-demission"
            ],
            [
              "Démission cadre",
              "Réception de la démission",
              "Souvent plus long, mais jamais automatique",
              "Convention collective, statut exact, passation",
              "Préavis cadre|/preavis-cadre"
            ],
            [
              "Licenciement",
              "Notification du licenciement",
              "Dépend notamment de l'ancienneté et du motif",
              "Faute grave, dispense, règle plus favorable",
              "Préavis licenciement|/preavis-licenciement"
            ],
            [
              "Rupture conventionnelle",
              "Date convenue entre les parties",
              "Pas de préavis classique",
              "Date de rupture, congés, documents de sortie",
              "Préavis rupture conventionnelle|/preavis-rupture-conventionnelle"
            ],
            [
              "Dispense de préavis",
              "Accord ou décision de dispense",
              "Préavis non travaillé, parfois payé",
              "Origine de la demande, écrit sur le salaire",
              "Dispense de préavis|/dispense-de-preavis"
            ],
            [
              "Congés payés",
              "Date de validation des congés",
              "Effet variable selon la date de pose",
              "Congés fixés avant ou après la rupture",
              "Congés pendant le préavis|/conges-payes-pendant-preavis"
            ],
            [
              "Arrêt maladie",
              "Début et origine de l'arrêt",
              "Souvent sans report en maladie simple",
              "Accident du travail, maladie professionnelle",
              "Arrêt maladie et préavis|/arret-maladie-pendant-preavis"
            ],
            [
              "Nouveau travail",
              "Date réelle de fin du contrat actuel",
              "Possible seulement si le contrat le permet",
              "Loyauté, exclusivité, concurrence, dispense",
              "Travailler ailleurs pendant le préavis|/travailler-ailleurs-pendant-preavis"
            ]
          ]
        }
      ),
      section("La méthode en 4 étapes", [
        "Commencez par identifier le motif du départ. Une démission, un licenciement, une rupture conventionnelle, une période d'essai ou une dispense ne se calculent pas de la même façon.",
        "Trouvez ensuite le point de départ : réception de la démission, notification du licenciement, date convenue entre les parties ou accord écrit sur une dispense. C'est souvent là que naît l'erreur.",
        "Appliquez la bonne durée avec les bons documents sous les yeux : contrat, convention collective, statut, ancienneté et usages. Si deux règles semblent se contredire, ne retenez pas une date au hasard.",
        "Vérifiez enfin ce qui peut changer le calendrier : congés déjà posés, arrêt maladie, dispense, réduction, accord écrit et dates inscrites sur les documents de fin de contrat."
      ], [
        "1. Identifier le motif du départ.",
        "2. Trouver le point de départ.",
        "3. Appliquer la bonne durée.",
        "4. Vérifier ce qui peut modifier la date."
      ]),
      section("Dans quels cas parle-t-on de préavis ?", [
        "Le préavis apparaît surtout lors d'une démission ou d'un licenciement. Dans ces deux cas, le contrat ne s'arrête pas forcément le jour où la décision est annoncée. Une période doit parfois être travaillée, ou payée si l'employeur dispense le salarié de venir.",
        "La page dédiée au préavis de démission aide à vérifier la durée avant d'envoyer sa lettre. La page sur le préavis de licenciement permet de distinguer préavis travaillé, préavis payé et absence de préavis. Pour un départ amiable, le guide rupture conventionnelle reste plus adapté, car on raisonne plutôt avec une date de rupture fixée entre les parties."
      ]),
      section("Comment calculer la date de fin du préavis ?", [
        "Commencez par la date qui déclenche le préavis. Pour une démission, c'est souvent la réception par l'employeur, pas la date à laquelle vous avez rédigé le courrier. Pour un licenciement, on part de la notification. Ensuite, appliquez la durée prévue par la convention collective, le contrat ou la règle applicable.",
        "Exemple simple : l'employeur reçoit une démission le 4 juin et le préavis est d'un mois. La fin théorique se situe autour du 4 juillet, sous réserve d'une règle de calcul différente. Si le préavis est de deux mois, on vise plutôt le 4 août. Si le préavis est exprimé en jours, il faut savoir s'il s'agit de jours calendaires, ouvrables ou ouvrés.",
        "Cas concret : un salarié non cadre démissionne, son employeur reçoit la lettre le 4 juin et la convention prévoit un mois de préavis. La fin théorique se place autour du 4 juillet. S'il avait une semaine de congés déjà validée pendant cette période, il faut vérifier si ces congés repoussent la date. S'il obtient une réduction écrite au 28 juin, c'est cette nouvelle date qui devient le repère pratique.",
        "Le calcul devient moins automatique lorsqu'un événement tombe pendant la période. Des congés payés déjà validés peuvent repousser la date. Un arrêt maladie non professionnel ne la repousse généralement pas. Une dispense peut supprimer la présence au poste, sans forcément avancer la date juridique de fin. C'est pour cela qu'une confirmation écrite est si précieuse."
      ], [
        "Date de réception ou de notification.",
        "Durée prévue par la convention collective ou le contrat.",
        "Congés payés déjà validés.",
        "Arrêt maladie simple ou d'origine professionnelle.",
        "Dispense ou réduction acceptée par écrit.",
        "Date indiquée sur les documents de fin de contrat."
      ]),
      section("Préavis et ancienneté", [
        "L'ancienneté compte surtout parce qu'elle peut modifier la protection du salarié. En licenciement, elle influence souvent la durée du préavis et les indemnités de départ. Un salarié présent depuis deux ans ne se lit pas comme une personne arrivée depuis quelques mois.",
        "Elle ne suffit pourtant pas à donner une réponse complète. Un salarié avec dix ans d'ancienneté peut avoir une durée différente selon sa convention collective, son statut, son niveau de poste ou le motif de rupture. En démission, certaines conventions tiennent compte de l'ancienneté, d'autres regardent surtout la catégorie professionnelle.",
        "La bonne méthode consiste à croiser trois éléments : ancienneté, statut et convention collective. La page sur la durée du préavis selon l'ancienneté entre davantage dans ces cas pratiques."
      ]),
      section("Le préavis est-il différent pour un cadre ?", [
        "Souvent, oui. Beaucoup de cadres ont un préavis plus long qu'un non cadre, notamment en cas de démission. Trois mois reviennent fréquemment dans les conventions collectives, mais ce n'est pas une règle universelle. Un cadre ne doit donc pas annoncer trois mois sans vérifier son texte.",
        "L'idée reçue la plus fréquente consiste à croire que le statut cadre suffit à donner la réponse. En réalité, il faut regarder la convention collective, le niveau du poste, le contrat et parfois les usages de l'entreprise. Un agent de maîtrise, un cadre dirigeant et un cadre sans management ne sont pas toujours traités de la même façon.",
        "Si vous êtes cadre et que vous voulez rejoindre un autre employeur rapidement, préparez une demande de réduction de préavis avec une vraie passation. C'est plus efficace qu'une demande sèche de départ anticipé."
      ]),
      section("Dispense et réduction : deux situations à ne pas confondre", [
        "Quand l'employeur dispense le salarié de préavis, le salarié ne vient plus travailler. Si le préavis était dû, la rémunération correspondante reste souvent due. Le contrat peut aussi continuer jusqu'au terme théorique du préavis, même si le dernier jour travaillé est déjà passé.",
        "Quand le salarié demande une réduction pour partir plus tôt, la logique change. L'employeur peut accepter une date avancée et la rémunération peut s'arrêter à cette nouvelle date. Rien ne doit rester oral. Un mail de confirmation doit préciser la date de fin et le traitement du salaire.",
        "La page dispense de préavis détaille cette différence, avec les effets sur le solde de tout compte et l'attestation France Travail."
      ]),
      section("Congés payés, arrêt maladie et nouveau poste", [
        "Les congés payés sont le cas qui crée le plus de confusion. Des congés fixés avant la rupture peuvent suspendre le préavis et repousser la fin. Des congés acceptés après la notification peuvent être traités différemment si l'accord écrit le prévoit. La page congés payés pendant le préavis détaille ces scénarios.",
        "L'arrêt maladie simple ne repousse généralement pas la date de fin du préavis. Si l'arrêt est lié à un accident du travail ou une maladie professionnelle, il faut être plus prudent. La page arrêt maladie pendant le préavis explique cette différence avec des exemples.",
        "Commencer un nouveau travail avant la fin officielle du contrat peut poser problème, surtout si le préavis est encore travaillé ou si une clause limite l'activité. Avant de signer une date d'arrivée, vérifiez la fin réelle du contrat et les obligations de loyauté."
      ]),
      section("Les erreurs les plus fréquentes", [
        "Ces erreurs ne viennent pas d'un manque de bonne foi. Elles viennent souvent d'une date mal comprise ou d'un accord trop vague.",
        "Une seule correction peut éviter un litige : faire confirmer la date de fin du contrat avec des mots simples."
      ], [
        "Croire que le préavis démarre à l'envoi du courrier, alors que la réception par l'employeur peut compter.",
        "Confondre dernier jour travaillé et date juridique de fin du contrat.",
        "Oublier de lire la convention collective avant d'annoncer une date.",
        "Accepter une réduction de préavis uniquement à l'oral.",
        "Penser qu'une dispense supprime toujours le salaire du préavis.",
        "Démarrer un nouveau poste alors que l'ancien contrat n'est pas terminé.",
        "Ne pas vérifier l'effet de congés payés déjà validés.",
        "Lire une rupture conventionnelle comme une démission avec préavis."
      ]),
      section("Les documents à vérifier avant de retenir une date", [
        "Beaucoup d'erreurs viennent d'une date retenue trop vite. Le salarié pense partir le vendredi, l'employeur parle du lundi suivant, puis l'attestation France Travail reprend encore une autre date. Le problème se règle mieux quand on revient aux documents.",
        "Relisez le contrat de travail, la convention collective, le courrier de démission ou la notification de licenciement. Ajoutez l'accord écrit de dispense ou de réduction, les derniers congés validés, puis les documents de sortie : solde de tout compte, certificat de travail et attestation France Travail.",
        "En cas de doute, la date écrite sur les documents de fin de contrat doit être cohérente avec ce qui a été annoncé au salarié. Si ce n'est pas le cas, demandez une correction avant de vous inscrire ou de confirmer une nouvelle prise de poste."
      ], [
        "Contrat de travail.",
        "Convention collective.",
        "Courrier de démission ou notification de licenciement.",
        "Accord écrit de dispense ou de réduction.",
        "Derniers congés validés.",
        "Solde de tout compte.",
        "Certificat de travail.",
        "Attestation France Travail."
      ]),
      section("Liens utiles pour continuer sans se perdre", [
        "Si votre question porte sur le montant de départ, commencez par le simulateur de rupture conventionnelle ou la page calcul indemnité. Si votre sujet est le revenu après la fin du contrat, poursuivez avec le guide chômage ARE, le délai de carence ou le simulateur chômage.",
        "Pour vérifier la paie, la page salaire brut/net aide à transformer un montant brut en repère net. Elle est utile lorsqu'une indemnité compensatrice de préavis ou un dernier salaire doit être compris rapidement.",
        "Pour rester dans le cluster Préavis, les pages les plus proches sont calcul du préavis, préavis démission, préavis licenciement, dispense de préavis, préavis non cadre, durée selon l'ancienneté et date de fin du contrat."
      ])
    ],
    faq: [
      {
        question: "Comment savoir quand mon préavis se termine ?",
        answer:
          "Partez de la date de notification ou de réception, appliquez la durée prévue, puis vérifiez les congés, l'arrêt maladie, la dispense ou la réduction écrite."
      },
      {
        question: "Le préavis commence-t-il à l'envoi de la lettre ?",
        answer:
          "Pas forcément. En pratique, on regarde souvent la date à laquelle l'employeur reçoit l'information. Une remise en main propre datée évite les discussions."
      },
      {
        question: "Peut-on refuser de faire son préavis ?",
        answer:
          "Le salarié ne peut pas décider seul de ne pas l'exécuter. Il doit obtenir une dispense ou une réduction acceptée, sauf cas particulier prévu par un texte."
      },
      {
        question: "Peut-on négocier son préavis ?",
        answer:
          "Oui. Le plus simple est de proposer une date précise et une passation claire. L'accord doit être écrit."
      },
      {
        question: "Les congés prolongent-ils le préavis ?",
        answer:
          "Des congés déjà validés avant la rupture peuvent le suspendre. Des congés acceptés après la rupture dépendent de l'accord entre salarié et employeur."
      },
      {
        question: "Un arrêt maladie suspend-il le préavis ?",
        answer:
          "En maladie simple, le préavis continue généralement. En accident du travail ou maladie professionnelle, la situation doit être vérifiée plus finement."
      },
      {
        question: "Peut-on travailler ailleurs pendant son préavis ?",
        answer:
          "Pendant un préavis travaillé, c'est risqué. En cas de dispense, c'est parfois possible, mais il faut vérifier loyauté, horaires, exclusivité et concurrence."
      },
      {
        question: "Quelle différence entre dispense et réduction de préavis ?",
        answer:
          "La dispense vient souvent de l'employeur et peut laisser le préavis payé. La réduction demandée par le salarié avance plutôt la date de fin."
      },
      {
        question: "La rupture conventionnelle impose-t-elle un préavis ?",
        answer:
          "Non. On fixe une date de rupture. On peut organiser une transition, mais ce n'est pas un préavis de démission ou de licenciement."
      },
      {
        question: "Le licenciement donne-t-il toujours droit à un préavis ?",
        answer:
          "Non. Le motif compte. Une faute grave ou lourde peut supprimer le préavis payé, sauf règle plus favorable ou contestation."
      },
      {
        question: "Le préavis est-il payé ?",
        answer:
          "Oui s'il est travaillé. S'il est dispensé par l'employeur alors qu'il était dû, une indemnité compensatrice peut être versée."
      },
      {
        question: "Le préavis est-il payé si je ne viens plus travailler ?",
        answer:
          "S'il s'agit d'une dispense décidée par l'employeur, le préavis dû peut rester payé. Si vous partez plus tôt à votre demande, il faut lire l'accord écrit."
      },
      {
        question: "Une dispense de préavis est-elle toujours payée ?",
        answer:
          "Non. Tout dépend de l'origine de la dispense. La page sur la dispense de préavis détaille la différence entre décision employeur et demande du salarié."
      },
      {
        question: "Une réduction de préavis doit-elle être écrite ?",
        answer:
          "Oui, c'est le réflexe le plus sûr. L'écrit doit préciser la nouvelle date de fin et le traitement du salaire."
      },
      {
        question: "Le statut cadre change-t-il le préavis ?",
        answer:
          "Souvent, mais pas automatiquement. Beaucoup de conventions prévoient un préavis plus long pour les cadres. Il faut lire le texte applicable."
      },
      {
        question: "Un cadre a-t-il toujours trois mois de préavis ?",
        answer:
          "Non. Trois mois est fréquent, mais pas automatique. La convention collective et le contrat doivent être vérifiés."
      },
      {
        question: "L'ancienneté suffit-elle à connaître la durée ?",
        answer:
          "Non. Elle compte surtout en licenciement, mais le statut, le contrat et la convention collective peuvent changer la réponse."
      },
      {
        question: "Quel document prouve la date de fin ?",
        answer:
          "Le certificat de travail, le solde de tout compte, l'attestation France Travail et les échanges écrits doivent indiquer une chronologie cohérente."
      },
      {
        question: "Que faire si l'employeur annonce une date différente ?",
        answer:
          "Demandez le détail du calcul par écrit : date de départ du préavis, durée retenue, congés, dispense ou réduction. C'est plus efficace qu'un échange oral."
      },
      {
        question: "Le préavis compte-t-il pour le chômage ?",
        answer:
          "La date de fin du contrat et les sommes de fin de contrat comptent pour le dossier France Travail. Il faut vérifier l'attestation employeur."
      },
      {
        question: "Quelle date donner à France Travail ?",
        answer:
          "Utilisez la date de fin du contrat indiquée sur les documents employeur. Si elle ne correspond pas à ce qui vous a été annoncé, demandez une correction."
      }
    ],
    conclusion: [
      "Le préavis n'est pas seulement une durée à subir. C'est une date à sécuriser.",
      "Quand les dates sont claires, le salarié sait quand il peut partir, ce qui doit être payé et quels documents vérifier avant de tourner la page."
    ],
    links: [
      "/guides-complets",
      "/calcul-preavis",
      "/date-fin-contrat-preavis",
      "/preavis-demission",
      "/preavis-licenciement",
      "/preavis-rupture-conventionnelle",
      "/dispense-de-preavis",
      "/conges-payes-pendant-preavis",
      "/arret-maladie-pendant-preavis",
      "/travailler-ailleurs-pendant-preavis",
      "/preavis-cadre",
      "/preavis-non-cadre",
      "/duree-preavis-anciennete",
      "/rupture-conventionnelle",
      "/chomage-are",
      "/calcul-indemnite-rupture-conventionnelle",
      "/simulateur-rupture-conventionnelle",
      "/rupture-conventionnelle-chomage",
      "/delai-de-carence-chomage",
      "/simulateur-chomage-rupture-conventionnelle",
      "/salaire-brut-net",
      "/calcul-indemnite-brut-ou-net"
    ]
  }),

  makePage({
    slug: "preavis-demission",
    title: "Préavis démission : durée, calcul, réduction et départ anticipé",
    h1: "Préavis démission",
    description:
      "Préavis de démission en CDI : durée, point de départ, réduction, dispense, congés payés, arrêt maladie et exemples concrets.",
    intro: [
      "Après une démission, la question arrive vite : combien de temps faut-il encore rester dans l'entreprise ? La réponse n'est pas la même pour un cadre, un non cadre, un salarié avec deux ans d'ancienneté ou une personne qui a déjà une promesse d'embauche ailleurs.",
      `Le préavis de démission se vérifie dans le contrat, la convention collective et les usages applicables. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "Le salarié démissionnaire doit respecter le préavis applicable, sauf dispense ou accord de réduction. La durée vient le plus souvent de la convention collective. Elle peut être d'une semaine, d'un mois, de deux mois ou de trois mois selon le poste.",
        "Le point de départ correspond généralement au moment où l'employeur reçoit la démission. Une lettre remise en main propre datée et signée évite beaucoup de discussions."
      ]),
      section("Où trouver la durée exacte", [
        "Commencez par la convention collective indiquée sur le bulletin de paie. Cherchez ensuite la catégorie du salarié : ouvrier, employé, technicien, agent de maîtrise, cadre. Le contrat peut reprendre cette durée ou prévoir une clause à relire.",
        "Si le contrat annonce une durée moins favorable que la convention ou une règle floue, il faut vérifier avant de promettre une date de départ au futur employeur."
      ]),
      section("Exemples de démission", [
        "Une salariée non cadre avec 2 ans d'ancienneté démissionne le 10 juin. Sa convention prévoit un mois. Sauf accord différent, elle évite d'annoncer une prise de poste le 1er juillet.",
        "Un cadre avec 10 ans d'ancienneté a souvent un préavis plus long, fréquemment trois mois selon les conventions. S'il veut partir au bout de six semaines, il lui faut un accord écrit de réduction."
      ]),
      section("Demander une réduction", [
        "La demande doit rester simple : date souhaitée, passation proposée, dossiers à transférer. Plus la demande est concrète, plus l'employeur peut répondre sans craindre un départ désorganisé.",
        "Si l'employeur accepte, gardez une trace écrite. Si l'employeur refuse et que le salarié part quand même, l'entreprise peut réclamer une indemnité correspondant au préavis non effectué."
      ]),
      section("Congés, maladie et dernier salaire", [
        "Des congés déjà posés avant la démission peuvent suspendre le préavis. Des congés négociés après la démission doivent être clarifiés : prolongent-ils le préavis ou non ? La réponse se règle par accord.",
        "En arrêt maladie simple, le préavis continue le plus souvent à courir. Le salarié ne récupère pas automatiquement les jours d'absence à la fin."
      ])
    ],
    conclusion: [
      "Le préavis de démission se prépare avant d'envoyer la lettre, pas après.",
      "La bonne méthode consiste à vérifier la durée, choisir une date de notification propre et demander toute réduction par écrit."
    ]
  }),

  makePage({
    slug: "preavis-rupture-conventionnelle",
    title: "Préavis rupture conventionnelle : date de départ, délais et pièges",
    h1: "Préavis rupture conventionnelle",
    description:
      "Rupture conventionnelle et préavis : comprendre pourquoi il n'y a pas de préavis classique, comment fixer la date de rupture et éviter les erreurs.",
    intro: [
      "La rupture conventionnelle ne fonctionne pas comme une démission ou un licenciement. On entend souvent parler de préavis, mais le mot est trompeur : les parties choisissent une date de rupture dans la convention.",
      `Cette date doit tenir compte du délai de rétractation et du délai d'homologation. ${disclaimer}`
    ],
    sections: [
      section("La règle à retenir", [
        "Il n'existe pas de préavis obligatoire en rupture conventionnelle individuelle. Le contrat se poursuit jusqu'à la date prévue dans la convention, à condition que l'administration homologue la rupture.",
        "La période entre la signature et la date de départ ressemble parfois à un préavis dans l'organisation du travail, mais juridiquement elle suit la procédure de rupture conventionnelle."
      ]),
      section("Comment fixer la date de rupture", [
        "La date doit être postérieure au délai de rétractation de 15 jours calendaires et au délai d'instruction de l'administration. Fixer une date trop proche crée un risque pratique : impossible de partir légalement avant homologation.",
        "Un salarié avec un projet de création d'entreprise peut négocier une date qui lui laisse un mois de transition. Un employeur peut demander une passation plus longue. Tout se discute avant signature."
      ]),
      section("Exemple avec un départ négocié", [
        "Une salariée signe le 5 juin. Les parties envisagent une fin de contrat au 31 juillet. Ce calendrier laisse le temps de la rétractation, de l'homologation et d'une passation claire.",
        "À l'inverse, une date prévue dix jours après la signature serait incohérente. Elle ne respecte pas la mécanique de validation."
      ]),
      section("Salaire, congés et chômage", [
        "Le salaire reste dû jusqu'à la date de rupture. Les congés payés non pris sont traités au solde de tout compte. L'attestation France Travail reprend la date réelle de fin de contrat.",
        "Cette date influence l'inscription, les différés éventuels et le premier paiement ARE. C'est pourquoi le calendrier doit être relu avec autant d'attention que le montant de l'indemnité."
      ]),
      section("Erreur fréquente", [
        "Certaines entreprises reprennent automatiquement un préavis de trois mois parce que le salarié est cadre. Ce n'est pas la bonne logique. La durée peut être négociée, courte ou longue, tant que la procédure est respectée.",
        "Le vrai sujet n'est pas le préavis, mais la date de rupture acceptée par les deux parties."
      ])
    ],
    conclusion: [
      "En rupture conventionnelle, remplacez la question du préavis par celle de la date de rupture.",
      "Un bon calendrier sécurise la procédure, la passation, le solde de tout compte et la suite auprès de France Travail."
    ],
    links: ["/rupture-conventionnelle", "/rupture-conventionnelle-delai"]
  }),

  makePage({
    slug: "preavis-licenciement",
    title: "Préavis licenciement : durée, dispense, indemnité et ancienneté",
    h1: "Préavis licenciement",
    description:
      "Préavis de licenciement : durée selon ancienneté, dispense, indemnité compensatrice, faute grave, congés payés et exemples.",
    intro: [
      "Après un licenciement, le préavis détermine souvent la vraie date de sortie. Le salarié peut travailler jusqu'au terme, être dispensé par l'employeur ou perdre le préavis dans certains cas de faute.",
      `Le motif du licenciement et l'ancienneté changent la lecture. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "Le préavis de licenciement dépend de l'ancienneté, du statut, de la convention collective et du motif. Un licenciement pour faute grave ou lourde prive en principe le salarié du préavis. Hors faute grave, le préavis est exécuté ou payé.",
        "La lettre de licenciement et les documents de fin de contrat doivent rester cohérents avec la date de fin retenue."
      ]),
      section("Durée selon l'ancienneté", [
        "Le Code du travail donne des repères pour les salariés ayant au moins six mois d'ancienneté, mais la convention collective peut prévoir mieux. Pour un salarié avec deux ans d'ancienneté, le préavis atteint souvent deux mois hors règle plus favorable.",
        "Pour un cadre avec dix ans d'ancienneté, la convention collective prévoit fréquemment trois mois. Il faut vérifier le texte applicable plutôt que raisonner par habitude."
      ]),
      section("Dispense par l'employeur", [
        "L'employeur peut dispenser le salarié d'exécuter le préavis. Dans ce cas, le salarié ne vient plus travailler, mais l'indemnité compensatrice de préavis reste due si le préavis aurait dû être payé.",
        "Exemple : un salarié licencié le 12 juin avec deux mois de préavis est dispensé dès le lendemain. Il perçoit le salaire correspondant jusqu'au terme théorique, avec les congés payés afférents selon les règles de paie."
      ]),
      section("Faute grave et absence de préavis", [
        "La faute grave est censée rendre impossible le maintien du salarié dans l'entreprise. Elle entraîne donc un départ sans préavis payé, sauf règle conventionnelle plus favorable ou contestation réussie.",
        "Un salarié doit lire ce point très vite. Si le motif est discutable, le sujet du préavis peut devenir un élément du litige."
      ]),
      section("Impact sur France Travail", [
        "La date de fin de contrat et les sommes versées figurent sur l'attestation employeur. Une indemnité compensatrice de préavis peut influencer le calendrier pratique du dossier, même si elle n'empêche pas l'examen des droits.",
        "Avant l'inscription, comparez la lettre, le certificat de travail, le solde de tout compte et l'attestation transmise."
      ])
    ],
    conclusion: [
      "Le préavis de licenciement se lit avec le motif et l'ancienneté.",
      "La différence entre préavis travaillé, préavis payé et absence de préavis doit être comprise avant de signer le solde de tout compte."
    ],
    links: ["/chomage-apres-licenciement", "/indemnite-legale-rupture-conventionnelle"]
  }),

  makePage({
    slug: "dispense-de-preavis",
    title: "Dispense de préavis : salaire, accord, chômage et risques",
    h1: "Dispense de préavis",
    description:
      "Dispense de préavis : qui peut la demander, salaire dû, indemnité compensatrice, date de fin de contrat, chômage et exemples.",
    intro: [
      "La dispense de préavis paraît simple : le salarié ne travaille plus. Le vrai sujet est ailleurs : qui a demandé la dispense et que devient la rémunération ?",
      `Une dispense décidée par l'employeur ne produit pas les mêmes effets qu'un départ anticipé demandé par le salarié. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "Si l'employeur dispense le salarié d'exécuter le préavis, il doit en principe payer l'indemnité compensatrice. Si le salarié demande à partir plus tôt, l'employeur peut accepter sans payer la partie non travaillée, sauf accord plus favorable.",
        "La date de fin du contrat doit être écrite clairement. Elle ne se devine pas à partir du dernier jour de présence."
      ]),
      section("Dispense à l'initiative de l'employeur", [
        "L'employeur peut préférer que le salarié ne revienne plus, surtout en cas de licenciement, de poste sensible ou de transition déjà organisée. Cette décision ne doit pas faire perdre le salaire du préavis lorsque le préavis est dû.",
        "Exemple : un cadre licencié a trois mois de préavis. L'employeur le dispense immédiatement. Le salarié n'exécute pas le travail, mais l'indemnité compensatrice doit couvrir la période."
      ]),
      section("Dispense demandée par le salarié", [
        "Un salarié qui démissionne peut demander une sortie plus rapide. L'employeur peut refuser. S'il accepte, l'accord doit indiquer si le préavis est réduit et si la rémunération s'arrête à la date avancée.",
        "Le piège classique : le salarié pense être dispensé avec maintien de salaire, l'employeur pense avoir accepté un départ anticipé non payé."
      ]),
      section("Effet sur les documents", [
        "Le certificat de travail et l'attestation France Travail doivent refléter la fin réelle du contrat. En cas de préavis payé non travaillé, la date de fin peut rester celle du terme du préavis.",
        "Cette précision compte pour la mutuelle, la portabilité, l'inscription France Travail et parfois la date d'entrée chez un nouvel employeur."
      ]),
      section("Message type à envoyer", [
        "Une demande courte suffit : “Je sollicite votre accord pour être dispensé d'exécuter la fin de mon préavis à compter du… Pouvez-vous me confirmer par écrit la date de fin retenue et le traitement de la rémunération ?”",
        "Cette formulation évite les non-dits et force les deux parties à parler des deux points sensibles : date et paie."
      ])
    ],
    conclusion: [
      "La dispense de préavis doit toujours être reliée à son origine : employeur ou salarié.",
      "Sans écrit sur la date et la paie, le risque de malentendu est trop élevé."
    ]
  }),

  makePage({
    slug: "calcul-preavis",
    title: "Calcul du préavis : point de départ, durée et date de fin",
    h1: "Calcul du préavis",
    description:
      "Calculer un préavis : point de départ, durée, date de fin, mois calendaires, congés payés, arrêt maladie et exemples concrets.",
    intro: [
      "Calculer un préavis, ce n'est pas additionner des jours au hasard. Il faut d'abord identifier le point de départ, puis appliquer la durée correcte, puis vérifier les événements qui peuvent modifier le calendrier.",
      `Une erreur de quelques jours peut changer le dernier salaire, la date d'embauche suivante ou le dossier France Travail. ${disclaimer}`
    ],
    sections: [
      section("Méthode simple en trois étapes", [
        "Étape 1 : trouvez le point de départ. Pour une démission, regardez la réception par l'employeur. Pour un licenciement, partez de la notification. Pour une rupture conventionnelle, utilisez la date prévue dans la convention plutôt qu'un préavis.",
        "Étape 2 : trouvez la durée applicable. Elle vient du contrat, de la convention collective, de l'ancienneté et du statut. Étape 3 : contrôlez congés, arrêt maladie, dispense et accord de réduction."
      ]),
      section("Mois calendaires ou jours travaillés", [
        "Un préavis d'un mois se calcule souvent de date à date. Une notification reçue le 10 juin conduit à une fin le 10 juillet, sauf règle différente. Pour un préavis exprimé en jours, il faut vérifier s'il s'agit de jours calendaires, ouvrables ou ouvrés.",
        "Cette distinction est fréquente dans les périodes d'essai ou certains statuts. Elle ne doit pas être improvisée."
      ]),
      section("Exemples chiffrés", [
        "Salarié non cadre : démission reçue le 4 juin, préavis d'un mois. La date cible est le 4 juillet, sous réserve des règles conventionnelles.",
        "Cadre : démission reçue le 15 juin, préavis de trois mois. La date cible est le 15 septembre. Si deux semaines de congés avaient été posées avant la démission et suspendent le préavis, la date peut être repoussée.",
        "Licenciement : notification le 20 juin, préavis de deux mois, dispense employeur. Le salarié ne travaille plus, mais la période payée court théoriquement jusqu'au 20 août."
      ]),
      section("Événements qui changent le calcul", [
        "Les congés payés, l'arrêt de travail, la dispense et la réduction négociée peuvent modifier la lecture. Le plus sûr consiste à refaire le calendrier après chaque événement, puis à demander une confirmation écrite si la date change.",
        "N'utilisez pas uniquement le dernier jour travaillé comme date de fin. En paie, ce n'est pas toujours la même chose."
      ]),
      section("Tableau de contrôle", [
        "Avant d'envoyer une lettre ou de signer un document, posez les dates sur une ligne. Cette méthode très simple évite les erreurs de lecture.",
        "Si la convention collective prévoit une règle plus favorable, elle doit être intégrée avant de communiquer une date ferme."
      ], undefined, undefined, quickTable)
    ],
    conclusion: [
      "Un bon calcul de préavis commence par le bon point de départ.",
      "La date finale doit être confirmée avec les règles applicables et les événements survenus pendant la période."
    ]
  }),

  makePage({
    slug: "preavis-cadre",
    title: "Préavis cadre : durée, démission, licenciement et négociation",
    h1: "Préavis cadre",
    description:
      "Préavis cadre : durée habituelle, démission, licenciement, réduction, dispense, congés, nouvel emploi et exemples.",
    intro: [
      "Le préavis d'un cadre est souvent plus long que celui d'un non cadre. Trois mois reviennent souvent dans les conventions collectives, mais ce n'est pas une règle universelle.",
      `Le statut cadre impose de relire la convention collective avant de promettre une date de départ. ${disclaimer}`
    ],
    sections: [
      section("Durée habituelle", [
        "Beaucoup de cadres ont un préavis de trois mois en CDI. Certaines conventions prévoient moins, d'autres aménagent selon l'ancienneté, le niveau hiérarchique ou la période d'essai.",
        "Le contrat peut aussi contenir une clause, mais elle ne doit pas faire oublier la convention collective."
      ]),
      section("Cadre qui démissionne", [
        "Un cadre qui a trouvé un autre poste doit souvent négocier sa date d'arrivée. Le nouvel employeur peut vouloir aller vite, mais l'ancien employeur n'est pas obligé de réduire le préavis.",
        "Exemple : une cadre avec dix ans d'ancienneté souhaite rejoindre une autre entreprise dans six semaines. Elle peut proposer une passation écrite, former un remplaçant et demander une sortie anticipée au lieu d'imposer une date."
      ]),
      section("Cadre licencié", [
        "En licenciement hors faute grave, le préavis du cadre est exécuté ou payé. La dispense est fréquente sur des postes exposés, mais elle ne supprime pas l'indemnité compensatrice lorsque le préavis reste dû.",
        "Le statut cadre peut aussi influencer le salaire de référence, les variables, les bonus et la clause de non-concurrence à traiter au départ."
      ]),
      section("Congés, variable et solde de tout compte", [
        "Un cadre a parfois des congés, RTT, primes variables ou bonus à régulariser. Le préavis ne doit pas masquer ces sujets. La paie de sortie doit distinguer salaire, indemnité compensatrice, congés payés et éventuelles primes.",
        "Si la rémunération comprend une part variable, vérifiez les règles de versement pendant le préavis."
      ]),
      section("Réduire sans se fragiliser", [
        "La réduction se négocie mieux avec un plan de passation. Liste des dossiers, dates de transfert, interlocuteurs, points sensibles : plus c'est clair, plus l'accord est facile.",
        "Un écrit court confirme ensuite la date de fin, le dernier jour travaillé et le traitement du préavis restant."
      ])
    ],
    conclusion: [
      "Le préavis cadre demande une lecture précise de la convention collective.",
      "La meilleure marge de manoeuvre reste la négociation écrite d'une date compatible avec la passation."
    ],
    links: ["/salaire-brut-net-cadre"]
  }),

  makePage({
    slug: "preavis-non-cadre",
    title: "Préavis non cadre : durée, démission, licenciement et exemples",
    h1: "Préavis non cadre",
    description:
      "Préavis non cadre : durée en démission ou licenciement, ancienneté, convention collective, dispense, congés et exemples pratiques.",
    intro: [
      "Le préavis d'un non cadre dépend beaucoup de la convention collective. Deux salariés non cadres peuvent avoir des durées différentes selon leur branche, leur qualification et leur ancienneté.",
      `La bonne réponse ne se trouve pas dans une moyenne, mais dans les textes applicables au poste. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "En démission, la durée peut être courte ou atteindre un mois selon les conventions. En licenciement, l'ancienneté pèse davantage, avec des repères légaux et parfois une règle conventionnelle plus favorable.",
        "Le bulletin de paie donne souvent l'intitulé de la convention collective à consulter."
      ]),
      section("Exemple avec 2 ans d'ancienneté", [
        "Un salarié non cadre avec 2 ans d'ancienneté démissionne. Sa convention prévoit un mois de préavis. Il doit préparer son départ sur cette base, sauf accord écrit de réduction.",
        "S'il est licencié hors faute grave, la durée peut être différente. Il faut lire le régime du licenciement, pas reprendre automatiquement la durée de démission."
      ]),
      section("Exemple avec 10 ans d'ancienneté", [
        "Avec dix ans d'ancienneté, le licenciement hors faute grave conduit souvent à un préavis plus long qu'en début de carrière. La convention peut améliorer le minimum.",
        "Pour une démission, l'ancienneté ne modifie pas toujours la durée. Certaines conventions le prévoient, d'autres non."
      ]),
      section("Dispense et départ anticipé", [
        "Une dispense par l'employeur doit être distinguée d'une demande du salarié. Dans le premier cas, le préavis dû reste payé. Dans le second, le salaire peut s'arrêter plus tôt si l'employeur accepte une réduction non rémunérée.",
        "Ce point doit apparaître par écrit, même pour une relation de travail apaisée."
      ]),
      section("Congés et organisation", [
        "Les congés posés avant la rupture peuvent décaler la fin. Les congés posés après doivent être validés avec une date de fin claire.",
        "Pour un poste opérationnel, le planning d'équipe ne remplace pas la règle juridique. La paie suivra la date contractuelle."
      ])
    ],
    conclusion: [
      "Le préavis non cadre se vérifie avec la convention collective et le motif de rupture.",
      "Les exemples aident à se repérer, mais la durée exacte dépend du poste et des textes applicables."
    ],
    links: ["/salaire-brut-net-non-cadre"]
  }),

  makePage({
    slug: "conges-payes-pendant-preavis",
    title: "Congés payés pendant le préavis : suspension, accord et date de fin",
    h1: "Congés payés pendant le préavis",
    description:
      "Congés payés pendant le préavis : congés déjà posés, congés demandés après démission ou licenciement, suspension et solde de tout compte.",
    intro: [
      "Les congés payés pendant un préavis sont une source classique d'erreur. La même semaine de congés ne produit pas toujours le même effet selon qu'elle a été posée avant ou après la rupture.",
      `La date de pose et l'accord des parties sont les deux points à vérifier. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "Des congés payés fixés avant la notification peuvent suspendre le préavis et repousser la date de fin. Des congés pris après la notification, avec accord, ne prolongent pas forcément le préavis si les parties l'acceptent clairement.",
        "La fermeture annuelle de l'entreprise peut obéir à une lecture spécifique. Il faut donc éviter les réponses automatiques."
      ]),
      section("Congés posés avant la rupture", [
        "Un salarié avait deux semaines de congés validées en août. Il démissionne en juillet avec un préavis de deux mois. Ces congés peuvent suspendre le préavis et déplacer la fin du contrat.",
        "Le salarié qui a déjà signé un nouveau contrat doit vérifier ce point avant de confirmer sa date d'arrivée."
      ]),
      section("Congés demandés après la rupture", [
        "Si le salarié demande des congés après avoir démissionné, l'employeur peut accepter. L'accord doit dire si le préavis est prolongé ou si la date de fin reste inchangée.",
        "Une phrase comme “congés acceptés” ne suffit pas toujours. Mieux vaut écrire la date de fin du contrat."
      ]),
      section("Congés non pris", [
        "Les congés payés restants sont réglés dans le solde de tout compte sous forme d'indemnité compensatrice. Ils ne disparaissent pas parce que le contrat se termine.",
        "Cette indemnité peut aussi être prise en compte dans le calendrier d'indemnisation chômage."
      ]),
      section("Exemple concret", [
        "Un salarié non cadre a un mois de préavis à compter du 1er juin. Il avait une semaine de congés validée du 17 au 23 juin. Si ces congés suspendent le préavis, la fin peut glisser d'une semaine.",
        "Si les congés sont demandés après la démission et que l'employeur accepte sans prolongation, la date de fin peut rester au 1er juillet. L'écrit fait la différence."
      ])
    ],
    conclusion: [
      "Les congés payés pendant le préavis se traitent avec les dates exactes.",
      "La question à poser n'est pas seulement “puis-je partir en congés ?”, mais “quelle date de fin du contrat retenons-nous ?”."
    ],
    links: ["/chomage-et-conges-payes"]
  }),

  makePage({
    slug: "arret-maladie-pendant-preavis",
    title: "Arrêt maladie pendant le préavis : effet sur la date de fin",
    h1: "Arrêt maladie pendant le préavis",
    description:
      "Arrêt maladie pendant le préavis : maladie simple, accident du travail, maintien de salaire, date de fin et exemples pratiques.",
    intro: [
      "Un arrêt maladie pendant un préavis crée vite une inquiétude : faut-il reprendre pour finir le préavis ? La réponse dépend surtout de l'origine de l'arrêt.",
      `Maladie simple, accident du travail et maladie professionnelle ne se traitent pas avec le même niveau de prudence. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "En arrêt maladie non professionnel, le préavis continue généralement à courir. Le salarié n'a pas à refaire les jours d'absence à la fin du préavis.",
        "Si l'arrêt est lié à un accident du travail ou à une maladie professionnelle, l'effet peut être différent. Le dossier mérite alors une vérification avec la paie ou un conseil."
      ]),
      section("Maladie simple", [
        "Un salarié démissionne avec un mois de préavis, puis tombe malade dix jours. Son préavis ne repart pas à zéro. La date de fin prévue reste souvent la même.",
        "Le salaire de la période dépend ensuite des règles d'indemnisation maladie, du maintien employeur et des indemnités journalières."
      ]),
      section("Accident du travail ou maladie professionnelle", [
        "Quand l'arrêt a une origine professionnelle, le sujet devient plus sensible. Certaines protections peuvent jouer, et la fin du contrat ne doit pas être traitée mécaniquement.",
        "Avant de signer un document de sortie, il faut relire la chronologie : date de rupture, date d'accident, arrêt, éventuelle reprise, visite médicale."
      ]),
      section("Licenciement et arrêt maladie", [
        "Un licenciement notifié avant l'arrêt suit sa logique de préavis, sous réserve des protections applicables. Un licenciement envisagé pendant un arrêt demande une prudence particulière, surtout si l'arrêt est professionnel.",
        "Le salarié doit garder les justificatifs transmis à l'employeur et vérifier les dates figurant sur l'attestation France Travail."
      ]),
      section("Exemple concret", [
        "Une salariée non cadre démissionne le 1er juin avec un mois de préavis. Elle est arrêtée du 12 au 20 juin pour une maladie non professionnelle. Sauf règle particulière, le contrat se termine le 1er juillet.",
        "Autre cas : arrêt à la suite d'un accident du travail pendant le préavis. Ici, il ne faut pas appliquer le même raisonnement sans contrôle."
      ])
    ],
    conclusion: [
      "L'arrêt maladie simple ne repousse généralement pas le préavis.",
      "Dès qu'il existe un lien professionnel avec l'arrêt, la date de fin doit être vérifiée avec plus de précaution."
    ]
  }),

  makePage({
    slug: "reduction-preavis",
    title: "Réduction du préavis : demande, accord employeur et modèle",
    h1: "Réduction du préavis",
    description:
      "Réduction du préavis : comment demander un départ anticipé, obtenir l'accord de l'employeur, sécuriser la date et éviter les risques.",
    intro: [
      "Demander une réduction de préavis est courant quand un salarié a trouvé un nouvel emploi, déménage ou souhaite tourner la page plus vite. L'erreur consiste à confondre demande et droit automatique.",
      `Sans accord clair, le préavis reste dû. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "Le salarié peut demander une réduction de préavis. L'employeur peut accepter ou refuser, sauf cas particulier prévu par un texte. L'accord doit préciser la nouvelle date de fin et le traitement de la rémunération.",
        "La demande a plus de chances d'aboutir si elle propose une passation réaliste."
      ]),
      section("Quand la demander", [
        "Le meilleur moment est souvent la notification de démission ou juste après l'entretien de départ. Attendre la dernière semaine met l'employeur devant un problème d'organisation.",
        "Pour un cadre, la demande doit être encore plus préparée : dossiers ouverts, interlocuteurs, délégations, accès, points sensibles."
      ]),
      section("Exemple de formulation", [
        "“Je vous confirme ma démission reçue ce jour. Mon préavis devrait prendre fin le… Je sollicite votre accord pour une fin anticipée au… Je reste disponible pour organiser la passation suivante…”",
        "Cette formulation évite le ton conflictuel et met l'employeur en situation de répondre sur des dates précises."
      ]),
      section("Salaire et indemnité", [
        "Si la réduction est demandée par le salarié et acceptée, le salaire s'arrête souvent à la nouvelle date de fin. Si l'employeur dispense le salarié, le préavis dû peut rester payé.",
        "Le mail d'accord doit donc distinguer réduction demandée, dispense décidée et maintien éventuel de rémunération."
      ]),
      section("Cas concret", [
        "Un salarié avec un mois de préavis veut rejoindre son nouveau poste deux semaines plus tôt. Il propose de finaliser deux dossiers, de former un collègue et de rester joignable une demi-journée après son départ. L'employeur accepte par écrit une fin anticipée.",
        "Sans cet accord, le salarié aurait pris un risque financier."
      ])
    ],
    conclusion: [
      "La réduction du préavis se négocie, elle ne s'impose pas.",
      "Un écrit clair sur la date et la paie protège les deux parties."
    ]
  }),

  makePage({
    slug: "duree-preavis-anciennete",
    title: "Durée du préavis selon l'ancienneté : repères et exemples",
    h1: "Durée du préavis selon l'ancienneté",
    description:
      "Durée du préavis selon l'ancienneté : démission, licenciement, cadre, non cadre, convention collective et exemples à 2 ans et 10 ans.",
    intro: [
      "L'ancienneté joue un rôle important, surtout en licenciement. En démission, elle peut compter selon la convention collective, mais le statut et la branche pèsent souvent autant.",
      `La durée exacte se vérifie toujours avec le motif de rupture. ${disclaimer}`
    ],
    sections: [
      section("Repères rapides", [
        "Moins de six mois, entre six mois et deux ans, plus de deux ans : ces seuils reviennent souvent en licenciement. La convention collective peut prévoir des durées plus favorables.",
        "En démission, il n'existe pas une grille universelle par ancienneté pour tous les salariés. Un cadre et un non cadre ne sont pas comparables sans lire la convention."
      ]),
      section("Salarié avec 2 ans d'ancienneté", [
        "En licenciement hors faute grave, deux ans d'ancienneté donnent souvent accès à un préavis plus long qu'un salarié très récent. Le repère de deux mois revient fréquemment, sous réserve d'une règle plus favorable.",
        "En démission, le même salarié peut avoir un mois, deux mois ou trois mois selon sa catégorie."
      ]),
      section("Salarié avec 10 ans d'ancienneté", [
        "Avec dix ans d'ancienneté, le préavis de licenciement reste à relire avec la convention. L'ancienneté peut aussi influencer d'autres sommes de sortie, comme l'indemnité de licenciement ou de rupture conventionnelle.",
        "En démission, dix ans d'ancienneté ne signifient pas automatiquement un préavis plus long. Certaines conventions tiennent compte du niveau de poste plutôt que du nombre d'années."
      ]),
      section("Tableau pratique", [
        "Ce tableau sert de grille de contrôle, pas de réponse définitive. La convention collective garde le dernier mot lorsqu'elle prévoit une règle applicable.",
        "Le contrat peut aider, mais il ne doit pas masquer une règle de branche plus favorable."
      ], undefined, undefined, {
        headers: ["Ancienneté", "Démission", "Licenciement"],
        rows: [
          ["Moins de 6 mois", "Convention, contrat ou usage", "Règle légale ou conventionnelle à vérifier"],
          ["6 mois à moins de 2 ans", "Souvent selon statut", "Préavis possible, durée à contrôler"],
          ["2 ans et plus", "Selon statut et convention", "Préavis souvent plus protecteur"],
          ["10 ans et plus", "Pas automatique en démission", "Convention à relire avec attention"]
        ]
      }),
      section("Ne pas oublier le statut", [
        "Un cadre avec trois ans d'ancienneté peut avoir un préavis plus long qu'un non cadre avec dix ans. C'est contre-intuitif, mais fréquent.",
        "La bonne question est donc : quelle règle s'applique à mon statut, dans ma convention, pour mon motif de rupture ?"
      ])
    ],
    conclusion: [
      "L'ancienneté est un repère, pas le seul critère.",
      "Pour trouver la durée du préavis, croisez motif de rupture, statut, convention collective et contrat."
    ]
  }),

  makePage({
    slug: "date-fin-contrat-preavis",
    title: "Date de fin du contrat et préavis : dernier jour travaillé ou payé ?",
    h1: "Date de fin du contrat et préavis",
    description:
      "Date de fin du contrat et préavis : calcul, dernier jour travaillé, dispense, congés payés, arrêt maladie et documents de fin de contrat.",
    intro: [
      "La date de fin du contrat n'est pas toujours le dernier jour où le salarié met les pieds dans l'entreprise. C'est précisément ce qui crée des erreurs sur les documents de sortie.",
      `Le dernier jour travaillé, le dernier jour payé et la date juridique de fin peuvent être trois dates différentes. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "La date de fin du contrat correspond au terme du préavis exécuté ou payé, sauf accord de réduction ou situation particulière. En cas de dispense employeur, le salarié peut quitter les locaux plus tôt, mais le contrat peut prendre fin au terme du préavis.",
        "Cette date doit apparaître correctement sur le certificat de travail, l'attestation France Travail et le solde de tout compte."
      ]),
      section("Dernier jour travaillé", [
        "Le dernier jour travaillé est une date d'organisation. Elle sert à couper les accès, rendre le matériel, finir la passation. Elle ne suffit pas toujours à déterminer la fin du contrat.",
        "Exemple : licenciement avec dispense de deux mois. Le salarié cesse de travailler le 15 juin, mais le contrat peut courir jusqu'au 15 août."
      ]),
      section("Dernier jour payé", [
        "Le dernier jour payé suit la rémunération due : salaire travaillé, indemnité compensatrice de préavis, congés payés, primes. En réduction demandée par le salarié, la paie peut s'arrêter plus tôt.",
        "D'où l'intérêt de demander une confirmation écrite avant de partir avant le terme initial."
      ]),
      section("Documents de fin de contrat", [
        "Le certificat de travail doit indiquer les dates d'emploi. L'attestation France Travail doit reprendre les rémunérations et sommes versées. Une erreur peut retarder l'étude du dossier.",
        "Si une date paraît incohérente, demandez une correction rapidement, avec la chronologie en pièce jointe."
      ]),
      section("Exemples", [
        "Démission avec préavis réduit : l'employeur accepte une fin au 30 juin au lieu du 15 juillet. Le contrat se termine au 30 juin si l'accord le dit clairement.",
        "Licenciement avec préavis payé non travaillé : le salarié sort physiquement le 5 juin, mais la fin du contrat reste fixée au terme du préavis payé."
      ])
    ],
    conclusion: [
      "La date de fin du contrat se déduit de la règle de préavis et des accords écrits.",
      "Ne confondez jamais présence physique, paie et fin juridique du contrat."
    ]
  }),

  makePage({
    slug: "travailler-ailleurs-pendant-preavis",
    title: "Peut-on travailler ailleurs pendant un préavis ? Règles et risques",
    h1: "Peut-on travailler ailleurs pendant un préavis ?",
    description:
      "Travailler ailleurs pendant un préavis : démission, dispense, obligation de loyauté, clause d'exclusivité, concurrence et nouvel emploi.",
    intro: [
      "Un salarié qui a trouvé un nouveau poste veut souvent commencer avant la fin officielle de son préavis. La possibilité dépend de sa situation : préavis travaillé, dispense, contrat encore en cours, clause d'exclusivité ou activité concurrente.",
      `Le point à retenir : tant que le contrat n'est pas terminé, certaines obligations continuent. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "Pendant un préavis travaillé, le salarié reste tenu de travailler pour son employeur. Commencer ailleurs sur les mêmes horaires est risqué. En cas de dispense, la situation est plus ouverte, mais l'obligation de loyauté et les clauses contractuelles restent à vérifier.",
        "Une clause d'exclusivité ou de non-concurrence peut limiter la marge de manoeuvre."
      ]),
      section("Préavis travaillé", [
        "Si le salarié est encore attendu à son poste, il ne peut pas simplement commencer un autre CDI à temps plein. Il manquerait à ses obligations et créerait un conflit évident d'horaires.",
        "La bonne voie consiste à demander une réduction de préavis ou à négocier une date d'embauche compatible."
      ]),
      section("Dispense de préavis", [
        "Quand l'employeur dispense le salarié d'exécuter le préavis, le salarié n'est plus tenu de venir travailler. Il faut quand même vérifier si le contrat interdit une autre activité ou une activité concurrente pendant cette période.",
        "Un mail de dispense ne vaut pas toujours autorisation de rejoindre un concurrent le lendemain."
      ]),
      section("Loyauté, confidentialité, concurrence", [
        "Le salarié doit rester loyal jusqu'à la fin du contrat. Il ne doit pas détourner de clients, utiliser des informations confidentielles ou organiser une concurrence déloyale.",
        "Après la fin du contrat, une clause de non-concurrence peut s'appliquer si elle est valable et assortie de la contrepartie prévue."
      ]),
      section("Exemples", [
        "Un non cadre démissionne et obtient une réduction : son contrat se termine le 30 juin, il commence ailleurs le 1er juillet. Le risque est faible si l'accord est écrit.",
        "Un cadre dispensé de préavis payé veut rejoindre un concurrent direct avant la date de fin. Il doit relire ses clauses et demander conseil avant de signer."
      ])
    ],
    conclusion: [
      "Travailler ailleurs pendant un préavis est possible dans certains cas, risqué dans d'autres.",
      "La dispense, la loyauté et les clauses du contrat doivent être vérifiées avant de commencer."
    ]
  }),

  makePage({
    slug: "preavis-abandon-de-poste",
    title: "Préavis et abandon de poste : risques, chômage et licenciement",
    h1: "Préavis et abandon de poste",
    description:
      "Préavis et abandon de poste : risques pour le salarié, présomption de démission, licenciement, chômage, salaire et alternatives.",
    intro: [
      "L'abandon de poste est parfois envisagé pour éviter un préavis. C'est rarement une bonne stratégie. Le salarié perd la maîtrise du calendrier, du salaire et parfois de ses droits.",
      `Avant d'arrêter de venir travailler, il faut mesurer les conséquences concrètes. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "Un abandon de poste ne permet pas de supprimer proprement un préavis. L'employeur peut engager une procédure, suspendre le salaire et, dans certains cas, la situation peut être analysée comme une démission présumée après mise en demeure.",
        "Le salarié qui cherche à partir vite a souvent intérêt à demander une réduction de préavis ou à négocier une rupture conventionnelle plutôt que disparaître."
      ]),
      section("Pourquoi c'est risqué", [
        "Le salaire peut être suspendu pendant l'absence injustifiée. Le salarié ne connaît pas forcément la date de sortie. Les documents de fin de contrat peuvent arriver plus tard que prévu.",
        "L'impact sur France Travail dépendra de la qualification retenue et des éléments du dossier."
      ]),
      section("Préavis et licenciement", [
        "Si l'employeur licencie pour faute grave à la suite d'absences injustifiées, le salarié peut se retrouver sans préavis payé. Il conserve certains droits comme les congés payés acquis, mais le départ est moins maîtrisé.",
        "Contester ensuite reste possible, mais cela prend du temps et n'aide pas toujours à sécuriser une transition immédiate."
      ]),
      section("Alternatives plus propres", [
        "Demander une réduction de préavis, proposer une passation courte, négocier une rupture conventionnelle ou poser la situation par écrit sont des options plus lisibles.",
        "Même si l'employeur refuse, le salarié garde une chronologie claire et limite les risques."
      ]),
      section("Exemple concret", [
        "Un salarié a trouvé un emploi dans trois semaines alors que son préavis est d'un mois. S'il abandonne son poste, il perd son salaire et crée un dossier conflictuel. S'il demande une réduction de deux semaines avec passation, il peut obtenir une sortie propre.",
        "L'écart entre les deux choix se voit souvent au moment du solde de tout compte."
      ])
    ],
    conclusion: [
      "L'abandon de poste n'est pas une méthode fiable pour éviter un préavis.",
      "Quand le problème est le calendrier, mieux vaut chercher un accord écrit de réduction ou une solution de départ négociée."
    ],
    links: ["/rupture-conventionnelle-ou-abandon-de-poste", "/chomage-apres-demission"]
  }),

  makePage({
    slug: "indemnite-compensatrice-preavis",
    title: "Indemnité compensatrice de préavis : calcul, brut, net et exemples",
    h1: "Indemnité compensatrice de préavis",
    description:
      "Indemnité compensatrice de préavis : quand elle est due, calcul, salaire brut, congés payés, licenciement, dispense et exemples.",
    intro: [
      "L'indemnité compensatrice de préavis correspond au salaire que le salarié aurait perçu si le préavis dû avait été travaillé. Elle apparaît surtout quand l'employeur dispense le salarié de venir travailler.",
      `Elle doit être distinguée de l'indemnité de licenciement, des congés payés et de l'indemnité de rupture conventionnelle. ${disclaimer}`
    ],
    sections: [
      section("Réponse rapide", [
        "L'indemnité compensatrice de préavis est due lorsque le préavis devait être effectué ou payé, mais qu'il n'est pas travaillé à la demande de l'employeur. Elle est généralement calculée sur la rémunération que le salarié aurait touchée pendant cette période.",
        "Elle n'est pas due si le salarié est privé de préavis pour faute grave ou s'il demande lui-même une réduction non rémunérée acceptée par l'employeur."
      ]),
      section("Comment la calculer", [
        "Le calcul part du salaire habituel : fixe, primes liées au travail, avantages éventuels, selon les règles de paie applicables. Une part variable peut nécessiter une moyenne ou une lecture du plan de rémunération.",
        "L'indemnité génère aussi des congés payés afférents dans les conditions habituelles."
      ]),
      section("Exemple non cadre", [
        "Un salarié non cadre gagne 2 100 euros bruts par mois. Il est licencié hors faute grave avec deux mois de préavis et dispensé de travailler. L'indemnité compensatrice vise environ deux mois de rémunération brute, avant vérification des primes et congés payés.",
        "Le net dépendra du traitement en paie. Le simulateur brut/net peut aider à obtenir un repère de trésorerie."
      ]),
      section("Exemple cadre", [
        "Une cadre gagne 4 500 euros bruts mensuels avec une part variable régulière. Si elle est dispensée de trois mois de préavis, il faut regarder si la variable aurait été acquise pendant la période.",
        "Un calcul trop rapide sur le seul fixe peut sous-estimer le montant."
      ]),
      section("Lien avec chômage et solde de tout compte", [
        "L'indemnité compensatrice figure dans les sommes de fin de contrat. Elle peut influencer la lecture du dossier France Travail et doit être correctement déclarée.",
        "Au solde de tout compte, vérifiez les lignes séparées : salaire, préavis, congés payés, indemnité de rupture ou de licenciement."
      ])
    ],
    conclusion: [
      "L'indemnité compensatrice de préavis remplace le salaire du préavis non travaillé lorsque ce préavis reste dû.",
      "Son calcul doit intégrer la rémunération habituelle et être distingué des autres indemnités de départ."
    ],
    links: ["/salaire-brut-net", "/calcul-salaire-net"]
  })
];
