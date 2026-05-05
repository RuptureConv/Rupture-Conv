import { CTAButton } from "@/components/marketing/CTAButton";

const exampleRows = [
  ["Salaire brut mensuel", "2 000 €"],
  ["Ancienneté", "5 ans"],
  ["Indemnité estimée", "~2 500 €"]
];

export function ExampleBlock() {
  return (
    <section className="bg-[#F7FBFA]">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="rounded-[28px] border border-[#E5EEF0] bg-white p-6 shadow-[0_18px_60px_rgba(6,27,58,0.05)]">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#168F86]">
            Exemple concret
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] text-[#061B3A]">
            Exemple d’indemnité
          </h2>
          <p className="mt-4 text-base leading-8 text-[#5B6B7C]">
            Avec un salaire brut mensuel de 2 000 € et 5 ans d’ancienneté, le
            minimum légal indicatif correspond à environ 2 500 € bruts.
          </p>
          <p className="mt-4 text-sm font-semibold leading-7 text-[#5B6B7C]">
            Le montant réel dépend notamment du salaire de référence, des primes,
            des absences éventuelles et de la convention collective applicable.
          </p>
          <div className="mt-6">
            <CTAButton>Tester avec mes informations →</CTAButton>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#E5EEF0] bg-white p-6 shadow-[0_18px_60px_rgba(6,27,58,0.05)]">
          <div className="space-y-3">
            {exampleRows.map(([label, value]) => (
              <div
                className="flex items-center justify-between gap-4 rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] px-4 py-4"
                key={label}
              >
                <span className="text-sm font-bold text-[#5B6B7C]">{label}</span>
                <span className="text-lg font-black text-[#061B3A]">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-[#EAF8F6] p-4 text-sm font-bold leading-7 text-[#168F86] ring-1 ring-[#D7E7E8]">
            Ce repère aide à vérifier rapidement si une proposition de rupture
            conventionnelle respecte le minimum attendu.
          </div>
        </div>
      </div>
    </section>
  );
}
