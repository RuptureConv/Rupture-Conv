"use client";

import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { trackCalculatorEvent } from "@/lib/analytics";

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

    trackCalculatorEvent("simulateur_cta_click", {
      source: "seo_cta",
      button_text: buttonText,
      button_type: buttonType,
      page_location: window.location.href,
      page_title: document.title
    });
  }

  return (
    <Link className={className} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
