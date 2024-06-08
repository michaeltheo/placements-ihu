<template>
  <div data-aos="zoom-in" class="guide">
    <div class="guide__container">
      <h1 class="guide__container--header">
        Προϋποθέσεις για Πρακτική Άσκηση με Αναγνώριση Εργασίας
      </h1>
      <div class="guide__container__info">
        <div class="info__section">
          <h2 class="info__section--title">
            <v-icon>fas fa-exclamation-circle</v-icon> Βασικές Προϋποθέσεις
          </h2>
          <p>
            Αν εργάζεστε στον ιδιωτικό τομέα με Σύμβαση Πλήρους Απασχόλησης ή
            έχετε διοριστεί στον Δημόσιο Τομέα,
            <span class="highlight">
              ΔΕΝ μπορείτε να αναγνωρίσετε το επόμενο εξάμηνο της εργασίας σας
              σαν Πρακτική Άσκηση.
            </span>
          </p>
        </div>
        <div class="info__section">
          <h2 class="info__section--title">
            <v-icon>fas fa-info-circle</v-icon> Δήλωση Προσωπικών Δεδομένων
          </h2>
          <p>
            Θα πρέπει να το αναφέρετε ότι εργάζεστε στη Δήλωση Προσωπικών
            Δεδομένων, οπότε η αίτησή σας θα απορριφθεί.
          </p>
        </div>
        <div class="info__section">
          <h2 class="info__section--title">
            <v-icon> fas fa-briefcase</v-icon> Σύμβαση Πλήρους Απασχόλησης
          </h2>
          <p>
            Αν εργάζεστε στον ιδιωτικό τομέα με Σύμβαση Πλήρους Απασχόλησης και
            θέλετε διακαώς τις 12 ΠΜ, θα πρέπει να παραιτηθείτε από τον Φορέα
            (ΟΧΙ απόλυση, γιατί θα πρέπει να πάρετε ταμείο ανεργίας) και να
            δεχτεί ο φορέας να συμπληρώσει την
            <span class="font-bold"> ΕΙΔΙΚΗ ΣΥΜΒΑΣΗ </span>του Τμήματος
            δηλώνοντας επίσης πως θα καταβάλλει μηνιαίως το ποσό
            <span class="font-bold"> ΤΟΥΛΑΧΙΣΤΟΝ των 696,80 € </span> το μήνα.
          </p>
        </div>
        <div class="info__section">
          <h2 class="info__section--title">
            <v-icon>fas fa-user-shield</v-icon> Ασφαλιστική Κάλυψη
          </h2>
          <p>
            Δεν θα έχετε όμως ασφαλιστική και συνταξιοδοτική κάλυψη, όπως έχετε
            με τη Σύμβασή σας. Δεν θα μετρήσει αυτό το εξάμηνο σαν προϋπηρεσία,
            ούτε συνταξιοδοτικά.
          </p>
        </div>
      </div>
      <BaseComponentsBaseButton
        text=" Αν νομίζετε πως σας συμφέρει, επικοινωνήστε μαζί μας."
        @click="sendEmail"
      />
    </div>
  </div>
</template>
  
  <script setup>
const sendEmail = () => {
  window.location = "mailto:placement@it.teithe.gr";
};
</script>
  
  <style lang="scss" scoped>
@import "@/assets/variables.scss";

.guide {
  @apply container mx-auto px-4 py-8 space-y-12;

  &__container {
    @apply p-10 rounded-lg shadow-2xl bg-white;
    &--header {
      @apply md:text-4xl text-3xl font-extrabold mb-6 leading-snug;
      color: $primary-dark-blue-color;
    }

    &__info {
      @apply mt-2 text-xl font-medium mb-5 space-y-8;
      color: $primary-blue-color;

      .info__section {
        @apply p-4 rounded-lg bg-blue-50;

        &--title {
          @apply text-2xl font-semibold mb-2 flex items-center;
          i {
            @apply text-xl mr-2 flex;
            color: $primary-dark-blue-color;
          }
        }

        p {
          @apply mb-0;
        }

        .highlight {
          @apply bg-yellow-200 font-semibold px-2 rounded;
        }
      }
    }
  }
}
</style>
  