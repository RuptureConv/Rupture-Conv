export const faqItems = [
  {
    question: "Comment est calculée l'indemnité de rupture conventionnelle brute ?",
    answer:
      "La V1 applique la base légale minimale : un quart de mois de salaire par année d'ancienneté jusqu'à 10 ans, puis un tiers de mois par année au-delà, avec proratisation des années incomplètes."
  },
  {
    question: "Le net indicatif est-il exact ?",
    answer:
      "Non. Le net est une estimation simplifiée. Le montant réel dépend notamment des cotisations, des exonérations, des règles fiscales, de la part supra-légale et de la situation personnelle du salarié."
  },
  {
    question: "Ce simulateur convient-il à un employeur ?",
    answer:
      "Oui, il donne un premier ordre de grandeur pour préparer une discussion RH. Il ne remplace pas une vérification juridique, paie ou conventionnelle."
  },
  {
    question: "La convention collective est-elle prise en compte ?",
    answer:
      "Le champ est prévu pour contextualiser la simulation, mais il n'est pas encore calculé en V1. Certaines conventions peuvent prévoir des montants plus favorables."
  },
  {
    question:
      "Quelle différence entre indemnité rupture conventionnelle minimale et montant négocié ?",
    answer:
      "L'indemnité minimale correspond au socle estimé par le simulateur. Le montant négocié est le montant brut discuté entre les parties. Lorsque ce montant est renseigné, l'outil affiche le montant retenu le plus élevé entre le minimum estimé et le montant négocié."
  },
  {
    question:
      "Comment utiliser le simulateur rupture conventionnelle avant un rendez-vous RH ?",
    answer:
      "Vous pouvez saisir vos dates, votre salaire brut moyen et, si vous les connaissez, les moyennes brutes sur 3 ou 12 mois. Le résultat donne un ordre de grandeur clair à copier pour préparer une discussion, sans remplacer une vérification par l'employeur, la paie ou un conseil adapté."
  },
  {
    question:
      "Pourquoi le résultat rupture conventionnelle net peut-il différer du montant réel versé ?",
    answer:
      "Le net indicatif est simplifié. Le montant réel peut varier selon le traitement social et fiscal, les exonérations applicables, l'éligibilité à la retraite, la part supra-légale et la situation personnelle du salarié."
  },
  {
    question:
      "Un employeur peut-il utiliser ce calcul rupture conventionnelle employeur pour cadrer un budget ?",
    answer:
      "Oui, l'outil donne un premier cadrage du minimum brut estimé et du montant retenu. Il reste indicatif : un employeur doit vérifier les règles applicables, la convention collective, les données de paie et le contexte du dossier avant de valider une enveloppe."
  }
];

export function Faq() {
  return (
    <section id="faq" className="mt-10">
      <h2 className="text-2xl font-bold text-[#061B3A]">FAQ rupture conventionnelle</h2>
      <div className="mt-5 divide-y divide-[#E5EEF0] rounded-2xl border border-[#E5EEF0] bg-white shadow-sm">
        {faqItems.map((item, index) => (
          <details key={item.question} className="group p-5" open={index === 0}>
            <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-semibold leading-7 text-[#061B3A]">
              {item.question}
              <span className="shrink-0 text-xl leading-7 text-[#22AFA3] group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-[#5B6B7C]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
