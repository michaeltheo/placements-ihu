<!--
/**
 * FileDialog Component
 *
 * Dialog component for uploading or editing a file.
 * This dialog allows users to select a program, file type, and PDF file,
 * and provides additional information if required. It includes form validation
 * and emits events based on user actions.
 *
 * @param {boolean} modelValue - Controls the visibility of the dialog.
 * @param {Object|null} editItem - The file item to be edited, if in edit mode.
 * @param {Object} internship - The internship data related to the file upload.
 * @param {string} internship.program - The selected internship program.
 */
-->
<template>
  <div class="file-dialog">
    <v-dialog
      v-model="localDialog"
      max-width="1300px"
      persistent
      class="file-dialog__container"
    >
      <v-card class="file-dialog__card">
        <v-card-title class="file-dialog__title">
          {{
            isEditMode
              ? `Επεξεργασία Δικαιολογητικού: ${editItem?.description}`
              : "Ανέβασμα Δικαιολογητικού"
          }}
          <v-spacer></v-spacer>
          <v-btn icon @click="emitClose">
            <v-icon>fa-solid fa-xmark</v-icon>
          </v-btn>
        </v-card-title>

        <div v-if="isEditMode" class="file-dialog__info">
          <v-card-text class="file-dialog__filename">
            Όνομα Αρχείου: <span>{{ editItem?.file_name }}</span>
          </v-card-text>
          <v-card-text class="file-dialog__edit-date">
            Τελευταία ημερομηνία επεξεργασίας: <span>{{ editItem?.date }}</span>
          </v-card-text>
          <v-card-text class="file-dialog__edit-date">
            Τύπος Υποβολής Αρχείου: <span>{{ editItem?.submission_time }}</span>
          </v-card-text>
        </div>

        <v-form
          ref="form"
          class="file-dialog__form"
          @submit.prevent="submitForm"
        >
          <div class="file-dialog__selections">
            <v-select
              v-model="selectedDepartment"
              label="Επέλεξε τμήμα"
              outlined
              dense
              class="file-dialog__select"
              disabled
              @change="onProgramChange"
            >
            </v-select>

            <v-select
              v-model="selectedProgram"
              :items="programs"
              label="Επέλεξε πρόγραμμα"
              outlined
              :rules="internshipProgramRules"
              dense
              class="file-dialog__select"
              disabled
              @change="onProgramChange"
            ></v-select>

            <v-select
              v-if="!isEditMode"
              v-model="selectedFileType"
              :items="filteredFileTypes"
              item-title="description"
              item-value="type"
              :rules="selectRules"
              label="Επέλεξε τύπο αρχείου"
              outlined
              dense
              class="file-dialog__select"
              :disabled="!selectedProgram || isEditMode"
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

          <v-list
            v-if="additionalInformation"
            dense
            class="file-dialog__info-list"
          >
            <v-subheader class="file-dialog__info-list--header"
              >Πρόσθετες Πληροφορίες</v-subheader
            >
            <v-subheader class="file-dialog__info-list--subheader"
              >Τα παρακάτω αρχεία θα πρέπει να τα υποβάλει ο φοιτητής στο
              Γραφείο Πρακτικής Άσκησης</v-subheader
            >
            <v-divider></v-divider>
            <v-list-item
              v-for="(item, index) in additionalInformationList"
              :key="index"
            >
              <v-list-item-icon>
                <v-icon color="primary-blue-color"
                  >fa-solid fa-circle-info fa-sm</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="file-dialog__info-list--item">{{
                  item
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-actions class="file-dialog__actions">
            <v-btn
              type="submit"
              class="file-dialog__btn file-dialog__btn--submit"
              :disabled="loading"
            >
              <template v-if="loading">
                <v-icon
                  color="primary-blue-color"
                  icon="fas fa-circle-notch fa-spin"
                ></v-icon>
              </template>
              <template v-else>
                {{ isEditMode ? "Ενημέρωση" : "Ανέβασμα" }}
              </template>
            </v-btn>
            <v-btn
              class="file-dialog__btn file-dialog__btn--cancel"
              @click="emitClose"
            >
              Κλείσιμο
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import {
  updateDikaiologitika,
  uploadDikaiologitika,
} from "@/services/dikaiologitkaService";
import { useDikaiologitkaStore } from "@/stores/dikaiologitika";
import type {
  DikaiologitikaFile,
  DikaiologitikaType,
} from "@/types/dikaiologitika";
import { InternshipProgram } from "@/types";
import type { InternshipRead } from "@/types/internship";

// Define the props received by the component
const props = defineProps<{
  modelValue: boolean;
  editItem?: DikaiologitikaFile | null;
  internship: InternshipRead;
}>();
const emit = defineEmits(["update:modelValue", "refreshFilesList"]);

const dikaiologitikaStore = useDikaiologitkaStore();
const isEditMode = computed(() => props.editItem !== null);
const form = ref<any>(null);
const loading = ref(false);
const fileInput = ref<File | null>(null);
const localDialog = ref(props.modelValue);
const programs = computed(() =>
  Object.keys(dikaiologitikaStore.dikaiologitikaTypes)
);
const selectedProgram = computed(() => props.internship?.program ?? null);
const selectedDepartment = computed(() => props.internship?.department ?? null);
const selectedFileType = ref<string | null>(
  props.editItem?.description ?? null
);

console.log("🚀 ~ selectedFileType:", selectedFileType, props.editItem);
// Computed property for the filtered list of file types based on the selected program
const filteredFileTypes = computed<DikaiologitikaType[]>(() => {
  if (selectedProgram.value) {
    return dikaiologitikaStore.dikaiologitikaTypes[selectedProgram.value] || [];
  }
  return [];
});

// Watch for changes in props and update local state accordingly
watchEffect(() => {
  selectedFileType.value = props.editItem?.type ?? null;
  if (props.editItem) {
    const program = programs.value.find((p) =>
      dikaiologitikaStore.dikaiologitikaTypes[p].some(
        (ft) => ft.type === props.editItem!.type
      )
    );
    selectedProgram.value = program || null;
  }
});

// Validation rules for form inputs
const selectRules = [
  (value: string) => !!value || "Πρέπει να επιλέξεις ένα τύπο αρχείου.",
];
const fileRules = [
  (value: any) => !!value || "Πρέπει να επιλέξεις ένα αρχείο.",
];
const internshipProgramRules = [
  (value: any) => !!value || "Πρέπει να επιλέξεις ένα τύπο πρακτικής.",
];

// Watch for changes in modelValue prop and update localDialog state
watch(
  () => props.modelValue,
  (newValue) => {
    localDialog.value = newValue;
  }
);

// Handle program change event
const onProgramChange = () => {
  selectedFileType.value = null;
};

// Handle file selection event
const fileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input && input.files && input.files.length > 0) {
    fileInput.value = input.files[0];
  }
};

