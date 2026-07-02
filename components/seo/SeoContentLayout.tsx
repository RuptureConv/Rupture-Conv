import Link from "next/link";
import type { Route } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { CalculationSchema } from "@/components/seo/CalculationSchema";
import { CommonMistakes } from "@/components/seo/CommonMistakes";
import { ComparisonCards } from "@/components/seo/ComparisonCards";
import { ConcreteExample } from "@/components/seo/ConcreteExample";
import { DecisionGuide } from "@/components/seo/DecisionGuide";
import { DelayTimeline } from "@/components/seo/DelayTimeline";
import { HubCtaBlock } from "@/components/seo/HubCtaBlock";
import { InternalLinksBlock } from "@/components/seo/InternalLinksBlock";
import { KeyTakeaways } from "@/components/seo/KeyTakeaways";
import {
  getSectionAnchor,
  PageSummary
} from "@/components/seo/PageSummary";
import { ProfessionalLetterBlock } from "@/components/seo/ProfessionalLetterBlock";
import { ProcessTimeline } from "@/components/seo/ProcessTimeline";
import { RuptureReformNotice } from "@/components/seo/RuptureReformNotice";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { SimulatorCTA } from "@/components/seo/SimulatorCTA";
import { MiniFaq } from "@/components/seo/MiniFaq";
import { TrackedSimulatorLink } from "@/components/seo/TrackedSimulatorLink";
import { TrustPanel } from "@/components/seo/TrustPanel";
import type { FaqEntry, SeoSection } from "@/lib/seo-content";
import { absoluteUrl, buildCtrTitle, mandatoryDisclaimer } from "@/lib/seo-content";
import { siteName } from "@/lib/site";

type SeoContentLayoutProps = {
  canonicalPath: string;
  conclusion: string[];
  faq: FaqEntry[];
  h1: string;
  intro: string[];
  relatedLinks: string[];
  sections: SeoSection[];
  updatedAt?: string;
  updatedLabel?: string;
};

const HUB_LINK_PATHS = new Set([
  "/simulateur-rupture-conventionnelle",
  "/calcul-indemnite-rupture-conventionnelle",
  "/calcul-indemnite-rupture-conventionnelle-net",
  "/indemnite-legale-rupture-conventionnelle",
  "/rupture-conventionnelle-cdi",
  "/modele-lettre-rupture-conventionnelle",
  "/rupture-conventionnelle-chomage",
  "/negocier-rupture-conventionnelle",
  "/blog/delai-rupture-conventionnelle-combien-de-temps"
]);

const PREAVIS_PATHS = new Set([
  "/guide-preavis",
  "/preavis-demission",
  "/preavis-rupture-conventionnelle",
  "/preavis-licenciement",
  "/dispense-de-preavis",
  "/calcul-preavis",
  "/preavis-cadre",
  "/preavis-non-cadre",
  "/conges-payes-pendant-preavis",
  "/arret-maladie-pendant-preavis",
  "/reduction-preavis",
  "/duree-preavis-anciennete",
  "/date-fin-contrat-preavis",
  "/travailler-ailleurs-pendant-preavis",
  "/preavis-abandon-de-poste",
  "/indemnite-compensatrice-preavis"
]);

const REFORM_NOTICE_PATHS = new Set([
  "/simulateur-rupture-conventionnelle",
  "/calcul-indemnite-rupture-conventionnelle",
  "/calcul-indemnite-rupture-conventionnelle-net",
  "/indemnite-legale-rupture-conventionnelle",
  "/rupture-conventionnelle-cdi",
  "/rupture-conventionnelle-chomage",
  "/modele-lettre-rupture-conventionnelle"
]);

const PREAVIS_INTERNAL_LINKS = [
  { href: "/guide-preavis", label: "guide complet du préavis" },
  { href: "/calcul-preavis", label: "calcul du préavis" },
  { href: "/date-fin-contrat-preavis", label: "date de fin du contrat" },
  { href: "/preavis-demission", label: "préavis de démission" },
  { href: "/preavis-licenciement", label: "préavis de licenciement" },
  { href: "/dispense-de-preavis", label: "dispense de préavis" },
  { href: "/rupture-conventionnelle", label: "rupture conventionnelle" },
  { href: "/chomage-are", label: "guide chômage ARE" },
  { href: "/salaire-brut-net", label: "salaire brut en net" }
] as const;

