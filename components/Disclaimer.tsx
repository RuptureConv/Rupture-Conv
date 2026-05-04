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
          <p>
            Cette estimation ne remplace pas un conseil juridique, RH, paie ou fiscal.
            Le montant réel peut varier selon la convention collective, la
            situation personnelle, l&apos;éligibilité à la retraite et les règles
            d&apos;exonération applicables.
          </p>
        )}
      </div>
    </aside>
  );
}
