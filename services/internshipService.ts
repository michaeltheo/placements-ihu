import { errorLog } from "@/utils/log";
import { API_URLS } from "@/constants/apiConfig";
import { extractErrorMessage } from "@/services/errorHandling";
import type {
  ResponseWrapper,
  InternshipRead,
  InternshipCreate,
} from "@/types/internship";
import type { ErrorResponse } from "@/types";

/**
 * The function `getInternshipByUser` fetches internship data for a specific user and returns it in a
 * structured format.
 * @param {string} userId - The `userId` parameter in the `getInternshipByUser` function is a string
 * that represents the unique identifier of the user for whom you want to retrieve internship
 * information. This function makes an asynchronous request to a specific API endpoint to fetch
 * internship data associated with the provided `userId`.
 * @returns The function `getInternshipByUser` returns a Promise that resolves to either a
 * `ResponseWrapper<InternshipRead>`, an `ErrorResponse`, or `null`.
 */

export async function getInternshipByUser(
  userId: number,
): Promise<ResponseWrapper<InternshipRead> | ErrorResponse | null> {
  try {
    const response = await fetch(`${API_URLS.INTERNSHIP_BASE_URL}/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return extractErrorMessage(response);
    }

    const data: ResponseWrapper<InternshipRead> = await response.json();
    return data;
  } catch (error) {
    errorLog("Error getting internship for user: ", error);
    return null;
  }
}

/**
 * The function `createOrUpdateInternship` sends a POST request to a specified API endpoint with
 * internship data and returns a response or an error message.
 * @param {InternshipCreate} internshipData - The `internshipData` parameter in the
 * `createOrUpdateInternship` function is of type `InternshipCreate`. It contains the data needed to
 * create or update an internship. This data is expected to be in a specific format defined by the
 * `InternshipCreate` type.
 * @returns The `createOrUpdateInternship` function returns a `Promise` that resolves to either a
 * `ResponseWrapper<InternshipRead>`, an `ErrorResponse`, or `null`.
 */
export async function createOrUpdateInternship(
  internshipData: InternshipCreate,
): Promise<ResponseWrapper<InternshipRead> | ErrorResponse | null> {
  try {
    const response = await fetch(API_URLS.INTERNSHIP_BASE_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(internshipData),
    });

    if (!response.ok) {
      return extractErrorMessage(response);
    }

    const data: ResponseWrapper<InternshipRead> = await response.json();
    return data;
  } catch (error) {
    errorLog("Error creating or updating internship: ", error);
    return { error: "An unexpected error occurred." };
  }
}