function formatRelatedLinkLabel(href: string) {
  const label = href
    .replace(/^\/blog\//, "Article : ")
    .replace(/^\//, "")
    .replaceAll("-", " ");

  return buildCtrTitle(label);
}

function parseTableCellLink(cell: string) {
  const separatorIndex = cell.indexOf("|/");

  if (separatorIndex === -1) {
    return null;
  }

  return {
    label: cell.slice(0, separatorIndex),
    href: cell.slice(separatorIndex + 1)
  };
}

function buildTakeaways(h1: string): string[] {
  const normalized = h1.toLocaleLowerCase("fr-FR");

  if (normalized.includes("préavis")) {
    return [
      "Le préavis dépend du motif de rupture, du statut et de la convention collective.",
      "La rupture conventionnelle ne prévoit pas de préavis classique : on fixe une date de rupture.",
      "Une dispense employeur ne se traite pas comme une réduction demandée par le salarié.",
      "La date de fin du contrat doit être cohérente avec les documents de sortie."
    ];
  }

  if (normalized.includes("réforme") || normalized.includes("2026")) {
    return [
      "La rupture conventionnelle continue de pouvoir ouvrir droit au chômage sous conditions.",
      "La réforme annoncée réduit surtout la durée maximale d’indemnisation.",
      "L’indemnité minimale de rupture conventionnelle n’est pas supprimée.",
      "Les textes publiés et les règles France Travail doivent être revérifiés avant signature."
    ];
  }

  if (normalized.includes("chômage")) {
    return [
      "Une rupture conventionnelle homologuée peut ouvrir droit au chômage sous conditions.",
      "Le calendrier dépend notamment des documents de fin de contrat et des règles France Travail.",
      "Une indemnité élevée peut influencer certains différés d’indemnisation.",
      "Le simulateur estime l’indemnité, mais ne calcule pas les droits ARE."
    ];
  }

  if (normalized.includes("lettre")) {
    return [
      "La lettre sert à ouvrir une discussion, pas à imposer la rupture.",
      "Le ton doit rester factuel, professionnel et sans pression.",
      "Le montant de l’indemnité doit être estimé avant la négociation.",
      "La rupture conventionnelle suppose toujours un accord commun."
    ];
  }

  if (normalized.includes("négocier")) {
    return [
      "La négociation se prépare avec des chiffres vérifiés.",
      "Le minimum légal sert de base, mais un montant supérieur peut être discuté.",
      "Le calendrier, la passation et le contexte peuvent compter autant que le montant.",
      "Le simulateur donne un repère avant l’entretien."
    ];
  }

  return [
    "La rupture conventionnelle ouvre droit à une indemnité spécifique.",
    "Le montant dépend principalement de l’ancienneté et du salaire de référence.",
    "La convention collective peut prévoir une règle plus favorable.",
    "Le montant affiché reste une estimation indicative."
  ];
}

function buildExample(h1: string) {
  const normalized = h1.toLocaleLowerCase("fr-FR");

  if (normalized.includes("préavis")) {
    return {
      situation: "Avec un salarié non cadre et un mois de préavis",
      body:
        "Si la démission est reçue le 4 juin, la fin du contrat se calcule en principe autour du 4 juillet, sous réserve de la convention collective et des congés déjà posés.",
      result:
        "La date doit être confirmée par écrit avant de s'engager auprès d'un nouvel employeur."
    };
  }

  if (normalized.includes("lettre")) {
    return {
      situation: "Avant d’envoyer une demande",
      body:
        "Un salarié peut préparer une demande courte, puis estimer son indemnité avant l’échange pour parler du calendrier et du montant avec plus de clarté."
    };
  }

  if (normalized.includes("réforme") || normalized.includes("2026")) {
    return {
      situation: "Après l'adoption parlementaire du 2 juin 2026",
      body:
        "Une personne qui envisage une rupture conventionnelle doit continuer à calculer son indemnité minimale, puis vérifier séparément la durée maximale d'indemnisation chômage applicable à sa date de fin de contrat."
    };
  }

  if (normalized.includes("chômage")) {
    return {
      situation: "Avant de comparer indemnité et chômage",
      body:
        "Une personne qui prépare son départ peut estimer l’indemnité de rupture, puis vérifier séparément les règles d’indemnisation auprès de France Travail."
    };
  }

  return {
    situation: "Avec un salaire de 2 800 € brut et 6 ans d’ancienneté",
    body:
      "Le montant dépend du salaire de référence, des dates exactes et de la convention collective. Le simulateur permet d’obtenir une estimation indicative avec vos propres données.",
    result: "Le résultat doit ensuite être relu avec les bulletins de paie et les règles applicables."
  };
}

function getComparison(h1: string) {
  const normalized = h1.toLocaleLowerCase("fr-FR");

  if (normalized.includes("licenciement")) {
    return {
      title: "Rupture conventionnelle ou licenciement : les repères",
      items: [
        {
          title: "Rupture conventionnelle",
          points: [
            "Repose sur un accord commun.",
            "Prévoit une indemnité spécifique.",
            "Suppose une procédure d’homologation."
          ]
        },
        {
          title: "Licenciement",
          points: [
            "Décision prise par l’employeur.",
            "Dépend d’un motif et d’une procédure.",
            "Peut ouvrir d’autres sujets selon le contexte."
          ]
        }
      ] as const
    };
  }

  if (normalized.includes("net") || normalized.includes("fiscalité")) {
    return {
      title: "Brut ou net : ne pas confondre",
      items: [
        {
          title: "Montant brut",
          points: [
            "Base habituelle du calcul minimum.",
            "Sert à comparer les règles applicables.",
            "Doit être relu avec les éléments de paie."
          ]
        },
        {
          title: "Net indicatif",
          points: [
            "Donne un ordre de grandeur.",
            "Peut varier selon le traitement social et fiscal.",
            "Ne remplace pas une validation paie."
          ]
        }
      ] as const
    };
  }

  if (normalized.includes("minimum") || normalized.includes("négocier")) {
    return {
      title: "Minimum légal ou montant négocié",
      items: [
        {
          title: "Minimum applicable",
          points: [
            "Correspond au plancher à respecter.",
            "Dépend du salaire et de l’ancienneté.",
            "Peut être amélioré par la convention collective."
          ]
        },
        {
          title: "Montant négocié",
          points: [
            "Peut dépasser le minimum.",
            "Dépend du contexte et de l’accord des parties.",
            "Doit rester clairement formalisé."
          ]
        }
      ] as const
    };
  }

  return null;
}

export function SeoContentLayout({
  canonicalPath,
  conclusion,
  faq,
  h1,
  intro,
  relatedLinks,
  sections,
  updatedAt,
  updatedLabel
}: SeoContentLayoutProps) {
  const displayH1 = buildCtrTitle(h1);
  const normalizedH1 = h1.toLocaleLowerCase("fr-FR");
  const comparison = getComparison(h1);
  const shouldShowCalculationSchema =
    normalizedH1.includes("calcul") ||
    normalizedH1.includes("indemnité") ||
    normalizedH1.includes("net");
  const isPreavisPage = PREAVIS_PATHS.has(canonicalPath);
  const shouldShowProcess =
    !isPreavisPage &&
    (normalizedH1.includes("cdi") ||
      normalizedH1.includes("lettre") ||
      normalizedH1.includes("préavis") ||
      normalizedH1.includes("délai") ||
      normalizedH1.includes("conditions"));
  const shouldShowDecisionGuide =
    normalizedH1.includes("négocier") ||
    normalizedH1.includes("refus") ||
    normalizedH1.includes("avantages");
  const estimatedWordCount = [
    ...intro,
    ...sections.flatMap((section) => section.paragraphs),
    ...conclusion
  ].join(" ").split(/\s+/).filter(Boolean).length;
  const shouldShowMidAd = estimatedWordCount > 300;
  const shouldShowHubCta = HUB_LINK_PATHS.has(canonicalPath);
  const isPreavisPillar = canonicalPath === "/guide-preavis";
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: displayH1,
        item: absoluteUrl(canonicalPath)
      }
    ]
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: displayH1,
    description: intro[0],
    mainEntityOfPage: absoluteUrl(canonicalPath),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    author: {
      "@type": "Organization",
      name: siteName
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.ico")
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FBFA]">
      <SeoJsonLd data={faqJsonLd} />
      <SeoJsonLd data={breadcrumbJsonLd} />
      <SeoJsonLd data={articleJsonLd} />

      <article className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6 lg:py-16">
        <Link
          href={isPreavisPillar ? "/guides-complets" : isPreavisPage ? "/guide-preavis" : "/"}
          className="mb-8 inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
        >
          {isPreavisPillar
            ? "← Retour aux guides complets"
            : isPreavisPage
              ? "← Retour au guide préavis"
              : "← Retour au simulateur"}
        </Link>

        <header className="rounded-3xl border border-[#E5EEF0] bg-white p-6 shadow-sm sm:p-8">
          <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#168F86]">
            {isPreavisPage ? "Guide préavis" : "Guide rupture conventionnelle"}
          </p>

          <h1 className="mt-5 text-3xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl">
            {displayH1}
          </h1>

          <div className="mt-5 space-y-4 text-base leading-8 text-[#5B6B7C] sm:text-lg">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {updatedLabel ? (
            <p className="mt-5 rounded-2xl bg-[#F7FBFA] p-4 text-sm font-bold leading-7 text-[#102A4C]">
              {updatedLabel}
            </p>
          ) : null}

          {isPreavisPage ? (
            <Link
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
              href={isPreavisPillar ? "/date-fin-contrat-preavis" : "/guides-complets"}
            >
              {isPreavisPillar
                ? "Vérifier ma date de fin de contrat →"
                : "Voir tous les guides →"}
            </Link>
          ) : (
            <TrackedSimulatorLink
              buttonType="hero"
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
            >
              Faire une simulation gratuite →
            </TrackedSimulatorLink>
          )}
        </header>

        <div className="mt-10 space-y-10">
          {isPreavisPillar ? null : <AdSlot format="horizontal" position="top" />}
          {REFORM_NOTICE_PATHS.has(canonicalPath) ? (
            <RuptureReformNotice compact />
          ) : null}
          <KeyTakeaways items={buildTakeaways(h1)} />
          <TrustPanel
            items={
              isPreavisPillar
                ? [
                    "Date de notification ou de réception",
                    "Durée prévue par le contrat ou la convention collective",
                    "Congés déjà validés",
                    "Dispense ou réduction écrite",
                    "Date de fin à confirmer avant un nouveau poste"
                  ]
                : undefined
            }
            title={
              isPreavisPillar
                ? "Un repère simple pour éviter les erreurs de date"
                : undefined
            }
          />
          {shouldShowHubCta ? (
            <HubCtaBlock
              ctaLabel="Replacer dans le parcours complet"
              description="Après cette lecture, le guide central vous aide à relier le calcul, la procédure, le chômage, les documents et la négociation."
              title="Vous voulez voir l’ensemble du parcours ?"
            />
          ) : null}
          <PageSummary sections={sections.map((section) => section.title)} />
          {shouldShowCalculationSchema ? <CalculationSchema /> : null}
          {shouldShowProcess ? (
            <>
              <ProcessTimeline />
              <DelayTimeline />
            </>
          ) : null}
          {comparison ? (
            <ComparisonCards items={comparison.items} title={comparison.title} />
          ) : null}
          {shouldShowDecisionGuide ? <DecisionGuide /> : null}

          <section className="rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
              {isPreavisPage
                ? "Quelle date retenir pour la fin du contrat ?"
                : "Combien touche-t-on en rupture conventionnelle ?"}
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5B6B7C]">
              {isPreavisPage
                ? "La date utile n'est pas toujours le dernier jour travaillé. Elle dépend du préavis exécuté ou payé, d'une éventuelle dispense, des congés et des accords écrits entre les parties."
                : "Le montant dépend principalement du salaire brut de référence et de l'ancienneté. Le minimum légal sert de plancher, puis une indemnité supérieure peut être négociée selon le contexte."}
            </p>
          </section>

          {isPreavisPillar ? null : <AdSlot format="horizontal" position="after-content" />}
          {isPreavisPage ? (
            <HubCtaBlock
              ctaLabel="Ouvrir le hub des guides"
              description="Le préavis se comprend mieux quand il est relié à la rupture conventionnelle, au chômage, au salaire brut/net et aux documents de fin de contrat."
              href="/guides-complets"
              title="Besoin de replacer le préavis dans tout le parcours ?"
            />
          ) : (
            <SimulatorCTA
              buttonText="Calculer mon indemnité nette →"
              buttonType="after_explanation"
              description="Le calcul est gratuit, rapide et sans inscription. Il sépare le minimum brut du net indicatif pour mieux préparer votre échange."
              title="Vous pouvez aussi simuler votre indemnité nette"
            />
          )}
          {isPreavisPillar ? null : <ConcreteExample {...buildExample(h1)} />}
          {isPreavisPage ? null : (
            <SimulatorCTA
              buttonText="Tester avec mes chiffres →"
              buttonType="after_example"
              description="Remplacez l'exemple par vos dates, votre salaire brut de référence et votre ancienneté exacte."
              title="Passez de l'exemple à votre situation"
            />
          )}
          <MiniFaq items={faq} />
          {isPreavisPage ? null : <CommonMistakes />}
          {shouldShowMidAd && !isPreavisPillar ? (
            <AdSlot desktopOnly format="rectangle" position="mid" />
          ) : null}

          {sections.map((section) => (
            <section
              id={getSectionAnchor(section.title)}
              key={section.title}
              className="scroll-mt-28 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm lg:scroll-mt-32"
            >
              <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#061B3A]">
                {section.title}
              </h2>

              <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.bullets ? (
                  section.title === "Les erreurs les plus fréquentes" ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <div
                          className="rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-4 text-sm font-semibold leading-7 text-[#102A4C]"
                          key={bullet}
                        >
                          {bullet}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="list-disc space-y-2 pl-6">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )
                ) : null}

                {section.table ? (
                  <div className="overflow-x-auto rounded-2xl border border-[#E5EEF0]">
                    <table className="min-w-full divide-y divide-[#E5EEF0] text-left text-sm">
                      <thead className="bg-[#F7FBFA] text-[#102A4C]">
                        <tr>
                          {section.table.headers.map((header) => (
                            <th className="px-4 py-3 font-extrabold" key={header}>
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5EEF0] bg-white text-[#5B6B7C]">
                        {section.table.rows.map((row) => (
                          <tr key={row.join("|")}>
                            {row.map((cell) => {
                              const link = parseTableCellLink(cell);

                              return (
                                <td className="px-4 py-3 align-top" key={cell}>
                                  {link ? (
                                    <Link
                                      className="font-bold text-[#168F86] transition hover:text-[#061B3A]"
                                      href={link.href as Route}
                                    >
                                      {link.label}
                                    </Link>
                                  ) : (
                                    cell
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

                {section.boxedText &&
                canonicalPath === "/modele-lettre-rupture-conventionnelle" &&
                section.title === "Modèle de lettre simple à copier" ? (
                  <ProfessionalLetterBlock lines={section.boxedText} />
                ) : section.boxedText ? (
                  <div className="rounded-2xl border border-[#E5EEF0] bg-[#F7FBFA] p-5 text-sm font-semibold leading-7 text-[#102A4C]">
                    {section.boxedText.map((line) => (
                      <p key={line} className="whitespace-pre-wrap">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ))}

          <InternalLinksBlock
            ariaLabel={
              isPreavisPage
                ? "Liens utiles sur le préavis"
                : undefined
            }
            links={
              isPreavisPage
                ? PREAVIS_INTERNAL_LINKS.filter((link) => link.href !== canonicalPath)
                : undefined
            }
            title={isPreavisPage ? "Guides utiles sur le préavis" : undefined}
          />
        </div>

        {faq.length > 4 ? (
          <section className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-[#061B3A]">
              Autres questions fréquentes
            </h2>

            <div className="mt-5 divide-y divide-[#E5EEF0]">
              {faq.slice(4).map((item, index) => (
                <details key={item.question} className="group py-5" open={index === 0}>
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-semibold leading-7 text-[#061B3A]">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xl leading-7 text-[#22AFA3] transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <p className="mt-3 text-sm leading-6 text-[#5B6B7C]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#061B3A]">
            {isPreavisPage ? "Dernier contrôle avant de partir" : "Conclusion"}
          </h2>

          <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
            {conclusion.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <p className="rounded-2xl bg-[#F7FBFA] p-4 text-sm font-semibold leading-7 text-[#102A4C]">
              {isPreavisPage
                ? "Cette page donne un repère pratique. La date finale doit être vérifiée avec le contrat, la convention collective, les accords écrits et les documents remis par l'employeur."
                : mandatoryDisclaimer}
            </p>
          </div>

        </section>

        <div className="mt-10">
          {isPreavisPage ? (
            <HubCtaBlock
              ctaLabel="Voir les guides complets"
              description="Continuez avec les guides rupture conventionnelle, chômage ARE et salaire brut/net pour vérifier les effets du départ au-delà du préavis."
              href="/guides-complets"
              title="Continuez votre vérification"
              variant="solid"
            />
          ) : (
            <SimulatorCTA
              buttonText="Faire le calcul gratuit →"
              buttonType="bottom"
              description="Dernière vérification avant de partir : estimez le minimum brut, le net indicatif et la base de négociation en quelques champs."
              title="Calculez avant de signer"
            />
          )}
        </div>

        <div className="mt-10">
          <AdSlot format="horizontal" position="bottom" />
        </div>

        {relatedLinks.length > 0 ? (
          <nav
            aria-label="Pages complémentaires"
            className="mt-10 rounded-2xl border border-[#E5EEF0] bg-white p-6 shadow-sm"
          >
            <h2 className="text-2xl font-extrabold text-[#061B3A]">
              À lire aussi
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm font-semibold leading-7 text-[#102A4C]">
              {relatedLinks.map((href) => (
                <li key={href}>
                  <Link
                    className="transition hover:text-[#22AFA3]"
                    href={href as Route}
                  >
                    {formatRelatedLinkLabel(href)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </article>
    </main>
  );
}
