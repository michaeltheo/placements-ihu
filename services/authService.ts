import { useRuntimeConfig } from "#imports";
import { errorLog } from "@/utils/log";
import { API_URLS, GRANT_TYPE } from "@/constants/apiConfig";
import { PlacementUserResponse, UserDetails } from "@/types/apiTypes";

interface TokenResponse {
  access_token: string;
  expires_in: number;
  user: any;
}

/**
 * The function fetchToken retrieves a token by sending a POST request with authorization code and
 * client credentials.
 * @param {string} code - The `code` parameter in the `fetchToken` function is typically an
 * authorization code that is obtai ned from the authorization server after a user has successfully
 * authenticated and authorized access to their resources. This code is then used to exchange for an
 * access token that allows the client to make authenticated requests on behalf of the
 * @returns The `fetchToken` function is returning a `TokenResponse` object or `null` based on the
 * result of the API call.
 */
export async function fetchToken(code: string): Promise<TokenResponse | null> {
  const config = useRuntimeConfig();
  const body = {
    client_id: config.public.CLIENT_ID,
    client_secret: config.public.CLIENT_SECRET,
    grant_type: GRANT_TYPE.AUTHORIZATION_CODE,
    code,
  };

  try {
    const { data } = await useFetch(API_URLS.IEE_TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(Object.entries(body) as string[][]).toString(),
    });

    return data.value as TokenResponse;
  } catch (error) {
    errorLog("Token fetch error:", error);
    return null;
  }
}

/**
 * The function fetchProfile fetches a user profile using an access token and returns the profile data.
 * @param {string} accessToken - The `accessToken` parameter is a string that represents the access
 * token needed to authenticate the user and make authorized requests to the API endpoint. This access
 * token is typically obtained after a user successfully logs in or authorizes the application to
 * access their profile information.
 * @returns The `fetchProfile` function is returning the `data.value` from the response if the fetch is
 * successful. If there is an error during the fetch, it will log the error message and return `null`.
 */
export async function fetchProfile(accessToken: string): Promise<any> {
  try {
    const { data } = await useFetch(API_URLS.IEE_PROFILE_ENDPOINT, {
      method: "GET",
      headers: {
        "x-access-token": accessToken,
      },
    });

    return data.value;
  } catch (error) {
    errorLog("Profile fetch error:", error);
    return null;
  }
}

/**
 * Creates a new user or retrieves an existing one from the placements system.
 * @param userDetails - The details of the user to create or retrieve.
 * @returns A promise that resolves with the user details or null in case of error.
 */
export async function createOrGetUser(
  userDetails: UserDetails,
): Promise<PlacementUserResponse | null> {
  try {
    // Use `useFetch` from Nuxt to make the API call.
    const { data, error } = await useFetch<PlacementUserResponse>(
      API_URLS.PLACEMENTS_LOGIN,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
        // Ensures cookies, including HTTP-only, are sent with the request.
        credentials: "include",
      },
    );

    if (error.value) {
      throw new Error(error.value as unknown as string); // If there's an error, throw it to be caught by the catch block.
    }
    return data.value; // If the call was successful, return the user data.
  } catch (error) {
    errorLog("Placements login error:", error); // Use your logging/error handling mechanism.
    return null; // Return null to indicate the failure.
  }
}

/**
 * Verifies the token's validity and fetches user information.
 * @returns A promise that resolves with user data if the token is valid, otherwise `null`.
 */
export async function verifyToken(): Promise<
  PlacementUserResponse["data"] | null
> {
  try {
    const response = await fetch(API_URLS.PLACEMENTS_VERIFY_TOKEN, {
      method: "GET",
      credentials: "include", // Necessary for cookies to be sent with the request
    });

    if (response.ok) {
      const result: PlacementUserResponse = await response.json();
      return result.data; // Return user data on success
    } else {
      throw new Error(
        `Token verification failed with status: ${response.status}`,
      );
    }
  } catch (error) {
    errorLog("Token verification error:", error);
    return null; // Return null to indicate failure
  }
}
