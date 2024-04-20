<template>
  <div>
    <div>
      <button @click="fetchData()">Fetch Data</button>
      <div v-if="!pending">show load icon</div>
      <div>{{ data }}</div>
      <div>{{ error }}</div>
    </div>
    <div class="text-center pa-4">
      <!-- This button now controls the dialog -->
      <v-btn @click="dialog = true">Open Location Dialog</v-btn>
    </div>
    <TestDialog :model-value="dialog" @update:mode-value="dialog = $event" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "@vueuse/core"; // Assuming you're using @vueuse/core for fetching data
import TestDialog from "@/components/TestDialog.vue"; // Adjust the path as needed

// Fetching data
const { data, error, pending, refresh } = await useFetch(
  "http://localhost:8000/user"
);
const fetchData = () => {
  refresh(); // This will re-fetch the data
};
const dialog = ref(false);
</script>
