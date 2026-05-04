function ResourceIcon() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF8F6] text-[#22AFA3]">
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path
          d="M7 4.75h7.25L18 8.5v10.75H7V4.75Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M14.25 4.75V8.5H18M9.5 12h5M9.5 15h4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    </span>
  );
}

export function ResourceCard({
  title,
  text,
  cta,
  href,
  sponsored = false
}: {
  title: string;
  text: string;
  cta: string;
  href: string;
  sponsored?: boolean;
}) {
  return (
    <article className="rounded-[20px] border border-[#E5EEF0] bg-white p-5 shadow-[0_16px_45px_rgba(6,27,58,0.05)]">
      <div className="flex items-start gap-4">
        <ResourceIcon />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-black text-[#061B3A]">{title}</h3>
            {sponsored ? (
              <span className="rounded-full bg-[#F7FBFA] px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#5B6B7C]">
                Partenaire
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">{text}</p>
          <a className="mt-4 inline-flex text-sm font-black text-[#168F86] hover:text-[#061B3A]" href={href}>
            {cta}
          </a>
        </div>
      </div>
    </article>
  );
}
