import Link from "next/link";

type DisclaimerProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Disclaimer({
  title = "Simulation indicative",
  children,
  className = ""
}: DisclaimerProps) {
  return (
    <aside
      className={`rounded-xl border border-[#E5EEF0] bg-[#F7FBFA] p-4 text-sm leading-6 text-[#5B6B7C] ${className}`}
      aria-labelledby="disclaimer-title"
    >
      <p id="disclaimer-title" className="font-bold text-[#061B3A]">
        {title}
      </p>
      <div className="mt-2">
        {children ?? (
          <>
            <p>
              Ce calcul donne une première base. Il dépend des informations
              saisies et certaines situations particulières peuvent modifier le
              résultat.
            </p>
            <Link
              className="mt-2 inline-flex font-bold text-[#168F86] transition hover:text-[#061B3A]"
              href="/sources-juridiques"
            >
              Voir la méthode et les limites des estimations
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
