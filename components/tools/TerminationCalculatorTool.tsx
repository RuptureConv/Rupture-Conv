"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { Disclaimer } from "@/components/Disclaimer";
import { PostSimulationLinks } from "@/components/seo/PostSimulationLinks";
import {
  calculateTerminationConventionnelle
} from "@/lib/calculators/rupture-conventionnelle";
import {
  trackCalculatorAction,
  trackCalculatorResultViewed
} from "@/lib/analytics";
import { absenceRules, getAbsenceRule } from "@/lib/calculators/absence-rules";
import { calculateIndicativeNegotiationRange } from "@/lib/calculators/negotiation-range";
import { collectiveAgreements } from "@/lib/conventions/conventions";
import { terminationNextStepLinks } from "@/lib/internal-tool-links";
import {
  RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_BEFORE_2026,
  RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_FROM_2026
} from "@/lib/legal/rupture-conventionnelle";
import { formatCurrency, formatNumber, formatPreciseCurrency } from "@/lib/utils/format";
import type {
  AbsenceImpact,
  AbsenceType,
  RetirementEligibility,
  TerminationCalculatorInput,
  UserProfile
} from "@/types/termination";

type FormState = {
  startDate: string;
  ruptureDate: string;
  averageMonthlyGrossSalary: string;
  userProfile: "employee" | "employer";
  retirementEligibility: RetirementEligibility;
  averageLast3MonthsGrossSalary: string;
  averageLast12MonthsGrossSalary: string;
  employmentStatus: "cadre" | "non-cadre";
  collectiveAgreement: string;
  absenceImpact: AbsenceImpact;
  absenceType: AbsenceType;
  absenceStartDate: string;
  absenceEndDate: string;
  usualGrossMonthlySalaryBeforeAbsence: string;
};

const initialFormState: FormState = {
  startDate: "2021-05-01",
  ruptureDate: "2026-05-04",
  averageMonthlyGrossSalary: "2800",
  userProfile: "employee",
  retirementEligibility: "unknown",
  averageLast3MonthsGrossSalary: "",
  averageLast12MonthsGrossSalary: "",
  employmentStatus: "non-cadre",
  collectiveAgreement: "",
  absenceImpact: "no",
  absenceType: "sick_leave",
  absenceStartDate: "",
  absenceEndDate: "",
  usualGrossMonthlySalaryBeforeAbsence: ""
};

