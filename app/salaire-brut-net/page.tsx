import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SalaryNetCalculatorTool } from "@/components/tools/SalaryNetCalculatorTool";
import { serializeJsonLd } from "@/lib/json-ld";
import { siteName, siteUrl } from "@/lib/site";

const title = "Salaire brut en net : estimation mensuelle et annuelle";
const description =
  "Estimez un salaire net horaire, mensuel ou annuel à partir du brut. Repères indicatifs pour cadre, non-cadre, privé ou fonction publique.";
const canonicalUrl = `${siteUrl}/salaire-brut-net`;

const faqItems = [
  {
    question: "Quelle différence entre salaire brut et salaire net ?",
    answer:
      "Le salaire brut correspond au montant avant cotisations salariales. Le salaire net avant impôt correspond au montant après ces cotisations, avant prélèvement à la source."
  },
  {
    question: "Comment convertir un salaire brut en net ?",
    answer:
      "On part du montant brut, on le ramène en base horaire, mensuelle ou annuelle, puis on applique un taux indicatif de cotisations selon le statut."
  },
  {
    question: "Un cadre touche-t-il moins de net qu’un non-cadre ?",
    answer:
      "À salaire brut égal, un cadre peut avoir un net légèrement plus faible dans cette estimation, car certaines cotisations sont généralement plus élevées."
  },
  {
    question: "Le salaire net affiché inclut-il l’impôt ?",
    answer:
      "Le résultat principal affiche le net avant impôt. Si vous renseignez un taux de prélèvement à la source, l’outil affiche aussi une estimation du net après impôt."
  },
  {
    question: "Pourquoi mon net peut-il être différent de cette estimation ?",
    answer:
      "Le montant exact peut varier selon votre mutuelle, vos primes, vos avantages, vos heures supplémentaires, votre convention collective ou les règles appliquées par l’employeur."
  },
  {
    question: "Comment passer d’un salaire annuel brut à un salaire mensuel net ?",
    answer:
      "L’outil divise le brut annuel par 12 pour obtenir un brut mensuel, puis applique le taux de cotisations indicatif correspondant au statut choisi."
  },
  {
    question: "Quel taux utiliser pour passer du brut au net ?",
    answer:
      "Pour un repère rapide, on utilise souvent environ 22 % de cotisations pour un non-cadre du privé et 25 % pour un cadre. La fiche de paie peut donner un résultat différent."
  },
  {
    question: "Le salaire brut sert-il au calcul d'une rupture conventionnelle ?",
    answer:
      "Oui. Le calcul de l'indemnité part du salaire brut de référence, pas du net bancaire. Les primes peuvent aussi compter selon leur nature."
  },
  {
    question: "Quel salaire est pris en compte pour le chômage ?",
    answer:
      "France Travail raisonne à partir des rémunérations de la période de référence pour calculer le SJR. Le dernier salaire net ne suffit pas."
  },
  {
    question: "Le salaire de référence correspond-il au dernier salaire ?",
    answer:
      "Pas toujours. Il peut intégrer des moyennes, des primes ou des périodes particulières. Il faut relire les bulletins et la règle applicable."
  },
  {
    question: "Pourquoi deux salariés avec le même brut peuvent-ils avoir un net différent ?",
    answer:
      "Le contrat, la mutuelle, les avantages, les heures supplémentaires, le statut et certaines lignes de paie peuvent changer le net réellement versé."
  }
];

const recapRows = [
  {
    gross: "1 800 €",
    nonExecutive: "1 404 €",
    executive: "1 350 €",
    annual: "21 600 € brut/an"
  },
  {
    gross: "2 500 €",
    nonExecutive: "1 950 €",
    executive: "1 875 €",
    annual: "30 000 € brut/an"
  },
  {
    gross: "3 000 €",
    nonExecutive: "2 340 €",
    executive: "2 250 €",
    annual: "36 000 € brut/an"
  }
];

