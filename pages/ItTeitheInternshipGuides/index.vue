<template>
  <v-container class="internshipGuides" data-aos="zoom-in">
    <div class="internshipGuides__header">
      <div class="internshipGuides__header--title">
        Προγράμματα Πρακτικής Άσκησης {{ Department.IT_TEITHE }}
      </div>
      <p class="internshipGuides__header--subtitle">
        Επιλέξτε μία από τις παρακάτω σελίδες για να δείτε το περιεχόμενο.
      </p>
    </div>
    <v-row class="internshipGuides__row" dense>
      <v-col cols="12">
        <div class="internshipGuides__row__section">
          <v-icon
            class="internshipGuides__row__section--icon"
            color="primary-blue-color"
            >fa-solid fa-book</v-icon
          >
          <h3 class="internshipGuides__row__section--title">
            {{ InternshipProgram.ESPA }}
          </h3>
          <p class="internshipGuides__row__section--hint">
            Προβολή οδηγού πρακτικής του Πρώην τμήματος Μηχανικών Πληροφορικής
            για Πρακτική Άσκηση μέσω Προγράμματος ΕΣΠΑ.
          </p>
          <BaseComponentsBaseButton
            class="internshipGuides__row__section--button"
            :text="InternshipProgram.ESPA"
            @click="navigateTo('/ItTeitheInternshipGuides/Espa')"
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="internshipGuides__row" dense>
      <v-col cols="12">
        <div class="internshipGuides__row__section">
          <v-icon
            class="internshipGuides__row__section--icon"
            color="primary-blue-color"
            >fa-solid fa-book</v-icon
          >
          <h3 class="internshipGuides__row__section--title">
            {{ InternshipProgram.TEITHE_OAED }}
          </h3>
          <p class="internshipGuides__row__section--hint">
            Προβολή οδηγού πρακτικής του Πρώην τμήματος Μηχανικών Πληροφορικής
            για Πρακτική Άσκηση μέσω Προγράμματος ΟΑΕΔ.
          </p>
          <BaseComponentsBaseButton
            class="internshipGuides__row__section--button"
            :text="InternshipProgram.TEITHE_OAED"
            @click="navigateTo('/ItTeitheInternshipGuides/Oaed')"
          />
        </div>
      </v-col>
    </v-row>

    <v-row class="internshipGuides__row" dense>
      <v-col cols="12">
        <div class="internshipGuides__row__section">
          <v-icon
            class="internshipGuides__row__section--icon"
            color="primary-blue-color"
            >fa-solid fa-briefcase</v-icon
          >
          <h3 class="internshipGuides__row__section--title">
            {{ InternshipProgram.TEITHE_JOB_RECOGNITION }}
          </h3>
          <p class="internshipGuides__row__section--hint">
            Προβολή οδηγού πρακτικής του Πρώην τμήματος Μηχανικών Πληροφορικής
            για Πρακτική Άσκηση με Αναγνώριση Εργασίας.
          </p>
          <BaseComponentsBaseButton
            class="internshipGuides__row__section--button"
            :text="InternshipProgram.TEITHE_JOB_RECOGNITION"
            @click="navigateTo('/ItTeitheInternshipGuides/JobRecognition')"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { Department, InternshipProgram } from "@/types";
useHead({
  title: "Προγράμματα Πρακτικής",
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.internshipGuides {
  @apply container mx-auto px-4 py-8 space-y-12;

  &__header {
    @apply text-center mb-8;
    &--title {
      @apply text-3xl font-bold mb-2;
      color: $primary-dark-blue-color;
    }
    &--subtitle {
      @apply text-lg mb-4;
      color: $primary-blue-color;
    }
  }

  &__row {
    @apply flex flex-wrap justify-center gap-3;

    &__section {
      @apply shadow-lg border border-gray-200 rounded-lg p-6 bg-white text-center transition-all duration-300 ease-in-out hover:shadow-xl;

      &:hover {
        transform: translateY(-7px);
      }
      &--icon {
        @apply text-4xl mb-4;
        color: $primary-dark-blue-color;
      }

      &--title {
        @apply text-2xl font-bold mb-2;
        color: $primary-dark-blue-color;
      }

      &--hint {
        @apply text-base mb-4;
        color: $primary-blue-color;
      }

      &--button {
        @apply m-auto  text-white py-2 px-4 rounded  transition-all;
      }
    }
  }
}
</style>
