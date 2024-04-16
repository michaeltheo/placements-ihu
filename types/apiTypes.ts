export interface UserDetails {
  first_name: string;
  last_name: string;
  AM: string;
}

export interface PlacementUserResponse {
  data: {
    first_name: string;
    last_name: string;
    AM: string;
    id: number;
    role: string;
    isAdmin: boolean;
    accessToken: string;
  };
  message: {
    detail: string;
  };
}
