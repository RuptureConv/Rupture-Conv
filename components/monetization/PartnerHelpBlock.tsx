import { monetizationLinks } from "@/lib/monetization.config";

export function PartnerHelpBlock() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-[#E5EEF0] bg-white p-5 shadow-[0_18px_60px_rgba(6,27,58,0.05)] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#168F86]">
              Estimation indicative
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.02em] text-[#061B3A]">
              Besoin d’une estimation avant d’échanger avec votre employeur ?
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#5B6B7C]">
              Commencez par calculer une estimation indicative de votre
              indemnité. Vous pourrez ensuite comparer ce montant avec une
              proposition réelle ou préparer vos échanges plus sereinement.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#22AFA3] px-5 text-sm font-black text-white transition hover:bg-[#168F86]"
              href="#simulateur"
            >
              Calculer mon indemnité →
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E5EEF0] px-5 text-sm font-black text-[#061B3A] transition hover:bg-[#F7FBFA]"
              href={monetizationLinks.resourcesIndex.href}
            >
              {monetizationLinks.resourcesIndex.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
