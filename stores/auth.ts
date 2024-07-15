import { defineStore } from "pinia";
import { UserRole, Department } from "@/types";
import { User } from "@/types/user";
import { verifyToken as verifyTokenService } from "@/services/authService";

type AuthState = {
  user: User;
  placements_access_token: string;
  IHU_token: string | null;
  IHU_refresh_token: string | null;
  isAuthenticated: boolean;
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: {
      first_name: "",
      last_name: "",
      AM: "",
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
      const user = await verifyTokenService();
      this.isAuthenticated = user !== null;
      if (user) {
        this.user = user;
      }
    },

    isLoggedIn() {
      return this.isAuthenticated;
    },
    setIsAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },
    setUser(userInfo: any) {
      const departmentValues = Object.values(Department);
      let department = Department.IT_TEITHE;
      if (departmentValues.includes(userInfo.department)) {
        department = userInfo.department;
      } else {
        errorLog(`Received unknown department: ${userInfo.department}`);
      }

      // Update user information
      this.user = {
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        AM: userInfo.AM,
        email: userInfo.email,
        reg_year: userInfo.reg_year,
        telephone_number: userInfo.telephone_number,
        role: userInfo.role,
        id: userInfo.id,
        isAdmin: userInfo.role === UserRole.ADMIN,
        department: department as Department,
      };

      this.isAuthenticated = true;
    },
  },
});
