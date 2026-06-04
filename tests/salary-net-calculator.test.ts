import { describe, expect, it } from "vitest";
import { calculateSalaryNet, validateSalaryNetInput } from "@/lib/calculators/salary-net";

describe("salary net calculator", () => {
  it("converts 2 000 € gross monthly for a private non-executive employee", () => {
    const result = calculateSalaryNet({
      grossAmount: 2000,
      period: "monthly",
      profile: "privateNonExecutive"
    });

    expect(result.grossMonthly).toBe(2000);
    expect(result.netBeforeTaxMonthly).toBe(1560);
    expect(result.netBeforeTaxAnnual).toBe(18720);
    expect(result.estimatedContributionsMonthly).toBe(440);
  });

  it("converts 2 500 € gross monthly for a private executive employee", () => {
    const result = calculateSalaryNet({
      grossAmount: 2500,
      period: "monthly",
      profile: "privateExecutive"
    });

    expect(result.netBeforeTaxMonthly).toBe(1875);
    expect(result.contributionRate).toBe(0.25);
  });

  it("converts 35 000 € gross annual to monthly net", () => {
    const result = calculateSalaryNet({
      grossAmount: 35000,
      period: "annual",
      profile: "privateNonExecutive"
    });

    expect(result.grossMonthly).toBe(2916.67);
    expect(result.netBeforeTaxMonthly).toBe(2275);
    expect(result.netBeforeTaxAnnual).toBe(27300);
  });

  it("converts 15 € gross hourly on a 35h full-time basis", () => {
    const result = calculateSalaryNet({
      grossAmount: 15,
      period: "hourly",
      profile: "privateNonExecutive"
    });

    expect(result.monthlyHours).toBe(151.67);
    expect(result.grossMonthly).toBe(2275);
    expect(result.netBeforeTaxHourly).toBe(11.7);
  });

  it("converts 2 200 € gross monthly for public sector", () => {
    const result = calculateSalaryNet({
      grossAmount: 2200,
      period: "monthly",
      profile: "publicSector"
    });

    expect(result.netBeforeTaxMonthly).toBe(1837);
    expect(result.estimatedContributionsMonthly).toBe(363);
  });

  it("applies a 5% withholding tax rate", () => {
    const result = calculateSalaryNet({
      grossAmount: 2500,
      period: "monthly",
      profile: "privateNonExecutive",
      withholdingTaxRate: 5
    });

    expect(result.netBeforeTaxMonthly).toBe(1950);
    expect(result.netAfterTaxMonthly).toBe(1852.5);
  });

  it("validates incoherent values", () => {
    expect(
      validateSalaryNetInput({
        grossAmount: -1,
        period: "monthly",
        profile: "privateNonExecutive",
        weeklyHours: 90,
        withholdingTaxRate: 120
      })
    ).toHaveLength(3);
  });
});
