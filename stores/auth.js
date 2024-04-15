import { defineStore } from "pinia";
import { verifyToken as verifyTokenService } from "@/services/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    IHU_token: null,
    IHU_refresh_token: null,
    isAuthenticated: false, // New state property to represent authentication status
  }),

  actions: {
    rehydrate() {
      const storedToken = localStorage.getItem("ihu_token");
      const storedUser = localStorage.getItem("user");
      const storedRefreshToken = localStorage.getItem("ihu_refresh_token");
      if (storedToken) {
        this.IHU_token = storedToken;
        this.IHU_refresh_token = storedRefreshToken;
        this.user = storedUser ? JSON.parse(storedUser) : {};
        this.isAuthenticated = true;
      }
    },

    login(receivedToken, userProfile, refreshToken) {
      this.IHU_token = receivedToken;
      this.IHU_refresh_token = refreshToken;
      this.user = userProfile;
      this.isAuthenticated = true; // Set authenticated to true upon successful login
      localStorage.setItem("ihu_token", receivedToken);
      localStorage.setItem("ihu_refresh_token", refreshToken);
      localStorage.setItem("user", JSON.stringify(userProfile));
    },

    async logout() {
      await $fetch("/api/logout");
      this.IHU_token = null;
      this.IHU_refresh_token = null;
      this.user = {};
      this.isAuthenticated = false;
      localStorage.removeItem("ihu_token");
      localStorage.removeItem("user");
      localStorage.removeItem("ihu_refresh_token");
    },

    async verifyToken() {
      const isValid = await verifyTokenService(); // Use the service to verify the token
      this.isAuthenticated = isValid; // Update isAuthenticated based on the verification result
    },

    isLoggedIn() {
      return this.isAuthenticated; // Use the isAuthenticated state to determine if logged in
    },
    setIsAuthenticated(value) {
      this.isAuthenticated = value;
    },
    setUser(userInfo) {
      this.user = userInfo;
      this.isAuthenticated = true;
    },
  },
});
