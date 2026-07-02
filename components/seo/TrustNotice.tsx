import Link from "next/link";

type TrustNoticeProps = {
  className?: string;
  tool: "termination" | "unemployment" | "salary";
};

const trustCopy = {
  termination: {
    title: "Comment lire cette estimation ?",
    body:
      "Elle donne une première base à partir des informations saisies. Le montant réellement retenu peut varier selon l’ancienneté exacte, la rémunération de référence, la convention collective et les éléments vérifiés par l’employeur."
  },
  unemployment: {
    title: "Comment lire cette projection ?",
    body:
      "Elle donne un ordre de grandeur. France Travail applique ses propres vérifications sur les rémunérations retenues, les différés et votre situation au moment de l’inscription."
  },
  salary: {
    title: "À garder en tête",
    body:
      "Ce calcul brut-net donne un ordre de grandeur. Le bulletin réel peut varier selon le statut, les cotisations, la mutuelle, les avantages, les primes et les heures supplémentaires."
  }
} as const;

export function TrustNotice({ className = "", tool }: TrustNoticeProps) {
  const copy = trustCopy[tool];
  const titleId = `${tool}-trust-notice-title`;

  return (
    <aside
      aria-labelledby={titleId}
      className={`rounded-xl border border-[#D7E7E8] bg-[#F7FBFA] p-4 text-sm leading-6 text-[#5B6B7C] ${className}`}
    >
      <p className="font-black text-[#061B3A]" id={titleId}>
        {copy.title}
      </p>
      <p className="mt-2">{copy.body}</p>
      <Link
        className="mt-3 inline-flex font-bold text-[#168F86] transition hover:text-[#061B3A]"
        href="/sources-juridiques"
      >
        Comprendre la méthode et les sources
      </Link>
    </aside>
  );
}
