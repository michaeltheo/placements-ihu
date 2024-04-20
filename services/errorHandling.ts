/**
 * Checks if the response from an API call contains an error.
 * @param response - The response object from the fetch call.
 * @returns A boolean indicating if the response contains an error.
 */
export function hasErrorResponse(response: any): response is { error: string } {
  return response && typeof response.error === "string";
}

/**
 * Extracts error message from fetch response.
 * @param response - The response object from the fetch call.
 * @returns An object with an error message.
 */
export async function extractErrorMessage(
  response: Response,
): Promise<{ error: string }> {
  try {
    const responseData = await response.json();
    const errorMessage = responseData.detail || "An error occurred.";
    return { error: errorMessage };
  } catch {
    // Fallback error message if parsing fails
    return { error: "An error occurred, and the details could not be parsed." };
  }
}
