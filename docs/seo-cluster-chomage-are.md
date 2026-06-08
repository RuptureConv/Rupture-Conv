# Cluster SEO chomage ARE

Date d'audit : 8 juin 2026

## Resume executif

Rupture-Conv.fr doit faire du simulateur `/simulateur-chomage-rupture-conventionnelle` la page d'action centrale du cluster chomage. La strategie retenue repose sur un parcours lisible par Google et par l'utilisateur : salaire brut, rupture conventionnelle, ARE, premier paiement, retour a l'emploi.

Le hub canonique est `/chomage-are`. Les pages ROI repondent chacune a une intention concrete : calculer, savoir combien toucher, comprendre quand le paiement arrive, verifier la duree, anticiper le delai de carence et relier l'indemnite de rupture au chomage.

## Audit du simulateur actuel

Forces :
- Outil deja centre sur ARE, delais, premier paiement, duree et projection globale.
- Bon niveau de prudence E-E-A-T : France Travail reste presente comme autorite finale.
- Donnees structurees FAQPage, WebApplication et fil d'Ariane.
- UX utile pour une decision de rupture conventionnelle : montant mensuel, differes, indemnites et calendrier.

Faiblesses corrigees ou a surveiller :
- Titre initial trop centre sur la rupture conventionnelle pour capter les requetes larges "simulateur chomage" et "simulateur ARE".
- CTA satellites qui laissaient entendre que le simulateur dedie n'etait pas encore disponible.
- Exemples chiffrés incomplets par rapport aux paliers business 2000, 2500, 3000, 3500 et 4000 euros brut.
- Liens internes sortants vers d'anciens slugs ou pages moins prioritaires.
- Risque de cannibalisation entre `/chomage`, `/calcul-chomage`, `/delai-carence-chomage`, `/cumul-salaire-et-chomage` et les nouveaux slugs canoniques.
- Pages SEO trop proches dans leur structure initiale : meme tableau de salaires, meme recapitulatif, meme schema et FAQ trop standardisee.
- CTA trop uniformes alors que les intentions "montant", "delai", "demission", "rupture conventionnelle" et "actualisation" demandent des actions differentes.
- Simulateur clair techniquement, mais certains champs sensibles demandaient plus de micro-explications grand public.

Intentions a couvrir :
- Combien vais-je toucher au chomage ?
- Quand touche-t-on le chomage ?
- Pendant combien de temps ?
- Quel delai de carence apres rupture conventionnelle ?
- Quel effet de l'indemnite supra-legale ?
- Comment se passe le premier paiement France Travail ?
- Que se passe-t-il apres demission, licenciement, fin CDD, pour un cadre ou un senior ?

## Analyse SERP

Acteurs dominants :
- France Travail : autorite maximale sur simulateurs, paiement, conditions et calendrier.
- Service-Public : forte autorite informationnelle sur ARE, duree, differes et paiement.
- Sites prives simulateurs : Simulons, calculateur-rupture.fr, simulateur-aides.fr, Futur, MonSalaire, Simulez.
- Sites juridiques/RH : LegalPlace, editions specialisees, avocats, blogs RH.

Faiblesses observees :
- Beaucoup de pages donnent un montant mais expliquent mal le calendrier reel.
- Peu de pages relient proprement rupture conventionnelle, indemnite supra-legale, differes et premier paiement.
- Les simulateurs generalistes ne traitent pas assez le parcours avant signature.
- Les contenus "quand vais-je etre paye" sont souvent separes du calcul ARE, ce qui cree une opportunite de cluster.

Opportunites :
- Gagner les intentions mixtes montant + delai.
- Capter les salaries en negociation de rupture conventionnelle avant leur inscription France Travail.
- Se positionner sur des featured snippets avec des reponses courtes : formule ARE, 7 jours d'attente, differes, duree selon age.
- Renforcer la topical authority RH en reliant salaire, rupture, chomage et retour a l'emploi.

## Cartographie du cluster

Hub :
- `/chomage-are`

Pages ROI prioritaires :
- `/calcul-allocation-chomage`
- `/combien-vais-je-toucher-au-chomage`
- `/simulateur-allocation-chomage`
- `/chomage-apres-rupture-conventionnelle`
- `/delai-de-carence-chomage`
- `/quand-touche-t-on-le-chomage`
- `/premier-paiement-france-travail`
- `/duree-indemnisation-chomage`
- `/cumul-are-salaire`
- `/comment-est-calculee-l-are`

Longue traine :
- `/chomage-apres-demission`
- `/chomage-apres-licenciement`
- `/chomage-fin-cdd`
- `/chomage-cadre`
- `/chomage-senior`
- `/france-travail-inscription`
- `/france-travail-actualisation`
- `/conditions-pour-toucher-le-chomage`
- `/indemnite-rupture-et-chomage`
- `/rupture-conventionnelle-et-allocation-chomage`

