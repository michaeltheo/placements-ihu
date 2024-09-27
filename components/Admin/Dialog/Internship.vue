<!--
/**
 * AdminDialogInternship Component
 *
 * This component displays detailed information about an internship in a dialog format.
 * It allows the admin to view and update the status of the internship, view associated files,
 * and check the status of questionnaires submitted by the user and the company.
 *
 * @param {boolean} modelValue - Controls the visibility of the dialog.
 * @param {InternshipRead} internship - The internship object containing detailed information about the internship.
 *
 * Emits:
 * - update:modelValue (boolean): Emits an event to update the visibility of the dialog.
 * - refreshInternshipList (): Emits an event to refresh the list of internships after an update.
 */
-->
<template>
  <div class="dialog">
    <v-dialog
      v-model="localDialog"
      persistent
      max-width="1100px"
      class="dialog__container"
    >
      <v-card class="dialog__card">
        <v-card-title class="dialog__card__title">
          Πληροφορίες Πρακτικής
          <v-spacer></v-spacer>
          <v-btn icon @click="emitClose">
            <v-icon>fa-solid fa-xmark</v-icon>
          </v-btn>
        </v-card-title>

        <div class="dialog__card__info">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-icon
                  class="dialog__card__info__data-row__icon"
                  color="primary-blue-color"
                >
                  fa-solid fa-user
                </v-icon>
                <span class="dialog__card__info__data-row__label"
                  >Ασκούμενος:</span
                >
                <span class="dialog__card__info__data-row__value">
                  {{ internship?.user_first_name }}
                  {{ internship?.user_last_name }}
                </span>
              </v-col>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-icon
                  class="dialog__card__info__data-row__icon"
                  color="primary-blue-color"
                >
                  fa-solid fa-id-card
                </v-icon>
                <span class="dialog__card__info__data-row__label"
                  >Αριθμός Μητρώου:</span
                >
                <span class="dialog__card__info__data-row__value">{{
                  internship?.user_am ?? "N/A"
                }}</span>
              </v-col>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-icon
                  class="dialog__card__info__data-row__icon"
                  color="primary-blue-color"
                >
                  fa-solid fa-book
                </v-icon>
                <span class="dialog__card__info__data-row__label"
                  >Πρόγραμμα Πρακτικής Άσκησης:</span
                >
                <span class="dialog__card__info__data-row__value">{{
                  internship?.program ?? "N/A"
                }}</span>
              </v-col>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-icon
                  class="dialog__card__info__data-row__icon"
                  color="primary-blue-color"
                >
                  fa-solid fa-building
                </v-icon>
                <span class="dialog__card__info__data-row__label"
                  >Όνομα Εταιρείας:</span
                >
                <span class="dialog__card__info__data-row__value">{{
                  internship?.company_name ?? "N/A"
                }}</span>
              </v-col>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-icon
                  class="dialog__card__info__data-row__icon"
                  color="primary-blue-color"
                >
                  fa-solid fa-user-tie
                </v-icon>
                <span class="dialog__card__info__data-row__label"
                  >Επόπτης:</span
                >
                <span class="dialog__card__info__data-row__value">{{
                  internship?.supervisor ?? "N/A"
                }}</span>
              </v-col>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-icon
                  class="dialog__card__info__data-row__icon"
                  color="primary-blue-color"
                >
                  fa-regular fa-calendar-days
                </v-icon>
                <span class="dialog__card__info__data-row__label"
                  >Ημερομηνία Έναρξης:</span
                >
                <span class="dialog__card__info__data-row__value">{{
                  formatDate(internship?.start_date) || "N/A"
                }}</span>
              </v-col>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-icon
                  class="dialog__card__info__data-row__icon"
                  color="primary-blue-color"
                >
                  fa-regular fa-calendar-days
                </v-icon>
                <span class="dialog__card__info__data-row__label"
                  >Ημερομηνία Λήξης:</span
                >
                <span class="dialog__card__info__data-row__value">{{
                  formatDate(internship?.end_date) || "N/A"
                }}</span>
              </v-col>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-icon
                  class="dialog__card__info__data-row__icon"
                  color="primary-blue-color"
                >
                  fa-solid fa-gear
                </v-icon>
                <span class="dialog__card__info__data-row__label"
                  >Κατάσταση:</span
                >
                <span
                  class="dialog__card__info__data-row__value dialog__card__info__data-row__value--status"
                  :style="{ color: getColorForStatus(selectedStatus) }"
                >
                  {{ selectedStatus }}
                </span>
              </v-col>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-icon
                  class="dialog__card__info__data-row__icon"
                  color="primary-blue-color"
                >
                  fa-solid fa-circle-question
                </v-icon>
                <div class="dialog__card__info__data-row__content">
                  <span class="dialog__card__info__data-row__label"
                    >Ερωτηματολόγιο Φοιτητή:</span
                  >
                  <span
                    class="dialog__card__info__data-row__value dialog__card__info__data-row__value--Questionnaire"
                    :style="{
                      color: getColorForQuestionnaire(
                        userHasSubmittedQuestionnaire,
                      ),
                    }"
                  >
                    {{
                      userHasSubmittedQuestionnaire
                        ? "Ολοκληρωμένο"
                        : "Δεν βρέθηκε"
                    }}
                  </span>
                  <v-btn
                    v-if="userHasSubmittedQuestionnaire"
                    variant="plain"
                    @click="openViewQuestionnaireAnswersDialog = true"
                  >
                    <v-icon color="primary-blue-color">fa-solid fa-eye</v-icon>
                    <v-tooltip activator="parent" location="top"
                      >Προβολή Ερωτηματολιγίου</v-tooltip
                    >
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-icon
                  class="dialog__card__info__data-row__icon"
                  color="primary-blue-color"
                >
                  fa-solid fa-circle-question
                </v-icon>
                <div class="dialog__card__info__data-row__content">
                  <span class="dialog__card__info__data-row__label"
                    >Ερωτηματολόγιο Εταιρείας:</span
                  >
                  <span
                    class="dialog__card__info__data-row__value dialog__card__info__data-row__value--Questionnaire"
                    :style="{
                      color: getColorForQuestionnaire(
                        companyHasSubmittedQuestionnaire,
                      ),
                    }"
                  >
                    {{
                      companyHasSubmittedQuestionnaire
                        ? "Ολοκληρωμένο"
                        : "Δεν βρέθηκε"
                    }}
                  </span>
                  <v-btn
                    v-if="companyHasSubmittedQuestionnaire"
                    variant="plain"
                    @click="openViewQuestionnaireCompanyAnswersDialog = true"
                  >
                    <v-icon color="primary-blue-color">fa-solid fa-eye</v-icon>
                    <v-tooltip activator="parent" location="top"
                      >Προβολή Ερωτηματολιγίου</v-tooltip
                    >
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="6" class="dialog__card__info__data-row">
                <v-btn
                  prepend-icon="fa-solid fa-pen"
                  color="warning"
                  @click="openCreateInternshipDialog = true"
                  >Επεξεργασία Πρακτικής</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-select
            v-model="selectedStatus"
            :items="InternshipsStatus"
            label="Αλλαγή της κατάστασης πρακτικής"
            variant="outlined"
            color="primary-dark-blue"
            hint="Άλλαξε την κατάστατση της πρακτικής του ασκούμενου"
            dense
            class="dialog__select"
            @update:model-value="updateInternshipStatus"
          ></v-select>
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
            <div class="dialog__table--actions">
              <v-btn variant="plain" @click="downloadFile(item)">
                <v-icon color="primary-blue-color"> fa:fas fa-download </v-icon>
                <v-tooltip activator="parent" location="top"
                  >Κατέβασμα Αρχείου</v-tooltip
                >
              </v-btn>
              <v-btn variant="plain" @click="editItem(item)">
                <v-icon color="warning">fa:fas fa-pen-to-square</v-icon>
                <v-tooltip activator="parent" location="top"
                  >Επεξεργασία Δικαιολογητικού</v-tooltip
                >
              </v-btn>
            </div>
          </template>
          <template #bottom></template>
        </v-data-table>

        <v-card-actions class="dialog__actions">
          <v-btn
            class="dialog__actions__btn--downloadAll"
            @click="downloadAllFiles()"
          >
            <v-tooltip activator="parent" location="top"
              >Κατέβασμα όλων των αρχείων σε μορφή ZIP</v-tooltip
            >
            Κατέβασε όλα τα αρχεία</v-btn
          >
          <v-btn class="dialog__actions__btn--cancel" @click="emitClose"
            >Κλείσιμο</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog for viewing user's questionnaire -->
    <ProfileQuestionnaireDialog
      :model-value="openViewQuestionnaireAnswersDialog"
      :question-answers="questionnaireAnswers"
      @update:model-value="handleQuestionnaireDialogClose"
    />
    <!-- Dialog for viewing company's questionnaire -->
    <ProfileQuestionnaireDialog
      :model-value="openViewQuestionnaireCompanyAnswersDialog"
      :question-answers="questionnaireCompanyAnswers"
      @update:model-value="handleQuestionnaireCompanyDialogClose"
    />
    <!-- Dialog ot update students internship -->
    <CreateInternshipDialog
      :model-value="openCreateInternshipDialog"
      :is-update="true"
      :internship="internship"
      :is-admin="true"
      @update:modelValue="handleCreateInternshipDialogClose"
    />
    <!-- Dialogs for file upload -->
    <FileUploadDialog
      :model-value="openAddFilesDialog"
      :edit-item="selectedDikaiologitiko"
      :internship="internship"
      @update:modelValue="handleFileUploadDialogClose"
      @refreshFilesList="loadUserFiles(internship?.user_id ?? 0)"
    />
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import type { InternshipRead } from "@/types/internship";
import { InternshipStatus } from "@/types";
import {
  downloadDikaiologitika,
  fetchDikaiologitaFiles,
  downloadAllUserFiles,
} from "@/services/dikaiologitkaService";
import { submissionTimeValues } from "@/constants/ApiConstants ";

