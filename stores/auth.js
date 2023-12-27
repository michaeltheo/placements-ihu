import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null);
  const router = useRouter();

  function login(receivedToken, userProfile) {
    token.value = receivedToken;
    user.value = userProfile;
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(userProfile));
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  }

  function initiateLogin() {
    const config = useRuntimeConfig();
    const redirectUri = "http://localhost:3000/auth";
    window.location.href = `https://login.iee.ihu.gr/authorization/?client_id=${config.public.CLIENT_ID}&response_type=code&scope=profile&redirect_uri=${redirectUri}`;
  }

  function isLoggedIn() {
    return !!token.value;
  }

  // Check for stored token and user on store initialization
  onMounted(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      login(storedToken, JSON.parse(storedUser));
    }
  });

  return { user, token, login, logout, initiateLogin, isLoggedIn };
});
