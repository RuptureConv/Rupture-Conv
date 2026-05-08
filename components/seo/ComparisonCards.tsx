type ComparisonItem = {
  points: readonly string[];
  title: string;
};

type ComparisonCardsProps = {
  items: readonly [ComparisonItem, ComparisonItem];
  title: string;
};

export function ComparisonCards({ items, title }: ComparisonCardsProps) {
  return (
    <section className="rounded-2xl border border-[#E5EEF0] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-extrabold text-[#061B3A]">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <article
            className="rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-4"
            key={item.title}
          >
            <h3 className="text-base font-extrabold text-[#061B3A]">{item.title}</h3>
            <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-[#5B6B7C]">
              {item.points.map((point) => (
                <li className="flex gap-2" key={point}>
                  <span aria-hidden="true" className="text-[#22AFA3]">
                    —
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
