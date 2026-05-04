import { Header } from "@/components/Header";

type LegalPageProps = {
  title: string;
  intro: string;
  sections: {
    title: string;
    body: React.ReactNode;
  }[];
};

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6 lg:py-14">
        <h1 className="text-4xl font-black leading-tight tracking-[-0.02em] text-[#061B3A]">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-[#5B6B7C]">{intro}</p>
        <div className="mt-8 space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-[#E5EEF0] bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-bold text-[#061B3A]">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-[#5B6B7C]">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
