import { useAuthStore } from "@/stores/auth";
import { log } from "@/utils/log";

export default defineNuxtRouteMiddleware((to, from) => {
  log(`Navigating from ${from.path} to ${to.path}`);
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return navigateTo("/"); // Adjust the path as needed.
  }
});
