<template>
  <div class="statisticsPage">
    <section class="statisticsPage__section">
      <h2 class="statisticsPage__title">Σελιδα Στατιστικών</h2>
      <p class="statisticsPage__hint">
        Επελέξτε παρακάτω για ποία ερώτηση θα θέλετε να δείτε στατστικά. Τα
        σττιστικά εμφανίζονται με μορφή γραφήματος pie και υπάρχει η δυνατότητα
        αποθήκευσεις του διαγράμαμτος.
      </p>
      <div class="statisticsPage__select">
        <v-select
          label="Επέλεξε ερώτηση"
          :items="questionNames"
          v-model="selectedQuestion"
          @update:model-value="updateChart"
          outlined
          clearable
          dense
          class="statisticsPage__select-input"
        ></v-select>
      </div>
    </section>

    <div v-if="selectedQuestion">
      <section class="statisticsPage__chartSection">
        <div class="statisticsPage__chartSection-chart">
          <StatisticsPieChart
            :key="selectedQuestion"
            :titleText="selectedQuestion"
            :subtitleText="'This is a test'"
            :seriesData="selectedQuestionData"
          />
        </div>
        <div class="statisticsPage__dataTable">
          <v-table>
            <thead>
              <tr>
                <th class="statisticsPage__table-header">Απαντήσεις</th>
                <th class="statisticsPage__table-header">Αριθμός Απαντήσεων</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="option in transformedSelectedQuestionData"
                :key="option.text"
              >
                <td class="statisticsPage__table-cell">{{ option.text }}</td>
                <td class="statisticsPage__table-cell">{{ option.count }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-btn @click="exportCSV" class="statisticsPage__export-btn"
            >Export CSV</v-btn
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import {
  getQuestionStatistics,
  parseQuestionStatistics,
} from "@/services/adminService";

definePageMeta({
  middleware: "admin",
});

const authStore = useAuthStore();
console.log("🚀 ~ !authStore.user:", !authStore.user);

const questionNames = ref<string[]>([]);
const selectedQuestion = ref<string>("");
const selectedQuestionData = ref<[string, number][]>([]);
let parsedData: Array<any> = [];

// Fetch question statistics data on component mount
onMounted(async () => {
  const response = await getQuestionStatistics(
    authStore?.placements_access_token
  );
  // const response = dummyStatistcs;
  if (response) {
    parsedData = parseQuestionStatistics(response);
    questionNames.value = parsedData.map((item) => item.questionName);
  }
});

// Function to update the chart data based on the selected question from the dropdown
const updateChart = () => {
  const selectedQuestionDataIndex = questionNames.value.findIndex(
    (question) => question === selectedQuestion.value
  );
  // Ensure the selected question is valid and update the chart data accordingly
  if (selectedQuestionDataIndex !== -1) {
    selectedQuestionData.value = parsedData[
      selectedQuestionDataIndex
    ].answersData.map((item: { text: string; count: number }) => {
      // Transforming data to a usable format
      return [item.text, item.count];
    });
  }
};

// Computed property to transform selected question data for rendering or exporting
const transformedSelectedQuestionData = computed(() =>
  selectedQuestionData.value.map(([text, count]) => ({ text, count }))
);

// Function to export the displayed data as a CSV file
const exportCSV = () => {
  const header = "Answer Option, Count";
  // Creating CSV lines
  const csv = transformedSelectedQuestionData.value
    .map((option) => `${option.text}, ${option.count}`)
    .join("\n");
  // Adding BOM at the beginning because we are using greek characters
  const csvContent = `\uFEFF${header}\n${csv}`;
  const blob: Blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "question_statistics.csv");
  document.body.appendChild(link);
  link.click();
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.statisticsPage {
  @apply container mx-auto px-4 py-8 space-y-8;

  &__section {
    @apply shadow-lg border border-gray-200 rounded-lg p-6 bg-white;
  }

  &__title {
    @apply text-4xl md:text-5xl font-extrabold mb-4 leading-tight;
    color: $primary-dark-blue-color;
  }

  &__hint {
    @apply text-base font-medium mb-4;
  }

  &__select {
    @apply flex justify-center mb-6;
  }

  &__chartSection {
    @apply mt-8 shadow-lg border border-gray-200 rounded-lg bg-white;
  }

  &__chartSection__chart {
    @apply w-full h-80 md:h-96;
  }

  &__dataTable {
    @apply overflow-x-auto p-4 relative;
  }

  :deep .v-table {
    @apply w-full;
  }

  :deep .v-table thead tr th {
    @apply text-base font-semibold;
    color: $primary-dark-blue-color;
  }

  :deep .v-table tbody tr td {
    @apply text-base;
    color: $primary-dark-blue-color;
  }

  :deep .v-btn {
    @apply ml-2 py-2 px-4 rounded-md  text-black font-semibold shadow-md transition duration-300 ease-in-out;
  }

  :deep .v-btn:hover {
    color: $primary-blue-color;
  }
}
</style>
