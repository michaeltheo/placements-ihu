<template>
  <div class="file-dialog">
    <v-dialog
      v-model="localDialog"
      max-width="800px"
      persistent
      class="file-dialog__container"
    >
      <v-card class="file-dialog__card">
        <v-card-title class="file-dialog__title">
          {{
            isEditMode
              ? `Επεξεργασία Δικαιολογιτικού: ${editItem?.description}`
              : "Ανέβασμα Δικαιολογιτικού"
          }}
        </v-card-title>

        <div v-if="isEditMode" class="file-dialog__info">
          <v-card-text class="file-dialog__filename">
            Όνομα Αρχείου: <span>{{ editItem?.file_name }}</span>
          </v-card-text>
          <v-card-text class="file-dialog__edit-date">
            Τελευταία ημερομηνία επεξεργασίας: <span>{{ editItem?.date }}</span>
          </v-card-text>
        </div>

        <v-form
          ref="form"
          class="file-dialog__form"
          @submit.prevent="submitForm"
        >
          <div class="file-dialog__selections">
            <v-select
              v-model="selectedFileType"
              :items="fileTypes"
              item-title="description"
              item-value="type"
              :rules="selectRules"
              label="Επέλεξε τύπο αρχείου"
              outlined
              dense
              class="file-dialog__select"
              :disabled="isEditMode"
            ></v-select>

            <v-file-input
              prepend-icon="fa:fas fa-file-pdf"
              show-size
              counter
              accept=".pdf"
              :rules="fileRules"
              label="Επέλεξε αρχείο PDF"
              outlined
              dense
              class="file-dialog__file-input"
              @change="fileSelected"
            ></v-file-input>
          </div>

          <v-card-actions class="file-dialog__actions">
            <v-btn
              type="submit"
              class="file-dialog__btn file-dialog__btn--submit"
            >
              {{ isEditMode ? "Ενημέρωση" : "Ανέβασμα" }}
            </v-btn>
            <v-btn
              class="file-dialog__btn file-dialog__btn--cancel"
              @click="emitClose"
            >
              Άκυρο
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from "vue-toast-notification";
import { withDefaults, watch, ref, defineProps, defineEmits } from "vue";
import {
  updateDikaiologitika,
  uploadDikaiologitika,
} from "@/services/dikaiologitkaService";
import { useDikaiologitkaStore } from "@/stores/dikaiologitika";
import type { DikaiologitikaFile } from "@/types/dikaiologitika";
import "vue-toast-notification/dist/theme-sugar.css";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    editItem?: DikaiologitikaFile | null;
  }>(),
  {
    editItem: null,
  }
);

const dikaiologitikaStore = useDikaiologitkaStore();
// Determine the dialog mode based on the editItem
const isEditMode = computed(() => props.editItem !== null);
const form = ref<any>(null); // Reference to the form element
const emit = defineEmits(["update:modelValue", "refreshFilesList"]); // Emit events for dialog control and refreshing files list
const localDialog = ref(props.modelValue); // Local state for dialog visibility
const fileTypes = computed(() => dikaiologitikaStore.dikaiologitikaTypes);

const $toast = useToast();
const selectedFileType = ref<string | null>(props.editItem?.type ?? null);
const fileInput = ref<File | null>(null);

// Reactive watchEffect to update selectedFileType when props.editItem changes
watchEffect(() => {
  selectedFileType.value = props.editItem?.type ?? null;
});

// Validation rules for form inputs
const selectRules = [
  (value: string) => !!value || "Πρέπει να επιλέξεις ένα τύπο αρχείου.",
];
const fileRules = [
  (value: any) => !!value || "Πρέπει να επιλέξεις ένα αρχείο.",
];

// Watcher to synchronize the dialog visibility state
watch(
  () => props.modelValue,
  (newValue) => {
    localDialog.value = newValue;
  }
);

// Function to handle file selection
const fileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input && input.files && input.files.length > 0) {
    fileInput.value = input.files[0];
  }
};

// Function to handle form submission
const submitForm = async () => {
  if (!form.value?.validate() || !fileInput.value || !selectedFileType.value) {
    $toast.error(
      "Form submission failed due to validation errors or missing data.",
      {
        position: "bottom",
      }
    );
    return;
  }

  try {
    let response: any;
    if (isEditMode.value && props.editItem) {
      response = await updateDikaiologitika(fileInput.value, props.editItem.id);
    } else {
      response = await uploadDikaiologitika(
        fileInput.value,
        selectedFileType.value
      );
    }

    if (response.error) {
      $toast.error(`${response.error}`, { position: "bottom" });
    } else {
      $toast.success(`${response.detail || response.message?.detail}`, {
        position: "bottom",
      });
      emit("refreshFilesList");
      emitClose();
    }
  } catch (error) {
    $toast.error("An unexpected error occurred.", { position: "bottom" });
    errorLog(error);
  }
};

// Function to emit event to close the dialog and reset form state
const emitClose = () => {
  fileInput.value = null;
  selectedFileType.value = null;
  emit("update:modelValue", false);
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.file-dialog {
  &__container {
    @apply rounded-lg;
  }

  &__title {
    @apply text-lg font-bold text-blue-900;
  }

  &__info,
  &__selections {
    @apply text-blue-900 space-y-4 p-2;
  }

  &__filename,
  &__edit-date {
    @apply font-bold;
  }

  &__form {
    @apply space-y-4;
  }

  &__select,
  &__file-input {
    @apply bg-white text-blue-900 p-2;
  }

  &__actions {
    @apply justify-start space-x-2;
  }

  &__btn {
    @apply hover:text-white py-2 px-4 rounded-md;

    &--submit {
      @apply bg-blue-500 hover:bg-blue-700;
    }

    &--cancel {
      @apply hover:bg-red-600;
    }
  }
}
</style>
