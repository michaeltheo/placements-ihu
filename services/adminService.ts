import { errorLog } from "@/utils/log";
import { API_URLS } from "@/constants/apiConfig";
import { dummyStatistcs } from "@/constants/dummyStaticsts";

interface UserResponse {
  data: Array<{
    first_name: string;
    last_name: string;
    AM: string;
    id: number;
    role: string;
    fathers_name: string,
    telephone_number: string,
    email: string,
    reg_year: string
  }>;
  total_items: number;
  message: {
    detail: string;
  };
}

interface QuestionStatisticsResponse {
  data: Array<{
    question_id: number;
    question_text: string;
    statistics: Array<{
      option_id: number;
      count: number;
      text: string;
    }>;
    free_text_responses_count: number;
    free_text_responses: string[];
    total_responses: number;
  }>;
  message: {
    detail: string;
  };
  error?: any;
}

interface QuestionData {
  questionName: string;
  answersData: Array<{ text: string; count: number }>;
}

/**
 * This TypeScript function fetches users based on AM and role parameters with pagination support.
 * @param {string} [am] - The `am` parameter in the `getUsersByAmAndRole` function stands for "Account
 * Manager". It is used to filter users based on their account manager. If a value is provided for
 * `am`, only users associated with that specific account manager will be retrieved. If no value is
 * provided
 * @param {string} [role] - The `role` parameter in the `getUsersByAmAndRole` function is used to
 * filter users based on a specific role. If you provide a value for the `role` parameter when calling
 * this function, only users with that specific role will be returned in the response. If you don't
 * @param [page=1] - The `page` parameter in the `getUsersByAmAndRole` function represents the page
 * number of results to retrieve. It defaults to 1 if not provided. This parameter is used to paginate
 * the results, allowing you to fetch a specific page of user data from the API.
 * @param [itemsPerPage=10] - The `itemsPerPage` parameter in the `getUsersByAmAndRole` function
 * specifies the number of user items to be displayed per page when fetching users. By default, it is
 * set to 10, meaning that the function will retrieve and display 10 user items per page unless a
 * different value
 * @returns The function `getUsersByAmAndRole` returns a Promise that resolves to a `UserResponse`
 * object or `null`.
 */
export async function getUsersByAmAndRole(
  am?: string,
  role?: string,
  page = 1,
  itemsPerPage = 10,
): Promise<UserResponse | null> {
  try {
    const queryParams = new URLSearchParams();
    if (am) queryParams.append("am", am);
    if (role) queryParams.append("role", role);
    queryParams.append("page", page.toString());
    queryParams.append("items_per_page", itemsPerPage.toString());

    const response = await useFetch<UserResponse>(
      `${API_URLS.GET_USERS}?${queryParams}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    );

    const { data, error } = response;

    if (error.value) {
      throw new Error(error.value as unknown as string);
    }

    return data.value;
  } catch (error) {
    errorLog("Error fetching users:", error);
    return null;
  }
}

export async function getQuestionStatistics(
  token: string,
): Promise<QuestionStatisticsResponse | null> {
  try {
    const response = await fetch(`${API_URLS.GET_QUESTION_STATISTICS}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    if (!responseData || !responseData.data) {
      throw new Error("Invalid response data received");
    }
    // TODO: Remove dummy statistics
    // return responseData;
    return dummyStatistcs
  } catch (error) {
    errorLog("Error fetching question statistics:", error);
    return null;
  }
}

/**
 * Parse the response from the question statistics endpoint to extract relevant data for visualization.
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
