"use client";

import Link from "next/link";
import type { Route } from "next";
import { trackInternalLinkClick } from "@/lib/analytics";
import type { PostSimulationLink } from "@/lib/internal-tool-links";

type PostSimulationLinksProps = {
  className?: string;
  intro: string;
  links: PostSimulationLink[];
  location: string;
  sourceTool: string;
  title: string;
};

export function PostSimulationLinks({
  className = "",
  intro,
  links,
  location,
  sourceTool,
  title
}: PostSimulationLinksProps) {
  return (
    <section
      aria-labelledby={`${location}-next-steps-title`}
      className={`rounded-2xl border border-[#D7E7E8] bg-[#F7FBFA] p-4 sm:p-5 ${className}`}
    >
      <h3
        id={`${location}-next-steps-title`}
        className="text-lg font-black text-[#061B3A]"
      >
        {title}
      </h3>
      <p className="mt-2 text-sm font-semibold leading-7 text-[#5B6B7C]">
        {intro}
      </p>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <Link
            className="group block rounded-xl border border-[#E5EEF0] bg-white p-4 transition hover:border-[#22AFA3] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
            href={link.href as Route}
            key={`${link.href}-${link.label}`}
            onClick={() =>
              trackInternalLinkClick(link.eventName ?? "post_simulation_click", {
                source_tool: sourceTool,
                target_page: link.targetPage,
                link_label: link.label,
                location
              })
            }
          >
            <span className="block text-sm font-black text-[#061B3A] group-hover:text-[#168F86]">
              {link.label}
            </span>
            <span className="mt-1 block text-sm font-semibold leading-6 text-[#5B6B7C]">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
