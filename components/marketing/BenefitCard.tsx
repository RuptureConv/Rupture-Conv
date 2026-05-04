type BenefitIcon = "shield" | "bolt" | "lock";

function Icon({ type }: { type: BenefitIcon }) {
  if (type === "bolt") {
    return (
      <path
        d="M15.6 3.5 7.8 14.1h6.1l-1.5 8.4 7.8-10.6h-6.1l1.5-8.4Z"
        fill="currentColor"
      />
    );
  }

  if (type === "lock") {
    return (
      <>
        <path
          d="M7.5 11.2h13v9.1a2.2 2.2 0 0 1-2.2 2.2H9.7a2.2 2.2 0 0 1-2.2-2.2v-9.1Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M10.3 11.2V8.5a3.7 3.7 0 0 1 7.4 0v2.7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </>
    );
  }

  return (
    <>
      <path
        d="M14 3.8 21.5 7v5.7c0 4.8-3 8.3-7.5 9.8-4.5-1.5-7.5-5-7.5-9.8V7L14 3.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="m10.5 13.3 2.2 2.2 4.8-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </>
  );
}

export function BenefitCard({
  icon,
  title,
  text
}: {
  icon: BenefitIcon;
  title: string;
  text: string;
}) {
  return (
    <article className="flex gap-4 rounded-[24px] border border-[#E5EEF0] bg-white p-4 shadow-[0_18px_50px_rgba(6,27,58,0.06)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF8F6] text-[#22AFA3]">
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 28 28">
          <Icon type={icon} />
        </svg>
      </span>
      <span>
        <span className="block text-sm font-extrabold text-[#061B3A]">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-[#5B6B7C]">{text}</span>
      </span>
    </article>
  );
}
