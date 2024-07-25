export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}
export enum SubmissionTime {
  START = "Έναρξη",
  END = "Λήξη",
}

export enum Department {
  IT_TEITHE = "ΠΡΩΗΝ ΤΜΗΜΑ ΜΗΧΑΝΙΚΩΝ ΠΛΗΡΟΦΟΡΙΚΗΣ",
  EL_TEITHE = "ΠΡΩΗΝ ΤΜΗΜΑ ΜΗΧΑΝΙΚΩΝ ΗΛΕΚΤΡΟΝΙΚΗΣ",
  IHU_IEE = "ΤΜΗΜΑ ΜΗΧΑΝΙΚΩΝ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΗΛΕΚΤΡΟΝΙΚΩΝ ΣΥΣΤΗΜΑΤΩΝ",
}

export enum InternshipProgram {
  TEITHE_OAED = "ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ ΜΕ ΟΑΕΔ",
  ESPA = "ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ ΜΕ ΕΣΠΑ",
  TEITHE_JOB_RECOGNITION = "ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ ΜΕ ΑΝΑΓΝΩΡΙΣΗ ΕΡΓΑΣΙΑΣ",
  EMPLOYER_DECLARATION_OF_RESPONSIBILITY = "ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ ΜΕ ΥΠΕΥΘΥΝΗ ΔΗΛΩΣΗ ΤΟΥ ΕΡΓΟΔΟΤΗ",
}

export enum InternshipStatus {
  SUBMIT_START_FILES = "Κατάθεση Δικαιολογητικών Έναρξης",
  SUBMIT_END_FILES = "Κατάθεση Δικαιολογητικών Λήξης",
  PENDING_REVIEW_START = "Έλεγχος Δικαιολογητικών Έναρξης",
  PENDING_REVIEW_END = "Έλεγχος Δικαιολογητικών Λήξης",
  ACTIVE = "Ενεργή Πρακτική Άσκηση",
  ENDED = "Ολοκληρωμένη Πρακτική Άσκηση",
}
export enum QuestionnaireType {
  STUDENT = "student",
  COMPANY = "company",
}

export enum QuestionType {
  multiple_choice = "multiple_choice",
  multiple_choice_with_text = "multiple_choice_with_text",
  free_text = "free_text",
}

export interface ErrorResponse {
  error: string;
}

export interface Message {
  detail: string;
}
export interface ResponseWrapper<DataT> {
  data?: DataT;
  message?: Message;
}

export interface ResponseTotalItems<DataT> extends ResponseWrapper<DataT> {
  total_items: number;
}
