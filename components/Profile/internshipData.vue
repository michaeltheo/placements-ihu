<template>
  <section class="internship__data__section internship__data__section--user">
    <v-card class="internship__data__card" elevation="0">
      <v-card-title class="internship__data__card-title">
        Πληροφορίες Πρακτικής
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" class="internship__data__row">
            <v-icon class="internship__data__icon" color="primary-blue-color">
              fa-solid fa-book
            </v-icon>
            <span class="internship__data__label"
              >Πρόγραμμα Πρακτικής Άσκησης:</span
            >
            <span class="internship__data__value">{{
              internship?.program || "N/A"
            }}</span>
          </v-col>
          <v-col cols="12" md="6" class="internship__data__row">
            <v-icon class="internship__data__icon" color="primary-blue-color">
              fa-solid fa-building
            </v-icon>
            <span class="internship__data__label">Όνομα Εταιρείας:</span>
            <span class="internship__data__value">{{
              internship?.company_name || "N/A"
            }}</span>
          </v-col>
          <v-col cols="12" md="6" class="internship__data__row">
            <v-icon class="internship__data__icon" color="primary-blue-color">
              fa-regular fa-calendar-days
            </v-icon>
            <span class="internship__data__label">Ημερομηνία Έναρξη:</span>
            <span class="internship__data__value">{{
              formatDate(internship?.start_date) || "N/A"
            }}</span>
          </v-col>
          <v-col cols="12" md="6" class="internship__data__row">
            <v-icon class="internship__data__icon" color="primary-blue-color">
              fa-regular fa-calendar-days
            </v-icon>
            <span class="internship__data__label">Ημερομηνία Λήξης:</span>
            <span class="internship__data__value">{{
              formatDate(internship?.end_date) || "N/A"
            }}</span>
          </v-col>
          <v-col cols="12" md="6" class="internship__data__row">
            <v-icon class="internship__data__icon" color="primary-blue-color">
              fa-solid fa-gear
            </v-icon>
            <span class="internship__data__label">Κατάσταση:</span>
            <span
              class="internship__data__value internship__data__value--status"
              >{{ internship?.status }}</span
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
import { InternshipRead } from "@/types/internship";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(
  defineProps<{
    internship: InternshipRead | null;
  }>(),
  {
    internship: null,
  },
);

// Helper function to format date
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return format(date, "dd-MM-yy");
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.internship__data__section--user {
  @apply my-8;

  .internship__data__card {
    @apply p-4 rounded-lg shadow-lg;

    &-title {
      @apply text-2xl font-bold mb-4 flex items-center;
      color: $primary-dark-blue-color;
    }
  }

  .internship__data__row {
    @apply flex items-baseline;

    .internship__data__icon {
      @apply mr-2;
    }

    .internship__data__label {
      @apply text-lg font-semibold mr-2;
      color: $primary-dark-blue-color;
    }

    .internship__data__value {
      @apply text-lg;
      color: $primary-dark-blue-color;

      &--status {
        @apply font-bold text-red-500;
      }
    }
  }
}
</style>
