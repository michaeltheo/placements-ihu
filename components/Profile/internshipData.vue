<!--
/**
 * InternshipData Component
 *
 * This component displays detailed information about a user's internship in a card layout. 
 * It presents various details such as the internship program, company name, start and end dates, 
 * and the status of the internship. Icons and labels are used to enhance readability.
 *
 * @prop {Object|null} internship - The internship object containing details to display.
 * @prop {string} [internship.program] - The name of the internship program.
 * @prop {string} [internship.company_name] - The name of the company.
 * @prop {string} [internship.start_date] - The start date of the internship.
 * @prop {string} [internship.end_date] - The end date of the internship.
 * @prop {string} [internship.status] - The status of the internship.
 */
-->
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
              fa-solid fa-user-tie
            </v-icon>
            <span class="internship__data__label">Επόπτης:</span>
            <span class="internship__data__value">{{
              internship?.supervisor || "N/A"
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
              :style="{ color: getColorForStatus(internship?.status) ?? '' }"
              >{{ internship?.status }}</span
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts" setup>
import { InternshipRead } from "@/types/internship";
import { InternshipStatus } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(
  defineProps<{
    internship: InternshipRead | null;
  }>(),
  {
    internship: null,
  },
);

/**
 * Returns a color based on the internship status.
 * @param status - The status of the internship.
 * @returns The color corresponding to the status.
 */
const getColorForStatus = (status: string): string => {
  if (status === InternshipStatus.ACTIVE || status === InternshipStatus.ENDED) {
    return "green";
  } else if (
    status === InternshipStatus.PENDING_REVIEW_END ||
    status === InternshipStatus.PENDING_REVIEW_START
  ) {
    return "orange";
  } else if (
    status === InternshipStatus.SUBMIT_START_FILES ||
    status === InternshipStatus.SUBMIT_END_FILES ||
    status ===
      InternshipStatus.SUBMIT_STAT_FILES_WITHOUT_SECRETARY_CERTIFICATION
  ) {
    return "orange-darken-1";
  }
  return "default";
};

/**
 * Helper function to format date.
 * @param dateString - The date string to format.
 * @returns The formatted date string or "N/A" if the date is invalid.
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
