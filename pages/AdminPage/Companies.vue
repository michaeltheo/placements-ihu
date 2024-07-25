<template>
  <div class="companies-page" data-aos="flip-up" data-aos-duration="1000">
    <section class="companies-page__container">
      <h2 class="companies-page__title">Πίνακας Εταιρειών</h2>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverCompanies"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
        class="companies-page__table"
        loading-text="Φόρτωση δεδομένων"
        no-data-text="Δεν βρέθηκαν εταιρείες"
        :sticky="true"
        density="comfortable"
        :show-current-page="true"
        @update:options="loadItems"
      >
        <template #item.actions="{ item }">
          <div class="companies-page__actions">
            <v-btn variant="plain" @click="editCompany(item)">
              <v-icon color="warning">fa:fas fa-pen-to-square</v-icon>
              <v-tooltip activator="parent" location="top"
                >Επεξεργασία Εταιρείας</v-tooltip
              >
            </v-btn>
            <v-btn variant="plain" @click="deleteCompany(item)">
              <v-icon color="error">fa:fas fa-trash</v-icon>
              <v-tooltip activator="parent" location="top"
                >Διαγραφή Εταιρείας</v-tooltip
              >
            </v-btn>
          </div>
        </template>
        <template #tfoot>
          <tr class="companies-page__filters">
            <td>
              <v-text-field
                v-model="searchCompanyName"
                label="Αναζήτηση με το Όνομα"
                class="ma-2"
                variant="outlined"
                color="primary-dark-blue"
                :clearable="true"
                prepend-inner-icon="fa:fas fa-search"
                hint="Αναζήτηση με βάση το Όνομα της Εταιρείας"
                @update:model-value="applyFilter"
              ></v-text-field>
            </td>
          </tr>
        </template>
      </v-data-table-server>
      <div class="companies-page__buttons">
        <v-btn
          elevation="4"
          color="primary-dark-blue"
          class="companies-page__buttons--refresh"
          append-icon="fa:fas fa-arrows-rotate"
          @click="loadItems"
        >
          Ανανέωση Πίνακα
        </v-btn>
        <v-btn
          elevation="4"
          class="companies-page__buttons--add"
          color="green-lighten-1"
          append-icon="fa:fas fa-plus"
          @click="openCompanyDialog = true"
        >
          Προσθήκη Εταιρείας
        </v-btn>
      </div>
      <AdminDialogDeleteCompany
        :model-value="openDeleteCompanyDialog"
        :company="selectedCompany"
        @refreshCompaniesList="applyFilter"
        @update:model-value="handleDeleteDialogClose"
      />
      <AdminDialogCreateUpdateCompany
        :model-value="openCompanyDialog"
        :editCompany="selectedCompany"
        @refreshCompaniesList="applyFilter"
        @update:model-value="handleCompanyDialogClose"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import { hasErrorResponse } from "@/services/errorHandling";
import { getAllCompanies } from "@/services/companyService";
import { Company } from "@/types/company";
useHead({
  title: "Πίνακας Εταιρειών",
});
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

const searchCompanyName = ref<string>("");
const serverCompanies = ref<Company[]>([]);
const openDeleteCompanyDialog = ref<boolean>(false);
const openCompanyDialog = ref<boolean>(false);
const totalItems = ref<number | undefined>(0);
const itemsPerPage = ref<number>(20);
const selectedCompany = ref<Company>();
const loading = ref<boolean>(true);

const headers = ref([
  {
    title: "ΟΝΟΜΑ",
    key: "name",
    value: "name",
    sortable: false,
  },
  {
    title: "Α.Φ.Μ",
    key: "AFM",
    value: "AFM",
    sortable: false,
  },
  { title: "ΕΠΙΛΟΓΕΣ", key: "actions", sortable: false },
]);

const loadItems = async (options: LoadItemsOptions) => {
  loading.value = true;
  try {
    const result = await getAllCompanies(
      options.page,
      options.itemsPerPage,
      searchCompanyName.value,
    );
    if (hasErrorResponse(result)) {
      toast.error(`${result.error}`);
    } else {
      serverCompanies.value = result.data ?? [];
      totalItems.value = result.total_items;
    }
  } finally {
    loading.value = false;
  }
};

/**
 * Applies the current search filter and triggers data re-fetch.
 */
const applyFilter = () => {
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value });
};

// Handle delete company dialog close
const handleDeleteDialogClose = (newValue: boolean) => {
  openDeleteCompanyDialog.value = newValue;
  if (!newValue) {
    selectedCompany.value = undefined;
  }
};

// Delete company
const deleteCompany = (item: Company) => {
  selectedCompany.value = item;
  openDeleteCompanyDialog.value = true;
};

// Edit company
const editCompany = (item: Company) => {
  selectedCompany.value = item;
  openCompanyDialog.value = true;
};

// Handle company dialog close
const handleCompanyDialogClose = (newValue: boolean) => {
  openCompanyDialog.value = newValue;
  if (!newValue) {
    selectedCompany.value = undefined;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.companies-page {
  @apply mx-auto px-4 py-8 space-y-12 flex justify-center;

  &__container {
    @apply shadow-lg border border-gray-200 rounded-lg p-6 bg-white w-full md:w-2/3;
  }
  &__table {
    @apply w-full text-lg;
  }

  &__actions {
    @apply flex space-x-2;
  }

  &__filters td {
    @apply min-w-[10rem] md:min-w-[15rem];
  }

  &__buttons {
    @apply mt-6 w-full flex flex-col md:flex-row md:justify-around;

    &--refresh,
    &--add {
      @apply transition-transform duration-200 my-5 md:my-0;

      &:hover {
        transform: translateY(-7px);
      }
    }
  }
}

.companies-page__title {
  @apply text-2xl md:text-3xl font-bold text-center mb-4;
  color: $primary-dark-blue-color;
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
