const mistakes = [
  "Signer avant d’avoir vérifié le montant proposé.",
  "Oublier les délais de rétractation et d’homologation.",
  "Confondre montant brut, net indicatif et somme réellement versée.",
  "Ne pas vérifier la convention collective.",
  "Ne pas conserver une trace claire des échanges."
];

export function CommonMistakes() {
  return (
    <section className="rounded-[28px] border border-[#E5EEF0] bg-white p-5 shadow-[0_18px_55px_rgba(6,27,58,0.04)] sm:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
            Vigilance
          </p>
          <h2 className="mt-2 text-xl font-extrabold text-[#061B3A]">
            Erreurs fréquentes à éviter
          </h2>
        </div>
        <p className="max-w-sm text-sm font-semibold leading-6 text-[#5B6B7C]">
          Des points simples à relire avant de signer ou de négocier.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake, index) => (
          <article
            className="flex gap-3 rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-4 transition hover:bg-white"
            key={mistake}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-[#168F86] ring-1 ring-[#D7E7E8]">
              {index + 1}
            </span>
            <p className="text-sm font-semibold leading-6 text-[#102A4C]">{mistake}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
