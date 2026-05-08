import { CTAButton } from "@/components/marketing/CTAButton";

const trustItems = [
  "Estimation basée sur les règles légales de base",
  "Montant indicatif à vérifier selon votre situation",
  "Estimation indicative, gratuite et sans inscription"
];

export function TrustBlock() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#E5EEF0] bg-[#F7FBFA] p-5 shadow-[0_18px_60px_rgba(6,27,58,0.04)] sm:p-6 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#168F86]">
              Repères RH
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-3xl">
              Une estimation claire avant toute discussion de départ
            </h2>
            <div className="mt-5 grid gap-3 text-sm font-bold leading-7 text-[#102A4C] sm:grid-cols-3">
              {trustItems.map((item) => (
                <p
                  className="rounded-2xl border border-[#E5EEF0] bg-white px-4 py-3"
                  key={item}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-6 shrink-0 lg:mt-0">
            <CTAButton>Calculer mon indemnité →</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
