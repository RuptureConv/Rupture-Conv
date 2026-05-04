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

export function trackCalculatorEvent(
  name: CalculatorEventName,
  payload: CalculatorEventPayload
) {
  void name;
  void payload;
  // Placeholder volontairement sans service externe.
  // Brancher ici analytics, CMP et consentement quand la stack tracking sera choisie.
}
