import { Message } from "@/types";

export interface CompanyBase {
  name: string;
  AFM: string;
  email: string;
  telephone: string;
  city: string;
}

export interface Company extends CompanyBase {
  id: number;
}

export interface GetCompany {
  data?: Company;
  message?: Message;
  error?: string;
}

export interface FetchTotalCompanies {
  data?: Company[];
  total_items?: number;
  message?: Message;
  error?: string;
}