import { UserAnswer } from "@/types/questionAnswer";
import type { DikaiologitikaFile } from "@/types/dikaiologitika";
import { hasErrorResponse } from "@/services/errorHandling";
import { adminUpdateInternshipStatus } from "@/services/internshipService";
import {
  getInternshipCompanyQuestionnaire,
  getUserAnswers,
} from "@/services/questionAnswerService";

const props = defineProps<{
  modelValue: boolean;
  internship: InternshipRead;
}>();

const emit = defineEmits(["update:modelValue", "refreshInternshipList"]);
const localDialog = ref(props.modelValue);
const selectedStatus = ref<InternshipStatus>(props?.internship?.status);
const filesLoading = ref<boolean>(false);
const openCreateInternshipDialog = ref<boolean>(false);
const openAddFilesDialog = ref<boolean>(false);
const selectedDikaiologitiko = ref<DikaiologitikaFile | null>(null);
const openViewQuestionnaireAnswersDialog = ref<boolean>(false);
const openViewQuestionnaireCompanyAnswersDialog = ref<boolean>(false);
const userFiles = ref<DikaiologitikaFile[]>([]);
const questionnaireAnswers = ref<UserAnswer[]>([]);
const questionnaireCompanyAnswers = ref<UserAnswer[]>([]);
const userHasSubmittedQuestionnaire = ref<boolean>(false);
const companyHasSubmittedQuestionnaire = ref<boolean>(false);
const InternshipsStatus = Object.values(InternshipStatus);