Page outil centrale :
- `/simulateur-chomage-rupture-conventionnelle`

## Maillage interne

Flux principal :
1. Salaire brut/net vers rupture conventionnelle.
2. Rupture conventionnelle vers chomage ARE.
3. Pages chomage vers simulateur ARE.
4. Simulateur ARE vers pages complementaires : calcul, delai, premier paiement, demission, rupture conventionnelle et allocation.

Ancres prioritaires :
- Simulateur chomage ARE
- Lancer le simulateur ARE
- Calcul allocation chomage
- Combien vais-je toucher au chomage
- Delai de carence chomage
- Premier paiement France Travail
- Rupture conventionnelle et allocation chomage

## Corrections UX/UI appliquees

- Ajout d'un bloc "A retenir" propre a chaque intention de page.
- Remplacement du tableau genericise par des tableaux contextualises :
  - calcul ARE : salaire brut, SJR, formules, montant mensuel, variables sensibles ;
  - delai/paiement : attente 7 jours, conges payes, differes, paiement a terme echu ;
  - demission : absence de droit automatique, exceptions, reexamen ;
  - cadre : variables, degressivite, indemnite negociee ;
  - senior : seuils d'age, duree, retraite ;
  - actualisation : declaration mensuelle, paiement, trop-percu ;
  - rupture conventionnelle : indemnite minimale, part supra-legale et calendrier.
- Les exemples de salaire restent presents uniquement lorsque la question du montant est centrale.
- Les parcours visuels sont differencies selon la page au lieu d'un schema identique partout.
- Ajout d'un CTA intermediaire "Etape suivante" dans le corps de page pour renforcer le CTR vers l'action utile.

## Corrections simulateur appliquees

- Ajout d'un encart de prudence en haut du simulateur : estimation, France Travail, absence de conseil juridique personnalise.
- Labels de champs rendus plus explicites : jours/heures retenus ou estimes, date reelle de fin de contrat, part supra-legale, conges payes non pris.
- Aides de champ renforcees sur les sujets sensibles : SJR, part supra-legale, conges payes, premiere ouverture.
- Ajout d'un avertissement specifique lorsque l'utilisateur choisit une demission classique.
- Ajout de CTA post-resultat vers le delai de carence et la page rupture conventionnelle + allocation chomage.

## Corrections wording appliquees

- Suppression des formulations trop generiques dans les blocs structurants.
- Renforcement du ton RH/juridique : phrases plus directes, prudence explicite, action concrete.
- FAQ enrichie avec des questions specifiques pour delai, demission, cadre, senior, actualisation et premier paiement.
- Erreurs frequentes contextualisees pour eviter la repetition artificielle.

## Cannibalisation

Slugs rediriges vers les pages canoniques :
- `/chomage` vers `/chomage-are`
- `/calcul-chomage` vers `/calcul-allocation-chomage`
- `/delai-carence-chomage` vers `/delai-de-carence-chomage`
- `/cumul-salaire-et-chomage` vers `/cumul-are-salaire`
- `/chomage-apres-cdd` vers `/chomage-fin-cdd`
- `/rupture-conventionnelle-et-are` vers `/rupture-conventionnelle-et-allocation-chomage`
- `/comment-est-calcule-le-sjr` vers `/comment-est-calculee-l-are`

## Featured snippets vises

- Formule de calcul de l'ARE.
- Delai d'attente de 7 jours.
- Differes congés payes et specifique.
- Duree maximale selon age.
- Premier paiement France Travail.
- Chomage apres rupture conventionnelle.
- Chomage apres demission.

## Potentiel SEO

Potentiel estime : eleve, car les requetes "simulateur chomage", "calcul allocation chomage", "combien vais-je toucher au chomage" et "delai de carence chomage" combinent volume, urgence utilisateur et intention outil.

Gains attendus :
- Hausse du trafic informationnel qualifie sur le cluster chomage.
- Plus de clics vers le simulateur ARE depuis pages satellites.
- Meilleure comprehension Google du positionnement plateforme RH.
- Renforcement des passerelles salaire, rupture conventionnelle et chomage.

Indicateurs a suivre :
- Impressions et CTR des pages ROI dans Google Search Console.
- Nombre de pages du cluster indexees.
- Clics internes vers `/simulateur-chomage-rupture-conventionnelle`.
- Requetes "simulateur ARE", "calcul allocation chomage", "premier paiement France Travail".
- Eventuelles cannibalisations residuelles entre pages montant, calcul et simulateur.
