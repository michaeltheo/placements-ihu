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
