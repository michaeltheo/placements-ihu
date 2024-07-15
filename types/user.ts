import { Department, UserRole, Message } from "@/types";

export interface User {
  first_name: string;
  last_name: string;
  AM: string;
  id: number;
  role: UserRole;
  telephone_number?: string;
  email?: string;
  department?: Department;
  reg_year?: string;
  isAdmin?: boolean;
}
export interface Developer {
  name: string;
  AM: string;
  icon: string | null;
  description: string;
  github_url: string;
  linkedin_url: string;
}

export interface UpdateUser {
  first_name?: string;
  last_name?: string;
  AM?: string;
  telephone_number?: string;
  email?: string;
  department?: Department;
  reg_year?: string;
}
export interface UpdateUserResponse {
  data?: User;
  message?: Message;
  error?: string;
}
