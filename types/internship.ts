export enum InternshipProgram {
  OAED = "ΟΑΕΔ",
  ESPA = "ΕΣΠΑ",
  EMPLOYER_FINANCED = "Αποκλειστικά χρηματοδοτούμενη από εργοδότη",
}

export enum InternshipStatus {
  PENDING_REVIEW = "Pending review",
  ACTIVE = "Active",
  ENDED = "Ended",
}

export interface InternshipBase {
  company_id?: number;
  company_name?: string;
  program: InternshipProgram;
  start_date?: string; // Use string if dates are returned as ISO strings
  end_date?: string; // Use string if dates are returned as ISO strings
}

export interface InternshipCreate extends InternshipBase {}

export interface InternshipUpdate extends InternshipBase {
  status?: InternshipStatus;
}

export interface InternshipRead extends InternshipBase {
  id: number;
  user_id: number;
  status: InternshipStatus;
}
export interface ResponseWrapper<T> {
  data: T;
  message: {
    detail: string;
  };
}
