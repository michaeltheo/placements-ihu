<template>
  <div class="old-program">
    <!-- Header Section -->
    <div class="old-program-requirements">
      <h1 class="old-program-requirements__header">
        Προϋποθέσεις για την πραγματοποίηση πρακτικής άσκησης
      </h1>
      <p class="old-program-requirements__text">
        Για την πραγματοποίηση της Πρακτικής Ασκησης από κάποιον φοιτητή
        (-τρια):
      </p>
      <ul class="old-program-requirements__list">
        <li>
          Να βρίσκεται σε τυπικό
          <span class="font-semibold">εξάμηνο</span> μεγαλύτερο του Z'.
        </li>
        <li>
          Να έχει παρακολουθήσει με επιτυχία τα
          <span class="font-semibold">2/3</span> των μαθημάτων του προγράμματος
          σπουδών.
        </li>
        <li>
          Να μην οφείλει <span class="font-bold">κανένα</span> μάθημα
          ειδικότητας...
        </li>
        <li>Εισαγωγή στα Λειτουργικά Συστήματα ( Θ+Ε ) - (Β' Εξάμηνο)</li>
        <li>Δομές Δεδομένων και Ανάλυση Αλγορίθμων ( Θ+Ε ) - ( Γ' Εξάμηνο )</li>
        <li>Τεχνολογία Βάσεων Δεδομένων ( Θ+Ε ) - ( Δ' Εξάμηνο )</li>
        <li>Τηλεπικοινωνίες και Δίκτυα Υπολογιστών ( Θ+Ε ) - ( Δ' Εξάμηνο )</li>
        <li>Μηχανική Λογισμικού Ι ( Θ+Ε ) - ( Ε' Εξάμηνο )</li>
        <li>
          Τέσσερα (4) από το σύνολο των Μαθημάτων του Ζ' Εξαμήνου και των
          Μαθημάτων Επιλογής.
        </li>
      </ul>

      <div class="old-program-requirements__note">
        <p class="old-program-requirements__text">
          Eνώ για τους φοιτητές, οι οποίοι έχουν επιλέξει κατεύθυνση, είναι τα
          παρακάτω :
        </p>
        <ul class="old-program-requirements__list">
          <li>Εισαγωγή στα Λειτουργικά Συστήματα ( Θ+Ε ) - (Β' Εξάμηνο)</li>
          <li>
            Δομές Δεδομένων και Ανάλυση Αλγορίθμων ( Θ+Ε ) - ( Γ' Εξάμηνο )
          </li>
          <li>Τεχνολογία Βάσεων Δεδομένων ( Θ+Ε ) - ( Δ' Εξάμηνο )</li>
          <li>
            Τηλεπικοινωνίες και Δίκτυα Υπολογιστών ( Θ+Ε ) - ( Δ' Εξάμηνο )
          </li>
          <li>Μηχανική Λογισμικού Ι ( Θ+Ε ) - ( Ε' Εξάμηνο )</li>
          <li>
            Επιλογής υποχρεωτικά Μαθήματα Κατεύθυνσης του ΣΤ' και Ζ' Εξαμήνου τα
            οποία συμπληρώνουν 24 (από τις 30 υποχρεωτικές) πιστωτικές μονάδες
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="old-program__grid">
      <!-- Left Column -->
      <div class="old-program__grid-col">
        <div class="old-program__grid-container">
          <h2 class="old-program__grid-header">Οδηγοί Πρακτικής Άσκησης</h2>
          <div
            v-for="(item, index) in infoGuides"
            :key="index"
            class="space-y-4"
          >
            <a
              :href="`assets/pdf/palioprogramma/${item.pdf}.pdf`"
              target="_blank"
            >
              <div class="old-program__grid-info">
                {{ item.title }}
                <font-awesome-icon :icon="['fas', 'file-pdf']" size="lg" />
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="old-program__grid-col">
        <div class="old-program__grid-container">
          <h2 class="old-program__grid-header">
            Οδηγίες - Πληροφορίες για το σύστημα Πρακτικής Άσκησης ΑΤΛΑΣ
          </h2>
          <div
            v-for="(item, index) in infoInstructions"
            :key="index"
            class="space-y-4"
          >
            <a
              :href="`assets/pdf/palioprogramma/${item.pdf}.pdf`"
              target="_blank"
            >
              <div class="old-program__grid-info">
                {{ item.title }}
                <font-awesome-icon :icon="['fas', 'file-pdf']" size="lg" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import oldProgramData from "@/constants/oldProgramData";

const infoGuides = oldProgramData.slice(0, 2);
const infoInstructions = oldProgramData.slice(2);
</script>
  
  <style lang="scss" scoped>
@import "@/assets/variables.scss";

.old-program {
  @apply container mx-auto px-4 py-8 space-y-12;
  &-requirements {
    @apply p-10 rounded-lg shadow-2xl;
    &__header {
      @apply md:text-5xl  text-3xl font-extrabold mb-6 leading-snug;
      color: $primary-dark-blue-color;
    }
    &__text {
      @apply mt-2 text-xl font-medium  mb-5;
      color: $primary-blue-color;
    }
    &__list {
      @apply pl-5 space-y-3;
      list-style: none;
      li:before {
        content: "✓";
        display: inline-block;
        margin-right: 8px;
        color: $primary-blue-color;
        font-weight: bold;
      }
    }
    &__note {
      @apply bg-gray-50 p-5 rounded mt-4;
    }
  }

  &__grid {
    @apply grid grid-cols-1 md:grid-cols-2 gap-12;
    &-col {
      @apply md:col-span-1;
    }
    &-container {
      @apply bg-white p-8 rounded-lg shadow-lg space-y-6;
    }
    &-header {
      @apply text-2xl font-bold  mb-4;
      color: $primary-dark-blue-color;
    }
    &-info {
      @apply flex justify-between items-center border-2 rounded-lg p-5 hover:shadow-2xl cursor-pointer transition-transform transform hover:scale-105;

      &:hover {
        color: $primary-blue-color;
      }
    }
  }
}
</style>
  