<!-- eslint-disable vue/v-slot-style -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="adminPage">
    <div class="adminPage__section--statistics">
      <h3 class="adminPage__title">Στατιστικά Ερωτηματολογίου</h3>
      <p class="adminPage__hint">
        Προβολή σελίδας στατιστικών του ερωτηματολογίου των φοιτητών του
        τμήματος.
      </p>
      <BaseComponentsBaseButton
        class="m-auto"
        text="Σελίδα Στατιστικών"
        @click="navigateTo('/adminPage/statistics')"
      />
    </div>
    <section class="adminPage__section--files">
      <h2 class="adminPage__title">Πίνακας Φοιτητών</h2>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverUsers"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
        loading-text="Φόρτωση δεδομένων"
        no-data-text="Δεν βρέθηκαν φοιτητές"
        :sticky="true"
        :hover="true"
        density="comfortable"
        :show-current-page="true"
        @update:options="loadItems"
        @click:row="handleClick"
      >
        <template #tfoot>
          <tr>
            <td>
              <v-text-field
                v-model="searchAM"
                label="Αναζήτηση με ΑΜ"
                class="ma-2"
                variant="outlined"
                color="#112d4e"
                :clearable="true"
                prepend-inner-icon="fa:fas fa-search"
                hint="Αναζήτηση με βάση Αριθμού Μητρώου, πατήστε enter."
                @keyup.enter="applyFilter"
              ></v-text-field>
            </td>
          </tr>
        </template>
      </v-data-table-server>
      <p class="adminPage__hint">
        Επιλέξτε έναν φοιτητή για να δείτε τα δικαιολογητικά του.
      </p>
    </section>
    <!-- User Details Dialog -->
    <v-dialog
      v-model="openUsersFileDialog"
      class="adminPage__usersDialog"
      width="auto"
    >
      <v-card>
        <v-card-title class="adminPage__usersDialog--title"
          >Πληροφορίες Φοιτητή</v-card-title
        >
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Όνομα"
                  :model-value="selectedUser?.first_name"
                  readonly
                  outlined
                  color="primary-dark-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Επίθετο"
                  :model-value="selectedUser?.last_name"
                  readonly
                  outlined
                  color="primary-dark-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Αριθμός Μητρώου"
                  :model-value="selectedUser?.AM"
                  readonly
                  outlined
                  color="primary-dark-blue"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Files Table -->
            <v-data-table
              :headers="fileHeaders"
              :items="userFiles"
              item-key="id"
              :hover="true"
              class="elevation-1 mt-4"
              no-data-text="Δεν βρέθηκαν αρχεία"
            >
              <template v-slot:bottom> </template>
              <template #item.actions="{ item }">
                <v-icon
                  color="primary-blue-color"
                  icon="fa:fas fa-download "
                  @click="downloadFile(item)"
                ></v-icon>
              </template>
            </v-data-table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" @click="closeDialog">Κλείσιμο</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from "vue-toast-notification";
import { useAuthStore } from "@/stores/auth";
import { getUsersByAmAndRole } from "@/services/adminService";
import {
  fetchDikaiologitaFiles,
  downloadDikaiologitika,
} from "@/services/dikaiologitkaService";
import type { User, DikaiologitikaFile } from "@/types/dikaiologitika";

definePageMeta({
  middleware: ["is-admin", "auth"],
});

const $toast = useToast();
// Define reactive states
const searchAM = ref<string>("");
const totalItems = ref<number>(0);
const itemsPerPage = ref<number>(20);
const headers = ref([
  { title: "ID", key: "id", value: "id", sortable: false },
  { title: "ΟΝΟΜΑ", key: "first_name", value: "first_name", sortable: false },
  { title: "ΕΠΙΘΕΤΟ", key: "last_name", value: "last_name", sortable: false },
  { title: "ΑΡΙΘΜΟΣ ΜΗΤΡΩΟΥ", key: "AM", value: "AM", sortable: false },
]);

const fileHeaders = ref([
  { title: "ID", key: "id", sortable: false },
  { title: "ΕΙΔΟΣ ΑΡΧΕΙΟΥ", key: "description", sortable: false },
  { title: "ΗΜΕΡΟΜΗΝΙΑ ΕΠΕΞΕΡΓΑΣΙΑΣ", key: "date", sortable: false },
  { title: "ΟΝΟΜΑ ΑΡΧΕΙΟΥ", key: "file_name", sortable: false },
  { title: "ΕΠΙΛΟΓΕΣ", key: "actions", sortable: false },
]);

const authStore = useAuthStore();
const loading = ref<boolean>(true);
const serverUsers = ref<Array<User>>([]);
const openUsersFileDialog = ref<boolean>(false);
const selectedUser = ref<User | null>(null);
const userFiles = ref<Array<DikaiologitikaFile>>([]);
const filesLoading = ref<boolean>(false);

/**
 * Defines the options interface for pagination and filtering.
 */
interface LoadItemsOptions {
  page: number;
  itemsPerPage: number;
}

/**
 * Fetches user data based on current state of pagination and AM search term.
 */

const loadItems = async (options: LoadItemsOptions) => {
  loading.value = true;
  try {
    const result = await getUsersByAmAndRole(
      searchAM.value,
      "student",
      options.page,
      options.itemsPerPage,
    );
    serverUsers.value = result?.data ?? [];
    totalItems.value = result?.total_items ?? 0;
  } catch (error) {
    $toast.error(`${error}`, { position: "bottom" });
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

/**
 * Handles table row click to set the selected user and open the dialog.
 */
const handleClick = (_event: Event, row: { item: User }) => {
  selectedUser.value = row.item;
  openUsersFileDialog.value = true;
};

/**
 * Closes the user details dialog.
 */
const closeDialog = () => {
  openUsersFileDialog.value = false;
};

/**
 * Initializes the component by applying the current filters.
 */
onMounted(() => {
  applyFilter();
});

/**
 * Watches the selected user and loads files when a new user is selected.
 */
watch(selectedUser, async (newUser) => {
  if (newUser) {
    await loadUserFiles(newUser.id);
  }
});

/**
 * Fetches files for the given user ID and updates the state.
 */
const loadUserFiles = async (userId: number) => {
  filesLoading.value = true;
  try {
    const response = await fetchDikaiologitaFiles(
      userId,
      authStore.placements_access_token,
    );
    userFiles.value = response?.data.files ?? [];
  } catch (error) {
    $toast.error(`"Error fetching files:", ${error}`, { position: "bottom" });
  } finally {
    filesLoading.value = false;
  }
};

/**
 * Initiates the download of a specific file.
 */
const downloadFile = async (file: DikaiologitikaFile) => {
  await downloadDikaiologitika(file.id, authStore.placements_access_token);
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.adminPage {
  @apply container mx-auto px-4 py-8 space-y-12;

  &__section--files,
  &__section--statistics {
    @apply shadow-lg border border-gray-200 rounded-lg p-6 bg-white;
  }

  &__title {
    @apply text-2xl md:text-3xl font-bold text-center mb-4;
    color: $primary-dark-blue-color;
  }

  &__hint {
    @apply text-lg text-center mt-4;
    color: $primary-dark-blue-color;
  }
  &__usersDialog {
    &--title {
      @apply font-bold;
      color: $primary-dark-blue-color;
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
