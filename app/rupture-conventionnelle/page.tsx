import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { RuptureReformNotice } from "@/components/seo/RuptureReformNotice";
import { absoluteUrl } from "@/lib/seo-content";
import { siteName } from "@/lib/site";

const canonicalPath = "/rupture-conventionnelle";
const canonicalUrl = absoluteUrl(canonicalPath);

export const metadata: Metadata = {
  title: {
    absolute: "Rupture conventionnelle : calcul, procédure et chômage"
  },
  description:
    "Guide central rupture conventionnelle : calcul indemnité, procédure, chômage, négociation, modèle de lettre, délais et comparatifs utiles.",
  alternates: {
    canonical: canonicalUrl
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Rupture conventionnelle : calcul, procédure et chômage",
    description:
      "Le point de départ RuptureConv pour calculer, comprendre, négocier et préparer une rupture conventionnelle.",
    url: canonicalUrl,
    siteName,
    type: "article",
    locale: "fr_FR"
  },
  twitter: {
    card: "summary",
    title: "Rupture conventionnelle : calcul, procédure et chômage",
    description:
      "Calcul, procédure, chômage, négociation, modèles et comparatifs : commencez par le bon parcours."
  }
};

const quickActions = [
  {
    title: "Choisir le bon guide",
    text: "Si votre question dépasse la rupture conventionnelle, repartez du hub des guides.",
    href: "/guides-complets",
    label: "Voir les guides"
  },
  {
    title: "Réforme 2026 chômage",
    text: "Le droit au chômage reste possible, mais la durée maximale annoncée évolue.",
    href: "/reforme-rupture-conventionnelle-2026",
    label: "Voir la réforme"
  },
  {
    title: "Calculer mon indemnité",
    text: "Vous voulez surtout savoir combien vous pouvez toucher ? Commencez par le calcul.",
    href: "/#simulateur",
    label: "Ouvrir le simulateur"
  },
  {
    title: "Comprendre la procédure",
    text: "Avant de signer, prenez deux minutes pour vérifier les étapes et le calendrier.",
    href: "/rupture-conventionnelle-cdi",
    label: "Voir la procédure"
  },
  {
    title: "Préparer ma demande",
    text: "Un courrier simple peut ouvrir la discussion sans vous mettre en difficulté.",
    href: "/modele-lettre-rupture-conventionnelle",
    label: "Voir le modèle"
  },
  {
    title: "Négocier le montant",
    text: "Le bon réflexe : connaître le minimum, puis préparer vos arguments.",
    href: "/negocier-rupture-conventionnelle",
    label: "Préparer l'échange"
  },
  {
    title: "Vérifier mes droits au chômage",
    text: "La rupture peut ouvrir droit à l'ARE, mais le calendrier dépend de votre dossier.",
    href: "/chomage-are",
    label: "Comprendre mes droits"
  },
  {
    title: "Comprendre le préavis",
    text: "En rupture conventionnelle, on parle plutôt d'une date de rupture convenue.",
    href: "/guide-preavis",
    label: "Vérifier les dates"
  },
  {
    title: "Comparer avec une autre sortie du CDI",
    text: "Si vous hésitez, comparez d'abord les conséquences avant de décider.",
    href: "/rupture-conventionnelle-ou-licenciement",
    label: "Comparer"
  },
  {
    title: "Éviter les erreurs",
    text: "Salaire, ancienneté, convention collective : les erreurs viennent souvent des détails.",
    href: "/blog/erreur-calcul-indemnite-rupture-conventionnelle",
    label: "Lire les erreurs"
  },
  {
    title: "Consulter un modèle de lettre",
    text: "Un document clair, copiable, imprimable et adapté à une demande prudente.",
    href: "/modele-lettre-rupture-conventionnelle",
    label: "Voir la lettre"
  }
];

