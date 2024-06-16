import { API_URLS } from "@/constants/apiConfig";
import { extractErrorMessage } from "@/services/errorHandling";
import type {
  InternshipResponse,
  InternshipCreate,
  TotalInternshipResponse,
} from "@/types/internship";
import {
  Department,
  ErrorResponse,
  InternshipProgram,
  InternshipStatus,
  Message,
} from "@/types";

/**
 * Fetches a paginated list of internships based on various filter parameters.
 * @param {InternshipStatus} [internshipStatus] - The status of the internship to filter by.
 * @param {InternshipProgram} [program] - The program of the internship to filter by.
 * @param {string} [userAM] - The user identification number to filter by.
 * @param {string} [companyName] - The company name to filter by.
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [itemsPerPage=10] - The number of items per page for pagination.
 * @returns {Promise<TotalInternshipResponse>} - A promise that resolves to the total internship response.
 */
export async function getAllInternships(
  internshipStatus?: InternshipStatus | undefined,
  department?: Department,
  program?: InternshipProgram,
  userAM?: string,
  companyName?: string,
  page = 1,
  itemsPerPage = 10,
): Promise<TotalInternshipResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (internshipStatus)
      queryParams.append("internship_status", internshipStatus.toString());
    if (department) queryParams.append("department", department.toString());
    if (program) queryParams.append("program", program.toString());
    if (userAM) queryParams.append("user_am", userAM);
    if (companyName) queryParams.append("company_name", companyName);
    queryParams.append("page", page.toString());
    queryParams.append("items_per_page", itemsPerPage.toString());

    const response = await fetch(`${API_URLS.GET_INTERNSHIPS}?${queryParams}`, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data: TotalInternshipResponse = await response.json();
    return data;
  } catch (error) {
    return { error: "Error fetching internships: " + error };
  }
}

/**
 * Deletes an internship by its ID.
 * @param {number} internshipID - The ID of the internship to delete.
 * @returns {Promise<Message | ErrorResponse>} - A promise that resolves to a success message or an error response.
 */
export async function deleteInternship(
  internshipID: number,
): Promise<Message | ErrorResponse> {
  try {
    const response = await fetch(
      `${API_URLS.DELETE_INTERNSHIP}/${internshipID}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      },
    );
    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data: Message = await response.json();
    return data;
  } catch (error) {
    errorLog("Error deleting internship:", error);
    return { error: "An unexpected error occurred." };
  }
}

/**
 * Fetches internship data for a specific user.
 * @param {number} userId - The ID of the user whose internship data to fetch.
 * @returns {Promise<InternshipResponse>} - A promise that resolves to the internship response.
 */
export async function getInternshipByUser(
  userId: number,
): Promise<InternshipResponse> {
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

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error getting internship for user:");
  }
}

/**
 * Creates or updates an internship.
 * @param {InternshipCreate} internshipData - The data needed to create or update the internship.
 * @returns {Promise<InternshipResponse>} - A promise that resolves to the internship response.
 */
export async function createOrUpdateInternship(
  internshipData: InternshipCreate,
): Promise<InternshipResponse> {
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

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error creating internship for user:");
  }
}

/**
 * Updates the status of an internship.
 * @param {number} internshipID - The ID of the internship to update.
 * @param {InternshipStatus} newInternshipStatus - The new status of the internship.
 * @returns {Promise<InternshipResponse>} - A promise that resolves to the updated internship response.
 */
export async function adminUpdateInternshipStatus(
  internshipID: number,
  newInternshipStatus: InternshipStatus,
): Promise<InternshipResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (newInternshipStatus)
      queryParams.append("internship_status", newInternshipStatus.toString());
    const response = await fetch(
      `${API_URLS.INTERNSHIP_BASE_URL}/${internshipID}?${queryParams}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    errorLog("Error updating internship status:", error);
    return { error: "An unexpected error occurred." };
  }
}
