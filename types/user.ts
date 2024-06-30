import { Department, UserRole } from "@/types";

export interface User {
  first_name: string;
  last_name: string;
  AM: string;
  id: number;
  role: UserRole;
  fathers_name?: string;
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
