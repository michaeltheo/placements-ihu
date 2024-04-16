import { errorLog } from "@/utils/log";
import { API_URLS } from "@/constants/apiConfig";
import { useAuthStore } from "@/stores/auth";
import type { DikaiologitikaFilesResponse } from "~/types/dikaiologitika";

const authStore = useAuthStore();

/**
 * Uploads a PDF file to the dikaiologitika endpoint.
 * @param accessToken The Bearer token for authorization.
 * @param file The PDF file to be uploaded.
 * @param type The type associated with the file.
 * @returns A promise that resolves with the response data or null in case of an error.
 */
export async function uploadDikaiologitika(
  file: File,
  type: string,
): Promise<any | null> {
  // Check if the file is a PDF
  if (file.type !== "application/pdf") {
    alert("Only PDF files are allowed.");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  try {
    const response = await fetch(API_URLS.UPLOAD_DIKAIOLOGITIKA, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.placements_access_token}`,
        // Don't set Content-Type header when using FormData,
        // the browser will set it along with the boundary
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    errorLog("Dikaiologitika upload error:", error);
    return null;
  }
}

/**
 * This TypeScript function fetches Dikaiologitika files for a specific user ID using an API call and
 * returns the response data or null in case of an error.
 * @param {number} userId - The `userId` parameter in the `fetchDikaiologitaFiles` function is used to
 * specify the user for whom the Dikaiologitika files are being fetched. It is a number that represents
 * the unique identifier of the user in the system.
 * @returns The function `fetchDikaiologitaFiles` is returning a Promise that resolves to either a
 * `DikaiologitikaFilesResponse` object or `null`.
 */

export async function fetchDikaiologitaFiles(
  userId: number,
): Promise<DikaiologitikaFilesResponse | null> {
  try {
    const response = await fetch(
      `${API_URLS.GET_DIKAIOLOGITIKA}/${userId}/files`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authStore.placements_access_token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Failed to to fetch files, status: ${response.status}`);
    }
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const data: DikaiologitikaFilesResponse = await response.json();
    data.data.files.forEach((file) => {
      file.date = new Date(file.date).toLocaleString("el-GR", dateOptions);
    });
    return data;
  } catch (error) {
    errorLog("Failed ot fetch files:", error);
    return null;
  }
}
