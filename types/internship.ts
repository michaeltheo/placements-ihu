import { InternshipProgram, InternshipStatus, Message } from "@/types";

export interface InternshipBase {
  company_id?: number;
  company_name?: string;
  program: InternshipProgram;
  start_date?: string;
  end_date?: string;
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

export interface InternshipResponse {
  data?: InternshipRead;
  message?: Message;
  error?: string;
}
