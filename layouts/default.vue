<template>
  <div>
    <NavBar :key="authStateVersion" />
    <div class="min-h-[calc(100vh)]">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const authStateVersion = computed(() => authStore.isLoggedIn());
</script>

<style lang="scss" scoped></style>
