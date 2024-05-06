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
    <highchart
      type="chart"
      :options="chartOptions"
      :modules="['sankey', 'dependency-wheel']"
    />
    <ChartsPie
      title-text="Tokyo 2022 sucking ing  medals by country"
      subtitle-text="3D donut in Highcharts"
      :series-data="[
        ['USA', 39],
        ['China', 38],
        ['Japan', 27],
        ['Great Britain', 22],
        ['ROC', 20],
      ]"
    />
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

const chartOptions = ref({
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: "Beijing 2022 gold medals by country",
    align: "left",
  },
  subtitle: {
    text: "3D donut in Highcharts",
    align: "left",
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45,
    },
  },
  series: [
    {
      name: "Medals",
      data: [
        ["Norway", 16],
        ["Germany", 12],
        ["USA", 8],
        ["Sweden", 8],
        ["Netherlands", 8],
        ["ROC", 6],
        ["Austria", 7],
        ["Canada", 4],
        ["Japan", 3],
      ],
    },
  ],
});
</script>