watchEffect(() => {
  localDialog.value = props.modelValue;
  selectedStatus.value = props.internship?.status;
  if (props.internship?.user_id) {
    loadUserFiles(props.internship?.user_id);
    loadUserQuestionnaire(props.internship?.user_id, props.internship?.status);
  }
});

const fileHeaders = ref([
  { title: "ΕΙΔΟΣ ΑΡΧΕΙΟΥ", key: "description", sortable: false },
  { title: "ΤΥΠΟΣ ΑΡΧΕΙΟΥ", key: "submission_time", sortable: false },
  { title: "ΗΜΕΡΟΜΗΝΙΑ ΕΠΕΞΕΡΓΑΣΙΑΣ", key: "date", sortable: false },
  { title: "ΟΝΟΜΑ ΑΡΧΕΙΟΥ", key: "file_name", sortable: false },
  { title: "ΕΠΙΛΟΓΕΣ", key: "actions", sortable: false },
]);

/**
 * Gets the color for the submission time chip based on the submission time value.
 * @param fileSubmissionTime - The submission time of the file.
 * @returns The color string for the chip.
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
 * Fetches files for the given user ID and updates the state.
 * @param userId - The ID of the user.
 */
const loadUserFiles = async (userId: number) => {
  if (!userId || userId === 0) return;
  filesLoading.value = true;
  try {
    const response = await fetchDikaiologitaFiles(userId);
    if (hasErrorResponse(response)) {
      toast.error(`Σφάλμα ανάκτησης αρχείων: ${response.error}`);
    } else {
      userFiles.value = response?.data.files ?? [];
    }
  } finally {
    filesLoading.value = false;
  }
};

