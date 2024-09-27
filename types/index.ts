export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
  SECRETARY = "secretary",
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
  TEITHE_OAED = "ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ ΧΩΡΙΣ ΕΣΠΑ (ΙΔΙΩΤΙΚΟΣ 'Η ΔΗΜΟΣΙΟΣ ΤΟΜΕΑΣ)",
  ESPA = "ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ ΜΕ ΕΣΠΑ",
  TEITHE_JOB_RECOGNITION = "ΑΝΑΓΝΩΡΙΣΗ ΕΡΓΑΣΙΑΣ ΩΣ ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ ΓΙΑ ΕΡΓΑΖΟΜΕΝΟΥΣ ΦΟΙΤΗΤΕΣ",
  EMPLOYER_DECLARATION_OF_RESPONSIBILITY = "ΚΑΛΥΨΗ ΤΗΣ ΑΜΟΙΒΗΣ ΤΟΥ ΦΟΙΤΗΤΗ ΑΠΟ ΤΟΝ ΦΟΡΕΑ",
}

export enum InternshipStatus {
  SUBMIT_STAT_FILES_WITHOUT_SECRETARY_CERTIFICATION = "Κατάθεση Δικαιολογητικών Έναρξης (Βεβαίωση Πρακτικής: Προς το παρόν Μη Διαθέσιμη)",
  SUBMIT_START_FILES = "Κατάθεση Δικαιολογητικών Έναρξης (Βεβαίωση Πρακτικής: Διαθέσιμη)",
  SUBMIT_END_FILES = "Κατάθεση Δικαιολογητικών Λήξης",
  PENDING_REVIEW_START = "Έλεγχος Δικαιολογητικών Έναρξης",
  PENDING_REVIEW_END = "Έλεγχος Δικαιολογητικών Λήξης",
  ACTIVE = "Ενεργή Πρακτική Άσκηση",
  ENDED = "Ολοκληρωμένη Πρακτική Άσκηση",
}

export enum DikaiologitikaTypes {
  BebaiosiPraktikisApoGramateia = "BebaiosiPraktikisApoGramateia",
  AitisiForeaGiaApasxolisiFoititi = "AitisiForeaGiaApasxolisiFoititi",
  AntigraphoE3_5 = "AntigraphoE3_5",
  BebaiosiEnsimonApoEfka = "BebaiosiEnsimonApoEfka",
  ApodeixeisEjoflisisMinaiasApozimiosis = "ApodeixeisEjoflisisMinaiasApozimiosis",
  AitisiOlokrirosisPraktikisAskisis = "AitisiOlokrirosisPraktikisAskisis",
  AitisiPraktikis = "AitisiPraktikis",
  DilosiAtomikonStoixeion = "DilosiAtomikonStoixeion",
  YpeuthiniDilosiProsopikonDedomenon = "YpeuthiniDilosiProsopikonDedomenon",
  DilosiMoriodotisi = "DilosiMoriodotisi",
  YpeuthiniDilosiErgodoti = "YpeuthiniDilosiErgodoti",
  AnagnorisiErgasias = "AnagnorisiErgasias",
  BebaiosiApasxolisisKaiAsfalisisAskoumenou = "BebaiosiApasxolisisKaiAsfalisisAskoumenou",
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
