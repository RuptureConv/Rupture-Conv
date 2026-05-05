export type ProgrammaticSeoType = "salaire" | "anciennete";

export type ProgrammaticSeoParams = {
  type: ProgrammaticSeoType;
  value: number;
};

export type Estimate = {
  amount: number;
  formula: string;
  salary: number;
  years: number;
};

export type TableRow = {
  seniority: string;
  indemnity: string;
};

export type DynamicText = {
  differentiated: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  h1: string;
  introAnswer: string;
  lead: string;
};

export function formatEuro(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "EUR"
  }).format(amount);
}

function calculateMinimumIndemnity(years: number, salary: number) {
  const firstPeriod = Math.min(years, 10) * salary * 0.25;
  const secondPeriod = Math.max(years - 10, 0) * salary * (1 / 3);

  return Math.round(firstPeriod + secondPeriod);
}

export function generateEstimate({
  type,
  value
}: ProgrammaticSeoParams): Estimate {
  const salary = type === "salaire" ? value : 2500;
  const years = type === "anciennete" ? value : 10;

  return {
    amount: calculateMinimumIndemnity(years, salary),
    formula:
      years <= 10
        ? "1/4 de mois de salaire par année d'ancienneté"
        : "1/4 de mois jusqu'à 10 ans, puis 1/3 de mois au-delà",
    salary,
    years
  };
}

export function generateTableData({
  type,
  value
}: ProgrammaticSeoParams): TableRow[] {
  if (type === "salaire") {
    const salary = value;
    const rows = [1, 3, 5, 10, 15, 20];

    return rows.map((years) => ({
      seniority: `${years} ${years === 1 ? "an" : "ans"}`,
      indemnity: formatEuro(calculateMinimumIndemnity(years, salary))
    }));
  }

  const baseYears = value;
  const rows = Array.from(
    new Set([
      Math.max(1, baseYears - 2),
      Math.max(1, baseYears - 1),
      baseYears,
      Math.min(40, baseYears + 1),
      Math.min(40, baseYears + 2)
    ])
  );

  return rows.map((years) => ({
    seniority: `${years} ${years === 1 ? "an" : "ans"}`,
    indemnity: formatEuro(calculateMinimumIndemnity(years, 2500))
  }));
}

export function generateDynamicText(
  params: ProgrammaticSeoParams
): DynamicText {
  const estimate = generateEstimate(params);

  if (params.type === "salaire") {
    return {
      h1: `Indemnité de rupture conventionnelle pour un salaire de ${params.value}€`,
      introAnswer: `Avec un salaire brut de ${formatEuro(params.value)} et une ancienneté de 10 ans, l'indemnité minimale indicative est d'environ ${formatEuro(estimate.amount)} bruts. Le calcul repose sur ${estimate.formula}.`,
      lead:
        "Cette estimation aide à situer le minimum légal avant de vérifier la convention collective, les primes et la rémunération réellement retenue.",
      differentiated: [
        `Pour un salaire de ${formatEuro(params.value)}, la progression salariale joue un rôle direct : une hausse de salaire augmente mécaniquement la base de calcul si elle est retenue comme salaire de référence.`,
        "L'ancienneté reste le second levier majeur. Les premières années sont calculées au quart de mois par année, puis le calcul devient plus favorable au-delà de dix ans avec la règle du tiers.",
        "Lorsque le salaire a évolué récemment, il faut comparer les moyennes pertinentes et vérifier les primes régulières. Cette lecture évite de sous-estimer l'indemnité minimale ou de confondre brut, net indicatif et montant négocié."
      ],
      faq: [
        {
          question: `Quelle indemnité pour un salaire de ${params.value}€ ?`,
          answer: `Avec 10 ans d'ancienneté, un salaire de ${formatEuro(params.value)} donne un minimum indicatif d'environ ${formatEuro(estimate.amount)} bruts.`
        },
        {
          question: "Le salaire net est-il utilisé pour le calcul ?",
          answer:
            "Non, le calcul du minimum se raisonne sur une base brute. Le net indicatif dépend ensuite du traitement social et fiscal."
        },
        {
          question: "La progression salariale change-t-elle le montant ?",
          answer:
            "Oui, si la hausse entre dans le salaire de référence retenu. Les primes et variables réguliers peuvent aussi modifier la base."
        }
      ]
    };
  }

  return {
    h1: `Indemnité de rupture conventionnelle après ${params.value} ans d'ancienneté`,
    introAnswer: `Après ${params.value} ans d'ancienneté et avec un salaire brut de référence de ${formatEuro(estimate.salary)}, l'indemnité minimale indicative est d'environ ${formatEuro(estimate.amount)} bruts. Le calcul repose sur ${estimate.formula}.`,
    lead:
      "Cette estimation donne un repère utile avant de lancer une simulation avec votre salaire exact et les données de votre contrat.",
    differentiated: [
      `Après ${params.value} ans d'ancienneté, le calcul reflète souvent une partie importante du parcours professionnel dans l'entreprise. Plus la carrière est longue, plus la précision des dates et du salaire de référence devient déterminante.`,
      params.value >= 10
        ? "Le seuil des 10 ans est central : les dix premières années sont calculées au quart de mois, puis les années suivantes au tiers de mois de salaire."
        : "Avant le seuil des 10 ans, la règle du quart de mois par année s'applique sur l'ensemble de l'ancienneté retenue.",
      "Une évolution de carrière, une promotion, un passage cadre ou une rémunération variable peuvent modifier la base de calcul. La simulation personnalisée permet donc de passer d'un repère théorique à une estimation plus utile."
    ],
    faq: [
      {
        question: `Quelle indemnité après ${params.value} ans d'ancienneté ?`,
        answer: `Avec un salaire brut de référence de ${formatEuro(estimate.salary)}, l'indemnité minimale indicative est d'environ ${formatEuro(estimate.amount)} bruts.`
      },
      {
        question: "Que change le seuil de 10 ans ?",
        answer:
          "Jusqu'à 10 ans, le minimum repose sur un quart de mois par année. Au-delà, les années supplémentaires sont calculées au tiers de mois."
      },
      {
        question: "Faut-il vérifier la convention collective ?",
        answer:
          "Oui. Une convention collective peut prévoir une indemnité plus favorable que le minimum légal."
      }
    ]
  };
}

export function parseProgrammaticSeoSlug(
  slug: string
): ProgrammaticSeoParams | null {
  const seniorityMatch = /^indemnite-rupture-conventionnelle-(\d+)-ans$/.exec(
    slug
  );

  if (seniorityMatch) {
    const value = Number(seniorityMatch[1]);

    if (Number.isInteger(value) && value >= 1 && value <= 40) {
      return {
        type: "anciennete",
        value
      };
    }
  }

  const salaryMatch =
    /^indemnite-rupture-conventionnelle-salaire-(\d+)$/.exec(slug);

  if (salaryMatch) {
    const value = Number(salaryMatch[1]);

    if (
      Number.isInteger(value) &&
      value >= 1200 &&
      value <= 5000 &&
      value % 100 === 0
    ) {
      return {
        type: "salaire",
        value
      };
    }
  }

  return null;
}
