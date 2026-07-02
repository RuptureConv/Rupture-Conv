# Préparation de la monétisation publicitaire

## État actuel

La publicité est désactivée par défaut. Aucun identifiant AdSense de repli n’est
présent et aucun espace vide n’est rendu lorsque la configuration est inactive.
Le script reste également bloqué tant qu’un consentement publicitaire explicite
n’est pas fourni par un CMP.

## Emplacements autorisés

- `guide_after_content` : après le contenu principal d’un guide ;
- `article_bottom` : en bas d’un article éditorial.

Sont volontairement exclus : formulaires, simulateurs, résultats, blocs de
confiance, liens post-simulation, actions du modèle de lettre, haut de page et
insertions au milieu d’une démonstration ou d’une procédure.

Les composants historiques du dossier `components/monetization` ne sont pas des
annonces : ils présentent uniquement des liens éditoriaux internes, sans lien
affilié ni rémunération déclarée. Ils restent séparés de cette architecture.

## Garde-fous

Le chargement réel exige simultanément :

1. `NEXT_PUBLIC_ADS_ENABLED=true` ;
2. `NEXT_PUBLIC_ADS_PROVIDER=adsense` ;
3. un client `ca-pub-...` valide ;
4. un identifiant numérique pour l’emplacement ;
5. un consentement publicitaire explicite fourni à `AdSenseScript` et `AdSlot`.

Le mode test n’affiche qu’un aperçu visuel hors production. Il ne charge aucun
script publicitaire.

## CMP et exigences Google

Aucun CMP n’a été improvisé dans ce sprint. Avant toute activation dans l’Espace
économique européen, installer une CMP conforme aux exigences Google, vérifier
les parcours accepter/refuser/retirer, puis relier son état de consentement aux
deux composants publicitaires. En l’absence de ce branchement, laisser la
publicité désactivée.

## Checklist avant activation

- compte AdSense validé et domaine correct ;
- CMP déployée et testée sur mobile et ordinateur ;
- refus aussi simple que l’acceptation ;
- aucun appel AdSense avant consentement ;
- deux emplacements maximum, lisibles et clairement marqués « Publicité » ;
- aucun déplacement de contenu gênant ;
- `ads.txt` copié depuis AdSense, sans valeur inventée ;
- politiques cookies et confidentialité relues ;
- tests, build et scénarios navigateur validés.

## Quand envisager l’activation

Il n’existe pas de seuil de trafic universel qui justifie à lui seul la
publicité. Attendre au minimum un trafic éditorial stable sur quatre semaines,
mesurer une référence Core Web Vitals et vérifier que les guides concernés sont
réellement consultés. Commencer ensuite avec un seul emplacement, comparer les
signaux UX et les performances, puis conserver le second uniquement s’il ne
dégrade pas la lecture. Les pages outils restent exclues, quel que soit le
trafic.

## Réversibilité

Pour couper immédiatement la publicité, définir `NEXT_PUBLIC_ADS_ENABLED=false`
ou `NEXT_PUBLIC_ADS_PROVIDER=none`, puis redéployer. Les composants retournent
alors `null` et ne laissent aucun emplacement vide.
