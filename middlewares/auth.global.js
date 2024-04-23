import { useAuthStore } from "@/stores/auth";
import { log } from "@/utils/log";

export default defineNuxtRouteMiddleware((to, from) => {
  log(`Navigating from ${from.path} to ${to.path}`);

  if (to.path === from.path) {
    return;
  }
  if (to.path === "/auth") {
    return;
  }
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return navigateTo("/"); // Adjust the path as needed.
  }
});
