import Link from "next/link";
import type { Route } from "next";

type ConcreteExampleProps = {
  body: string;
  href?: Route;
  result?: string;
  situation: string;
};

export function ConcreteExample({
  body,
  href = "/#simulateur",
  result,
  situation
}: ConcreteExampleProps) {
  return (
    <aside className="rounded-2xl border border-[#E5EEF0] bg-white p-5 shadow-sm sm:p-6">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
        Exemple concret
      </p>
      <h2 className="mt-3 text-xl font-extrabold text-[#061B3A]">{situation}</h2>
      <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C] sm:text-base">
        {body}
      </p>
      {result ? (
        <p className="mt-4 rounded-2xl bg-[#EAF8F6] p-4 text-sm font-bold leading-7 text-[#168F86]">
          {result}
        </p>
      ) : null}
      <Link
        className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
        href={href}
      >
        Calculer mon indemnité gratuitement →
      </Link>
    </aside>
  );
}
