import { RULES_2026, type AreRules } from "@/lib/are-rules";

export type EmploymentExitMode =
  | "rupture_conventionnelle"
  | "licenciement"
  | "fin_cdd"
  | "fin_mission_interim"
  | "demission"
  | "demission_legitime"
  | "reconversion_validee"
  | "reliquat_droits";

export type WorkTime = "full_time" | "part_time";

export type UnemploymentProjectionInput = {
  age: number;
  averageMonthlyGrossSalary: number;
  contractEndDate: string;
  exitMode: EmploymentExitMode;
  workedDays: number;
  workedHours: number;
  seniorityYears: number;
  workTime: WorkTime;
  partTimeRatio?: number;
  supraLegalIndemnity: number;
  paidLeaveDays: number;
  legalTerminationIndemnity?: number;
  isFirstEntrySince2026?: boolean;
};

export type EligibilityStatus =
  | "probable"
  | "confirm"
  | "unlikely"
  | "not_automatic";

export type DecisionLevel = "favorable" | "intermediate" | "unfavorable";

export type UnemploymentProjectionResult = {
  eligibility: {
    status: EligibilityStatus;
    label: string;
    reasons: string[];
    lookbackMonths: number;
  };
  salary: {
    estimatedSjr: number;
    formulaA: number;
    formulaB: number;
    dailyGrossAre: number;
    dailyNetAre: number;
    monthlyGrossAre: number;
    monthlyNetAre: number;
  };
  waitingPeriods: {
    legalWaitingDays: number;
    paidLeaveDeferredDays: number;
    specificDeferredDays: number;
    totalDeferredDays: number;
    estimatedFirstPaymentDate: string;
  };
  duration: {
    estimatedDays: number;
    maxDaysApplied: number;
    ageBand: string;
    degressivityApplies: boolean;
    firstEntryFloorApplied: boolean;
    notes: string[];
  };
  projection: {
    terminationIndemnity: number;
    monthlyUnemployment: number;
    totalPotentialAre: number;
    cumulativePotentialIncome: number;
  };
  decision: {
    level: DecisionLevel;
    label: string;
    recommendations: string[];
  };
  warnings: string[];
};

const DAYS_PER_MONTH = 30.42;
const DATE_DAY_MS = 24 * 60 * 60 * 1000;

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function roundDays(value: number): number {
  return Math.max(0, Math.ceil(value));
}

