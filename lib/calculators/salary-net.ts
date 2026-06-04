export type SalaryPeriod = "hourly" | "monthly" | "annual";

export type SalaryProfileKey =
  | "privateNonExecutive"
  | "privateExecutive"
  | "publicSector";

export type SalaryProfile = {
  label: string;
  estimatedContributionRate: number;
};

// Taux indicatifs de conversion brut/net. À mettre à jour si les repères
// sociaux évoluent ou si un calcul de paie plus fin est ajouté.
export const salaryProfiles: Record<SalaryProfileKey, SalaryProfile> = {
  privateNonExecutive: {
    label: "Salarié du privé non-cadre",
    estimatedContributionRate: 0.22
  },
  privateExecutive: {
    label: "Salarié du privé cadre",
    estimatedContributionRate: 0.25
  },
  publicSector: {
    label: "Fonction publique",
    estimatedContributionRate: 0.165
  }
};

export type SalaryNetCalculatorInput = {
  grossAmount: number;
  period: SalaryPeriod;
  profile: SalaryProfileKey;
  weeklyHours?: number;
  withholdingTaxRate?: number;
};

export type SalaryNetCalculatorResult = {
  profileLabel: string;
  contributionRate: number;
  withholdingTaxRate: number | null;
  weeklyHours: number;
  monthlyHours: number;
  annualHours: number;
  grossHourly: number;
  grossMonthly: number;
  grossAnnual: number;
  netBeforeTaxHourly: number;
  netBeforeTaxMonthly: number;
  netBeforeTaxAnnual: number;
  netAfterTaxHourly: number | null;
  netAfterTaxMonthly: number | null;
  netAfterTaxAnnual: number | null;
  estimatedContributionsHourly: number;
  estimatedContributionsMonthly: number;
  estimatedContributionsAnnual: number;
};

export const DEFAULT_WEEKLY_HOURS = 35;

// Repères SMIC centralisés pour les contenus salaire. Montants à maintenir à
// jour dès qu'une revalorisation officielle est publiée.
export const smicReference = {
  effectiveDate: "2026-06-01",
  checkedAt: "2026-06-04",
  weeklyHours: DEFAULT_WEEKLY_HOURS,
  hourlyGross: 12.31,
  hourlyNetIndicative: 9.74,
  monthlyGross: 1867.02,
  monthlyNetIndicative: 1477.93,
  annualGross: 22404.2,
  annualNetIndicative: 17735.19,
  sourceLabel: "Service-Public.fr",
  sourceUrl: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2300"
} as const;

export function validateSalaryNetInput(input: SalaryNetCalculatorInput): string[] {
  const errors: string[] = [];
  const weeklyHours = input.weeklyHours ?? DEFAULT_WEEKLY_HOURS;

  if (!Number.isFinite(input.grossAmount) || input.grossAmount <= 0) {
    errors.push("Saisissez un salaire brut supérieur à 0 €.");
  }

  if (!Number.isFinite(weeklyHours) || weeklyHours <= 0 || weeklyHours > 80) {
    errors.push("Indiquez un temps de travail cohérent, entre 1 h et 80 h par semaine.");
  }

  if (!salaryProfiles[input.profile]) {
    errors.push("Choisissez un statut valide.");
  }

  if (
    input.withholdingTaxRate !== undefined &&
    (!Number.isFinite(input.withholdingTaxRate) ||
      input.withholdingTaxRate < 0 ||
      input.withholdingTaxRate > 100)
  ) {
    errors.push("Le taux de prélèvement à la source doit être compris entre 0 % et 100 %.");
  }

  return errors;
}

export function calculateSalaryNet(
  input: SalaryNetCalculatorInput
): SalaryNetCalculatorResult {
  const errors = validateSalaryNetInput(input);

  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }

  const weeklyHours = input.weeklyHours ?? DEFAULT_WEEKLY_HOURS;
  const monthlyHours = weeklyHours * 52 / 12;
  const annualHours = weeklyHours * 52;
  const profile = salaryProfiles[input.profile];
  const grossMonthly = getMonthlyGross(input.grossAmount, input.period, monthlyHours);
  const grossAnnual = grossMonthly * 12;
  const grossHourly = grossAnnual / annualHours;
  const contributionRate = profile.estimatedContributionRate;
  const netMultiplier = 1 - contributionRate;
  const withholdingTaxRate = input.withholdingTaxRate ?? null;
  const taxMultiplier =
    withholdingTaxRate === null ? null : 1 - withholdingTaxRate / 100;

  return {
    profileLabel: profile.label,
    contributionRate,
    withholdingTaxRate,
    weeklyHours: round(weeklyHours, 2),
    monthlyHours: round(monthlyHours, 2),
    annualHours: round(annualHours, 2),
    grossHourly: roundMoney(grossHourly),
    grossMonthly: roundMoney(grossMonthly),
    grossAnnual: roundMoney(grossAnnual),
    netBeforeTaxHourly: roundMoney(grossHourly * netMultiplier),
    netBeforeTaxMonthly: roundMoney(grossMonthly * netMultiplier),
    netBeforeTaxAnnual: roundMoney(grossAnnual * netMultiplier),
    netAfterTaxHourly:
      taxMultiplier === null ? null : roundMoney(grossHourly * netMultiplier * taxMultiplier),
    netAfterTaxMonthly:
      taxMultiplier === null ? null : roundMoney(grossMonthly * netMultiplier * taxMultiplier),
    netAfterTaxAnnual:
      taxMultiplier === null ? null : roundMoney(grossAnnual * netMultiplier * taxMultiplier),
    estimatedContributionsHourly: roundMoney(grossHourly * contributionRate),
    estimatedContributionsMonthly: roundMoney(grossMonthly * contributionRate),
    estimatedContributionsAnnual: roundMoney(grossAnnual * contributionRate)
  };
}

function getMonthlyGross(
  grossAmount: number,
  period: SalaryPeriod,
  monthlyHours: number
): number {
  if (period === "hourly") {
    return grossAmount * monthlyHours;
  }

  if (period === "annual") {
    return grossAmount / 12;
  }

  return grossAmount;
}

function roundMoney(value: number): number {
  return round(value, 2);
}

function round(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
