export type UserProfile = "employee" | "employer" | "hr";

export type RetirementEligibility = "yes" | "no" | "unknown";

export type EmploymentStatus = "cadre" | "non-cadre";

export type AbsenceImpact = "yes" | "no" | "unknown";

export type AbsenceType =
  | "sick_leave"
  | "occupational_accident"
  | "maternity_leave"
  | "paternity_adoption_leave"
  | "parental_part_time"
  | "parental_full_time"
  | "therapeutic_part_time"
  | "unpaid_leave"
  | "other";

export type AbsenceSeniorityTreatment =
  | "fully_counted"
  | "excluded"
  | "half_counted"
  | "neutralize_salary_reference"
  | "manual_review";

export type AbsenceSalaryReferenceTreatment =
  | "standard"
  | "use_pre_absence_salary_if_more_favorable"
  | "manual_review";

export type SalaryReferenceReason =
  | "salaire moyen"
  | "moyenne 3 mois"
  | "moyenne 12 mois"
  | "salaire habituel avant absence";

export type CollectiveAgreementStatus = "legal_only" | "specific_rules_available";

export type TerminationCalculatorInput = {
  startDate: string;
  ruptureDate: string;
  averageMonthlyGrossSalary: number;
  negotiatedGrossIndemnity?: number;
  userProfile: UserProfile;
  retirementEligibility: RetirementEligibility;
  averageLast3MonthsGrossSalary?: number;
  averageLast12MonthsGrossSalary?: number;
  employmentStatus?: EmploymentStatus;
  collectiveAgreement?: string;
  absenceImpact?: AbsenceImpact;
  absenceType?: AbsenceType;
  absenceStartDate?: string;
  absenceEndDate?: string;
  usualGrossMonthlySalaryBeforeAbsence?: number;
};

export type Seniority = {
  totalDays: number;
  years: number;
  remainingMonths: number;
  remainingDays: number;
  decimalYears: number;
  label: string;
};

export type ReferenceSalaryCandidate = {
  label: string;
  amount: number;
};

export type AbsenceRuleApplied = {
  type: AbsenceType;
  label: string;
  seniorityTreatment: AbsenceSeniorityTreatment;
  salaryReferenceTreatment: AbsenceSalaryReferenceTreatment;
  deductedDays: number;
  employeeExplanation: string;
  employerExplanation: string;
  warning?: string;
};

export type TerminationCalculationResult = {
  seniority: Seniority;
  grossSeniority: Seniority;
  retainedSeniority: Seniority;
  referenceSalary: number;
  referenceSalarySource: string;
  salaryReferenceReason: SalaryReferenceReason;
  referenceSalaryCandidates: ReferenceSalaryCandidate[];
  absenceApplied: boolean;
  absenceType?: AbsenceType;
  salaryReferenceBeforeAbsence?: number;
  absenceSeniorityDeductedDays: number;
  deductedAbsenceDuration: number;
  absenceRulesApplied: AbsenceRuleApplied[];
  salaryReferenceAdjustedForAbsence: boolean;
  warnings: string[];
  minimumGrossIndemnity: number;
  negotiatedGrossIndemnity?: number;
  retainedGrossIndemnity: number;
  estimatedNetIndemnity: number;
  negotiatedBelowMinimum: boolean;
  detailLines: string[];
  employeeSummary: string;
  employerSummary: string;
  employmentStatus?: EmploymentStatus;
  employmentStatusMessage?: string;
  collectiveAgreementIdcc?: string;
  collectiveAgreementName?: string;
  collectiveAgreementStatus?: CollectiveAgreementStatus;
  collectiveAgreementMessage?: string;
  collectiveAgreementWarning?: string;
  collectiveAgreementSpecificRuleApplied?: boolean;
};
