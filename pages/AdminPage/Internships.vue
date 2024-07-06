<template>
  <div class="intersnshipPage" data-aos="flip-up" data-aos-duration="1000">
    <section class="intersnshipPage__container">
      <h2 class="intersnshipPage__title">Πίκανας Πρακτικής</h2>
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
        <!-- <template #item.department="{ item }">
          <v-chip :color="getColorForDepartment(item.department)">
            {{ item.department || "N/A" }}
          </v-chip>
        </template> -->
        <template #item.program="{ item }">
          <v-chip :color="getColorForProgram(item.program)">
            {{ item.program || "N/A" }}
          </v-chip>
        </template>
        <template #item.company_name="{ item }">
          <span>{{ item.company_name || "N/A" }}</span>
        </template>
        <template #item.start_date="{ item }">
          <span>{{ formatDate(item?.start_date) }}</span>
        </template>
        <template #item.end_date="{ item }">
          <span>{{ formatDate(item?.end_date) }}</span>
        </template>
        <template #item.actions="{ item }">
          <v-btn variant="plain" @click="deleteItem($event, item)">
            <v-icon color="error"> fa:fas fa-trash </v-icon>
            <v-tooltip activator="parent" location="top"
              >Διαγραφή Πρακτικής</v-tooltip
            >
          </v-btn>
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
        <v-autocomplete
          v-model="companyName"
          v-model:search-input="searchCompanyName"
          :items="companyOptions"
          item-value="name"
          item-title="name"
          label="Επιλέξτε Εταιρεία"
          variant="outlined"
          dense
          clearable
          @update:search-input="fetchCompanies"
          @update:model-value="applyFilter"
        ></v-autocomplete>
      </div>

      <p class="intersnshipPage__hint">
        Επιλέξτε έναν φοιτητή για να δείτε τα δικαιολογητικά του.
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
      <AdminDialogDeleteInternship
        :model-value="openDeleteInternshipDialog"
        :internship="selectedInternship"
        @refreshInternshipList="applyFilter"
        @update:model-value="handleDeleteDialogClose"
      />
      <AdminDialogInternship
        :model-value="openInternshipDialog"
        :internship="selectedInternship"
        @refreshInternshipList="applyFilter"
        @update:model-value="handleInternshipDialogClose"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import { getAllInternships } from "@/services/internshipService";
import { Department, InternshipProgram, InternshipStatus } from "@/types";
import { InternshipRead } from "@/types/internship";
import { hasErrorResponse } from "@/services/errorHandling";
import { getAllCompanies } from "@/services/companyService";
import { Company } from "@/types/company";

/**
 * Interface for pagination and filtering options.
 */
interface LoadItemsOptions {
  page: number;
  itemsPerPage: number;
}

definePageMeta({
  middleware: ["is-admin", "auth"],
});

const searchAM = ref<string>("");
const searchCompanyName = ref<string>("");
const selectedProgram = ref<InternshipProgram | undefined>(undefined);
const selectedStatus = ref<InternshipStatus | undefined>(undefined);
const selectedInternship = ref<InternshipRead | undefined>(undefined);
const selectedDepartment = ref<Department | undefined>(undefined);
const openDeleteInternshipDialog = ref<boolean>(false);
const openInternshipDialog = ref<boolean>(false);
const totalItems = ref<number | undefined>(0);
const itemsPerPage = ref<number>(20);
const loading = ref<boolean>(true);
const companyName = ref<string | undefined>();
const companyOptions = ref<Company[]>([]);
const serverInternships = ref<InternshipRead[]>([]);
const InternshipsStatus = Object.values(InternshipStatus);

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
  // { title: "ΤΜΗΜΑ", key: "department", value: "department", sortable: false },
  { title: "ΠΡΟΓΡΑΜΜΑ", key: "program", value: "program", sortable: false },
  {
    title: "ΟΝΟΜΑ ΕΤΑΙΡΕΙΑΣ",
    key: "company_name",
    value: "company_name",
    sortable: false,
  },
  {
    title: "ΗΜΕΡΟΜΗΝΙΑ ΕΝΑΡΞΗΣ",
    key: "start_date",
    value: "start_date",
    sortable: false,
  },
  {
    title: "ΗΜΕΡΟΜΗΝΙΑ ΛΗΞΗΣ",
    key: "end_date",
    value: "end_date",
    sortable: false,
  },
  { title: "ΕΠΙΛΟΓΕΣ", key: "actions", sortable: false },
]);

const loadItems = async (options: LoadItemsOptions) => {
  loading.value = true;
  try {
    const result = await getAllInternships(
      selectedStatus.value,
      selectedDepartment.value,
      selectedProgram.value,
      searchAM.value,
      companyName.value,
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

/**
 * Fetch companies based on search input
 */
const fetchCompanies = async () => {
  const response = await getAllCompanies(
    undefined,
    undefined,
    searchCompanyName.value
  );
  if (response.data && !hasErrorResponse(response)) {
    companyOptions.value = response.data;
  } else {
    companyOptions.value = [];
  }
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

// Get color based on program status
const getColorForStatus = (status: string): string => {
  if (status === InternshipStatus.ACTIVE) {
    return "green";
  } else if (status === InternshipStatus.PENDING_REVIEW) {
    return "orange";
  } else if (status === InternshipStatus.ENDED) {
    return "red";
  }
  return "default";
};
// Get color based on program status
const getColorForProgram = (status: string): string => {
  if (status === InternshipProgram.TEITHE_OAED) {
    return "cyan";
  } else if (status === InternshipProgram.ESPA) {
    return "secondary";
  } else if (status === InternshipProgram.TEITHE_JOB_RECOGNITION) {
    return "green";
  }
  return "default";
};

// Get color based on internship department
// const getColorForDepartment = (department: string): string => {
//   if (department === Department.IT_TEITHE) {
//     return "teal-lighten-1";
//   } else if (department === Department.EL_TEITHE) {
//     return "light-blue-darken-1";
//   } else if (department === Department.IHU_IEE) {
//     return "orange-lighten-3";
//   }
//   return "default";
// };

/**
 * Applies the current search filter and triggers data re-fetch.
 */
const applyFilter = () => {
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value });
};

// Handle delete internship dialog close
const handleDeleteDialogClose = (newValue: boolean) => {
  openDeleteInternshipDialog.value = newValue;
  if (!newValue) {
    selectedInternship.value = undefined;
  }
};

/**
 * Handles table row click to set the selected user and open the dialog.
 * @param _event - The click event.
 * @param row - The row data containing the user.
 */
const handleClick = (_event: Event, row: { item: InternshipRead }) => {
  selectedInternship.value = row.item;
  openInternshipDialog.value = true;
};

// Handle internship dialog close
const handleInternshipDialogClose = (newValue: boolean) => {
  openInternshipDialog.value = newValue;
  if (!newValue) {
    selectedInternship.value = undefined;
  }
};

/**
 * Deletes an internship item and opens the delete dialog.
 * @param event - The click event.
 * @param item - The internship item to delete.
 */
const deleteItem = (event: Event, item: InternshipRead) => {
  event.stopPropagation();
  selectedInternship.value = item;
  openDeleteInternshipDialog.value = true;
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

// Fetch companies on mount
onMounted(async () => {
  await fetchCompanies();
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
