import { errorLog } from "@/utils/log";
import { API_URLS } from "@/constants/apiConfig";
import type {
  DikaiologitikaFilesResponse,
  UpdateDeleteResponse,
  UploadResponse,
} from "@/types/dikaiologitika";
import { extractErrorMessage } from "@/services/errorHandling";

/**
 * Uploads a dikaiologitika file to the server.
 * @param file The file to be uploaded.
 * @param type The type of dikaiologitika being uploaded.
 * @param program The program of dikaiologitika being uploaded.
 * @returns Promise resolving to the upload response data or an error message.
 */
export async function uploadDikaiologitika(
  file: File,
  type: string,
  program: string,
): Promise<UploadResponse> {
  // Ensure the file is a PDF
  if (file.type !== "application/pdf") {
    return { error: "Only PDF files are allowed." };
  }

  // Create FormData to send the file, type, and program to the server.
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("internship_program", program);

  try {
    // Attempt to upload the file using the fetch API.
    const response = await fetch(API_URLS.UPLOAD_DIKAIOLOGITIKA, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    // Check for a successful response, otherwise return an error.
    if (!response.ok) {
      return extractErrorMessage(response);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { error: "An unexpected error occurred during the upload." };
  }
}

/**
 * Updates a specific dikaiologitika file.
 * @param file The new file to update the existing one.
 * @param dikaiologitaId The ID of the dikaiologitika to be updated.
 * @param program The program of dikaiologitika being updated.
 * @returns Promise resolving to the update response data or an error message.
 */
export async function updateDikaiologitika(
  file: File,
  dikaiologitaId: number,
  program: string,
): Promise<UpdateDeleteResponse> {
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("program", program);

  try {
    const response = await fetch(
      `${API_URLS.UPDATE_DIKAIOLOGITIKA}${dikaiologitaId}`,
      {
        method: "PUT",
        credentials: "include",
        body: formData,
      },
    );

    if (!response.ok) {
      return extractErrorMessage(response);
    }

    const data: UpdateDeleteResponse = await response.json();
    return data;
  } catch (error) {
    errorLog("Error updating dikaiologitika:", error);
    return { error: "An unexpected error occurred during the update." };
  }
}
/**
 * Deletes a dikaiologitika file by its ID.
 * @param fileID The ID of the file to be deleted.
 * @returns Promise resolving to the delete operation response data or an error message.
 */
export async function deleteDikaiologitika(
  fileID: number,
): Promise<UpdateDeleteResponse> {
  try {
    const response = await fetch(`${API_URLS.DELETE_DIKAIOLOGITIKA}${fileID}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return extractErrorMessage(response);
    }

    const data: UpdateDeleteResponse = await response.json();
    return data;
  } catch (error) {
    errorLog("Error deleting dikaiologitika:", error);
    return { error: "An unexpected error occurred." };
  }
}

/**
 * Fetches dikaiologitika files associated with a specific user.
 * @param userId The user ID for whom files are being fetched.
 * @returns Promise resolving to the files response data or null in case of error.
 */
export async function fetchDikaiologitaFiles(
  userId: number,
): Promise<DikaiologitikaFilesResponse | null> {
  try {
    const response = await fetch(
      `${API_URLS.GET_DIKAIOLOGITIKA_FILES}${userId}/files`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch files, status: ${response.status}`);
    }

    const data: DikaiologitikaFilesResponse = await response.json();
    // Format the date for each file to a more readable format.
    data.data.files.forEach((file) => {
      file.date = new Date(file.date).toLocaleString("el-GR");
    });

    return data;
  } catch (error) {
    errorLog("Failed to fetch files:", error);
    return null;
  }
}

/**
 * Initiates the download of a dikaiologitika file by its ID.
 * @param fileId The ID of the file to be downloaded.
 * @returns Promise resolving when the file download has been initiated.
 */
export async function downloadDikaiologitika(fileId: number): Promise<void> {
  try {
    const response = await fetch(
      `${API_URLS.DOWNLOAD_DIKAIOLOGITIKA}${fileId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(errorDetail || "Failed to download file.");
    }

    // Create a URL for the file blob and initiate download.
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "downloadedFile.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    a.remove();
  } catch (error) {
    errorLog("Error downloading file:", error);
  }
}

/**
 * Initiates the download of all dikaiologitika files for a specific user as a ZIP file.
 * @param userId The ID of the user whose files are to be downloaded.
 * @returns Promise resolving when the file download has been initiated.
 */
export async function downloadAllUserFiles(userId: number): Promise<void> {
  try {
    const response = await fetch(
      `${API_URLS.GET_DIKAIOLOGITIKA_FILES}${userId}/download-zip`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(errorDetail || "Failed to download file.");
    }

    // Create a URL for the file blob and initiate download.
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `user_${userId}_files.zip`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    a.remove();
  } catch (error) {
    errorLog("Error downloading file:", error);
  }
}

/**
 * Retrieves the list of available dikaiologitika types.
 * @returns Promise resolving to the types response data or null in case of error.
 */
export async function getDikaiologitkaTypes(): Promise<any> {
  try {
    const response = await fetch(`${API_URLS.GET_DIKAIOLOGITIKA_TYPES}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get dikaiologitika types.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    errorLog("Error while getting dikaiologitika types:", error);
    return null;
  }
}
