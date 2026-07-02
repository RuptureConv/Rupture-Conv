# Audit SEO technique

## Périmètre vérifié

- domaine canonique, `metadataBase`, canonical et Open Graph ;
- sitemap, robots.txt, routes statiques et routes dynamiques ;
- pages prioritaires : simulateurs rupture et ARE, salaire brut-net, hubs rupture et chômage, carence, lettre et préavis ;
- métadonnées des datasets rupture, salaire, chômage, comparatifs et blog ;
- JSON-LD `WebSite`, `Organization`, `WebApplication`, `Article`, `BreadcrumbList` et `FAQPage` ;
- liens crawlables du header, du footer, des hubs et des blocs post-simulation ;
- comportement des slugs inconnus et des outils annoncés mais sans contenu.

## Décisions prises

- Le domaine SEO est fixé à `https://www.rupture-conv.fr`, y compris si une variable d'environnement est mal configurée.
- Le sitemap contient uniquement des URL canoniques et dédupliquées. Les dates, fréquences et priorités artificielles ont été retirées.
- `/outils/conges-payes` reste accessible pour préserver la route, mais il est exclu du sitemap et déclaré `noindex,follow` tant qu'il ne contient pas de guide réel.
- Le titre de l'accueil et celui de la page simulateur sont désormais distincts. La description de l'accueil parle d'estimation indicative et ne promet plus une conformité absolue.
- Les trois calculateurs utilisent un JSON-LD `WebApplication` minimal : nom, URL, description, catégorie, environnement Web et accès gratuit.
- Les dates `Article` sans source éditoriale maintenue ont été retirées. Les dates conservées correspondent à une date visible ou à une donnée de contenu existante.
- `robots.ts` n'a pas été modifié : il autorise les pages publiques et référence le sitemap canonique.

## Données structurées volontairement évitées

- `Review`, `AggregateRating`, `Product` et `Offer` : aucun avis, note ou offre commerciale correspondante n'est affiché.
- `HowTo` : aucun nouveau balisage n'est ajouté sans procédure visible répondant réellement à ce format.
- `SearchAction` : le site ne propose pas de recherche interne publique.
- Les `FAQPage` existantes sont conservées uniquement sur les pages qui rendent les mêmes questions et réponses à l'écran. Aucun nouveau balisage FAQ n'a été ajouté.

## Crawl et indexation

Les pages prioritaires sont reliées depuis la navigation, les hubs éditoriaux, le footer ou les blocs après simulation. Aucune page prioritaire orpheline n'a été détectée. Les slugs dynamiques inconnus déclenchent une 404 via Next.js ; aucune page 404 éditoriale supplémentaire n'est nécessaire.

## Vérifications Search Console

1. Soumettre à nouveau `/sitemap.xml` et vérifier que l'URL d'outil exclue disparaît après retraitement.
2. Inspecter l'accueil et les trois outils pour confirmer canonical sélectionnée et rendu des JSON-LD.
3. Contrôler les rapports « Pages » pour les URL dupliquées, explorées mais non indexées et les soft 404.
4. Tester quelques pages avec le test des résultats enrichis, sans chercher à obtenir artificiellement un type de résultat non pertinent.
5. Vérifier côté hébergeur que HTTP et le domaine sans `www` redirigent en une étape vers le domaine canonique HTTPS.

## Limites et suite

Les redirections de protocole et d'hôte dépendent de l'hébergement et ne sont pas forcées dans Next.js. Le prochain sprint devrait partir des données Search Console réelles : couverture, canonical choisies par Google, requêtes et pages durablement non indexées, avant toute nouvelle modification de contenu.
