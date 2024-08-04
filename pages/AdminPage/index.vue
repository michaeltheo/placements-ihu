<template>
  <v-container class="adminPage">
    <div class="adminPage__header">
      <h2 class="adminPage__main-title">Σελίδα Διαχειριστή</h2>
      <p class="adminPage__subtitle">
        Επιλέξτε μία από τις παρακάτω σελίδες για να διαχειριστείτε το
        περιεχόμενο.
      </p>
    </div>
    <v-row class="adminPage__row" dense>
      <v-col cols="12" sm="6" md="5">
        <div class="adminPage__section">
          <v-icon class="adminPage__icon" color="primary-blue-color"
            >fa-solid fa-chart-simple</v-icon
          >
          <h3 class="adminPage__title">Στατιστικά Ερωτηματολογίου</h3>
          <p class="adminPage__hint">
            Προβολή σελίδας στατιστικών του ερωτηματολογίου των φοιτητών και των
            εταιρειών του τμήματος.
          </p>
          <BaseComponentsBaseButton
            class="adminPage__button"
            text="Σελίδα Στατιστικών"
            @click="navigateTo('/adminPage/statistics')"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <div class="adminPage__section">
          <v-icon class="adminPage__icon" color="primary-blue-color"
            >fa-solid fa-user</v-icon
          >
          <h3 class="adminPage__title">Πίνακας Χρηστών</h3>
          <p class="adminPage__hint">
            Διαχείριση χρηστών, φοιτητών του τμήματος.
          </p>
          <BaseComponentsBaseButton
            class="adminPage__button"
            text="Σελίδα Χρηστών"
            @click="navigateTo('/adminPage/users')"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <div class="adminPage__section">
          <v-icon class="adminPage__icon" color="primary-blue-color"
            >fa-solid fa-building</v-icon
          >
          <h3 class="adminPage__title">Πίνακας Εταιρειών</h3>
          <p class="adminPage__hint">Διαχείριση εταιρειών της πρακτικής.</p>
          <BaseComponentsBaseButton
            class="adminPage__button"
            text="Σελίδα Εταιρειών"
            @click="navigateTo('/adminPage/companies')"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <div class="adminPage__section">
          <v-icon class="adminPage__icon" color="primary-blue-color"
            >fa-solid fa-file-contract</v-icon
          >
          <h3 class="adminPage__title">Πίνακας Πρακτικών</h3>
          <p class="adminPage__hint">
            Διαχείριση πρακτικών και προβολή των δικαιολογητικών/ερωτηματολογίου
            των φοιτητών, εταιρειών.
          </p>
          <BaseComponentsBaseButton
            class="adminPage__button"
            text="Σελίδα Πρακτικών"
            @click="navigateTo('/adminPage/internships')"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth", "is-admin"],
});
useHead({
  title: "Σελίδα Διαχειριστή",
});

const router = useRouter();
const navigateTo = (path: string) => {
  // Logic for navigation
  router.push(path);
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.adminPage {
  @apply container mx-auto px-4 py-8 space-y-12;

  &__header {
    @apply text-center mb-8;
  }

  &__main-title {
    @apply text-3xl font-bold mb-2;
    color: $primary-dark-blue-color;
  }

  &__subtitle {
    @apply text-lg mb-4;
    color: $primary-blue-color;
  }

  &__row {
    @apply flex flex-wrap justify-center gap-3;
  }

  &__section {
    @apply shadow-lg border border-gray-200 rounded-lg p-6 bg-white text-center transition-all duration-300 ease-in-out hover:shadow-xl;
    min-height: 15.6rem;

    &:hover {
      transform: translateY(-7px);
    }
  }

  &__icon {
    @apply text-4xl mb-4;
    color: $primary-dark-blue-color;
  }

  &__title {
    @apply text-2xl font-bold mb-2;
    color: $primary-dark-blue-color;
  }

  &__hint {
    @apply text-base mb-4;
    color: $primary-blue-color;
  }

  &__button {
    @apply m-auto  text-white py-2 px-4 rounded  transition-all;
  }
}
</style>
