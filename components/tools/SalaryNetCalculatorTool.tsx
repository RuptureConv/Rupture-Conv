"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { PostSimulationLinks } from "@/components/seo/PostSimulationLinks";
import {
  calculateSalaryNet,
  DEFAULT_WEEKLY_HOURS,
  salaryProfiles,
  validateSalaryNetInput
} from "@/lib/calculators/salary-net";
import type {
  SalaryNetCalculatorInput,
  SalaryPeriod,
  SalaryProfileKey
} from "@/lib/calculators/salary-net";
import { salaryNextStepLinks } from "@/lib/internal-tool-links";

type FormState = {
  grossAmount: string;
  period: SalaryPeriod;
  profile: SalaryProfileKey;
  workTimeMode: "fullTime" | "custom";
  weeklyHours: string;
  withholdingTaxRate: string;
};

const initialFormState: FormState = {
  grossAmount: "2500",
  period: "monthly",
  profile: "privateNonExecutive",
  workTimeMode: "fullTime",
  weeklyHours: String(DEFAULT_WEEKLY_HOURS),
  withholdingTaxRate: ""
};

const periodLabels: Record<SalaryPeriod, string> = {
  hourly: "Horaire",
  monthly: "Mensuel",
  annual: "Annuel"
};

function toNumber(value: string): number {
  return Number(value.replace(",", "."));
}

function toOptionalNumber(value: string): number | undefined {
  if (!value.trim()) {
    return undefined;
  }

  return toNumber(value);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: value < 100 ? 2 : 0
  }).format(value);
}

function formatRate(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    maximumFractionDigits: 1
  }).format(value);
}

function buildInput(form: FormState): SalaryNetCalculatorInput {
  return {
    grossAmount: toNumber(form.grossAmount),
    period: form.period,
    profile: form.profile,
    weeklyHours:
      form.workTimeMode === "fullTime" ? DEFAULT_WEEKLY_HOURS : toNumber(form.weeklyHours),
    withholdingTaxRate: toOptionalNumber(form.withholdingTaxRate)
  };
}

