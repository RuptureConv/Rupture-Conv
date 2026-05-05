import { CTAButton } from "@/components/marketing/CTAButton";

const miniFaqItems = [
  {
    question: "Quel est le minimum légal ?",
    answer:
      "Le minimum correspond au moins à l’indemnité légale de licenciement : un quart de mois de salaire par année jusqu’à 10 ans, puis un tiers au-delà."
  },
  {
    question: "Comment est calculée l’indemnité ?",
    answer:
      "Le calcul part du salaire brut de référence et de l’ancienneté exacte. La convention collective peut prévoir une règle plus favorable."
  },
  {
    question: "Est-ce brut ou net ?",
    answer:
      "Le minimum est raisonné en brut. Le net indicatif dépend ensuite des cotisations, exonérations et de la situation individuelle."
  }
];

export function MiniFAQ() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#E5EEF0] bg-[#F7FBFA] p-6 shadow-[0_18px_60px_rgba(6,27,58,0.04)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#168F86]">
                Questions fréquentes
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] text-[#061B3A]">
                Les repères essentiels avant de simuler
              </h2>
            </div>
            <CTAButton>Calculer mon indemnité →</CTAButton>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {miniFaqItems.map((item) => (
              <article
                className="rounded-[20px] border border-[#E5EEF0] bg-white p-5"
                key={item.question}
              >
                <h3 className="text-lg font-black text-[#061B3A]">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
