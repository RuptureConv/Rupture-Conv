# Production

## Variables

- `NEXT_PUBLIC_SITE_URL` : URL canonique du site, par défaut `https://rupture-conv.fr`.
- `NEXT_PUBLIC_ENABLE_ADSENSE` : `false` par défaut, `true` uniquement quand le compte AdSense est validé.
- `NEXT_PUBLIC_ADSENSE_CLIENT` : client AdSense réel au format `ca-pub-...`.
- `NEXT_PUBLIC_ADSENSE_SLOT_TOP`, `NEXT_PUBLIC_ADSENSE_SLOT_BEFORE_SIMULATOR`, `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`, `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT`, `NEXT_PUBLIC_ADSENSE_SLOT_AFTER_RESULT`, `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER` : slots réels fournis par AdSense.

`NEXT_PUBLIC_SITE_URL` est centralisé dans `lib/site.ts` et alimente les métadonnées, `robots.txt` et `sitemap.xml`.

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
