import { API_URLS } from "@/constants/apiConfig";
import { extractErrorMessage } from "@/services/errorHandling";
import { GenerateOTPResponse, ValidateOTP } from "@/types/otp";
import { ErrorResponse } from "@/types";

/**
 * Generates a One-Time Password (OTP).
 *
 * @returns {Promise<GenerateOTPResponse>} The response containing the OTP or an error message.
 */
export async function generateOTP(): Promise<GenerateOTPResponse> {
  try {
    // Fetch the OTP generation endpoint
    const response = await fetch(API_URLS.OTP_GENERATE, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }

    const data: GenerateOTPResponse = await response.json();
    return data;
  } catch (error) {
    errorLog("Error generating OTP:", error);
    return { error: "An unexpected error occurred during OTP generation." };
  }
}

/**
 * Validates the provided OTP code.
 *
 * @param {string} otpCode - The OTP code to be validated.
 * @returns {Promise<ValidateOTP>} The response indicating the validation result or an error message.
 */
export async function validateOTP(otpCode: string): Promise<ValidateOTP> {
  try {
    const response = await fetch(`${API_URLS.OTP_VALIDATE}/${otpCode}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }

    const data: ValidateOTP = await response.json();
    return data;
  } catch (error) {
    errorLog("Error validating OTP:", error);
    return { error: "An unexpected error occurred during OTP validation." };
  }
}
