<template>
  <div class="profile" data-aos="fade-down" data-aos-duration="1000">
    <!-- Profile User Data Component -->
    <ProfileUserData />

    <!-- Info Banner for Internship Status -->
    <BaseComponentsInfoBanner v-if="internship" :status="internship?.status" />

    <section class="user-files user-files--files">
      <h2 class="user-files__header">Δικαιολογητικά</h2>

      <!-- Check if the user has an internship -->
      <div v-if="!hasInternship" class="user-files__create-internship-button">
        <v-btn
          color="primary-blue-color"
          @click="openCreateInternshipDialog = true"
        >
          Δημιουργία Πρακτικής Άσκησης
        </v-btn>

        <!-- Dialog for creating an internship -->
        <CreateInternshipDialog
          :model-value="openCreateInternshipDialog"
          @update:modelValue="handleCreateInternshipDialogClose"
          @internshipCreated="handleInternshipCreated"
        />
      </div>

      <div v-else>
        <!-- Display internship data -->
        <ProfileInternshipData :internship="internship" />

        <!-- Data table for files -->
        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="serverItems"
          :items-length="totalItems"
          :loading="loading"
          item-value="type"
          loading-text="Φόρτωση δεδομένων"
          no-data-text="Δεν βρέθηκαν Δικαιολογητικά"
          @update:options="loadItems"
        >
          <template #item.submission_time="{ item }">
            <v-chip variant="elevated" :color="getColor(item.submission_time)">
              {{ item.submission_time }}
            </v-chip>
          </template>
          <template #item.actions="{ item }">
            <div class="user-files__actions">
              <v-btn variant="plain" @click="editItem(item)">
                <v-icon color="warning">fa:fas fa-pen-to-square</v-icon>
                <v-tooltip activator="parent" location="top"
                  >Επεξεργασία Δικαιολογητικού</v-tooltip
                >
              </v-btn>
              <v-btn variant="plain" @click="downloadFile(item)">
                <v-icon size="large" color="primary-blue-color"
                  >fa:fas fa-download</v-icon
                >
                <v-tooltip activator="parent" location="top"
                  >Κατέβασμα Δικαιολογητικού</v-tooltip
                >
              </v-btn>
              <v-btn variant="plain" @click="deleteItem(item)">
                <v-icon color="error">fa:fas fa-trash</v-icon>
                <v-tooltip activator="parent" location="top"
                  >Διαγραφή Δικαιολογητικού</v-tooltip
                >
              </v-btn>
            </div>
          </template>
          <template #bottom></template>
        </v-data-table-server>

        <div class="user-files__controls">
          <v-btn
            elevation="4"
            color="primary-dark-blue-color"
            append-icon="fa:fas fa-arrows-rotate"
            @click="loadItems"
          >
            Ανανέωση Πίνακα
          </v-btn>
          <v-btn
            elevation="4"
            color="green-lighten-1"
            :disabled="internship?.status == InternshipStatus.ACTIVE"
            @click="openAddFilesDialog = true"
          >
            <v-tooltip activator="parent" location="top"
              >Πρόσθεσε ένα νέο Δικαιολογητικό</v-tooltip
            >
            Προσθήκη Δικαιολογητικού
          </v-btn>
          <v-btn
            v-if="
              hasInternship &&
              internship.status !== InternshipStatus.PENDING_REVIEW_START &&
              internship.status !== InternshipStatus.SUBMIT_START_FILES &&
              internship.status !== InternshipStatus.ENDED
            "
            elevation="4"
            color="amber-darken-1"
            @click="openCreateInternshipDialog = true"
          >
            <v-tooltip activator="parent" location="top"
              >Ενήμερωση της Πρακτικής Άσκησης</v-tooltip
            >
            Ενημέρωση Πρακτικής
          </v-btn>
          <v-btn
            v-if="
              hasInternship &&
              internship.status === InternshipStatus.SUBMIT_START_FILES
            "
            elevation="4"
            color="orange-darken-3"
            @click="changeInternshipStatusToPendingReviewStart()"
          >
            <v-tooltip activator="parent" location="top"
              >Ενήμερωση κατάστασης πρακτικής σε
              {{ InternshipStatus.PENDING_REVIEW_START }}</v-tooltip
            >
            {{ InternshipStatus.PENDING_REVIEW_START }}
          </v-btn>
          <v-btn
            v-if="
              hasInternship &&
              internship.status === InternshipStatus.SUBMIT_END_FILES
            "
            elevation="4"
            color="orange-darken-3"
            @click="changeInternshipStatusToPendingReviewEnd()"
          >
            <v-tooltip activator="parent" location="top"
              >Ενήμερωση κατάστασης πρακτικής σε
              {{ InternshipStatus.PENDING_REVIEW_END }}</v-tooltip
            >
            {{ InternshipStatus.PENDING_REVIEW_END }}
          </v-btn>
          <v-btn
            v-if="
              hasInternship && internship.status === InternshipStatus.ACTIVE
            "
            elevation="4"
            color="orange-darken-1"
            @click="changeInternshipStatusToSubmitEndFiles()"
          >
            <v-tooltip activator="parent" location="top"
              >Ενήμερωση κατάστασης πρακτικής σε
              {{ InternshipStatus.SUBMIT_END_FILES }}</v-tooltip
            >
            {{ InternshipStatus.SUBMIT_END_FILES }}
          </v-btn>
        </div>
      </div>
    </section>

    <!-- Alerts for questionnaire submission -->
    <v-alert
      type="info"
      color="primary-blue-color"
      variant="outlined"
      prominent
      border="top"
      title="Πληροφορίες για το Ερωτηματολόγιο"
    >
      Η επιλογή για τη συμπλήρωση του ερωτηματολογίου θα είναι διαθέσιμη μετά το
      τέλος της πρακτικής. Για τη συμπλήρωση του ερωτηματολογίου του ασκούμενου,
      πατήστε το κουμπί
      <span class="infoBanner-text--bold">'Έναρξη Ερωτηματολογίου'</span>
      που βρίσκεται κάτω από τον πίνακα των δικαιολογητικών. Για τη συμπλήρωση
      του ερωτηματολογίου της εταιρείας, ακολουθήστε τα βήματα που βρίσκονται
      στο πλαίσιο
      <span class="infoBanner-text--bold">'Ερωτηματολογίου Εταιρείας'</span>
      Η κατάσταση της πρακτικής σας θα αλλάξει όταν το Γραφείο Πρακτικής Άσκησης
      ελέγξει τα δικαιολογητικά σας.
    </v-alert>
    <div v-if="internshipHasEnded">
      <v-alert
        v-if="!companyHasSubmittedQuestionnaire"
        type="info"
        color="primary-blue-color"
        variant="outlined"
        prominent
        border="top"
        title="Ερωτηματολόγιο Εταιρείας"
      >
        Για τη συμπλήρωση του ερωτηματολογίου είναι αναγκαία η δημιουργία
        κωδικού μιας χρήσης που θα δώσετε στον υπεύθυνο της εταιρείας. Ο κωδικός
        είναι διαθέσιμος για 1 μέρα. Ο σύνδεσμος για το ερωτηματολόγιο της
        εταιρείας βρίσκεται στο navbar.
        <v-spacer></v-spacer>
        <div v-if="OTPcode?.code">
          <div class="m-3 font-bold">Κωδικός: {{ OTPcode?.code }}</div>
          <div class="m-3 font-bold">
            Λήξη κωδικού: {{ formatOtpExpireDate(OTPcode?.expiry) }}
          </div>
        </div>
        <v-spacer></v-spacer>
        <v-btn class="m-4 md:w-1/3" @click="userGenerateOTP"
          >Δημιουργία κωδικού</v-btn
        >
      </v-alert>
      <v-alert
        v-else
        class="mt-4"
        type="info"
        variant="outlined"
        prominent
        border="top"
        title="Ερωτηματολόγιο Εταιρείας"
        color="primary-blue-color"
      >
        Η εταιρεία έχει υποβάλει το ερωτηματολόγιο για την πρακτική άσκηση.
      </v-alert>
      <v-alert
        v-if="!userHasSubmittedQuestionnaire"
        class="mt-2"
        type="warning"
        variant="outlined"
        prominent
        border="top"
        title="Ερωτηματολόγιο Φοιτητή"
      >
        Η συμπλήρωση του ερωτηματολογίου είναι διαθέσιμη μόνο μία φορά. Παρακαλώ
        ελέγξτε τις απαντήσεις σας.
        <v-spacer></v-spacer>
        <v-btn
          v-if="!openQuestionnaire"
          class="m-4 md:w-1/2 w-full"
          @click="openQuestionnaire = true"
          >Έναρξη Ερωτηματολογίου</v-btn
        >
      </v-alert>
      <v-alert
        v-else
        class="mt-2"
        type="info"
        title="Ερωτηματολόγιο Φοιτητή"
        variant="outlined"
        prominent
        border="top"
        color="primary-blue-color"
      >
        Ο χρήστης έχει ήδη υποβάλει το ερωτηματολόγιο.
        <v-spacer></v-spacer>
        <v-btn
          v-if="questionarrieAnswers"
          class="m-4 md:w-1/2 w-full"
          color="primary-blue-color"
          @click="openViewQuestionnaireAnswersDialog = true"
          >Προβολή Ερωτηματολιγίου</v-btn
        >
      </v-alert>
      <div v-if="!userHasSubmittedQuestionnaire" class="shadow-lg">
        <Questionnaire
          v-if="openQuestionnaire"
          :questionnaireType="QuestionnaireType.STUDENT"
          @refreshUserAnswers="checkUserQuestionnaireAnswers"
        />
      </div>
    </div>
    <div v-else>
      <v-alert
        v-if="internship"
        variant="outlined"
        prominent
        border="top"
        title="Ερωτηματολόγιο"
        type="info"
      >
        Η συμπλήρωση του ερωτηματολογίου θα είναι διαθέσιμη στη λήξη της
        πρακτικής:<span class="font-bold">{{
          formatDate(internship?.end_date)
        }}</span>
      </v-alert>
    </div>

    <!-- Dialogs for file upload and deletion -->
    <FileUploadDialog
      v-show="hasInternship"
      :model-value="openAddFilesDialog"
      :edit-item="selectedItem"
      :internship="internship"
      @update:modelValue="handleDialogClose"
      @refreshFilesList="loadItems"
    />
    <DeleteFileDialog
      :model-value="openDeleteFileDialog"
      :file="selectedItem"
      @update:modelValue="handleDeleteDialogClose"
      @refreshFilesList="loadItems"
    />

    <!-- Dialog for updating internship -->
    <CreateInternshipDialog
      v-if="
        hasInternship &&
        internship.status !== InternshipStatus.PENDING_REVIEW_START &&
        internship.status !== InternshipStatus.SUBMIT_START_FILES
      "
      :model-value="openCreateInternshipDialog"
      :is-update="true"
      :internship="internship"
      @update:modelValue="handleCreateInternshipDialogClose"
      @internshipUpdated="handleInternshipUpdated"
      @refreshInternship="getInternship"
    />

    <!-- Dialog for viewing Questionnaire answers -->
    <ProfileQuestionnaireDialog
      :model-value="openViewQuestionnaireAnswersDialog"
      :question-answers="questionarrieAnswers"
      @update:model-value="handleQuestionnaireDialogClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import { useDikaiologitkaStore } from "@/stores/dikaiologitika";
