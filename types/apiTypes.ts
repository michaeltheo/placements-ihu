export interface UserDetails {
  first_name: string;
  last_name: string;
  AM: string;
  id: number;
  role: string;
  fathers_name: string;
  telephone_number: string;
  email: string;
  reg_year: string;
  isAdmin: boolean;
}
export interface PlacementUserResponse {
  data: UserDetails;
  message: {
    detail: string;
  };
}

export interface Tokens {
  placement_token: string;
  ihu_access_token: string;
  ihu_refresh_token: string;
}

export interface LoginServerResponse {
  data: {
    user: UserDetails;
    tokens: Tokens;
  };
  message: {
    detail: string;
  };
}
