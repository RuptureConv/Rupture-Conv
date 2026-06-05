import { describe, expect, it } from "vitest";
import {
  calculateUnemploymentProjection,
  type UnemploymentProjectionInput
} from "@/lib/calculators/unemployment-projection";

const baseInput: UnemploymentProjectionInput = {
  age: 38,
  averageMonthlyGrossSalary: 2500,
  contractEndDate: "2026-07-31",
  exitMode: "rupture_conventionnelle",
  workedDays: 520,
  workedHours: 3640,
  seniorityYears: 6,
  workTime: "full_time",
  supraLegalIndemnity: 0,
  paidLeaveDays: 0
};

describe("unemployment projection calculator", () => {
  it("estime une rupture conventionnelle avec éligibilité probable", () => {
    const result = calculateUnemploymentProjection(baseInput);

    expect(result.eligibility.status).toBe("probable");
    expect(result.salary.monthlyGrossAre).toBeGreaterThan(0);
    expect(result.projection.terminationIndemnity).toBeGreaterThan(0);
    expect(result.waitingPeriods.legalWaitingDays).toBe(7);
  });

  it("estime un licenciement avec allocation et différés", () => {
    const result = calculateUnemploymentProjection({
      ...baseInput,
      exitMode: "licenciement",
      legalTerminationIndemnity: 3000,
      supraLegalIndemnity: 1500,
      paidLeaveDays: 8
    });

    expect(result.eligibility.status).toBe("probable");
    expect(result.projection.terminationIndemnity).toBe(4500);
    expect(result.waitingPeriods.paidLeaveDeferredDays).toBeGreaterThan(0);
    expect(result.waitingPeriods.specificDeferredDays).toBeGreaterThan(0);
  });

  it("marque une démission classique comme non automatique", () => {
    const result = calculateUnemploymentProjection({
      ...baseInput,
      exitMode: "demission"
    });

    expect(result.eligibility.status).toBe("not_automatic");
    expect(result.decision.level).toBe("unfavorable");
    expect(result.eligibility.reasons.join(" ")).toContain("121 jours");
  });

  it("gère un senior de 55 ans sans dégressivité", () => {
    const result = calculateUnemploymentProjection({
      ...baseInput,
      age: 55,
      averageMonthlyGrossSalary: 6500
    });

    expect(result.eligibility.lookbackMonths).toBe(36);
    expect(result.duration.ageBand).toBe("55 ans");
    expect(result.duration.degressivityApplies).toBe(false);
  });

  it("gère un senior de 57 ans avec durée maximale supérieure", () => {
    const result = calculateUnemploymentProjection({
      ...baseInput,
      age: 57,
      workedDays: 1200
    });

    expect(result.duration.ageBand).toBe("57 ans et plus");
    expect(result.duration.maxDaysApplied).toBe(822);
  });

  it("plafonne un différé important", () => {
    const result = calculateUnemploymentProjection({
      ...baseInput,
      supraLegalIndemnity: 50000,
      paidLeaveDays: 60
    });

    expect(result.waitingPeriods.specificDeferredDays).toBe(150);
    expect(result.waitingPeriods.paidLeaveDeferredDays).toBeLessThanOrEqual(30);
  });

  it("donne une estimation pour faible salaire", () => {
    const result = calculateUnemploymentProjection({
      ...baseInput,
      averageMonthlyGrossSalary: 1500
    });

    expect(result.salary.monthlyNetAre).toBeGreaterThan(0);
    expect(result.salary.formulaA).toBeGreaterThan(result.salary.formulaB);
  });

  it("gère un haut salaire avec dégressivité potentielle avant 55 ans", () => {
    const result = calculateUnemploymentProjection({
      ...baseInput,
      age: 45,
      averageMonthlyGrossSalary: 8000
    });

    expect(result.salary.monthlyGrossAre).toBeGreaterThan(3000);
    expect(result.duration.degressivityApplies).toBe(true);
  });
});
