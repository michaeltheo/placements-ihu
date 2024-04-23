const PLACEMENTS_BASE_URL = "http://localhost:8000";

export const API_URLS = {
  IEE_TOKEN_ENDPOINT: "https://login.iee.ihu.gr/token",
  IEE_PROFILE_ENDPOINT: "https://api.iee.ihu.gr/profile",
  PLACEMENTS_LOGIN: `${PLACEMENTS_BASE_URL}/user/`,
  GET_USERS: `${PLACEMENTS_BASE_URL}/user`,
  PLACEMENTS_VERIFY_TOKEN: `${PLACEMENTS_BASE_URL}/auth/verify-token`,
  UPLOAD_DIKAIOLOGITIKA: `${PLACEMENTS_BASE_URL}/dikaiologitika/`,
  UPDATE_DIKAIOLOGITIKA: `${PLACEMENTS_BASE_URL}/dikaiologitika/`,
  DELETE_DIKAIOLOGITIKA: `${PLACEMENTS_BASE_URL}/dikaiologitika/`,
  GET_DIKAIOLOGITIKA_FILES: `${PLACEMENTS_BASE_URL}/dikaiologitika/user`,
  DOWNLOAD_DIKAIOLOGITIKA: `${PLACEMENTS_BASE_URL}/dikaiologitika/download`,
  GET_DIKAIOLOGITIKA_TYPES: `${PLACEMENTS_BASE_URL}/dikaiologitika/types`,
};

export const GRANT_TYPE = {
  AUTHORIZATION_CODE: "authorization_code",
};
