<template>
  <div>
    <div>
      <button @click="fetchData()">Fetch Data</button>
      <div v-if="!pending">show load icon</div>
      <div>{{ data }}</div>
      <div>{{ error }}</div>
    </div>
    <div class="text-center pa-4">
      <v-btn @click="dialog = true"> Open Dialog </v-btn>
      <UpdateDialog v-model="dialog" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "@vueuse/core"; // Assuming you're using @vueuse/core for fetching data

// Fetching data
const { data, error, pending, refresh } = await useFetch(
  "http://localhost:8000/user"
);
const fetchData = () => {
  refresh(); // This will re-fetch the data
};
const dialog = ref(false);
</script>
