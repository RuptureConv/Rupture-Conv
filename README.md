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
| `NEXT_PUBLIC_ADS_ENABLED` | Non | `false` | Drapeau général. Seule la valeur exacte `true` autorise la préparation publicitaire. |
| `NEXT_PUBLIC_ADS_PROVIDER` | Non | `none` | Fournisseur publicitaire. La seule autre valeur reconnue est `adsense`. |
| `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` | Non | `ca-pub-xxxxxxxxxxxxxxxx` | Client AdSense réel. Aucun identifiant n’est fourni par défaut. |
| `NEXT_PUBLIC_ADS_TEST_MODE` | Non | `false` | Affiche les emplacements de test uniquement hors production, sans charger AdSense. |
| `NEXT_PUBLIC_ADS_SLOT_GUIDE_AFTER_CONTENT` | Non | `1234567890` | Emplacement discret après le contenu d’un guide. |
| `NEXT_PUBLIC_ADS_SLOT_ARTICLE_BOTTOM` | Non | `1234567890` | Emplacement en bas d’un article éditorial. |

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
9. Conserver `NEXT_PUBLIC_ADS_ENABLED=false` tant qu’AdSense et un CMP conforme ne sont pas prêts.
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

Les emplacements publicitaires passent par `components/ads/AdSlot.tsx` et leur
configuration par `lib/ads.ts`.

Ne pas activer AdSense avant validation du compte et mise en place d’un CMP
conforme. La configuration seule ne charge aucun script : un consentement
publicitaire explicite doit également être transmis au composant.

1. Installer et vérifier un CMP compatible avec les exigences Google dans l’EEE.
2. Relier son état de consentement à `AdSenseScript` et aux `AdSlot`.
3. Renseigner `NEXT_PUBLIC_ADS_ENABLED=true`, `NEXT_PUBLIC_ADS_PROVIDER=adsense`, le client et les deux slots autorisés.
4. Ajouter `public/ads.txt` uniquement avec la ligne fournie par Google.

Le détail des garde-fous et emplacements autorisés est dans
`docs/ads-monetization.md`.

## Notes produit

- La logique métier du simulateur est isolée dans `lib/calculators/rupture-conventionnelle.ts`.
- Les pages et disclaimers rappellent que la simulation est indicative.
- Le site ne fournit pas de conseil juridique personnalisé.