function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(dateValue: string, days: number): string {
  const date = parseDateOnly(dateValue);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function getPartTimeRatio(input: UnemploymentProjectionInput): number {
  if (input.workTime === "full_time") return 1;
  return Math.min(Math.max(input.partTimeRatio ?? 0.8, 0.1), 1);
}

function getAgeBand(age: number): {
  label: string;
  maxDays: number;
} {
  if (age >= 57) {
    return {
      label: age >= 60 ? "60 ans et plus" : "57 ans et plus",
      maxDays: RULES_2026.duration.standardMaxDays.age57Plus
    };
  }

  if (age >= 55) {
    return {
      label: age === 56 ? "56 ans" : "55 ans",
      maxDays: RULES_2026.duration.standardMaxDays.age55To56
    };
  }

  return {
    label: age >= 50 ? "50 à 54 ans" : "moins de 50 ans",
    maxDays: RULES_2026.duration.standardMaxDays.under55
  };
}

function isPotentiallyInvoluntary(mode: EmploymentExitMode): boolean {
  return [
    "rupture_conventionnelle",
    "licenciement",
    "fin_cdd",
    "fin_mission_interim",
    "demission_legitime",
    "reconversion_validee",
    "reliquat_droits"
  ].includes(mode);
}

function getEligibility(
  input: UnemploymentProjectionInput,
  rules: AreRules
): UnemploymentProjectionResult["eligibility"] {
  const lookbackMonths =
    input.age >= rules.affiliation.seniorLookbackAge
      ? rules.affiliation.seniorLookbackMonths
      : rules.affiliation.defaultLookbackMonths;
  const hasEnoughWork =
    input.workedDays >= rules.affiliation.minimumWorkedDays ||
    input.workedHours >= rules.affiliation.minimumWorkedHours;
  const reasons: string[] = [];

  if (hasEnoughWork) {
    reasons.push(
      `Activité déclarée au-dessus du repère ${rules.affiliation.minimumWorkedDays} jours ou ${rules.affiliation.minimumWorkedHours} heures.`
    );
  } else {
    reasons.push(
      `Activité déclarée sous le repère ${rules.affiliation.minimumWorkedDays} jours ou ${rules.affiliation.minimumWorkedHours} heures.`
    );
  }

  reasons.push(
    `Période de recherche indicative : ${lookbackMonths} mois selon l'âge saisi.`
  );

  if (input.exitMode === "demission") {
    return {
      status: "not_automatic",
      label: "Éligibilité à confirmer auprès de France Travail",
      reasons: [
        "Une démission classique n'ouvre pas automatiquement droit à l'ARE.",
        "Un réexamen peut être demandé après 121 jours de chômage si les autres conditions sont réunies.",
        ...reasons
      ],
      lookbackMonths
    };
  }

  if (!hasEnoughWork) {
    return {
      status: "unlikely",
      label: "Éligibilité probable faible",
      reasons,
      lookbackMonths
    };
  }

  if (!isPotentiallyInvoluntary(input.exitMode)) {
    return {
      status: "confirm",
      label: "Éligibilité à confirmer auprès de France Travail",
      reasons,
      lookbackMonths
    };
  }

  return {
    status: input.exitMode === "reliquat_droits" ? "confirm" : "probable",
    label:
      input.exitMode === "reliquat_droits"
        ? "Éligibilité à confirmer selon le reliquat"
        : "Éligibilité probable",
    reasons,
    lookbackMonths
  };
}

function estimateTerminationIndemnity(input: UnemploymentProjectionInput): number {
  const explicitLegal = input.legalTerminationIndemnity ?? 0;

  if (input.exitMode !== "rupture_conventionnelle") {
    return roundMoney(explicitLegal + input.supraLegalIndemnity);
  }

  const firstPeriodYears = Math.min(input.seniorityYears, 10);
  const secondPeriodYears = Math.max(input.seniorityYears - 10, 0);
  const minimum =
    input.averageMonthlyGrossSalary * firstPeriodYears * 0.25 +
    input.averageMonthlyGrossSalary * secondPeriodYears * (1 / 3);

  return roundMoney(Math.max(minimum, explicitLegal) + input.supraLegalIndemnity);
}

function getMaxDurationDays(input: UnemploymentProjectionInput, rules: AreRules) {
  const ageBand = getAgeBand(input.age);

  if (
    input.exitMode === "rupture_conventionnelle" &&
    rules.ruptureConventionnelle2026.status === "active" &&
    rules.ruptureConventionnelle2026.appliedInCalculator
  ) {
    return {
      label: ageBand.label,
      maxDays:
        input.age >= 55
          ? rules.ruptureConventionnelle2026.maxDaysIfActive.age55Plus
          : rules.ruptureConventionnelle2026.maxDaysIfActive.under55
    };
  }

  return ageBand;
}

export function calculateUnemploymentProjection(
  input: UnemploymentProjectionInput,
  rules: AreRules = RULES_2026
): UnemploymentProjectionResult {
  if (input.age < 16 || input.age > 75) {
    throw new Error("L'âge doit être compris entre 16 et 75 ans.");
  }

  if (input.averageMonthlyGrossSalary <= 0) {
    throw new Error("Le salaire brut mensuel moyen doit être positif.");
  }

  const partTimeRatio = getPartTimeRatio(input);
  const estimatedAnnualGross = input.averageMonthlyGrossSalary * 12;
  const estimatedSjr = roundMoney((estimatedAnnualGross / 365) * partTimeRatio);
  const formulaA = roundMoney(
    estimatedSjr * rules.areFormula.variableSjrRate +
      rules.areFormula.fixedDailyPart * partTimeRatio
  );
  const formulaB = roundMoney(estimatedSjr * rules.areFormula.alternativeSjrRate);
  const cappedDailyGross = Math.min(
    Math.max(formulaA, formulaB),
    estimatedSjr * rules.areFormula.maxSjrRate
  );
  const dailyGrossAre = roundMoney(cappedDailyGross);
  const dailyNetAre = roundMoney(
    Math.max(
      dailyGrossAre * rules.areFormula.netEstimateRate,
      Math.min(rules.areFormula.minimumNetDailyAllowance * partTimeRatio, dailyGrossAre)
    )
  );
  const monthlyGrossAre = roundMoney(dailyGrossAre * DAYS_PER_MONTH);
  const monthlyNetAre = roundMoney(dailyNetAre * DAYS_PER_MONTH);
  const maxDuration = getMaxDurationDays(input, rules);
  const baseDuration = Math.floor(input.workedDays * rules.duration.coefficient);
  const firstEntryFloorApplied =
    Boolean(input.isFirstEntrySince2026) &&
    parseDateOnly(input.contractEndDate) >= parseDateOnly("2026-04-01") &&
    baseDuration < rules.duration.minimumDays;
  const minimumDuration = firstEntryFloorApplied
    ? rules.duration.firstEntryMinimumDaysFrom2026
    : rules.duration.minimumDays;
  const estimatedDays = Math.min(
    Math.max(baseDuration, input.workedDays > 0 ? minimumDuration : 0),
    maxDuration.maxDays
  );
  const estimatedPaidLeaveAmount =
    input.paidLeaveDays * (input.averageMonthlyGrossSalary / 21.67);
  const paidLeaveDeferredDays = Math.min(
    roundDays(estimatedPaidLeaveAmount / Math.max(estimatedSjr, 1)),
    rules.waitingPeriods.paidLeaveMaxDays
  );
  const specificMax =
    input.exitMode === "licenciement"
      ? rules.waitingPeriods.specificMaxDays
      : rules.waitingPeriods.specificMaxDays;
  const specificDeferredDays = Math.min(
    roundDays(input.supraLegalIndemnity / rules.waitingPeriods.specificDivisor),
    specificMax
  );
  const totalDeferredDays =
    rules.waitingPeriods.legalWaitingDays +
    paidLeaveDeferredDays +
    specificDeferredDays;
  const terminationIndemnity = estimateTerminationIndemnity(input);
  const totalPotentialAre = roundMoney(dailyNetAre * estimatedDays);
  const degressivityApplies =
    input.age < rules.degressivity.excludedFromAge &&
    dailyGrossAre > rules.degressivity.highDailyAllowanceThreshold;
  const durationNotes = [
    input.age >= 55
      ? "À partir de 55 ans, la recherche d'activité se fait sur 36 mois et la dégressivité ARE ne s'applique pas selon les repères France Travail."
      : "La recherche d'activité est estimée sur 24 mois et une dégressivité peut exister pour les allocations élevées.",
    input.age >= rules.duration.retirementMaintenanceInformationAge
      ? "À partir de 60 ans, la continuité jusqu'à la retraite dépend de conditions spécifiques à confirmer auprès de France Travail."
      : "",
    rules.ruptureConventionnelle2026.status === "pending_texts" &&
    input.exitMode === "rupture_conventionnelle"
      ? rules.ruptureConventionnelle2026.sourceLabel
      : ""
  ].filter(Boolean);
  const eligibility = getEligibility(input, rules);
  const waitingIsHigh = totalDeferredDays >= 45;
  const replacementRatio = monthlyNetAre / input.averageMonthlyGrossSalary;
  const level: DecisionLevel =
    eligibility.status === "unlikely" || eligibility.status === "not_automatic"
      ? "unfavorable"
      : waitingIsHigh || replacementRatio < 0.45
        ? "intermediate"
        : "favorable";
  const recommendations =
    level === "favorable"
      ? [
          "La projection semble lisible : vérifiez les bulletins et l'attestation employeur avant de vous engager.",
          "Comparez la date du premier versement probable avec votre trésorerie disponible.",
          "Gardez une marge : France Travail reste seul compétent pour confirmer les droits."
        ]
      : level === "intermediate"
        ? [
            "Le scénario mérite une vérification, surtout sur les différés et les indemnités supra-légales.",
            "Préparez une réserve de trésorerie pour couvrir le délai avant premier versement.",
            "Testez une hypothèse avec moins d'indemnité supra-légale ou une date de fin différente."
          ]
        : [
            "Ne quittez pas votre emploi sur la seule base de cette estimation.",
            "Vérifiez d'abord l'éligibilité avec France Travail, notamment en cas de démission.",
            "Étudiez une rupture conventionnelle, une démission légitime ou un projet de reconversion validé si votre situation le permet."
          ];

  return {
    eligibility,
    salary: {
      estimatedSjr,
      formulaA,
      formulaB,
      dailyGrossAre,
      dailyNetAre,
      monthlyGrossAre,
      monthlyNetAre
    },
    waitingPeriods: {
      legalWaitingDays: rules.waitingPeriods.legalWaitingDays,
      paidLeaveDeferredDays,
      specificDeferredDays,
      totalDeferredDays,
      estimatedFirstPaymentDate: addDays(input.contractEndDate, totalDeferredDays + 1)
    },
    duration: {
      estimatedDays,
      maxDaysApplied: maxDuration.maxDays,
      ageBand: maxDuration.label,
      degressivityApplies,
      firstEntryFloorApplied,
      notes: durationNotes
    },
    projection: {
      terminationIndemnity,
      monthlyUnemployment: monthlyNetAre,
      totalPotentialAre,
      cumulativePotentialIncome: roundMoney(terminationIndemnity + totalPotentialAre)
    },
    decision: {
      level,
      label:
        level === "favorable"
          ? "Situation favorable"
          : level === "intermediate"
            ? "Situation intermédiaire"
            : "Situation défavorable",
      recommendations
    },
    warnings: [
      "Estimation indicative : seul France Travail confirme l'ouverture, le montant et la durée des droits.",
      "Le SJR est approché à partir d'un salaire mensuel moyen. Une paie variable, des périodes non travaillées ou un reliquat peuvent modifier le résultat.",
      "Ne jamais interpréter cette projection comme une décision juridique ou une notification de droits."
    ]
  };
}
