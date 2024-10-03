// middleware/isSecretary.js
import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (!authStore.user?.isSecretary) {
    return navigateTo("/");
  }
});