const journeySteps = [
  {
    step: "1",
    title: "Estimer l'indemnité",
    text: "Posez d'abord un chiffre indicatif. Cela évite de discuter à l'aveugle.",
    href: "/#simulateur",
    label: "Calculer maintenant",
    next: "Ensuite, vérifiez la règle de calcul."
  },
  {
    step: "2",
    title: "Vérifier la procédure",
    text: "Entretien, convention, rétractation, homologation : le calendrier doit être propre.",
    href: "/rupture-conventionnelle-cdi",
    label: "Comprendre les étapes",
    next: "Puis préparez une demande posée."
  },
  {
    step: "3",
    title: "Préparer la demande",
    text: "Le courrier sert à ouvrir une discussion, pas à imposer un accord.",
    href: "/modele-lettre-rupture-conventionnelle",
    label: "Utiliser le modèle",
    next: "Après la demande, préparez vos arguments."
  },
  {
    step: "4",
    title: "Négocier",
    text: "Parlez montant, date, passation et documents avec des repères concrets.",
    href: "/negocier-rupture-conventionnelle",
    label: "Préparer la négociation",
    next: "Puis anticipez chômage et délais."
  },
  {
    step: "5",
    title: "Anticiper chômage et délais",
    text: "Le droit peut exister, mais les différés et documents changent le timing.",
    href: "/rupture-conventionnelle-chomage",
    label: "Vérifier l'ARE",
    next: "Enfin, contrôlez les documents."
  },
  {
    step: "6",
    title: "Finaliser les documents",
    text: "Avant de signer, relisez les montants, dates, congés payés et attestations.",
    href: "/sources-juridiques",
    label: "Voir les sources",
    next: "Gardez une copie de chaque élément."
  }
];

const tools = [
  {
    title: "Simulateur d'indemnité",
    badge: "Calcul",
    href: "/#simulateur",
    text: "Le point de départ si vous voulez un montant indicatif rapide."
  },
  {
    title: "Brut ou net ?",
    badge: "Montant",
    href: "/salaire-brut-net",
    text: "Pour savoir quel salaire utiliser : brut, net, salaire de référence, primes et montant perçu."
  },
  {
    title: "Indemnité nette",
    badge: "Net indicatif",
    href: "/calcul-indemnite-rupture-conventionnelle-net",
    text: "Pour distinguer le minimum brut, le net indicatif et le montant réellement versé."
  },
  {
    title: "Projection chômage",
    badge: "France Travail",
    href: "/simulateur-chomage-rupture-conventionnelle",
    text: "Pour estimer l'ARE, les différés, le premier versement et le revenu total potentiel."
  },
  {
    title: "Délais et calendrier",
    badge: "Procédure",
    href: "/blog/delai-rupture-conventionnelle-combien-de-temps",
    text: "Pour éviter de fixer une date irréaliste ou de sous-estimer l'homologation."
  },
  {
    title: "Modèle de lettre",
    badge: "Document",
    href: "/modele-lettre-rupture-conventionnelle",
    text: "Un modèle professionnel à copier, télécharger ou imprimer."
  },
  {
    title: "Checklist entretien",
    badge: "Préparation",
    href: "/negocier-rupture-conventionnelle",
    text: "Les points à préparer avant de parler montant, date et passation."
  },
  {
    title: "Rupture ou licenciement",
    badge: "Comparatif",
    href: "/rupture-conventionnelle-ou-licenciement",
    text: "Pour comparer indemnité, chômage, préavis et niveau de sécurité."
  },
  {
    title: "Chômage après rupture",
    badge: "France Travail",
    href: "/rupture-conventionnelle-chomage",
    text: "Pour comprendre les droits possibles, différés et documents à contrôler."
  },
  {
    title: "Fiscalité de l'indemnité",
    badge: "Fiscalité",
    href: "/blog/fiscalite-indemnite-rupture-conventionnelle",
    text: "Pour repérer les questions à vérifier avant de signer une indemnité élevée."
  }
];

const situations = [
  {
    title: "Salarié cadre",
    href: "/blog/rupture-conventionnelle-cadre-indemnite",
    text: "Variable, bonus, salaire élevé : le calcul mérite une lecture attentive."
  },
  {
    title: "Salarié non-cadre",
    href: "/calcul-indemnite-non-cadre",
    text: "Un repère simple pour vérifier l'ancienneté, le salaire et le minimum."
  },
  {
    title: "Ancienneté importante",
    href: "/indemnite-rupture-conventionnelle-anciennete-10-ans",
    text: "Après 10 ans, la formule change pour les années suivantes."
  },
  {
    title: "Employeur qui refuse",
    href: "/blog/rupture-conventionnelle-refus-employeur-que-faire",
    text: "Un refus est possible. L'enjeu est de savoir quoi faire ensuite."
  },
  {
    title: "Arrêt maladie",
    href: "/rupture-conventionnelle-cdi",
    text: "Situation sensible : vérifiez le consentement libre et le contexte avant d'avancer."
  },
  {
    title: "Salaire élevé",
    href: "/blog/rupture-conventionnelle-salaire-eleve-calcul",
    text: "Le montant peut vite soulever des questions de net, fiscalité et négociation."
  },
  {
    title: "Départ proche de la retraite",
    href: "/blog/fiscalite-indemnite-rupture-conventionnelle",
    text: "La fiscalité et la situation personnelle doivent être vérifiées avec prudence."
  },
  {
    title: "Burn-out ou conflit",
    href: "/sources-juridiques",
    text: "Quand le contexte est tendu, appuyez-vous sur des sources fiables avant de signer."
  }
];

