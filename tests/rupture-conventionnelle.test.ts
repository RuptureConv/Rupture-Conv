import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  calculateMinimumGrossIndemnity,
  calculateReferenceSalary,
  calculateSeniority,
  calculateTerminationConventionnelle,
  estimateNetFromGrossIndemnity
} from "@/lib/calculators/rupture-conventionnelle";
import { calculateIndicativeNegotiationRange } from "@/lib/calculators/negotiation-range";
import { applyCollectiveAgreementRules } from "@/lib/conventions/rules";
import {
  calculateEmployerContribution,
  calculateTotalEmployerCost,
  getEmployerContributionRate,
  RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_BEFORE_2026,
  RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_FROM_2026,
  RUPTURE_CONVENTIONNELLE_REFORM_2026_EFFECTIVE_DATE
} from "@/lib/legal/rupture-conventionnelle";
import type {
  TerminationCalculationResult,
  TerminationCalculatorInput
} from "@/types/termination";

const baseInput: TerminationCalculatorInput = {
  startDate: "2021-01-01",
  ruptureDate: "2026-01-01",
  averageMonthlyGrossSalary: 3000,
  userProfile: "employee",
  retirementEligibility: "unknown"
};

describe("rupture conventionnelle calculator", () => {
  it("calcule l'ancienneté exacte entre deux dates", () => {
    const seniority = calculateSeniority("2020-01-15", "2026-04-20");

    expect(seniority.years).toBe(6);
    expect(seniority.remainingMonths).toBe(3);
    expect(seniority.remainingDays).toBe(5);
    expect(seniority.label).toBe("6 ans, 3 mois, 5 jours");
  });

  it("proratise les années incomplètes", () => {
    const oneAndHalfYears = 1.5;
    const indemnity = calculateMinimumGrossIndemnity(2400, oneAndHalfYears);

    expect(indemnity).toBe(900);
  });

  it("retient le salaire de référence le plus favorable", () => {
    const reference = calculateReferenceSalary({
      ...baseInput,
      averageMonthlyGrossSalary: 2600,
      averageLast3MonthsGrossSalary: 3200,
      averageLast12MonthsGrossSalary: 3000
    });

    expect(reference.amount).toBe(3200);
    expect(reference.source).toBe("Moyenne brute des 3 derniers mois");
  });

  it("calcule une ancienneté inférieure à 1 an avec proratisation", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      startDate: "2025-07-01",
      ruptureDate: "2026-01-01",
      averageMonthlyGrossSalary: 2400
    });

    expect(result.seniority.years).toBe(0);
    expect(result.seniority.remainingMonths).toBe(6);
    expect(result.minimumGrossIndemnity).toBeCloseTo(300, 0);
  });

  it("rejette une date de rupture antérieure à la date d'entrée", () => {
    expect(() =>
      calculateTerminationConventionnelle({
        ...baseInput,
        startDate: "2026-01-01",
        ruptureDate: "2025-12-31"
      })
    ).toThrow("La date de rupture doit être postérieure à la date d'entrée.");
  });

  it("rejette un salaire nul", () => {
    expect(() =>
      calculateTerminationConventionnelle({
        ...baseInput,
        averageMonthlyGrossSalary: 0
      })
    ).toThrow("Renseignez au moins un salaire brut mensuel.");
  });

  it("rejette un salaire négatif", () => {
    expect(() =>
      calculateTerminationConventionnelle({
        ...baseInput,
        averageMonthlyGrossSalary: -1200
      })
    ).toThrow("Renseignez au moins un salaire brut mensuel.");
  });

  it("calcule le montant retenu quand le montant négocié est absent", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      negotiatedGrossIndemnity: undefined
    });

    expect(result.negotiatedGrossIndemnity).toBeUndefined();
    expect(result.retainedGrossIndemnity).toBe(result.minimumGrossIndemnity);
  });

  it("retient la moyenne 3 mois si elle est supérieure au salaire moyen", () => {
    const reference = calculateReferenceSalary({
      ...baseInput,
      averageMonthlyGrossSalary: 2800,
      averageLast3MonthsGrossSalary: 3500
    });

    expect(reference.amount).toBe(3500);
    expect(reference.source).toBe("Moyenne brute des 3 derniers mois");
  });

  it("retient la moyenne 12 mois si elle est supérieure au salaire moyen", () => {
    const reference = calculateReferenceSalary({
      ...baseInput,
      averageMonthlyGrossSalary: 2800,
      averageLast12MonthsGrossSalary: 3300
    });

    expect(reference.amount).toBe(3300);
    expect(reference.source).toBe("Moyenne brute des 12 derniers mois");
  });

  it("conserve le calcul standard quand aucune absence n'est déclarée", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      averageMonthlyGrossSalary: 2800,
      averageLast3MonthsGrossSalary: 3200,
      absenceImpact: "no",
      usualGrossMonthlySalaryBeforeAbsence: 4000
    });

    expect(result.referenceSalary).toBe(3200);
    expect(result.absenceApplied).toBe(false);
    expect(result.salaryReferenceReason).toBe("moyenne 3 mois");
  });

  it("ajuste le salaire de référence si le salaire avant absence est plus favorable", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      averageMonthlyGrossSalary: 2400,
      averageLast3MonthsGrossSalary: 2300,
      averageLast12MonthsGrossSalary: 2500,
      absenceImpact: "yes",
      absenceType: "sick_leave",
      usualGrossMonthlySalaryBeforeAbsence: 3200
    });

    expect(result.referenceSalary).toBe(3200);
    expect(result.absenceApplied).toBe(true);
    expect(result.absenceType).toBe("sick_leave");
    expect(result.salaryReferenceBeforeAbsence).toBe(3200);
    expect(result.salaryReferenceReason).toBe("salaire habituel avant absence");
  });

  it("conserve le salaire standard si le salaire avant absence est inférieur", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      averageMonthlyGrossSalary: 3000,
      averageLast3MonthsGrossSalary: 3100,
      absenceImpact: "yes",
      absenceType: "therapeutic_part_time",
      usualGrossMonthlySalaryBeforeAbsence: 2800
    });

    expect(result.referenceSalary).toBe(3100);
    expect(result.absenceApplied).toBe(false);
    expect(result.salaryReferenceBeforeAbsence).toBe(2800);
    expect(result.salaryReferenceReason).toBe("moyenne 3 mois");
  });

  it("conserve le calcul standard si une absence est déclarée sans salaire habituel", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      averageMonthlyGrossSalary: 3000,
      absenceImpact: "yes",
      absenceType: "sick_leave"
    });

    expect(result.referenceSalary).toBe(3000);
    expect(result.absenceApplied).toBe(false);
    expect(result.salaryReferenceBeforeAbsence).toBeUndefined();
    expect(result.detailLines).toContain(
      "Vous avez indiqué une absence, mais aucun salaire habituel avant absence n'a été renseigné. Le simulateur conserve donc le calcul standard."
    );
  });

  it("déduit la période réelle d'absence de l'ancienneté retenue", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      startDate: "2021-01-01",
      ruptureDate: "2026-01-01",
      averageMonthlyGrossSalary: 3000,
      absenceImpact: "yes",
      absenceType: "sick_leave",
      absenceStartDate: "2024-01-01",
      absenceEndDate: "2025-01-01"
    });

    expect(result.absenceSeniorityDeductedDays).toBe(366);
    expect(result.seniority.decimalYears).toBeCloseTo(4, 1);
    expect(result.minimumGrossIndemnity).toBeCloseTo(3000, 0);
    expect(result.detailLines).toContain(
      "Absences déduites : 366 jours."
    );
  });

  it("utilise la date de rupture comme fin d'absence si la fin n'est pas renseignée", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      startDate: "2021-01-01",
      ruptureDate: "2026-01-01",
      averageMonthlyGrossSalary: 3000,
      absenceImpact: "yes",
      absenceType: "sick_leave",
      absenceStartDate: "2025-07-01"
    });

    expect(result.absenceSeniorityDeductedDays).toBe(184);
    expect(result.minimumGrossIndemnity).toBeLessThan(3750);
  });

  it("expose la raison du salaire de référence", () => {
    expect(
      calculateTerminationConventionnelle({
        ...baseInput,
        averageMonthlyGrossSalary: 2800
      }).salaryReferenceReason
    ).toBe("salaire moyen");

    expect(
      calculateTerminationConventionnelle({
        ...baseInput,
        averageMonthlyGrossSalary: 2800,
        averageLast12MonthsGrossSalary: 3300
      }).salaryReferenceReason
    ).toBe("moyenne 12 mois");
  });

  it("calcule l'indemnité minimale sous 10 ans", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      startDate: "2022-01-01",
      ruptureDate: "2026-01-01",
      averageMonthlyGrossSalary: 3000
    });

    expect(result.minimumGrossIndemnity).toBeCloseTo(3000, 0);
  });

  it("calcule l'indemnité minimale au-delà de 10 ans", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      startDate: "2011-01-01",
      ruptureDate: "2026-01-01",
      averageMonthlyGrossSalary: 3000
    });

    expect(result.minimumGrossIndemnity).toBeCloseTo(12500, 0);
  });

  it("retient le minimum si le montant négocié est inférieur", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      negotiatedGrossIndemnity: 1000
    });

    expect(result.negotiatedBelowMinimum).toBe(true);
    expect(result.retainedGrossIndemnity).toBe(result.minimumGrossIndemnity);
  });

  it("retient le montant négocié s'il est supérieur au minimum", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      negotiatedGrossIndemnity: 8000
    });

    expect(result.negotiatedBelowMinimum).toBe(false);
    expect(result.retainedGrossIndemnity).toBe(8000);
  });

  it("estime un net indicatif simplifié", () => {
    expect(estimateNetFromGrossIndemnity(10000)).toBe(7800);
  });

  it("applique une contribution employeur de 30 % avant 2026", () => {
    const contribution = calculateEmployerContribution({
      indemnityAmount: 3000,
      exemptSocialSecurityAmount: 3000,
      ruptureDate: "2025-12-31"
    });

    expect(getEmployerContributionRate("2025-12-31")).toBe(
      RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_BEFORE_2026
    );
    expect(contribution.contributionRate).toBe(0.3);
    expect(contribution.employerContribution).toBe(900);
    expect(contribution.totalEmployerCost).toBe(3900);
  });

  it("applique une contribution employeur de 40 % à partir du 1er janvier 2026", () => {
    const contribution = calculateEmployerContribution({
      indemnityAmount: 3000,
      exemptSocialSecurityAmount: 3000,
      ruptureDate: RUPTURE_CONVENTIONNELLE_REFORM_2026_EFFECTIVE_DATE
    });

    expect(getEmployerContributionRate("2026-01-01")).toBe(
      RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_FROM_2026
    );
    expect(contribution.contributionRate).toBe(0.4);
    expect(contribution.employerContribution).toBe(1200);
    expect(contribution.totalEmployerCost).toBe(4200);
  });

  it("conserve la même indemnité salarié avant et après la réforme à ancienneté identique", () => {
    const beforeReform = calculateTerminationConventionnelle({
      ...baseInput,
      startDate: "2020-12-31",
      ruptureDate: "2025-12-31",
      averageMonthlyGrossSalary: 3000
    });
    const fromReform = calculateTerminationConventionnelle({
      ...baseInput,
      startDate: "2021-01-01",
      ruptureDate: "2026-01-01",
      averageMonthlyGrossSalary: 3000
    });

    expect(beforeReform.minimumGrossIndemnity).toBe(fromReform.minimumGrossIndemnity);
    expect(beforeReform.retainedGrossIndemnity).toBe(fromReform.retainedGrossIndemnity);
    expect(beforeReform.employerContributionAmount).toBe(1125);
    expect(fromReform.employerContributionAmount).toBe(1500);
  });

  it("gère une date de rupture invalide ou absente sans crash", () => {
    const invalidDate = calculateEmployerContribution({
      indemnityAmount: 3000,
      ruptureDate: "date-invalide"
    });
    const missingDate = calculateEmployerContribution({
      indemnityAmount: 3000
    });

    expect(invalidDate.usedFallbackDate).toBe(true);
    expect(invalidDate.contributionRate).toBe(
      RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_FROM_2026
    );
    expect(missingDate.usedFallbackDate).toBe(true);
    expect(missingDate.totalEmployerCost).toBe(4200);
  });

  it("gère défensivement les montants nuls ou négatifs", () => {
    expect(
      calculateEmployerContribution({
        indemnityAmount: 0,
        ruptureDate: "2026-01-01"
      }).totalEmployerCost
    ).toBe(0);
    expect(
      calculateEmployerContribution({
        indemnityAmount: -3000,
        ruptureDate: "2026-01-01"
      }).employerContribution
    ).toBe(0);
    expect(calculateTotalEmployerCost({ indemnityAmount: -3000, employerContribution: -200 })).toBe(
      0
    );
  });

  it("ignore défensivement une assiette exonérée explicite négative", () => {
    const contribution = calculateEmployerContribution({
      indemnityAmount: 3000,
      exemptSocialSecurityAmount: -500,
      ruptureDate: "2026-01-01"
    });

    expect(contribution.contributionBase).toBe(0);
    expect(contribution.employerContribution).toBe(0);
    expect(contribution.totalEmployerCost).toBe(3000);
  });

  it("utilise le minimum calculé comme base indicative si l'assiette exonérée n'est pas calculée", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      negotiatedGrossIndemnity: 8000
    });

    expect(result.retainedGrossIndemnity).toBe(8000);
    expect(result.employerContributionBase).toBe(result.minimumGrossIndemnity);
    expect(result.employerContributionBaseIsIndicative).toBe(true);
    expect(result.employerContributionAmount).toBe(1500);
    expect(result.totalEmployerCost).toBe(9500);
  });

  it("conserve le calcul légal quand aucune convention collective n'est renseignée", () => {
    const result = calculateTerminationConventionnelle(baseInput);

    expect(result.retainedGrossIndemnity).toBe(result.minimumGrossIndemnity);
    expect(result.collectiveAgreementIdcc).toBeUndefined();
    expect(result.collectiveAgreementMessage).toBe(
      "Convention collective : non renseignée. Le calcul utilise uniquement la règle légale minimale."
    );
  });

  it("conserve le calcul légal pour une convention sans règle spécifique codée", () => {
    const standardResult = calculateTerminationConventionnelle(baseInput);
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      collectiveAgreement: "1486"
    });

    expect(result.retainedGrossIndemnity).toBe(standardResult.retainedGrossIndemnity);
    expect(result.collectiveAgreementIdcc).toBe("1486");
    expect(result.collectiveAgreementStatus).toBe("legal_only");
    expect(result.collectiveAgreementMessage).toContain(
      "aucune règle spécifique à cette convention n'est encore appliquée"
    );
  });

  it("conserve le calcul légal et expose un avertissement pour une convention inconnue", () => {
    const standardResult = calculateTerminationConventionnelle(baseInput);
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      collectiveAgreement: "9998"
    });

    expect(result.retainedGrossIndemnity).toBe(standardResult.retainedGrossIndemnity);
    expect(result.collectiveAgreementWarning).toBe(
      "Convention collective inconnue. Le calcul utilise uniquement la règle légale minimale."
    );
  });

  it("permet de tester une future convention avec règle spécifique documentée", () => {
    const baseResult = calculateTerminationConventionnelle(baseInput);
    const result = applyCollectiveAgreementRules(
      baseResult,
      {
        ...baseInput,
        collectiveAgreement: "9999"
      },
      {
        agreements: [
          {
            idcc: "9999",
            slug: "test-convention",
            name: "Convention de test",
            status: "specific_rules_available"
          }
        ],
        rules: {
          "9999": (currentResult: TerminationCalculationResult) => ({
            ...currentResult,
            minimumGrossIndemnity: currentResult.minimumGrossIndemnity + 1
          })
        }
      }
    );

    expect(result.minimumGrossIndemnity).toBe(baseResult.minimumGrossIndemnity + 1);
    expect(result.collectiveAgreementSpecificRuleApplied).toBe(true);
    expect(result.collectiveAgreementStatus).toBe("specific_rules_available");
  });

  it("garde le menu convention collective dans les options avancées", () => {
    const source = readFileSync(
      join(process.cwd(), "components/tools/TerminationCalculatorTool.tsx"),
      "utf8"
    );

    expect(source.indexOf("Options avancées")).toBeLessThan(
      source.indexOf("Convention collective")
    );
    expect(source).toContain("id=\"collectiveAgreement\"");
    expect(source).toContain("<select");
  });

  it("affiche le bloc coût employeur sans masquer le résultat salarié", () => {
    const source = readFileSync(
      join(process.cwd(), "components/tools/TerminationCalculatorTool.tsx"),
      "utf8"
    );

    expect(source).toContain("Indemnité minimale estimée");
    expect(source).toContain("Coût employeur estimé");
    expect(source).toContain("Contribution patronale 2026");
    expect(source).toContain("Contribution patronale avant 2026");
    expect(source).toContain("réduit pas l&apos;indemnité");
    expect(source).toContain("minimale due au salarié.");
  });

  it("donne le même minimum légal pour cadre et non-cadre hors convention spécifique", () => {
    const cadre = calculateTerminationConventionnelle({
      ...baseInput,
      employmentStatus: "cadre"
    });
    const nonCadre = calculateTerminationConventionnelle({
      ...baseInput,
      employmentStatus: "non-cadre"
    });

    expect(cadre.minimumGrossIndemnity).toBe(nonCadre.minimumGrossIndemnity);
    expect(cadre.retainedGrossIndemnity).toBe(nonCadre.retainedGrossIndemnity);
  });

  it("expose le statut dans le résultat et le résumé", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      employmentStatus: "cadre"
    });

    expect(result.employmentStatus).toBe("cadre");
    expect(result.employeeSummary).toContain("cadre");
  });

  it("affiche un message explicatif sur le statut cadre ou non-cadre", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      employmentStatus: "non-cadre"
    });

    expect(result.employmentStatusMessage).toContain(
      "ne modifie pas à lui seul le minimum légal"
    );
    expect(result.detailLines).toContain(result.employmentStatusMessage);
  });

  it("ne déduit pas une absence accident du travail ou maladie professionnelle", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      absenceImpact: "yes",
      absenceType: "occupational_accident",
      absenceStartDate: "2024-01-01",
      absenceEndDate: "2025-01-01"
    });

    expect(result.absenceSeniorityDeductedDays).toBe(0);
    expect(result.absenceRulesApplied[0]?.seniorityTreatment).toBe("fully_counted");
    expect(result.minimumGrossIndemnity).toBeCloseTo(3750, 0);
  });

  it("ne déduit pas un congé maternité", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      absenceImpact: "yes",
      absenceType: "maternity_leave",
      absenceStartDate: "2024-01-01",
      absenceEndDate: "2025-01-01"
    });

    expect(result.absenceSeniorityDeductedDays).toBe(0);
    expect(result.absenceRulesApplied[0]?.seniorityTreatment).toBe("fully_counted");
  });

  it("déduit 50 % d'un congé parental à temps plein", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      absenceImpact: "yes",
      absenceType: "parental_full_time",
      absenceStartDate: "2024-01-01",
      absenceEndDate: "2025-01-01"
    });

    expect(result.absenceSeniorityDeductedDays).toBe(183);
    expect(result.absenceRulesApplied[0]?.seniorityTreatment).toBe("half_counted");
  });

  it("déduit un congé sabbatique ou congé sans solde", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      absenceImpact: "yes",
      absenceType: "unpaid_leave",
      absenceStartDate: "2024-01-01",
      absenceEndDate: "2025-01-01"
    });

    expect(result.absenceSeniorityDeductedDays).toBe(366);
    expect(result.absenceRulesApplied[0]?.salaryReferenceTreatment).toBe("manual_review");
    expect(result.warnings.some((warning) => warning.includes("salaire de référence"))).toBe(true);
  });

  it("ne modifie pas automatiquement l'ancienneté pour une autre absence et affiche un warning", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      absenceImpact: "yes",
      absenceType: "other",
      absenceStartDate: "2024-01-01",
      absenceEndDate: "2025-01-01"
    });

    expect(result.absenceSeniorityDeductedDays).toBe(0);
    expect(result.absenceRulesApplied[0]?.seniorityTreatment).toBe("manual_review");
    expect(result.warnings.some((warning) => warning.includes("Type d'absence à vérifier"))).toBe(
      true
    );
  });

  it("utilise le salaire avant temps partiel thérapeutique s'il est plus favorable", () => {
    const result = calculateTerminationConventionnelle({
      ...baseInput,
      averageMonthlyGrossSalary: 2200,
      absenceImpact: "yes",
      absenceType: "therapeutic_part_time",
      absenceStartDate: "2025-01-01",
      absenceEndDate: "2025-06-01",
      usualGrossMonthlySalaryBeforeAbsence: 3200
    });

    expect(result.absenceSeniorityDeductedDays).toBe(0);
    expect(result.referenceSalary).toBe(3200);
    expect(result.salaryReferenceAdjustedForAbsence).toBe(true);
  });

  it("produit une fourchette indicative distincte du minimum légal sans montant négocié", () => {
    const range = calculateIndicativeNegotiationRange({
      minimumGrossIndemnity: 3750,
      referenceSalary: 3000,
      seniorityYears: 5
    });

    expect(range.low).toBe(3750);
    expect(range.high).toBeGreaterThan(range.low);
    expect(range.explanation).toContain("ne constitue pas une règle juridique");
  });

  it("utilise le montant négocié comme borne haute s'il est supérieur au minimum", () => {
    const range = calculateIndicativeNegotiationRange({
      minimumGrossIndemnity: 3750,
      negotiatedGrossIndemnity: 5200,
      referenceSalary: 3000,
      seniorityYears: 5
    });

    expect(range.low).toBe(3750);
    expect(range.high).toBe(5200);
    expect(range.explanation).toContain("montant négocié renseigné");
  });
});