import { useAuthStore } from "@/stores/auth";
import {
  downloadDikaiologitika,
  fetchDikaiologitaFiles,
  getDikaiologitkaTypes,
} from "@/services/dikaiologitkaService";
import {
  adminUpdateInternshipStatus,
  getInternshipByUser,
} from "@/services/internshipService";
import { errorLog } from "@/utils/log";
import { submissionTimeValues } from "@/constants/ApiConstants ";
import { InternshipStatus, QuestionnaireType } from "@/types";
import type { DikaiologitikaFile } from "@/types/dikaiologitika";
import FileUploadDialog from "@/components/FileUploadDialog.vue";
import DeleteFileDialog from "@/components/DeleteFileDialog.vue";
import CreateInternshipDialog from "@/components/CreateInternshipDialog.vue";
import {
  getInternshipCompanyQuestionnaire,
  getUserAnswers,
} from "@/services/questionAnswerService";
import { hasErrorResponse } from "@/services/errorHandling";
import { InternshipCreate } from "@/types/internship";
import { UserAnswer } from "@/types/questionAnswer";
import { generateOTP } from "@/services/otpService";
import { OTPBase } from "types/otp";

// Middleware for authentication
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Η Πρακτική μου",
});

const authStore = useAuthStore();
const dikaiologitikaStore = useDikaiologitkaStore();
const itemsPerPage = ref(5);
const headers = ref([
  { title: "ΕΙΔΟΣ ΑΡΧΕΙΟΥ", key: "description", sortable: false },
  { title: "ONOMA ARXEIOY", key: "file_name", sortable: false },
  { title: "ΤΥΠΟΣ ΑΡΧΕΙΟΥ", key: "submission_time", sortable: false },
  { title: "ΗΜΕΡΟΜΗΝΙΑ ΕΠΕΞΕΡΓΑΣΙΑΣ", key: "date", sortable: false },
  { title: "ΕΠΙΛΟΓΕΣ", key: "actions", sortable: false },
]);