function toOptionalNumber(value: string): number | undefined {
  if (!value.trim()) {
    return undefined;
  }

  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function toRequiredNumber(value: string): number {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildInput(form: FormState): TerminationCalculatorInput {
  return {
    startDate: form.startDate,
    ruptureDate: form.ruptureDate,
    averageMonthlyGrossSalary: toRequiredNumber(form.averageMonthlyGrossSalary),
    userProfile: form.userProfile,
    retirementEligibility: form.retirementEligibility,
    averageLast3MonthsGrossSalary: toOptionalNumber(form.averageLast3MonthsGrossSalary),
    averageLast12MonthsGrossSalary: toOptionalNumber(form.averageLast12MonthsGrossSalary),
    employmentStatus: form.employmentStatus,
    collectiveAgreement: form.collectiveAgreement || undefined,
    absenceImpact: form.absenceImpact,
    absenceType: form.absenceImpact === "yes" ? form.absenceType : undefined,
    absenceStartDate: form.absenceImpact === "yes" ? form.absenceStartDate : undefined,
    absenceEndDate: form.absenceImpact === "yes" ? form.absenceEndDate : undefined,
    usualGrossMonthlySalaryBeforeAbsence:
      form.absenceImpact === "yes"
        ? toOptionalNumber(form.usualGrossMonthlySalaryBeforeAbsence)
        : undefined
  };
}

function validateForm(form: FormState): string[] {
  const errors: string[] = [];
  const grossSalary = toRequiredNumber(form.averageMonthlyGrossSalary);

  if (!form.startDate) {
    errors.push("Ajoutez une date d'entrée.");
  }

  if (!form.ruptureDate) {
    errors.push("Ajoutez une date de rupture.");
  }

  if (form.startDate && form.ruptureDate && form.ruptureDate < form.startDate) {
    errors.push("La date de rupture doit être après la date d'entrée.");
  }

  if (!Number.isFinite(grossSalary) || grossSalary <= 0) {
    errors.push("Ajoutez un salaire supérieur à 0 €.");
  }

  for (const [label, value] of [
    ["moyenne brute des 3 derniers mois", form.averageLast3MonthsGrossSalary],
    ["moyenne brute des 12 derniers mois", form.averageLast12MonthsGrossSalary],
    ["salaire habituel avant absence", form.usualGrossMonthlySalaryBeforeAbsence]
  ] as const) {
    const parsed = toOptionalNumber(value);
    if (value.trim() && (!parsed || parsed < 0)) {
      errors.push(`Le champ ${label} doit être un montant positif.`);
    }
  }

  return errors;
}

function hasFieldError(errors: string[], patterns: string[]): boolean {
  return errors.some((error) => patterns.some((pattern) => error.includes(pattern)));
}

function getProfileCopy(profile: UserProfile) {
  if (profile === "employer") {
    return {
      formTitle: "Simulez l'indemnité à prévoir",
      resultLead: "Budget estimé pour une rupture conventionnelle",
      primaryAmountLabel: "Indemnité à prévoir",
      resultSubline: "Coût estimé",
      humanSummary: "Budget estimé à prévoir",
      negotiationTitle: "👉 Cadre de négociation employeur",
      rangeLabel: "Enveloppe indicative",
      rangeHelp:
        "Cette enveloppe donne un repère de discussion. Elle ne remplace pas une vérification paie, juridique ou conventionnelle.",
      prepTitle: "Préparer votre budget de négociation",
      prepText:
        "Gardez le minimum estimé, le salaire de référence et le brut retenu sous la main. Ces repères aident à préparer une discussion claire, sans constituer un conseil personnalisé.",
      copyIntro:
        "Voici mon estimation employeur de rupture conventionnelle réalisée sur rupture-conv.fr :"
    };
  }

  return {
    formTitle: "Simulez votre indemnité",
    resultLead: "Vous pouvez estimer environ",
    primaryAmountLabel: "Votre indemnité",
    resultSubline: "Ce que vous allez percevoir",
    humanSummary: "Vous pouvez demander environ",
    negotiationTitle: "👉 Ce que vous pouvez négocier",
    rangeLabel: "Fourchette indicative de discussion",
    rangeHelp:
      "Cette fourchette donne un repère prudent. Le montant dépend de votre situation, de votre ancienneté et du contexte de négociation.",
    prepTitle: "Préparer votre négociation",
    prepText:
      "Gardez le minimum estimé, le salaire de référence et le net indicatif sous la main. Ces repères aident à préparer une discussion claire, sans constituer un conseil personnalisé.",
    copyIntro:
      "Voici mon estimation de rupture conventionnelle réalisée sur rupture-conv.fr :"
  };
}

function getEmploymentStatusLabel(status: FormState["employmentStatus"]): string {
  return status === "cadre" ? "Cadre" : "Non-cadre";
}

function formatContributionRate(rate: number): string {
  return `${formatNumber(rate * 100, 0)} %`;
}

export function TerminationCalculatorTool() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [copied, setCopied] = useState(false);
  const hasInteracted = useRef(false);
  const hasTrackedResult = useRef(false);

  const errors = useMemo(() => validateForm(form), [form]);
  const result = useMemo(() => {
    if (errors.length > 0) {
      return null;
    }

    try {
      return calculateTerminationConventionnelle(buildInput(form));
    } catch {
      return null;
    }
  }, [errors, form]);
  const profileCopy = getProfileCopy(form.userProfile);
  const selectedAbsenceRule = getAbsenceRule(form.absenceType);
  const contributionRateBefore2026Label = formatContributionRate(
    RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_BEFORE_2026
  );
  const contributionRateFrom2026Label = formatContributionRate(
    RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_FROM_2026
  );

  useEffect(() => {
    if (!result || !hasInteracted.current || hasTrackedResult.current) {
      return;
    }

    const timeout = window.setTimeout(() => {
      hasTrackedResult.current = true;
      trackCalculatorResultViewed({
        calculator_type: "termination",
        result_type: "estimate",
        location: "termination_result"
      });
    }, 600);

    return () => window.clearTimeout(timeout);
  }, [form, result]);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    hasInteracted.current = true;
    setCopied(false);
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function copySummary() {
    if (!result) {
      return;
    }

    const summary = [
      profileCopy.copyIntro,
      "",
      `- Statut : ${getEmploymentStatusLabel(form.employmentStatus)}`,
      `- Ancienneté : ${result.seniority.label}`,
      `- Salaire de référence : ${formatPreciseCurrency(result.referenceSalary)}`,
      `- Indemnité brute minimale : ${formatPreciseCurrency(result.minimumGrossIndemnity)}`,
      `- Indemnité brute retenue : ${formatPreciseCurrency(result.retainedGrossIndemnity)}`,
      `- Contribution patronale estimée : ${formatPreciseCurrency(result.employerContributionAmount)} (${formatContributionRate(result.employerContributionRate)})`,
      `- Coût employeur total estimé : ${formatPreciseCurrency(result.totalEmployerCost)}`,
      form.userProfile === "employee"
        ? `- Net indicatif : ${formatPreciseCurrency(result.estimatedNetIndemnity)}`
        : "- Net indicatif : non prioritaire côté employeur",
      "",
      "Simulation indicative, sans valeur de conseil juridique, RH ou fiscal."
    ].join("\n");

    await navigator.clipboard.writeText(summary);
    trackCalculatorAction("result_copied", {
      calculator_type: "termination",
      location: "termination_result"
    });
    setCopied(true);
  }

  function resetForm() {
    setCopied(false);
    setForm(initialFormState);
  }

  const negotiationRange = result
    ? calculateIndicativeNegotiationRange({
        minimumGrossIndemnity: result.minimumGrossIndemnity,
        negotiatedGrossIndemnity: result.negotiatedGrossIndemnity,
        referenceSalary: result.referenceSalary,
        seniorityYears: result.seniority.decimalYears
      })
    : null;
  const visibleDetailLines = result
    ? result.detailLines.filter((line) => !line.toLowerCase().includes("montant négocié"))
    : [];

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.8fr)]">
      <form
        className="rounded-2xl border border-[#E5EEF0] bg-white p-4 shadow-sm sm:p-6"
        onSubmit={(event) => event.preventDefault()}
        aria-describedby="calculator-intro"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#061B3A]">{profileCopy.formTitle}</h2>
          </div>
        </div>

        <div className="mt-4 grid gap-4">
          <Field
            label="Date d'entrée"
            htmlFor="startDate"
            help="Une estimation suffit."
          >
            <input
              id="startDate"
              type="date"
              value={form.startDate}
              onChange={(event) => updateField("startDate", event.target.value)}
              aria-describedby="startDate-help"
              aria-invalid={hasFieldError(errors, ["date d'entrée"])}
              autoFocus
              required
              className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 text-[#061B3A] focus:border-[#22AFA3]"
            />
          </Field>

          <Field
            label="Date de rupture"
            htmlFor="ruptureDate"
            help="Une estimation suffit."
          >
            <input
              id="ruptureDate"
              type="date"
              value={form.ruptureDate}
              onChange={(event) => updateField("ruptureDate", event.target.value)}
              aria-describedby="ruptureDate-help"
              aria-invalid={hasFieldError(errors, ["date de rupture"])}
              required
              className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 text-[#061B3A] focus:border-[#22AFA3]"
            />
          </Field>

          <Field
            label="Salaire brut mensuel"
            htmlFor="averageMonthlyGrossSalary"
            help="Ex : 2 500 €."
          >
            <MoneyInput
              id="averageMonthlyGrossSalary"
              value={form.averageMonthlyGrossSalary}
              onChange={(value) => updateField("averageMonthlyGrossSalary", value)}
              describedBy="averageMonthlyGrossSalary-help"
              invalid={hasFieldError(errors, ["salaire"])}
              required
            />
          </Field>
        </div>

        <details className="mt-5 rounded-xl border border-[#E5EEF0] bg-[#F7FBFA] p-4">
          <summary className="cursor-pointer text-sm font-bold text-[#061B3A]">
            Options avancées
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Moyenne brute des 3 derniers mois"
              htmlFor="averageLast3MonthsGrossSalary"
              help="Option utile si cette moyenne est plus favorable."
            >
              <MoneyInput
                id="averageLast3MonthsGrossSalary"
                value={form.averageLast3MonthsGrossSalary}
                onChange={(value) => updateField("averageLast3MonthsGrossSalary", value)}
                describedBy="averageLast3MonthsGrossSalary-help"
              />
            </Field>
            <Field
              label="Moyenne brute des 12 derniers mois"
              htmlFor="averageLast12MonthsGrossSalary"
              help="Le montant le plus favorable est retenu."
            >
              <MoneyInput
                id="averageLast12MonthsGrossSalary"
                value={form.averageLast12MonthsGrossSalary}
                onChange={(value) => updateField("averageLast12MonthsGrossSalary", value)}
                describedBy="averageLast12MonthsGrossSalary-help"
              />
            </Field>
            <section className="rounded-xl border border-[#E5EEF0] bg-white p-4 sm:col-span-2">
              <h3 className="text-sm font-bold text-[#061B3A]">Périodes d&apos;absence</h3>
              <p className="mt-2 text-xs leading-5 text-[#5B6B7C]">
                Certaines absences peuvent modifier l&apos;ancienneté retenue ou le
                salaire de référence.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Absence récente ayant réduit le salaire ?"
                  htmlFor="absenceImpact"
                >
                  <select
                    id="absenceImpact"
                    value={form.absenceImpact}
                    onChange={(event) =>
                      updateField("absenceImpact", event.target.value as AbsenceImpact)
                    }
                    className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 text-[#061B3A]"
                  >
                    <option value="no">Non</option>
                    <option value="yes">Oui</option>
                    <option value="unknown">Je ne sais pas</option>
                  </select>
                </Field>

                {form.absenceImpact === "yes" ? (
                  <>
                    <Field label="Type d'absence" htmlFor="absenceType">
                      <select
                        id="absenceType"
                        value={form.absenceType}
                        onChange={(event) =>
                          updateField("absenceType", event.target.value as AbsenceType)
                        }
                        className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 text-[#061B3A]"
                      >
                        {absenceRules.map((rule) => (
                          <option key={rule.type} value={rule.type}>
                            {rule.label}
                          </option>
                        ))}
                      </select>
                      {selectedAbsenceRule ? (
                        <span className="mt-2 block text-xs leading-5 text-[#5B6B7C]">
                          {form.userProfile === "employer"
                            ? selectedAbsenceRule.employerExplanation
                            : selectedAbsenceRule.employeeExplanation}
                        </span>
                      ) : null}
                    </Field>
                    <Field label="Date de début d'absence" htmlFor="absenceStartDate">
                      <input
                        id="absenceStartDate"
                        type="date"
                        value={form.absenceStartDate}
                        onChange={(event) => updateField("absenceStartDate", event.target.value)}
                        className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 text-[#061B3A]"
                      />
                    </Field>
                    <Field
                      label="Date de fin d'absence"
                      hint="Optionnel"
                      htmlFor="absenceEndDate"
                    >
                      <input
                        id="absenceEndDate"
                        type="date"
                        value={form.absenceEndDate}
                        onChange={(event) => updateField("absenceEndDate", event.target.value)}
                        className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 text-[#061B3A]"
                      />
                    </Field>
                    <Field
                      label="Salaire brut habituel avant absence"
                      htmlFor="usualGrossMonthlySalaryBeforeAbsence"
                      help="À renseigner si vos moyennes récentes sont diminuées."
                    >
                      <MoneyInput
                        id="usualGrossMonthlySalaryBeforeAbsence"
                        value={form.usualGrossMonthlySalaryBeforeAbsence}
                        onChange={(value) =>
                          updateField("usualGrossMonthlySalaryBeforeAbsence", value)
                        }
                        describedBy="usualGrossMonthlySalaryBeforeAbsence-help"
                        invalid={hasFieldError(errors, ["salaire habituel avant absence"])}
                      />
                    </Field>
                  </>
                ) : null}
              </div>
            </section>
            <Field label="Profil" htmlFor="userProfile">
              <select
                id="userProfile"
                value={form.userProfile}
                onChange={(event) =>
                  updateField("userProfile", event.target.value as "employee" | "employer")
                }
                className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 text-[#061B3A]"
              >
                <option value="employee">Salarié</option>
                <option value="employer">Employeur</option>
              </select>
            </Field>
            <Field
              label="Éligible à la retraite"
              htmlFor="retirementEligibility"
              help="Information indicative."
            >
              <select
                id="retirementEligibility"
                value={form.retirementEligibility}
                onChange={(event) =>
                  updateField("retirementEligibility", event.target.value as RetirementEligibility)
                }
                aria-describedby="retirementEligibility-help"
                className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 text-[#061B3A]"
              >
                <option value="no">Non</option>
                <option value="yes">Oui</option>
                <option value="unknown">Je ne sais pas</option>
              </select>
            </Field>
            <Field label="Statut" htmlFor="employmentStatus">
              <select
                id="employmentStatus"
                value={form.employmentStatus}
                onChange={(event) =>
                  updateField("employmentStatus", event.target.value as "cadre" | "non-cadre")
                }
                className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 text-[#061B3A]"
              >
                <option value="non-cadre">Non-cadre</option>
                <option value="cadre">Cadre</option>
              </select>
            </Field>
            <Field
              label="Convention collective"
              htmlFor="collectiveAgreement"
              help="Vous la trouvez généralement sur votre bulletin de paie ou votre contrat de travail."
            >
              <select
                id="collectiveAgreement"
                value={form.collectiveAgreement}
                onChange={(event) => updateField("collectiveAgreement", event.target.value)}
                aria-label="Sélectionnez une convention collective"
                aria-describedby="collectiveAgreement-help"
                className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 text-[#061B3A]"
              >
                <option value="">Je ne sais pas / non renseignée</option>
                {collectiveAgreements.map((agreement) => (
                  <option key={agreement.idcc} value={agreement.idcc}>
                    IDCC {agreement.idcc} - {agreement.shortName ?? agreement.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </details>

        {errors.length > 0 ? (
          <div
            className="mt-5 rounded-xl border border-[#f3b7b7] bg-[#fff6f6] p-4 text-sm leading-6 text-[#9b2525]"
            role="alert"
          >
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
      </form>

      <div className="rounded-2xl border border-[#E5EEF0] bg-white p-4 shadow-sm sm:p-6" aria-live="polite" aria-atomic="true">
        <h2 className="sr-only">Résultat de la simulation</h2>
        {result ? (
          <>
            <p className="mb-3 text-sm font-bold text-[#061B3A]">
              Résultat estimé instantanément
            </p>
            <div className="rounded-2xl bg-[#061B3A] p-5 text-white sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    result.negotiatedBelowMinimum
                      ? "bg-[#fff8eb] text-[#855200]"
                      : "bg-[#EAF8F6] text-[#168F86]"
                  }`}
                >
                  {result.negotiatedBelowMinimum
                    ? "Inférieur au minimum légal estimé"
                    : "Conforme au minimum légal estimé"}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#EAF8F6]">
                  Code du travail français
                </span>
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#EAF8F6]">
                {profileCopy.primaryAmountLabel}
              </p>
              <p className="mt-2 text-4xl font-bold leading-tight sm:text-5xl">
                {formatCurrency(result.retainedGrossIndemnity)} brut
              </p>
              {form.userProfile === "employee" ? (
                <p className="mt-3 text-xl font-bold text-[#7df0c4] sm:text-2xl">
                  {profileCopy.resultSubline} : environ{" "}
                  {formatCurrency(result.estimatedNetIndemnity)} net
                </p>
              ) : (
                <p className="mt-3 text-xl font-bold text-[#7df0c4] sm:text-2xl">
                  {profileCopy.resultSubline} hors autres coûts éventuels
                </p>
              )}
              <p className="mt-5 rounded-xl bg-white/10 p-4 text-sm font-semibold leading-6 text-white">
                {profileCopy.humanSummary}{" "}
                {formatCurrency(result.retainedGrossIndemnity)} brut
                {form.userProfile === "employee"
                  ? " lors de votre négociation"
                  : " pour cette rupture conventionnelle"}
                , à vérifier selon votre situation.
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <ResultSummaryCard
                label="Indemnité minimale estimée"
                value={formatCurrency(result.minimumGrossIndemnity)}
                help="Le plancher indicatif à vérifier selon votre dossier."
              />
              <ResultSummaryCard
                label={form.userProfile === "employer" ? "Budget indemnité" : "Montant retenu"}
                value={formatCurrency(result.retainedGrossIndemnity)}
                help={
                  form.userProfile === "employer"
                    ? "Hors autres coûts éventuels liés à la fin du contrat."
                    : "Le montant brut utilisé dans cette simulation."
                }
              />
              <ResultSummaryCard
                label={form.userProfile === "employee" ? "Net indicatif" : "Lecture prudente"}
                value={
                  form.userProfile === "employee"
                    ? formatCurrency(result.estimatedNetIndemnity)
                    : "À confirmer"
                }
                help={
                  form.userProfile === "employee"
                    ? "Une approximation utile, pas un bulletin de paie."
                    : "À relire avec la paie et la convention collective."
                }
              />
            </div>

            <section className="mt-4 rounded-xl border border-[#D7E7E8] bg-[#F7FBFA] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold text-[#168F86]">
                  Réforme 2026 prise en compte
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#061B3A]">
                  {result.employerContributionRate ===
                  RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_FROM_2026
                    ? `Contribution employeur actualisée à ${contributionRateFrom2026Label}`
                    : "Barème antérieur appliqué"}
                </span>
              </div>
              <div className="mt-3">
                <h3 className="text-base font-black text-[#061B3A]">
                  Coût employeur estimé
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#5B6B7C]">
                  Depuis 2026, la rupture conventionnelle coûte plus cher à
                  l&apos;employeur : la contribution patronale passe de{" "}
                  {contributionRateBefore2026Label} à{" "}
                  {contributionRateFrom2026Label} sur la part exonérée de
                  cotisations sociales. Cela ne réduit pas l&apos;indemnité
                  minimale due au salarié.
                </p>
              </div>
              <div className="mt-4 grid gap-3">
                <ResultLine
                  label="Indemnité brute estimée"
                  value={formatCurrency(result.retainedGrossIndemnity)}
                />
                <ResultLine
                  label="Base estimée de contribution"
                  value={formatCurrency(result.employerContributionBase)}
                  detail={
                    result.employerContributionBaseIsIndicative
                      ? "Base indicative utilisée faute de calcul social complet de la part exonérée."
                      : "Part exclue de l'assiette des cotisations sociales."
                  }
                />
                <ResultLine
                  label={
                    result.employerContributionRate ===
                    RUPTURE_CONVENTIONNELLE_EMPLOYER_CONTRIBUTION_RATE_FROM_2026
                      ? "Contribution patronale 2026"
                      : "Contribution patronale avant 2026"
                  }
                  value={formatContributionRate(result.employerContributionRate)}
                  detail={`Taux appliqué selon la date de rupture : ${result.employerContributionRuptureDate}.`}
                />
                <ResultLine
                  label="Contribution patronale estimée"
                  value={formatCurrency(result.employerContributionAmount)}
                />
                <ResultLine
                  label="Coût total estimé"
                  value={formatCurrency(result.totalEmployerCost)}
                  detail="Indemnité + contribution patronale estimée, hors autres éléments de fin de contrat."
                />
              </div>
            </section>

            <div className="mt-4 grid gap-3">
              <ResultLine label="Ancienneté brute" value={result.grossSeniority.label} />
              <ResultLine label="Ancienneté retenue" value={result.retainedSeniority.label} />
              <ResultLine
                label="Salaire de référence"
                value={formatCurrency(result.referenceSalary)}
                detail={result.referenceSalarySource}
              />
            </div>

            <section className="mt-4 rounded-xl border border-[#E5EEF0] bg-[#F7FBFA] p-4">
              <h3 className="text-sm font-bold text-[#061B3A]">
                Statut renseigné : {getEmploymentStatusLabel(form.employmentStatus)}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
                {result.employmentStatusMessage}
              </p>
            </section>

            {result.warnings.length > 0 ? (
              <section className="mt-4 rounded-xl border border-[#f2dfb8] bg-[#fffaf0] p-4">
                <h3 className="text-sm font-bold text-[#855200]">Points à vérifier</h3>
                <ul className="mt-2 space-y-1 text-xs leading-5 text-[#6f5a2c]">
                  {result.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {result.collectiveAgreementMessage ? (
              <section className="mt-4 rounded-xl border border-[#E5EEF0] bg-[#F7FBFA] p-4">
                <h3 className="text-sm font-bold text-[#061B3A]">
                  Convention collective
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
                  {result.collectiveAgreementMessage}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#5B6B7C]">
                  {form.userProfile === "employer"
                    ? "La convention collective peut modifier l'enveloppe minimale à prévoir."
                    : "Votre convention collective peut parfois prévoir une indemnité plus favorable que le minimum légal."}
                </p>
              </section>
            ) : null}

            {negotiationRange ? (
              <section className="mt-4 rounded-xl border border-[#E5EEF0] bg-[#F7FBFA] p-4">
                <h3 className="text-sm font-bold text-[#061B3A]">
                  {profileCopy.negotiationTitle}
                </h3>
                <div className="mt-3 grid gap-3 text-sm leading-6 text-[#5B6B7C] sm:grid-cols-2">
                  <ResultLine
                    label="Minimum légal estimé"
                    value={formatCurrency(result.minimumGrossIndemnity)}
                  />
                  <ResultLine
                    label={profileCopy.rangeLabel}
                    value={`${formatCurrency(negotiationRange.low)} à ${formatCurrency(negotiationRange.high)}`}
                  />
                </div>
                <p className="mt-3 text-xs leading-5 text-[#5B6B7C]">
                  {profileCopy.rangeHelp}
                  <br />
                  {negotiationRange.explanation}
                </p>
              </section>
            ) : null}

            <section className="mt-4 rounded-xl border border-[#E5EEF0] bg-white p-4">
              <h3 className="text-sm font-bold text-[#061B3A]">
                {profileCopy.prepTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
                {profileCopy.prepText}
              </p>
            </section>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={copySummary}
                aria-label={copied ? "Résultat copié dans le presse-papiers" : "Copier le résultat prêt à envoyer"}
                className="h-12 flex-1 rounded-xl bg-[#22AFA3] px-4 text-sm font-bold text-white transition hover:bg-[#061B3A]"
              >
                {copied ? "Résultat copié" : "Copier le résultat"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                aria-label="Simuler un autre scénario"
                className="h-12 flex-1 rounded-xl border border-[#E5EEF0] px-4 text-sm font-bold text-[#061B3A] transition hover:bg-[#EAF8F6]"
              >
                Modifier la simulation
              </button>
            </div>

            <details className="mt-5 rounded-xl border border-[#E5EEF0] p-4">
              <summary className="cursor-pointer text-sm font-bold text-[#061B3A]">
                Détail du calcul
              </summary>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#5B6B7C]">
                {visibleDetailLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </details>

            <p className="mt-4 text-xs leading-5 text-[#5B6B7C]">
              Le montant affiché est une estimation. Il dépend des informations
              saisies, de votre ancienneté, de votre salaire de référence et des
              règles applicables à votre situation.
            </p>
            <Disclaimer className="mt-4" />
            <PostSimulationLinks
              className="mt-5"
              intro="Votre indemnité donne une première base. Avant d'avancer, il peut être utile de vérifier aussi vos droits au chômage, les délais de paiement et les documents à préparer."
              links={terminationNextStepLinks}
              location="termination_result"
              sourceTool="termination_calculator"
              title="Que vérifier après votre estimation ?"
            />
            <AdSlot
              className="mt-5"
              format="horizontal"
              position="bottom"
            />
          </>
        ) : (
          <div className="mt-6 rounded-xl bg-[#F7FBFA] p-5 text-sm leading-6 text-[#5B6B7C]">
            Complétez les champs obligatoires pour afficher l&apos;estimation.
          </div>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  help,
  htmlFor,
  children
}: {
  label: string;
  hint?: string;
  help?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="flex items-center justify-between gap-3 text-sm font-semibold text-[#061B3A]">
        {label}
        {hint ? <span className="text-xs font-medium text-[#5B6B7C]">{hint}</span> : null}
      </span>
      <span className="mt-2 block">{children}</span>
      {help ? (
        <span id={`${htmlFor}-help`} className="mt-2 block text-xs leading-5 text-[#5B6B7C]">
          {help}
        </span>
      ) : null}
    </label>
  );
}

function MoneyInput({
  id,
  value,
  onChange,
  placeholder = "Ex. 2 800",
  describedBy,
  required = false,
  invalid = false
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  describedBy?: string;
  required?: boolean;
  invalid?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        step="0.01"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        required={required}
        className="h-12 w-full rounded-xl border border-[#E5EEF0] bg-white px-3 pr-10 text-[#061B3A] focus:border-[#22AFA3]"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#5B6B7C]">
        €
      </span>
    </div>
  );
}

function ResultSummaryCard({
  help,
  label,
  value
}: {
  help: string;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-[#D7E7E8] bg-[#F7FBFA] p-4">
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#168F86]">
        {label}
      </p>
      <p className="mt-2 text-xl font-black text-[#061B3A]">{value}</p>
      <p className="mt-2 text-xs font-semibold leading-5 text-[#5B6B7C]">{help}</p>
    </article>
  );
}

function ResultLine({
  label,
  value,
  detail
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-[#E5EEF0] bg-[#F7FBFA] p-4">
      <div>
        <p className="text-sm font-medium text-[#5B6B7C]">{label}</p>
        {detail ? <p className="mt-1 text-xs text-[#5B6B7C]">{detail}</p> : null}
      </div>
      <p className="text-right text-base font-bold text-[#061B3A]">{value}</p>
    </div>
  );
}
