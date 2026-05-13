type CalculatorEventName =
  | "simulation_started"
  | "result_viewed"
  | "result_copied"
  | "simulateur_cta_click";

type CalculatorEventPayload = {
  source: "termination_calculator" | "seo_cta";
  seniorityYears?: number;
  referenceSalary?: number;
  retainedGrossIndemnity?: number;
  estimatedNetIndemnity?: number;
  button_text?: string;
  button_type?: string;
  page_location?: string;
  page_title?: string;
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
