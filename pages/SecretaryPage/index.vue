<template>
  <div class="intersnshipPage" data-aos="flip-up" data-aos-duration="1000">
    <section class="intersnshipPage__container">
      <h2 class="intersnshipPage__title">Πίνακας Πρακτικής</h2>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverInternships"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
        loading-text="Φόρτωση δεδομένων"
        no-data-text="Δεν βρέθηκαν πρακτικτές"
        :sticky="true"
        :hover="true"
        density="comfortable"
        :show-current-page="true"
        @update:options="loadItems"
        @click:row="handleClick"
      >
        <template #item.user_am="{ item }">
          <span>{{ item.user_am || "N/A" }}</span>
        </template>
        <template #item.user_first_name="{ item }">
          <span>{{ item.user_first_name || "N/A" }}</span>
        </template>
        <template #item.user_last_name="{ item }">
          <span>{{ item.user_last_name || "N/A" }}</span>
        </template>
        <template #item.status="{ item }">
          <v-chip :color="getColorForStatus(item.status)">
            {{ item.status || "N/A" }}
          </v-chip>
        </template>
        <template #item.department="{ item }">
          <v-chip :color="getColorForDepartment(item.department)">
            {{ item.department || "N/A" }}
          </v-chip>
        </template>
      </v-data-table-server>
      <div class="intersnshipPage__table-filters">
        <v-text-field
          v-model="searchAM"
          label="Αναζήτηση με ΑΜ"
          class="ma-2"
          variant="outlined"
          color="primary-dark-blue"
          :clearable="true"
          prepend-inner-icon="fa:fas fa-search"
          hint="Αναζήτηση με βάση Αριθμού Μητρώου"
          @update:model-value="applyFilter"
        ></v-text-field>
        <v-select
          v-model="selectedDepartment"
          :items="departmentOptions"
          clearable
          class="ma-2"
          label="Επιλέξτε Τμήμα"
          variant="outlined"
          color="primary-dark-blue"
          hint="Αναζήτηση με βάση το τμήμα"
          dense
          @update:model-value="applyFilter"
        ></v-select>

        <v-select
          v-if="selectedDepartment"
          v-model="selectedProgram"
          :items="filteredProgramOptions"
          clearable
          class="ma-2"
          label="Επιλέξτε πρόγραμμα πρακτικής"
          variant="outlined"
          color="primary-dark-blue"
          hint="Αναζήτηση με βάση το πρόγραμμα πρακτικής"
          dense
          @update:model-value="applyFilter"
        ></v-select>

        <v-select
          v-model="selectedStatus"
          :items="InternshipsStatus"
          clearable
          class="ma-2"
          label="Επιλέξτε κατάσταση πρακτικής"
          variant="outlined"
          color="primary-dark-blue"
          hint="Αναζήτηση με βάση την κατάσταση πρακτικής"
          dense
          @update:model-value="applyFilter"
        ></v-select>
      </div>

      <p class="intersnshipPage__hint">
        Επιλέξτε έναν φοιτητή για να δείτε την Αίτηση Πρακτικής Ασκησης του και
        για υποβάλετε την Βεβαίωση Πρακτικής Ασκησης.
      </p>
      <div class="intersnshipPage__buttons">
        <v-btn
          elevation="4"
          class="intersnshipPage__buttons--refresh"
          append-icon="fa:fas fa-arrows-rotate"
          @click="loadItems"
        >
          Ανανέωση Πίνακα
        </v-btn>
      </div>

      <SecretaryDialogInternship
        :model-value="openSecretaryInternshipDialog"
        :internship="selectedInternship"
        @refreshInternshipList="applyFilter"
        @update:model-value="handleSecretaryInternshipDialogClose"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import { getAllInternships } from "@/services/internshipService";
import { Department, InternshipProgram, InternshipStatus } from "@/types";
import { InternshipRead } from "@/types/internship";
import { hasErrorResponse } from "@/services/errorHandling";

/**
 * Interface for pagination and filtering options.
 */
interface LoadItemsOptions {
  page: number;
  itemsPerPage: number;
}
definePageMeta({
  middleware: ["auth", "is-secretary"],
});
useHead({
  title: "Σελίδα Γραμματείας",
});

const searchAM = ref<string>("");
const selectedProgram = ref<InternshipProgram | undefined>(undefined);
const selectedStatus = ref<InternshipStatus | undefined>(
  InternshipStatus.SUBMIT_STAT_FILES_WITHOUT_SECRETARY_CERTIFICATION
);
const selectedInternship = ref<InternshipRead | undefined>(undefined);
const selectedDepartment = ref<Department | undefined>(undefined);
const openSecretaryInternshipDialog = ref<boolean>(false);
const totalItems = ref<number | undefined>(0);
const itemsPerPage = ref<number>(20);
const loading = ref<boolean>(true);
const serverInternships = ref<InternshipRead[]>([]);
const InternshipsStatus = [
  InternshipStatus.SUBMIT_STAT_FILES_WITHOUT_SECRETARY_CERTIFICATION,
  InternshipStatus.SUBMIT_START_FILES,
];
const headers = ref([
  {
    title: "ΑΡΙΘΜΟΣ ΜΗΤΡΩΟΥ",
    key: "user_am",
    value: "user_am",
    sortable: false,
  },
  {
    title: "ΟΝΟΜΑ",
    key: "user_first_name",
    value: "user_first_name",
    sortable: false,
  },
  {
    title: "ΕΠΙΘΕΤΟ",
    key: "user_last_name",
    value: "user_last_name",
    sortable: false,
  },
  { title: "STATUS", key: "status", value: "status", sortable: false },
  { title: "ΤΜΗΜΑ", key: "department", value: "department", sortable: false },
]);

