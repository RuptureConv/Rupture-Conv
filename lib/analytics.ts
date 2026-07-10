type CalculatorType = "termination" | "unemployment" | "salary_net";

type CalculatorResultViewedPayload = {
  calculator_type: CalculatorType;
  location: string;
  result_type: "estimate" | "projection";
};

type CalculatorActionPayload = {
  calculator_type: CalculatorType;
  location: string;
};

type InternalLinkEventName = "post_simulation_click" | "tool_crosslink_click";

type InternalLinkEventPayload = {
  source_tool: string;
  target_page: string;
  link_label: string;
  location: string;
};

type SimulatorNextStepPayload = {
  calculator_type: CalculatorType;
  step: string;
  location: string;
};

type TemplateActionPayload = {
  template_type: "termination_request_letter";
  action: "copy" | "download_pdf" | "print";
  location: string;
};

type ToolCrosslinkPayload = {
  source_page: string;
  target_tool: string;
  link_label: string;
  location: string;
};

type AnalyticsPayload = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-P9XX929G";
export const OPEN_ANALYTICS_CONSENT_EVENT = "ruptureconv:open-consent";

export function isGoogleTagManagerReady(): boolean {
  return GTM_ID_PATTERN.test(GTM_ID);
}

function sendAnalyticsEvent(
  name: string,
  eventCategory: string,
  payload: AnalyticsPayload
) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = {
    event_category: eventCategory,
    ...payload
  };

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, eventPayload);
      return;
    }

    if (isGoogleTagManagerReady() && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...eventPayload });
    }
  } catch {
    // Analytics must never interrupt a calculation, action or navigation.
  }
}

export function trackCalculatorResultViewed(
  payload: CalculatorResultViewedPayload
) {
  sendAnalyticsEvent("calculator_result_viewed", "calculator", payload);
}

export function trackCalculatorAction(
  name: "result_copied",
  payload: CalculatorActionPayload
) {
  sendAnalyticsEvent(name, "calculator", payload);
}

export function trackInternalLinkClick(
  name: InternalLinkEventName,
  payload: InternalLinkEventPayload
) {
  sendAnalyticsEvent(name, "internal_link", payload);
}

export function trackSimulatorNextStepClick(payload: SimulatorNextStepPayload) {
  sendAnalyticsEvent("simulator_next_step_click", "calculator", payload);
}

export function trackTemplateActionClick(payload: TemplateActionPayload) {
  sendAnalyticsEvent("template_action_click", "template", payload);
}

export function trackToolCrosslinkClick(payload: ToolCrosslinkPayload) {
  sendAnalyticsEvent("tool_crosslink_click", "internal_link", payload);
}
