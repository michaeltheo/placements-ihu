<template>
  <div class="home-page" data-aos="fade-up" data-aos-duration="3000">
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
      </div>

      <div class="home-page__grid-section-announcements">
        <h3 class="home-page__grid-section-header">Τελευταίες Ανακοινώσεις</h3>
        <div
          v-if="allAnnouncements.length > 0"
          class="home-page__announcement-list"
        >
          <AnnouncementsMini
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
    <div class="home-page__footer home-page__footer--ihu">
      <p class="home-page__footer-section-text">
        Είστε φοιτητές του Τμήματος Μηχανικών Πληροφορικής και Ηλεκτρονικών
        Συστημάτων;
      </p>
      <BaseComponentsBaseButton
        text="ΠΡΟΓΡΑΜΜΑΤΑ ΠΡΑΚΤΙΚΗΣ ΜΗΧΑΝΙΚΩΝ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΗΛΕΚΤΡΟΝΙΚΩΝ ΣΥΣΤΗΜΑΤΩΝ"
        :glow="true"
        @click="() => navigateTo('/IhuInternshipGuides')"
      />
    </div>
    <div class="home-page__footer home-page__footer--itTeithe">
      <p class="home-page__footer-section-text">
        Είστε φοιτητές του πρώην Τμήματος Μηχανικών Πληροφορικής;
      </p>
      <BaseComponentsBaseButton
        text="ΠΡΟΓΡΑΜΜΑΤΑ ΠΡΑΚΤΙΚΗΣ ΠΑΛΑΙΟΥ ΤΜΗΜΑΤΟΣ ΜΗΧΑΝΙΚΩΝ ΠΛΗΡΟΦΟΡΙΚΗΣ"
        :glow="true"
        @click="() => navigateTo('/ItTeitheInternshipGuides')"
      />
    </div>

    <div class="home-page__footer home-page__footer--eleTeithe">
      <p class="home-page__footer-section-text">
        Είστε φοιτητές του Πρώην Τμήματος Ηλεκτρονικής;
      </p>
      <BaseComponentsBaseButton
        text="ΠΡΟΓΡΑΜΜΑΤΑ ΠΡΑΚΤΙΚΗΣ ΠΑΛΑΙΟΥ ΤΜΗΜΑΤΟΣ ΜΗΧΑΝΙΚΩΝ ΗΛΕΚΤΡΟΝΙΚΗΣ"
        :glow="true"
        @click="() => navigateTo('/ElTeitheInternshipGuides')"
      />
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

  &__grid-section {
    @apply grid grid-cols-1 md:grid-cols-3 gap-6;

    &-header {
      @apply text-xl md:text-2xl font-bold mb-4;
      color: $primary-dark-blue-color;
    }

    &-info {
      @apply p-4 sm:p-6 rounded-lg shadow-lg md:col-span-2 relative;
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
    @apply flex justify-center h-60 items-center;
  }

  &__footer {
    @apply flex flex-col md:flex-row justify-between items-center h-full p-2 md:p-4 bg-cover bg-no-repeat md:h-36 h-48 rounded-lg shadow-lg;
    background-position: 0 0;
    background-repeat: repeat-y;
    animation: animatedBackground 10s linear infinite alternate;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.3);
    }

    &--itTeithe {
      background-image: url("/img/test.png");
    }
    &--eleTeithe {
      background-image: url("/img/elteithe.png");
    }
    &--ihu {
      background-image: url("/img/ihu.png");
    }

    &-section {
      @apply flex flex-col md:flex-row justify-between items-center h-full;
    }

    &-section-text {
      @apply z-10 text-white font-semibold text-lg md:text-3xl mb-2 md:mb-0;
    }
  }
}
</style>
