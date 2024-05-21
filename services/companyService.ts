import { errorLog } from "@/utils/log";
import { API_URLS } from "@/constants/apiConfig";
import { extractErrorMessage } from "@/services/errorHandling";
import { Company } from "@/types/company";
import { ResponseWrapper } from "@/types/internship";
import type { ErrorResponse } from "@/types";

export async function getAllCompanies(
  page?: number,
  itemsPerPage?: number,
  name?: string,
): Promise<ResponseWrapper<Company[]> | ErrorResponse | null> {
  try {
    const params = new URLSearchParams();

    if (page !== undefined) {
      params.append("page", String(page));
    }
    if (itemsPerPage !== undefined) {
      params.append("items_per_page", String(itemsPerPage));
    }
    if (name) {
      params.append("name", name);
    }

    const response = await fetch(
      `${API_URLS.COMPANY_BASE_URL}/companies?${params.toString()}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      return extractErrorMessage(response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    errorLog("Error fetching companies: ", error);
    return null;
  }
}
