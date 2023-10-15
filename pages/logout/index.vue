<template>
  <font-awesome-icon :icon="['fas', 'spinner']" spin />
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  console.log("mpika logout");
  authStore.logout(); // Assuming you have a logout method in your store
  console.log(authStore);
  router.push("/"); // Redirect to home page or any other page after logout
});
</script>
