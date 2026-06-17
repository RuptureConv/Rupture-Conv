import Link from "next/link";
import type { Route } from "next";

type HubCtaBlockProps = {
  ctaLabel?: string;
  description?: string;
  href?: string;
  title?: string;
  variant?: "soft" | "solid";
};

export function HubCtaBlock({
  ctaLabel = "Voir le guide complet",
  description = "Le simulateur donne une estimation. Le guide vous aide à comprendre les étapes, les délais, le chômage et les erreurs à éviter.",
  href = "/rupture-conventionnelle",
  title = "Besoin d’y voir clair avant de calculer ?",
  variant = "soft"
}: HubCtaBlockProps) {
  const isSolid = variant === "solid";

  return (
    <aside
      className={`rounded-[28px] border p-6 shadow-[0_16px_50px_rgba(6,27,58,0.04)] sm:p-7 ${
        isSolid
          ? "border-[#D7EDEA] bg-[#EAF8F6]"
          : "border-[#E5EEF0] bg-white"
      }`}
    >
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#168F86]">
        Guide complet
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-[-0.02em] text-[#061B3A]">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-[#5B6B7C]">
        {description}
      </p>
      <Link
        href={href as Route}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#061B3A] px-5 text-sm font-black text-white transition hover:bg-[#102A4C] focus:outline-none focus:ring-2 focus:ring-[#061B3A] focus:ring-offset-2"
      >
        {ctaLabel} →
      </Link>
    </aside>
  );
}
