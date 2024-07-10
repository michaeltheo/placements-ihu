import { errorLog } from "@/utils/log";
import { API_URLS } from "@/constants/apiConfig";
import type {
  LoginServerResponse,
  PlacementUserResponse,
} from "@/types/apiTypes";
import { extractErrorMessage } from "@/services/errorHandling";

export async function ServerSideLogin(
  state: string,
  code: string,
): Promise<LoginServerResponse | string> {
  try {
    const response = await fetch(`${API_URLS.PLACEMENTS_LOGIN}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state, code }),
    });
    if (response.ok) {
      const data: LoginServerResponse = await response.json();
      return data;
    } else {
      // Extract error message using extractErrorMessage function
      const errorData = await extractErrorMessage(response);
      const errorMessage = errorData.error;

      // Return the error message
      return errorMessage;
    }
  } catch (error: any) {
    // Return the error message
    return error.message;
  }
}

/**
 * Verifies the token's validity and fetches user information.
 * @returns A promise that resolves with user data if the token is valid, otherwise `null`.
 */
export async function verifyToken(): Promise<
  PlacementUserResponse["data"] | null
> {
  try {
    const response = await fetch(API_URLS.PLACEMENTS_VERIFY_TOKEN, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const result: PlacementUserResponse = await response.json();
      return result.data;
    } else {
      throw new Error(
        `Token verification failed with status: ${response.status}`,
      );
    }
  } catch (error) {
    errorLog("Token verification error:", error);
    return null;
  }
}
