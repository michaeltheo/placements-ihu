<!-- eslint-disable vue/v-on-event-hyphenation -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <section class="profile__section profile__section--files">
    <h2 class="profile__header">Δικαιολογητικά</h2>
    <div v-if="!hasInternship" class="profile__create-internship-button">
      <v-btn
        color="primary-blue-color"
        @click="openCreateInternshipDialog = true"
      >
        Δημιουργία Πρακτικής Άσκησης
      </v-btn>
      <CreateInternshipDialog
        :model-value="openCreateInternshipDialog"
        @update:modelValue="handleCreateInternshipDialogClose"
        @internshipCreated="handleInternshipCreated"
      />
    </div>
    <div v-else>
      <ProfileInternshipData :internship="internship" />
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
          <div class="profile__actions">
            <v-icon
              color="warning"
              icon="fa:fas fa-pen-to-square"
              size="large"
              @click="editItem(item)"
            ></v-icon>
            <v-icon
              color="primary-blue-color"
              icon="fa:fas fa-download"
              size="large"
              @click="downloadFile(item)"
            ></v-icon>
            <v-icon
              icon="fa:fas fa-trash"
              size="large"
              color="error"
              @click="deleteItem(item)"
            />
          </div>
        </template>
      </v-data-table-server>
      <div class="profile__controls">
        <v-btn
          elevation="4"
          color="#112d4e"
          append-icon="fa:fas fa-arrows-rotate"
          @click="loadItems"
        >
          Ανανέωση Πίνακα
        </v-btn>
        <v-btn
          elevation="4"
          color="green-lighten-1"
          @click="openAddFilesDialog = true"
        >
          Προσθήκη Αρχείου
        </v-btn>
        <v-btn
          v-if="
            hasInternship &&
            internship.status !== InternshipStatus.PENDING_REVIEW
          "
          elevation="4"
          color="orange-darken-3"
          @click="openCreateInternshipDialog = true"
        >
          Ενημέρωση Πρακτικής
        </v-btn>
      </div>
      <FileUploadDialog
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
      <CreateInternshipDialog
        v-if="
          hasInternship && internship.status !== InternshipStatus.PENDING_REVIEW
        "
        :model-value="openCreateInternshipDialog"
        :is-update="true"
        :internship="internship"
        @update:modelValue="handleCreateInternshipDialogClose"
        @internshipUpdated="handleInternshipUpdated"
        @refreshInternship="getInternship"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useDikaiologitkaStore } from "@/stores/dikaiologitika";
import { useAuthStore } from "@/stores/auth";
import {
  downloadDikaiologitika,
  fetchDikaiologitaFiles,
  getDikaiologitkaTypes,
} from "@/services/dikaiologitkaService";
import { getInternshipByUser } from "@/services/internshipService";
import { errorLog } from "@/utils/log";
import { submissionTime, InternshipStatus } from "@/constants/ApiConstants ";
import type { DikaiologitikaFile } from "@/types/dikaiologitika";
import FileUploadDialog from "@/components/FileUploadDialog.vue";
import DeleteFileDialog from "@/components/DeleteFileDialog.vue";
import CreateInternshipDialog from "@/components/CreateInternshipDialog.vue";

// Store references and reactive properties
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
const loading = ref(true);
const openAddFilesDialog = ref(false);
const openDeleteFileDialog = ref(false);
const openCreateInternshipDialog = ref(false);
const totalItems = ref(0);
const hasInternship = ref(false);
const internship = ref<any>(null);

// Load files from server
const loadItems = async () => {
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

// Fetch internship details
const getInternship = async () => {
  const response = await getInternshipByUser(authStore.user.id);
  if (response && !("error" in response)) {
    hasInternship.value = true;
    internship.value = response.data;
  } else {
    hasInternship.value = false;
  }
};

// Handle create internship dialog close
const handleCreateInternshipDialogClose = (newValue: boolean) => {
  openCreateInternshipDialog.value = newValue;
};

// Handle internship creation
const handleInternshipCreated = (newInternship: any) => {
  hasInternship.value = true;
  internship.value = newInternship;
  openCreateInternshipDialog.value = false;
  loadItems();
};

// Handle internship update
const handleInternshipUpdated = (updatedInternship: any) => {
  internship.value = updatedInternship;
  openCreateInternshipDialog.value = false;
  getInternship(); // Fetch the updated internship data
};

// Edit file item
const editItem = (item: DikaiologitikaFile) => {
  selectedItem.value = item;
  openAddFilesDialog.value = true;
};

// Handle file upload dialog close
const handleDialogClose = (newValue: boolean) => {
  openAddFilesDialog.value = newValue;
  if (!newValue) {
    selectedItem.value = null; // Reset selectedItem
  }
};

// Handle file delete dialog close
const handleDeleteDialogClose = (newValue: boolean) => {
  openDeleteFileDialog.value = newValue;
  if (!newValue) {
    selectedItem.value = null; // Reset selectedItem
  }
};

// Download file
const downloadFile = async (item: DikaiologitikaFile) => {
  await downloadDikaiologitika(item.id);
};

// Delete file item
const deleteItem = (item: DikaiologitikaFile) => {
  selectedItem.value = item;
  openDeleteFileDialog.value = true;
};

// Get color based on submission time
const getColor = (fileSubmissionTime: string): string => {
  if (fileSubmissionTime === submissionTime.start) {
    return "green";
  } else if (fileSubmissionTime === submissionTime.end) {
    return "teal";
  }
  return "default";
};

// On component mount, fetch data
onMounted(async () => {
  await getInternship();

  const response = await getDikaiologitkaTypes();
  if (response) {
    if (internship.value.status === InternshipStatus.PENDING_REVIEW) {
      for (const [program, types] of Object.entries(response.data)) {
        response.data[program] = types.filter(
          (type: any) => type.submission_time === submissionTime.start,
        );
      }
    }
    dikaiologitikaStore.setDikaiologitka(response.data);
  }

  if (hasInternship.value) {
    await loadItems();
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.profile__section--files {
  @apply shadow-lg border border-gray-200 rounded-lg p-6 bg-white mt-8;

  .profile__create-internship-button {
    @apply flex justify-center;
  }

  .profile__header {
    @apply text-2xl font-semibold text-center my-4;
    color: $primary-dark-blue-color;
  }

  .profile__actions {
    @apply flex items-center justify-around;
  }

  .profile__controls {
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
  font-weight: bold;
}
</style>
