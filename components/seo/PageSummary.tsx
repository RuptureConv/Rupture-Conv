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
      className="rounded-2xl border border-[#E5EEF0] bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="text-xl font-extrabold text-[#061B3A]">Sommaire</h2>
      <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-[#102A4C] sm:grid-cols-2">
        {sections.slice(0, 6).map((section) => (
          <li key={section}>
            <a className="transition hover:text-[#22AFA3]" href={`#${toAnchor(section)}`}>
              {section}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