// TODO: créer des pages dédiées avant d'ajouter des liens directs pour
// arrêt maladie, départ proche retraite et burn-out/conflit.

const faq = [
  {
    question: "Est-ce que l'employeur peut refuser une rupture conventionnelle ?",
    answer:
      "Oui. La rupture conventionnelle repose sur un accord commun. L'employeur comme le salarié peuvent refuser."
  },
  {
    question: "Quel est le montant minimum ?",
    answer:
      "Le montant ne peut pas être inférieur à l'indemnité légale ou conventionnelle applicable. Il dépend surtout du salaire brut de référence et de l'ancienneté."
  },
  {
    question: "Peut-on toucher le chômage ?",
    answer:
      "Une rupture conventionnelle homologuée peut ouvrir droit à l'assurance chômage si les conditions générales sont réunies. Le calendrier peut toutefois être décalé par des différés."
  },
  {
    question: "Combien de temps dure la procédure ?",
    answer:
      "Il faut tenir compte de l'entretien, de la signature, du délai de rétractation et de l'homologation. La date de rupture doit respecter ce calendrier."
  },
  {
    question: "Peut-on négocier plus que le minimum ?",
    answer:
      "Oui, une indemnité supérieure peut être négociée si les deux parties l'acceptent. Elle doit être distinguée du minimum obligatoire."
  },
  {
    question: "Faut-il envoyer une lettre ?",
    answer:
      "Ce n'est pas toujours obligatoire pour ouvrir une discussion, mais un courrier ou un email clair aide à formaliser la demande et à garder une trace."
  },
  {
    question: "Quelle différence avec un licenciement ?",
    answer:
      "La rupture conventionnelle est négociée d'un commun accord. Le licenciement est décidé par l'employeur et suit un autre cadre juridique."
  },
  {
    question: "Une rupture conventionnelle peut-elle être refusée par l'administration ?",
    answer:
      "Oui, l'homologation peut être refusée si le dossier ne respecte pas les conditions attendues, par exemple sur le calendrier ou le consentement."
  },
  {
    question: "Y a-t-il un préavis en rupture conventionnelle ?",
    answer:
      "Non, pas comme dans une démission ou un licenciement. Les parties fixent une date de rupture, après la procédure et l'homologation."
  },
  {
    question: "Que faire si l'employeur met la pression ?",
    answer:
      "Ne signez pas dans la précipitation. Gardez des traces écrites et demandez un délai pour relire le montant, la date et les documents."
  },
  {
    question: "Quels documents reçoit-on à la fin ?",
    answer:
      "L'employeur remet notamment le certificat de travail, le solde de tout compte et l'attestation France Travail."
  },
  {
    question: "Peut-on signer pendant un arrêt maladie ?",
    answer:
      "C'est possible dans certains cas, mais le consentement doit rester libre. Si le contexte est tendu, vérifiez la situation avant de signer."
  }
];

const sidebarLinks = [
  ["Réforme 2026", "#reforme-2026"],
  ["À retenir", "#a-retenir"],
  ["Comprendre", "#comprendre"],
  ["Parcours", "#parcours"],
  ["Outils", "#outils"],
  ["Situations", "#situations"],
  ["FAQ", "#faq"]
] as const;

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
      name: "Rupture conventionnelle",
      item: canonicalUrl
    }
  ]
};

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href as Route}
      className="inline-flex items-center text-sm font-extrabold text-[#168F86] transition hover:text-[#061B3A]"
    >
      {children} <span aria-hidden="true" className="ml-1">→</span>
    </Link>
  );
}

