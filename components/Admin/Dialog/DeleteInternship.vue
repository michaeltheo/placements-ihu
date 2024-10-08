<!--
/**
 * AdminDialogDeleteInternship Component
 *
 * This component displays a confirmation dialog for deleting an internship. It is designed to confirm
 * the user's intent before performing a potentially destructive action. It features a modal overlay
 * with options to either proceed with the deletion or cancel the operation.
 *
 * @param {boolean} modelValue - Controls the visibility of the dialog.
 * @param {InternshipRead | undefined}internship - The internship object to be deleted; contains at least an ID and user details.
 *
 * Emits:
 * - update:modelValue (boolean): Emits an event to update the visibility of the dialog.
 * - refreshInternshipList (): Emits an event to refresh the list of internships after a successful deletion.
 */
-->
<template>
  <div class="dialog__overlay">
    <v-dialog
      v-model="localDialog"
      max-width="500px"
      persistent
      class="dialog__container"
    >
      <v-card class="dialog__card">
        <v-card-title class="dialog__title">
          <v-icon class="dialog__icon" color="white">fa-solid fa-trash</v-icon>
          Διαγραφή Πρακτικής
        </v-card-title>

        <v-card-text class="dialog__content">
          <p>
            Είστε σίγουροι ότι θέλετε να διαγράψετε αυτη την πρακτική του
            χρήστη;
            <span class="dialog__file-name"
              >{{ internship?.user_first_name }}
              {{ internship?.user_last_name }} {{ internship?.user_am }}</span
            >
          </p>
        </v-card-text>

        <v-card-actions class="dialog__actions">
          <v-btn
            class="dialog__btn dialog__btn--delete"
            @click="deleteSelectedInternship"
          >
            Διαγραφή
          </v-btn>
          <v-btn class="dialog__btn dialog__btn--cancel" @click="emitClose">
            Άκυρο
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import { deleteInternship } from "@/services/internshipService";
import { InternshipRead } from "@/types/internship";
import { hasErrorResponse } from "@/services/errorHandling";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    internship?: InternshipRead | undefined;
  }>(),
  {
    internship: undefined,
  },
);

const emit = defineEmits(["update:modelValue", "refreshInternshipList"]);
const localDialog = ref(props.modelValue);

watchEffect(() => {
  localDialog.value = props.modelValue;
});

const deleteSelectedInternship = async () => {
  try {
    if (!props.internship) return;
    const response = await deleteInternship(props.internship?.id);
    if (hasErrorResponse(response)) {
      toast.error(`${response.error}`);
    } else {
      toast.success(`${response?.detail}`);
      emit("refreshInternshipList");
      emitClose();
    }
  } catch (error) {
    toast.error(`${error}`);
  }
};

const emitClose = () => {
  emit("update:modelValue", false);
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
  @apply bg-red-600 text-white text-lg font-bold p-4 rounded-t-lg;
}

.dialog__content {
  @apply px-4 py-6 text-red-900 text-base;
}

.dialog__file-name {
  @apply font-semibold;
}

.dialog__actions {
  @apply flex justify-center gap-4 pb-4;
}

.dialog__btn {
  @apply hover:text-white py-2 px-4 rounded-md;

  &--delete {
    @apply bg-red-500 hover:bg-red-600;
  }

  &--cancel {
    @apply hover:bg-gray-500;
  }
}
:deep .v-card {
  border-radius: 0.5rem !important;
}
</style>
