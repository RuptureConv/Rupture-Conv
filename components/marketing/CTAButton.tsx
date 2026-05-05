"use client";

import type { MouseEvent, ReactNode } from "react";

export function CTAButton({
  children,
  href = "#simulateur",
  size = "md",
  className = ""
}: {
  children: ReactNode;
  href?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (href !== "#simulateur") {
      return;
    }

    const simulator = document.getElementById("simulateur");

    if (!simulator) {
      return;
    }

    event.preventDefault();
    simulator.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <a
      className={`inline-flex items-center justify-center rounded-full bg-[#22AFA3] font-extrabold text-white shadow-[0_18px_36px_rgba(34,175,163,0.26)] transition hover:bg-[#168F86] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8CE3DB] ${
        size === "lg" ? "min-h-14 px-7 text-base" : "min-h-11 px-5 text-sm"
      } ${className}`}
      href={href}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
