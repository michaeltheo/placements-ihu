<!-- eslint-disable vue/v-on-event-hyphenation -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="profile">
    <section class="profile__section profile__section--user">
      <h1 class="profile__name">{{ user.first_name }} {{ user.last_name }}</h1>
      <p class="profile__detail profile__detail--role">Role: {{ user.role }}</p>
      <p class="profile__detail profile__detail--am">AM: {{ user.AM }}</p>
    </section>

    <section class="profile__section profile__section--files">
      <h2 class="profile__header">Δικαιολογιτικά</h2>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        item-value="type"
        loading-text="Φόρτωση δεδομένων"
        no-data-text="Δεν βρέθηκαν Δικαιολογιτικά"
        @update:options="loadItems"
      >
        <template v-slot:bottom> </template>
        <template #item.actions="{ item }">
          <div class="profile__actions">
            <v-icon
              color="warning"
              icon="fa:fas fa-pen-to-square "
              size="large"
              @click="editItem(item)"
            ></v-icon>
            <v-icon
              color="primary-blue-color"
              icon="fa:fas fa-download "
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
          append-icon="fa:fas fa-arrows-rotate fa-spin"
          @click="loadItems()"
          >Ανανέωση Πίνακα</v-btn
        >
        <v-btn
          elevation="4"
          color="green-lighten-1"
          @click="openAddFilesDialog = true"
          >Προσθήκη Αρχείου</v-btn
        >
      </div>
    </section>

    <FileUploadDialog
      :model-value="openAddFilesDialog"
      :edit-item="selectedItem"
      @update:modelValue="handleDialogClose"
      @refreshFilesList="loadItems"
    />
    <DeleteFileDialog
      :model-value="openDeleteFileDialog"
      :file="selectedItem"
      @update:modelValue="handleDeleteDialogClose"
      @refreshFilesList="loadItems"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { useDikaiologitkaStore } from "@/stores/dikaiologitika";
import {
  downloadDikaiologitika,
  fetchDikaiologitaFiles,
  getDikaiologitkaTypes,
} from "@/services/dikaiologitkaService";
import type { User } from "@/types";
import type { DikaiologitikaFile } from "@/types/dikaiologitika";
import FileUploadDialog from "@/components/FileUploadDialog.vue";
const dikaiologitikaStore = useDikaiologitkaStore();
const authStore = useAuthStore();
const user: User = authStore.user;
const itemsPerPage: Ref<number> = ref(5);
const headers = ref([
  { title: "ΕΙΔΟΣ ΑΡΧΕΙΟΥ", key: "description" },
  { title: "ONOMA ARXEIOY", key: "file_name" },
  { title: "ΗΜΕΡΟΜΗΝΙΑ ΕΠΕΞΕΡΓΑΣΙΑΣ", key: "date" },
  { title: "ΕΠΙΛΟΓΕΣ", key: "actions" },
]);
const selectedItem: Ref<DikaiologitikaFile | null> = ref(null);
const serverItems: Ref<DikaiologitikaFile[]> = ref([]);
const loading: Ref<boolean> = ref(true);
const openAddFilesDialog: Ref<boolean> = ref(false);
const openDeleteFileDialog: Ref<boolean> = ref(false);
const totalItems: Ref<number> = ref(0);

const loadItems = async () => {
  loading.value = true;
  try {
    const result = await fetchDikaiologitaFiles(user.id);
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

headers.value.push();

const editItem = (item: DikaiologitikaFile) => {
  selectedItem.value = item;
  openAddFilesDialog.value = true;
  // Implementation for editing an item
};
const handleDialogClose = (newValue: boolean) => {
  openAddFilesDialog.value = newValue;
  if (!newValue) {
    // Dialog is being closed
    selectedItem.value = null; // Reset selectedItem
  }
};
const handleDeleteDialogClose = (newValue: boolean) => {
  openDeleteFileDialog.value = newValue;
  if (!newValue) {
    // Dialog is being closed
    selectedItem.value = null; // Reset selectedItem
  }
};

const downloadFile = async (item: DikaiologitikaFile) => {
  await downloadDikaiologitika(item.id);
};
const deleteItem = (item: DikaiologitikaFile) => {
  selectedItem.value = item;
  openDeleteFileDialog.value = true;
  // Implementation for deleting an item
};
onMounted(async () => {
  if (dikaiologitikaStore.dikaiologitikaTypes.length === 0) {
    const response = await getDikaiologitkaTypes();
    if (response) {
      dikaiologitikaStore.setDikaiologitka(response.data);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.profile {
  @apply container mx-auto px-4 py-8 space-y-12;

  &__section {
    @apply shadow-lg border border-gray-200 rounded-lg p-6 bg-white;

    &--user {
      @apply mb-8;
    }

    &--files {
      @apply mt-8;
    }
  }

  &__name {
    @apply text-3xl md:text-5xl font-extrabold mb-6 leading-snug;
    color: $primary-dark-blue-color;
  }

  &__header {
    @apply text-2xl font-semibold text-center my-4;
  }

  &__detail {
    @apply mt-2 text-xl font-medium mb-5;

    &--role,
    &--am {
      color: $primary-blue-color;
    }
  }

  &__actions {
    @apply flex items-center justify-around;
  }

  &__controls {
    @apply flex flex-wrap justify-center gap-4 mt-4;
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
}
</style>
