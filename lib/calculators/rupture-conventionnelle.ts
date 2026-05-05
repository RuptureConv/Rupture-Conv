import type {
  AbsenceRuleApplied,
  AbsenceType,
  ReferenceSalaryCandidate,
  SalaryReferenceReason,
  Seniority,
  TerminationCalculatorInput,
  TerminationCalculationResult
} from "@/types/termination";
import { getAbsenceRule } from "@/lib/calculators/absence-rules";
import { applyCollectiveAgreementRules } from "@/lib/conventions/rules";
import { formatCurrency, formatNumber, formatPreciseCurrency } from "@/lib/utils/format";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const AVERAGE_DAYS_PER_YEAR = 365.2425;
const AVERAGE_DAYS_PER_MONTH = AVERAGE_DAYS_PER_YEAR / 12;
const SALARY_REASON_BY_SOURCE: Record<string, SalaryReferenceReason> = {
  "Salaire brut mensuel moyen": "salaire moyen",
  "Moyenne brute des 3 derniers mois": "moyenne 3 mois",
  "Moyenne brute des 12 derniers mois": "moyenne 12 mois",
  "Salaire habituel avant absence": "salaire habituel avant absence"
};

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function calculateSeniority(startDateValue: string, ruptureDateValue: string): Seniority {
  const startDate = parseDateOnly(startDateValue);
  const ruptureDate = parseDateOnly(ruptureDateValue);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(ruptureDate.getTime())) {
    throw new Error("Les dates doivent être valides.");
  }

  if (ruptureDate < startDate) {
    throw new Error("La date de rupture doit être postérieure à la date d'entrée.");
  }

  const totalDays = Math.floor((ruptureDate.getTime() - startDate.getTime()) / DAY_IN_MS);

  let years = ruptureDate.getUTCFullYear() - startDate.getUTCFullYear();
  let months = ruptureDate.getUTCMonth() - startDate.getUTCMonth();
  let days = ruptureDate.getUTCDate() - startDate.getUTCDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(
      Date.UTC(ruptureDate.getUTCFullYear(), ruptureDate.getUTCMonth(), 0)
    );
    days += previousMonth.getUTCDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const decimalYears = years + months / 12 + days / 365.2425;

  const parts = [
    years > 0 ? `${years} an${years > 1 ? "s" : ""}` : "",
    months > 0 ? `${months} mois` : "",
    days > 0 ? `${days} jour${days > 1 ? "s" : ""}` : ""
  ].filter(Boolean);

  return {
    totalDays,
    years,
    remainingMonths: months,
    remainingDays: days,
    decimalYears,
    label: parts.length > 0 ? parts.join(", ") : "0 jour"
  };
}

function buildSeniorityFromTotalDays(totalDays: number): Seniority {
  const safeTotalDays = Math.max(Math.floor(totalDays), 0);
  const years = Math.floor(safeTotalDays / AVERAGE_DAYS_PER_YEAR);
  const daysAfterYears = safeTotalDays - Math.floor(years * AVERAGE_DAYS_PER_YEAR);
  const remainingMonths = Math.floor(daysAfterYears / AVERAGE_DAYS_PER_MONTH);
  const remainingDays = Math.max(
    safeTotalDays -
      Math.floor(years * AVERAGE_DAYS_PER_YEAR) -
      Math.floor(remainingMonths * AVERAGE_DAYS_PER_MONTH),
    0
  );
  const decimalYears = safeTotalDays / AVERAGE_DAYS_PER_YEAR;
  const parts = [
    years > 0 ? `${years} an${years > 1 ? "s" : ""}` : "",
    remainingMonths > 0 ? `${remainingMonths} mois` : "",
    remainingDays > 0 ? `${remainingDays} jour${remainingDays > 1 ? "s" : ""}` : ""
  ].filter(Boolean);

  return {
    totalDays: safeTotalDays,
    years,
    remainingMonths,
    remainingDays,
    decimalYears,
    label: parts.length > 0 ? parts.join(", ") : "0 jour"
  };
}

function toDateOnlyValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function calculateAbsenceDeduction(input: TerminationCalculatorInput): {
  days: number;
  decimalYears: number;
  absenceRulesApplied: AbsenceRuleApplied[];
  warnings: string[];
} {
  if (input.absenceImpact !== "yes" || !input.absenceStartDate) {
    return { days: 0, decimalYears: 0, absenceRulesApplied: [], warnings: [] };
  }

  const rule = getAbsenceRule(input.absenceType);

  if (!rule) {
    return { days: 0, decimalYears: 0, absenceRulesApplied: [], warnings: [] };
  }

  const employmentStart = parseDateOnly(input.startDate);
  const ruptureDate = parseDateOnly(input.ruptureDate);
  const absenceStart = parseDateOnly(input.absenceStartDate);
  const absenceEnd = input.absenceEndDate
    ? parseDateOnly(input.absenceEndDate)
    : ruptureDate;

  if (
    Number.isNaN(employmentStart.getTime()) ||
    Number.isNaN(ruptureDate.getTime()) ||
    Number.isNaN(absenceStart.getTime()) ||
    Number.isNaN(absenceEnd.getTime()) ||
    absenceEnd <= absenceStart
  ) {
    return { days: 0, decimalYears: 0, absenceRulesApplied: [], warnings: [] };
  }

  const overlapStart = new Date(
    Math.max(employmentStart.getTime(), absenceStart.getTime())
  );
  const overlapEnd = new Date(Math.min(ruptureDate.getTime(), absenceEnd.getTime()));

  if (overlapEnd <= overlapStart) {
    return { days: 0, decimalYears: 0, absenceRulesApplied: [], warnings: [] };
  }

  const absenceDuration = calculateSeniority(
    toDateOnlyValue(overlapStart),
    toDateOnlyValue(overlapEnd)
  );
  const deductionRatio =
    rule.seniorityTreatment === "excluded"
      ? 1
      : rule.seniorityTreatment === "half_counted"
        ? 0.5
        : 0;
  const deductedDays = Math.round(absenceDuration.totalDays * deductionRatio);
  const deductedDecimalYears = absenceDuration.decimalYears * deductionRatio;
  const applied: AbsenceRuleApplied = {
    type: rule.type,
    label: rule.label,
    seniorityTreatment: rule.seniorityTreatment,
    salaryReferenceTreatment: rule.salaryReferenceTreatment,
    deductedDays,
    employeeExplanation: rule.employeeExplanation,
    employerExplanation: rule.employerExplanation,
    warning: rule.warning
  };

  return {
    days: deductedDays,
    decimalYears: deductedDecimalYears,
    absenceRulesApplied: [applied],
    warnings: rule.warning ? [rule.warning] : []
  };
}

function calculateSeniorityRetainedForIndemnity(
  input: TerminationCalculatorInput
): {
  grossSeniority: Seniority;
  seniority: Seniority;
  absenceSeniorityDeductedDays: number;
  absenceRulesApplied: AbsenceRuleApplied[];
  warnings: string[];
} {
  const baseSeniority = calculateSeniority(input.startDate, input.ruptureDate);
  const absenceDeduction = calculateAbsenceDeduction(input);

  if (absenceDeduction.days <= 0) {
    return {
      grossSeniority: baseSeniority,
      seniority: baseSeniority,
      absenceSeniorityDeductedDays: 0,
      absenceRulesApplied: absenceDeduction.absenceRulesApplied,
      warnings: absenceDeduction.warnings
    };
  }

  const retainedSeniority = buildSeniorityFromTotalDays(
    baseSeniority.totalDays - absenceDeduction.days
  );
  retainedSeniority.decimalYears = Math.max(
    baseSeniority.decimalYears - absenceDeduction.decimalYears,
    0
  );

  return {
    grossSeniority: baseSeniority,
    seniority: retainedSeniority,
    absenceSeniorityDeductedDays: absenceDeduction.days,
    absenceRulesApplied: absenceDeduction.absenceRulesApplied,
    warnings: absenceDeduction.warnings
  };
}

export function getReferenceSalaryCandidates(
  input: TerminationCalculatorInput
): ReferenceSalaryCandidate[] {
  return [
    {
      label: "Salaire brut mensuel moyen",
      amount: input.averageMonthlyGrossSalary
    },
    {
      label: "Moyenne brute des 3 derniers mois",
      amount: input.averageLast3MonthsGrossSalary ?? 0
    },
    {
      label: "Moyenne brute des 12 derniers mois",
      amount: input.averageLast12MonthsGrossSalary ?? 0
    }
  ].filter((candidate) => Number.isFinite(candidate.amount) && candidate.amount > 0);
}

