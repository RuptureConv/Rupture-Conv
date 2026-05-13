import type { BlogPost, PillarPage } from "@/lib/seo-content";
import type { ProgrammaticSeoParams } from "@/lib/seo-helpers";
import type { ToolContent } from "@/lib/tools-content";

export type SeoSnippet = {
  title: string;
  description: string;
};

export const homeSeoSnippet: SeoSnippet = {
  title: "Simulateur gratuit de rupture conventionnelle 2026",
  description:
    "Calculez votre indemnité de rupture conventionnelle gratuitement, rapidement et sans inscription, avec une estimation conforme au droit du travail français."
};

export const blogIndexSeoSnippet: SeoSnippet = {
  title: "Blog rupture conventionnelle : guides pratiques 2026",
  description:
    "Guides pratiques 2026 sur rupture conventionnelle, indemnités, chômage, préavis, négociation et modèles, avec accès au simulateur gratuit."
};

const pillarSeoSnippets: Record<string, SeoSnippet> = {
  "simulateur-rupture-conventionnelle": {
    title: "Simulateur gratuit de rupture conventionnelle 2026",
    description:
      "Estimez votre indemnité de rupture conventionnelle en quelques minutes, gratuitement et sans inscription, selon le droit du travail français."
  },
  "calcul-indemnite-rupture-conventionnelle": {
    title: "Calcul de l’indemnité de rupture conventionnelle",
    description:
      "Comprenez le calcul de votre indemnité de rupture conventionnelle : ancienneté, salaire de référence, minimum légal et estimation rapide."
  },
  "indemnite-legale-rupture-conventionnelle": {
    title: "Indemnité légale de rupture conventionnelle : calcul 2026",
    description:
      "Vérifiez le minimum légal de votre indemnité de rupture conventionnelle en 2026 avec formule, exemples et simulateur gratuit."
  },
  "rupture-conventionnelle-cdi": {
    title: "Rupture conventionnelle CDI : procédure et indemnité",
    description:
      "Découvrez les étapes d’une rupture conventionnelle en CDI, le calcul de l’indemnité, les délais et les points à vérifier avant signature."
  },
  "licenciement-indemnite": {
    title: "Indemnité de licenciement : calcul et comparaison",
    description:
      "Comparez indemnité de licenciement et rupture conventionnelle avec une lecture claire des bases de calcul, droits et points de vigilance."
  },
  "outils-rh": {
    title: "Outils RH gratuits pour salariés et employeurs",
    description:
      "Accédez à des outils RH gratuits pour estimer, comparer et préparer vos démarches liées au travail, au contrat et à la rupture du CDI."
  },
  "calcul-rupture-conventionnelle-cdi-anciennete": {
    title: "Calcul de rupture conventionnelle selon l’ancienneté",
    description:
      "Estimez l’impact de l’ancienneté sur votre indemnité de rupture conventionnelle, avec une méthode claire et des exemples pratiques."
  },
  "calcul-indemnite-rupture-conventionnelle-net": {
    title: "Calcul indemnité rupture conventionnelle nette 2026",
    description:
      "Calculez gratuitement votre indemnité de rupture conventionnelle nette ou brute en 2026, rapidement et sans inscription."
  },
  "simulateur-indemnite-rupture-conventionnelle-net": {
    title: "Simulateur d’indemnité nette de rupture conventionnelle",
    description:
      "Obtenez une estimation nette indicative de votre indemnité de rupture conventionnelle, gratuitement, rapidement et sans inscription."
  },
  "indemnite-rupture-conventionnelle-anciennete-10-ans": {
    title: "Indemnité rupture conventionnelle après 10 ans : exemple",
    description:
      "Calculez votre indemnité après 10 ans d’ancienneté avec exemple 2026, salaire brut, minimum légal et simulateur gratuit."
  },
  "calcul-indemnite-cadre": {
    title: "Calcul de l’indemnité pour cadre en rupture conventionnelle",
    description:
      "Estimez l’indemnité d’un salarié cadre en rupture conventionnelle avec les bons repères : salaire, ancienneté et part variable."
  },
  "calcul-indemnite-non-cadre": {
    title: "Calcul de l’indemnité pour non-cadre",
    description:
      "Calculez l’indemnité de rupture conventionnelle d’un salarié non-cadre avec une méthode simple, rapide et conforme au droit français."
  },
  "modele-lettre-rupture-conventionnelle": {
    title: "Modèle de lettre de rupture conventionnelle gratuit à copier",
    description:
      "Copiez un modèle gratuit de lettre de rupture conventionnelle CDI, avec variante email, conseils prudents et calcul avant négociation."
  },
  "rupture-conventionnelle-chomage": {
    title: "Rupture conventionnelle et chômage : vos droits",
    description:
      "Comprenez vos droits au chômage après une rupture conventionnelle, les démarches France Travail et l’impact de l’indemnité."
  },
  "negocier-rupture-conventionnelle": {
    title: "Négocier une rupture conventionnelle : méthode claire",
    description:
      "Préparez votre négociation avec une méthode professionnelle : minimum légal, arguments, calendrier et fourchette d’indemnité."
  },
  "a-propos": {
    title: "RuptureConv : simuler et comprendre votre indemnité",
    description:
      "Découvrez la mission de RuptureConv : rendre le calcul de rupture conventionnelle plus clair, rapide et accessible aux salariés comme aux employeurs."
  },
  "sources-juridiques": {
    title: "Sources juridiques du calcul de rupture conventionnelle",
    description:
      "Consultez les références utiles pour comprendre le calcul de l’indemnité : Code du travail, convention collective et limites d’une simulation."
  }
};

