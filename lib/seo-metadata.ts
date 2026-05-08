import type { BlogPost, PillarPage } from "@/lib/seo-content";
import type { ProgrammaticSeoParams } from "@/lib/seo-helpers";
import type { ToolContent } from "@/lib/tools-content";

export type SeoSnippet = {
  title: string;
  description: string;
};

export const homeSeoSnippet: SeoSnippet = {
  title: "Simulateur Gratuit de Rupture Conventionnelle 2026",
  description:
    "Calculez votre indemnité de rupture conventionnelle gratuitement, rapidement et sans inscription, avec une estimation conforme au droit du travail français."
};

export const blogIndexSeoSnippet: SeoSnippet = {
  title: "Guides Rupture Conventionnelle et Indemnités",
  description:
    "Retrouvez des guides clairs pour calculer votre indemnité, préparer une rupture conventionnelle et comprendre vos droits en droit du travail français."
};

const pillarSeoSnippets: Record<string, SeoSnippet> = {
  "simulateur-rupture-conventionnelle": {
    title: "Simulateur Gratuit de Rupture Conventionnelle 2026",
    description:
      "Estimez votre indemnité de rupture conventionnelle en quelques minutes, gratuitement et sans inscription, selon le droit du travail français."
  },
  "calcul-indemnite-rupture-conventionnelle": {
    title: "Calcul de l’Indemnité de Rupture Conventionnelle",
    description:
      "Comprenez le calcul de votre indemnité de rupture conventionnelle : ancienneté, salaire de référence, minimum légal et estimation rapide."
  },
  "indemnite-legale-rupture-conventionnelle": {
    title: "Indemnité Légale de Rupture Conventionnelle",
    description:
      "Vérifiez le minimum légal de votre indemnité de rupture conventionnelle, avec formule, exemples et repères issus du droit du travail français."
  },
  "rupture-conventionnelle-cdi": {
    title: "Rupture Conventionnelle CDI : Procédure et Indemnité",
    description:
      "Découvrez les étapes d’une rupture conventionnelle en CDI, le calcul de l’indemnité, les délais et les points à vérifier avant signature."
  },
  "licenciement-indemnite": {
    title: "Indemnité de Licenciement : Calcul et Comparaison",
    description:
      "Comparez indemnité de licenciement et rupture conventionnelle avec une lecture claire des bases de calcul, droits et points de vigilance."
  },
  "outils-rh": {
    title: "Outils RH Gratuits pour Salariés et Employeurs",
    description:
      "Accédez à des outils RH gratuits pour estimer, comparer et préparer vos démarches liées au travail, au contrat et à la rupture du CDI."
  },
  "calcul-rupture-conventionnelle-cdi-anciennete": {
    title: "Calcul Rupture Conventionnelle selon l’Ancienneté",
    description:
      "Estimez l’impact de l’ancienneté sur votre indemnité de rupture conventionnelle, avec une méthode claire et des exemples pratiques."
  },
  "calcul-indemnite-rupture-conventionnelle-net": {
    title: "Indemnité de Rupture Conventionnelle : Brut ou Net ?",
    description:
      "Comprenez la différence entre indemnité brute et net indicatif pour mieux lire une proposition de rupture conventionnelle."
  },
  "simulateur-indemnite-rupture-conventionnelle-net": {
    title: "Simulateur d’Indemnité Nette de Rupture Conventionnelle",
    description:
      "Obtenez une estimation nette indicative de votre indemnité de rupture conventionnelle, gratuitement, rapidement et sans inscription."
  },
  "indemnite-rupture-conventionnelle-anciennete-10-ans": {
    title: "Indemnité de Rupture Conventionnelle avec 10 Ans",
    description:
      "Calculez votre indemnité avec 10 ans d’ancienneté et comprenez le rôle du salaire brut, du minimum légal et de la convention collective."
  },
  "calcul-indemnite-cadre": {
    title: "Calcul de l’Indemnité pour Cadre en Rupture Conventionnelle",
    description:
      "Estimez l’indemnité d’un salarié cadre en rupture conventionnelle avec les bons repères : salaire, ancienneté et part variable."
  },
  "calcul-indemnite-non-cadre": {
    title: "Calcul de l’Indemnité pour Non-Cadre",
    description:
      "Calculez l’indemnité de rupture conventionnelle d’un salarié non-cadre avec une méthode simple, rapide et conforme au droit français."
  },
  "modele-lettre-rupture-conventionnelle": {
    title: "Modèle de Lettre de Rupture Conventionnelle CDI",
    description:
      "Copiez un modèle de lettre de rupture conventionnelle clair et professionnel, avec variantes email et conseils avant l’envoi."
  },
  "rupture-conventionnelle-chomage": {
    title: "Rupture Conventionnelle et Chômage : Vos Droits",
    description:
      "Comprenez vos droits au chômage après une rupture conventionnelle, les démarches France Travail et l’impact de l’indemnité."
  },
  "negocier-rupture-conventionnelle": {
    title: "Négocier une Rupture Conventionnelle : Méthode Claire",
    description:
      "Préparez votre négociation avec une méthode professionnelle : minimum légal, arguments, calendrier et fourchette d’indemnité."
  },
  "a-propos": {
    title: "RuptureConv : Simuler et Comprendre Votre Indemnité",
    description:
      "Découvrez la mission de RuptureConv : rendre le calcul de rupture conventionnelle plus clair, rapide et accessible aux salariés comme aux employeurs."
  },
  "sources-juridiques": {
    title: "Sources Juridiques du Calcul de Rupture Conventionnelle",
    description:
      "Consultez les références utiles pour comprendre le calcul de l’indemnité : Code du travail, convention collective et limites d’une simulation."
  }
};

