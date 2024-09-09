import {
  Department,
  InternshipProgram,
  InternshipStatus,
  Message,
} from "@/types";

export interface InternshipBase {
  company_id?: number;
  company_name?: string;
  department?: Department;
  program: InternshipProgram;
  start_date?: string;
  end_date?: string;
  supervisor?: string;
}

export interface InternshipCreate extends InternshipBase {}

export interface InternshipUpdate extends InternshipBase {
  id?: number;
  status?: InternshipStatus;
}

export interface InternshipRead extends InternshipBase {
  id: number;
  user_id?: number;
  user_first_name?: string;
  user_last_name?: string;
  user_am?: string;
  status?: InternshipStatus;
}

export interface InternshipResponse {
  data?: InternshipRead;
  message?: Message;
  error?: string;
}

export interface TotalInternshipResponse {
  data?: InternshipRead[];
  total_items?: number;
  message?: Message;
  error?: string;
}
