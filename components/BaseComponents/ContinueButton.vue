<template>
  <div v-if="isVisible" class="w-full flex justify-center">
    <v-btn color="success" @click="navigateToProfile">
      Συνέχεια Στην Κατάσταση Δικαιολογητικών
    </v-btn>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

/**
 * Computed property that determines if the button should be visible based on user's authentication status.
 * @returns {boolean} - True if user is logged in, false otherwise.
 */
const isVisible = computed(() => authStore.isLoggedIn());

/**
 * Navigates to the user profile page.
 * Triggered when the button is clicked.
 */
const navigateToProfile = () => {
  router.push("/profile");
};
</script>