const selectedItem = ref<DikaiologitikaFile | null>(null);
const serverItems = ref<DikaiologitikaFile[]>([]);
const loading = ref<boolean>(true);
const openAddFilesDialog = ref<boolean>(false);
const openDeleteFileDialog = ref<boolean>(false);
const openCreateInternshipDialog = ref<boolean>(false);
const openViewQuestionnaireAnswersDialog = ref<boolean>(false);
const openQuestionnaire = ref<boolean>(false);
const totalItems = ref(0);
const hasInternship = ref<boolean>(false);
const internship = ref<any>(null);
const userHasSubmittedQuestionnaire = ref<boolean>(false);
const companyHasSubmittedQuestionnaire = ref<boolean>(false);
const questionarrieAnswers = ref<UserAnswer[]>([]);
const OTPcode = ref<OTPBase>();

/**
 * Helper function to format OTP expiry date
 * @param dateString - The date string to format.
 * @returns Formatted expiry date string or "N/A" if the date is invalid.
 */
const formatOtpExpireDate = (dateString: string | null | undefined) => {
  if (!dateString) return "N/A";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date(dateString).toLocaleDateString("el-GR", options);
};

/**
 * Helper function to check if the internship end date has passed
 * @returns Boolean indicating whether the internship has ended.
 */
