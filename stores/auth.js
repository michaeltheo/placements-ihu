import { defineStore } from "pinia";
import { log } from "@/utils/log";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({});
  const token = ref({});
  const router = useRouter();
  // Rehydrate state from localStorage
  if (process.client) {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    log(`StoredUser: , ${storedUser}`);
    if (storedToken) {
      token.value = storedToken;
      user.value = storedUser ? JSON.parse(storedUser) : null;
    }
  }

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
    if (token.value) {
      return true;
    }
    return false;
  }

  return {
    user,
    token,
    login,
    logout,
    initiateLogin,
    isLoggedIn,
  };
});
