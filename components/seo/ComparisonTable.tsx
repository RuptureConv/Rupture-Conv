import type { ComparisonPage } from "@/lib/comparison-pages";

type ComparisonTableProps = {
  firstOption: string;
  rows: ComparisonPage["rows"];
  secondOption: string;
};

export function ComparisonTable({
  firstOption,
  rows,
  secondOption
}: ComparisonTableProps) {
  return (
    <section className="rounded-[28px] border border-[#E5EEF0] bg-white p-5 shadow-[0_18px_55px_rgba(6,27,58,0.05)] sm:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
            Comparatif
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
            Les différences à connaître
          </h2>
        </div>
        <p className="max-w-sm text-sm font-semibold leading-6 text-[#5B6B7C]">
          Lecture synthétique : chaque ligne doit ensuite être adaptée au
          contexte réel du dossier.
        </p>
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-[#E5EEF0] md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparaison entre {firstOption} et {secondOption}
          </caption>
          <thead className="bg-[#F7FBFA] text-[#061B3A]">
            <tr>
              <th className="w-[22%] px-4 py-4 font-black" scope="col">
                Critère
              </th>
              <th className="w-[39%] px-4 py-4 font-black" scope="col">
                {firstOption}
              </th>
              <th className="w-[39%] px-4 py-4 font-black" scope="col">
                {secondOption}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5EEF0]">
            {rows.map((row) => (
              <tr className="align-top" key={row.criteria}>
                <th className="bg-white px-4 py-4 font-black text-[#061B3A]" scope="row">
                  {row.criteria}
                </th>
                <td className="bg-white px-4 py-4 font-semibold leading-6 text-[#5B6B7C]">
                  {row.first}
                </td>
                <td className="bg-white px-4 py-4 font-semibold leading-6 text-[#5B6B7C]">
                  {row.second}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 md:hidden">
        {rows.map((row) => (
          <article
            className="rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-4"
            key={row.criteria}
          >
            <h3 className="text-base font-black text-[#061B3A]">{row.criteria}</h3>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-white p-4 ring-1 ring-[#E5EEF0]">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#168F86]">
                  {firstOption}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#5B6B7C]">
                  {row.first}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 ring-1 ring-[#E5EEF0]">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#168F86]">
                  {secondOption}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#5B6B7C]">
                  {row.second}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
