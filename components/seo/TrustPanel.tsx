const defaultItems = [
  "Simulation gratuite",
  "Sans inscription",
  "Résultat immédiat",
  "Données non conservées",
  "Estimation indicative selon les règles légales de base"
];

type TrustPanelProps = {
  items?: string[];
};

export function TrustPanel({ items = defaultItems }: TrustPanelProps) {
  return (
    <aside className="rounded-2xl border border-[#D7E7E8] bg-[#EAF8F6] p-5 sm:p-6">
      <h2 className="text-xl font-extrabold text-[#061B3A]">
        Un cadre clair pour estimer votre montant
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <p
            className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-[#102A4C] ring-1 ring-[#D7E7E8]"
            key={item}
          >
            {item}
          </p>
        ))}
      </div>
    </aside>
  );
}
