<!-- Profile page -->
<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
definePageMeta({
  middleware: ["auth"],
});

const authStore = useAuthStore();
// const user = austhStore.user;
// console.log("🚀 ~ file: index.vue:12 ~ user:", user);
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<template>
  <!-- Logout Button -->
  <div data-aos="fade-up" class="logout text-center">
    <button
      class="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300"
      @click="logout"
    >
      ΕΞΟΔΟΣ
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.bg-primary-dark-blue-color {
  background-color: $primary-dark-blue-color;
}
</style>
