"use client";

/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Link from "next/link";
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
  "Vos résultats",
  "Calendrier"
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

function monthsLabel(days: number): string {
  const months = Math.max(1, Math.round(days / 30.42));
  return `${months} mois`;
}

function exitIndemnityLabel(mode: EmploymentExitMode): string {
  if (mode === "rupture_conventionnelle") return "Indemnité de rupture conventionnelle";
  if (mode === "licenciement") return "Indemnité de départ ou de licenciement";
  if (mode === "fin_cdd") return "Indemnité de fin de contrat estimée";
  if (mode === "fin_mission_interim") return "Indemnité de fin de mission estimée";
  return "Somme de départ estimée";
}

function confidenceItems(mode: EmploymentExitMode) {
  return [
    "votre ancienneté",
    "votre salaire brut moyen",
    "les règles France Travail 2026",
    "les paramètres renseignés",
    mode === "rupture_conventionnelle"
      ? "la formule minimale de rupture conventionnelle"
      : "le mode de fin de contrat sélectionné"
  ];
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

function InfoTip({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span className="group relative inline-flex align-middle">
      <button
        aria-label={`Comprendre : ${label}`}
        className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#BFDADB] bg-white text-xs font-black text-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3]"
        type="button"
      >
        ?
      </button>
      <span className="pointer-events-none absolute left-1/2 top-7 z-20 hidden w-64 -translate-x-1/2 rounded-xl border border-[#D7E7E8] bg-white p-3 text-xs font-semibold leading-5 text-[#102A4C] shadow-lg group-hover:block group-focus-within:block">
        {children}
      </span>
    </span>
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
      <div className="mb-6 rounded-2xl border border-[#BFE5E1] bg-[#EAF8F6] p-5">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-[#168F86]">
          Estimation prudente
        </p>
        <p className="mt-2 text-sm font-bold leading-7 text-[#102A4C]">
          Le simulateur aide à comprendre un scénario : montant ARE estimé,
          délai avant paiement, indemnité de départ et durée probable. Il ne
          remplace pas la décision de France Travail ni une analyse juridique
          personnalisée.
        </p>
      </div>
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
                help="Repère général France Travail : 130 jours travaillés ou 910 heures. La période retenue dépend notamment de votre âge."
                label="Jours travaillés retenus ou estimés"
              >
                <NumberInput onChange={(value) => update("workedDays", value)} suffix="jours" value={form.workedDays} />
              </Field>
              <Field
                help="Utile si vous ne connaissez pas le nombre de jours travaillés ou si votre parcours est discontinu."
                label="Heures travaillées retenues ou estimées"
              >
                <NumberInput onChange={(value) => update("workedHours", value)} suffix="heures" value={form.workedHours} />
              </Field>
              <Field
                help="Cette date sert à estimer le début possible des versements après les différés."
                label="Date réelle ou prévue de fin de contrat"
              >
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
                  Première ouverture de droits ou absence de droit ouvert depuis 20 ans
                </span>
              </label>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#061B3A]">Vos revenus</h2>
              <Field
                help="Indiquez le brut mensuel moyen habituel, primes récurrentes comprises si elles reflètent votre rémunération. Le SJR officiel peut différer."
                label="Salaire brut mensuel moyen"
              >
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
              <Field
                help="Pour une rupture conventionnelle, elle sert à estimer l'indemnité minimale de départ."
                label="Ancienneté dans l'entreprise"
              >
                <NumberInput onChange={(value) => update("seniorityYears", value)} suffix="ans" value={form.seniorityYears} />
              </Field>
              <Field
                help="Saisissez uniquement la part au-dessus du minimum légal ou conventionnel. Cette somme peut repousser le premier paiement ARE."
                label="Part supra-légale éventuelle"
              >
                <NumberInput onChange={(value) => update("supraLegalIndemnity", value)} suffix="€" value={form.supraLegalIndemnity} />
              </Field>
              <Field
                help="Les congés payés non pris peuvent créer un différé avant le premier paiement."
                label="Congés payés non pris"
              >
                <NumberInput onChange={(value) => update("paidLeaveDays", value)} suffix="jours" value={form.paidLeaveDays} />
              </Field>
              <Field
                help="Optionnel : utile si vous avez déjà un montant employeur ou un cas autre que rupture conventionnelle."
                label="Indemnité légale, conventionnelle ou proposée"
              >
                <NumberInput onChange={(value) => update("legalTerminationIndemnity", value)} suffix="€" value={form.legalTerminationIndemnity} />
              </Field>
            </div>
          ) : null}

          {step >= 4 && result ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#061B3A]">
                {step === 4 ? "Vos résultats, dans l'ordre réel" : "Votre calendrier de versement"}
              </h2>
              <section className="rounded-2xl border border-[#BFE5E1] bg-[#EAF8F6] p-5">
                <h3 className="text-lg font-black text-[#061B3A]">
                  Comprendre mon résultat
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#102A4C]">
                  Dans votre situation, vous pourriez percevoir environ{" "}
                  <strong>{euro(result.projection.terminationIndemnity)}</strong>{" "}
                  lors de votre départ, puis environ{" "}
                  <strong>{euro(result.projection.monthlyUnemployment)} par mois</strong>{" "}
                  de France Travail pendant une durée estimée de{" "}
                  <strong>{monthsLabel(result.duration.estimatedDays)}</strong>.
                </p>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#102A4C]">
                  Le total chômage et la projection globale sont des cumuls sur toute
                  la période. Ce ne sont pas des sommes versées en une seule fois.
                </p>
                {form.exitMode === "demission" ? (
                  <p className="mt-3 rounded-xl bg-white px-4 py-3 text-sm font-black leading-6 text-[#7A4A00]">
                    Vous avez sélectionné une démission classique : le droit à
                    l'ARE n'est pas automatique. Vérifiez votre situation avant
                    de quitter votre poste.
                  </p>
                ) : null}
              </section>

              {step === 4 ? (
                <>
                  <div className="space-y-4">
                    <MoneyResultCard
                      amount={euro(result.projection.terminationIndemnity)}
                      certainty="estimation à vérifier avec vos documents de fin de contrat"
                      description="Cette somme correspond à l'indemnité estimée versée par votre employeur lors de votre départ. Selon votre négociation, ce montant peut être supérieur."
                      label={exitIndemnityLabel(form.exitMode)}
                      payer="Votre employeur"
                      timing="Au moment du départ"
                      type="Versement unique"
                    />
                    <MoneyResultCard
                      amount={`${euro(result.projection.monthlyUnemployment)} / mois`}
                      certainty="estimation à confirmer par France Travail"
                      description="Ce montant correspond à votre allocation mensuelle estimée. Il sert à comprendre votre revenu régulier pendant la période indemnisée."
                      label={
                        <>
                          Allocation chômage estimée
                          <InfoTip label="ARE">
                            L'ARE est l'allocation d'aide au retour à l'emploi. C'est
                            le chômage versé par France Travail lorsque les conditions
                            sont réunies.
                          </InfoTip>
                        </>
                      }
                      payer="France Travail"
                      timing={`À partir du ${dateFr(result.waitingPeriods.estimatedFirstPaymentDate)}`}
                      type="Montant mensuel"
                    />
                    <DurationResultCard
                      days={result.duration.estimatedDays}
                      label="Durée estimée d'indemnisation"
                      note="Cette durée dépend de votre activité passée, de votre âge et des règles France Travail 2026."
                    />
                    <MoneyResultCard
                      amount={euro(result.projection.totalPotentialAre)}
                      certainty="projection théorique sur toute la période"
                      description="Ce montant représente le cumul des allocations chômage sur l'ensemble de votre période d'indemnisation. Il ne s'agit pas d'un versement unique."
                      label={
                        <>
                          Total ARE potentiel
                          <InfoTip label="Total ARE potentiel">
                            C'est l'addition des allocations mensuelles possibles sur
                            toute la durée estimée. Vous ne recevez pas ce total d'un
                            seul coup.
                          </InfoTip>
                        </>
                      }
                      payer="France Travail"
                      timing={`Sur environ ${monthsLabel(result.duration.estimatedDays)}`}
                      type="Cumul sur la durée"
                    />
                    <MoneyResultCard
                      amount={euro(result.projection.cumulativePotentialIncome)}
                      certainty="projection globale, pas un paiement immédiat"
                      description="Cette projection additionne l'indemnité de départ et les allocations chômage potentielles sur toute la durée des droits."
                      label={
                        <>
                          Projection globale
                          <InfoTip label="Projection globale">
                            Ce chiffre additionne deux choses différentes : une somme
                            versée au départ et des allocations mensuelles étalées dans
                            le temps.
                          </InfoTip>
                        </>
                      }
                      payer="Employeur puis France Travail"
                      timing="Sur l'ensemble du scénario"
                      type="Cumul employeur + ARE"
                      warning="Ce n'est pas une somme reçue immédiatement."
                    />
                  </div>

                  <ConfidencePanel items={confidenceItems(form.exitMode)} />
                </>
              ) : (
                <>
                  <PaymentTimeline
                    firstPaymentDate={dateFr(result.waitingPeriods.estimatedFirstPaymentDate)}
                    legalWaitingDays={result.waitingPeriods.legalWaitingDays}
                    paidLeaveDays={result.waitingPeriods.paidLeaveDeferredDays}
                    specificDays={result.waitingPeriods.specificDeferredDays}
                    monthlyAre={euro(result.projection.monthlyUnemployment)}
                    duration={monthsLabel(result.duration.estimatedDays)}
                  />
                  <section className="rounded-2xl border border-[#D7E7E8] bg-white p-5">
                    <h3 className="text-lg font-black text-[#061B3A]">
                      Les détails du calcul, sans jargon
                    </h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <SmallExplanation
                        label={
                          <>
                            SJR
                            <InfoTip label="SJR">
                              Le SJR est le salaire journalier de référence. Il sert
                              de base au calcul du chômage.
                            </InfoTip>
                          </>
                        }
                        value={`${euro(result.salary.estimatedSjr)} par jour`}
                      />
                      <SmallExplanation
                        label={
                          <>
                            Carence et différés
                            <InfoTip label="Carence">
                              C'est le temps possible entre la fin du contrat et le
                              début du paiement chômage.
                            </InfoTip>
                          </>
                        }
                        value={`${result.waitingPeriods.totalDeferredDays} jours au total`}
                      />
                      <SmallExplanation
                        label="Formule retenue"
                        value={`${euro(result.salary.dailyGrossAre)} brut par jour`}
                      />
                      <SmallExplanation
                        label="Situation du dossier"
                        value={result.eligibility.label}
                      />
                    </div>
                  </section>
                </>
              )}

              <section className="rounded-2xl border border-[#D7E7E8] bg-white p-5">
                <h3 className="text-lg font-black text-[#061B3A]">
                  Pourquoi vous pouvez faire confiance au résultat
                </h3>
                <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-[#5B6B7C]">
                  {[
                    ...result.eligibility.reasons,
                    ...result.duration.notes,
                    ...result.decision.recommendations
                  ].map((item) => (
                    <li key={item} className="rounded-xl bg-[#F7FBFA] px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl bg-[#061B3A] p-5 text-white shadow-sm">
                <h3 className="text-lg font-black">
                  Prochaine vérification utile
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#D8F5F2]">
                  Relisez le résultat avec les pages qui correspondent à votre
                  décision : montant ARE, délai de carence ou impact d'une
                  rupture conventionnelle.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    className="inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-black text-white transition hover:bg-[#168F86]"
                    href="/delai-de-carence-chomage"
                  >
                    Comprendre mon délai
                  </Link>
                  <Link
                    className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-sm font-black text-white transition hover:bg-white/10"
                    href="/rupture-conventionnelle-et-allocation-chomage"
                  >
                    Relier rupture et ARE
                  </Link>
                </div>
              </section>
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          {result ? (
            <>
              <div className="rounded-2xl bg-[#061B3A] p-5 text-white">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8BE7DF]">
                  À retenir
                </p>
                <p className="mt-3 text-2xl font-black">
                  {euro(result.projection.monthlyUnemployment)} / mois
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#D8F5F2]">
                  Votre allocation chômage mensuelle estimée, versée par France
                  Travail après les délais éventuels.
                </p>
              </div>
              <div className="rounded-2xl border border-[#D7E7E8] bg-white p-5">
                <h3 className="text-lg font-black text-[#061B3A]">
                  Ce qui est versé, et par qui
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <SmallLine label="Employeur au départ" value={euro(result.projection.terminationIndemnity)} />
                  <SmallLine label="France Travail par mois" value={euro(result.projection.monthlyUnemployment)} />
                  <SmallLine label="Début estimé" value={dateFr(result.waitingPeriods.estimatedFirstPaymentDate)} />
                </dl>
              </div>
              <div className="rounded-2xl border border-[#D7E7E8] bg-white p-5">
                <h3 className="text-lg font-black text-[#061B3A]">
                  Délais avant paiement
                  <InfoTip label="Délais avant paiement">
                    Ces jours expliquent pourquoi le chômage ne commence pas
                    forcément tout de suite après votre départ.
                  </InfoTip>
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <SmallLine label="Attente légale" value={`${result.waitingPeriods.legalWaitingDays} jours`} />
                  <SmallLine label="Congés payés" value={`${result.waitingPeriods.paidLeaveDeferredDays} jours`} />
                  <SmallLine label="Différé spécifique" value={`${result.waitingPeriods.specificDeferredDays} jours`} />
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

function MoneyResultCard({
  amount,
  certainty,
  description,
  label,
  payer,
  timing,
  type,
  warning
}: {
  amount: string;
  certainty: string;
  description: string;
  label: React.ReactNode;
  payer: string;
  timing: string;
  type: string;
  warning?: string;
}) {
  return (
    <article className="rounded-2xl border border-[#D7E7E8] bg-white p-5 shadow-sm">
      <p className="text-sm font-black text-[#168F86]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-[#061B3A]">{amount}</p>
      <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
        {description}
      </p>
      {warning ? (
        <p className="mt-3 rounded-xl bg-[#FFF8E8] px-4 py-3 text-sm font-black leading-6 text-[#7A4A00]">
          {warning}
        </p>
      ) : null}
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <ContextMetric label="Qui verse ?" value={payer} />
        <ContextMetric label="Quand ?" value={timing} />
        <ContextMetric label="Nature" value={type} />
      </dl>
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-[#5B6B7C]">
        {certainty}
      </p>
    </article>
  );
}

function DurationResultCard({
  days,
  label,
  note
}: {
  days: number;
  label: string;
  note: string;
}) {
  return (
    <article className="rounded-2xl border border-[#D7E7E8] bg-white p-5 shadow-sm">
      <p className="text-sm font-black text-[#168F86]">{label}</p>
      <p className="mt-2 text-3xl font-black text-[#061B3A]">
        {monthsLabel(days)}
      </p>
      <p className="mt-2 text-sm font-bold text-[#102A4C]">
        soit environ {days} jours indemnisables
      </p>
      <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
        {note}
      </p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <ContextMetric label="Qui décide ?" value="France Travail" />
        <ContextMetric label="Quand ?" value="Après ouverture des droits" />
        <ContextMetric label="Nature" value="Durée estimée" />
      </dl>
    </article>
  );
}

function ContextMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#F7FBFA] p-3">
      <dt className="text-[11px] font-black uppercase tracking-[0.08em] text-[#5B6B7C]">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-black leading-5 text-[#061B3A]">
        {value}
      </dd>
    </div>
  );
}

function ConfidencePanel({ items }: { items: string[] }) {
  return (
    <section className="rounded-2xl border border-[#BFE5E1] bg-white p-5 shadow-sm">
      <h3 className="text-lg font-black text-[#061B3A]">Calcul basé sur</h3>
      <ul className="mt-4 grid gap-3 text-sm font-bold leading-6 text-[#102A4C] sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-[#EAF8F6] px-4 py-3">
            ✓ {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function PaymentTimeline({
  duration,
  firstPaymentDate,
  legalWaitingDays,
  monthlyAre,
  paidLeaveDays,
  specificDays
}: {
  duration: string;
  firstPaymentDate: string;
  legalWaitingDays: number;
  monthlyAre: string;
  paidLeaveDays: number;
  specificDays: number;
}) {
  const items = [
    {
      title: "Aujourd'hui",
      body: "Vous renseignez votre situation pour obtenir une projection lisible."
    },
    {
      title: "Indemnité RC versée",
      body: "Votre employeur verse l'indemnité de départ à la fin du contrat."
    },
    {
      title: "Délai de carence éventuel",
      body: `${legalWaitingDays} jours d'attente, ${paidLeaveDays} jours liés aux congés payés et ${specificDays} jours de différé spécifique dans cette simulation.`
    },
    {
      title: "Début des versements France Travail",
      body: `Premier paiement estimé autour du ${firstPaymentDate}.`
    },
    {
      title: "ARE mensuelle",
      body: `${monthlyAre} par mois dans cette projection.`
    },
    {
      title: "Fin estimée des droits",
      body: `Durée estimée : ${duration}, sous réserve de confirmation par France Travail.`
    }
  ];

  return (
    <section className="rounded-2xl border border-[#D7E7E8] bg-white p-5 shadow-sm">
      <h3 className="text-lg font-black text-[#061B3A]">
        Timeline pédagogique
      </h3>
      <ol className="mt-5 space-y-4">
        {items.map((item, index) => (
          <li key={item.title} className="grid grid-cols-[24px_minmax(0,1fr)] gap-3">
            <div className="flex flex-col items-center">
              <span className="h-4 w-4 rounded-full bg-[#22AFA3]" />
              {index < items.length - 1 ? (
                <span className="mt-1 h-full min-h-10 w-px bg-[#BFE5E1]" />
              ) : null}
            </div>
            <div className="rounded-xl bg-[#F7FBFA] px-4 py-3">
              <p className="text-sm font-black text-[#061B3A]">{item.title}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-[#5B6B7C]">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SmallExplanation({
  label,
  value
}: {
  label: React.ReactNode;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#F7FBFA] p-4">
      <dt className="text-sm font-black text-[#168F86]">{label}</dt>
      <dd className="mt-2 text-base font-black text-[#061B3A]">{value}</dd>
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
