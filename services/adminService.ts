import { errorLog } from "@/utils/log";
import { API_URLS } from "@/constants/apiConfig";
import type {
  ErrorResponse,
  Message,
  QuestionnaireType,
  ResponseTotalItems,
} from "@/types";
import { extractErrorMessage } from "@/services/errorHandling";
import { User } from "@/types/user";
import {
  QuestionData,
  QuestionStatisticsResponse,
} from "@/types/questionAnswer";

/**
 * Fetches users based on Account Manager (AM) and role parameters with pagination support.
 * @param {string} [am] - The Account Manager to filter users by. Optional.
 * @param {string} [role] - The role to filter users by. Optional.
 * @param {number} [page=1] - The page number of results to retrieve. Defaults to 1.
 * @param {number} [itemsPerPage=10] - The number of user items to display per page. Defaults to 10.
 * @returns {Promise<ResponseTotalItems<User[]> | ErrorResponse>} A promise resolving to the user data or an error response.
 */
export async function getUsersByAmAndRole(
  am?: string,
  role?: string,
  page = 1,
  itemsPerPage = 10,
): Promise<ResponseTotalItems<User[]> | ErrorResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (am) queryParams.append("am", am);
    if (role) queryParams.append("role", role);
    queryParams.append("page", page.toString());
    queryParams.append("items_per_page", itemsPerPage.toString());

    const response = await fetch(`${API_URLS.GET_USERS}?${queryParams}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }

    const data: ResponseTotalItems<User[]> = await response.json();
    return data;
  } catch (error) {
    return { error: "Error fetching users: " + error };
  }
}

/**
 * Fetches statistics for a specified questionnaire type.
 * @param {QuestionnaireType} questionnaireType - The type of questionnaire to fetch statistics for.
 * @returns {Promise<QuestionStatisticsResponse>} A promise resolving to the question statistics data or an error response.
 */
export async function getQuestionStatistics(
  questionnaireType: QuestionnaireType,
): Promise<QuestionStatisticsResponse> {
  try {
    const response = await fetch(
      `${API_URLS.GET_QUESTION_STATISTICS}?questionnaire_type=${questionnaireType}`,
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

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    errorLog("Error fetching question statistics:", error);
    return { error: "Error fetching question statistics." };
  }
}

/**
 * Parses the response from the question statistics endpoint to extract relevant data for visualization.
 * @param {QuestionStatisticsResponse} responseData - The response data from the question statistics endpoint.
 * @returns {Array<QuestionData>} An array of QuestionData objects containing question names and corresponding answer data.
 */
export function parseQuestionStatistics(
  responseData: QuestionStatisticsResponse,
): Array<QuestionData> {
  const questionDataArray: Array<QuestionData> = [];

  if (
    !responseData ||
    !responseData.data ||
    !Array.isArray(responseData.data)
  ) {
    return questionDataArray;
  }

  responseData.data.forEach((question) => {
    const questionData: QuestionData = {
      questionName: question.question_text,
      answersData: [],
    };

    question.statistics.forEach((statistic) => {
      questionData.answersData.push({
        text: statistic.text,
        count: statistic.count,
      });
    });

    questionDataArray.push(questionData);
  });

  return questionDataArray;
}

/**
 * Sets a specified user as an admin.
 * @param {number} userId - The ID of the user to set as admin.
 * @returns {Promise<Message | ErrorResponse>} A promise resolving to a success message or an error response.
 */
export async function adminSetUserAsAdmin(
  userId: number,
): Promise<Message | ErrorResponse> {
  try {
    const response = await fetch(`${API_URLS.SET_ADMIN}${userId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data: Message = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to set user as admin");
  }
}

/**
 * Sets a specified user as a student.
 * @param {number} userId - The ID of the user to set as student.
 * @returns {Promise<Message | ErrorResponse>} A promise resolving to a success message or an error response.
 */
export async function adminSetUserAsStudent(
  userId: number,
): Promise<Message | ErrorResponse> {
  try {
    const response = await fetch(`${API_URLS.SET_STUDENT}${userId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data: Message = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to set user as student");
  }
}