const blogSeoSnippets: Record<string, SeoSnippet> = {
  "comment-calculer-une-rupture-conventionnelle-facilement": {
    title: "Calculer une rupture conventionnelle facilement",
    description:
      "Suivez une méthode simple pour calculer une rupture conventionnelle avec les bonnes dates, le bon salaire et les vérifications essentielles."
  },
  "indemnite-rupture-conventionnelle-anciennete-10-ans": {
    title: "Indemnité de rupture conventionnelle après 10 ans",
    description:
      "Découvrez comment calculer l’indemnité après 10 ans d’ancienneté, avec exemple chiffré, seuil légal et points à vérifier."
  },
  "rupture-conventionnelle-ou-licenciement-que-choisir": {
    title: "Rupture conventionnelle ou licenciement : comparer",
    description:
      "Comparez rupture conventionnelle et licenciement : indemnité, droits au chômage, procédure et points de vigilance avant de choisir."
  },
  "delai-rupture-conventionnelle-combien-de-temps": {
    title: "Délai de rupture conventionnelle : combien de temps ?",
    description:
      "Comprenez les délais d’une rupture conventionnelle : signature, rétractation, homologation et date réelle de fin du CDI."
  },
  "montant-minimum-rupture-conventionnelle": {
    title: "Montant minimum d’une rupture conventionnelle",
    description:
      "Vérifiez le montant minimum d’une rupture conventionnelle selon l’ancienneté, le salaire de référence et la règle légale."
  },
  "rupture-conventionnelle-cadre-indemnite": {
    title: "Rupture conventionnelle cadre : quelle indemnité ?",
    description:
      "Calculez l’indemnité d’un cadre en rupture conventionnelle et identifiez les points clés : salaire variable, ancienneté et négociation."
  },
  "calcul-indemnite-brut-ou-net": {
    title: "Indemnité de rupture conventionnelle : brut ou net ?",
    description:
      "Comprenez pourquoi le calcul part du brut, comment lire le net indicatif et ce qui peut modifier le montant réellement perçu."
  },
  "rupture-conventionnelle-refus-employeur-que-faire": {
    title: "Rupture conventionnelle refusée : que faire ?",
    description:
      "Découvrez pourquoi un employeur peut refuser une rupture conventionnelle et comment préparer une nouvelle discussion professionnelle."
  },
  "rupture-conventionnelle-chomage-conditions": {
    title: "Rupture conventionnelle et chômage : conditions",
    description:
      "Faites le point sur les conditions d’accès au chômage après une rupture conventionnelle et les délais qui peuvent s’appliquer."
  },
  "simulateur-indemnite-licenciement-vs-rupture": {
    title: "Indemnité licenciement ou rupture : comparateur",
    description:
      "Comparez les bases de calcul entre indemnité de licenciement et rupture conventionnelle pour mieux comprendre votre situation."
  },
  "rupture-conventionnelle-avantage-et-inconvenients": {
    title: "Rupture conventionnelle : avantages et inconvénients",
    description:
      "Analysez les avantages et limites d’une rupture conventionnelle pour salarié et employeur avant d’engager la discussion."
  },
  "rupture-conventionnelle-salaire-eleve-calcul": {
    title: "Rupture conventionnelle avec salaire élevé : calcul",
    description:
      "Comprenez le calcul d’une rupture conventionnelle avec salaire élevé, primes, variables et points de vigilance sur le net."
  },
  "fiscalite-indemnite-rupture-conventionnelle": {
    title: "Fiscalité de l’indemnité de rupture conventionnelle",
    description:
      "Comprenez les grands principes fiscaux et sociaux de l’indemnité de rupture conventionnelle, notamment en cas de part supra-légale."
  },
  "rupture-conventionnelle-fonction-publique-possible": {
    title: "Rupture conventionnelle dans la fonction publique",
    description:
      "Vérifiez dans quels cas une rupture conventionnelle peut concerner la fonction publique et pourquoi le statut change l’analyse."
  },
  "rupture-conventionnelle-cdi-conditions": {
    title: "Rupture conventionnelle CDI : conditions à respecter",
    description:
      "Retrouvez les conditions essentielles d’une rupture conventionnelle en CDI : accord libre, indemnité minimale et homologation."
  },
  "indemnite-supra-legale-explication": {
    title: "Indemnité supra-légale : définition et calcul",
    description:
      "Comprenez l’indemnité supra-légale en rupture conventionnelle, son rôle dans la négociation et ses effets possibles."
  },
  "rupture-conventionnelle-et-conges-payes": {
    title: "Rupture conventionnelle et congés payés",
    description:
      "Comprenez le traitement des congés payés lors d’une rupture conventionnelle et leur différence avec l’indemnité spécifique."
  },
  "rupture-conventionnelle-et-preavis": {
    title: "Rupture conventionnelle et préavis : règles, délais et calcul",
    description:
      "Comprenez les règles 2026 : pas de préavis classique, date de rupture, délais d’homologation et calcul de l’indemnité."
  },
  "calcul-indemnite-rupture-conventionnelle-exemple": {
    title: "Exemples de calcul d’indemnité de rupture conventionnelle",
    description:
      "Consultez des exemples concrets de calcul d’indemnité selon l’ancienneté et le salaire brut pour mieux préparer votre estimation."
  },
  "erreur-calcul-indemnite-rupture-conventionnelle": {
    title: "Erreurs à éviter dans le calcul de l’indemnité",
    description:
      "Identifiez les erreurs fréquentes de calcul : ancienneté, salaire de référence, primes, convention collective et brut/net."
  }
};

