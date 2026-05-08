# Production

## Variables

- `NEXT_PUBLIC_SITE_URL` : URL canonique du site, par défaut `https://rupture-conv.fr`.
- `NEXT_PUBLIC_GTM_ID` : identifiant Google Tag Manager au format `GTM-...`, par défaut `GTM-P9XX929G`.
- `NEXT_PUBLIC_ENABLE_ADSENSE` : `false` par défaut, `true` uniquement quand le compte AdSense est validé.
- `NEXT_PUBLIC_ADSENSE_CLIENT` : client AdSense réel au format `ca-pub-...`.
- `NEXT_PUBLIC_ADSENSE_SLOT_TOP`, `NEXT_PUBLIC_ADSENSE_SLOT_BEFORE_SIMULATOR`, `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`, `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT`, `NEXT_PUBLIC_ADSENSE_SLOT_AFTER_RESULT`, `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER` : slots réels fournis par AdSense.

`NEXT_PUBLIC_SITE_URL` est centralisé dans `lib/site.ts` et alimente les métadonnées, `robots.txt` et `sitemap.xml`.

## Google Tag Manager

Le script GTM est chargé une seule fois, le plus haut possible dans le `<head>` global, via `components/GoogleTagManager.tsx`.
Le fallback `<noscript>` est placé juste après l'ouverture du `<body>`.
Il couvre toutes les pages App Router et pousse un événement `next_page_view` lors des changements de route côté client.
Les événements du simulateur passent par `lib/analytics.ts`.

## AdSense

Les emplacements publicitaires sont portés par `components/AdSlot.tsx`.
Quand le compte AdSense sera validé :

1. Renseigner `NEXT_PUBLIC_ENABLE_ADSENSE=true`, `NEXT_PUBLIC_ADSENSE_CLIENT` et les slots `NEXT_PUBLIC_ADSENSE_SLOT_*`.
2. Le script AdSense est conditionnel dans le layout ; ajouter la gestion du consentement si nécessaire.
3. Renseigner les vrais slots `NEXT_PUBLIC_ADSENSE_SLOT_*`.
4. Ajouter un `ads.txt` public avec la ligne fournie par Google.

## Vérification avant déploiement

Exécuter :

```bash
npm run lint
npm run test
npm run build
```
