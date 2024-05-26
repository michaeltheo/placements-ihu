import { API_URLS } from "@/constants/apiConfig";
import { extractErrorMessage } from "@/services/errorHandling";
import { CompanyBase, FetchTotalCompanies, GetCompany } from "@/types/company";
import { ErrorResponse, Message } from "@/types";

export async function getAllCompanies(
  page?: number,
  itemsPerPage?: number,
  name?: string,
): Promise<FetchTotalCompanies> {
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
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching companies: ");
  }
}

export async function adminCreateCompany(
  companyData: CompanyBase,
): Promise<GetCompany> {
  const formData = new FormData();
  formData.append("name", companyData.name);
  formData.append("AFM", companyData.AFM);

  try {
    const response = await fetch(API_URLS.COMPANY_BASE_URL, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data: GetCompany = await response.json();
    return data;
  } catch (error) {
    errorLog("Error creating company:", error);
    return { error: "An unexpected error occurred during company create." };
  }
}
export async function adminUpdateCompany(
  companyID: number,
  companyData: CompanyBase,
): Promise<GetCompany> {
  const formData = new FormData();
  formData.append("name", companyData.name);
  formData.append("AFM", companyData.AFM);

  try {
    const response = await fetch(`${API_URLS.COMPANY_BASE_URL}/${companyID}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data: GetCompany = await response.json();
    return data;
  } catch (error) {
    errorLog("Error creating company:", error);
    return { error: "An unexpected error occurred during company create." };
  }
}
export async function adminDeleteCompany(
  companyID: number,
): Promise<Message | ErrorResponse> {
  try {
    const response = await fetch(
      `${API_URLS.COMPANY_BASE_URL}/delete/${companyID}`,
      {
        method: "Get",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorResponse: ErrorResponse = await extractErrorMessage(response);
      return errorResponse;
    }
    const data: Message = await response.json();
    return data;
  } catch (error) {
    errorLog("Error creating company:", error);
    return { error: "An unexpected error occurred during company create." };
  }
}
