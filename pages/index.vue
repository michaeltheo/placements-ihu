<template>
  <div data-aos="fade-up" data-aos-duration="3000" class="homePage">
    <div class="homePage__alert">
      <div class="homePage__alert__icon">
        <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
      </div>
      <div class="homePage__alert__text">
        Προσοχή. Η πρακτική άσκηση του νέου τμήματος δεν θα προσφέρεται μέχρι
        την ψήφιση θεσμικού πλαίσιου.
      </div>
    </div>

    <div class="grid-section">
      <div class="grid-section__info">
        <h2 class="grid-section__header">
          Πρακτική Άσκηση στο Τμήμα Μηχανικών Πληροφορικής και Ηλεκτρονικών
          Συστήματων
        </h2>
        <div class="text-sm md:text-base mb-4">
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
          class="mt-4 mb-2"
          @click="() => navigateTo('/guide')"
        />
      </div>

      <div class="grid-section__announcements">
        <h3 class="grid-section__header">Τελευταίες Ανακοινώσεις</h3>
        <div class="flex flex-col space-y-2">
          <MiniAnnouncement
            v-for="announcement in firstFourAnnouncements"
            :key="announcement.id"
            :title="announcement.title"
            :date="announcement.updated_at"
          />
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer__section">
        <p class="footer__section-text">
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
<script setup>
import test from "@/assets/dummyData/test.json";
// Assuming you've imported the data as 'test'
// TODO: replace test data with real data

const allAnnouncements = test.data;
const filteredAnnouncements = allAnnouncements.filter((announcement) =>
  announcement.tags.some((tag) => tag.title === "Νέα τμήματος")
);

const firstFourAnnouncements = filteredAnnouncements.slice(0, 20);
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

.homePage {
  @apply mx-auto mt-10 px-2 sm:px-4 lg:px-8 space-y-6;
  &__alert {
    @apply bg-red-300 w-full p-4 rounded-lg flex items-center space-x-4 text-red-800 shadow-md transition-transform transform;

    &__icon {
      @apply text-red-700 md:text-4xl text-3xl flex-shrink-0;
    }

    &__text {
      @apply flex-grow font-semibold text-sm md:text-xl lg:text-2xl;
    }
  }
  .grid-section {
    @apply grid grid-cols-1 md:grid-cols-3 gap-6;

    &__header {
      @apply text-xl md:text-2xl font-bold mb-4;
      color: $primary-dark-blue-color;
    }
    &__info {
      @apply p-4 sm:p-6 rounded-lg shadow-md md:col-span-2 relative;
    }

    &__announcements {
      @apply p-4 sm:p-6 rounded-lg shadow-md;
    }
  }

  .footer {
    &__section {
      @apply flex flex-col md:flex-row justify-between items-center h-full p-2 md:p-4;
      @apply bg-cover bg-no-repeat md:h-36 h-48 rounded-lg shadow-lg;
      background-image: url("/img/test.png");
      background-position: 0 0;
      background-repeat: repeat-y;
      animation: animatedBackground 10s linear infinite alternate;

      &-text {
        @apply text-white font-semibold text-lg md:text-3xl mb-2 md:mb-0;
      }
    }
  }
}
</style>
