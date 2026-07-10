import type { PillarPage } from "@/lib/seo-content";
import { noticeSeoPages } from "@/lib/notice-seo-pages";

const mandatoryDisclaimer =
  "Ce simulateur fournit une estimation indicative et ne remplace pas un conseil juridique personnalisé.";

const reform2026MainPath = "/reforme-rupture-conventionnelle-2026";

const ruptureEditorialArticlePages: PillarPage[] = [
  {
    slug: "rupture-conventionnelle-droit-chomage",
    title: "Rupture conventionnelle et chômage : droit à l’ARE",
    h1: "Rupture conventionnelle et chômage : peut-on toucher l’ARE après son départ ?",
    description:
      "Rupture conventionnelle et chômage : droit ARE, inscription France Travail, différés, indemnité supra-légale et points à vérifier.",
    updatedAt: "2026-06-04",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/rupture-conventionnelle-chomage",
      "/rupture-conventionnelle-delai",
      "/rupture-conventionnelle-indemnite-minimum",
      "/rupture-conventionnelle-ou-demission",
      reform2026MainPath
    ],
    intro: [
      "Oui, une rupture conventionnelle homologuée peut ouvrir droit à l’ARE, contrairement à une démission classique dans la plupart des cas. Mais ce droit n’est pas un paiement immédiat : France Travail vérifie les conditions d’activité, les documents de fin de contrat et les éventuels différés.",
      `Avant de signer, il faut donc regarder deux choses séparément : le montant versé au départ et le calendrier possible de l’indemnisation chômage. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "La rupture conventionnelle ouvre-t-elle droit au chômage ?",
        paragraphs: [
          "En principe, la rupture conventionnelle individuelle fait partie des ruptures qui peuvent permettre une indemnisation chômage si les conditions générales sont remplies. Le point important est l’homologation : sans rupture homologuée, le dossier ne se lit pas de la même manière.",
          "France Travail ne regarde pas seulement le motif de fin de contrat. L’organisme vérifie aussi la durée travaillée, l’inscription comme demandeur d’emploi, les pièces transmises par l’employeur et la situation exacte au moment de la fin du CDI."
        ]
      },
      {
        title: "Ce qui peut retarder le premier paiement",
        paragraphs: [
          "Avoir un droit potentiel à l’ARE ne signifie pas toucher l’allocation dès le lendemain du départ. Un délai d’attente s’applique, et des différés peuvent s’ajouter selon les sommes versées à la fin du contrat.",
          "Les congés payés non pris peuvent créer un différé. Une indemnité supra-légale, c’est-à-dire la part au-dessus du minimum légal ou conventionnel, peut aussi influencer le point de départ de l’indemnisation selon les règles France Travail."
        ],
        bullets: [
          "Date réelle de fin de contrat.",
          "Indemnité compensatrice de congés payés.",
          "Part éventuelle au-dessus du minimum.",
          "Attestation employeur destinée à France Travail.",
          "Inscription et actualisation auprès de France Travail."
        ]
      },
      {
        title: "Exemple concret",
        paragraphs: [
          "Un salarié signe une rupture conventionnelle avec une indemnité conforme au minimum et dix jours de congés payés restants. Il peut avoir droit à l’ARE, mais son premier paiement peut être décalé par les congés payés et le délai d’attente.",
          "Autre situation : le salarié négocie une somme nettement supérieure au minimum. Cette somme peut améliorer la trésorerie au départ, mais elle doit être comparée au calendrier possible de l’indemnisation. C’est un point à vérifier avant de présenter une demande élevée."
        ]
      },
      {
        title: "Les documents à vérifier avant l’inscription",
        paragraphs: [
          "L’attestation employeur est centrale. Une date incorrecte, un montant mal ventilé ou une confusion entre indemnité de rupture et congés payés peut compliquer le traitement du dossier.",
          "Relisez aussi le solde de tout compte et la convention de rupture. Les montants doivent être cohérents entre eux. Si une erreur apparaît, mieux vaut demander une correction rapidement plutôt que découvrir le blocage après l’inscription."
        ],
        bullets: [
          "La date de rupture correspond à la convention homologuée.",
          "L’indemnité de rupture est distincte des congés payés.",
          "Les salaires déclarés correspondent aux bulletins de paie.",
          "La part supra-légale est identifiable si elle existe."
        ]
      },
      {
        title: "Avant de signer : comparer indemnité et chômage",
        paragraphs: [
          "Une rupture conventionnelle se prépare avec une vision d’ensemble. Le montant versé au départ compte, mais le calendrier France Travail compte aussi, surtout si vous n’avez pas de nouvel emploi prévu.",
          "Commencez par calculer votre indemnité de rupture conventionnelle, puis vérifiez séparément vos droits ARE. Cette méthode évite de confondre une indemnité correcte avec une situation financière confortable."
        ],
        boxedText: [
          "Le bon réflexe : estimer le minimum, identifier la part négociée, vérifier les congés payés, puis poser les questions chômage à France Travail avec les documents en main."
        ]
      }
    ],
    faq: [
      {
        question: "A-t-on droit au chômage après une rupture conventionnelle ?",
        answer:
          "En principe oui, si la rupture conventionnelle est homologuée et si les conditions générales d’indemnisation sont remplies. Le dossier doit être vérifié par France Travail."
      },
      {
        question: "Est-ce plus sécurisant qu’une démission pour le chômage ?",
        answer:
          "Dans la plupart des cas, oui. Une démission classique n’ouvre pas automatiquement droit à l’ARE, alors qu’une rupture conventionnelle homologuée peut ouvrir des droits sous conditions."
      },
      {
        question: "L’indemnité repousse-t-elle le chômage ?",
        answer:
          "Elle peut décaler le début de paiement lorsqu’il existe des congés payés ou une part supra-légale. Les règles exactes doivent être vérifiées avec France Travail."
      },
      {
        question: "Le simulateur calcule-t-il l’ARE ?",
        answer:
          "Non. Il estime l’indemnité de rupture conventionnelle. Les droits chômage et le calendrier de paiement relèvent de France Travail."
      }
    ],
    conclusion: [
      "La rupture conventionnelle peut ouvrir droit au chômage, mais il faut distinguer le principe du droit, la date réelle de paiement et les éventuels différés.",
      "Avant de signer, estimez votre indemnité, contrôlez les documents de fin de contrat et vérifiez les règles France Travail applicables à votre situation."
    ]
  },
  {
    slug: "rupture-conventionnelle-combien-demander",
    title: "Combien demander pour une rupture conventionnelle ?",
    h1: "Combien demander pour une rupture conventionnelle ?",
    description:
      "Combien demander pour une rupture conventionnelle : minimum légal, indemnité supra-légale, ancienneté, contexte et négociation.",
    updatedAt: "2026-06-04",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/negocier-rupture-conventionnelle",
      "/rupture-conventionnelle-indemnite-minimum",
      "/indemnite-legale-rupture-conventionnelle",
      "/rupture-conventionnelle-entretien",
      "/rupture-conventionnelle-pieges"
    ],
    intro: [
      "Il n’existe pas de montant unique à demander. Le point de départ sérieux, c’est le minimum légal ou conventionnel. Ensuite, une indemnité plus élevée peut se discuter selon l’ancienneté, le contexte du départ, la passation et l’intérêt de chaque partie à conclure un accord.",
      `La bonne question n’est donc pas seulement “combien demander ?”, mais “quel montant puis-je justifier sans fragiliser la discussion ?” ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Commencer par le minimum obligatoire",
        paragraphs: [
          "Avant toute négociation, il faut calculer le plancher. L’indemnité spécifique de rupture conventionnelle ne peut pas être inférieure au minimum applicable, qui dépend notamment de l’ancienneté et du salaire brut de référence.",
          "La convention collective peut prévoir une règle plus favorable que le minimum légal. C’est souvent le premier point oublié, surtout lorsque le salarié se concentre uniquement sur le montant proposé oralement."
        ]
      },
      {
        title: "Construire une fourchette réaliste",
        paragraphs: [
          "Une demande crédible se prépare avec une fourchette. Le bas correspond au minimum que vous jugez acceptable, le haut au montant que vous pouvez argumenter. Cette approche laisse de la place à la discussion.",
          "La fourchette doit tenir compte du contexte. Un départ souhaité par le salarié ne se négocie pas toujours comme une sortie proposée par l’employeur après une réorganisation, une tension durable ou une difficulté de reclassement."
        ],
        bullets: [
          "Minimum légal ou conventionnel.",
          "Ancienneté et niveau de rémunération.",
          "Part variable et primes régulières.",
          "Calendrier de départ souhaité.",
          "Passation ou continuité de service."
        ]
      },
      {
        title: "Quand une indemnité supra-légale se discute",
        paragraphs: [
          "L’indemnité supra-légale correspond à la part au-dessus du minimum. Elle n’est pas automatique, mais elle peut se négocier lorsque les deux parties y voient un intérêt : sortie apaisée, passation propre, calendrier maîtrisé ou contexte sensible.",
          "Il vaut mieux éviter les demandes déconnectées du dossier. Une demande élevée peut être entendue si elle est expliquée, chiffrée et présentée dans un cadre professionnel. Sans justification, elle peut au contraire fermer l’échange."
        ]
      },
      {
        title: "Exemple de raisonnement",
        paragraphs: [
          "Un salarié avec huit ans d’ancienneté estime un minimum brut à 5 600 euros. S’il souhaite demander 8 000 euros, il doit pouvoir expliquer l’écart : ancienneté, passation, contraintes de calendrier, contribution au poste ou volonté de trouver une issue équilibrée.",
          "Le sujet n’est pas de transformer chaque argument en droit automatique. Il s’agit de montrer pourquoi le montant proposé peut être cohérent pour conclure proprement."
        ]
      },
      {
        title: "Ne pas oublier le chômage et le net indicatif",
        paragraphs: [
          "Un montant plus élevé peut être intéressant, mais il faut aussi regarder son traitement social, fiscal et son impact possible sur le calendrier France Travail. Une indemnité supra-légale peut parfois décaler l’indemnisation.",
          "Avant de formuler votre demande, calculez le minimum brut, estimez le net indicatif et préparez deux ou trois arguments simples. C’est souvent plus efficace qu’une longue liste de reproches."
        ]
      }
    ],
    faq: [
      {
        question: "Peut-on demander plus que le minimum légal ?",
        answer:
          "Oui, mais l’employeur n’est pas obligé d’accepter. La part supérieure au minimum relève de la négociation."
      },
      {
        question: "Quel montant demander en premier ?",
        answer:
          "Il est prudent de partir d’une fourchette construite à partir du minimum, de l’ancienneté, du contexte et des objectifs de sortie."
      },
      {
        question: "Faut-il parler en brut ou en net ?",
        answer:
          "Le minimum se raisonne en brut. Le net indicatif aide à se projeter, mais il peut varier selon la situation."
      },
      {
        question: "Une indemnité élevée peut-elle retarder le chômage ?",
        answer:
          "Une part supra-légale peut influencer certains différés d’indemnisation. Il faut vérifier ce point avec France Travail."
      }
    ],
    conclusion: [
      "Le bon montant à demander dépend d’abord du minimum applicable, puis du contexte réel de la négociation.",
      "Une demande bien préparée, chiffrée et sobre a plus de chances d’ouvrir une discussion utile qu’un montant lancé sans base claire."
    ]
  },
  {
    slug: "rupture-conventionnelle-refus-employeur",
    title: "L’employeur peut-il refuser une rupture conventionnelle ?",
    h1: "L’employeur peut-il refuser une rupture conventionnelle ?",
    description:
      "L’employeur peut-il refuser une rupture conventionnelle ? Accord commun, absence d’obligation, relance, alternatives et prudence.",
    updatedAt: "2026-06-04",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: [
      "/lettre-demande-rupture-conventionnelle",
      "/modele-lettre-rupture-conventionnelle",
      "/rupture-conventionnelle-entretien",
      "/rupture-conventionnelle-combien-demander",
      "/rupture-conventionnelle-ou-demission",
      "/rupture-conventionnelle-pieges"
    ],
    intro: [
      "Oui, l’employeur peut refuser une rupture conventionnelle. Ce mode de rupture repose sur un accord commun : ni le salarié ni l’employeur ne peut l’imposer à l’autre.",
      `Un refus n’est pas forcément définitif, mais il oblige à reprendre le sujet autrement : comprendre le motif réel, revoir le calendrier, préparer de meilleurs arguments ou envisager une autre option. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Pourquoi l’employeur peut refuser",
        paragraphs: [
          "L’employeur peut refuser parce qu’il ne souhaite pas financer l’indemnité, parce que le calendrier tombe mal, parce que le poste est difficile à remplacer ou parce qu’il ne veut pas ouvrir une négociation.",
          "Dans la pratique, le refus n’est pas toujours longuement expliqué. La rupture conventionnelle reste une solution amiable. Si l’une des parties ne veut pas entrer dans ce cadre, la procédure ne peut pas avancer."
        ]
      },
      {
        title: "Le refus doit-il être motivé ?",
        paragraphs: [
          "En pratique, l’employeur n’a pas à accepter une demande ni à construire une motivation juridique détaillée comme pour un licenciement. Il peut simplement indiquer qu’il ne souhaite pas donner suite.",
          "Cela peut être frustrant, mais c’est cohérent avec la logique de l’accord commun. Le salarié peut demander un échange pour comprendre la position de l’entreprise, sans transformer cette demande en mise en demeure."
        ]
      },
      {
        title: "Comment relancer sans braquer la discussion",
        paragraphs: [
          "Une relance peut être utile si le refus semble lié au calendrier ou à un manque d’informations. Elle doit rester courte, factuelle et professionnelle.",
          "Par exemple : “Je comprends votre position. Si le calendrier est le principal frein, je suis disponible pour échanger sur une date de départ plus compatible avec l’organisation du service.”"
        ],
        bullets: [
          "Demander un motif pratique, sans exiger.",
          "Proposer un calendrier différent.",
          "Présenter une passation claire.",
          "Estimer l’indemnité avant de reparler du montant.",
          "Éviter les menaces et les ultimatums."
        ]
      },
      {
        title: "Quelles alternatives après un refus ?",
        paragraphs: [
          "Après un refus, les options dépendent du projet du salarié et du contexte. Une démission peut être envisagée si un autre emploi est sécurisé, mais elle n’a pas les mêmes effets sur l’indemnité et le chômage.",
          "Si la situation est tendue, il peut être utile de se faire accompagner avant d’agir. Un abandon de poste ou une décision précipitée peut créer plus de risques que de solutions."
        ]
      },
      {
        title: "Préparer une nouvelle demande",
        paragraphs: [
          "Si vous souhaitez revenir à la charge, préparez mieux le dossier : montant estimé, date de départ envisageable, passation, raisons professionnelles et impact pour l’entreprise.",
          "Une demande plus structurée ne garantit pas l’accord, mais elle augmente les chances d’avoir une vraie discussion plutôt qu’un refus de principe."
        ]
      }
    ],
    faq: [
      {
        question: "L’employeur est-il obligé d’accepter ?",
        answer:
          "Non. La rupture conventionnelle suppose un accord commun. L’employeur peut refuser."
      },
      {
        question: "Peut-on imposer une rupture conventionnelle ?",
        answer:
          "Non. Aucune des deux parties ne peut imposer une rupture conventionnelle à l’autre."
      },
      {
        question: "Peut-on refaire une demande après un refus ?",
        answer:
          "Oui, surtout si le contexte change ou si une nouvelle proposition de calendrier ou de passation est possible."
      },
      {
        question: "Faut-il démissionner après un refus ?",
        answer:
          "Pas automatiquement. La démission a des conséquences différentes, notamment sur l’indemnité et le chômage. Il faut comparer avant de décider."
      }
    ],
    conclusion: [
      "Un refus d’employeur n’est pas rare. Il ne signifie pas toujours que le dialogue est fermé, mais il rappelle que la rupture conventionnelle reste un accord amiable.",
      "Avant de relancer, préparez vos chiffres, votre calendrier et vos arguments avec calme."
    ]
  },
  {
    slug: "rupture-conventionnelle-delai",
    title: "Quels sont les délais d’une rupture conventionnelle ?",
    h1: "Quels sont les délais d’une rupture conventionnelle ?",
    description:
      "Délais de rupture conventionnelle : entretien, signature, rétractation, homologation, date de rupture et inscription France Travail.",
    updatedAt: "2026-06-04",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/rupture-conventionnelle-chomage",
      "/rupture-conventionnelle-entretien",
      "/blog/rupture-conventionnelle-et-preavis",
      "/rupture-conventionnelle-pieges",
      reform2026MainPath
    ],
    intro: [
      "Une rupture conventionnelle ne se fait pas du jour au lendemain. Il faut prévoir le temps de l’échange, la signature de la convention, le délai de rétractation, l’instruction de l’homologation et la date réelle de fin du contrat.",
      `En pratique, le calendrier doit être posé avant signature. Une date trop courte ou mal calculée peut créer un refus d’homologation ou une fin de contrat mal préparée. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Les grandes étapes du calendrier",
        paragraphs: [
          "Le processus commence par un ou plusieurs entretiens. La convention est ensuite signée si les deux parties sont d’accord sur le principe, la date de rupture et le montant de l’indemnité.",
          "Après signature, un délai de rétractation doit être respecté. La demande d’homologation ne peut être envoyée qu’après ce délai. L’administration dispose ensuite d’un délai d’instruction."
        ],
        bullets: [
          "Discussion ou demande initiale.",
          "Entretien de rupture conventionnelle.",
          "Signature de la convention.",
          "Délai de rétractation.",
          "Demande d’homologation.",
          "Date de rupture prévue dans la convention."
        ]
      },
      {
        title: "Pourquoi la date de rupture doit être réaliste",
        paragraphs: [
          "La date de fin de contrat ne doit pas être choisie uniquement en fonction du souhait du salarié ou de l’urgence de l’employeur. Elle doit rester compatible avec la procédure.",
          "Il faut aussi penser à la vie de l’entreprise : passation, congés, clôture des accès, dernier bulletin de paie et documents de fin de contrat. Un calendrier clair évite beaucoup de tensions au moment du départ."
        ]
      },
      {
        title: "Exemple de calendrier prudent",
        paragraphs: [
          "Un salarié et son employeur se mettent d’accord lors d’un entretien début juin. Ils signent la convention quelques jours plus tard, puis attendent la fin du délai de rétractation avant l’envoi du dossier.",
          "La rupture ne peut intervenir qu’après l’homologation ou l’expiration du délai d’instruction. Le salarié doit donc éviter de prendre un engagement externe trop ferme avant que le calendrier soit sécurisé."
        ]
      },
      {
        title: "Délais et chômage : ne pas confondre",
        paragraphs: [
          "La date de rupture du contrat n’est pas forcément la date du premier paiement France Travail. Après la fin du CDI, l’inscription, les documents et les différés éventuels peuvent encore décaler l’indemnisation.",
          "C’est important si vous comptez sur l’ARE pour financer la transition. Le calendrier de rupture et le calendrier chômage doivent être regardés séparément."
        ]
      },
      {
        title: "Les erreurs de date à éviter",
        paragraphs: [
          "Les erreurs les plus fréquentes sont simples : signer trop vite, oublier la rétractation, retenir une date de rupture trop proche ou partir avant que la procédure soit terminée.",
          "Avant signature, vérifiez aussi les congés payés restants et le dernier jour travaillé. Ces éléments peuvent influencer l’organisation, le solde de tout compte et la transition vers France Travail."
        ]
      }
    ],
    faq: [
      {
        question: "Combien de temps dure une rupture conventionnelle ?",
        answer:
          "Il faut compter le temps de discussion, le délai de rétractation et l’instruction de l’homologation. Le calendrier exact dépend de la date de signature et du dossier."
      },
      {
        question: "Peut-on partir avant l’homologation ?",
        answer:
          "Il faut être prudent. La rupture du contrat ne doit pas intervenir avant que la procédure soit valablement achevée."
      },
      {
        question: "Y a-t-il un préavis en rupture conventionnelle ?",
        answer:
          "Il n’y a pas de préavis classique comme en démission ou licenciement. La date de rupture est fixée dans la convention, sous réserve de la procédure."
      },
      {
        question: "Le chômage commence-t-il à la date de rupture ?",
        answer:
          "Pas forcément. Des démarches d’inscription, un délai d’attente et des différés peuvent s’appliquer."
      }
    ],
    conclusion: [
      "Les délais d’une rupture conventionnelle doivent être anticipés dès le premier échange. Le montant compte, mais la date de départ est tout aussi importante.",
      "Avant de signer, vérifiez le calendrier, l’indemnité, les congés payés et les démarches France Travail."
    ]
  },
  {
    slug: "rupture-conventionnelle-arret-maladie",
    title: "Rupture conventionnelle pendant un arrêt maladie",
    h1: "Peut-on faire une rupture conventionnelle pendant un arrêt maladie ?",
    description:
      "Rupture conventionnelle pendant un arrêt maladie : possibilité, consentement libre, pression, indemnité, prudence et points RH.",
    updatedAt: "2026-06-04",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: [
      "/rupture-conventionnelle-burn-out",
      "/rupture-conventionnelle-pieges",
      "/rupture-conventionnelle-entretien",
      "/simulateur-rupture-conventionnelle",
      "/rupture-conventionnelle-chomage"
    ],
    intro: [
      "Une rupture conventionnelle peut être envisagée pendant un arrêt maladie, mais c’est une situation sensible. Le point central est le consentement libre du salarié : aucune pression ne doit peser sur la décision.",
      `Avant d’accepter ou de proposer une rupture dans ce contexte, il faut prendre le temps de vérifier l’état réel du dossier, le montant, la date et les conséquences pratiques. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Pourquoi le sujet est sensible",
        paragraphs: [
          "L’arrêt maladie place souvent le salarié dans une situation de fragilité. Même si un accord peut être possible, il faut s’assurer que la rupture n’est pas imposée, précipitée ou présentée comme la seule issue.",
          "Côté employeur, la prudence est également nécessaire. Une rupture conventionnelle signée dans un contexte de santé dégradée peut être contestée si le consentement du salarié n’était pas réel ou si une pression est démontrée."
        ]
      },
      {
        title: "Les points à vérifier avant toute signature",
        paragraphs: [
          "La première vérification concerne la volonté du salarié. A-t-il le temps de réfléchir ? Peut-il poser des questions ? Comprend-il le montant, la date de rupture et les conséquences sur la suite ?",
          "La deuxième vérification concerne le dossier de paie : salaire de référence, absences, maintien de salaire, primes et convention collective. Un arrêt peut compliquer la lecture du salaire moyen si les bulletins récents ne reflètent pas la rémunération habituelle."
        ],
        bullets: [
          "Absence de pression ou d’urgence artificielle.",
          "Compréhension du montant proposé.",
          "Date de rupture compatible avec la procédure.",
          "Salaire de référence relu avec prudence.",
          "Conséquences chômage et santé vérifiées séparément."
        ]
      },
      {
        title: "Exemple réaliste",
        paragraphs: [
          "Un salarié en arrêt depuis plusieurs semaines ne se voit pas reprendre son poste. Il évoque une rupture conventionnelle avec son employeur. Avant de signer, il doit vérifier que le montant est correctement calculé et qu’il dispose d’un délai réel pour réfléchir.",
          "Dans ce type de situation, un échange posé vaut mieux qu’une signature rapide. Si le salarié se sent poussé vers la sortie, il doit demander un avis avant d’avancer."
        ]
      },
      {
        title: "Ce que l’employeur doit éviter",
        paragraphs: [
          "L’employeur doit éviter les formulations qui ressemblent à une menace : “signez ou nous lancerons une procédure”, “vous ne reviendrez pas”, “c’est la seule solution”. Ces phrases peuvent fragiliser le consentement.",
          "Il est préférable de laisser au salarié un temps de réflexion, de formaliser clairement les éléments discutés et de ne pas utiliser l’arrêt maladie comme un levier de négociation."
        ]
      },
      {
        title: "Calculer l’indemnité malgré l’arrêt",
        paragraphs: [
          "L’arrêt maladie ne dispense pas de calculer correctement l’indemnité minimale. Il faut relire le salaire de référence, les primes et les règles conventionnelles, surtout si les derniers bulletins de paie sont diminués.",
          "Le simulateur donne un premier repère, mais un dossier avec arrêt long ou rémunération modifiée mérite une vérification plus fine."
        ]
      }
    ],
    faq: [
      {
        question: "Une rupture conventionnelle pendant un arrêt maladie est-elle interdite ?",
        answer:
          "Elle n’est pas automatiquement interdite, mais la situation doit être traitée avec prudence, notamment sur le consentement libre du salarié."
      },
      {
        question: "Que faire si je me sens poussé à signer ?",
        answer:
          "Il faut prendre du recul, ne pas signer dans l’urgence et demander un accompagnement adapté en cas de pression."
      },
      {
        question: "L’arrêt maladie change-t-il le calcul de l’indemnité ?",
        answer:
          "Il peut compliquer la lecture du salaire de référence. Les bulletins, primes et règles conventionnelles doivent être vérifiés."
      },
      {
        question: "L’employeur peut-il proposer une rupture pendant l’arrêt ?",
        answer:
          "Il peut ouvrir une discussion, mais il ne doit pas exercer de pression. L’accord doit rester libre."
      }
    ],
    conclusion: [
      "La rupture conventionnelle pendant un arrêt maladie demande une vigilance particulière. Le sujet n’est pas seulement administratif : il touche au consentement, à la santé et à la sécurité du départ.",
      "Avant de signer, prenez le temps de vérifier le montant, le calendrier et l’absence de pression."
    ]
  },
  {
    slug: "rupture-conventionnelle-burn-out",
    title: "Rupture conventionnelle et burn-out : prudence",
    h1: "Rupture conventionnelle et burn-out : bonne ou mauvaise idée ?",
    description:
      "Rupture conventionnelle et burn-out : avantages, risques, pression, santé, chômage, indemnité et questions à vérifier avant de signer.",
    updatedAt: "2026-06-04",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: [
      "/rupture-conventionnelle-arret-maladie",
      "/rupture-conventionnelle-pieges",
      "/rupture-conventionnelle-chomage",
      "/rupture-conventionnelle-combien-demander",
      "/simulateur-rupture-conventionnelle"
    ],
    intro: [
      "En situation de burn-out, une rupture conventionnelle peut sembler être une sortie plus simple et plus apaisée. Parfois, elle l’est. Mais elle peut aussi être une mauvaise idée si elle est signée trop vite, sous pression ou sans mesurer les conséquences financières et médicales.",
      `La priorité reste de protéger la santé, puis de vérifier le cadre de départ : indemnité, chômage, date, consentement et alternatives possibles. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Quand la rupture peut aider",
        paragraphs: [
          "Elle peut aider lorsque le salarié veut tourner la page, que l’employeur accepte une sortie propre et que les conditions sont discutées calmement. Le cadre écrit, l’indemnité et l’homologation donnent alors une certaine lisibilité.",
          "Elle peut aussi éviter une reprise vécue comme impossible, à condition de ne pas remplacer un vrai suivi médical ou un accompagnement adapté."
        ]
      },
      {
        title: "Quand elle peut être risquée",
        paragraphs: [
          "Le risque apparaît lorsque le salarié est épuisé, isolé ou incapable de négocier sereinement. Dans cet état, on peut accepter un montant trop bas, une date trop rapide ou une formulation qui ne correspond pas à la réalité du dossier.",
          "Une rupture conventionnelle ne doit pas servir à masquer une pression, un conflit grave ou une situation de santé non traitée. Si le consentement est fragile, mieux vaut prendre conseil avant de signer."
        ]
      },
      {
        title: "Questions à se poser avant d’accepter",
        paragraphs: [
          "Avant de dire oui, posez les questions simples : est-ce mon choix ? Ai-je eu le temps de réfléchir ? Le montant couvre-t-il la transition ? Ai-je vérifié mes droits chômage ? La date de rupture me laisse-t-elle une marge suffisante ?",
          "Ces questions ne règlent pas tout, mais elles évitent les décisions prises uniquement sous l’effet de la fatigue ou de l’urgence."
        ],
        bullets: [
          "Le consentement est-il réellement libre ?",
          "Le montant proposé respecte-t-il le minimum ?",
          "Une part supra-légale est-elle justifiée ?",
          "Le calendrier protège-t-il la transition ?",
          "Un médecin, un avocat ou un conseiller peut-il aider ?"
        ]
      },
      {
        title: "Exemple de situation",
        paragraphs: [
          "Un salarié en burn-out souhaite partir rapidement. L’employeur propose une rupture avec le minimum légal et une date proche. Avant de signer, le salarié doit vérifier si ce minimum est exact, si la convention collective prévoit mieux et si le calendrier est compatible avec ses démarches de santé et France Travail.",
          "Dans ce contexte, demander quelques jours de réflexion n’est pas un luxe. C’est souvent une protection nécessaire."
        ]
      },
      {
        title: "Préparer une discussion plus protectrice",
        paragraphs: [
          "Même lorsque l’envie de partir est forte, il faut préparer l’entretien. Arrivez avec une estimation, une idée de calendrier et des questions précises. Vous n’avez pas besoin de détailler toute votre situation médicale pour discuter du montant et de la date.",
          "Si le contexte est lourd, faites-vous accompagner. La rupture conventionnelle peut être une option, mais elle ne doit pas être le choix par défaut parce que vous êtes à bout."
        ]
      }
    ],
    faq: [
      {
        question: "Une rupture conventionnelle est-elle conseillée en cas de burn-out ?",
        answer:
          "Il n’y a pas de réponse unique. Elle peut convenir dans certains cas, mais elle doit être préparée avec prudence et sans pression."
      },
      {
        question: "Puis-je refuser si je ne me sens pas capable de décider ?",
        answer:
          "Oui. La rupture conventionnelle repose sur un accord. Si vous ne vous sentez pas prêt, il faut prendre le temps de vérifier."
      },
      {
        question: "Le burn-out justifie-t-il une indemnité plus élevée ?",
        answer:
          "Pas automatiquement. Le contexte peut toutefois entrer dans la discussion, surtout si une sortie apaisée est recherchée."
      },
      {
        question: "Faut-il parler de sa santé à l’employeur ?",
        answer:
          "Il faut rester prudent. Vous pouvez discuter du calendrier et de la sortie sans détailler au-delà de ce qui est nécessaire."
      }
    ],
    conclusion: [
      "En cas de burn-out, la rupture conventionnelle peut être une solution, mais seulement si elle est librement choisie, correctement chiffrée et compatible avec votre santé.",
      "Ne signez pas dans l’urgence. Vérifiez le montant, la date, les droits chômage et les alternatives possibles."
    ]
  },
  {
    slug: "rupture-conventionnelle-pieges",
    title: "Les pièges à éviter avant une rupture conventionnelle",
    h1: "Les pièges à éviter avant de signer une rupture conventionnelle",
    description:
      "Pièges rupture conventionnelle : indemnité trop basse, date mal choisie, pression, congés payés, chômage, solde de tout compte.",
    updatedAt: "2026-06-04",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/rupture-conventionnelle-combien-demander",
      "/rupture-conventionnelle-delai",
      "/rupture-conventionnelle-chomage",
      "/rupture-conventionnelle-arret-maladie",
      "/rupture-conventionnelle-entretien"
    ],
    intro: [
      "Les pièges les plus fréquents ne sont pas toujours spectaculaires. Une indemnité calculée trop bas, une date mal choisie, des congés payés oubliés ou une pression mal identifiée peuvent suffire à rendre le départ beaucoup moins favorable que prévu.",
      `Avant de signer, prenez le temps de vérifier le montant, le calendrier, les documents et les conséquences chômage. C’est souvent là que se jouent les vrais écarts. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Signer sans vérifier l’indemnité",
        paragraphs: [
          "Le premier piège consiste à accepter le montant proposé sans le comparer au minimum légal ou conventionnel. Même une proposition présentée comme “standard” peut être incomplète si l’ancienneté, les primes ou la convention collective sont mal prises en compte.",
          "Avant de discuter, faites une estimation. Elle ne règle pas tout, mais elle vous donne une base pour poser les bonnes questions."
        ]
      },
      {
        title: "Choisir une date trop rapide",
        paragraphs: [
          "Une date de rupture trop proche peut créer des difficultés : procédure non terminée, passation bâclée, documents préparés dans l’urgence ou période sans revenu mal anticipée.",
          "La date doit tenir compte du délai de rétractation, de l’homologation, des congés restants et de votre situation personnelle après le départ."
        ]
      },
      {
        title: "Confondre indemnité et autres sommes",
        paragraphs: [
          "L’indemnité spécifique de rupture conventionnelle n’est pas la même chose que les congés payés, les primes dues, le salaire du dernier mois ou une éventuelle régularisation.",
          "Tout peut apparaître dans le solde de tout compte, mais chaque somme a sa nature. Les mélanger rend la proposition plus difficile à comprendre et peut masquer une indemnité de rupture trop faible."
        ],
        bullets: [
          "Indemnité spécifique de rupture.",
          "Indemnité compensatrice de congés payés.",
          "Salaire restant dû.",
          "Primes ou variables.",
          "Éventuelle indemnité supra-légale."
        ]
      },
      {
        title: "Sous-estimer l’impact chômage",
        paragraphs: [
          "La rupture conventionnelle peut ouvrir droit au chômage, mais pas forcément à un paiement immédiat. Les congés payés et certaines sommes supra-légales peuvent décaler le point de départ de l’indemnisation.",
          "Si votre budget dépend de l’ARE, vérifiez le calendrier probable avant de considérer que l’indemnité versée suffit."
        ]
      },
      {
        title: "Signer sous pression",
        paragraphs: [
          "Une rupture conventionnelle doit être librement acceptée. Si vous sentez que la décision est imposée, que le délai est anormalement court ou que l’on vous présente la signature comme la seule option, prenez du recul.",
          "Dans les situations d’arrêt maladie, de burn-out, de conflit ou de menace de sanction, la prudence est encore plus importante."
        ],
        boxedText: [
          "Le réflexe simple : ne signez pas le jour même si vous ne comprenez pas le montant, la date ou les conséquences."
        ]
      },
      {
        title: "Oublier les clauses et documents annexes",
        paragraphs: [
          "La rupture ne se résume pas au formulaire. Vérifiez aussi la clause de non-concurrence, la mutuelle, la prévoyance, les congés, le matériel à restituer et les documents remis à la sortie.",
          "Ces points paraissent secondaires pendant la négociation, mais ils deviennent très concrets une fois le contrat terminé."
        ]
      }
    ],
    faq: [
      {
        question: "Quel est le piège le plus fréquent ?",
        answer:
          "Accepter un montant sans vérifier le minimum légal ou conventionnel est l’un des pièges les plus fréquents."
      },
      {
        question: "Faut-il signer rapidement si l’employeur insiste ?",
        answer:
          "Non. Il faut comprendre le montant, la date et les conséquences avant de signer. Une pression doit alerter."
      },
      {
        question: "Les congés payés sont-ils inclus dans l’indemnité ?",
        answer:
          "Non. Les congés payés non pris doivent être distingués de l’indemnité spécifique de rupture."
      },
      {
        question: "La clause de non-concurrence compte-t-elle ?",
        answer:
          "Oui. Elle peut avoir un impact après le départ et doit être vérifiée avant signature."
      }
    ],
    conclusion: [
      "Une rupture conventionnelle bien préparée est souvent lisible. Une rupture signée trop vite peut coûter cher en montant, en calendrier ou en sécurité.",
      "Avant de signer, calculez, relisez, questionnez et vérifiez les documents."
    ]
  },
  {
    slug: "rupture-conventionnelle-entretien",
    title: "Entretien de rupture conventionnelle : le préparer",
    h1: "Entretien de rupture conventionnelle : comment bien le préparer ?",
    description:
      "Préparer un entretien de rupture conventionnelle : arguments, documents, posture, indemnité, calendrier, questions et erreurs à éviter.",
    updatedAt: "2026-06-04",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: [
      "/lettre-demande-rupture-conventionnelle",
      "/rupture-conventionnelle-combien-demander",
      "/rupture-conventionnelle-refus-employeur",
      "/rupture-conventionnelle-delai",
      "/simulateur-rupture-conventionnelle",
      "/negocier-rupture-conventionnelle"
    ],
    intro: [
      "Un entretien de rupture conventionnelle se prépare comme un échange professionnel, pas comme une confrontation. L’objectif est de parler clairement du principe du départ, du montant, de la date, de la passation et des prochaines étapes.",
      `Plus vous arrivez avec des informations vérifiées, plus la discussion reste concrète. Salaire, ancienneté, congés, calendrier et questions chômage doivent être anticipés avant le rendez-vous. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Avant l’entretien : préparer les chiffres",
        paragraphs: [
          "Commencez par réunir les éléments simples : date d’entrée, salaire brut, primes, convention collective, congés restants et date de départ souhaitée. Ces informations permettent de vérifier le minimum et d’éviter une discussion trop vague.",
          "Une simulation avant l’entretien donne un repère. Elle ne remplace pas la paie, mais elle évite d’arriver sans base lorsque le montant est abordé."
        ]
      },
      {
        title: "Préparer ses arguments",
        paragraphs: [
          "Les meilleurs arguments sont factuels. Ancienneté, passation, calendrier compatible avec l’activité, relation de travail qui arrive à son terme, projet de reconversion ou volonté d’une sortie apaisée peuvent être évoqués avec mesure.",
          "Évitez de transformer l’entretien en inventaire de reproches. Même si le contexte est tendu, une formulation courte et professionnelle protège mieux la discussion."
        ],
        bullets: [
          "Pourquoi une sortie amiable est envisagée.",
          "Quelle date de départ semble réaliste.",
          "Quelle passation peut être organisée.",
          "Quel montant minimum a été estimé.",
          "Quels points doivent encore être vérifiés."
        ]
      },
      {
        title: "Les questions à poser",
        paragraphs: [
          "Un bon entretien n’est pas seulement une demande. C’est aussi un moment pour obtenir des réponses précises : quel calendrier l’employeur envisage-t-il ? Quel montant propose-t-il ? Qui prépare les documents ? Comment seront traités les congés payés ?",
          "Posez les questions calmement et notez les réponses. Si un point reste flou, demandez une confirmation écrite ou un nouvel échange avant signature."
        ]
      },
      {
        title: "La bonne posture pendant l’échange",
        paragraphs: [
          "Restez direct, mais pas agressif. Une phrase simple suffit souvent : “Je souhaite que nous étudiions la possibilité d’une rupture conventionnelle, avec un calendrier clair et un montant conforme à ma situation.”",
          "Si l’employeur refuse, ne vous enfermez pas dans une réaction immédiate. Vous pourrez retravailler votre demande, proposer un autre calendrier ou comparer avec d’autres options."
        ]
      },
      {
        title: "Après l’entretien",
        paragraphs: [
          "Après le rendez-vous, reprenez vos notes. Vérifiez le montant, la date, les congés et les documents. Ne considérez pas la rupture comme acquise tant qu’une convention n’est pas signée puis homologuée.",
          "Si une proposition vous est faite, comparez-la au minimum estimé et à votre situation réelle. Le bon moment pour corriger une erreur, c’est avant la signature."
        ]
      }
    ],
    faq: [
      {
        question: "Que faut-il apporter à l’entretien ?",
        answer:
          "Vos dates, vos derniers bulletins de paie, une estimation d’indemnité, vos congés restants et vos questions principales."
      },
      {
        question: "Faut-il annoncer un montant tout de suite ?",
        answer:
          "Pas forcément. Vous pouvez d’abord demander l’ouverture d’une discussion, puis aborder le montant avec une estimation."
      },
      {
        question: "Peut-on être accompagné ?",
        answer:
          "Selon la situation et les règles applicables, un accompagnement peut être possible. Il faut vérifier les modalités avant l’entretien."
      },
      {
        question: "Que faire après un entretien négatif ?",
        answer:
          "Reprenez les raisons du refus, ajustez votre demande si c’est pertinent et comparez les alternatives avant toute décision."
      }
    ],
    conclusion: [
      "Un entretien bien préparé rend la rupture conventionnelle plus lisible : montant, date, passation et documents sont posés plus calmement.",
      "Avant le rendez-vous, estimez votre indemnité et préparez quelques questions précises."
    ]
  },
  {
    slug: "rupture-conventionnelle-indemnite-minimum",
    title: "Indemnité minimum de rupture conventionnelle",
    h1: "Indemnité minimum de rupture conventionnelle : comment la calculer ?",
    description:
      "Indemnité minimum de rupture conventionnelle : calcul, salaire de référence, ancienneté, convention collective et simulateur.",
    updatedAt: "2026-06-04",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: [
      "/simulateur-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle",
      "/indemnite-legale-rupture-conventionnelle",
      "/calcul-indemnite-rupture-conventionnelle-net",
      "/rupture-conventionnelle-combien-demander",
      "/rupture-conventionnelle-pieges"
    ],
    intro: [
      "L’indemnité minimum de rupture conventionnelle se calcule à partir de l’ancienneté et du salaire brut de référence. Elle ne peut pas être inférieure au minimum applicable, et la convention collective peut parfois prévoir un montant plus favorable.",
      `Ce minimum est le plancher de la discussion. Il ne dit pas à lui seul ce que vous pouvez négocier, mais il permet de vérifier qu’une proposition respecte la base obligatoire. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "La règle de base",
        paragraphs: [
          "Le minimum de rupture conventionnelle est au moins équivalent à l’indemnité légale de licenciement. En pratique, la formule de référence applique un quart de mois de salaire par année d’ancienneté jusqu’à dix ans, puis un tiers de mois par année au-delà.",
          "Les années incomplètes doivent être prises en compte avec prudence. Une date d’entrée ou une date de rupture mal retenue peut modifier le montant."
        ]
      },
      {
        title: "Le salaire de référence",
        paragraphs: [
          "Le salaire de référence doit être relu sérieusement. Il ne faut pas partir automatiquement du dernier net payé. Le calcul se raisonne en brut et peut intégrer des éléments réguliers de rémunération selon les règles applicables.",
          "Primes, variables, commissions, absences, temps partiel ou changement récent de rémunération peuvent rendre le calcul moins évident. Dans ces cas, il vaut mieux tester plusieurs hypothèses et vérifier avec la paie."
        ]
      },
      {
        title: "Convention collective : le point à ne pas oublier",
        paragraphs: [
          "Certaines conventions collectives prévoient une indemnité plus favorable. Si c’est le cas, le montant applicable peut être supérieur au minimum légal.",
          "La convention collective figure généralement sur le bulletin de paie. Avant de signer, vérifiez-la ou demandez à l’employeur la règle retenue pour le calcul."
        ]
      },
      {
        title: "Exemple de calcul",
        paragraphs: [
          "Exemple : un salarié avec six ans d’ancienneté et un salaire brut de référence de 2 500 euros peut obtenir un minimum indicatif de 2 500 x 1/4 x 6, soit 3 750 euros bruts.",
          "Si sa convention collective prévoit une règle plus favorable, ou si des primes régulières changent le salaire de référence, le montant peut augmenter."
        ]
      },
      {
        title: "Minimum et montant négocié",
        paragraphs: [
          "Le minimum n’est pas forcément le montant final. Les parties peuvent négocier une indemnité plus élevée, appelée souvent supra-légale lorsqu’elle dépasse le plancher applicable.",
          "Pour bien comparer, séparez toujours le minimum, la part négociée et les autres sommes dues, comme les congés payés."
        ],
        boxedText: [
          "Avant de signer : calculez le minimum, vérifiez la convention collective, puis regardez si une négociation au-dessus du plancher est pertinente."
        ]
      }
    ],
    faq: [
      {
        question: "Quel est le minimum d’une rupture conventionnelle ?",
        answer:
          "Il ne peut pas être inférieur au minimum applicable, au moins équivalent à l’indemnité légale de licenciement, sous réserve d’une règle conventionnelle plus favorable."
      },
      {
        question: "Le calcul se fait-il en brut ou en net ?",
        answer:
          "Le minimum se raisonne en brut. Le net indicatif peut varier selon le traitement social et fiscal."
      },
      {
        question: "La convention collective peut-elle augmenter le montant ?",
        answer:
          "Oui. Certaines conventions collectives prévoient une règle plus favorable que le minimum légal."
      },
      {
        question: "Les congés payés sont-ils compris dans le minimum ?",
        answer:
          "Non. Les congés payés non pris doivent être distingués de l’indemnité spécifique de rupture."
      }
    ],
    conclusion: [
      "L’indemnité minimum est le socle de la rupture conventionnelle. Elle doit être calculée avant toute discussion sur un montant négocié.",
      "Le simulateur permet d’obtenir un repère rapide, à relire ensuite avec les bulletins de paie et la convention collective."
    ]
  },
  {
    slug: "lettre-demande-rupture-conventionnelle",
    title: "Modèle de lettre pour demander une rupture conventionnelle",
    h1: "Modèle de lettre pour demander une rupture conventionnelle",
    description:
      "Modèle de lettre pour demander une rupture conventionnelle : exemple simple, email, ton à adopter, entretien et points à vérifier.",
    updatedAt: "2026-06-04",
    updatedLabel: "Dernière mise à jour : juin 2026",
    relatedLinks: [
      "/modele-lettre-rupture-conventionnelle",
      "/rupture-conventionnelle-entretien",
      "/rupture-conventionnelle-refus-employeur",
      "/rupture-conventionnelle-combien-demander",
      "/simulateur-rupture-conventionnelle"
    ],
    intro: [
      "Une lettre de demande de rupture conventionnelle sert surtout à ouvrir une discussion. Elle ne force pas l’employeur à accepter et ne valide pas la rupture à elle seule.",
      `Le bon courrier est court, factuel et professionnel. Il demande un entretien, sans pression ni formule définitive, puis laisse la place à la négociation du montant et du calendrier. ${mandatoryDisclaimer}`
    ],
    sections: [
      {
        title: "Quand envoyer une lettre ?",
        paragraphs: [
          "La lettre est utile si vous voulez formaliser votre demande ou garder une trace. Elle n’est pas toujours indispensable : dans beaucoup d’entreprises, le sujet commence par un échange oral ou un email.",
          "Le support dépend du contexte. Si la relation est fluide, un email peut suffire. Si le sujet est sensible, un courrier plus formel peut être préférable."
        ]
      },
      {
        title: "Modèle simple à adapter",
        paragraphs: [
          "Ce modèle vise à demander un entretien. Il doit être adapté à votre poste, à votre entreprise et au ton habituel de vos échanges.",
          "Évitez d’y mettre un montant trop tôt si la discussion n’a pas commencé. Vous pourrez parler indemnité après avoir estimé le minimum applicable."
        ],
        boxedText: [
          "Objet : Demande d’entretien concernant une éventuelle rupture conventionnelle",
          "Madame, Monsieur,",
          "Salarié(e) de l’entreprise depuis le [date d’entrée], au poste de [poste], je souhaite solliciter un entretien afin d’échanger sur la possibilité d’une rupture conventionnelle de mon contrat de travail.",
          "Cette demande a pour objectif d’ouvrir une discussion dans un cadre serein et constructif. Elle ne préjuge pas de l’issue de nos échanges, qui supposera naturellement l’accord des deux parties.",
          "Je reste disponible pour convenir d’un rendez-vous afin d’aborder les conditions éventuelles de cette rupture, son calendrier et les modalités pratiques associées.",
          "Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.",
          "[Signature]"
        ]
      },
      {
        title: "Variante courte par email",
        paragraphs: [
          "L’email peut être plus naturel si vous échangez déjà souvent avec votre manager ou les RH. Le ton doit rester posé et ne pas laisser penser que la rupture est déjà décidée.",
          "Une formulation simple suffit : vous demandez un rendez-vous, vous n’imposez pas la suite."
        ],
        boxedText: [
          "Bonjour [Madame/Monsieur],",
          "Je souhaiterais convenir d’un entretien afin d’échanger sur la possibilité d’une rupture conventionnelle de mon contrat de travail.",
          "Ma démarche vise à ouvrir une discussion constructive, sans préjuger de l’issue de nos échanges.",
          "Seriez-vous disponible prochainement pour en parler ?",
          "Bien cordialement,"
        ]
      },
      {
        title: "Ce qu’il vaut mieux éviter",
        paragraphs: [
          "Évitez les reproches détaillés, les accusations, les menaces ou les formules qui ressemblent à un ultimatum. Une rupture conventionnelle repose sur un consentement libre : le courrier doit rester compatible avec cette logique.",
          "Évitez aussi d’écrire que l’employeur est obligé d’accepter. Ce n’est pas le cas. Une demande bien formulée ouvre une porte ; elle ne crée pas un droit à la rupture."
        ]
      },
      {
        title: "Avant l’envoi : préparer le rendez-vous",
        paragraphs: [
          "Avant d’envoyer votre demande, estimez votre indemnité. Vous serez plus à l’aise si l’employeur vous demande ce que vous attendez ou si un échange s’ouvre rapidement sur le montant.",
          "Préparez aussi la date de départ souhaitée, les congés restants et les questions à poser sur les documents de fin de contrat."
        ]
      }
    ],
    faq: [
      {
        question: "Une lettre est-elle obligatoire ?",
        answer:
          "Non. Elle peut être utile pour formaliser la demande, mais la rupture conventionnelle repose ensuite sur une procédure et un accord commun."
      },
      {
        question: "Peut-on envoyer la demande par email ?",
        answer:
          "Oui, un email peut suffire pour demander un entretien si le contexte s’y prête."
      },
      {
        question: "Faut-il indiquer le montant demandé ?",
        answer:
          "Pas forcément. Il est souvent plus prudent de demander d’abord un entretien, puis d’aborder le montant avec une estimation."
      },
      {
        question: "L’employeur peut-il refuser après la lettre ?",
        answer:
          "Oui. La lettre ouvre une discussion, mais elle n’oblige pas l’employeur à accepter."
      }
    ],
    conclusion: [
      "Une bonne lettre de demande de rupture conventionnelle est sobre, claire et prudente. Elle ouvre un échange sans imposer la rupture.",
      "Avant de l’envoyer, estimez votre indemnité et préparez les points à discuter pendant l’entretien."
    ]
  }
];

export const editorialArticlePages: PillarPage[] = [
  ...ruptureEditorialArticlePages,
  ...noticeSeoPages
];
