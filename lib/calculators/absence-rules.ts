import type {
  AbsenceSalaryReferenceTreatment,
  AbsenceSeniorityTreatment,
  AbsenceType
} from "@/types/termination";

export type AbsenceRule = {
  type: AbsenceType;
  label: string;
  seniorityTreatment: AbsenceSeniorityTreatment;
  salaryReferenceTreatment: AbsenceSalaryReferenceTreatment;
  employeeExplanation: string;
  employerExplanation: string;
  warning?: string;
};

export const absenceRules: AbsenceRule[] = [
  {
    type: "sick_leave",
    label: "Arrêt maladie non professionnelle",
    seniorityTreatment: "excluded",
    salaryReferenceTreatment: "use_pre_absence_salary_if_more_favorable",
    employeeExplanation:
      "Cette absence peut réduire l'ancienneté retenue, sauf règle plus favorable.",
    employerExplanation:
      "Cette absence peut réduire l'ancienneté retenue, sauf règle conventionnelle ou contexte plus favorable.",
    warning:
      "Une convention collective ou une disposition plus favorable peut prévoir une prise en compte différente."
  },
  {
    type: "occupational_accident",
    label: "Accident du travail / maladie professionnelle",
    seniorityTreatment: "fully_counted",
    salaryReferenceTreatment: "use_pre_absence_salary_if_more_favorable",
    employeeExplanation:
      "Cette période est prise en compte dans l'ancienneté retenue.",
    employerExplanation:
      "Cette période est intégrée dans l'ancienneté retenue pour éviter une base sous-évaluée."
  },
  {
    type: "maternity_leave",
    label: "Congé maternité",
    seniorityTreatment: "fully_counted",
    salaryReferenceTreatment: "use_pre_absence_salary_if_more_favorable",
    employeeExplanation:
      "Cette période est normalement prise en compte dans l'ancienneté.",
    employerExplanation:
      "Cette période est intégrée dans l'ancienneté retenue."
  },
  {
    type: "paternity_adoption_leave",
    label: "Congé paternité / adoption",
    seniorityTreatment: "fully_counted",
    salaryReferenceTreatment: "use_pre_absence_salary_if_more_favorable",
    employeeExplanation:
      "Cette période est normalement prise en compte dans l'ancienneté.",
    employerExplanation:
      "Cette période est intégrée dans l'ancienneté retenue."
  },
  {
    type: "parental_part_time",
    label: "Congé parental à temps partiel",
    seniorityTreatment: "fully_counted",
    salaryReferenceTreatment: "use_pre_absence_salary_if_more_favorable",
    employeeExplanation:
      "Cette période est assimilée à du travail effectif pour l'ancienneté.",
    employerExplanation:
      "Cette période est intégrée dans l'ancienneté retenue."
  },
  {
    type: "parental_full_time",
    label: "Congé parental à temps plein",
    seniorityTreatment: "half_counted",
    salaryReferenceTreatment: "use_pre_absence_salary_if_more_favorable",
    employeeExplanation:
      "Seule une partie de cette période peut être prise en compte pour l'ancienneté.",
    employerExplanation:
      "La moitié de cette période est retenue pour l'ancienneté dans cette estimation."
  },
  {
    type: "therapeutic_part_time",
    label: "Temps partiel thérapeutique",
    seniorityTreatment: "fully_counted",
    salaryReferenceTreatment: "use_pre_absence_salary_if_more_favorable",
    employeeExplanation:
      "Le salaire de référence peut être recalculé sur la rémunération antérieure si elle est plus favorable.",
    employerExplanation:
      "Le salaire de référence peut être neutralisé pour éviter une base de calcul sous-évaluée."
  },
  {
    type: "unpaid_leave",
    label: "Congé sabbatique / congé sans solde",
    seniorityTreatment: "excluded",
    salaryReferenceTreatment: "manual_review",
    employeeExplanation:
      "Cette absence peut réduire l'ancienneté retenue, sauf règle plus favorable.",
    employerExplanation:
      "Cette absence est déduite prudemment de l'ancienneté retenue dans cette version.",
    warning:
      "Le traitement du salaire de référence doit être vérifié selon la situation exacte."
  },
  {
    type: "other",
    label: "Autre absence",
    seniorityTreatment: "manual_review",
    salaryReferenceTreatment: "manual_review",
    employeeExplanation:
      "Cette absence demande une vérification avant de modifier l'ancienneté ou le salaire de référence.",
    employerExplanation:
      "Cette absence demande une vérification avant d'ajuster l'enveloppe estimée.",
    warning:
      "Type d'absence à vérifier : le simulateur ne modifie pas automatiquement l'ancienneté."
  }
];

export function getAbsenceRule(type: AbsenceType | undefined): AbsenceRule | undefined {
  if (!type) {
    return undefined;
  }

  return absenceRules.find((rule) => rule.type === type);
}
