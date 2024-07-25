<!--
/**
 * ConfirmationDialog Component
 *
 * This component renders a confirmation dialog that asks the user if they are sure about submitting their questionnaire.
 * The dialog contains two buttons: one for confirming the submission and another for canceling the action.
 *
 * @param {boolean} modelValue - Controls the visibility of the dialog.
 *
 * Emits:
 * - update:modelValue (boolean): Emits an event to update the visibility of the dialog.
 * - confirmed (boolean): Emits an event indicating whether the user confirmed the action.
 */
-->
<template>
  <div class="dialog__overlay">
    <v-dialog
      v-model="localDialog"
      max-width="550px"
      persistent
      class="dialog__container"
    >
      <v-card class="dialog__card">
        <v-card-title class="dialog__title">
          <v-icon class="dialog__icon" color="white">fa-solid fa-check</v-icon>
          Υποβολή Ερωτηματολογίου
        </v-card-title>

        <v-card-text class="dialog__content">
          <p>Είστε σίγουροι ότι θέλετε να υποβάλετε το ερωτηματολόγιο ;</p>
        </v-card-text>

        <v-card-actions class="dialog__actions">
          <v-btn
            class="dialog__btn dialog__btn--confirmation"
            @click="confirm(true)"
          >
            Υποβολή
          </v-btn>
          <v-btn
            class="dialog__btn dialog__btn--cancel"
            @click="confirm(false)"
          >
            Ακύρωση
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue", "confirmed"]);
const localDialog = ref(props.modelValue);

/**
 * Watch for changes in the modelValue prop and update the local dialog visibility accordingly.
 */
watchEffect(() => {
  localDialog.value = props.modelValue;
});

/**
 * Emit events to either confirm or cancel the action and close the dialog.
 *
 * @param {boolean} value - The user's confirmation decision.
 */
const confirm = (value: boolean) => {
  emit("update:modelValue", false);
  emit("confirmed", value);
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.dialog__overlay {
  @apply flex justify-center items-center p-4;
}

.dialog__container {
  @apply rounded-lg;
}

.dialog__title {
  @apply text-white text-lg font-bold p-4 rounded-t-lg;
  background-color: $primary-blue-color;
}

.dialog__content {
  @apply px-4 py-6  text-base;
  color: $primary-dark-blue-color;
}

.dialog__actions {
  @apply flex justify-center gap-4 pb-4;
}

.dialog__btn {
  @apply py-2 px-4 rounded-md;

  &--confirmation {
    color: $primary-blue-color;
  }

  &--cancel {
    color: black;
  }
}
:deep .v-card {
  border-radius: 0.5rem !important;
}
</style>
