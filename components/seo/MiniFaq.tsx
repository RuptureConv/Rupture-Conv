import type { FaqEntry } from "@/lib/seo-content";

type MiniFaqProps = {
  items: FaqEntry[];
  title?: string;
};

export function MiniFaq({ items, title = "Questions rapides" }: MiniFaqProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[#E5EEF0] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-extrabold text-[#061B3A]">{title}</h2>
      <div className="mt-3 divide-y divide-[#E5EEF0]">
        {items.slice(0, 4).map((item, index) => (
          <details className="group py-4" key={item.question} open={index === 0}>
            <summary className="flex cursor-pointer items-start justify-between gap-4 text-sm font-bold leading-7 text-[#061B3A]">
              {item.question}
              <span
                aria-hidden="true"
                className="shrink-0 text-xl leading-7 text-[#22AFA3] transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