/**
 * Initiates the download of a specific file.
 * @param file - The file to download.
 */
const downloadFile = async (file: DikaiologitikaFile) => {
  await downloadDikaiologitika(file.id);
};

/**
 * Initiates the download all user files as a ZIP.
 */
const downloadAllFiles = async () => {
  await downloadAllUserFiles(props.internship?.user_id);
};

/**
 * Closes the dialog and refreshes the internship list.
 */
const emitClose = () => {
  emit("refreshInternshipList");
  userFiles.value = [];
  questionnaireAnswers.value = [];
  questionnaireCompanyAnswers.value = [];
  userHasSubmittedQuestionnaire.value = false;
  companyHasSubmittedQuestionnaire.value = false;
  emit("update:modelValue", false);
};

/**
 * Formats a date string to 'dd-MM-yy' format.
 * @param dateString - The date string to format.
 * @returns The formatted date string or "N/A" if invalid.
 */
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "N/A";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("el-GR", options);
};

/**
 * Returns a color based on the internship status.
 * @param status - The status of the internship.
 * @returns The color corresponding to the status.
 */
const getColorForStatus = (status: string): string => {
  if (status === InternshipStatus.ACTIVE || status === InternshipStatus.ENDED) {
    return "green";
  } else if (
    status === InternshipStatus.PENDING_REVIEW_END ||
    status === InternshipStatus.PENDING_REVIEW_START
  ) {
    return "orange";
  } else if (
    status === InternshipStatus.SUBMIT_START_FILES ||
    status ===
      InternshipStatus.SUBMIT_STAT_FILES_WITHOUT_SECRETARY_CERTIFICATION ||
    status === InternshipStatus.SUBMIT_END_FILES
  ) {
    return "orange-darken-1";
  }
  return "default";
};
/**
 * Returns a color if a user has a Questionnaire.
 * @param hasQuestionnaire - The status of the internship.
 * @returns The color corresponding to the Questionnaire.
 */
const getColorForQuestionnaire = (hasQuestionnaire: boolean): string => {
  if (hasQuestionnaire) {
    return "green";
  }
  return "default";
};

/**
 * Updates the internship status.
 */
const updateInternshipStatus = async () => {
  if (!selectedStatus) return;
  const response = await adminUpdateInternshipStatus(
    props?.internship?.id,
    selectedStatus.value,
  );
  if (hasErrorResponse(response)) {
    toast.error(`${response.error}`);
  } else {
    toast.success(`${response.message?.detail}`);
  }
};
/**
 * Opens the edit dialog for a specific item.
 * @param item - The item to be edited.
 */