export function calculateReferenceSalary(input: TerminationCalculatorInput): {
  amount: number;
  source: string;
  salaryReferenceReason: SalaryReferenceReason;
  candidates: ReferenceSalaryCandidate[];
  absenceApplied: boolean;
  absenceType?: AbsenceType;
  salaryReferenceBeforeAbsence?: number;
  absenceDeclaredWithoutSalary: boolean;
} {
  const candidates = getReferenceSalaryCandidates(input);

  if (candidates.length === 0) {
    throw new Error("Renseignez au moins un salaire brut mensuel.");
  }

  const standardCandidate = candidates.reduce((best, candidate) =>
    candidate.amount > best.amount ? candidate : best
  );
  const salaryBeforeAbsence = input.usualGrossMonthlySalaryBeforeAbsence;
  const hasAbsence = input.absenceImpact === "yes";
  const absenceRule = getAbsenceRule(input.absenceType);
  const canUseSalaryBeforeAbsence =
    hasAbsence &&
    absenceRule?.salaryReferenceTreatment === "use_pre_absence_salary_if_more_favorable";
  const hasValidSalaryBeforeAbsence =
    typeof salaryBeforeAbsence === "number" &&
    Number.isFinite(salaryBeforeAbsence) &&
    salaryBeforeAbsence > 0;
  const absenceApplied =
    canUseSalaryBeforeAbsence &&
    hasValidSalaryBeforeAbsence &&
    salaryBeforeAbsence > standardCandidate.amount;
  const bestCandidate = absenceApplied
    ? {
        label: "Salaire habituel avant absence",
        amount: salaryBeforeAbsence
      }
    : standardCandidate;

  return {
    amount: bestCandidate.amount,
    source: bestCandidate.label,
    salaryReferenceReason: SALARY_REASON_BY_SOURCE[bestCandidate.label] ?? "salaire moyen",
    candidates,
    absenceApplied,
    absenceType: hasAbsence ? input.absenceType : undefined,
    salaryReferenceBeforeAbsence: hasValidSalaryBeforeAbsence ? salaryBeforeAbsence : undefined,
    absenceDeclaredWithoutSalary: canUseSalaryBeforeAbsence && !hasValidSalaryBeforeAbsence
  };
}

export function calculateMinimumGrossIndemnity(
  referenceSalary: number,
  seniorityInYears: number
): number {
  const firstTenYears = Math.min(seniorityInYears, 10);
  const yearsAfterTen = Math.max(seniorityInYears - 10, 0);
  const monthsOfSalary = firstTenYears * 0.25 + yearsAfterTen * (1 / 3);

  return roundMoney(referenceSalary * monthsOfSalary);
}

export function estimateNetFromGrossIndemnity(grossIndemnity: number): number {
  // Keep a single readable estimate while preserving transparent calculation
  // leaving room for a later fiscal/social engine with exemptions and tax rules.
  return roundMoney(grossIndemnity * 0.78);
}

