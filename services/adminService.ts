import { errorLog } from "@/utils/log";
import { API_URLS } from "@/constants/apiConfig";


interface UserResponse {
  data: Array<{
    first_name: string;
    last_name: string;
    AM: string;
    id: number;
    role: string;
  }>;
  total_items: number;
  message: {
    detail: string; 
  };
}





export async function getUsersByAmAndRole(am?: string, role?: string, page = 1, itemsPerPage = 10): Promise<UserResponse | null> {
  try {
    const queryParams = new URLSearchParams();
    if (am) queryParams.append('am', am);
    if (role) queryParams.append('role', role);
    queryParams.append('page', page.toString());
    queryParams.append('items_per_page', itemsPerPage.toString());

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

