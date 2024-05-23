
export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}
export enum SubmissionTime {
  START = "Έναρξη",
  END = "Λήξη"
}


export enum  Department{
  IT_TEITHE = 'ΤΜΗΜΑ ΜΗΧΑΝΙΚΩΝ ΠΛΗΡΟΦΟΡΙΚΗΣ',
  EL_TEITHE = 'ΤΜΗΜΑ ΗΛΕΚΤΡΟΝΙΚΗΣ',
  IHU_IEE = 'ΤΜΗΜΑ ΜΗΧΑΝΙΚΩΝ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΗΛΕΚΤΡΟΝΙΚΩΝ ΣΥΣΤΗΜΑΤΩΝ',
}

export enum InternshipProgram{
  TEITHE_OAED = "ΠΑΛΑΙΟ ΤΜΗΜΑ ΟΑΕΔ",
  ESPA = "ΠΑΛΑΙΟ/NEO ΤΜΗΜΑ ΕΣΠΑ",
  TEITHE_JOB_RECOGNITION = "ΠΑΛΑΙΟ ΤΜΗΜΑ ΑΝΑΓΝΩΡΙΣΗ ΕΡΓΑΣΙΑΣ",
  EMPLOYER_DECLARATION_OF_RESPONSIBILITY = "ΝΕΟ ΤΜΗΜΑ ΥΠΕΥΘΥΝΗ ΔΗΛΩΣΗ ΤΟΥ ΕΡΓΟΔΟΤΗ"
}

export enum InternshipStatus{
  PENDING_REVIEW = "Pending review",
  ACTIVE = "Active",
  ENDED = "Ended"
}



// export interface User {
//   first_name: string;
//   last_name: string;
//   role: UserRole;
//   AM: string;
//   id: number;
//   isAdmin: boolean;
// }
// export interface Option {
//   id: number;
//   option_text: string;
// }

// export interface Question {
//   id: number;
//   question_text: string;
//   question_type: string;
//   supports_multiple_answers?: boolean;
//   answer_options?: Option[];
// }

export interface ErrorResponse {
  error: string;
}

export interface Message{
  detail:string;
}
export interface ResponseWrapper<DataT> {
  data?: DataT;
  message?: Message;
}

export interface ResponseTotalItems<DataT> extends ResponseWrapper<DataT> {
  total_items: number;
}