<!-- /**
 * MultipleChoiceFreeText Component
 *
 * Renders a selection field  for questions requiring multiple-choice selections with an additional free-text field for "Άλλο".
 *
 * @param {Object} question - The question object containing question details.
 * @param {number} question.id - Unique identifier of the question.
 * @param {string} question.question_text - The question text to be displayed.
 * @param {boolean} question.supports_multiple_answers - Indicates if multiple answers are allowed.
 * @param {Array<Object>} options - An array of options available for selection.
 * @param {number} otherOptionId - ID of the "Άλλο" option.
 * @param {Object} modelValue - Contains the current selected options and text.
 * @param {number[] | number | null} modelValue.options - The current selected option(s).
 * @param {string} modelValue.text - The current value of the free-text field.
 */ -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ question.question_text }}</v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedOptions"
              class="multipleChoiceFreeText--select"
              :items="options"
              item-title="option_text"
              item-value="id"
              :multiple="question.supports_multiple_answers"
              clearable
              label="Επιλέξτε μια επιλογή"
              :rules="[
                (v: string | any[]) =>
                  !!v.length || 'Επιλέξτε τουλάχιστον μία επιλογή',
              ]"
              @update:modelValue="emitSelectedOptions"
            />
            <v-textarea
              v-if="otherSelected"
              v-model="inputValue"
              clearable
              validate-on="input"
              class="multipleChoiceFreeText--textArea"
              label="Γράψτε την απάντησή σας"
              :rules="[(v: any) => !!v || 'Απαιτείται απάντηση']"
              @update:modelValue="emitSelectedOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { Question, Option } from "@/types/question";

// Component props
const props = defineProps<{
  question: Question;
  options: Option[];
  otherOptionId: number;
  modelValue: {
    options: number[] | number | null;
    text: string;
  };
}>();

// Emits event
const emits = defineEmits(["update:modelValue"]);

// Local state
const selectedOptions = ref<number[]>(
  Array.isArray(props.modelValue.options)
    ? props.modelValue.options
    : props.modelValue.options !== null
    ? [props.modelValue.options]
    : [],
);
const inputValue = ref<string>(props.modelValue.text || "");

// Determine if the "Άλλο" option is selected
const otherSelected = ref(selectedOptions.value.includes(props.otherOptionId));

// Emit selected options and text
const emitSelectedOptions = () => {
  emits("update:modelValue", {
    options: selectedOptions.value,
    text: otherSelected.value ? inputValue.value : "",
  });
};

// Watch for changes to the modelValue prop and update the local state
watch(
  () => props.modelValue,
  (newValue) => {
    selectedOptions.value = Array.isArray(newValue.options)
      ? newValue.options
      : newValue.options !== null
      ? [newValue.options]
      : [];
    inputValue.value = newValue.text || "";
  },
);

// Watch for changes to selected options and emit the changes
watch(selectedOptions, (newOptions) => {
  otherSelected.value = newOptions.includes(props.otherOptionId);
  emitSelectedOptions();
});

// Watch for changes to the input value and emit the changes
watch(inputValue, emitSelectedOptions);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.multipleChoiceFreeText {
  &--select,
  &--textArea {
    color: $primary-dark-blue-color;
    font-weight: bold;
  }
}
.v-card-title {
  color: $primary-dark-blue-color;
  font-weight: bold;
  white-space: wrap;
}
</style>
