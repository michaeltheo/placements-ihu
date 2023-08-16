<template>
  <div data-aos class="container">
    <!-- Alert Section -->
    <div class="container__alert">
      <div class="container__alert--icon">
        <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
      </div>
      <div class="container__alert--text">
        Προσοχή. Η πρακτική άσκηση του νέου τμήματος δεν θα προσφέρεται μέχρι
        την ψήφιση θεσμικού πλαίσιου.
      </div>
    </div>

    <div class="container__grid-section">
      <div class="container__grid-section--info">
        <h2 class="text-xl md:text-2xl font-bold mb-4">
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
        <BaseComponentsBaseButton text="ΟΔΗΓΟΣ ΠΡΑΚΤΙΚΗΣ" class="mt-4 mb-2" />
      </div>

      <div class="container__grid-section--announcements">
        <h3 class="text-xl md:text-2xl font-bold mb-4">
          Τελευταίες Ανακοινώσεις
        </h3>
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

    <div class="container__footer">
      <div class="container__footer-section">
        <p class="container__footer--text">
          Είστε φοιτητές του παλαιού προγράμματος σπουδών; (Πρώην τμήμα Τ.Ε.
          Μηχανικών Πληροφορικής)
        </p>
        <BaseComponentsBaseButton
          text="ΟΔΗΓΟΣ ΠΑΛΑΙΟΥ ΠΡΟΓΡΑΜΜΑΤΟΣ"
          :glow="false"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import test from "@/assets/dummyData/test.json";
// Assuming you've imported the data as 'test'
const allAnnouncements = test.data;

// Step 1: Filter by the tag
const filteredAnnouncements = allAnnouncements.filter((announcement) =>
  announcement.tags.some((tag) => tag.title === "Νέα τμήματος")
);

// Step 2: Get only the first 4
const firstFourAnnouncements = filteredAnnouncements.slice(0, 4);
console.log(firstFourAnnouncements);
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";

// Simple Fade-in Animation
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

.container {
  @apply mx-auto mt-10 px-2 sm:px-4 lg:px-8 space-y-6;
  &__alert {
    @apply bg-red-300 w-full p-4 rounded-lg flex items-center space-x-4 text-red-800 shadow-md transition-transform transform;

    &--icon {
      @apply text-red-700 md:text-4xl text-3xl flex-shrink-0;
    }

    &--text {
      @apply flex-grow font-semibold text-sm md:text-xl lg:text-2xl;
    }
  }
  &__grid-section {
    @apply grid grid-cols-1 md:grid-cols-3 gap-6;

    &--info {
      @apply p-4 sm:p-6 rounded-lg shadow-md md:col-span-2 relative;
    }

    &--announcements {
      @apply p-4 sm:p-6 rounded-lg shadow-md;
    }
  }

  &__footer {
    &-section {
      @apply flex flex-col md:flex-row justify-between items-center h-full p-2 md:p-4;
    }
    @apply bg-cover bg-no-repeat md:h-36 h-48 rounded-lg shadow-lg;
    background-image: url("public/img/test.png");
    background-position: 0 0;
    background-repeat: repeat-y;
    animation: animatedBackground 10s linear infinite alternate;

    &--text {
      @apply text-white font-semibold text-lg md:text-3xl mb-2 md:mb-0;
    }
  }
}
</style>


