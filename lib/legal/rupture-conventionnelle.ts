export const RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_BEFORE_2026 = 0.30;
export const RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_FROM_2026 = 0.40;
export const RUPTURE_CONVENTIONNELLE_REFORM_2026_EFFECTIVE_DATE = "2026-01-01";

type EmployerContributionInput = {
  indemnityAmount: number;
  exemptSocialSecurityAmount?: number;
  baseIsIndicative?: boolean;
  ruptureDate?: string;
};

export type EmployerContributionCalculation = {
  indemnityAmount: number;
  contributionBase: number;
  contributionRate: number;
  employerContribution: number;
  totalEmployerCost: number;
  ruptureDateUsed: string;
  usedFallbackDate: boolean;
  baseIsIndicative: boolean;
};

function roundLegalMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function parseDateOnlyUtc(value?: string): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function getComparableRuptureDate(ruptureDate?: string): {
  date: Date;
  dateValue: string;
  usedFallbackDate: boolean;
} {
  const parsedDate = parseDateOnlyUtc(ruptureDate);

  if (parsedDate) {
    return {
      date: parsedDate,
      dateValue: ruptureDate ?? RUPTURE_CONVENTIONNELLE_REFORM_2026_EFFECTIVE_DATE,
      usedFallbackDate: false
    };
  }

  return {
    date: parseDateOnlyUtc(RUPTURE_CONVENTIONNELLE_REFORM_2026_EFFECTIVE_DATE) as Date,
    dateValue: RUPTURE_CONVENTIONNELLE_REFORM_2026_EFFECTIVE_DATE,
    usedFallbackDate: true
  };
}

export function getEmployerContributionRate(ruptureDate?: string): number {
  const rupture = getComparableRuptureDate(ruptureDate);
  const reformDate = parseDateOnlyUtc(RUPTURE_CONVENTIONNELLE_REFORM_2026_EFFECTIVE_DATE) as Date;

  return rupture.date >= reformDate
    ? RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_FROM_2026
    : RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_BEFORE_2026;
}

export function calculateTotalEmployerCost({
  employerContribution,
  indemnityAmount
}: {
  employerContribution: number;
  indemnityAmount: number;
}): number {
  const safeIndemnityAmount =
    Number.isFinite(indemnityAmount) && indemnityAmount > 0 ? indemnityAmount : 0;
  const safeEmployerContribution =
    Number.isFinite(employerContribution) && employerContribution > 0
      ? employerContribution
      : 0;

  return roundLegalMoney(safeIndemnityAmount + safeEmployerContribution);
}

export function calculateEmployerContribution({
  baseIsIndicative,
  indemnityAmount,
  exemptSocialSecurityAmount,
  ruptureDate
}: EmployerContributionInput): EmployerContributionCalculation {
  const rupture = getComparableRuptureDate(ruptureDate);
  const safeIndemnityAmount =
    Number.isFinite(indemnityAmount) && indemnityAmount > 0 ? indemnityAmount : 0;
  const hasProvidedExemptBase = typeof exemptSocialSecurityAmount === "number";
  const hasExplicitExemptBase =
    hasProvidedExemptBase &&
    Number.isFinite(exemptSocialSecurityAmount) &&
    exemptSocialSecurityAmount >= 0;
  const contributionBase = hasExplicitExemptBase
    ? Math.min(exemptSocialSecurityAmount, safeIndemnityAmount)
    : hasProvidedExemptBase
      ? 0
      : safeIndemnityAmount;
  const contributionRate = getEmployerContributionRate(rupture.dateValue);
  const employerContribution = roundLegalMoney(contributionBase * contributionRate);

  return {
    indemnityAmount: roundLegalMoney(safeIndemnityAmount),
    contributionBase: roundLegalMoney(contributionBase),
    contributionRate,
    employerContribution,
    totalEmployerCost: calculateTotalEmployerCost({
      employerContribution,
      indemnityAmount: safeIndemnityAmount
    }),
    ruptureDateUsed: rupture.dateValue,
    usedFallbackDate: rupture.usedFallbackDate,
    baseIsIndicative: baseIsIndicative ?? !hasExplicitExemptBase
  };
}
