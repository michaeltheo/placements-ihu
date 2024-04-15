import { useAuthStore } from "@/stores/auth";
import { verifyToken } from "@/services/authService";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  const userData = await verifyToken();
  if (userData) {
    authStore.setUser(userData);
  } else {
    authStore.setIsAuthenticated(false);
  }
});