const internshipHasEnded = computed<boolean>(() => {
  if (!internship.value || !internship.value.end_date) return false;
  const endDate: Date = new Date(internship.value.end_date);
  const currentDate: Date = new Date();
  // Reset the time part for both dates to check only for day/month/year
  endDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  return currentDate >= endDate;
});

/**
 * Helper function to check if today is one week or less before the given end date
 * @param endDateString - The end date string to compare.
 * @returns Boolean indicating whether today is one week or less before the end date.
 */
const isOneWeekOrLessBeforeEndDate = (endDateString: string) => {
  const endDate = new Date(endDateString);
  const currentDate = new Date();
  const adjustedEndDate = new Date(endDate);
  adjustedEndDate.setDate(endDate.getDate() - 7);
  adjustedEndDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  return currentDate.getTime() >= adjustedEndDate.getTime();
};

/**
 * Function to convert milliseconds to days, hours, minutes, and seconds
 * @param milliseconds - The milliseconds to convert.
 * @returns Object containing days, hours, minutes, and seconds.
 */
const convertMillisecondsToTime = (milliseconds: number) => {
  const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (milliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds };
};

/**
 * Helper function to format date.
 * @param dateString - The date string to format.
 * @returns The formatted date string or "N/A" if the date is invalid.
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
 * Fetches and loads the list of files for the authenticated user.
 */
const loadItems = async (): Promise<void> => {
  loading.value = true;
  try {
    const result = await fetchDikaiologitaFiles(authStore.user.id);
    if (result && result.data && result.data.files) {
      serverItems.value = result.data.files;
      totalItems.value = result.data.files.length;
    } else {
      serverItems.value = [];
      totalItems.value = 0;
    }
  } catch (error) {
    errorLog(error);
  } finally {
    loading.value = false;
  }
};

/**
 * Retrieves the current user's internship information.
 */
const getInternship = async (): Promise<void> => {
  const response = await getInternshipByUser(authStore.user.id);
  if (hasErrorResponse(response)) {
    hasInternship.value = false;
    toast.error(`${response.error}`);
  } else {
    hasInternship.value = true;
    internship.value = response.data;
  }
  await fetchDikaiologitikaTypes();
};