const blogSeoSnippets: Record<string, SeoSnippet> = {
  "comment-calculer-une-rupture-conventionnelle-facilement": {
    title: "Calculer une Rupture Conventionnelle Facilement",
    description:
      "Suivez une méthode simple pour calculer une rupture conventionnelle avec les bonnes dates, le bon salaire et les vérifications essentielles."
  },
  "indemnite-rupture-conventionnelle-anciennete-10-ans": {
    title: "Indemnité de Rupture Conventionnelle après 10 Ans",
    description:
      "Découvrez comment calculer l’indemnité après 10 ans d’ancienneté, avec exemple chiffré, seuil légal et points à vérifier."
  },
  "rupture-conventionnelle-ou-licenciement-que-choisir": {
    title: "Rupture Conventionnelle ou Licenciement : Comparer",
    description:
      "Comparez rupture conventionnelle et licenciement : indemnité, droits au chômage, procédure et points de vigilance avant de choisir."
  },
  "delai-rupture-conventionnelle-combien-de-temps": {
    title: "Délai de Rupture Conventionnelle : Combien de Temps ?",
    description:
      "Comprenez les délais d’une rupture conventionnelle : signature, rétractation, homologation et date réelle de fin du CDI."
  },
  "montant-minimum-rupture-conventionnelle": {
    title: "Montant Minimum d’une Rupture Conventionnelle",
    description:
      "Vérifiez le montant minimum d’une rupture conventionnelle selon l’ancienneté, le salaire de référence et la règle légale."
  },
  "rupture-conventionnelle-cadre-indemnite": {
    title: "Rupture Conventionnelle Cadre : Quelle Indemnité ?",
    description:
      "Calculez l’indemnité d’un cadre en rupture conventionnelle et identifiez les points clés : salaire variable, ancienneté et négociation."
  },
  "calcul-indemnite-brut-ou-net": {
    title: "Indemnité de Rupture Conventionnelle : Brut ou Net ?",
    description:
      "Comprenez pourquoi le calcul part du brut, comment lire le net indicatif et ce qui peut modifier le montant réellement perçu."
  },
  "rupture-conventionnelle-refus-employeur-que-faire": {
    title: "Rupture Conventionnelle Refusée : Que Faire ?",
    description:
      "Découvrez pourquoi un employeur peut refuser une rupture conventionnelle et comment préparer une nouvelle discussion professionnelle."
  },
  "rupture-conventionnelle-chomage-conditions": {
    title: "Rupture Conventionnelle et Chômage : Conditions",
    description:
      "Faites le point sur les conditions d’accès au chômage après une rupture conventionnelle et les délais qui peuvent s’appliquer."
  },
  "simulateur-indemnite-licenciement-vs-rupture": {
    title: "Indemnité Licenciement ou Rupture : Comparateur",
    description:
      "Comparez les bases de calcul entre indemnité de licenciement et rupture conventionnelle pour mieux comprendre votre situation."
  },
  "rupture-conventionnelle-avantage-et-inconvenients": {
    title: "Rupture Conventionnelle : Avantages et Inconvénients",
    description:
      "Analysez les avantages et limites d’une rupture conventionnelle pour salarié et employeur avant d’engager la discussion."
  },
  "rupture-conventionnelle-salaire-eleve-calcul": {
    title: "Rupture Conventionnelle avec Salaire Élevé : Calcul",
    description:
      "Comprenez le calcul d’une rupture conventionnelle avec salaire élevé, primes, variables et points de vigilance sur le net."
  },
  "fiscalite-indemnite-rupture-conventionnelle": {
    title: "Fiscalité de l’Indemnité de Rupture Conventionnelle",
    description:
      "Comprenez les grands principes fiscaux et sociaux de l’indemnité de rupture conventionnelle, notamment en cas de part supra-légale."
  },
  "rupture-conventionnelle-fonction-publique-possible": {
    title: "Rupture Conventionnelle dans la Fonction Publique",
    description:
      "Vérifiez dans quels cas une rupture conventionnelle peut concerner la fonction publique et pourquoi le statut change l’analyse."
  },
  "rupture-conventionnelle-cdi-conditions": {
    title: "Rupture Conventionnelle CDI : Conditions à Respecter",
    description:
      "Retrouvez les conditions essentielles d’une rupture conventionnelle en CDI : accord libre, indemnité minimale et homologation."
  },
  "indemnite-supra-legale-explication": {
    title: "Indemnité Supra-Légale : Définition et Calcul",
    description:
      "Comprenez l’indemnité supra-légale en rupture conventionnelle, son rôle dans la négociation et ses effets possibles."
  },
  "rupture-conventionnelle-et-conges-payes": {
    title: "Rupture Conventionnelle et Congés Payés",
    description:
      "Comprenez le traitement des congés payés lors d’une rupture conventionnelle et leur différence avec l’indemnité spécifique."
  },
  "rupture-conventionnelle-et-preavis": {
    title: "Rupture Conventionnelle et Préavis : Ce qu’il Faut Savoir",
    description:
      "Découvrez pourquoi la rupture conventionnelle ne fonctionne pas comme un préavis classique et comment fixer une date cohérente."
  },
  "calcul-indemnite-rupture-conventionnelle-exemple": {
    title: "Exemples de Calcul d’Indemnité de Rupture Conventionnelle",
    description:
      "Consultez des exemples concrets de calcul d’indemnité selon l’ancienneté et le salaire brut pour mieux préparer votre estimation."
  },
  "erreur-calcul-indemnite-rupture-conventionnelle": {
    title: "Erreurs à Éviter dans le Calcul de l’Indemnité",
    description:
      "Identifiez les erreurs fréquentes de calcul : ancienneté, salaire de référence, primes, convention collective et brut/net."
  }
};

