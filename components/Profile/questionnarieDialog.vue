<!-- /**
 * Questionnarie Dialog Component
 *
 * Renders a dialog witha list of questions and their answers,
 *
 * @prop {boolean} modelValue - A boolean to control the visibility of the dialog.
 * @prop {Array<UserAnswer>} questionAnswers - An array of questions with their respective answers.
 * @emits update:modelValue - Emitted to update the visibility state of the dialog.
 */-->
<template>
  <div class="dialog">
    <v-dialog
      v-model="localDialog"
      max-width="1000px"
      persistent
      class="dialog__wrapper"
    >
      <v-card class="dialog__card">
        <v-card-title class="dialog__title">
          ΕΡΩΤΗΜΑΤΟΛΟΓΙΟ
          <v-spacer></v-spacer>
          <v-btn icon @click="emitClose">
            <v-icon>fa-solid fa-xmark</v-icon>
          </v-btn>
        </v-card-title>
        <QuestionarrieDisplayAnswers :questions="questionAnswers" />
        <v-card-actions class="dialog__actions">
          <v-btn
            class="dialog__button dialog__button--cancel"
            @click="emitClose"
          >
            Κλείσιμο
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { UserAnswer } from "@/types/questionAnswer";

// Define the props received by the component
const props = defineProps<{
  modelValue: boolean;
  questionAnswers: UserAnswer[];
}>();
const emit = defineEmits(["update:modelValue"]);

const localDialog = ref(props.modelValue);

// Watch for changes in modelValue prop and update localDialog state
watch(
  () => props.modelValue,
  (newValue) => {
    localDialog.value = newValue;
  },
);

// Emit close event to close the dialog
const emitClose = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.dialog {
  @apply p-4;
  &__wrapper {
    @apply m-3 rounded-lg;
  }
  &__title {
    @apply flex flex-row items-baseline font-bold;
    color: $primary-dark-blue-color;
  }
  &__card {
    @apply rounded-lg;
  }
  &__actions {
    @apply flex justify-end;
  }
  &__button {
    @apply py-2 px-4 rounded-md;
    &--cancel {
      @apply bg-gray-300 text-gray-800 hover:bg-gray-400;
    }
  }
}
</style>
