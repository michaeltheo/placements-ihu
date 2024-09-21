<template>
  <!--
  /**
   * SecretaryDialogInternship Component
   *
   * Dialog component for uploading or editing a file.
   * This dialog allows users to upload a PDF file associated with a student's internship.
   * It includes file validation, displays existing files in a table, and provides actions for file download.
   * The component handles file selection, submission, and state management through props and emits events to the parent component.
   *
   * @param {boolean} modelValue - Controls the visibility of the dialog.
   * @param {Object} internship - The internship data related to the file upload.
   * @param {string} internship.user_first_name - The first name of the student.
   * @param {string} internship.user_last_name - The last name of the student.
   * @param {number} internship.user_id - The ID of the student for whom files are uploaded.
   */
  -->
  <div class="dialog">
    <v-dialog
      v-model="localDialog"
      persistent
      max-width="1000px"
      class="dialog__container"
    >
      <v-card class="dialog__card">
        <v-card-title class="dialog__card-title">
          Αρχεία Φοιτητή: {{ internship?.user_first_name }}
          {{ internship?.user_last_name }}
          <v-spacer></v-spacer>
          <v-btn icon @click="emitClose">
            <v-icon>fa-solid fa-xmark</v-icon>
          </v-btn>
        </v-card-title>
        <div class="dialog__card-info">
          <div class="dialog__card-info-hint">
            Προσθήκη/Ανανέωση Αρχείου Βεβαίωση Πρακτικής Ασκησης Απο Γραμματεία
          </div>
          <v-file-input
            v-model="selectedFile"
            prepend-icon="fa:fas fa-file-pdf"
            show-size
            counter
            accept=".pdf"
            :rules="fileRules"
            label="Επέλεξε Aρχείο Bεβαιώσης Πρακτικής Από Γραμματεία (PDF)"
            outlined
            dense
            class="dialog__card-info-file-input"
            @change="fileSelected"
          ></v-file-input>
        </div>
        <v-data-table
          :headers="fileHeaders"
          :items="userFiles"
          item-key="id"
          :hover="true"
          class="dialog__table"
          no-data-text="Δεν βρέθηκαν αρχεία"
        >
          <template #item.submission_time="{ item }">
            <v-chip variant="elevated" :color="getColor(item.submission_time)">
              {{ item.submission_time }}
            </v-chip>
          </template>
          <template #item.actions="{ item }">
            <div class="dialog__table-actions">
              <v-btn variant="plain" @click="downloadFile(item)">
                <v-icon color="primary-blue-color">fa:fas fa-download</v-icon>
                <v-tooltip activator="parent" location="top"
                  >Κατέβασμα Αρχείου</v-tooltip
                >
              </v-btn>
            </div>
          </template>
          <template #bottom></template>
        </v-data-table>
        <v-card-actions class="dialog__actions">
          <v-btn
            v-if="selectedFile"
            class="dialog__actions-btn-submit"
            :disabled="loading"
            @click="submitForm"
          >
            <template v-if="loading">
              <v-icon
                color="primary-blue-color"
                icon="fas fa-circle-notch fa-spin"
              ></v-icon>
            </template>
            <template v-else>Ανέβασμα</template>
          </v-btn>
          <v-btn class="dialog__actions-btn-cancel" @click="emitClose"
            >Κλείσιμο</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import { DikaiologitikaTypes } from "@/types";
import type { InternshipRead } from "@/types/internship";
import {
  downloadDikaiologitika,
  fetchDikaiologitaFiles,
  uploadBebaiwsiPraktikisAskisisApoGrammateia,
} from "@/services/dikaiologitkaService";
import { hasErrorResponse } from "@/services/errorHandling";
import { DikaiologitikaFile } from "@/types/dikaiologitika";

const submissionTimeValues = {
  start: "Έναρξη",
  end: "Λήξη",
};

const props = defineProps<{
  modelValue: boolean;
  internship: InternshipRead;
}>();
const emit = defineEmits(["update:modelValue", "refreshInternshipList"]);
const localDialog = ref(props.modelValue);
const loading = ref(false);
const selectedFile = ref<File | null>(null);
const userFiles = ref<DikaiologitikaFile[]>([]);
const fileHeaders = ref([
  { title: "ΕΙΔΟΣ ΑΡΧΕΙΟΥ", key: "description", sortable: false },
  { title: "ΤΥΠΟΣ ΑΡΧΕΙΟΥ", key: "submission_time", sortable: false },
  { title: "ΗΜΕΡΟΜΗΝΙΑ ΕΠΕΞΕΡΓΑΣΙΑΣ", key: "date", sortable: false },
  { title: "ΟΝΟΜΑ ΑΡΧΕΙΟΥ", key: "file_name", sortable: false },
  { title: "ΕΠΙΛΟΓΕΣ", key: "actions", sortable: false },
]);
const fileRules = ref([
  (value) => !!value || "Πρέπει να επιλέξεις ένα αρχείο.",
]);