export function calculateTerminationConventionnelle(
  input: TerminationCalculatorInput
): TerminationCalculationResult {
  const {
    grossSeniority,
    seniority,
    absenceSeniorityDeductedDays,
    absenceRulesApplied,
    warnings: absenceWarnings
  } = calculateSeniorityRetainedForIndemnity(input);
  const referenceSalary = calculateReferenceSalary(input);
  const minimumGrossIndemnity = calculateMinimumGrossIndemnity(
    referenceSalary.amount,
    seniority.decimalYears
  );
  const negotiated =
    input.negotiatedGrossIndemnity && input.negotiatedGrossIndemnity > 0
      ? input.negotiatedGrossIndemnity
      : undefined;
  const retainedGrossIndemnity = roundMoney(
    Math.max(minimumGrossIndemnity, negotiated ?? 0)
  );
  const estimatedNetIndemnity = estimateNetFromGrossIndemnity(retainedGrossIndemnity);
  const negotiatedBelowMinimum =
    typeof negotiated === "number" && negotiated < minimumGrossIndemnity;

  const detailLines = [
    `Ancienneté brute : ${grossSeniority.label}, soit ${formatNumber(grossSeniority.decimalYears, 3)} année(s).`,
    `Ancienneté retenue : ${seniority.label}, soit ${formatNumber(seniority.decimalYears, 3)} année(s).`,
    `Salaire de référence retenu : ${formatPreciseCurrency(referenceSalary.amount)} (${referenceSalary.source}).`,
    `Indemnité minimale : 1/4 de mois par année jusqu'à 10 ans, puis 1/3 au-delà, avec proratisation des années incomplètes.`,
    `Minimum estimé : ${formatPreciseCurrency(minimumGrossIndemnity)}.`,
    negotiated
      ? `Montant négocié renseigné : ${formatPreciseCurrency(negotiated)}.`
      : "Aucun montant négocié renseigné.",
    `Indemnité brute retenue : ${formatPreciseCurrency(retainedGrossIndemnity)}.`
  ];

  if (absenceSeniorityDeductedDays > 0) {
    detailLines.push(
      `Absences déduites : ${absenceSeniorityDeductedDays} jour${absenceSeniorityDeductedDays > 1 ? "s" : ""}.`
    );
  }

  for (const appliedRule of absenceRulesApplied) {
    detailLines.push(
      `Règle absence appliquée (${appliedRule.label}) : ancienneté ${appliedRule.seniorityTreatment}, salaire de référence ${appliedRule.salaryReferenceTreatment}.`,
      input.userProfile === "employer"
        ? appliedRule.employerExplanation
        : appliedRule.employeeExplanation
    );
  }

  if (referenceSalary.absenceApplied) {
    detailLines.push(
      "Le salaire habituel avant absence a été retenu car il est plus favorable.",
      input.userProfile === "employer"
        ? "Cela permet d'anticiper une base de calcul plus cohérente si le salaire récent a été diminué par une absence."
        : "Cela évite que votre indemnité soit estimée sur un salaire temporairement réduit."
    );
  } else if (referenceSalary.absenceDeclaredWithoutSalary) {
    detailLines.push(
      "Vous avez indiqué une absence, mais aucun salaire habituel avant absence n'a été renseigné. Le simulateur conserve donc le calcul standard."
    );
  }

  const employmentStatusLabel = input.employmentStatus === "cadre" ? "Cadre" : "Non-cadre";
  const employmentStatusMessage =
    "Le statut cadre ou non-cadre ne modifie pas à lui seul le minimum légal. Il peut toutefois avoir un impact si votre convention collective prévoit une indemnité plus favorable selon votre statut.";

  detailLines.push(`Statut renseigné : ${employmentStatusLabel}.`, employmentStatusMessage);

  const warnings = [...absenceWarnings];
  if (absenceRulesApplied.length > 0) {
    warnings.push(
      "Certaines absences peuvent dépendre de la convention collective ou de la situation exacte. Le résultat reste indicatif."
    );
  }

  const baseResult: TerminationCalculationResult = {
    seniority,
    grossSeniority,
    retainedSeniority: seniority,
    referenceSalary: referenceSalary.amount,
    referenceSalarySource: referenceSalary.source,
    salaryReferenceReason: referenceSalary.salaryReferenceReason,
    referenceSalaryCandidates: referenceSalary.candidates,
    absenceApplied: referenceSalary.absenceApplied,
    absenceType: referenceSalary.absenceType,
    salaryReferenceBeforeAbsence: referenceSalary.salaryReferenceBeforeAbsence,
    absenceSeniorityDeductedDays,
    deductedAbsenceDuration: absenceSeniorityDeductedDays,
    absenceRulesApplied,
    salaryReferenceAdjustedForAbsence: referenceSalary.absenceApplied,
    warnings: [...new Set(warnings)],
    minimumGrossIndemnity,
    negotiatedGrossIndemnity: negotiated,
    retainedGrossIndemnity,
    estimatedNetIndemnity,
    negotiatedBelowMinimum,
    detailLines,
    employeeSummary: `Estimation salarié ${employmentStatusLabel.toLowerCase()} : indemnité brute retenue ${formatCurrency(retainedGrossIndemnity)}, soit environ ${formatCurrency(estimatedNetIndemnity)} net indicatif.`,
    employerSummary: `Estimation employeur ${employmentStatusLabel.toLowerCase()} : base minimale légale estimée ${formatCurrency(minimumGrossIndemnity)} pour une ancienneté de ${seniority.label}.`,
    employmentStatus: input.employmentStatus,
    employmentStatusMessage
  };

  return applyCollectiveAgreementRules(baseResult, input);
}
