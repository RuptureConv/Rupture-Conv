const defaultItems = [
  "Simulation gratuite",
  "Sans inscription",
  "Résultat immédiat",
  "Données non conservées",
  "Estimation indicative selon les règles légales de base"
];

type TrustPanelProps = {
  items?: string[];
  title?: string;
};

export function TrustPanel({
  items = defaultItems,
  title = "Un cadre clair pour estimer votre montant"
}: TrustPanelProps) {
  return (
    <aside className="rounded-[28px] border border-[#D7E7E8] bg-[#EAF8F6] p-5 shadow-[0_18px_55px_rgba(6,27,58,0.04)] sm:p-7">
      <h2 className="text-xl font-extrabold text-[#061B3A]">
        {title}
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <p
            className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-[#102A4C] shadow-[0_10px_28px_rgba(6,27,58,0.035)] ring-1 ring-[#D7E7E8]"
            key={item}
          >
            <span
              aria-hidden="true"
              className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#22AFA3]"
            />
            <span>{item}</span>
          </p>
        ))}
      </div>
    </aside>
  );
}
