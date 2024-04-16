const PLACEMENTS_BASE_URL = "http://localhost:8000";

export const API_URLS = {
  IEE_TOKEN_ENDPOINT: "https://login.iee.ihu.gr/token",
  IEE_PROFILE_ENDPOINT: "https://api.iee.ihu.gr/profile",
  PLACEMENTS_LOGIN: `${PLACEMENTS_BASE_URL}/user/`,
  PLACEMENTS_VERIFY_TOKEN: `${PLACEMENTS_BASE_URL}/auth/verify-token`,
  UPLOAD_DIKAIOLOGITIKA: `${PLACEMENTS_BASE_URL}/dikaiologitika/`,
  GET_DIKAIOLOGITIKA: `${PLACEMENTS_BASE_URL}/dikaiologitika/user`,
};

export const GRANT_TYPE = {
  AUTHORIZATION_CODE: "authorization_code",
};
