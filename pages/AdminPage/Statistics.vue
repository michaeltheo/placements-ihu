<template>
  <div class="statisticsPage">
    <section class="statisticsPage__section">
      <h2 class="statisticsPage__title">Σελιδα Στατιστικών</h2>
      <p class="statisticsPage__hint">
        Επελέξτε παρακάτω για ποία ερώτηση θα θέλετε να δείτε στατιστικά. Τα
        στατιστικά εμφανίζονται με μορφή γραφήματος "PIE" και υπάρχει η
        δυνατότητα αποθήκευσης του διαγράμματος καθώς και η εξαγωγή των
        αποτελεσμάτων σε αρχείο CSV.
      </p>

      <!-- New select for choosing questionnaire type -->
      <div class="statisticsPage__select">
        <v-select
          v-model="selectedQuestionnaireType"
          label="Επέλεξε τύπο ερωτηματολογίου"
          :items="questionnaireTypes"
          item-title="text"
          item-value="value"
          class="statisticsPage__select--input"
          outlined
          clearable
          dense
          @update:model-value="fetchQuestionStatistics"
        ></v-select>
      </div>

      <!-- Existing select for choosing a question -->
      <div v-if="selectedQuestionnaireType" class="statisticsPage__select">
        <v-select
          v-model="selectedQuestion"
          label="Επέλεξε ερώτηση"
          class="statisticsPage__select--input"
          :items="questionNames"
          outlined
          clearable
          dense
          @update:model-value="updateChart"
        ></v-select>
      </div>
    </section>

    <div v-if="selectedQuestion">
      <section class="statisticsPage__chartSection">
        <div class="statisticsPage__chartSection--chart">
          <StatisticsPieChart
            :key="selectedQuestion"
            :titleText="selectedQuestion"
            :subtitleText="'Pie Diagram'"
            :seriesData="selectedQuestionData"
          />
        </div>
        <div class="statisticsPage__dataTable">
          <v-table>
            <thead>
              <tr>
                <th class="statisticsPage__dataTable--header">Απαντήσεις</th>
                <th class="statisticsPage__dataTable--header">
                  Αριθμός Απαντήσεων
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="option in transformedSelectedQuestionData"
                :key="option.text"
              >
                <td class="statisticsPage__dataTable--cell">
                  {{ option.text }}
                </td>
                <td class="statisticsPage__dataTable--cell">
                  {{ option.count }}
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-btn class="statisticsPage__export-btn" @click="exportCSV"
            >Export CSV</v-btn
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import { QuestionnaireType } from "@/types";
import {
  getQuestionStatistics,
  parseQuestionStatistics,
} from "@/services/adminService";
import { hasErrorResponse } from "@/services/errorHandling";

definePageMeta({
  middleware: ["is-admin", "auth"],
});
useHead({
  title: "Στατιστικά",
});

// Define questionnaire types with display text and actual values
const questionnaireTypes = [
  { text: "Εταιρείες", value: QuestionnaireType.COMPANY },
  { text: "Φοιτητές", value: QuestionnaireType.STUDENT },
];

// Ref variables to store selected questionnaire type, question, and their respective data
const selectedQuestionnaireType = ref<QuestionnaireType>();
const questionNames = ref<string[]>([]);
const selectedQuestion = ref<string>("");
const selectedQuestionData = ref<[string, number][]>([]);
let parsedData: Array<any> = [];

// Fetch question statistics data when the selected questionnaire type changes
const fetchQuestionStatistics = async () => {
  if (selectedQuestionnaireType.value) {
    const response = await getQuestionStatistics(
      selectedQuestionnaireType.value
    );
    if (hasErrorResponse(response)) {
      toast.error(`${response.error}`);
    } else {
      parsedData = parseQuestionStatistics(response);
      questionNames.value = parsedData.map((item) => item.questionName);
      selectedQuestion.value = "";
      selectedQuestionData.value = [];
    }
  }
};

// Watch for changes in selectedQuestionnaireType to fetch new statistics
watch(selectedQuestionnaireType, fetchQuestionStatistics);

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

    &--input {
      @apply bg-white text-blue-900 p-2;
    }
  }

  &__chartSection {
    @apply mt-8 shadow-lg border border-gray-200 rounded-lg bg-white;

    &--chart {
      @apply w-full h-80 md:h-96;
    }
  }

  &__dataTable {
    @apply w-full overflow-x-auto p-4 relative;

    &--header,
    &--cell {
      @apply text-base font-semibold text-center #{!important};
      color: $primary-dark-blue-color;
    }

    &--cell {
      @apply font-thin #{!important};
    }
  }

  &__export-btn {
    @apply ml-2 py-2 px-4 rounded-md text-black font-semibold shadow-md transition duration-300 ease-in-out #{!important};
    :hover {
      color: $primary-blue-color;
    }
  }
}
</style>
