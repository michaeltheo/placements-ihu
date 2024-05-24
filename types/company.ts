import { Message } from "@/types";

export interface Company {
  name: string;
  AFM: string;
  id: number;
}

export interface FetchCompanies {
  data?: Company[];
  message?: Message;
  error?: string;
}
