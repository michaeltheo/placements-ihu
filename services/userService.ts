import { API_URLS } from "@/constants/apiConfig";
import { extractErrorMessage } from "@/services/errorHandling";
import { ErrorResponse } from "@/types";
import { UpdateUser, UpdateUserResponse } from "@/types/user";

export async function updateUserProfile(
  userId: number,
  userProfile: UpdateUser,
): Promise<UpdateUserResponse> {
  try {
    const response = await fetch(`${API_URLS.UPDATE_USER_PROFILE}/${userId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userProfile),
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data: UpdateUserResponse = await response.json();
    return data;
  } catch (error) {
    errorLog("Error creating company:", error);
    return { error: "An unexpected error occurred during update profile." };
  }
}