const loadItems = async (options: LoadItemsOptions) => {
  loading.value = true;
  try {
    const result = await getAllInternships(
      selectedStatus.value,
      selectedDepartment.value,
      selectedProgram.value,
      searchAM.value,
      undefined,
      true,
      options.page,
      options.itemsPerPage
    );
    if (hasErrorResponse(result)) {
      toast.error(`${result.error}`);
    } else {
      serverInternships.value = result.data ?? [];
      totalItems.value = result.total_items;
    }
  } finally {
    loading.value = false;
  }
};

// Get color based on program status
const getColorForStatus = (status: string): string => {
  if (status === InternshipStatus.ACTIVE) {
    return "green";
  } else if (
    status === InternshipStatus.PENDING_REVIEW_END ||
    status === InternshipStatus.PENDING_REVIEW_START
  ) {
    return "orange";
  } else if (status === InternshipStatus.ENDED) {
    return "red";
  } else if (
    status === InternshipStatus.SUBMIT_START_FILES ||
    status === InternshipStatus.SUBMIT_END_FILES ||
    status ===
      InternshipStatus.SUBMIT_STAT_FILES_WITHOUT_SECRETARY_CERTIFICATION
  ) {
    return "orange-darken-1";
  }
  return "default";
};

// Get color based on internship department
const getColorForDepartment = (department: string): string => {
  if (department === Department.IT_TEITHE) {
    return "teal-lighten-1";
  } else if (department === Department.EL_TEITHE) {
    return "light-blue-darken-1";
  } else if (department === Department.IHU_IEE) {
    return "orange-lighten-3";
  }
  return "default";
};

/**
 * Applies the current search filter and triggers data re-fetch.
 */
const applyFilter = () => {
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value });
};

/**
 * Handles table row click to set the selected user and open the dialog.
 * @param _event - The click event.
 * @param row - The row data containing the user.
 */
const handleClick = (_event: Event, row: { item: InternshipRead }) => {
  selectedInternship.value = row.item;

  openSecretaryInternshipDialog.value = true;
};

// Handle internship dialog close
const handleSecretaryInternshipDialogClose = (newValue: boolean) => {
  openSecretaryInternshipDialog.value = newValue;
  if (!newValue) {
    selectedInternship.value = undefined;
  }
};

// Watcher to clear selectedProgram when selectedDepartment changes
watch(
  () => selectedDepartment.value,
  () => {
    selectedProgram.value = undefined;
    applyFilter();
  }
);

// Options for departments and programs
const departmentOptions = Object.values(Department);
const programOptions: Record<Department, InternshipProgram[]> = {
  [Department.IT_TEITHE]: [
    InternshipProgram.TEITHE_OAED,
    InternshipProgram.ESPA,
    InternshipProgram.TEITHE_JOB_RECOGNITION,
  ],
  [Department.EL_TEITHE]: [
    InternshipProgram.TEITHE_OAED,
    InternshipProgram.ESPA,
    InternshipProgram.TEITHE_JOB_RECOGNITION,
  ],
  [Department.IHU_IEE]: [
    InternshipProgram.ESPA,
    InternshipProgram.EMPLOYER_DECLARATION_OF_RESPONSIBILITY,
  ],
};

// Computed property to get filtered program options based on selected department
const filteredProgramOptions = computed(() => {
  return selectedDepartment.value
    ? programOptions[selectedDepartment.value]
    : [];
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.intersnshipPage {
  @apply mx-auto px-4 py-8 space-y-12;
  &__container {
    @apply shadow-lg border border-gray-200 rounded-lg p-6 bg-white;
  }

  &__title {
    @apply text-2xl md:text-3xl font-bold text-center mb-4;
    color: $primary-dark-blue-color;
  }
  &__table-filters {
    @apply flex flex-wrap items-baseline h-auto mt-5 p-2 gap-4;
    td {
      min-width: 10rem;
    }
  }
  &__hint {
    @apply text-lg text-center mt-4;
    color: $primary-dark-blue-color;
  }
  &__buttons {
    @apply flex justify-center mt-5;
    &--refresh {
      @apply text-base text-white transition-transform duration-200 my-5 md:my-0 md:w-1/4;
      background-color: $primary-blue-color;
      &:hover {
        transform: translateY(-7px);
      }
    }
    &--download {
      @apply bg-green-500 mr-2 hover:bg-green-700 text-white text-base my-5 md:my-0 md:w-1/4;
      &:hover {
        transform: translateY(-7px);
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
