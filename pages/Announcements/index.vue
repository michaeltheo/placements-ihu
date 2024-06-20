<template>
  <div class="announcements-page" data-aos="zoom-in">
    <div class="announcements-page__controls">
      <div class="announcements-page__controls__search">
        <v-text-field
          v-model="searchText"
          label="Αναζήτηση ανακοινώσεων"
          variant="outlined"
          clearable
          color="primary-dark-blue"
          class="announcements-page__controls__search__field"
          @update:model-value="fetchAndSetAnnouncements"
        ></v-text-field>
      </div>
      <div class="announcements-page__controls__datepickers">
        <Datepicker
          v-model="dateFrom"
          placeholder="From Date"
          class="announcements-page__controls__datepicker"
          :max-date="new Date()"
        />
        <Datepicker
          v-model="dateTo"
          placeholder="To Date"
          class="announcements-page__controls__datepicker"
          :min-date="dateFrom"
          :max-date="new Date()"
          :disabled="!dateFrom"
        />
      </div>
    </div>

    <div v-if="loading" class="announcements-page__loading">
      <v-progress-circular
        color="primary-dark-blue"
        indeterminate
        :size="128"
        :width="6"
      ></v-progress-circular>
    </div>

    <div v-else>
      <div
        v-if="allAnnouncements.length === 0"
        class="announcements-page__no-results"
      >
        <p class="text-center text-xl">Δεν βρέθηκαν ανακοινώσεις</p>
      </div>

      <div
        v-for="announcement in allAnnouncements"
        :key="announcement.id"
        class="announcements-page__item"
        data-aos="zoom-in-down"
        data-aos-easing="linear"
        data-aos-duration="1000"
      >
        <MainAnnouncement :announcement="announcement" />
      </div>

      <div v-if="totalPages > 1" class="announcements-page__pagination">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          rounded="circle"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { fetchAnnouncements } from "@/services/announcementService";

const allAnnouncements = ref<any>([]);
const searchText = ref<string>("");
const dateFrom = ref<Date | null>(null);
const dateTo = ref<Date | null>(null);
const itemsPerPage = ref<number>(10);
const currentPage = ref<number>(1);
const totalPages = ref<number>(0);
const totalItems = ref<number>(0);
const loading = ref<boolean>(false);

const fetchAndSetAnnouncements = async () => {
  const updatedAfter = dateFrom.value ? dateFrom.value.toISOString() : null;
  const updatedBefore = dateTo.value ? dateTo.value.toISOString() : null;
  loading.value = true;
  try {
    const response = await fetchAnnouncements({
      itemsPerPage: itemsPerPage.value,
      updatedAfter,
      updatedBefore,
      searchText: searchText.value,
    });

    if (response.data && response.meta) {
      allAnnouncements.value = response.data;
      totalPages.value = response.meta.last_page;
      totalItems.value = response.meta.total;
    } else {
      allAnnouncements.value = [];
      totalPages.value = 0;
      totalItems.value = 0;
    }
  } finally {
    loading.value = false;
  }
};

// Watch for changes to dateFrom, dateTo, currentPage, and searchText, and refetch announcements
watch([dateFrom, dateTo, currentPage, searchText], fetchAndSetAnnouncements, {
  deep: true,
});

onMounted(fetchAndSetAnnouncements);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.announcements-page {
  @apply container mx-auto px-4 py-8 space-y-12;

  &__controls {
    @apply grid grid-cols-1 md:grid-cols-2 gap-4;
  }

  &__controls__search {
    @apply bg-white p-2 rounded shadow transition-all duration-300;

    &:hover {
      @apply shadow-lg;
    }

    &__field {
      @apply w-full text-center;
      padding: 0.5rem 1rem;
    }
  }

  &__controls__datepickers {
    @apply grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-2 rounded shadow-md md:flex md:justify-between md:items-center;

    &:hover {
      @apply shadow-lg;
    }
  }

  &__controls__datepicker {
    @apply w-full my-2 md:my-0 md:w-1/2;
  }

  &__loading {
    @apply flex justify-center items-center;
  }

  &__no-results {
    @apply text-center text-xl;
    color: $primary-dark-blue-color;
  }

  &__item {
    @apply m-10;
  }

  &__pagination {
    @apply flex justify-center mt-4;
  }
}
</style>
