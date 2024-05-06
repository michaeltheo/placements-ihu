import { defineStore } from "pinia";
import { UserDetails } from "@/types/apiTypes";
import { verifyToken as verifyTokenService } from "@/services/authService";

type AuthState = {
  user: UserDetails;
  placements_access_token: string;
  IHU_token: string | null;
  IHU_refresh_token: string | null;
  isAuthenticated: any;
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: {
      first_name: "",
      last_name: "",
      AM: "",
      fathers_name: "",
      email: "",
      reg_year: "",
      telephone_number: "",
      role: "",
      id: 0,
      isAdmin: false,
    },
    placements_access_token: "",
    IHU_token: null,
    IHU_refresh_token: null,
    isAuthenticated: false,
  }),

  actions: {
    // Action methods to manipulate the state
    login(
      receivedToken: string,
      userProfile: UserDetails,
      refreshToken: string,
      placementsToken: string,
    ) {
      this.IHU_token = receivedToken;
      this.IHU_refresh_token = refreshToken;
      this.placements_access_token = placementsToken;
      this.user = userProfile;
      this.isAuthenticated = true;
      localStorage.setItem("ihu_token", receivedToken);
      localStorage.setItem("ihu_refresh_token", refreshToken);
      localStorage.setItem("user", JSON.stringify(userProfile));
    },

    async logout() {
      await $fetch("/api/logout");
      this.IHU_token = null;
      this.IHU_refresh_token = null;
      this.user = {
        first_name: "",
        last_name: "",
        AM: "",
        fathers_name: "",
        email: "",
        reg_year: "",
        telephone_number: "",
        role: "",
        id: 0,
        isAdmin: false,
      };
      this.isAuthenticated = false;
      localStorage.removeItem("ihu_token");
      localStorage.removeItem("user");
      localStorage.removeItem("ihu_refresh_token");
    },

    async verifyToken() {
      const isValid = await verifyTokenService();
      this.isAuthenticated = isValid;
    },

    isLoggedIn() {
      return this.isAuthenticated;
    },
    setIsAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },
    setUser(userInfo: any) {
      this.user = userInfo;
      this.isAuthenticated = true;
      this.placements_access_token = userInfo.accessToken;
    },
  },
});
