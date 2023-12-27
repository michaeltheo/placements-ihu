import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();

  // If the user is not authenticated, redirect to the home page
  const user = authStore.user;

  if (!user) {
    return navigateTo("/");
  }
});
