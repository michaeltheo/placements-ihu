<!-- /**
 * FreeText Component
 *
 * Renders a free-text input field  for answering questions that require textual responses.
 *
 * @param {Object} question - The question object containing question details.
 * @param {number} question.id - Unique identifier of the question.
 * @param {string} question.question_text - The question text to be displayed.
 * @param {string | null} modelValue - The current value of the textarea.
 */ -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ question.question_text }}</v-card-title>
          <v-card-text>
            <v-textarea
              v-model="inputValue"
              class="freeText--field"
              clearable
              label="Γράψτε την απάντησή σας"
              :rules="[(v: any) => !!v || 'Απαιτείται απάντηση']"
              validate-on="input"
              @update:modelValue="emitInputValue"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { Question } from "@/types/question";

// Component props
const props = defineProps<{
  question: Question;
  modelValue: string | null;
}>();

// Emits event
const emits = defineEmits(["update:modelValue"]);

// Local state
const inputValue = ref<string | null>(props.modelValue);

// Emit input value
const emitInputValue = () => {
  emits("update:modelValue", inputValue.value);
};

// Watch for changes to the modelValue prop and update the local state
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  },
);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.freeText--field {
  color: $primary-dark-blue-color;
  font-weight: bold;
}
.v-card-title {
  color: $primary-dark-blue-color;
  font-weight: bold;
  white-space: wrap;
}
</style>
