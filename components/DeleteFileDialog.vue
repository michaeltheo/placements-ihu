<!--
/**
 * DeleteConfirmationDialog Component
 *
 * This component provides a confirmation dialog for deleting a file. It is built with Vuetify's v-dialog component
 * and includes actions for confirming or canceling the deletion. The dialog displays the file name and uses
 * a persistent overlay to prevent interaction with other elements until the dialog is dismissed.
 *
 * @param {boolean} modelValue - Controls the visibility of the dialog.
 * @param {Object|null} file - The file object to be deleted, including file details.
 * @param {string} file.file_name - The name of the file to be displayed in the confirmation message.
 *
 * Emits:
 * - update:modelValue (boolean): Emits when the dialog visibility should be updated.
 * - refreshFilesList: Emits when the file list should be refreshed after a successful deletion.
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
          Διαγραφή Δικαιολογητικού
        </v-card-title>

        <v-card-text class="dialog__content">
          <p>
            Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το δικαιολογητικό;
            <span class="dialog__file-name">{{ file?.file_name }}</span>
          </p>
        </v-card-text>

        <v-card-actions class="dialog__actions">
          <v-btn class="dialog__btn dialog__btn--delete" @click="deleteFile">
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
import { deleteDikaiologitika } from "@/services/dikaiologitkaService";
import type {
  DikaiologitikaFile,
  UpdateDeleteResponse,
} from "@/types/dikaiologitika";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    file?: DikaiologitikaFile | null;
  }>(),
  {
    file: null,
  },
);

const emit = defineEmits(["update:modelValue", "refreshFilesList"]);
const localDialog = ref(props.modelValue);

watchEffect(() => {
  localDialog.value = props.modelValue;
});

const deleteFile = async () => {
  if (!props.file) {
    toast.error("Δεν βρέθηκε αρχείο.");
    return;
  }
  try {
    const response: UpdateDeleteResponse = await deleteDikaiologitika(
      props.file.id,
    );
    if (response.error) {
      toast.error(`${response.error}`);
    } else {
      toast.success(`${response?.detail}`);
      emit("refreshFilesList");
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
