<template>
  <div class="flex justify-center items-center p-4">
    <v-dialog
      v-model="localDialog"
      max-width="800px"
      persistent
      class="rounded-lg"
    >
      <v-card class="bg-blue-50">
        <v-card-title class="text-lg font-bold text-blue-900">
          {{
            isEditMode
              ? `Επεξεργασία Δικαιολογιτικού: ${editItem?.description}`
              : "Ανέβασμα Δικαιολογιτικού"
          }}
        </v-card-title>

        <v-card-text v-if="isEditMode" class="text-blue-900">
          Όνομα Αρχείου:
          <span class="font-bold">{{ editItem?.file_name }}</span>
        </v-card-text>
        <v-card-text v-if="isEditMode" class="text-blue-900">
          Τελευταία ημερομηνία επεξεργασίας:
          <span class="font-bold">{{ editItem?.date }}</span>
        </v-card-text>

        <v-form ref="form" @submit.prevent="submitForm" class="space-y-4">
          <v-card-text class="space-y-4">
            <v-select
              v-model="selectedFileType"
              :items="fileTypes"
              item-title="description"
              item-value="type"
              :rules="selectRules"
              label="Επέλεξε τύπο αρχείου"
              outlined
              dense
              class="bg-white text-blue-900"
              :disabled="isEditMode"
            ></v-select>

            <v-file-input
              prepend-icon="fa:fas fa-file-pdf"
              show-size
              accept=".pdf"
              :rules="fileRules"
              label="Επέλεξε αρχείο PDF"
              outlined
              dense
              class="bg-white text-blue-900"
              @change="fileSelected"
            ></v-file-input>
          </v-card-text>

          <v-card-actions class="justify-start space-x-2">
            <v-btn type="submit" class="hover:bg-blue-700 hover:text-white">
              {{ isEditMode ? "Ενημέρωση" : "Ανέβασμα" }}
            </v-btn>
            <v-btn @click="emitClose" class="hover:bg-red-600 hover:text-white">
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
import type {
  UploadResponse,
  DikaiologitikaFile,
  UpdateDeleteResposne,
} from "@/types/dikaiologitika";
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
// In FileUploadDialog component
const fileTypes = computed(() => dikaiologitikaStore.dikaiologitikaTypes);
console.log("🚀 ~ fileTypes:", fileTypes);
console.log("🚀 ~ fileTypes:", dikaiologitikaStore);

const $toast = useToast();
const selectedFileType = ref<string | null | undefined>(
  props.editItem?.type || null
);
const fileInput = ref<File | null>(null); // Reference to the selected file

// Reactive watchEffect to update selectedFileType when props.editItem changes
watchEffect(() => {
  if (isEditMode.value) {
    selectedFileType.value = props.editItem?.type;
  }
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
  console.log(
    "🚀 ~ submitForm ~ selectedFileType.value:",
    selectedFileType.value
  );
  if (form.value?.validate() && fileInput.value && selectedFileType.value) {
    if (isEditMode.value && props.editItem) {
      const response: UpdateDeleteResposne = await updateDikaiologitika(
        fileInput.value,
        props.editItem?.id
      );
      if (response.error) {
        $toast.error(`${response.error}`, {
          position: "bottom",
        });
      } else {
        $toast.success(`${response?.detail}`, {
          position: "bottom",
        });
        emit("refreshFilesList"); // Request to refresh the files list
        emitClose(); // Close dialog after a delay
      }
    } else {
      const response: UploadResponse = await uploadDikaiologitika(
        fileInput.value,
        selectedFileType.value
      );
      console.log("🚀 ~ submitForm ~ response:", response);
      if (response.error) {
        $toast.error(`${response.error}`, {
          position: "bottom",
        });
      } else {
        $toast.success(`${response?.message?.detail} `, {
          position: "bottom",
        });
        emit("refreshFilesList"); // Request to refresh the files list
        emitClose(); // Close dialog after a delay
      }
    }
  } else {
    $toast.error(
      "Form submission failed due to validation errors or missing data.",
      {
        position: "bottom",
      }
    );
  }
};

// Function to emit event to close the dialog and reset form state
const emitClose = () => {
  fileInput.value = null;
  selectedFileType.value = null;
  emit("update:modelValue", false);
};
</script>
