import Link from "next/link";
import type { Route } from "next";
import type { HrToolDefinition } from "@/lib/calculators/tools-registry";

type ToolCardProps = {
  tool: HrToolDefinition;
};

export function ToolCard({ tool }: ToolCardProps) {
  const isLive = tool.status === "live";

  return (
    <article className="rounded-2xl border border-[#E5EEF0] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-bold text-[#061B3A]">{tool.title}</p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isLive ? "bg-[#EAF8F6] text-[#168F86]" : "bg-[#EAF8F6] text-[#22AFA3]"
          }`}
        >
          {isLive ? "Disponible" : "Guide RH"}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">{tool.description}</p>
      <Link
        href={tool.href as Route}
        className="mt-4 inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
        aria-label={`Voir l'outil ${tool.title}`}
      >
        {isLive ? "Ouvrir l'outil" : "Voir la page prévue"}
      </Link>
    </article>
  );
}
