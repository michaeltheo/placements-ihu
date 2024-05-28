import { API_URLS } from "@/constants/apiConfig";
import { extractErrorMessage } from "@/services/errorHandling";
import { ErrorResponse, Message, QuestionnaireType } from "@/types";
import {
  AnswerSubmission,
  GetAnswersResponse,
  GetQuestionsResponse,
} from "@/types/questionAnswer";

/**
 * Fetches questions for a specific questionnaire type.
 *
 * @param {QuestionnaireType} questionnaireType - The type of the questionnaire to fetch questions for.
 * @returns {Promise<GetQuestionsResponse>} - A promise that resolves to the questions or an error response.
 */
export async function getQuestions(
  questionnaireType: QuestionnaireType,
): Promise<GetQuestionsResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (questionnaireType)
      queryParams.append("questionnaire_type", questionnaireType.toString());
    const response = await fetch(
      `${API_URLS.QUESTION_BASE_URL}?${queryParams}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    );
    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data: GetQuestionsResponse = await response.json();
    return data;
  } catch (error) {
    errorLog("Error fetching questions:", error);
    return { error: "Error fetching questions" };
  }
}

/**
 * Submits answers for a questionnaire.
 *
 * @param {AnswerSubmission[]} submissions - An array of answer submissions to be sent.
 * @returns {Promise<Message | ErrorResponse>} - A promise that resolves to a success message or an error response.
 */
export async function submitAnswers(
  submissions: AnswerSubmission[],
): Promise<Message | ErrorResponse> {
  try {
    const response = await fetch(API_URLS.SUBMIT_ANSWERS, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissions),
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data: Message = await response.json();
    return data;
  } catch (error) {
    errorLog("Error submitting answers:", error);
    return { error: "Error submitting answers" };
  }
}

/**
 * Fetches answers submitted by a specific user.
 *
 * @param {number} userID - The ID of the user whose answers are to be fetched.
 * @returns {Promise<GetAnswersResponse>} - A promise that resolves to the user's answers or an error response.
 */
export async function getUserAnswers(
  userID: number,
): Promise<GetAnswersResponse> {
  try {
    const response = await fetch(`${API_URLS.GET_ANSWERS}/${userID}`, {
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
    const data: GetAnswersResponse = await response.json();
    return data;
  } catch (error) {
    errorLog("Error fetching user answers:", error);
    return { error: "Error fetching user answers" };
  }
}
