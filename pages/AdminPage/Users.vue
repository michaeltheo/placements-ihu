<!-- eslint-disable vue/v-on-event-hyphenation -->
<!-- eslint-disable vue/v-slot-style -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="adminPage">
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
        no-data-text="Δεν βρέθηκαν χρήστες"
        :sticky="true"
        :hover="true"
        density="comfortable"
        :show-current-page="true"
        @update:options="loadItems"
        @click:row="handleClick"
      >
        <template #tfoot>
          <tr class="flex mt-3">
            <td>
              <v-text-field
                v-model="searchAM"
                label="Αναζήτηση με ΑΜ"
                class="ma-2"
                variant="outlined"
                color="#112d4e"
                :clearable="true"
                prepend-inner-icon="fa:fas fa-search"
                hint="Αναζήτηση με βάση Αριθμού Μητρώου"
                @update:model-value="applyFilter"
              ></v-text-field>
            </td>
            <td>
              <v-select
                v-model="selectedRole"
                :items="userRoles"
                clearable
                class="ma-2"
                label="Επιλέξτε ρόλο"
                variant="outlined"
                color="#112d4e"
                hint="Αναζήτηση με βάση τον ρόλο του χρήστη"
                dense
                @update:model-value="applyFilter"
              ></v-select>
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
                  :model-value="selectedUser?.first_name ?? 'N/A'"
                  readonly
                  variant="outlined"
                  class="adminPage__usersDialog--firstName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Επίθετο"
                  :model-value="selectedUser?.last_name ?? 'N/A'"
                  readonly
                  variant="outlined"
                  class="adminPage__usersDialog--lastName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Αριθμός Μητρώου"
                  :model-value="selectedUser?.AM ?? 'N/A'"
                  readonly
                  variant="outlined"
                  class="adminPage__usersDialog--AM"
                ></v-text-field>
                <v-text-field
                  label="Έτος Εγγραφής"
                  :model-value="selectedUser?.reg_year ?? 'N/A'"
                  readonly
                  variant="outlined"
                  class="adminPage__usersDialog--regYear"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Email"
                  :model-value="selectedUser?.email"
                  readonly
                  variant="outlined"
                  class="adminPage__usersDialog--email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="adminPage__usersDialog--role-switcher">
                  <v-text-field
                    label="Role"
                    :model-value="selectedUser?.role"
                    readonly
                    variant="outlined"
                    class="adminPage__usersDialog--role"
                  ></v-text-field>
                  <div v-if="selectedUser?.role === UserRole.STUDENT">
                    <v-btn
                      tonal
                      elevation="4"
                      color="primary-blue-color"
                      @click="setUserAsAdmin(selectedUser?.id)"
                    >
                      Μετατροπή Ρόλου σε Διαχειριστή
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn
                      color="indigo-darken-1"
                      @click="setUserasStudent(selectedUser?.id)"
                    >
                      Μετατροπή Ρόλου σε Φοιτητή
                    </v-btn>
                  </div>
                </div>
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
              <template #item.actions="{ item }">
                <v-btn variant="plain" @click="downloadFile(item)">
                  <v-icon color="primary-blue-color">
                    fa:fas fa-download
                  </v-icon>
                  <v-tooltip activator="parent" location="top"
                    >Κατέβασμα Αρχείου</v-tooltip
                  >
                </v-btn>
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
import { UserRole } from "@/types";
import { User } from "@/types/user";
import {
  getUsersByAmAndRole,
  adminSetUserAsAdmin,
  adminSetUserAsStudent,
} from "@/services/adminService";
import {
  fetchDikaiologitaFiles,
  downloadDikaiologitika,
} from "@/services/dikaiologitkaService";
import type { DikaiologitikaFile } from "@/types/dikaiologitika";
import { hasErrorResponse } from "@/services/errorHandling";

// Define page metadata
definePageMeta({
  middleware: ["is-admin", "auth"],
});

// Define state
const $toast = useToast();
const searchAM = ref<string>("");
const selectedRole = ref<UserRole>();
const userRoles = Object.values(UserRole);
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

const loading = ref<boolean>(true);
const serverUsers = ref<User[]>([]);
const openUsersFileDialog = ref<boolean>(false);
const selectedUser = ref<User | null>(null);
const userFiles = ref<Array<DikaiologitikaFile>>([]);
const filesLoading = ref<boolean>(false);

/**
 * Interface for pagination and filtering options.
 */
interface LoadItemsOptions {
  page: number;
  itemsPerPage: number;
}

/**
 * Fetches user data based on current state of pagination and AM search term.
 * @param options - Pagination and filtering options.
 */
const loadItems = async (options: LoadItemsOptions) => {
  loading.value = true;
  try {
    const result = await getUsersByAmAndRole(
      searchAM.value,
      selectedRole.value,
      options.page,
      options.itemsPerPage,
    );
    if (hasErrorResponse(result)) {
      $toast.error(`${result.error}`, { position: "top" });
    } else {
      serverUsers.value = result.data ?? [];
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

/**
 * Handles table row click to set the selected user and open the dialog.
 * @param _event - The click event.
 * @param row - The row data containing the user.
 */
const handleClick = async (_event: Event, row: { item: User }) => {
  selectedUser.value = row.item;
  openUsersFileDialog.value = true;
  await loadUserFiles(row.item.id);
};

/**
 * Closes the user details dialog.
 */
const closeDialog = () => {
  openUsersFileDialog.value = false;
};

/**
 * Fetches files for the given user ID and updates the state.
 * @param userId - The ID of the user.
 */
const loadUserFiles = async (userId: number) => {
  filesLoading.value = true;
  try {
    const response = await fetchDikaiologitaFiles(userId);
    userFiles.value = response?.data.files ?? [];
  } catch (error) {
    $toast.error(`Error fetching files: ${error}`, { position: "bottom" });
  } finally {
    filesLoading.value = false;
  }
};

/**
 * Sets the selected user as admin.
 * @param userId - The ID of the user.
 */
const setUserAsAdmin = async (userId: number | undefined) => {
  if (userId === undefined) return;
  const response = await adminSetUserAsAdmin(userId);
  closeDialog();
  if (hasErrorResponse(response)) {
    $toast.error(`${response.error}`, { position: "bottom" });
  } else {
    $toast.success(`${response.detail}`, { position: "bottom" });
  }
};
/**
 * Sets the selected user as admin.
 * @param userId - The ID of the user.
 */
const setUserasStudent = async (userId: number | undefined) => {
  if (userId === undefined) return;
  const response = await adminSetUserAsStudent(userId);
  closeDialog();
  if (hasErrorResponse(response)) {
    $toast.error(`${response.error}`, { position: "bottom" });
  } else {
    $toast.success(`${response.detail}`, { position: "bottom" });
  }
};

/**
 * Initiates the download of a specific file.
 * @param file - The file to download.
 */
const downloadFile = async (file: DikaiologitikaFile) => {
  await downloadDikaiologitika(file.id);
};

// Initial data fetch when the component is mounted
onMounted(() => {
  applyFilter();
});
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
    &--role-switcher {
      @apply items-center  space-y-2;
    }

    &--title {
      @apply font-bold;
      color: $primary-dark-blue-color;
    }
    &--firstName,
    &--lastName,
    &--AM,
    &--regYear,
    &--role,
    &--email {
      color: $primary-blue-color;
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
