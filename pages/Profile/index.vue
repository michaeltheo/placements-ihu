<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="profile">
    <!-- User Information Section -->
    <div class="profile__user-information">
      <h1 class="profile__name">{{ user.first_name }} {{ user.last_name }}</h1>
      <p class="profile__role">Role: {{ user.role }}</p>
      <p class="profile__AM">AM: {{ user.AM }}</p>
      <!-- Additional user details here -->
    </div>

    <!-- File Management Section -->
    <div class="profile__file-management profile__user-information">
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        item-value="type"
        @update:options="loadItems"
      >
        <template #item.actions="{ item }">
          <v-icon
            class="mr-9"
            color="warning"
            icon="fa:fas fa-pen-to-square "
            size="large"
            @click="editItem(item)"
          ></v-icon>
          <v-icon
            icon="fa:fas fa-trash"
            size="large"
            color="error"
            @click="deleteItem(item)"
          />
        </template>
      </v-data-table-server>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        <v-btn
          elevation="4"
          color="#112d4e"
          append-icon="fa:fas fa-arrows-rotate fa-spin"
          class="md:mb-0"
          @click="loadItems()"
          >Ανανέωση Πίνακα
        </v-btn>
        <v-btn
          elevation="4"
          color="green-lighten-1"
          append-icon="fa:fas fa-upload"
          @click="loadItems()"
          >Προσθήκη Αρχείου
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { fetchDikaiologitaFiles } from "@/services/dikaiologitkaService";
import type { User } from "@/types";
import type { DikaiologitikaFile } from "@/types/dikaiologitika";

definePageMeta({
  middleware: ["auth"],
});
const authStore = useAuthStore();
const user: User = authStore.user;
const itemsPerPage: Ref<number> = ref(5);
const headers = ref([
  { title: "ΕΙΔΟΣ ΑΡΧΕΙΟΥ", key: "type" },
  { title: "ΗΜΕΡΟΜΗΝΙΑ ΕΠΕΞΕΡΓΑΣΙΑΣ", key: "date" },
  { title: "ΕΠΙΛΟΓΕΣ", key: "actions" },
]);
const serverItems: Ref<DikaiologitikaFile[]> = ref([]);
const loading: Ref<boolean> = ref(true);
const totalItems: Ref<number> = ref(0);

const loadItems = async () => {
  loading.value = true;
  const result = await fetchDikaiologitaFiles(user.id);
  if (result && result.data && result.data.files) {
    serverItems.value = result.data.files;
    totalItems.value = result.data.files.length;
  } else {
    serverItems.value = [];
    totalItems.value = 0;
  }
  loading.value = false;
};

headers.value.push();

const editItem = (item: DikaiologitikaFile) => {
  log("Edit item", item);
  // Implementation for editing an item
};

const deleteItem = (item: DikaiologitikaFile) => {
  log("Delete item", toRaw(item));
  // Implementation for deleting an item
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.profile {
  @apply container mx-auto px-4 py-8 space-y-12;

  &__user-information {
    @apply p-10 rounded-lg shadow-2xl bg-white;
  }

  &__name {
    @apply text-3xl md:text-5xl font-extrabold mb-6 leading-snug;
    color: $primary-dark-blue-color;
  }

  &__role,
  &__AM {
    @apply mt-2 text-xl font-medium mb-5;
    color: $primary-blue-color;
  }

  ::v-deep .v-data-table__td,
  .v-data-table__th {
    @apply text-lg;
  }
  ::v-deep .v-data-table-header__sort-icon,
  .v-data-table-footer,
  .v-data-table-footer__items-per-page {
    display: none !important;
  }

  // Styles for file management section can be added here
}
</style>
