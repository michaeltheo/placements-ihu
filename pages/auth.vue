<template>
  <div class="auth__loader">
    <div class="auth__loader--circle"></div>
    <p class="auth__loader--message">Waiting for authentication...</p>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toast-notification";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ServerSideLogin } from "@/services/authService";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const $toast = useToast();

async function initiateAuthenticationProcess() {
  const code = Array.isArray(route.query.code)
    ? route.query.code[0]
    : route.query.code;
  const state = Array.isArray(route.query.state)
    ? route.query.state[0]
    : route.query.state;

  if (!code || !state) {
    $toast.warning(`Authorization code or state not found.`, {
      position: "bottom",
    });
  } else {
    // login Via Server Side
    const response = await ServerSideLogin(state, code);
    if (typeof response === "string") {
      $toast.error(`${response}`, { position: "bottom" });
    } else {
      // Initialize auth store
      $toast.success(`${response?.message?.detail}`, { position: "bottom" });
      authStore.login(
        response.data.tokens.ihu_access_token,
        response.data.user,
        response.data.tokens.ihu_refresh_token,
        response.data.tokens.placement_token
      );
      authStore.setIsAuthenticated(true);
    }
  }
  // Navigation happens last, ensuring all async operations and state updates are complete
  router.push("/");
}
onMounted(initiateAuthenticationProcess);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.auth__loader {
  @apply flex flex-col justify-center items-center fixed w-full h-full z-50;
  background-color: rgba(0, 0, 0, 0.4);

  &--circle {
    @apply w-16 h-16 rounded-full;
    border: 6px solid #fff;
    border-top: 6px solid $primary-blue-color;
    animation: spin 1s linear infinite;
  }
  &--message {
    @apply m-6 font-semibold  text-white;
  }
}
</style>
