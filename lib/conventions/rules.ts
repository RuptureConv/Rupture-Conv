import {
  collectiveAgreements,
  findCollectiveAgreementByIdcc,
  type CollectiveAgreement
} from "@/lib/conventions/conventions";
import type {
  TerminationCalculatorInput,
  TerminationCalculationResult
} from "@/types/termination";

type RuleHandler = (
  baseResult: TerminationCalculationResult,
  input: TerminationCalculatorInput,
  agreement: CollectiveAgreement
) => TerminationCalculationResult;

type ApplyOptions = {
  agreements?: CollectiveAgreement[];
  rules?: Partial<Record<string, RuleHandler>>;
};

const collectiveAgreementRuleHandlers: Partial<Record<string, RuleHandler>> = {};

function getProfileGuidance(input: TerminationCalculatorInput): string {
  return input.userProfile === "employer"
    ? "La convention collective peut modifier l'enveloppe minimale à prévoir."
    : "Votre convention collective peut parfois prévoir une indemnité plus favorable que le minimum légal.";
}

function appendConventionDetails(
  result: TerminationCalculationResult,
  input: TerminationCalculatorInput,
  details: string[],
  warnings: string[] = []
): TerminationCalculationResult {
  return {
    ...result,
    detailLines: [...result.detailLines, ...details, getProfileGuidance(input)],
    warnings: [...new Set([...result.warnings, ...warnings])]
  };
}

export function applyCollectiveAgreementRules(
  baseResult: TerminationCalculationResult,
  input: TerminationCalculatorInput,
  options: ApplyOptions = {}
): TerminationCalculationResult {
  const agreements = options.agreements ?? collectiveAgreements;
  const rules = options.rules ?? collectiveAgreementRuleHandlers;

  if (!input.collectiveAgreement) {
    const message =
      "Convention collective : non renseignée. Le calcul utilise uniquement la règle légale minimale.";

    return appendConventionDetails(
      {
        ...baseResult,
        collectiveAgreementMessage: message
      },
      input,
      [message]
    );
  }

  const selectedAgreement =
    agreements.find(
      (agreement) => agreement.idcc === input.collectiveAgreement?.padStart(4, "0")
    ) ?? findCollectiveAgreementByIdcc(input.collectiveAgreement);

  if (!selectedAgreement) {
    const message =
      "Convention collective inconnue. Le calcul utilise uniquement la règle légale minimale.";

    return appendConventionDetails(
      {
        ...baseResult,
        collectiveAgreementMessage: message,
        collectiveAgreementWarning: message
      },
      input,
      [message]
    );
  }

  const displayName = selectedAgreement.shortName
    ? `${selectedAgreement.shortName} - ${selectedAgreement.name}`
    : selectedAgreement.name;

  if (selectedAgreement.status === "legal_only") {
    const message = `Convention collective sélectionnée : ${displayName}. Dans cette version, aucune règle spécifique à cette convention n'est encore appliquée. Le résultat reste basé sur le minimum légal.`;
    const statusMessage =
      "Convention collective sélectionnée, mais aucune règle spécifique cadre/non-cadre n'est encore appliquée dans cette version.";

    return appendConventionDetails(
      {
        ...baseResult,
        collectiveAgreementIdcc: selectedAgreement.idcc,
        collectiveAgreementName: displayName,
        collectiveAgreementStatus: selectedAgreement.status,
        collectiveAgreementMessage: `${message} ${statusMessage}`
      },
      input,
      [message, statusMessage]
    );
  }

  const handler = rules[selectedAgreement.idcc];

  if (!handler) {
    const message = `Convention collective sélectionnée : ${displayName}. Une règle spécifique est prévue dans l'architecture, mais aucune règle documentée n'est activée dans cette version.`;

    return appendConventionDetails(
      {
        ...baseResult,
        collectiveAgreementIdcc: selectedAgreement.idcc,
        collectiveAgreementName: displayName,
        collectiveAgreementStatus: selectedAgreement.status,
        collectiveAgreementMessage: message,
        collectiveAgreementWarning: message
      },
      input,
      [message]
    );
  }

  const result = handler(baseResult, input, selectedAgreement);
  const message = `Convention collective sélectionnée : ${displayName}. Une règle spécifique documentée a été appliquée.`;

  return appendConventionDetails(
    {
      ...result,
      collectiveAgreementIdcc: selectedAgreement.idcc,
      collectiveAgreementName: displayName,
      collectiveAgreementStatus: selectedAgreement.status,
      collectiveAgreementMessage: message,
      collectiveAgreementSpecificRuleApplied: true
    },
    input,
    [message]
  );
}