const editItem = (item: DikaiologitikaFile): void => {
  selectedDikaiologitiko.value = item;
  nextTick(() => {
    openAddFilesDialog.value = true;
  });
};

/**
 * Handles closing of the FileUploadDialog.
 * @param newValue - The new value for the dialog visibility.
 */
const handleFileUploadDialogClose = (newValue: boolean): void => {
  openAddFilesDialog.value = newValue;
  if (!newValue) {
    selectedDikaiologitiko.value = null;
  }
};
/**
 * Checks if the user has submitted the questionnaire.
 */
const loadUserQuestionnaire = async (
  userId: number,
  status: InternshipStatus,
): Promise<void> => {
  if (status !== InternshipStatus.PENDING_REVIEW_END) {
    const userAnswers: any = await getUserAnswers(userId);

    if (userAnswers.data && !hasErrorResponse(userAnswers)) {
      userHasSubmittedQuestionnaire.value = userAnswers.data.length > 0;
      questionnaireAnswers.value = userAnswers.data;
    } else {
      userHasSubmittedQuestionnaire.value = false;
    }
    const companyAnswers: any = await getInternshipCompanyQuestionnaire(
      props.internship.id,
    );
    if (companyAnswers.data && !hasErrorResponse(companyAnswers)) {
      companyHasSubmittedQuestionnaire.value = companyAnswers.data.length > 0;
      questionnaireCompanyAnswers.value = companyAnswers.data;
    } else {
      companyHasSubmittedQuestionnaire.value = false;
    }
  }
};

/**
 * Handles closing of the QuestionnaireAnswersDialog.
 * @param newValue - The new value for the dialog visibility.
 */
const handleQuestionnaireDialogClose = (newValue: boolean): void => {
  openViewQuestionnaireAnswersDialog.value = newValue;
};

const handleQuestionnaireCompanyDialogClose = (newValue: boolean): void => {
  openViewQuestionnaireCompanyAnswersDialog.value = newValue;
};

/**
 * Handles closing of the CreateInternshipDialog.
 * @param newValue - The new value for the dialog visibility.
 */
const handleCreateInternshipDialogClose = (newValue: boolean): void => {
  openCreateInternshipDialog.value = newValue;
  emitClose();
};

watch(
  () => props.internship,
  async (newVal) => {
    selectedStatus.value = newVal?.status;
    if (newVal?.user_id) {
      await loadUserFiles(newVal.user_id);
      await loadUserQuestionnaire(newVal.user_id, newVal.status);
    }
  },
);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.dialog {
  &__container {
    @apply rounded-lg;
  }

  &__card {
    @apply p-3 bg-white shadow-lg rounded-lg;

    &__title {
      @apply flex items-baseline text-lg font-bold mb-4;
      color: $primary-dark-blue-color;
    }

    &__info {
      @apply space-y-4 p-4 shadow-md  rounded-sm;
      color: $primary-dark-blue-color;

      &__data-row {
        @apply flex flex-col md:flex-row items-start md:items-baseline mb-4 p-2;

        &__icon {
          margin-right: 1rem;
          @apply text-xl mb-2 md:mb-0;
        }

        &__label {
          @apply font-semibold mr-2 mb-1 md:mb-0;
        }

        &__value {
          @apply font-medium;

          &--status,
          &--Questionnaire {
            @apply font-extrabold;
          }
        }

        &__content {
          @apply flex items-baseline;
          &__btn {
            @apply mt-2;
          }
        }
      }
    }
  }

  &__select {
    @apply mt-4 mb-6;
  }

  &__table {
    @apply my-4 p-4 bg-white shadow-md rounded-lg;
    &--actions {
      @apply flex items-center justify-around;
    }
  }

  &__actions {
    @apply flex justify-end p-4 mt-4 border-t border-gray-200;

    &__btn {
      &--cancel {
        @apply py-2 px-4 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400;
      }

      &--download,
      &--downloadAll {
        @apply text-white bg-blue-500 hover:bg-blue-600;
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
