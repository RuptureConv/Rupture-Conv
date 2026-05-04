import { hrTools } from "@/lib/calculators/tools-registry";
import { ToolCard } from "@/components/tools/ToolCard";

export function ComingTools() {
  const plannedTools = hrTools.filter((tool) => tool.status === "planned");

  return (
    <section id="outils" className="mt-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#061B3A]">Autres outils RH à venir</h2>
          <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
            La plateforme est organisée pour accueillir plusieurs simulateurs RH
            simples, sans compte et utilisables sur mobile.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {plannedTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
