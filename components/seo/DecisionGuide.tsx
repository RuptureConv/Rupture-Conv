import Link from "next/link";

const decisionSteps = [
  {
    label: "Départ envisagé",
    text: "Vous envisagez de quitter votre emploi ?"
  },
  {
    label: "Droits à sécuriser",
    text: "Vous souhaitez discuter d’une indemnité ou du chômage ?"
  },
  {
    label: "Accord possible",
    text: "Votre employeur semble ouvert à une discussion ?"
  },
  {
    label: "Piste à étudier",
    text: "La rupture conventionnelle peut alors être examinée avec prudence."
  }
];

function StepIcon({ index }: { index: number }) {
  const paths = [
    "M7 12h10M12 7v10",
    "m8 12 2.8 2.8L16.5 9",
    "M7.5 8.5h9v7h-9zM9.5 11h5",
    "M8 12.5 11 15l5-6"
  ];

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF8F6] text-[#168F86] ring-1 ring-[#D7E7E8]">
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path
          d={paths[index]}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
      </svg>
    </span>
  );
}

export function DecisionGuide() {
  return (
    <section className="rounded-[28px] border border-[#D7E7E8] bg-[#EAF8F6] p-5 shadow-[0_18px_55px_rgba(6,27,58,0.04)] sm:p-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
        Décision
      </p>
      <h2 className="mt-2 text-xl font-extrabold text-[#061B3A]">
        Un repère pour savoir par où commencer
      </h2>
      <ol className="mt-6 space-y-3">
        {decisionSteps.map((step, index) => (
          <li
            className="relative flex gap-4 rounded-2xl bg-white p-4 shadow-[0_12px_35px_rgba(6,27,58,0.04)] ring-1 ring-[#D7E7E8] transition hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(6,27,58,0.07)]"
            key={step.label}
          >
            {index < decisionSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-9 top-14 h-5 w-px bg-[#BFE2DE]"
              />
            ) : null}
            <StepIcon index={index} />
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#168F86]">
                {step.label}
              </p>
              <p className="mt-1 text-sm font-bold leading-6 text-[#102A4C]">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-5 rounded-2xl bg-white/75 p-4 ring-1 ring-[#D7E7E8]">
        <p className="text-xs font-semibold leading-5 text-[#5B6B7C]">
          Ce guide ne remplace pas un conseil personnalisé. Il aide simplement à
          structurer les premières questions avant une simulation.
        </p>
        <Link
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#061B3A] px-5 text-sm font-bold text-white transition hover:bg-[#102A4C] focus:outline-none focus:ring-2 focus:ring-[#061B3A] focus:ring-offset-2 sm:w-auto"
          href="/#simulateur"
        >
          Estimer mon montant →
        </Link>
      </div>
    </section>
  );
}