export default function RuptureConventionnelleHubPage() {
  return (
    <main className="min-h-screen bg-[#F7FBFA]">
      <SeoJsonLd data={faqJsonLd} />
      <SeoJsonLd data={breadcrumbJsonLd} />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8 lg:py-16">
          <div>
            <p className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#168F86]">
              Guide central
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.02em] text-[#061B3A] sm:text-5xl lg:text-6xl">
              Rupture conventionnelle : calcul, procédure, chômage et documents
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5B6B7C]">
              Vous n&apos;avez pas besoin de tout lire dans l&apos;ordre. Commencez par ce
              qui vous bloque : le montant, la demande, les délais, le chômage
              ou la négociation. Le bon réflexe : calculer, comprendre, puis
              préparer la discussion.
            </p>
            <p className="mt-4 rounded-2xl bg-[#F7FBFA] p-4 text-sm font-bold leading-7 text-[#102A4C]">
              Mis à jour le 17 juin 2026
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#simulateur"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#22AFA3] px-6 text-sm font-black text-white transition hover:bg-[#168F86] focus:outline-none focus:ring-2 focus:ring-[#22AFA3] focus:ring-offset-2"
              >
                Calculer mon indemnité
              </Link>
              <Link
                href="/modele-lettre-rupture-conventionnelle"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D7E6E8] bg-white px-6 text-sm font-black text-[#061B3A] transition hover:border-[#22AFA3] hover:text-[#168F86]"
              >
                Préparer ma demande
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-[#E5EEF0] bg-[#F7FBFA] p-5 shadow-sm">
            <p className="text-sm font-black text-[#061B3A]">
              Par où commencer ?
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
              Si vous avez une proposition ou une date en tête, le calcul vous
              donnera tout de suite un repère.
            </p>
            <Link
              href="/#simulateur"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#061B3A] px-4 text-sm font-black text-white transition hover:bg-[#102A4C]"
            >
              Lancer le simulateur
            </Link>
          </aside>
        </div>
      </section>

      <div className="sticky top-0 z-20 border-y border-[#E5EEF0] bg-white/95 backdrop-blur lg:hidden">
        <nav
          aria-label="Navigation rapide"
          className="flex gap-2 overflow-x-auto px-4 py-3"
        >
          {sidebarLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-full bg-[#F7FBFA] px-4 py-2 text-xs font-black text-[#102A4C]"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[230px_1fr] lg:px-8 lg:py-14">
        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-2xl border border-[#E5EEF0] bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#22AFA3]">
              Navigation
            </p>
            <nav aria-label="Navigation rapide" className="mt-4 space-y-2">
              {sidebarLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block rounded-xl px-3 py-2 text-sm font-bold text-[#102A4C] transition hover:bg-[#EAF8F6] hover:text-[#168F86]"
                >
                  {label}
                </a>
              ))}
            </nav>
            <Link
              href="/#simulateur"
              className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-[#22AFA3] px-4 text-xs font-black text-white transition hover:bg-[#168F86]"
            >
              Calculer
            </Link>
          </div>
        </aside>

        <div className="space-y-12">
          <section id="reforme-2026" className="scroll-mt-24">
            <RuptureReformNotice />
          </section>

          <section
            className="rounded-3xl border border-[#E5EEF0] bg-white p-6 shadow-sm sm:p-8"
            id="a-retenir"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#22AFA3]">
              Réponse rapide
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#061B3A]">
              Rupture conventionnelle : ce qu&apos;il faut retenir
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "La rupture conventionnelle repose sur un accord entre le salarié et l'employeur.",
                "Elle donne droit à une indemnité spécifique, au moins égale au minimum applicable.",
                "Elle peut ouvrir droit au chômage si les conditions France Travail sont remplies.",
                "La date de départ est fixée dans la convention, après respect de la procédure.",
                "Le salarié ne doit pas signer sous pression.",
                "Avant signature, vérifiez le montant, la date de rupture et les documents de fin de contrat."
              ].map((item) => (
                <p
                  className="rounded-2xl bg-[#F7FBFA] p-4 text-sm font-semibold leading-7 text-[#102A4C]"
                  key={item}
                >
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section aria-labelledby="actions-title">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#22AFA3]">
                  Orientation rapide
                </p>
                <h2 id="actions-title" className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#061B3A]">
                  Que voulez-vous faire ?
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href as Route}
                  className="group rounded-2xl border border-[#E5EEF0] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#C7E7E3] hover:shadow-md"
                >
                  <h3 className="text-lg font-black text-[#061B3A]">
                    {action.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
                    {action.text}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-black text-[#168F86] group-hover:text-[#061B3A]">
                    {action.label} →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section
            id="comprendre"
            className="scroll-mt-24 rounded-3xl border border-[#E5EEF0] bg-white p-6 shadow-sm sm:p-8"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#22AFA3]">
              Résumé utile
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#061B3A]">
              Comprendre en 2 minutes
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "La rupture conventionnelle permet à un salarié en CDI et à son employeur de mettre fin au contrat d'un commun accord.",
                "Elle suppose une procédure : échange, convention, délai de rétractation, puis homologation.",
                "Le salarié perçoit une indemnité au moins égale au minimum légal ou conventionnel applicable.",
                "Elle peut ouvrir droit au chômage si les conditions France Travail sont réunies.",
                "Le montant peut être négocié, mais aucune partie ne peut imposer l'accord à l'autre.",
                "Avant de signer, vérifiez le calcul, les délais, les congés payés et les documents de fin de contrat."
              ].map((item) => (
                <p
                  key={item}
                  className="rounded-2xl bg-[#F7FBFA] p-4 text-sm font-semibold leading-7 text-[#102A4C]"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section id="parcours" className="scroll-mt-24">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#22AFA3]">
              Méthode simple
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#061B3A]">
              Le bon parcours
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {journeySteps.map((item) => (
                <article
                  key={item.step}
                  className="rounded-2xl border border-[#E5EEF0] bg-white p-5 shadow-sm"
                >
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF8F6] text-sm font-black text-[#168F86]">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-[#061B3A]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
                        {item.text}
                      </p>
                      <p className="mt-3 rounded-xl bg-[#F7FBFA] px-3 py-2 text-xs font-bold leading-5 text-[#102A4C]">
                        Prochaine étape : {item.next}
                      </p>
                      <div className="mt-3">
                        <ArrowLink href={item.href}>{item.label}</ArrowLink>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="outils" className="scroll-mt-24">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#22AFA3]">
              Ressources pratiques
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#061B3A]">
              Les outils utiles
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {tools.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href as Route}
                  className="rounded-2xl border border-[#E5EEF0] bg-white p-5 shadow-sm transition hover:border-[#C7E7E3] hover:shadow-md"
                >
                  <span className="inline-flex rounded-full bg-[#EAF8F6] px-3 py-1 text-xs font-black text-[#168F86]">
                    {tool.badge}
                  </span>
                  <h3 className="mt-3 text-xl font-black text-[#061B3A]">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
                    {tool.text}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section id="situations" className="scroll-mt-24">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#22AFA3]">
              Cas fréquents
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#061B3A]">
              Selon votre situation
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {situations.map((situation) => (
                <Link
                  key={situation.title}
                  href={situation.href as Route}
                  className="rounded-2xl border border-[#E5EEF0] bg-white p-4 transition hover:border-[#C7E7E3]"
                >
                  <h3 className="font-black text-[#061B3A]">{situation.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5B6B7C]">
                    {situation.text}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section
            id="faq"
            className="scroll-mt-24 rounded-3xl border border-[#E5EEF0] bg-white p-6 shadow-sm sm:p-8"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#22AFA3]">
              Questions fréquentes
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#061B3A]">
              Les réponses rapides
            </h2>
            <div className="mt-5 divide-y divide-[#E5EEF0]">
              {faq.map((item, index) => (
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

          <section className="rounded-3xl border border-[#D7EDEA] bg-[#EAF8F6] p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#168F86]">
              Prochaine action
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#061B3A]">
              Par où commencer ?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#5B6B7C]">
              Si vous avez seulement dix minutes, faites simple : calculez le
              montant indicatif, préparez votre demande, puis comparez avec un
              licenciement si vous hésitez sur la meilleure sortie.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#simulateur"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#22AFA3] px-6 text-sm font-black text-white transition hover:bg-[#168F86]"
              >
                Calculer mon indemnité
              </Link>
              <Link
                href="/modele-lettre-rupture-conventionnelle"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#B8DEDA] bg-white px-6 text-sm font-black text-[#061B3A] transition hover:border-[#22AFA3]"
              >
                Préparer ma demande
              </Link>
              <Link
                href="/rupture-conventionnelle-ou-licenciement"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#B8DEDA] bg-white px-6 text-sm font-black text-[#061B3A] transition hover:border-[#22AFA3]"
              >
                Comparer avec un licenciement
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
