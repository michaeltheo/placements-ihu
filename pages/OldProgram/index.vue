<template>
  <div class="container mx-auto px-4 py-8 space-y-12">
    <!-- Header Section -->
    <div
      class="bg-gradient-to-br from-gray-300 to-white-400 p-10 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <h1 class="text-5xl font-extrabold mb-6 leading-tight text-gray-900">
        Προϋποθέσεις για την πραγματοποίηση πρακτικής άσκησης
      </h1>
      <p class="mt-2 text-xl font-semibold text-gray-800 mb-5">
        Για την πραγματοποίηση της Πρακτικής Ασκησης από κάποιον φοιτητή
        (-τρια):
      </p>
      <ul class="pl-5 space-y-3 text-gray-700 custom-list">
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
      </ul>
      <ul class="pl-5 space-y-3 text-gray-700 custom-list">
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
      <div class="pt-2">
        <p class="underline">
          Eνώ για τους φοιτητές, οι οποίοι έχουν επιλέξει κατεύθυνση, είναι τα
          παρακάτω :
        </p>
        <ul class="pl-5 mt-2 space-y-4 text-gray-700 custom-list">
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
            οποία συμπληρώνουν 24(από τις 30 υποχρεωτικές) πιστωτικές μονάδες
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Left Column -->
      <div class="md:col-span-1">
        <div class="bg-white p-8 rounded-lg shadow-lg space-y-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Οδηγοί Πρακτικής Άσκησης
          </h2>
          <div class="space-y-4">
            <div
              class="flex justify-between items-center border rounded-lg p-4 hover:shadow-lg hover:border-green-500 cursor-pointer transition"
            >
              Οδηγός πρακτικής άσκησης φοιτητών ΑΤΕΙΘ - ΕΣΠΑ 2η έκδοση
              <font-awesome-icon :icon="['fas', 'file-pdf']" />
            </div>

            <div
              class="flex justify-between items-center border rounded-lg p-4 hover:shadow-lg hover:border-green-500 cursor-pointer transition"
            >
              Οδηγός πρακτικής άσκησης ΑΤΕI
              <font-awesome-icon :icon="['fas', 'file-pdf']" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="md:col-span-1">
        <div class="bg-white p-8 rounded-lg shadow-lg space-y-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Οδηγίες - Πληροφορίες για το σύστημα Πρακτικής Άσκησης ΑΤΛΑΣ
          </h2>
          <div class="space-y-4">
            <!-- comment i want the divs to open an pdf file so i want them to look more special -->

            <div
              class="flex justify-between items-center border rounded-lg p-4 hover:shadow-lg hover:border-blue-500 cursor-pointer transition"
            >
              Οδηγός Χρήσης Εφαρμογής Φορέων Υποδοχής Πρακτικής Άσκησης
              <font-awesome-icon :icon="['fas', 'file-pdf']" />
            </div>
            <div
              class="flex justify-between items-center border rounded-lg p-4 hover:shadow-lg hover:border-blue-500 cursor-pointer transition"
            >
              Εγχειρίδιο Εφαρμογής Φοιτητών
              <font-awesome-icon :icon="['fas', 'file-pdf']" />
            </div>
            <div
              class="flex justify-between items-center border rounded-lg p-4 hover:shadow-lg hover:border-blue-500 cursor-pointer transition"
            >
              Οδηγός Εγγραφής Φορέων Υποδοχής Πρακτικής Άσκησης
              <font-awesome-icon :icon="['fas', 'file-pdf']" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
</script>
  
  <style lang="scss" scoped>
@import "@/assets/variables.scss";
.custom-list {
  list-style: none;

  li:before {
    content: "✓";
    display: inline-block;
    margin-right: 8px;
    color: $primary-blue-color; /* Tailwind's green-500 color */
    font-weight: bold;
  }
}
</style>
  