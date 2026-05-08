type CalculatorEventName =
  | "simulation_started"
  | "result_viewed"
  | "result_copied";

type CalculatorEventPayload = {
  source: "termination_calculator";
  seniorityYears?: number;
  referenceSalary?: number;
  retainedGrossIndemnity?: number;
  estimatedNetIndemnity?: number;
};

type DataLayerEvent = {
  event: string;
  [key: string]: string | number | undefined;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-P9XX929G";

export function isGoogleTagManagerReady(): boolean {
  return GTM_ID.startsWith("GTM-");
}

export function trackCalculatorEvent(
  name: CalculatorEventName,
  payload: CalculatorEventPayload
) {
  if (!isGoogleTagManagerReady() || typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    event_category: "calculator",
    ...payload
  });
}
