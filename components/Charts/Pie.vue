<template>
  <div>
    <highchart
      type="chart"
      :options="computedChartOptions"
      :modules="['exporting']"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ref } from "vue";

// Props
const props = defineProps({
  titleText: String,
  subtitleText: String,
  seriesData: Array,
});

// Computed chart options to react to prop changes
const computedChartOptions = computed(() => ({
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: props.titleText,
    align: "left",
  },
  subtitle: {
    text: props.subtitleText,
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
      data: props.seriesData,
    },
  ],
}));
</script>
