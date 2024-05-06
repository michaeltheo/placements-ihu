<!-- /**
 * Highchart Component
 *
 * Renders a pie chart using Highcharts.
 *
 * @param {string} titleText - The title of the chart.
 * @param {string} subtitleText - The subtitle of the chart.
 * @param {Array<[string, number]>} seriesData - An array of data for the chart series.
 */ -->

<template>
  <div>
    <highchart
      type="chart"
      :options="computedChartOptions"
      :modules="['exporting']"
    />
  </div>
</template>

<script lang="ts" setup>
// Props
interface ChartProps {
  titleText: string;
  subtitleText: string;
  seriesData: Array<[string, number]>;
}

const props = defineProps<ChartProps>();
// Computed chart options to react to prop changes
const computedChartOptions = computed<any>(() => ({
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
    style: {
      color: "#112d4e",
    },
  },
  subtitle: {
    text: props.subtitleText,
    align: "left",
  },
  plotOptions: {
    series: {
      allowPointSelect: false,
      cursor: "pointer",
      dataLabels: [
        {
          enabled: true,
          distance: 20,
        },
        {
          enabled: true,
          distance: -40,
          format: "{point.percentage:.1f}%",
          style: {
            fontSize: "1.2em",
            textOutline: "none",
            opacity: 0.3,
          },
          filter: {
            operator: ">",
            property: "percentage",
            value: 10,
          },
        },
      ],
    },
    pie: {
      innerSize: 100,
      depth: 45,
      dataLabels: {
        enabled: true,
        format: "{point.name}: {point.percentage:.1f} %",
        color: "#112d4e",
      },
    },
  },
  series: [
    {
      name: "Αριθμός Απαντήσεων: ",
      colorByPoint: true,
      data: props.seriesData,
    },
  ],
}));
</script>
