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
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;
const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-P9XX929G";
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-HDDQ9CV6YQ";

export function isGoogleTagManagerReady(): boolean {
  return GTM_ID_PATTERN.test(GTM_ID);
}

export function isGoogleAnalyticsReady(): boolean {
  return GA_MEASUREMENT_ID_PATTERN.test(GA_MEASUREMENT_ID);
}

export function trackCalculatorEvent(
  name: CalculatorEventName,
  payload: CalculatorEventPayload
) {
  if (typeof window === "undefined") {
    return;
  }

  if (isGoogleTagManagerReady()) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: name,
      event_category: "calculator",
      ...payload
    } satisfies DataLayerEvent);
  }

  if (isGoogleAnalyticsReady() && typeof window.gtag === "function") {
    window.gtag("event", name, {
      event_category: "calculator",
      ...payload
    });
  }
}