/**
 * Fetches and filters the list of dikaiologitika types based on internship status.
 */
const fetchDikaiologitikaTypes = async (): Promise<void> => {
  const response = await getDikaiologitkaTypes();
  if (response) {
    if (
      internship?.value?.status === InternshipStatus.SUBMIT_START_FILES ||
      internship?.value?.status === InternshipStatus.PENDING_REVIEW_START
    ) {
      for (const [program, types] of Object.entries(response.data)) {
        response.data[program] = types.filter(
          (type: any) => type.submission_time === submissionTimeValues.start
        );
      }
    } else {
      for (const [program, types] of Object.entries(response.data)) {
        response.data[program] = types.filter(
          (type: any) => type.submission_time === submissionTimeValues.end
        );
      }
    }
    dikaiologitikaStore.setDikaiologitka(response.data);
  }
};

/**
 * Handles closing of the CreateInternshipDialog.
 * @param newValue - The new value for the dialog visibility.
 */
const handleCreateInternshipDialogClose = (newValue: boolean): void => {
  openCreateInternshipDialog.value = newValue;
};

/**
 * Handles the creation of a new internship.
 * @param newInternship - The new internship created.
 */
const handleInternshipCreated = async (
  newInternship: InternshipCreate
): Promise<void> => {
  hasInternship.value = true;
  internship.value = newInternship;
  openCreateInternshipDialog.value = false;
  await fetchDikaiologitikaTypes();
  await loadItems();
};

/**
 * Handles updating an existing internship.
 * @param updatedInternship - The updated internship data.
 */
const handleInternshipUpdated = (updatedInternship: any): void => {
  internship.value = updatedInternship;
  openCreateInternshipDialog.value = false;
  getInternship();
};

/**
 * Opens the edit dialog for a specific item.
 * @param item - The item to be edited.
 */
const editItem = (item: DikaiologitikaFile): void => {
  selectedItem.value = item;
  nextTick(() => {
    openAddFilesDialog.value = true;
  });
};

/**
 * Handles closing of the FileUploadDialog.
 * @param newValue - The new value for the dialog visibility.
 */
const handleDialogClose = (newValue: boolean): void => {
  openAddFilesDialog.value = newValue;
  if (!newValue) {
    selectedItem.value = null;
  }
};

/**
 * Handles closing of the DeleteFileDialog.
 * @param newValue - The new value for the dialog visibility.
 */
const handleDeleteDialogClose = (newValue: boolean): void => {
  openDeleteFileDialog.value = newValue;
  if (!newValue) {
    selectedItem.value = null;
  }
};

/**
 * Handles closing of the QuestionarrieAnswersDialog.
 * @param newValue - The new value for the dialog visibility.
 */
const handleQuestionnaireDialogClose = (newValue: boolean): void => {
  openViewQuestionnaireAnswersDialog.value = newValue;
};

/**
 * Downloads a specific file.
 * @param item - The item to be downloaded.
 */
const downloadFile = async (item: DikaiologitikaFile): Promise<void> => {
  await downloadDikaiologitika(item.id);
};

/**
 * Opens the delete dialog for a specific item.
 * @param item - The item to be deleted.
 */
const deleteItem = (item: DikaiologitikaFile): void => {
  selectedItem.value = item;
  openDeleteFileDialog.value = true;
};

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
 * Checks if the user has submitted the questionnaire.
 */
const checkUserQuestionnaireAnswers = async (): Promise<void> => {
  if (internshipHasEnded.value) {
    const response: any = await getUserAnswers(authStore.user.id);
    if (response.data && !hasErrorResponse(response)) {
      userHasSubmittedQuestionnaire.value = response.data.length > 0;
      questionarrieAnswers.value = response.data;
    } else {
      userHasSubmittedQuestionnaire.value = false;
    }
  }
};

/**
 * Checks if the company has submitted the questionnaire for user's internship.
 */
const checkCompanyQuestionnaireAnswers = async (): Promise<void> => {
  if (internshipHasEnded.value) {
    const response: any = await getInternshipCompanyQuestionnaire(
      internship.value.id
    );
    if (response.data && !hasErrorResponse(response)) {
      companyHasSubmittedQuestionnaire.value = response.data.length > 0;
    } else {
      companyHasSubmittedQuestionnaire.value = false;
    }
  }
};

