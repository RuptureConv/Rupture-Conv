import Link from "next/link";

export function SimulatorCTA() {
  return (
    <aside className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
      <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#168F86]">
        Simulation gratuite
      </p>
      <h2 className="mt-4 text-2xl font-extrabold text-[#061B3A]">
        Calculez votre indemnité en quelques secondes
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#5B6B7C]">
        Saisissez votre ancienneté, votre salaire brut et la date de rupture
        pour obtenir une estimation indicative claire avant de signer.
      </p>
      <Link
        href="/#simulateur"
        className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
      >
        Ouvrir le simulateur →
      </Link>
    </aside>
  );
}
