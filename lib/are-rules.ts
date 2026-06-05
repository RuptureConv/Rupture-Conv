export type AreRules = {
  year: 2026 | 2027;
  affiliation: {
    minimumWorkedDays: number;
    minimumWorkedHours: number;
    defaultLookbackMonths: number;
    seniorLookbackAge: number;
    seniorLookbackMonths: number;
  };
  areFormula: {
    fixedDailyPart: number;
    variableSjrRate: number;
    alternativeSjrRate: number;
    maxSjrRate: number;
    netEstimateRate: number;
    retirementContributionRate: number;
    minimumNetDailyAllowance: number;
  };
  waitingPeriods: {
    legalWaitingDays: number;
    paidLeaveMaxDays: number;
    specificDivisor: number;
    specificMaxDays: number;
    economicDismissalSpecificMaxDays: number;
  };
  duration: {
    coefficient: number;
    minimumDays: number;
    firstEntryMinimumDaysFrom2026: number;
    standardMaxDays: {
      under55: number;
      age55To56: number;
      age57Plus: number;
    };
    retirementMaintenanceInformationAge: number;
  };
  degressivity: {
    startsAfterDays: number;
    excludedFromAge: number;
    highDailyAllowanceThreshold: number;
    reductionRate: number;
  };
  ruptureConventionnelle2026: {
    status: "pending_texts" | "active";
    appliedInCalculator: boolean;
    sourceLabel: string;
    maxDaysIfActive: {
      under55: number;
      age55Plus: number;
    };
  };
};

export const RULES_2026: AreRules = {
  year: 2026,
  affiliation: {
    minimumWorkedDays: 130,
    minimumWorkedHours: 910,
    defaultLookbackMonths: 24,
    seniorLookbackAge: 55,
    seniorLookbackMonths: 36
  },
  areFormula: {
    fixedDailyPart: 13.18,
    variableSjrRate: 0.404,
    alternativeSjrRate: 0.57,
    maxSjrRate: 0.75,
    netEstimateRate: 0.97,
    retirementContributionRate: 0.03,
    minimumNetDailyAllowance: 32.13
  },
  waitingPeriods: {
    legalWaitingDays: 7,
    paidLeaveMaxDays: 30,
    specificDivisor: 111.8,
    specificMaxDays: 150,
    economicDismissalSpecificMaxDays: 75
  },
  duration: {
    coefficient: 0.75,
    minimumDays: 182,
    firstEntryMinimumDaysFrom2026: 152,
    standardMaxDays: {
      under55: 548,
      age55To56: 685,
      age57Plus: 822
    },
    retirementMaintenanceInformationAge: 60
  },
  degressivity: {
    startsAfterDays: 183,
    excludedFromAge: 55,
    highDailyAllowanceThreshold: 92.12,
    reductionRate: 0.3
  },
  ruptureConventionnelle2026: {
    status: "pending_texts",
    appliedInCalculator: false,
    sourceLabel:
      "Réforme 2026 annoncée pour les ruptures conventionnelles, à confirmer selon publication, agrément et date d'entrée en vigueur.",
    maxDaysIfActive: {
      under55: 456,
      age55Plus: 624
    }
  }
};

export const RULES_2027: AreRules = {
  ...RULES_2026,
  year: 2027
};
