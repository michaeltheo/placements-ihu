import { useAuthStore } from "@/stores/auth";
import { log } from "@/utils/log";

export default defineNuxtRouteMiddleware((to, from) => {
  log(`AdminGuard from ${from.path} to ${to.path}`);
  const authStore = useAuthStore();
  // Prevent redirection if already navigating to "/"
  if (to.path === "/") {
    return;
  }
  // Check if either the 'to' path or the 'from' path contains the word 'admin'
  if ((to.path.includes('admin') || from.path.includes('admin')) && !authStore.user.isAdmin) {
    return navigateTo("/");
  }
});