/**
 * Returns a color string based on the file submission time.
 * Used for dynamically setting the color of the chips in the file table.
 *
 * @param {string} fileSubmissionTime - The submission time of the file.
 * @returns {string} - The color to be applied based on the submission time.
 */
const getColor = (fileSubmissionTime: string): string => {
  if (fileSubmissionTime === submissionTimeValues.start) {
    return "green";
  } else if (fileSubmissionTime === submissionTimeValues.end) {
    return "teal";
  }
  return "default";
};

/**
 * Fetches files for the given user ID and updates the state, fetching only files
 * with type `AitisiPraktikis` or `BebaiwsiPraktikis`.
 *
 * @param {number} userId - The ID of the user.
 */
const loadUserFiles = async (userId: number) => {
  if (!userId || userId === 0) return;

  const response = await fetchDikaiologitaFiles(userId);
  if (hasErrorResponse(response)) {
    toast.error(`Σφάλμα ανάκτησης αρχείων: ${response.error}`);
  } else {
    userFiles.value = (response?.data.files ?? []).filter(
      (file) =>
        file.type === DikaiologitikaTypes.AitisiPraktikis ||
        file.type === DikaiologitikaTypes.BebaiosiPraktikisApoGramateia
    );
  }
};

/**
 * Handles file form submission. Uploads the selected file to the server,
 * emits an event to refresh the internship list, and closes the dialog.
 */
const submitForm = async () => {
  if (!selectedFile.value) {
    toast.error("Πρέπει να επιλέξεις ένα αρχείο.");
    return;
  }
  loading.value = true;
  try {
    const response = await uploadBebaiwsiPraktikisAskisisApoGrammateia(
      selectedFile.value,
      props.internship.user_id
    );
    if (response.error) {
      toast.error(`${response.error}`);
    } else {
      toast.success(`${response.message?.detail}`);
      loadUserFiles(props.internship.user_id);
    }
  } catch (error) {
    toast.error(`${error}`);
  } finally {
    loading.value = false;
  }
};

/**
 * Watches for changes to the dialog visibility and loads the user files if the dialog is open.
 */
watchEffect(() => {
  localDialog.value = props.modelValue;
  if (props.internship?.user_id) {
    loadUserFiles(props.internship?.user_id);
  }
});

/**
 * Handles file selection from the input element and updates the selected file.
 *
 * @param {Event} event - The change event from the file input.
 */
const fileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  selectedFile.value = input.files?.[0] || null;
};

/**
 * Downloads the selected file by its ID.
 *
 * @param {Object} file - The file object to download.
 */
const downloadFile = async (file: DikaiologitikaFile) => {
  await downloadDikaiologitika(file.id);
};

/**
 * Emits an event to close the dialog and reset the files.
 * Clears the user files and emits a close event to the parent.
 */
const emitClose = () => {
  userFiles.value = [];
  selectedFile.value = null;
  emit("update:modelValue", false);
  emit("refreshInternshipList");
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.dialog {
  &__container {
    @apply rounded-lg;
  }

  &__card {
    @apply p-3 bg-white shadow-lg rounded-lg;

    &-title {
      @apply flex items-baseline text-lg font-bold mb-4;
      color: $primary-dark-blue-color;
    }

    &-info {
      @apply space-y-4 p-4 shadow-md rounded-sm;
      color: $primary-dark-blue-color;
      &-hint {
        @apply p-2;
      }
      &-file-input {
        @apply bg-white text-blue-900 p-2;
      }
    }
  }

  &__table {
    @apply my-4 p-4 bg-white shadow-md rounded-lg;
    &-actions {
      @apply flex items-center justify-around;
    }
  }

  &__actions {
    @apply flex justify-end space-x-2;

    &-btn {
      @apply hover:text-white py-2 px-4 rounded-md;
      &-submit {
        @apply bg-blue-200 hover:bg-blue-500;
      }
      &-cancel {
        @apply py-2 px-4 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400;
      }
    }
  }
}
:deep .v-data-table__td {
  @apply border border-gray-200 rounded-lg text-lg text-left md:text-base;
  color: $primary-dark-blue-color;
}

:deep .v-data-table-header__content {
  @apply font-bold;
  color: $primary-dark-blue-color;
}
</style>
