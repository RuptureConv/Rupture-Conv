import Link from "next/link";

type RuptureReformNoticeProps = {
  className?: string;
  compact?: boolean;
};

export function RuptureReformNotice({
  className = "",
  compact = false
}: RuptureReformNoticeProps) {
  return (
    <aside
      className={`rounded-2xl border border-[#BFE8E3] bg-[#EAF8F6] p-5 text-[#102A4C] shadow-sm ${className}`}
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#168F86]">
        Réforme 2026
      </p>
      <h2 className="mt-2 text-xl font-black tracking-[-0.01em] text-[#061B3A]">
        La rupture conventionnelle garde son cadre, le chômage évolue.
      </h2>
      <p className="mt-3 text-sm font-semibold leading-7 text-[#5B6B7C]">
        La rupture conventionnelle continue d&apos;ouvrir droit au chômage sous
        conditions. Pour les fins de contrat à compter du 1er septembre 2026,
        la durée maximale est de 15 mois avant 55 ans et de 20,5 mois à partir
        de 55 ans. Le calcul de l&apos;indemnité minimale n&apos;est pas supprimé.
      </p>
      {compact ? null : (
        <p className="mt-3 text-xs font-semibold leading-6 text-[#5B6B7C]">
          Avant le 1er septembre 2026, les plafonds généraux restent applicables.
          France Travail confirme la durée réellement acquise selon le dossier.
        </p>
      )}
      <Link
        className="mt-4 inline-flex min-h-10 items-center rounded-full bg-[#061B3A] px-4 text-sm font-bold text-white transition hover:bg-[#102A4C] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
        href="/reforme-rupture-conventionnelle-2026"
      >
        Voir le détail
      </Link>
    </aside>
  );
}
