# rupture-conv.fr

Application Next.js du site `rupture-conv.fr`, avec simulateur indicatif d'indemnité de rupture conventionnelle, contenus SEO, pages légales et intégration publicitaire.

## Stack

- Next.js App Router
- React
- TypeScript strict
- Tailwind CSS
- Vitest
- ESLint

Le projet est compatible Vercel sans configuration spéciale : Vercel détecte Next.js, installe les dépendances avec `npm install` puis exécute `npm run build`.

## Scripts

```bash
npm run dev
npm run lint
npm run test
npm run test:e2e
npm run build
npm run start
```

## QA Playwright

La QA e2e couvre les parcours outils principaux : rupture conventionnelle vers ARE, ARE vers délai de carence, salaire brut-net vers rupture conventionnelle, et le header mobile.

```bash
npm run dev
npm run test:e2e
```

Les tests utilisent `http://127.0.0.1:3000`. Le serveur local doit donc être lancé avant `npm run test:e2e`.
Sur une machine fraîche, installez d'abord Chromium avec :

```bash
npm run test:e2e:install
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` en local si nécessaire.

| Variable | Obligatoire | Exemple | Usage |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_GTM_ID` | Non | `GTM-P9XX929G` | Conteneur Google Tag Manager chargé globalement. Le conteneur fourni est utilisé par défaut. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Non | `G-HDDQ9CV6YQ` | Balise Google Analytics 4 chargée globalement sur toutes les pages. |
| `NEXT_PUBLIC_ENABLE_ADSENSE` | Non | `false` | Active le chargement réel du script AdSense uniquement quand le compte est validé. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Non | `ca-pub-xxxxxxxxxxxxxxxx` | Client AdSense réel. Laisser vide tant que le compte n'est pas validé. |
| `NEXT_PUBLIC_ADSENSE_SLOT_TOP` | Non | `1234567890` | Slot AdSense pour le leaderboard haut. |
| `NEXT_PUBLIC_ADSENSE_SLOT_BEFORE_SIMULATOR` | Non | `1234567890` | Slot AdSense avant le simulateur. |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Non | `1234567890` | Slot AdSense sidebar desktop. |
| `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT` | Non | `1234567890` | Slot AdSense contenu. |
| `NEXT_PUBLIC_ADSENSE_SLOT_AFTER_RESULT` | Non | `1234567890` | Slot AdSense après résultat. |
| `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER` | Non | `1234567890` | Slot AdSense footer. |

Le domaine canonique utilisé par les métadonnées, `robots.txt` et le sitemap est
fixé à `https://www.rupture-conv.fr`.

## Routes techniques

Ces routes sont générées par Next.js :

- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/icon.svg`

Le sitemap inclut la page d'accueil, les pages légales et les pages d'outils RH planifiées.

## Checklist de déploiement Vercel

1. Vérifier que la branche à déployer contient un `package-lock.json` à jour.
2. Lancer localement :

```bash
npm run lint
npm run test
npm run build
```

3. Créer ou importer le projet dans Vercel.
4. Framework preset : `Next.js`.
5. Build command : `npm run build`.
6. Install command : `npm install`.
7. Output directory : laisser vide, Vercel gère `.next`.
8. Vérifier `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-HDDQ9CV6YQ`.
9. Mettre `NEXT_PUBLIC_ENABLE_ADSENSE=false` tant que Google AdSense n'est pas validé.
10. Déployer.
11. Vérifier après déploiement :

```bash
curl -I https://www.rupture-conv.fr
curl https://www.rupture-conv.fr/robots.txt
curl https://www.rupture-conv.fr/sitemap.xml
curl https://www.rupture-conv.fr/manifest.webmanifest
```

## Connecter le domaine rupture-conv.fr sur Vercel

1. Dans Vercel, ouvrir le projet.
2. Aller dans `Settings` -> `Domains`.
3. Ajouter `rupture-conv.fr`.
4. Ajouter aussi `www.rupture-conv.fr` si le sous-domaine doit rediriger vers le domaine racine.
5. Chez le registrar DNS, configurer :
   - apex `rupture-conv.fr` avec un enregistrement `A` vers `76.76.21.21`;
   - `www` avec un `CNAME` vers `cname.vercel-dns.com`.
6. Attendre la propagation DNS.
7. Dans Vercel, vérifier que le certificat SSL est provisionné.
8. Définir `www.rupture-conv.fr` comme domaine principal dans Vercel.
9. Verifier que `https://rupture-conv.fr`, `https://www.rupture-conv.fr`, `/robots.txt`, `/sitemap.xml` et `/manifest.webmanifest` repondent correctement.

## AdSense

Les emplacements publicitaires passent par `components/AdSlot.tsx`.

Ne pas intégrer AdSense avant validation du compte et clarification du consentement. Quand ce sera prêt :

1. Renseigner `NEXT_PUBLIC_ENABLE_ADSENSE=true`, `NEXT_PUBLIC_ADSENSE_CLIENT` et les slots `NEXT_PUBLIC_ADSENSE_SLOT_*`.
2. Le script AdSense est déjà conditionnel dans le layout ; vérifier la gestion du consentement requise.
3. Renseigner les vrais slots pour remplacer les placeholders par des annonces réelles.
4. Ajouter `public/ads.txt` avec la ligne fournie par Google.

## Notes produit

- La logique métier du simulateur est isolée dans `lib/calculators/rupture-conventionnelle.ts`.
- Les pages et disclaimers rappellent que la simulation est indicative.
- Le site ne fournit pas de conseil juridique personnalisé.
