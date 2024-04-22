<template>
  <div class="profile">
    <section class="profile__section profile__section--files">
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverUsers"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
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
                hint="Αναζήτηση με βάση Αριθμού Μηρτρώου, πατήστε enter."
                @keyup.enter="applyFilter"
              ></v-text-field>
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { getUsersByAmAndRole } from "@/services/adminService";
import { User } from "@/types/dikaiologitika";

// Middleware to check if user is admin before allowing access to this component
definePageMeta({
  middleware: [
    function () {
      const authStore = useAuthStore();
      if (!authStore.user.isAdmin) navigateTo("/"); // Redirect to homePage if not admin
    },
  ],
});

// State management for the component
const searchAM: Ref<string> = ref(""); // Holds the AM number entered by the user for searching
const totalItems: Ref<number> = ref(0); // Total number of items to be displayed, used for pagination
const itemsPerPage: Ref<number> = ref(20); // Number of items per page
// Headers for the data table
const headers: Ref<
  Array<{ title: string; key: string; value: string; sortable: boolean }>
> = ref([
  { title: "ID", key: "id", value: "id", sortable: false },
  { title: "ONOMA", key: "first_name", value: "first_name", sortable: false },
  { title: "ΕΠΙΘΕΤΟ", key: "last_name", value: "last_name", sortable: false },
  { title: "ΑΡΙΘΜΟΣ ΜΙΤΡΩΟΥ", key: "AM", value: "AM", sortable: false },
]);
const loading: Ref<boolean> = ref(true); // Loading state to show a loader while data is being fetched
const serverUsers: Ref<Array<User>> = ref([]); // Stores the list of users fetched from the server

// Options interface for loading items, defining expected properties for pagination
interface LoadItemsOptions {
  page: number;
  itemsPerPage: number;
}

// Fetches user data based on current state (pagination and AM search term)
const loadItems = async (options: LoadItemsOptions) => {
  loading.value = true;

  try {
    // Fetch data with current searchAM value, page, and itemsPerPage
    const result = await getUsersByAmAndRole(
      searchAM.value,
      "student",
      options.page,
      options.itemsPerPage
    );

    // Update serverUsers and totalItems with fetched data
    if (result && result.data) {
      serverUsers.value = result.data;
      totalItems.value = result.total_items;
    } else {
      serverUsers.value = [];
      totalItems.value = 0;
    }
  } catch (error) {
    errorLog("Error loading items:", error);
  } finally {
    loading.value = false;
  }
};

// Called to apply filters based on the searchAM value; triggers data re-fetch
const applyFilter = () => {
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value });
};

function handleClick(event, row) {
  console.log("Clicked item: ", toRaw(row.item));
}

// Initial data load when the component mounts, using the current filter settings
onMounted(() => {
  applyFilter();
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.profile {
  @apply container mx-auto px-4 py-8 space-y-12;

  &__section {
    @apply shadow-lg border border-gray-200 rounded-lg p-6 bg-white;
  }

  :deep .v-data-table__td {
    @apply border border-gray-200 rounded-lg text-lg text-left md:text-base;
    color: $primary-dark-blue-color;
  }
  :deep .v-data-table-header__content {
    color: $primary-dark-blue-color;
    font-weight: bold;
  }
}
</style>
