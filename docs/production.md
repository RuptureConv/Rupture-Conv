# Production

## Variables

- `NEXT_PUBLIC_GTM_ID` : identifiant Google Tag Manager au format `GTM-...`, par défaut `GTM-P9XX929G`.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` : identifiant Google Analytics 4 au format `G-...`, par défaut `G-HDDQ9CV6YQ`.
- `NEXT_PUBLIC_ADS_ENABLED` : `false` par défaut.
- `NEXT_PUBLIC_ADS_PROVIDER` : `none` par défaut, `adsense` uniquement après validation.
- `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` : client AdSense réel au format `ca-pub-...`, vide par défaut.
- `NEXT_PUBLIC_ADS_TEST_MODE` : aperçu local des emplacements, automatiquement neutralisé en production.
- `NEXT_PUBLIC_ADS_SLOT_GUIDE_AFTER_CONTENT`, `NEXT_PUBLIC_ADS_SLOT_ARTICLE_BOTTOM` : seuls slots autorisés.

Le domaine canonique est centralisé dans `lib/site.ts` et alimente les métadonnées, `robots.txt` et `sitemap.xml`.

## Google Tag Manager

Le script GTM est chargé une seule fois, le plus haut possible dans le `<head>` global, via `components/GoogleTagManager.tsx`.
Le fallback `<noscript>` est placé juste après l'ouverture du `<body>`.
Il couvre toutes les pages App Router et pousse un événement `next_page_view` lors des changements de route côté client.
Les événements du simulateur passent par `lib/analytics.ts`.

## Google Analytics 4

La balise GA4 `G-HDDQ9CV6YQ` est chargée globalement via `components/GoogleAnalytics.tsx`.
Elle couvre toutes les pages App Router et reçoit aussi les événements personnalisés du simulateur quand `gtag` est disponible.

## AdSense

Les emplacements publicitaires sont portés par `components/ads/AdSlot.tsx`.
Même avec une configuration complète, le script et les annonces restent bloqués
tant qu’un consentement publicitaire explicite n’est pas transmis.

1. Installer et vérifier un CMP conforme avant toute activation dans l’EEE.
2. Relier le consentement à `AdSenseScript` et aux `AdSlot`.
3. Activer les variables listées ci-dessus avec les identifiants fournis par Google.
4. Ajouter un `ads.txt` public uniquement avec la ligne fournie par Google.

Voir `docs/ads-monetization.md` pour la checklist complète.

## Vérification avant déploiement

Exécuter :

```bash
npm run lint
npm run test
npm run build
```