const mistakes = [
  "Confondre le net avant impôt avec le montant réellement versé après prélèvement à la source.",
  "Comparer un salaire brut annuel avec un salaire net mensuel sans les remettre sur la même période.",
  "Oublier que le statut cadre peut modifier le net à brut égal.",
  "Ne pas vérifier le 13e mois, les primes, la mutuelle et les titres-restaurant.",
  "Utiliser un taux unique pour tous les salariés alors que la fiche de paie dépend du contrat."
];

export const metadata: Metadata = {
  title: {
    absolute: title
  },
  description,
  alternates: {
    canonical: canonicalUrl
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName,
    type: "website",
    locale: "fr_FR"
  },
  twitter: {
    card: "summary",
    title,
    description
  }
};

export default function SalaryGrossNetPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calcul salaire brut en net",
    url: canonicalUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR"
    },
    description
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Salaire brut en net : guide complet et calculateur",
    description,
    url: canonicalUrl,
    dateModified: "2026-06-06",
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: siteName
    }
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Salaire",
        item: `${siteUrl}/salaire`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Salaire brut en net",
        item: canonicalUrl
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#F7FBFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(webApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
        >
          ← Retour à l&apos;accueil
        </Link>

        <header className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] lg:items-end">
          <div>
            <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#168F86]">
              Outil salaire
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl lg:text-6xl">
              Calcul salaire brut en net
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#5B6B7C]">
              Convertissez rapidement un salaire brut en net, en horaire,
              mensuel ou annuel, avec une estimation adaptée à votre statut.
            </p>
            <p className="mt-4 rounded-2xl bg-[#F7FBFA] p-4 text-sm font-bold leading-7 text-[#102A4C]">
              Mis à jour le 17 juin 2026
            </p>
          </div>

          <aside className="rounded-2xl border border-[#D7E7E8] bg-white p-5 shadow-sm">
            <p className="text-sm font-extrabold text-[#061B3A]">
              Estimation indicative, avant ou après impôt selon les options
              renseignées.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#5B6B7C]">
              Indiquez votre salaire brut, choisissez votre statut, et obtenez
              immédiatement une estimation de votre salaire net en horaire,
              mensuel et annuel.
            </p>
          </aside>
        </header>

        <section className="mt-10 rounded-2xl border border-[#BFE5E1] bg-[#EAF8F6] p-6 shadow-sm lg:p-8">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[#168F86]">
            Réponse immédiate
          </p>
          <p className="mt-3 text-lg font-bold leading-8 text-[#061B3A]">
            Pour convertir un salaire brut en net, retirez les cotisations
            salariales estimées : environ 22 % pour un salarié non-cadre du
            privé et 25 % pour un cadre dans une estimation rapide. Exemple :
            2 500 € brut donnent environ 1 950 € net avant impôt en non-cadre,
            puis environ 1 852,50 € après un prélèvement à la source de 5 %.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
            Salaire brut/net : ce qu&apos;il faut retenir
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              "Le salaire brut correspond au montant avant les cotisations salariales.",
              "Le salaire net correspond au montant versé avant ou après impôt selon le cas affiché.",
              "Le taux de conversion dépend du statut, du contrat et des cotisations.",
              "Le brut/net aide à comprendre une fiche de paie, une négociation ou un calcul d'indemnité.",
              "Pour une rupture conventionnelle ou le chômage, il faut parfois raisonner à partir du salaire de référence."
            ].map((item) => (
              <p
                className="rounded-xl bg-[#F7FBFA] p-4 text-sm font-semibold leading-7 text-[#102A4C]"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        <div className="mt-10 scroll-mt-28" id="simulateur-salaire">
          <SalaryNetCalculatorTool />
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
              Tableau récapitulatif brut/net
            </h2>
            <div className="mt-5 overflow-hidden rounded-xl border border-[#E5EFF0]">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-[#F7FBFA] text-[#102A4C]">
                  <tr>
                    <th className="px-4 py-3 font-black">Brut mensuel</th>
                    <th className="px-4 py-3 font-black">Net non-cadre</th>
                    <th className="px-4 py-3 font-black">Net cadre</th>
                    <th className="px-4 py-3 font-black">Brut annuel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EFF0] text-[#5B6B7C]">
                  {recapRows.map((row) => (
                    <tr key={row.gross}>
                      <td className="px-4 py-3 font-black text-[#061B3A]">
                        {row.gross}
                      </td>
                      <td className="px-4 py-3">{row.nonExecutive}</td>
                      <td className="px-4 py-3">{row.executive}</td>
                      <td className="px-4 py-3">{row.annual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs font-semibold leading-5 text-[#5B6B7C]">
              Montants indicatifs avant impôt, hors primes, mutuelle et lignes
              spécifiques de paie.
            </p>
          </div>

          <div className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
              Schéma explicatif
            </h2>
            <ol className="mt-5 space-y-3">
              {[
                "Salaire brut",
                "Cotisations salariales",
                "Salaire net avant impôt",
                "Prélèvement à la source",
                "Net réellement versé"
              ].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF8F6] text-sm font-black text-[#168F86]">
                    {index + 1}
                  </span>
                  <span className="rounded-xl bg-[#F7FBFA] px-4 py-2 text-sm font-bold leading-6 text-[#102A4C]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
            Une estimation rapide, utile avant de lire votre fiche de paie
          </h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
            <p>
              Le salaire brut correspond au montant avant cotisations
              salariales. Le salaire net est le montant réellement perçu avant
              prélèvement à la source. Le salaire net après impôt dépend du taux
              transmis par l’administration fiscale ou renseigné dans l’outil.
            </p>
            <p className="rounded-xl bg-[#F7FBFA] p-4 text-sm font-bold leading-7 text-[#102A4C]">
              Ce calcul donne une estimation indicative du salaire net. Le
              montant exact peut varier selon votre contrat, votre convention
              collective, vos primes, votre mutuelle, vos avantages, votre temps
              de travail, votre statut et les règles appliquées par l’employeur.
            </p>
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.42fr)]">
          <div className="space-y-6">
            <SeoSection title="Comment passer du salaire brut au salaire net ?">
              <p>
                Le salaire brut est le montant de départ. Pour obtenir une
                estimation du net, on retire les cotisations salariales :
                retraite, assurance maladie, CSG-CRDS et autres retenues selon
                le statut.
              </p>
              <p>
                Pour une estimation rapide, l’outil applique un taux moyen :
                environ 22 % pour un salarié du privé non-cadre, 25 % pour un
                cadre, et 16,5 % pour la fonction publique. Ce n’est pas une
                fiche de paie, mais cela donne un repère clair en quelques
                secondes.
              </p>
            </SeoSection>

            <SeoSection title="Quelle différence entre net avant impôt et net après impôt ?">
              <p>
                Le net avant impôt correspond au salaire après cotisations
                sociales, avant prélèvement à la source. C’est souvent le repère
                utilisé pour comparer deux rémunérations.
              </p>
              <p>
                Le net après impôt dépend de votre taux de prélèvement à la
                source. Si vous indiquez un taux, le simulateur estime le
                montant qui pourrait être versé après retenue d’impôt.
              </p>
            </SeoSection>

            <SeoSection title="Cadre ou non-cadre : pourquoi le résultat peut changer ?">
              <p>
                À salaire brut égal, un cadre peut obtenir un net un peu plus
                faible qu’un non-cadre dans une estimation simplifiée. La raison
                vient notamment de cotisations différentes, en particulier sur
                certains régimes de retraite complémentaire.
              </p>
              <p>
                L’écart exact dépend de la paie réelle. Le simulateur donne une
                lecture pratique pour comparer rapidement deux situations.
              </p>
            </SeoSection>

            <SeoSection title="Salaire horaire, mensuel et annuel : comment sont-ils calculés ?">
              <p>
                Le temps plein est calculé sur une base de 35 heures par
                semaine. La mensualisation utilisée est simple : heures
                hebdomadaires × 52 / 12. Un temps plein représente donc environ
                151,67 heures par mois.
              </p>
              <p>
                Si vous saisissez un salaire annuel brut, l’outil le divise par
                12 pour obtenir le brut mensuel. Si vous saisissez un salaire
                horaire, il le multiplie par le volume mensuel estimé.
              </p>
            </SeoSection>

            <SeoSection title="Pourquoi le montant exact peut différer de la fiche de paie ?">
              <p>
                La paie réelle dépend de nombreux paramètres : primes, mutuelle,
                titres-restaurant, heures supplémentaires, absences, temps
                partiel, avantages en nature ou convention collective. Deux
                salariés avec le même brut peuvent donc avoir un net différent.
              </p>
              <p>
                Utilisez ce calcul comme un repère rapide. Pour une décision
                importante, comparez ensuite avec votre bulletin de salaire ou
                une simulation paie plus détaillée.
              </p>
            </SeoSection>

            <SeoSection title="Erreurs fréquentes sur le calcul brut/net">
              <ul className="space-y-3 text-sm font-bold leading-7 text-[#102A4C]">
                {mistakes.map((mistake) => (
                  <li key={mistake} className="rounded-xl bg-[#FFF8ED] px-4 py-3">
                    {mistake}
                  </li>
                ))}
              </ul>
            </SeoSection>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#061B3A]">
                À lire aussi
              </h2>
              <ul className="mt-4 space-y-3 text-sm font-bold leading-6 text-[#102A4C]">
                <li>
                  <Link className="hover:text-[#22AFA3]" href="/blog/calcul-indemnite-brut-ou-net">
                    Rupture conventionnelle : faut-il partir du brut ou du net ?
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#22AFA3]" href="/simulateur-rupture-conventionnelle">
                    Calculer votre indemnité de rupture conventionnelle
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#22AFA3]" href="/rupture-conventionnelle-combien-demander">
                    Estimer le montant à négocier
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#22AFA3]" href="/calcul-indemnite-rupture-conventionnelle-net">
                    Comprendre la différence entre brut, net et indemnité
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#22AFA3]" href="/rupture-conventionnelle-chomage">
                    Préparer le chômage après une rupture conventionnelle
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#22AFA3]" href="/chomage-are">
                    Comprendre le chômage ARE
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#22AFA3]" href="/guide-preavis">
                    Vérifier une date de préavis
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#22AFA3]" href="/guides-complets">
                    Choisir le bon guide
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-[#22AFA3]" href="/reforme-rupture-conventionnelle-2026">
                    Vérifier les repères 2026
                  </Link>
                </li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#061B3A] p-6 text-white shadow-sm">
              <h2 className="text-xl font-black">
                Vous préparez une rupture conventionnelle ?
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#D8F5F2]">
                Le salaire brut sert aussi de base à de nombreux calculs
                d’indemnité. Une fois votre rémunération mieux comprise, vous
                pouvez estimer le montant de départ.
              </p>
              <Link
                href="/rupture-conventionnelle"
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-bold text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
              >
                Comprendre le calcul de départ
              </Link>
            </section>
          </aside>
        </div>

        <section className="mt-10 rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
            Questions fréquentes
          </h2>
          <div className="mt-5 divide-y divide-[#E5EEF0]">
            {faqItems.map((item, index) => (
              <details key={item.question} className="group py-5" open={index === 0}>
                <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-bold leading-7 text-[#061B3A]">
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
      </article>
    </main>
  );
}

function SeoSection({
  children,
  title
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-[-0.01em] text-[#061B3A]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-[#5B6B7C]">
        {children}
      </div>
    </section>
  );
}
