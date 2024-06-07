<template>
  <div class="home-page" data-aos="fade-up" data-aos-duration="3000">
    <div class="home-page__alert">
      <div class="home-page__alert-icon">
        <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
      </div>
      <div class="home-page__alert-text">
        Προσοχή. Η πρακτική άσκηση του νέου τμήματος δεν θα προσφέρεται μέχρι
        την ψήφιση θεσμικού πλαισίου.
      </div>
    </div>

    <div class="home-page__grid-section">
      <div class="home-page__grid-section-info">
        <h2 class="home-page__grid-section-header">
          Πρακτική Άσκηση στο Τμήμα Μηχανικών Πληροφορικής και Ηλεκτρονικών
          Συστημάτων
        </h2>
        <div class="home-page__grid-section-content">
          <p>
            Η Πρακτική Άσκηση αποτελεί σημείο αναφοράς στις σπουδές του φοιτητή.
            Η επιλογή για το χώρο εργασίας του φοιτητή πρέπει να γίνεται με
            σύνεση και είναι ουσιαστικής σημασίας να σχετίζεται με το
            αντικείμενο των σπουδών του.
          </p>
          <p class="pt-2">
            O δικτυακός αυτός χώρος σχεδιάστηκε με βασικό στόχο να παρέχει
            εύκολη ενημέρωση για τα θέματα εκπόνησης της πρακτικής άσκησης αλλά
            και σημαντική βοήθεια σε διαδικαστικά θέματα.
          </p>
        </div>
        <BaseComponentsBaseButton
          text="ΟΔΗΓΟΣ ΠΡΑΚΤΙΚΗΣ"
          class="home-page__grid-section-button"
          @click="() => navigateTo('/guide')"
        />
      </div>

      <div class="home-page__grid-section-announcements">
        <h3 class="home-page__grid-section-header">Τελευταίες Ανακοινώσεις</h3>
        <div
          v-if="allAnnouncements.length > 0"
          class="home-page__announcement-list"
        >
          <MiniAnnouncement
            v-for="announcement in allAnnouncements"
            :key="announcement.id"
            :title="announcement.title"
            :date="announcement.updated_at"
            @click="navigateTo('/announcements')"
          />
        </div>
        <div v-else class="home-page__loading">
          <v-progress-circular
            color="primary-dark-blue"
            indeterminate
            :size="60"
            :width="4"
          ></v-progress-circular>
        </div>
      </div>
    </div>

    <div class="home-page__footer">
      <div class="home-page__footer-section">
        <p class="home-page__footer-section-text">
          Είστε φοιτητές του παλαιού προγράμματος σπουδών; (Πρώην τμήμα Τ.Ε.
          Μηχανικών Πληροφορικής)
        </p>
        <BaseComponentsBaseButton
          text="ΟΔΗΓΟΣ ΠΑΛΑΙΟΥ ΠΡΟΓΡΑΜΜΑΤΟΣ"
          :glow="false"
          @click="() => navigateTo('/oldProgram')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchAnnouncements } from "@/services/announcementService";

const allAnnouncements = ref<any[]>([]);

onMounted(async () => {
  const response = await fetchAnnouncements({ itemsPerPage: 5 });
  if (Array.isArray(response.data) && response.data.length > 0) {
    allAnnouncements.value = response.data;
  } else {
    allAnnouncements.value = [];
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

// Fade-in Animation
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes animatedBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 100%;
  }
}

[data-aos] {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 1.5s forwards;
  animation-delay: 0.2s;
}

.home-page {
  @apply mx-auto mt-10 px-2 sm:px-4 lg:px-8 space-y-6;

  &__alert {
    @apply bg-red-300 w-full p-4 rounded-lg flex items-center space-x-4 text-red-800 shadow-md transition-transform transform;

    &-icon {
      @apply text-red-700 md:text-4xl text-3xl flex-shrink-0;
    }

    &-text {
      @apply flex-grow font-semibold text-sm md:text-xl lg:text-2xl;
    }
  }

  &__grid-section {
    @apply grid grid-cols-1 md:grid-cols-3 gap-6;

    &-header {
      @apply text-xl md:text-2xl font-bold mb-4;
      color: $primary-dark-blue-color;
    }

    &-info {
      @apply p-4 sm:p-6 rounded-lg shadow-md md:col-span-2 relative;
    }

    &-content {
      @apply text-sm md:text-base mb-4;
    }

    &-button {
      @apply mt-4 mb-2;
    }

    &-announcements {
      @apply p-4 sm:p-6 rounded-lg shadow-md;
    }
  }

  &__announcement-list {
    @apply flex flex-col space-y-2;
  }

  &__loading {
    @apply flex justify-center;
  }

  &__footer {
    @apply flex flex-col md:flex-row justify-between items-center h-full p-2 md:p-4 bg-cover bg-no-repeat md:h-36 h-48 rounded-lg shadow-lg;
    background-image: url("/img/test.png");
    background-position: 0 0;
    background-repeat: repeat-y;
    animation: animatedBackground 10s linear infinite alternate;

    &-section {
      @apply flex flex-col md:flex-row justify-between items-center h-full;
    }

    &-section-text {
      @apply text-white font-semibold text-lg md:text-3xl mb-2 md:mb-0;
    }
  }
}
</style>