// Handle form submission
const submitForm = async () => {
  if (
    !form.value?.validate() ||
    !fileInput.value ||
    !selectedFileType.value ||
    !selectedProgram.value
  ) {
    toast.error(
      "Η υποβολή της φόρμας απέτυχε λόγω σφαλμάτων επικύρωσης ή έλλειψης δεδομένων."
    );
    return;
  }

  loading.value = true;
  try {
    let response: any;
    if (isEditMode.value && props.editItem) {
      response = await updateDikaiologitika(
        fileInput.value,
        props.editItem.id,
        selectedProgram.value
      );
    } else {
      response = await uploadDikaiologitika(
        fileInput.value,
        selectedFileType.value,
        selectedProgram.value
      );
    }

    if (response.error) {
      toast.error(`${response.error}`);
    } else {
      toast.success(`${response.detail || response.message?.detail}`);
      emit("refreshFilesList");
      emitClose();
    }
  } catch (error) {
    toast.error(`${error}`);
  } finally {
    loading.value = false;
  }
};

// Computed property to generate dynamic content (information about internship programs)
const additionalInformation = computed(() => {
  switch (selectedProgram.value) {
    case InternshipProgram.TEITHE_OAED:
    case InternshipProgram.EMPLOYER_DECLARATION_OF_RESPONSIBILITY:
      return `
      Βεβαίωση Ολοκλήρωσης της Πρακτικής Άσκησης (ΛΗΞΗ)`;
    case InternshipProgram.ESPA:
      return `
      Πρωτότυπο της Βεβαίωσης Ολοκλήρωσης της Πρακτικής Άσκησης (ΛΗΞΗ)`;
    case InternshipProgram.TEITHE_JOB_RECOGNITION:
      return `
      Σύμβαση αορίστου (ΕΝΑΡΞΗ)
      Βεβαίωση Ολοκλήρωσης της Πρακτικής Άσκησης (Σημείωση, Φέρνει το πρωτότυπο στο Γραφείο Πρακτικής Άσκησης) (ΛΗΞΗ)`;
    default:
      return null;
  }
});

// Computed property to generate a list of additional information items
const additionalInformationList = computed(() => {
  if (additionalInformation.value) {
    return additionalInformation.value.split("\n").filter((info) => info);
  }
  return [];
});

// Emit close event to close the dialog
const emitClose = () => {
  fileInput.value = null;
  selectedFileType.value = null;
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.file-dialog {
  &__container {
    @apply rounded-lg;
  }

  &__title {
    @apply flex items-baseline text-lg font-bold w-full whitespace-pre-wrap;
    color: $primary-dark-blue-color;
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
  &__info-list {
    @apply m-2 shadow-md p-2 bg-white rounded-md;
    color: $primary-dark-blue-color;
    &--header {
      @apply flex justify-center font-semibold;
    }
    &--subheader {
      @apply flex justify-center font-medium mb-2;
    }
    &--item {
      @apply font-medium;
    }
  }

  &__select,
  &__file-input {
    @apply bg-white text-blue-900 p-2;
  }

  &__actions {
    @apply flex justify-end space-x-2;
  }

  &__btn {
    @apply hover:text-white py-2 px-4 rounded-md;

    &--submit {
      @apply bg-blue-200 hover:bg-blue-700;
    }

    &--cancel {
      @apply py-2 px-4 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400;
    }
  }
}

:deep .v-list-item__content {
  @apply flex items-baseline gap-4;
}
</style>