/**
 * Changes the internship status to PENDING_REVIEW_START.
 */
const changeInternshipStatusToPendingReviewStart = async (): Promise<void> => {
  if (internship.value.id) {
    const response = await adminUpdateInternshipStatus(
      internship.value.id,
      InternshipStatus.PENDING_REVIEW_START
    );
    if (hasErrorResponse(response)) {
      toast.error(`${response.error}`);
    } else {
      toast.success(`${response.message?.detail}`);
      await getInternship();
    }
  }
};

/**
 * Changes the internship status to SUBMIT_END_FILES if the date is one week or less before the end date.
 */
const changeInternshipStatusToSubmitEndFiles = async (): Promise<void> => {
  const isDateOneWeekOrLessBefore = isOneWeekOrLessBeforeEndDate(
    internship.value.end_date
  );
  if (
    isDateOneWeekOrLessBefore &&
    internship.value.start_date &&
    internship.value.end_date
  ) {
    if (internship.value.id) {
      const response = await adminUpdateInternshipStatus(
        internship.value.id,
        InternshipStatus.SUBMIT_END_FILES
      );
      if (hasErrorResponse(response)) {
        toast.error(`${response.error}`);
      } else {
        toast.success(`${response.message?.detail}`);
        await getInternship();
      }
    }
  } else {
    const endDate = new Date(internship.value.end_date);
    const currentDate = new Date();
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(endDate.getDate() - 7);
    adjustedEndDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    const timeLeft = adjustedEndDate.getTime() - currentDate.getTime();
    const timeLeftConverted = convertMillisecondsToTime(timeLeft);
    if (!internship.value.start_date) {
      toast.error(`Δεν μπορείτε να πραγματοποιήσετε αυτήν την ενέργεια ακόμα.`);
    } else {
      toast.error(
        `Δεν μπορείτε να πραγματοποιήσετε αυτήν την ενέργεια ακόμα. Χρόνος που απομένει: ${timeLeftConverted.days} ημέρες, ${timeLeftConverted.hours} ώρες, ${timeLeftConverted.minutes} λεπτά.`
      );
    }
  }
};

/**
 * Changes the internship status to PENDING_REVIEW_END.
 */
const changeInternshipStatusToPendingReviewEnd = async (): Promise<void> => {
  if (internship.value.id) {
    const response = await adminUpdateInternshipStatus(
      internship.value.id,
      InternshipStatus.PENDING_REVIEW_END
    );
    if (hasErrorResponse(response)) {
      toast.error(`${response.error}`);
    } else {
      toast.success(`${response.message?.detail}`);
      await getInternship();
    }
  }
};

/**
 * Generates an OTP password for the company to submit the Questionnaire.
 */
const userGenerateOTP = async (): Promise<void> => {
  const response = await generateOTP();
  if (hasErrorResponse(response)) {
    toast.error(`${response.error}`);
  } else {
    OTPcode.value = response.data;
    toast.success(`${response.message?.detail}`);
  }
};

/**
 * Lifecycle hook to fetch internship and questionnaire answers on component mount.
 */
onMounted(async () => {
  await getInternship();
  await fetchDikaiologitikaTypes();
  await checkUserQuestionnaireAnswers();
  await checkCompanyQuestionnaireAnswers();
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.profile {
  @apply container mx-auto px-4 py-8 space-y-12;
}

.user-files {
  &--files {
    @apply shadow-lg border border-gray-200 rounded-lg p-6 bg-white mt-8;
  }

  &__create-internship-button {
    @apply flex justify-center;
  }

  &__header {
    @apply text-2xl font-semibold text-center my-4;
    color: $primary-dark-blue-color;
  }

  &__actions {
    @apply flex items-center justify-around;
  }

  &__controls {
    @apply flex flex-wrap justify-center gap-4 mt-4;
  }
}

:deep .v-data-table-server {
  @apply mt-4;
}

:deep .v-data-table__td,
:deep .v-data-table-header__content {
  @apply text-lg text-left md:text-base;
  color: $primary-dark-blue-color;
}

:deep .v-data-table-header__content {
  @apply font-bold;
}

:deep .v-alert__content {
  @apply flex flex-col justify-start;
}

:deep .v-alert-title {
  @apply flex self-start;
}
</style>
