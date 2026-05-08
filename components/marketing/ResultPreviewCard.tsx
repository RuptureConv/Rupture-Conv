function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7 text-white" fill="none" viewBox="0 0 28 28">
      <path
        d="m8.2 14.2 3.6 3.6 8-8.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.6"
      />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg aria-hidden="true" className="h-9 w-9 text-[#22AFA3]" fill="none" viewBox="0 0 36 36">
      <rect height="25" rx="6" stroke="currentColor" strokeWidth="2.4" width="22" x="7" y="5" />
      <path d="M12 11h12M12 18h.1M18 18h.1M24 18h.1M12 24h.1M18 24h.1M24 24h.1" stroke="#061B3A" strokeLinecap="round" strokeWidth="2.6" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg aria-hidden="true" className="h-10 w-10 text-[#061B3A]" fill="none" viewBox="0 0 40 40">
      <path d="M11 5h12l6 6v24H11V5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.4" />
      <path d="M23 5v7h6M15.5 19h9M15.5 24h6M15.5 29h11" stroke="#22AFA3" strokeLinecap="round" strokeWidth="2.4" />
    </svg>
  );
}

export function ResultPreviewCard() {
  const rows = [
    ["Indemnité légale minimale", "12 980 €"],
    ["Indemnité conventionnelle", "18 450 €"],
    ["Indemnité négociée estimée", "18 450 €"]
  ];

  return (
    <div className="relative mx-auto max-w-xl">
      <div className="absolute -left-5 top-16 hidden h-20 w-20 rotate-[-10deg] items-center justify-center rounded-[26px] border border-[#E5EEF0] bg-white shadow-[0_20px_60px_rgba(6,27,58,0.12)] sm:flex">
        <CalculatorIcon />
      </div>
      <div className="absolute -right-4 top-6 hidden h-20 w-20 rotate-[8deg] items-center justify-center rounded-[26px] border border-[#E5EEF0] bg-white shadow-[0_20px_60px_rgba(6,27,58,0.12)] sm:flex">
        <DocumentIcon />
      </div>
      <div className="absolute -right-2 bottom-20 hidden h-14 w-14 items-center justify-center rounded-full bg-[#22AFA3] shadow-[0_18px_50px_rgba(34,175,163,0.32)] sm:flex">
        <CheckIcon />
      </div>

      <div className="rounded-[34px] border border-[#DDEBEE] bg-[#EAF1F2] p-4 shadow-[0_30px_90px_rgba(6,27,58,0.16)]">
        <div className="rounded-[26px] bg-[#061B3A] p-3">
          <div className="rounded-[20px] bg-[#F7FBFA] p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#FB7185]" />
              <span className="h-3 w-3 rounded-full bg-[#FBBF24]" />
              <span className="h-3 w-3 rounded-full bg-[#22AFA3]" />
            </div>

            <div className="rounded-[26px] border border-[#E5EEF0] bg-white p-5 shadow-[0_18px_60px_rgba(6,27,58,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-[#061B3A]">
                    Estimation de votre indemnité
                  </p>
                  <p className="mt-3 text-5xl font-black tracking-[-0.03em] text-[#22AFA3]">
                    18 450 €
                  </p>
                </div>
                <span className="rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-extrabold text-[#168F86]">
                  Exemple indicatif
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {rows.map(([label, value]) => (
                  <div
                    className="flex items-center justify-between gap-4 rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] px-4 py-3 text-sm"
                    key={label}
                  >
                    <span className="font-semibold text-[#5B6B7C]">{label}</span>
                    <span className="font-black text-[#061B3A]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-end gap-2 rounded-[22px] bg-[#061B3A] p-4">
                {[34, 48, 64, 82].map((height, index) => (
                  <span
                    className="flex-1 rounded-t-xl bg-[#22AFA3]"
                    key={height}
                    style={{ height: `${height}px`, opacity: 0.58 + index * 0.1 }}
                  />
                ))}
                <span className="ml-2 text-xs font-bold uppercase tracking-[0.12em] text-white/75">
                  Projection
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold leading-5 text-[#5B6B7C]">
                Aperçu illustratif. Le montant réel dépend des éléments saisis
                dans le simulateur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
