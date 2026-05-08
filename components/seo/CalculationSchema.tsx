import Link from "next/link";

const inputs = ["Salaire de référence", "Ancienneté", "Règles applicables"];

type CalculationSchemaProps = {
  compact?: boolean;
};

export function CalculationSchema({ compact = false }: CalculationSchemaProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#D7E7E8] bg-white p-5 shadow-[0_18px_55px_rgba(6,27,58,0.05)] sm:p-7">
      <span
        aria-hidden="true"
        className="absolute -right-16 -top-20 h-40 w-40 rounded-full bg-[#EAF8F6]"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="relative">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
            Schéma de calcul
          </p>
          <h2 className="mt-2 text-xl font-extrabold text-[#061B3A]">
            Comment l’estimation est construite
          </h2>
        </div>
        {!compact ? (
          <Link
            className="relative inline-flex min-h-10 items-center rounded-full bg-[#22AFA3] px-4 text-sm font-bold text-white shadow-[0_14px_30px_rgba(34,175,163,0.22)] transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
            href="/#simulateur"
          >
            Faire le calcul →
          </Link>
        ) : null}
      </div>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        {inputs.map((item, index) => (
          <div className="contents" key={item}>
            <div className="rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <p className="text-sm font-extrabold text-[#102A4C]">{item}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                <span
                  aria-hidden="true"
                  className="block h-full rounded-full bg-[#22AFA3]"
                  style={{ width: `${58 + index * 14}%` }}
                />
              </div>
            </div>
            {index < inputs.length - 1 ? (
              <div
                aria-hidden="true"
                className="hidden text-center text-xl font-black text-[#22AFA3] sm:block"
              >
                +
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="relative mt-4 rounded-2xl bg-[#061B3A] p-4 text-white shadow-[0_18px_45px_rgba(6,27,58,0.16)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-black">= Estimation indicative</p>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.12em] text-[#EAF8F6]">
            Sans inscription
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-xs font-semibold leading-5 text-white/75">
          Le simulateur aide à appliquer les règles de base, sans remplacer une
          vérification paie, conventionnelle ou juridique.
        </p>
      </div>
    </section>
  );
}
