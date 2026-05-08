const delaySteps = [
  {
    label: "Jour 0",
    text: "Signature de la convention si les parties sont d’accord."
  },
  {
    label: "+15 jours calendaires",
    text: "Délai de rétractation prévu par la procédure."
  },
  {
    label: "Instruction DREETS",
    text: "La demande d’homologation est examinée par l’administration."
  },
  {
    label: "Date de rupture",
    text: "Elle ne peut intervenir qu’après la fin de la procédure applicable."
  }
];

export function DelayTimeline() {
  return (
    <section className="rounded-[28px] border border-[#E5EEF0] bg-[#F7FBFA] p-5 shadow-[0_18px_55px_rgba(6,27,58,0.04)] sm:p-7">
      <h2 className="text-xl font-extrabold text-[#061B3A]">
        Les délais à garder en tête
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {delaySteps.map((step, index) => (
          <article
            className="relative rounded-2xl border border-[#E5EEF0] bg-white p-4"
            key={step.label}
          >
            <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF8F6] text-xs font-black text-[#168F86] ring-1 ring-[#D7E7E8]">
              {index + 1}
            </span>
            <p className="pr-10 text-sm font-black text-[#168F86]">{step.label}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#5B6B7C]">
              {step.text}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs font-semibold leading-5 text-[#5B6B7C]">
        Ces repères restent indicatifs : le calendrier réel dépend du dossier, des
        dates retenues et de l’instruction administrative.
      </p>
    </section>
  );
}