export function SalaryNetCalculatorTool() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const hasGrossAmount = form.grossAmount.trim().length > 0;
  const input = useMemo(() => buildInput(form), [form]);
  const errors = useMemo(
    () => (hasGrossAmount ? validateSalaryNetInput(input) : []),
    [hasGrossAmount, input]
  );
  const result = useMemo(() => {
    if (!hasGrossAmount || errors.length > 0) {
      return null;
    }

    try {
      return calculateSalaryNet(input);
    } catch {
      return null;
    }
  }, [errors, hasGrossAmount, input]);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <section
      aria-labelledby="salary-calculator-title"
      className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.8fr)]"
    >
      <form
        className="rounded-2xl border border-[#E5EEF0] bg-white p-4 shadow-sm sm:p-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
            Convertisseur brut / net
          </p>
          <h2
            id="salary-calculator-title"
            className="mt-2 text-2xl font-black tracking-[-0.01em] text-[#061B3A]"
          >
            Indiquez votre salaire brut
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
            Choisissez le statut le plus proche de votre situation. Le résultat
            se met à jour automatiquement.
          </p>
        </div>

        <div className="mt-5 grid gap-5">
          <Field label="Montant du salaire brut" htmlFor="grossAmount">
            <div className="relative">
              <input
                id="grossAmount"
                inputMode="decimal"
                value={form.grossAmount}
                onChange={(event) => updateField("grossAmount", event.target.value)}
                placeholder="Ex : 2 500"
                className="h-12 w-full rounded-xl border border-[#D7E7E8] bg-white px-3 pr-12 text-base font-bold text-[#061B3A] outline-none transition focus:border-[#22AFA3] focus:ring-2 focus:ring-[#EAF8F6]"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#5B6B7C]">
                €
              </span>
            </div>
          </Field>

          <Field label="Périodicité du montant saisi">
            <SegmentedControl
              options={[
                { value: "hourly", label: periodLabels.hourly },
                { value: "monthly", label: periodLabels.monthly },
                { value: "annual", label: periodLabels.annual }
              ]}
              value={form.period}
              onChange={(value) => updateField("period", value)}
            />
          </Field>

          <Field label="Statut">
            <div className="grid gap-2">
              {(Object.keys(salaryProfiles) as SalaryProfileKey[]).map((profile) => (
                <label
                  key={profile}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-3 text-sm font-bold transition ${
                    form.profile === profile
                      ? "border-[#22AFA3] bg-[#EAF8F6] text-[#061B3A]"
                      : "border-[#D7E7E8] bg-white text-[#5B6B7C] hover:border-[#22AFA3]"
                  }`}
                >
                  <span>{salaryProfiles[profile].label}</span>
                  <input
                    type="radio"
                    name="profile"
                    value={profile}
                    checked={form.profile === profile}
                    onChange={() => updateField("profile", profile)}
                    className="h-4 w-4 accent-[#22AFA3]"
                  />
                </label>
              ))}
            </div>
          </Field>

          <Field label="Temps de travail">
            <SegmentedControl
              options={[
                { value: "fullTime", label: "Temps plein 35h" },
                { value: "custom", label: "Personnalisé" }
              ]}
              value={form.workTimeMode}
              onChange={(value) => updateField("workTimeMode", value)}
            />
          </Field>

          {form.workTimeMode === "custom" ? (
            <Field label="Heures par semaine" htmlFor="weeklyHours">
              <input
                id="weeklyHours"
                inputMode="decimal"
                value={form.weeklyHours}
                onChange={(event) => updateField("weeklyHours", event.target.value)}
                className="h-12 w-full rounded-xl border border-[#D7E7E8] bg-white px-3 text-[#061B3A] outline-none transition focus:border-[#22AFA3] focus:ring-2 focus:ring-[#EAF8F6]"
              />
            </Field>
          ) : null}

          <Field
            label="Taux de prélèvement à la source"
            hint="Optionnel"
            htmlFor="withholdingTaxRate"
          >
            <div className="relative">
              <input
                id="withholdingTaxRate"
                inputMode="decimal"
                value={form.withholdingTaxRate}
                onChange={(event) => updateField("withholdingTaxRate", event.target.value)}
                placeholder="Ex : 5"
                className="h-12 w-full rounded-xl border border-[#D7E7E8] bg-white px-3 pr-12 text-[#061B3A] outline-none transition focus:border-[#22AFA3] focus:ring-2 focus:ring-[#EAF8F6]"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#5B6B7C]">
                %
              </span>
            </div>
          </Field>
        </div>

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

      <aside
        className="rounded-2xl border border-[#E5EEF0] bg-white p-4 shadow-sm sm:p-6"
        aria-live="polite"
      >
        {result ? (
          <>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
              Résultat estimé
            </p>
            <div className="mt-3 rounded-2xl bg-[#061B3A] p-5 text-white">
              <p className="text-sm font-bold text-[#BCEBE6]">Net mensuel estimé</p>
              <p className="mt-2 text-4xl font-black tracking-[-0.02em] sm:text-5xl">
                {formatCurrency(result.netBeforeTaxMonthly)}
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#D8F5F2]">
                avant prélèvement à la source
              </p>
            </div>

            <p className="mt-4 rounded-xl bg-[#F7FBFA] p-4 text-sm font-bold leading-7 text-[#102A4C]">
              Avec un salaire brut de {formatCurrency(result.grossMonthly)} par
              mois, votre salaire net mensuel avant impôt est estimé à environ{" "}
              {formatCurrency(result.netBeforeTaxMonthly)} par mois, soit{" "}
              {formatCurrency(result.netBeforeTaxAnnual)} net par an.
              {result.netAfterTaxMonthly !== null && result.withholdingTaxRate !== null
                ? ` Après un prélèvement à la source de ${formatRate(
                    result.withholdingTaxRate / 100
                  )}, le salaire net versé estimé serait d’environ ${formatCurrency(
                    result.netAfterTaxMonthly
                  )} par mois.`
                : ""}
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ResultCard label="Net annuel estimé" value={formatCurrency(result.netBeforeTaxAnnual)} />
              <ResultCard label="Net horaire estimé" value={formatCurrency(result.netBeforeTaxHourly)} />
              <ResultCard label="Brut mensuel saisi ou recalculé" value={formatCurrency(result.grossMonthly)} />
              <ResultCard label="Brut annuel estimé" value={formatCurrency(result.grossAnnual)} />
              <ResultCard
                label="Cotisations mensuelles estimées"
                value={formatCurrency(result.estimatedContributionsMonthly)}
              />
              <ResultCard
                label="Taux de conversion"
                value={formatRate(1 - result.contributionRate)}
              />
              {result.netAfterTaxMonthly !== null ? (
                <ResultCard
                  label="Net mensuel après impôt estimé"
                  value={formatCurrency(result.netAfterTaxMonthly)}
                  strong
                />
              ) : null}
              <ResultCard
                label="Heures mensuelles"
                value={new Intl.NumberFormat("fr-FR", {
                  maximumFractionDigits: 2
                }).format(result.monthlyHours)}
              />
            </div>
            <p className="mt-4 text-xs font-semibold leading-5 text-[#5B6B7C]">
              Ce calcul reste indicatif. Il dépend du statut choisi, du temps de
              travail et du taux de prélèvement renseigné le cas échéant.
            </p>
            <PostSimulationLinks
              className="mt-5"
              intro="Le salaire brut sert souvent de base pour relire une rupture conventionnelle ou une estimation chômage. Gardez surtout le montant mensuel sous la main."
              links={salaryNextStepLinks}
              location="salary_result"
              sourceTool="salary_net_calculator"
              title="À vérifier avec ce montant"
            />
          </>
        ) : (
          <div className="flex min-h-[420px] flex-col justify-center rounded-2xl bg-[#F7FBFA] p-6 text-center">
            <p className="text-lg font-black text-[#061B3A]">
              Saisissez un salaire brut pour obtenir votre estimation.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#5B6B7C]">
              Le résultat affichera le net horaire, mensuel et annuel, avant ou
              après impôt selon les options renseignées.
            </p>
          </div>
        )}
      </aside>
    </section>
  );
}

function Field({
  children,
  hint,
  htmlFor,
  label
}: {
  children: ReactNode;
  hint?: string;
  htmlFor?: string;
  label: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          className="text-sm font-extrabold text-[#061B3A]"
          htmlFor={htmlFor}
        >
          {label}
        </label>
        {hint ? (
          <span className="text-xs font-bold text-[#5B6B7C]">{hint}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function SegmentedControl<Value extends string>({
  onChange,
  options,
  value
}: {
  onChange: (value: Value) => void;
  options: { label: string; value: Value }[];
  value: Value;
}) {
  return (
    <div className="grid gap-2 rounded-xl bg-[#F7FBFA] p-1 sm:grid-cols-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`min-h-11 rounded-lg px-3 text-sm font-extrabold transition ${
            value === option.value
              ? "bg-[#061B3A] text-white shadow-sm"
              : "text-[#5B6B7C] hover:bg-white hover:text-[#061B3A]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function ResultCard({
  label,
  strong,
  value
}: {
  label: string;
  strong?: boolean;
  value: string;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        strong
          ? "border-[#22AFA3] bg-[#EAF8F6]"
          : "border-[#E5EEF0] bg-[#F7FBFA]"
      }`}
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#5B6B7C]">
        {label}
      </p>
      <p className="mt-2 text-xl font-black text-[#061B3A]">{value}</p>
    </div>
  );
}
