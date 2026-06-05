"use client";

/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import {
  calculateUnemploymentProjection,
  type EmploymentExitMode,
  type UnemploymentProjectionInput,
  type WorkTime
} from "@/lib/calculators/unemployment-projection";

type FormState = {
  age: string;
  averageMonthlyGrossSalary: string;
  contractEndDate: string;
  exitMode: EmploymentExitMode;
  workedDays: string;
  workedHours: string;
  seniorityYears: string;
  workTime: WorkTime;
  partTimeRatio: string;
  supraLegalIndemnity: string;
  paidLeaveDays: string;
  legalTerminationIndemnity: string;
  isFirstEntrySince2026: boolean;
};

const exitModes: { value: EmploymentExitMode; label: string; hint: string }[] = [
  {
    value: "rupture_conventionnelle",
    label: "Rupture conventionnelle",
    hint: "Cas fréquent, éligibilité à confirmer mais souvent probable."
  },
  {
    value: "licenciement",
    label: "Licenciement",
    hint: "Rupture involontaire, hors cas particuliers."
  },
  {
    value: "fin_cdd",
    label: "Fin de CDD",
    hint: "Fin de contrat à durée déterminée."
  },
  {
    value: "fin_mission_interim",
    label: "Fin de mission intérim",
    hint: "Mission terminée sans poursuite immédiate."
  },
  {
    value: "demission",
    label: "Démission classique",
    hint: "N'ouvre pas automatiquement droit à l'ARE."
  },
  {
    value: "demission_legitime",
    label: "Démission légitime",
    hint: "À faire confirmer par France Travail."
  },
  {
    value: "reconversion_validee",
    label: "Reconversion validée",
    hint: "Projet validé avant la démission."
  },
  {
    value: "reliquat_droits",
    label: "Reliquat de droits",
    hint: "Dépend de droits déjà ouverts."
  }
];

const steps = [
  "Votre situation",
  "Votre emploi",
  "Vos revenus",
  "Vos indemnités",
  "Résultats",
  "Projection financière"
];

const defaultForm: FormState = {
  age: "38",
  averageMonthlyGrossSalary: "2500",
  contractEndDate: new Date().toISOString().slice(0, 10),
  exitMode: "rupture_conventionnelle",
  workedDays: "520",
  workedHours: "3640",
  seniorityYears: "6",
  workTime: "full_time",
  partTimeRatio: "80",
  supraLegalIndemnity: "0",
  paidLeaveDays: "10",
  legalTerminationIndemnity: "",
  isFirstEntrySince2026: false
};

