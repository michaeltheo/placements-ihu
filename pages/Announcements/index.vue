<template>
  <div class="announcements-page" data-aos="zoom-in">
    <div class="announcements-page__controls">
      <!-- Input -->
      <div class="announcements-page__search">
        <v-text-field
          v-model="searchText"
          label="Αναζητηση ανακοινωσεων "
          variant="outlined"
          class="search-field"
        ></v-text-field>
      </div>
      <div class="announcements-page__datepickers">
        <!-- Date From -->
        <Datepicker
          v-model="dateFrom"
          placeholder="From Date"
          class="announcements-page__datepicker-from"
          :max-date="new Date()"
        />

        <Datepicker
          v-model="dateTo"
          placeholder="To Date"
          class="announcements-page__datepicker-to"
          :min-date="dateFrom"
          :max-date="new Date()"
          :disabled="!dateFrom"
        />
      </div>
    </div>

    <div
      v-for="announcement in paginatedAnnouncements"
      :key="announcement.id"
      class="announcement-item"
      data-aos="zoom-in-down"
      data-aos-easing="linear"
      data-aos-duration="1000"
    >
      <!-- Display announcement details -->
      <MainAnnouncement :announcement="announcement" />
    </div>

    <div class="announcements-page__pagination">
      <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
    </div>
  </div>
</template>



<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import { ref, watch, computed } from "vue";
import test from "@/assets/dummyData/test.json";
import "@vuepic/vue-datepicker/dist/main.css";

const allAnnouncements = test.data;
const searchText = ref("");
const dateFrom = ref(null); // initial value
const dateTo = ref(null); // initial value
const itemsPerPage = 5; // Number of announcements per page
const currentPage = ref(1); // Current page number

// Watch for changes to dateFrom
watch(dateFrom, (newVal) => {
  if (!newVal) {
    dateTo.value = null;
  }
});

const totalPages = computed(() => {
  return Math.ceil(filteredAnnouncements.value.length / itemsPerPage);
});

const paginatedAnnouncements = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAnnouncements.value.slice(start, end);
});

const filteredAnnouncements = computed(() => {
  return allAnnouncements.filter((announcement) => {
    // Filter by title
    const titleMatch = announcement.title
      .toLowerCase()
      .includes(searchText.value.toLowerCase());

    // Filter by date
    const dateMatch =
      (!dateFrom.value ||
        new Date(announcement.created_at) >= new Date(dateFrom.value)) &&
      (!dateTo.value ||
        new Date(announcement.created_at) <= new Date(dateTo.value));

    return titleMatch && dateMatch;
  });
});
</script>


<style lang="scss" scoped>
@import "@/assets/variables.scss";

.announcements-page {
  @apply container mx-auto px-4 py-8 space-y-12;

  &__controls {
    @apply grid grid-cols-1 md:grid-cols-2 gap-4;
  }

  &__search {
    @apply bg-white p-2 rounded shadow transition-all duration-300;

    &:hover {
      @apply shadow-lg;
    }

    v-text-field {
      @apply w-full text-center;
      padding: 0.5rem 1rem; // Adjust as needed
    }
  }

  &__datepickers {
    @apply grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-2 rounded shadow-md md:flex md:justify-between md:items-center;

    &:hover {
      @apply shadow-lg;
    }
  }

  &__datepicker-from,
  &__datepicker-to {
    @apply w-full my-2 md:my-0 md:w-1/2;
  }
}
</style>
