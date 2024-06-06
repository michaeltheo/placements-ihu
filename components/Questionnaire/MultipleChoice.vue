<!-- /**
 * MultipleChoice Component
 *
 * Renders a multiple-choice selection field for questions requiring one or multiple selections.
 *
 * @param {Object} question - The question object containing question details.
 * @param {boolean} disabled - Make the select input read-obly when needed.
 * @param {number} question.id - Unique identifier of the question.
 * @param {string} question.question_text - The question text to be displayed.
 * @param {boolean} question.supports_multiple_answers - Indicates if multiple answers are allowed.
 * @param {Array<Object>} options - An array of options available for selection.
 * @param {number | number[] | null} modelValue - The current value of the selected option(s).
 */ -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ question.question_text }}</v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedValue"
              :items="options"
              item-title="option_text"
              item-value="id"
              :multiple="question.supports_multiple_answers"
              clearable
              variant="solo-filled"
              label="Επιλέξτε μια επιλογή"
              :rules="[(v: any) => !!v || 'Επιλέξτε τουλάχιστον μία επιλογή']"
              class="multipleChoice--select"
              :disabled="disabled"
              @update:modelValue="emitSelectedValue"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { Question, Option } from "@/types/questionAnswer";

// Component props
const props = defineProps<{
  disabled?: boolean;
  question: Question;
  options: Option[];
  modelValue: number | number[] | null;
}>();

// Emits event
const emits = defineEmits(["update:modelValue"]);

// Local state
const selectedValue = ref<number | number[] | null>(props.modelValue);

// Emit selected value
const emitSelectedValue = () => {
  emits("update:modelValue", selectedValue.value);
};

// Watch for changes to the modelValue prop and update the local state
watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue;
  },
);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.multipleChoice--select {
  color: $primary-dark-blue-color;
  font-weight: bold;
}
.v-card-title {
  color: $primary-dark-blue-color;
  font-weight: bold;
  white-space: wrap;
}
</style>