const toolSeoSnippets: Record<string, SeoSnippet> = {
  "cout-employeur": {
    title: "Coût Employeur d’une Rupture Conventionnelle",
    description:
      "Estimez le coût employeur d’une rupture conventionnelle : indemnité, salaire restant, congés payés, budget et vigilance RH."
  },
  preavis: {
    title: "Préavis et Rupture Conventionnelle : Dates et Délais",
    description:
      "Comprenez les délais d’une rupture conventionnelle, la date de départ et les étapes à respecter avant la fin du contrat."
  },
  licenciement: {
    title: "Indemnité Licenciement et Rupture Conventionnelle",
    description:
      "Comparez indemnité de licenciement et rupture conventionnelle avec une lecture claire des bases de calcul et des droits."
  }
};

function toTitleCase(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/(^|[\s:’'-])([\p{L}])/gu, (match, prefix: string, letter: string) =>
      `${prefix}${letter.toLocaleUpperCase("fr-FR")}`
    );
}

export function buildCtrTitle(title: string): string {
  return toTitleCase(title.replace(/\s+\|\s+RuptureConv\.?$/i, ""));
}

export function getPillarSeoSnippet(
  page: PillarPage,
  programmaticParams?: ProgrammaticSeoParams | null
): SeoSnippet {
  if (programmaticParams?.type === "anciennete") {
    return {
      title: `Indemnité de Rupture Conventionnelle : ${programmaticParams.value} Ans`,
      description: `Estimez l’indemnité de rupture conventionnelle pour ${programmaticParams.value} ans d’ancienneté, avec calcul rapide, gratuit et exemples concrets.`
    };
  }

  if (programmaticParams?.type === "salaire") {
    return {
      title: `Indemnité de Rupture Conventionnelle : Salaire ${programmaticParams.value}€`,
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
          title: "Outil RH Gratuit",
          description:
            "Préparez vos démarches RH avec un guide clair, accessible et pensé pour les salariés comme les employeurs."
        })
  );
}
