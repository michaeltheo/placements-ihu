<!-- eslint-disable vue/v-slot-style -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container class="adminPage">
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
    <div class="adminPage__section--statistics">
      <h3 class="adminPage__title">Πινακας Χρηστών</h3>
      <p class="adminPage__hint">
        Προβολή σελίδας στατιστικών του ερωτηματολογίου των φοιτητών του
        τμήματος.
      </p>
      <BaseComponentsBaseButton
        class="m-auto"
        text="Σελίδα Χρηστών"
        @click="navigateTo('/adminPage/users')"
      />
    </div>
    <div class="adminPage__section--statistics">
      <h3 class="adminPage__title">Πινακας Εταιρειών</h3>
      <p class="adminPage__hint">
        Προβολή σελίδας στατιστικών του ερωτηματολογίου των φοιτητών του
        τμήματος.
      </p>
      <BaseComponentsBaseButton
        class="m-auto"
        text="Σελίδα Εταιρειών"
        @click="navigateTo('/adminPage/users')"
      />
    </div>
    <div class="adminPage__section--statistics">
      <h3 class="adminPage__title">Πινακας Πρακτικών</h3>
      <p class="adminPage__hint">
        Προβολή σελίδας στατιστικών του ερωτηματολογίου των φοιτητών του
        τμήματος.
      </p>
      <BaseComponentsBaseButton
        class="m-auto"
        text="Σελίδα Πρακτικης"
        @click="navigateTo('/adminPage/users')"
      />
    </div>
  </v-container>
</template>

<script lang="ts" setup></script>

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
}
</style>
