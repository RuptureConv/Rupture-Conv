import Link from "next/link";

function BrandIcon() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D7E7E8] bg-white shadow-[0_14px_40px_rgba(6,27,58,0.08)]">
      <svg
        aria-hidden="true"
        className="h-7 w-7 text-[#22AFA3]"
        fill="none"
        viewBox="0 0 32 32"
      >
        <path
          d="M9 4.75h9.5L24 10.25V27.25H9V4.75Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M18.5 4.75V10.25H24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M12.5 14.25H20.5M12.5 18H16"
          stroke="#061B3A"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <rect
          height="9"
          rx="2"
          stroke="#061B3A"
          strokeWidth="2"
          width="8"
          x="16"
          y="18"
        />
        <path
          d="M18.25 21H21.75M18.25 24H18.3M21.7 24H21.75"
          stroke="#061B3A"
          strokeLinecap="round"
          strokeWidth="1.7"
        />
      </svg>
    </span>
  );
}

export function Logo() {
  return (
    <Link
      aria-label="RuptureConv, retour à l'accueil"
      className="group flex items-center gap-3"
      href="/"
    >
      <BrandIcon />
      <span className="leading-none">
        <span className="block text-xl font-black tracking-[-0.01em]">
          <span className="text-[#061B3A]">Rupture</span>
          <span className="text-[#22AFA3]">Conv.</span>
        </span>
        <span className="mt-1 block text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-[#5B6B7C]">
          Le simulateur de rupture conventionnelle
        </span>
      </span>
    </Link>
  );
}