function parseNumber(value: string): number {
  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function euro(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function dateFr(value: string): string {
  return new Intl.DateTimeFormat("fr-FR").format(new Date(`${value}T00:00:00Z`));
}

function Field({
  children,
  help,
  label
}: {
  children: React.ReactNode;
  help?: string;
  label: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-[#061B3A]">{label}</span>
      <span className="mt-2 block">{children}</span>
      {help ? (
        <span className="mt-2 block text-xs font-semibold leading-5 text-[#5B6B7C]">
          {help}
        </span>
      ) : null}
    </label>
  );
}

function NumberInput({
  min = "0",
  onChange,
  suffix,
  value
}: {
  min?: string;
  onChange: (value: string) => void;
  suffix?: string;
  value: string;
}) {
  return (
    <div className="flex min-h-12 overflow-hidden rounded-xl border border-[#D7E7E8] bg-white focus-within:ring-2 focus-within:ring-[#22AFA3]">
      <input
        className="min-w-0 flex-1 bg-transparent px-4 text-base font-bold text-[#061B3A] outline-none"
        inputMode="decimal"
        min={min}
        onChange={(event) => onChange(event.target.value)}
        type="number"
        value={value}
      />
      {suffix ? (
        <span className="flex items-center border-l border-[#E5EEF0] px-3 text-sm font-black text-[#5B6B7C]">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

export function UnemploymentProjectionTool() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [step, setStep] = useState(0);
  const input: UnemploymentProjectionInput = {
    age: parseNumber(form.age),
    averageMonthlyGrossSalary: parseNumber(form.averageMonthlyGrossSalary),
    contractEndDate: form.contractEndDate,
    exitMode: form.exitMode,
    workedDays: parseNumber(form.workedDays),
    workedHours: parseNumber(form.workedHours),
    seniorityYears: parseNumber(form.seniorityYears),
    workTime: form.workTime,
    partTimeRatio: parseNumber(form.partTimeRatio) / 100,
    supraLegalIndemnity: parseNumber(form.supraLegalIndemnity),
    paidLeaveDays: parseNumber(form.paidLeaveDays),
    legalTerminationIndemnity:
      form.legalTerminationIndemnity.trim() === ""
        ? undefined
        : parseNumber(form.legalTerminationIndemnity),
    isFirstEntrySince2026: form.isFirstEntrySince2026
  };
  const result = (() => {
    try {
      return calculateUnemploymentProjection(input);
    } catch {
      return null;
    }
  })();
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="rounded-3xl border border-[#D7E7E8] bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {steps.map((item, index) => (
          <button
            className={`min-h-12 rounded-xl px-3 text-left text-xs font-black transition ${
              index === step
                ? "bg-[#061B3A] text-white"
                : "bg-[#F7FBFA] text-[#102A4C] hover:bg-[#EAF8F6]"
            }`}
            key={item}
            onClick={() => setStep(index)}
            type="button"
          >
            <span className="block text-[11px] uppercase tracking-[0.12em] opacity-75">
              Étape {index + 1}
            </span>
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(320px,0.52fr)]">
        <div className="min-h-[520px] rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-5 sm:p-6">
          {step === 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#061B3A]">Votre situation</h2>
              <Field label="Âge à la fin du contrat">
                <NumberInput onChange={(value) => update("age", value)} suffix="ans" value={form.age} />
              </Field>
              <Field label="Mode de sortie d'emploi">
                <div className="grid gap-3 sm:grid-cols-2">
                  {exitModes.map((mode) => (
                    <button
                      className={`rounded-2xl border p-4 text-left transition ${
                        form.exitMode === mode.value
                          ? "border-[#22AFA3] bg-[#EAF8F6]"
                          : "border-[#D7E7E8] bg-white hover:border-[#22AFA3]"
                      }`}
                      key={mode.value}
                      onClick={() => update("exitMode", mode.value)}
                      type="button"
                    >
                      <span className="block text-sm font-black text-[#061B3A]">
                        {mode.label}
                      </span>
                      <span className="mt-1 block text-xs font-semibold leading-5 text-[#5B6B7C]">
                        {mode.hint}
                      </span>
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#061B3A]">Votre emploi</h2>
              <Field
                help="Repère France Travail : 130 jours travaillés ou 910 heures sur la période de recherche."
                label="Jours travaillés dans la période de référence"
              >
                <NumberInput onChange={(value) => update("workedDays", value)} suffix="jours" value={form.workedDays} />
              </Field>
              <Field label="Heures travaillées">
                <NumberInput onChange={(value) => update("workedHours", value)} suffix="heures" value={form.workedHours} />
              </Field>
              <Field label="Date de fin de contrat">
                <input
                  className="min-h-12 w-full rounded-xl border border-[#D7E7E8] bg-white px-4 text-base font-bold text-[#061B3A] outline-none focus:ring-2 focus:ring-[#22AFA3]"
                  onChange={(event) => update("contractEndDate", event.target.value)}
                  type="date"
                  value={form.contractEndDate}
                />
              </Field>
              <label className="flex items-start gap-3 rounded-2xl bg-white p-4">
                <input
                  checked={form.isFirstEntrySince2026}
                  className="mt-1 h-4 w-4 accent-[#22AFA3]"
                  onChange={(event) => update("isFirstEntrySince2026", event.target.checked)}
                  type="checkbox"
                />
                <span className="text-sm font-semibold leading-6 text-[#102A4C]">
                  Primo-entrant ou absence de droit ouvert dans les 20 dernières années
                </span>
              </label>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#061B3A]">Vos revenus</h2>
              <Field help="Utilisez le brut moyen habituel. Le SJR réel peut différer." label="Salaire brut mensuel moyen">
                <NumberInput onChange={(value) => update("averageMonthlyGrossSalary", value)} suffix="€" value={form.averageMonthlyGrossSalary} />
              </Field>
              <Field label="Temps de travail">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["full_time", "Temps plein"],
                    ["part_time", "Temps partiel"]
                  ].map(([value, label]) => (
                    <button
                      className={`min-h-12 rounded-xl border px-4 text-left text-sm font-black ${
                        form.workTime === value
                          ? "border-[#22AFA3] bg-[#EAF8F6] text-[#061B3A]"
                          : "border-[#D7E7E8] bg-white text-[#102A4C]"
                      }`}
                      key={value}
                      onClick={() => update("workTime", value as WorkTime)}
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Field>
              {form.workTime === "part_time" ? (
                <Field label="Quotité estimée">
                  <NumberInput onChange={(value) => update("partTimeRatio", value)} suffix="%" value={form.partTimeRatio} />
                </Field>
              ) : null}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#061B3A]">Vos indemnités</h2>
              <Field label="Ancienneté dans l'entreprise">
                <NumberInput onChange={(value) => update("seniorityYears", value)} suffix="ans" value={form.seniorityYears} />
              </Field>
              <Field help="La part supra-légale augmente souvent le différé spécifique." label="Indemnité supra-légale éventuelle">
                <NumberInput onChange={(value) => update("supraLegalIndemnity", value)} suffix="€" value={form.supraLegalIndemnity} />
              </Field>
              <Field label="Congés payés restants">
                <NumberInput onChange={(value) => update("paidLeaveDays", value)} suffix="jours" value={form.paidLeaveDays} />
              </Field>
              <Field help="Optionnel : utile pour licenciement, CDD ou montant déjà proposé." label="Indemnité légale ou proposée">
                <NumberInput onChange={(value) => update("legalTerminationIndemnity", value)} suffix="€" value={form.legalTerminationIndemnity} />
              </Field>
            </div>
          ) : null}

          {step >= 4 && result ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#061B3A]">
                {step === 4 ? "Résultats" : "Projection financière"}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard label="Éligibilité" value={result.eligibility.label} />
                <ResultCard label="ARE brute estimée" value={`${euro(result.salary.monthlyGrossAre)} / mois`} />
                <ResultCard label="ARE nette estimée" value={`${euro(result.salary.monthlyNetAre)} / mois`} />
                <ResultCard label="Premier versement probable" value={dateFr(result.waitingPeriods.estimatedFirstPaymentDate)} />
                <ResultCard label="Durée estimative" value={`${result.duration.estimatedDays} jours`} />
                <ResultCard label="Diagnostic" value={result.decision.label} />
              </div>
              {step === 5 ? (
                <div className="rounded-2xl bg-[#061B3A] p-5 text-white">
                  <h3 className="text-xl font-black">Projection financière globale</h3>
                  <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                    <ProjectionLine label="Indemnité rupture / départ" value={euro(result.projection.terminationIndemnity)} />
                    <ProjectionLine label="Chômage mensuel estimé" value={euro(result.projection.monthlyUnemployment)} />
                    <ProjectionLine label="Montant potentiel total ARE" value={euro(result.projection.totalPotentialAre)} />
                    <ProjectionLine label="Revenus cumulés potentiels" value={euro(result.projection.cumulativePotentialIncome)} />
                  </dl>
                </div>
              ) : null}
              <section className="rounded-2xl border border-[#D7E7E8] bg-white p-5">
                <h3 className="text-lg font-black text-[#061B3A]">Explications</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-semibold leading-6 text-[#5B6B7C]">
                  {[
                    ...result.eligibility.reasons,
                    `SJR estimé : ${euro(result.salary.estimatedSjr)} par jour.`,
                    `Différés : ${result.waitingPeriods.totalDeferredDays} jours au total.`,
                    ...result.duration.notes,
                    ...result.decision.recommendations
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <p className="rounded-2xl bg-[#FFF8E8] p-4 text-sm font-bold leading-6 text-[#7A4A00]">
                Estimation indicative, non opposable. France Travail reste seul compétent
                pour confirmer l'ouverture, le montant, le calendrier et la durée des droits.
              </p>
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          {result ? (
            <>
              <div className="rounded-2xl bg-[#061B3A] p-5 text-white">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8BE7DF]">
                  Synthèse immédiate
                </p>
                <p className="mt-3 text-3xl font-black">
                  {euro(result.projection.cumulativePotentialIncome)}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#D8F5F2]">
                  Revenus cumulés potentiels : indemnité de départ + ARE nette
                  estimée sur la durée affichée.
                </p>
              </div>
              <div className="rounded-2xl border border-[#D7E7E8] bg-white p-5">
                <h3 className="text-lg font-black text-[#061B3A]">Différés estimés</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <SmallLine label="Attente légale" value={`${result.waitingPeriods.legalWaitingDays} jours`} />
                  <SmallLine label="Congés payés" value={`${result.waitingPeriods.paidLeaveDeferredDays} jours`} />
                  <SmallLine label="Spécifique" value={`${result.waitingPeriods.specificDeferredDays} jours`} />
                </dl>
              </div>
              <div className="rounded-2xl border border-[#D7E7E8] bg-white p-5">
                <h3 className="text-lg font-black text-[#061B3A]">Formule ARE</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <SmallLine label="Formule A" value={euro(result.salary.formulaA)} />
                  <SmallLine label="Formule B" value={euro(result.salary.formulaB)} />
                  <SmallLine label="Allocation journalière" value={euro(result.salary.dailyGrossAre)} />
                </dl>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-[#D7E7E8] bg-white p-5 text-sm font-bold leading-6 text-[#5B6B7C]">
              Renseignez un âge et un salaire valides pour obtenir une projection.
            </div>
          )}
        </aside>
      </div>

      <div className="mt-6 flex justify-between gap-3">
        <button
          className="min-h-11 rounded-full border border-[#D7E7E8] bg-white px-5 text-sm font-black text-[#061B3A]"
          disabled={step === 0}
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          type="button"
        >
          Étape précédente
        </button>
        <button
          className="min-h-11 rounded-full bg-[#22AFA3] px-5 text-sm font-black text-white"
          disabled={step === steps.length - 1}
          onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}
          type="button"
        >
          Étape suivante
        </button>
      </div>
    </section>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#D7E7E8] bg-white p-4">
      <dt className="text-xs font-black uppercase tracking-[0.12em] text-[#168F86]">
        {label}
      </dt>
      <dd className="mt-2 text-xl font-black text-[#061B3A]">{value}</dd>
    </div>
  );
}

function ProjectionLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-[#BDEDEA]">{label}</dt>
      <dd className="mt-1 text-2xl font-black">{value}</dd>
    </div>
  );
}

function SmallLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="font-semibold text-[#5B6B7C]">{label}</dt>
      <dd className="font-black text-[#061B3A]">{value}</dd>
    </div>
  );
}
