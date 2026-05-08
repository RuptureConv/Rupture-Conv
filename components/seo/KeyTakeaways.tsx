type KeyTakeawaysProps = {
  items: string[];
  title?: string;
};

export function KeyTakeaways({ items, title = "À retenir" }: KeyTakeawaysProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-2xl border border-[#D7E7E8] bg-[#F7FBFA] p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-extrabold text-[#061B3A]">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm font-semibold leading-7 text-[#102A4C] sm:text-base">
        {items.slice(0, 5).map((item) => (
          <li className="flex gap-3" key={item}>
            <span
              aria-hidden="true"
              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#22AFA3]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
