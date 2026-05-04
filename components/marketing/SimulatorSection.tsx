import { AdSlot } from "@/components/AdSlot";
import { TerminationCalculatorTool } from "@/components/tools/TerminationCalculatorTool";
import { adSlots } from "@/lib/ads.config";

export function SimulatorSection() {
  return (
    <section
      className="mx-auto w-full max-w-7xl scroll-mt-[110px] px-4 pb-8 pt-12 sm:px-6 lg:px-8 lg:pb-12 lg:pt-16"
      id="simulateur"
    >
      <div className="min-w-0">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#22AFA3]">
            Simulation personnalisée
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-4xl">
            Votre estimation personnalisée
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5B6B7C]">
            Renseignez quelques informations pour calculer une estimation claire
            de votre indemnité de rupture conventionnelle.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <TerminationCalculatorTool />
          <AdSlot
            {...adSlots.simulatorSidebar}
            className="xl:sticky xl:top-[110px] xl:self-start"
          />
        </div>
      </div>
    </section>
  );
}
