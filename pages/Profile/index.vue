

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
definePageMeta({
  middleware: "auth", // this should match the name of the file inside the middleware directory
});

const authStore = useAuthStore();
const user = authStore.user;
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<template>
  <div class="container mx-auto px-4 py-8 space-y-12">
    <!-- User Info Section -->
    <div
      data-aos="zoom-in"
      class="user-info bg-white p-8 rounded-lg shadow-2xl"
    >
      <h1 class="text-3xl font-extrabold mb-6">Προφιλ</h1>
      <p class="mt-2 text-xl font-medium mb-5">Όνομα: {{ user.givenName }}</p>
      <p class="text-xl font-medium mb-5">Επώνυμο: {{ user.sn }}</p>
      <p class="text-xl font-medium mb-5">Email: {{ user.mail }}</p>
      <!-- Add more user details as needed -->
    </div>

    <!-- Dikaiologitika Section -->
    <div data-aos="fade-up" class="dikaiologitika text-center">
      <button
        class="bg-primary-dark-blue-color text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Dikaiologitika
      </button>
    </div>

    <!-- Logout Button -->
    <div data-aos="fade-up" class="logout text-center">
      <button
        @click="logout"
        class="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300"
      >
        ΕΞΟΔΟΣ
      </button>
    </div>
  </div>
</template>
  
 
  
  <style lang='scss' scoped>
@import "@/assets/variables.scss";

.bg-primary-dark-blue-color {
  background-color: $primary-dark-blue-color;
}
</style>
  