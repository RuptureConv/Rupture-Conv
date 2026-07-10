/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { UnemploymentProjectionTool } from "@/components/tools/UnemploymentProjectionTool";
import { serializeJsonLd } from "@/lib/json-ld";
import { siteName, siteUrl } from "@/lib/site";
import { buildWebApplicationStructuredData } from "@/lib/structured-data";

const canonicalPath = "/simulateur-chomage-rupture-conventionnelle";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const title = "Simulateur chômage ARE après rupture conventionnelle";
const description =
  "Comprenez ce que vous pourriez toucher après une rupture conventionnelle, un licenciement, une démission ou une fin de contrat : indemnité, ARE, délais et calendrier.";

const faqItems = [
  {
    question: "Le simulateur confirme-t-il mes droits au chômage ?",
    answer:
      "Non. Il vous aide à comprendre votre scénario, mais France Travail confirme seul l'ouverture des droits, le montant exact et la durée."
  },
  {
    question: "Une rupture conventionnelle donne-t-elle droit au chômage ?",
    answer:
      "Elle peut ouvrir droit à l'ARE si les conditions habituelles sont remplies, notamment l'affiliation suffisante et l'inscription auprès de France Travail."
  },
  {
    question: "Une démission donne-t-elle droit au chômage ?",
    answer:
      "Une démission classique n'ouvre pas automatiquement droit à l'ARE. Certaines démissions légitimes, reconversions validées, reliquats ou réexamens après 121 jours peuvent changer l'analyse."
  },
  {
    question: "Comment est estimé le montant de l'ARE ?",
    answer:
      "Le simulateur part de votre salaire brut moyen, estime un SJR, puis compare les deux formules France Travail : 40,4 % du SJR plus une partie fixe et 57 % du SJR."
  },
  {
    question: "Pourquoi le premier versement peut-il être décalé ?",
    answer:
      "Le paiement peut être repoussé par le délai d'attente de 7 jours, le différé congés payés et le différé spécifique lié aux indemnités supra-légales."
  },
  {
    question: "Les seniors sont-ils traités différemment ?",
    answer:
      "Oui. À partir de 55 ans, la période de recherche d'activité est plus longue et la dégressivité ne s'applique pas selon les repères France Travail. À 57 ans et plus, la durée maximale est plus élevée."
  },
  {
    question: "Le simulateur tient-il compte de la réforme 2026 ?",
    answer:
      "Oui. Pour une rupture conventionnelle prenant fin à compter du 1er septembre 2026, le simulateur applique le plafond spécifique de 15 mois avant 55 ans ou de 20,5 mois à partir de 55 ans. Avant cette date, il conserve les plafonds généraux."
  },
  {
    question: "Mes données sont-elles stockées ?",
    answer:
      "Non. Le calcul est local dans le navigateur. Aucune création de compte n'est nécessaire et les données saisies ne sont pas enregistrées par le simulateur."
  }
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

export default function UnemploymentSimulatorPage() {
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
  const webApplicationJsonLd = buildWebApplicationStructuredData({
    name: "Simulateur chômage après rupture conventionnelle",
    url: canonicalUrl,
    applicationCategory: "FinanceApplication",
    description
  });
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `${siteUrl}/`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <article className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Link
          className="inline-flex text-sm font-bold text-[#061B3A] transition hover:text-[#22AFA3]"
          href="/"
        >
          Retour au simulateur rupture conventionnelle
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.45fr)] lg:items-end">
          <div>
            <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#168F86]">
              Projection chômage gratuite
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl lg:text-6xl">
              Simulateur chômage ARE après rupture conventionnelle
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#5B6B7C]">
              Visualisez ce que vous pourriez percevoir au départ, ce que France
              Travail pourrait verser chaque mois, quand les paiements peuvent
              commencer et ce que cela représente sur toute la période.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-black text-[#102A4C]">
              {["Indemnité de départ", "ARE mensuelle", "Délai de carence", "Début des versements", "Projection globale expliquée"].map((item) => (
                <span className="rounded-full bg-white px-4 py-2 shadow-sm" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <aside className="rounded-3xl border border-[#D7E7E8] bg-white p-5 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#168F86]">
              À retenir
            </p>
            <p className="mt-3 text-sm font-bold leading-7 text-[#102A4C]">
              Le résultat sert à comprendre votre scénario avant une décision.
              France Travail reste l'organisme qui confirme vos droits.
            </p>
          </aside>
        </header>

        <section className="mt-10" id="simulateur-chomage">
          <UnemploymentProjectionTool />
        </section>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(280px,0.25fr)]">
          <div className="space-y-8">
            <ContentSection title="Ce que ce simulateur calcule vraiment">
              <p>
                La plupart des calculateurs se limitent à une estimation mensuelle
                de l'ARE. C'est utile, mais insuffisant pour décider de quitter un
                emploi. La vraie question est plus large : combien vais-je toucher
                au départ, combien vais-je percevoir chaque mois, quand le premier
                versement peut-il tomber et quel revenu total cela représente-t-il
                sur la durée probable d'indemnisation ?
              </p>
              <p>
                Le simulateur chômage RuptureConv combine donc plusieurs niveaux
                de lecture. Il estime d'abord une éligibilité probable, sans jamais
                affirmer un droit certain. Il calcule ensuite une allocation ARE
                brute et nette indicative, puis ajoute les différés : délai
                d'attente de 7 jours, congés payés et différé spécifique lié à une
                indemnité supra-légale. Enfin, il affiche une projection financière
                globale : indemnité de départ, chômage mensuel estimé, date
                probable du premier paiement, durée estimative, total ARE potentiel
                et revenus cumulés.
              </p>
            </ContentSection>

            <ContentSection title="Pourquoi la projection est plus utile qu'un simple montant ARE">
              <p>
                Deux salariés peuvent avoir la même ARE mensuelle et prendre des
                décisions très différentes. Celui qui dispose d'une indemnité de
                rupture importante peut supporter un différé plus long. Celui qui
                démissionne sans motif reconnu doit au contraire vérifier très
                prudemment son absence de droit automatique. Celui qui approche de
                57 ans doit regarder la durée maximale et les règles seniors avec
                attention.
              </p>
              <p>
                La projection financière permet de replacer le montant mensuel dans
                le calendrier réel. Une allocation estimée à 1 450 € net par mois
                ne signifie pas que cette somme sera versée immédiatement. Des
                congés payés, une indemnité supra-légale ou une inscription tardive
                peuvent modifier la trésorerie des premières semaines. C'est
                souvent ce décalage, plus que le montant mensuel, qui surprend les
                salariés après une rupture conventionnelle.
              </p>
            </ContentSection>

            <ContentSection title="Les règles utilisées pour l'éligibilité probable">
              <p>
                Le simulateur applique les repères généraux d'affiliation : avoir
                travaillé au moins 130 jours ou 910 heures dans la période de
                recherche. Cette période est estimée à 24 mois dans le cas général,
                et à 36 mois à partir de 55 ans. Le résultat reste volontairement
                prudent : le site affiche une éligibilité probable ou une
                éligibilité à confirmer, jamais une formule comme "vous avez droit".
              </p>
              <p>
                Le mode de sortie d'emploi change fortement l'analyse. Une rupture
                conventionnelle, un licenciement, une fin de CDD ou une fin de
                mission peuvent ouvrir une indemnisation si les autres conditions
                sont remplies. Une démission classique ne doit pas être présentée
                comme ouvrant automatiquement droit au chômage. Les cas de
                démission légitime, de reconversion validée, de reliquat de droits
                ou de réexamen après 121 jours demandent une confirmation
                individuelle auprès de France Travail.
              </p>
            </ContentSection>

            <ContentSection title="Comment le montant ARE est estimé">
              <p>
                Le salaire journalier de référence réel est calculé par France
                Travail à partir des rémunérations et des périodes retenues. Pour
                rendre l'outil utilisable sans attestation employeur complète,
                RuptureConv l'approche à partir du salaire brut mensuel moyen
                déclaré. Cette estimation convient pour une première projection,
                mais elle peut différer si les revenus sont variables, si des
                périodes n'ont pas été travaillées, si le temps partiel est
                complexe ou si un reliquat de droits existe.
              </p>
              <p>
                L'allocation journalière est estimée en comparant deux formules :
                40,4 % du SJR plus une partie fixe de 13,18 €, et 57 % du SJR. Le
                montant le plus favorable est retenu dans la limite d'un plafond
                indicatif. Le simulateur affiche ensuite une ARE brute estimée et
                une ARE nette estimée. Le net reste une approximation, car les
                prélèvements, contributions et situations individuelles peuvent
                modifier le montant réellement versé.
              </p>
            </ContentSection>

            <ContentSection title="Différés, carence et date probable du premier versement">
              <p>
                La date de premier versement est souvent le point le plus concret
                pour un salarié. Le simulateur additionne trois éléments. Le délai
                d'attente de 7 jours est le repère de base. Le différé congés payés
                dépend des congés non pris indemnisés à la fin du contrat. Le
                différé spécifique dépend des indemnités supérieures au minimum
                légal ou conventionnel, notamment la part supra-légale négociée.
              </p>
              <p>
                L'outil calcule une date probable à partir de la date de fin de
                contrat saisie. Cette date doit rester indicative. France Travail
                peut retenir des informations issues de plusieurs fins de contrat,
                de l'attestation employeur, de l'inscription effective et de la
                qualification exacte des sommes versées. L'objectif est de préparer
                la trésorerie, pas de remplacer le calendrier officiel.
              </p>
            </ContentSection>

            <ContentSection title="Rupture conventionnelle : le cas le plus fréquent">
              <p>
                Après une rupture conventionnelle homologuée, l'indemnisation
                chômage peut être possible si les conditions d'activité sont
                remplies. La difficulté vient rarement du principe seul. Elle vient
                plutôt du calendrier : indemnité supra-légale, congés payés,
                inscription, documents de fin de contrat et date d&apos;application
                des plafonds propres aux ruptures conventionnelles.
              </p>
              <p>
                Le simulateur tient compte de la date de fin de contrat. Jusqu&apos;au
                31 août 2026, il conserve les plafonds généraux. À partir du 1er
                septembre 2026, une rupture conventionnelle est plafonnée à 456
                jours avant 55 ans ou 624 jours à partir de 55 ans. France Travail
                reste seul compétent pour calculer la durée réellement acquise à
                partir du dossier complet.
              </p>
            </ContentSection>

            <ContentSection title="Démission, reconversion et réexamen après 121 jours">
              <p>
                Le module démission est volontairement strict. Une démission
                classique est affichée comme une situation défavorable ou à
                confirmer, parce qu'elle n'ouvre pas automatiquement droit à l'ARE.
                Le salarié peut parfois retrouver une indemnisation après une
                reprise d'emploi suffisante ou demander un réexamen après 121 jours
                de chômage. Ce réexamen n'est pas automatique : il dépend notamment
                de la recherche active d'emploi et de l'appréciation de France
                Travail.
              </p>
              <p>
                Les démissions légitimes et les reconversions validées sont
                traitées séparément. L'outil les distingue d'une démission simple,
                mais continue d'afficher une confirmation nécessaire. Dans un
                parcours de décision, cette nuance est essentielle : quitter un
                CDI sans validation préalable peut créer plusieurs mois sans
                revenu de remplacement.
              </p>
            </ContentSection>

            <ContentSection title="Seniors : 55 ans, 57 ans, 60 ans et plus">
              <p>
                L'âge change la projection. À partir de 55 ans, la période de
                recherche d'activité est plus longue et la dégressivité de l'ARE
                ne s'applique pas selon les repères actuels de France Travail. À
                57 ans et plus, la durée maximale peut être plus élevée. À partir
                de 60 ans, la question de la retraite, du maintien éventuel des
                droits et des pensions devient plus sensible.
              </p>
              <p>
                Le simulateur ne remplace pas une analyse retraite. Il signale les
                points de vigilance : âge exact à la fin du contrat, durée
                d'activité, projet de formation, retraite à taux plein, pension
                éventuelle et documents France Travail. Pour un salarié senior, la
                bonne décision ne se limite pas à l'ARE mensuelle : elle doit
                intégrer la durée, la santé, la retraite et la capacité réelle de
                retour à l'emploi.
              </p>
            </ContentSection>

            <ContentSection title="Sources et limites">
              <p>
                Les constantes sont regroupées dans un seul fichier technique pour
                faciliter les mises à jour réglementaires. Les repères utilisés
                proviennent des pages publiques de France Travail, Service-Public
                et Info.gouv consultées lors de la conception. Toute règle sensible
                est formulée comme une hypothèse indicative lorsque son application
                dépend de textes ou d'une situation individuelle.
              </p>
              <p>
                Le simulateur ne stocke aucune donnée, ne crée aucun compte et ne
                transmet pas les informations saisies. Il est conçu comme un outil
                d'aide à la décision : utile pour préparer un échange RH, une
                rupture conventionnelle, une négociation, une reconversion ou une
                inscription France Travail, mais insuffisant pour valider seul une
                décision de départ.
              </p>
            </ContentSection>

            <section className="rounded-2xl border border-[#D7E7E8] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-[#061B3A]">Questions fréquentes</h2>
              <div className="mt-5 divide-y divide-[#E5EEF0]">
                {faqItems.map((item, index) => (
                  <details className="group py-5" key={item.question} open={index === 0}>
                    <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-black leading-7 text-[#061B3A]">
                      {item.question}
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-xl leading-7 text-[#22AFA3] transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-[#5B6B7C]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <nav className="rounded-2xl border border-[#D7E7E8] bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-[#061B3A]">À lire aussi</h2>
              <ul className="mt-4 space-y-3 text-sm font-bold leading-6 text-[#102A4C]">
                {[
                  ["/simulateur-rupture-conventionnelle", "Simuler l'indemnité de rupture"],
                  ["/chomage-are", "Guide chômage ARE"],
                  ["/calcul-allocation-chomage", "Calcul allocation chômage"],
                  ["/combien-vais-je-toucher-au-chomage", "Combien vais-je toucher ?"],
                  ["/delai-de-carence-chomage", "Délai de carence chômage"],
                  ["/premier-paiement-france-travail", "Premier paiement France Travail"],
                  ["/chomage-apres-demission", "Chômage après démission"],
                  ["/rupture-conventionnelle-et-allocation-chomage", "Rupture conventionnelle et allocation"]
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link className="transition hover:text-[#22AFA3]" href={href as Route}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <section className="rounded-2xl bg-[#061B3A] p-5 text-white shadow-sm">
              <h2 className="text-xl font-black">Avant de signer</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#D8F5F2]">
                Comparez l'indemnité de rupture, le délai avant chômage et le
                revenu total potentiel. C'est souvent ce trio qui change la
                décision.
              </p>
              <Link
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#22AFA3] px-5 text-sm font-black text-white"
                href="/#simulateur"
              >
                Calculer l'indemnité de rupture
              </Link>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}

function ContentSection({
  children,
  title
}: {
  children: React.ReactNode;
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
