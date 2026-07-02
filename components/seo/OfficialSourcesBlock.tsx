import { officialSources } from "@/lib/official-sources";

export function OfficialSourcesBlock() {
  return (
    <section
      aria-labelledby="official-sources-title"
      className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm"
    >
      <h2
        className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]"
        id="official-sources-title"
      >
        Sources et repères officiels
      </h2>
      <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-[#5B6B7C]">
        Ces liens permettent de relire les règles générales auprès des services
        qui publient les textes ou examinent les situations. Ils ne remplacent
        pas la vérification de votre propre dossier.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {officialSources.map((source) => (
          <li key={source.url}>
            <a
              className="block h-full rounded-xl border border-[#E5EEF0] bg-[#F7FBFA] p-4 transition hover:border-[#22AFA3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22AFA3]"
              href={source.url}
              rel="noreferrer"
              target="_blank"
            >
              <span className="block text-sm font-black text-[#061B3A]">
                {source.label}
                <span className="sr-only"> (ouvre un nouvel onglet)</span>
              </span>
              <span className="mt-2 block text-sm leading-6 text-[#5B6B7C]">
                {source.description}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
