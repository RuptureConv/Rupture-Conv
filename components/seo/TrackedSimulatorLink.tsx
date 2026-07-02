"use client";

import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { trackToolCrosslinkClick } from "@/lib/analytics";

type TrackedSimulatorLinkProps = {
  buttonType: string;
  children: ReactNode;
  className?: string;
  href?: Route;
};

export function TrackedSimulatorLink({
  buttonType,
  children,
  className,
  href = "/#simulateur"
}: TrackedSimulatorLinkProps) {
  function handleClick() {
    const buttonText =
      typeof children === "string" ? children.replace(/\s+/g, " ").trim() : "";

    trackToolCrosslinkClick({
      source_page: window.location.pathname,
      target_tool: "termination_calculator",
      link_label: buttonText,
      location: buttonType
    });
  }

  return (
    <Link className={className} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
