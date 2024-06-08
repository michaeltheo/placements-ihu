import { Message } from "@/types";

export interface OTPBase {
  code: string;
  expiry: string;
}
export interface GenerateOTPResponse {
  data?: OTPBase;
  message?: Message;
  error?: string;
}

export interface ValidateOTPData {
  user_id: number;
  internship_id: number;
  internship_startDate: string;
  internship_endDate: string;
  internship_company: string;
  user_firstName: string;
  user_lastName: string;
  token: string;
}

export interface ValidateOTP {
  data?: ValidateOTPData;
  message?: Message;
  error?: string;
}
