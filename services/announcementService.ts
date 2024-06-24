import { AnnouncementsResponse } from "@/types/announcements";

const API_URL = "https://aboard.iee.ihu.gr/api/v2/announcements";

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
    const url = new URL(API_URL);
    url.searchParams.append("tags[]", "11");
    url.searchParams.append("perPage", itemsPerPage.toString());
    url.searchParams.append("page", page.toString());
    if (updatedAfter) {
      url.searchParams.append("updatedAfter", updatedAfter);
    }
    if (updatedBefore) {
      url.searchParams.append("updatedBefore", updatedBefore);
    }
    if (searchText) {
      url.searchParams.append("title", searchText);
    }

    const response = await fetch(url.toString(), {
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
      throw new Error(errorData.error || "Failed to fetch announcements");
    }
  } catch (error: any) {
    throw new Error(error.message || "An unknown error occurred");
  }
}
