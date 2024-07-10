import { defineStore } from "pinia";
import { User } from "@/types/user";
import { UserRole, Department } from "@/types";
import { verifyToken as verifyTokenService } from "@/services/authService";

type AuthState = {
  user: User;
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
      role: UserRole.STUDENT,
      id: 0,
      isAdmin: false,
      department: Department.IT_TEITHE,
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
      userProfile: User,
      refreshToken: string,
      placementsToken: string,
    ) {
      this.IHU_token = receivedToken;
      this.IHU_refresh_token = refreshToken;
      this.placements_access_token = placementsToken;
      this.user = userProfile;
      this.isAuthenticated = true;
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
        role: UserRole.STUDENT,
        id: 0,
        isAdmin: false,
        department: Department.IT_TEITHE,
      };
      this.isAuthenticated = false;
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
