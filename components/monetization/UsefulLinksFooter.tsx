const guideLinks = [
  "Comprendre l'indemnité légale",
  "Différence entre indemnité légale et conventionnelle",
  "Rupture conventionnelle et chômage",
  "Délai de rétractation",
  "Homologation de la rupture conventionnelle",
  "Négocier une indemnité supérieure"
];

export function UsefulLinksFooter() {
  return (
    <section className="mt-10 rounded-[28px] border border-[#E5EEF0] bg-white p-5 shadow-[0_16px_50px_rgba(6,27,58,0.04)] sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#22AFA3]">
            Guides
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#061B3A]">Guides pratiques</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[#5B6B7C]">
          Des contenus prêts à accueillir de futures pages SEO, ressources ou
          services partenaires.
        </p>
      </div>
      <nav aria-label="Guides pratiques" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guideLinks.map((label) => (
          <a
            className="rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] px-4 py-3 text-sm font-bold text-[#102A4C] transition hover:border-[#22AFA3] hover:text-[#168F86]"
            href="#"
            key={label}
          >
            {label}
          </a>
        ))}
      </nav>
    </section>
  );
}
