<template>
  <div class="about-page">
    <v-alert
      title="Σχετικά με την Σελίδα Πρακτικής"
      text="Η υλοποίηση της σελίδας πρακτικής αποτελεί το αποτέλεσμα της διπλωματικής μου εργασίας στο Τμήμα Μηχανικών Πληροφορικής και Ηλεκτρονικών Συστημάτων (πρώην Τμήμα Μηχανικών Πληροφορικής). Σε περίπτωση που αντιμετωπίσετε οποιοδήποτε σφάλμα ή άλλο θέμα κατά τη χρήση της υπηρεσίας, παρακαλώ επικοινωνήστε μαζί μας μέσω email στη διεύθυνση που παρατίθεται παρακάτω, συμπληρώνοντας ως πρόθεμα του μηνύματος 'Placements Issue (2239)'."
      type="info"
      color="primary-blue-color"
      variant="tonal"
    >
      <div class="about-page__info">
        Για περισσότερες πληροφορίες σχετικά με το project επισκεφθείτε την
        σελίδα του project στο
        <a
          href="https://github.com/michaeltheo/placements-ihu"
          target="_blank"
          class="about-page__info __link"
          >frontend</a
        >
        και
        <a
          href="https://github.com/michaeltheo/placements_backend"
          target="_blank"
          class="about-page__info __link"
          >backend</a
        >
        repositories και το
        <a
          href="https://placements.iee.ihu.gr/api/docs"
          target="_blank"
          class="about-page__info __link"
          >API Swagger</a
        >.
        <div>
          <v-btn
            class="about-page__info__send-email-btn"
            prepend-icon="fa-solid fa-envelope"
            color="primary-dark-blue"
            href="mailto:placement@it.teithe.gr?subject=Placements%20Issue%20(2239)"
          >
            Επικοινωνήστε μαζί μας
          </v-btn>
        </div>
      </div>
    </v-alert>

    <div class="about-page__developers-section" data-aos="zoom-in-down">
      <h1 class="about-page__developers-section-title">Contributors</h1>
      <v-row>
        <v-col
          v-for="dev in developers"
          :key="dev.name"
          cols="12"
          md="6"
          lg="5"
          xl="4"
        >
          <BaseComponentsDeveloperCard :developer="dev" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Developer } from "@/types/user";
useHead({
  title: "Σχετικά με την εφαρμογή",
});
const developers: Developer[] = [
  {
    name: "Μιχάλης Θεοχάρης",
    AM: "164665",
    icon: "MichaelTheocharis.jpg",
    description:
      "Διπλωματική εργασία, 2022-2024. Σχεδιασμός και ανάπτυξη της αρχικής έκδοσης της web εφαρμογής (API και web client).",
    github_url: "https://github.com/michaeltheo",
    linkedin_url: "https://gr.linkedin.com/in/michael-theocharis-188192134",
  },
];
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.about-page {
  @apply container  mx-auto px-4 py-8 space-y-12;
  &__info {
    @apply pt-5;
    padding-top: 20px;
    &.__link {
      color: $primary-dark-blue-color;
      @apply underline mr-2;
      &:hover {
        @apply no-underline;
      }
    }
    &__send-email-btn {
      margin-top: 20px;
      margin-bottom: 20px;
      &:hover {
        transform: translateY(-7px);
      }
    }
  }

  &__developers-section {
    @apply pt-4;
    &-title {
      @apply mb-5 text-center text-2xl;
      color: $primary-dark-blue-color;
    }
  }
}
</style>
