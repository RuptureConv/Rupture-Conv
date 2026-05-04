import { roundMoney } from "@/lib/calculators/rupture-conventionnelle";

export type IndicativeNegotiationRange = {
  low: number;
  high: number;
  explanation: string;
};

function roundToNearestTen(value: number): number {
  return Math.round(value / 10) * 10;
}

export function calculateIndicativeNegotiationRange({
  minimumGrossIndemnity,
  negotiatedGrossIndemnity,
  referenceSalary,
  seniorityYears
}: {
  minimumGrossIndemnity: number;
  negotiatedGrossIndemnity?: number;
  referenceSalary: number;
  seniorityYears: number;
}): IndicativeNegotiationRange {
  const low = roundMoney(minimumGrossIndemnity);

  if (
    typeof negotiatedGrossIndemnity === "number" &&
    Number.isFinite(negotiatedGrossIndemnity) &&
    negotiatedGrossIndemnity > minimumGrossIndemnity
  ) {
    return {
      low,
      high: roundMoney(negotiatedGrossIndemnity),
      explanation:
        "Le montant négocié renseigné sert de borne haute. Le minimum légal reste la borne basse."
    };
  }

  const seniorityRate =
    seniorityYears < 1 ? 0.12 : seniorityYears < 3 ? 0.15 : seniorityYears < 8 ? 0.2 : 0.25;
  const indicativeMargin = Math.max(
    minimumGrossIndemnity * seniorityRate,
    referenceSalary * 0.1
  );
  const high = Math.max(
    roundToNearestTen(minimumGrossIndemnity + indicativeMargin),
    roundToNearestTen(minimumGrossIndemnity + 10)
  );

  return {
    low,
    high,
    explanation:
      "Fourchette indicative construite à partir du minimum légal et du salaire de référence. Elle sert de repère de discussion et ne constitue pas une règle juridique."
  };
}
