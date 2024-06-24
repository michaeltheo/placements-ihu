<template>
  <div>
    <!-- Force NavBar to re-render on authentication state change -->
    <NavBar :key="authStateVersion" />
    <div class="min-h-[calc(100vh)]">
      <slot />
    </div>
    <AppFooter class="mt-5" />
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
// Use a computed property to react to changes in authentication status
const authStateVersion = computed(() => (authStore.isAuthenticated ? 1 : 0));
</script>
