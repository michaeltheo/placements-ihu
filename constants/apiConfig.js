const PLACEMENTS_BASE_URL = "http://localhost:8000";

export const API_URLS = {
  IEE_TOKEN_ENDPOINT: "https://login.iee.ihu.gr/token",
  IEE_PROFILE_ENDPOINT: "https://api.iee.ihu.gr/profile",
  REDIRECT_TO_IHU_IEE_FOR_LOGIN: `${PLACEMENTS_BASE_URL}/auth/redirect`,
  PLACEMENTS_LOGIN: `${PLACEMENTS_BASE_URL}/auth/login`,
  GET_USERS: `${PLACEMENTS_BASE_URL}/user`,
  SET_STUDENT:`${PLACEMENTS_BASE_URL}/user/set-student`,
  SET_ADMIN:`${PLACEMENTS_BASE_URL}/user/set-admin`,
  PLACEMENTS_VERIFY_TOKEN: `${PLACEMENTS_BASE_URL}/auth/verify-token`,
  UPLOAD_DIKAIOLOGITIKA: `${PLACEMENTS_BASE_URL}/dikaiologitika/`,
  UPDATE_DIKAIOLOGITIKA: `${PLACEMENTS_BASE_URL}/dikaiologitika/`,
  DELETE_DIKAIOLOGITIKA: `${PLACEMENTS_BASE_URL}/dikaiologitika/`,
  GET_DIKAIOLOGITIKA_FILES: `${PLACEMENTS_BASE_URL}/dikaiologitika/user`,
  DOWNLOAD_DIKAIOLOGITIKA: `${PLACEMENTS_BASE_URL}/dikaiologitika/download`,
  GET_DIKAIOLOGITIKA_TYPES: `${PLACEMENTS_BASE_URL}/dikaiologitika/types`,
  GET_QUESTION_STATISTICS: `${PLACEMENTS_BASE_URL}/question/stats/answers`,
  INTERNSHIP_BASE_URL: `${PLACEMENTS_BASE_URL}/internship`,
  COMPANY_BASE_URL: `${PLACEMENTS_BASE_URL}/company`,
};

export const GRANT_TYPE = {
  AUTHORIZATION_CODE: "authorization_code",
};
