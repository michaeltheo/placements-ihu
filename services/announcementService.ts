import { AnnouncementsResponse } from "@/types/announcements";
import { API_URLS } from "@/constants/apiConfig";


interface FetchAnnouncementsParams {
  page?: number;
  itemsPerPage?: number;
  updatedAfter?: string | null;
  updatedBefore?: string | null;
  searchText?: string;
}

export async function fetchAnnouncements({
  page = 1,
  itemsPerPage = 10,
  updatedAfter = null,
  updatedBefore = null,
  searchText = "",
}: FetchAnnouncementsParams = {}): Promise<AnnouncementsResponse> {
  try {
    
    const params = new URLSearchParams({
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
    });

    if (updatedAfter) {
      params.append("updatedAfter", updatedAfter);
    }
    if (updatedBefore) {
      params.append("updatedBefore", updatedBefore);
    }
    if (searchText) {
      params.append("searchText", searchText);
    }


    const response = await fetch(`${API_URLS.GET_ANNOUNCMENETS}?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data: AnnouncementsResponse = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch announcements");
    }
  } catch (error: any) {
    throw new Error(error.message || "An unknown error occurred");
  }
}