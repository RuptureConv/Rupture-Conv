type ProcessStep = {
  description: string;
  label: string;
};

const defaultSteps: ProcessStep[] = [
  {
    label: "Échange initial",
    description: "Les parties ouvrent la discussion, sans obligation d’accord."
  },
  {
    label: "Entretien",
    description: "Le calendrier, le montant et les conditions sont abordés."
  },
  {
    label: "Convention signée",
    description: "Les éléments de la rupture sont formalisés par écrit."
  },
  {
    label: "Rétractation",
    description: "Chaque partie dispose d’un délai légal pour revenir sur sa décision."
  },
  {
    label: "Homologation",
    description: "La demande est transmise à l’administration compétente."
  },
  {
    label: "Fin du contrat",
    description: "La rupture intervient à la date prévue si le dossier est validé."
  }
];

type ProcessTimelineProps = {
  steps?: ProcessStep[];
  title?: string;
};

export function ProcessTimeline({
  steps = defaultSteps,
  title = "Les grandes étapes"
}: ProcessTimelineProps) {
  return (
    <section className="rounded-[28px] border border-[#E5EEF0] bg-white p-5 shadow-[0_18px_55px_rgba(6,27,58,0.05)] sm:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
            Parcours
          </p>
          <h2 className="mt-2 text-xl font-extrabold text-[#061B3A]">{title}</h2>
        </div>
        <p className="max-w-sm text-sm font-semibold leading-6 text-[#5B6B7C]">
          Les étapes peuvent varier selon le dossier, mais ce repère aide à
          comprendre l’ordre général.
        </p>
      </div>

      <ol className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {steps.map((step, index) => (
          <li
            className="group relative min-h-[142px] rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-4 transition hover:border-[#D7E7E8] hover:bg-white"
            key={step.label}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF8F6] text-sm font-black text-[#168F86] ring-1 ring-[#D7E7E8]">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-[#061B3A]">{step.label}</h3>
                <p className="mt-2 max-w-[18rem] text-xs font-semibold leading-5 text-[#5B6B7C]">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-4 text-lg font-black text-[#D7E7E8] transition group-hover:text-[#22AFA3]"
              >
                →
              </span>
            ) : (
              <span className="absolute bottom-4 right-4 rounded-full bg-white px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.12em] text-[#168F86] ring-1 ring-[#D7E7E8]">
                Accord
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