const toolSeoSnippets: Record<string, SeoSnippet> = {
  "cout-employeur": {
    title: "Coût employeur d’une rupture conventionnelle",
    description:
      "Estimez le coût employeur d’une rupture conventionnelle : indemnité, salaire restant, congés payés, budget et vigilance RH."
  },
  preavis: {
    title: "Préavis et rupture conventionnelle : dates et délais",
    description:
      "Comprenez les délais d’une rupture conventionnelle, la date de départ et les étapes à respecter avant la fin du contrat."
  },
  licenciement: {
    title: "Indemnité licenciement et rupture conventionnelle",
    description:
      "Comparez indemnité de licenciement et rupture conventionnelle avec une lecture claire des bases de calcul et des droits."
  }
};

function toFrenchSentenceTitle(value: string): string {
  const normalized = value
    .replace(/\s+/g, " ")
    .trim();
  const sentence = normalized.toLocaleLowerCase("fr-FR");

  return sentence
    .replace(/^[^\p{L}]*\p{L}/u, (match) => match.toLocaleUpperCase("fr-FR"))
    .replace(/\bcdi\b/giu, "CDI")
    .replace(/\brh\b/giu, "RH")
    .replace(/\bare\b/giu, "ARE")
    .replace(/\bfaq\b/giu, "FAQ")
    .replace(/\bfrance travail\b/giu, "France Travail")
    .replace(/\bruptureconv\b/giu, "RuptureConv");
}

export function buildCtrTitle(title: string): string {
  return toFrenchSentenceTitle(title.replace(/\s+\|\s+RuptureConv\.?$/i, ""));
}

export function getPillarSeoSnippet(
  page: PillarPage,
  programmaticParams?: ProgrammaticSeoParams | null
): SeoSnippet {
  if (programmaticParams?.type === "anciennete") {
    const yearsLabel = `${programmaticParams.value} ${
      programmaticParams.value === 1 ? "an" : "ans"
    }`;

    return {
      title: `Indemnité rupture conventionnelle après ${yearsLabel} : calcul gratuit 2026`,
      description: `Estimez l’indemnité de rupture conventionnelle pour ${yearsLabel} d’ancienneté avec exemple chiffré, calcul gratuit 2026 et simulateur.`
    };
  }

  if (programmaticParams?.type === "salaire") {
    return {
      title: `Indemnité de rupture conventionnelle : salaire ${programmaticParams.value}€`,
      description: `Calculez l’indemnité de rupture conventionnelle pour un salaire de ${programmaticParams.value}€ avec une estimation gratuite, rapide et sans inscription.`
    };
  }

  return (
    pillarSeoSnippets[page.slug] ?? {
      title: buildCtrTitle(page.title || page.h1),
      description: page.description
    }
  );
}

export function getBlogSeoSnippet(post: BlogPost): SeoSnippet {
  return (
    blogSeoSnippets[post.slug] ?? {
      title: buildCtrTitle(post.title),
      description: post.description
    }
  );
}

export function getToolSeoSnippet(
  slug: string,
  content?: ToolContent,
  fallback?: SeoSnippet
): SeoSnippet {
  return (
    toolSeoSnippets[slug] ??
    (content
      ? {
          title: buildCtrTitle(content.metaTitle),
          description: content.metaDescription
        }
      : fallback ?? {
          title: "Outil RH gratuit",
          description:
            "Préparez vos démarches RH avec un guide clair, accessible et pensé pour les salariés comme les employeurs."
        })
  );
}
