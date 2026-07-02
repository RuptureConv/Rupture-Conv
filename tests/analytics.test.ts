import { afterEach, describe, expect, it, vi } from "vitest";
import {
  trackCalculatorResultViewed,
  trackSimulatorNextStepClick,
  trackTemplateActionClick
} from "@/lib/analytics";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("analytics helpers", () => {
  it("reste silencieux pendant le rendu serveur", () => {
    vi.stubGlobal("window", undefined);

    expect(() =>
      trackCalculatorResultViewed({
        calculator_type: "termination",
        result_type: "estimate",
        location: "termination_result"
      })
    ).not.toThrow();
  });

  it("reste silencieux si gtag et dataLayer sont absents", () => {
    vi.stubGlobal("window", {});

    expect(() =>
      trackCalculatorResultViewed({
        calculator_type: "salary_net",
        result_type: "estimate",
        location: "salary_result"
      })
    ).not.toThrow();
  });

  it("envoie uniquement les paramètres génériques du résultat", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });

    trackCalculatorResultViewed({
      calculator_type: "unemployment",
      result_type: "projection",
      location: "unemployment_projection"
    });

    expect(gtag).toHaveBeenCalledWith("event", "calculator_result_viewed", {
      event_category: "calculator",
      calculator_type: "unemployment",
      result_type: "projection",
      location: "unemployment_projection"
    });

    const sentParameters = JSON.stringify(gtag.mock.calls);
    for (const sensitiveKey of [
      "salary",
      "indemnity",
      "amount",
      "age",
      "seniority",
      "email",
      "phone"
    ]) {
      expect(sentParameters).not.toContain(sensitiveKey);
    }
  });

  it("utilise dataLayer comme repli sans doubler un envoi gtag", () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal("window", { dataLayer });

    trackSimulatorNextStepClick({
      calculator_type: "unemployment",
      step: "results",
      location: "unemployment_simulator"
    });

    expect(dataLayer).toEqual([
      {
        event: "simulator_next_step_click",
        event_category: "calculator",
        calculator_type: "unemployment",
        step: "results",
        location: "unemployment_simulator"
      }
    ]);
  });

  it("ne bloque pas une action si gtag lève une exception", () => {
    vi.stubGlobal("window", {
      gtag: vi.fn(() => {
        throw new Error("gtag unavailable");
      })
    });

    expect(() =>
      trackTemplateActionClick({
        template_type: "termination_request_letter",
        action: "copy",
        location: "letter_toolbar"
      })
    ).not.toThrow();
  });
});
