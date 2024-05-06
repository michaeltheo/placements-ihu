import { useAuthStore } from "@/stores/auth";
import { log } from "@/utils/log";

export default defineNuxtRouteMiddleware((to, from) => {
  log(`Navigating from ${from.path} to ${to.path}`);
  const authStore = useAuthStore();

  if (to.path === from.path && authStore.isAuthenticated) {
    return;
  }
  if (!authStore.isAuthenticated) {
    return navigateTo("/");   }
});
