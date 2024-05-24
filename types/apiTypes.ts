import { User } from "@/types/user";
import { Message } from "@/types";

export interface PlacementUserResponse {
  data: User;
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
    user: User;
    tokens: Tokens;
  };
  message?: Message;
}
