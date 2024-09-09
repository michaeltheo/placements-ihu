<template>
  <div class="w-full flex justify-center">
    <v-btn color="success" @click="navigateToProfile">
      Συνέχεια Στην Κατάσταση Δικαιολογητικών
    </v-btn>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { errorLog } from "@/utils/log";
import { API_URLS } from "@/constants/apiConfig";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

/**
 * Navigates to the user profile page if logged in, otherwise navigates to login page.
 * Triggered when the button is clicked.
 */
const navigateToProfile = () => {
  if (authStore.isLoggedIn()) {
    router.push("/profile");
  } else {
    navigateToLogin();
  }
};

/**
 * Redirects the user to the login page.
 */
const navigateToLogin = () => {
  try {
    window.location.href = `${API_URLS.REDIRECT_TO_IHU_IEE_FOR_LOGIN}`;
  } catch (error) {
    errorLog("Failed to redirect to login:", error);
  }
};
</script>
