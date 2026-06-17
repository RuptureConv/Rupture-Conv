type PageSummaryProps = {
  sections: string[];
};

function toAnchor(title: string) {
  return title
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getSectionAnchor(title: string) {
  return toAnchor(title);
}

export function PageSummary({ sections }: PageSummaryProps) {
  if (sections.length < 4) {
    return null;
  }

  return (
    <nav
      aria-label="Sommaire de la page"
      className="rounded-[28px] border border-[#E5EEF0] bg-white p-5 shadow-[0_18px_55px_rgba(6,27,58,0.04)] sm:p-7"
    >
      <h2 className="text-xl font-extrabold text-[#061B3A]">Sommaire</h2>
      <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-[#102A4C] sm:grid-cols-2">
        {sections.slice(0, 10).map((section) => (
          <li key={section}>
            <a
              className="block rounded-2xl bg-[#F7FBFA] px-4 py-3 transition hover:bg-[#EAF8F6] hover:text-[#168F86]"
              href={`#${toAnchor(section)}`}
            >
              {section}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
