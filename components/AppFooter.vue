<template>
  <div class="lol mx-auto text-white px-4 sm:px-6 lg:px-8 bg-slate-500">
    <div class="flex flex-col sm:flex-row sm:justify-around mb-5 pt-2">
      <div class="mb-6 sm:mb-0">
        <h5 class="border-l-2 pl-6 mb-2 mt-1 text-xl">Χρήσιμοι Σύνδεσμοι</h5>
        <div class="my-class">
          <a href="https://www.espa.gr/el/Pages/default.aspx" target="_blank">
            <img
              class="w-full h mb-4"
              src="http://placements.it.teithe.gr/img/logo_espa_2013.jpg"
            />
          </a>
          <a href="http://praktiki.teithe.gr/" target="_blank">
            <img
              class="w-full h-fit"
              src="http://placements.it.teithe.gr/img/praktiki_full.jpg"
            />
          </a>
        </div>
      </div>
      <div>
        <h5 class="border-l-2 pl-6 mb-2 mt-1 text-xl">Στοιχεία Επικοινωνίας</h5>
        <div class="my-class">
          <p class="text-lg font-light">Γραφείο Πρακτικής Άσκησης</p>
          <div class="pt-2">
            <div>
              <font-awesome-icon :icon="['fas', 'location-dot']" />
              Αλεξάνδρειο ΤΕΙ Θεσσαλονίκης
            </div>
            <div class="my-class">Σχολή Τεχνολογικών Εφαρμογών</div>
            <div class="my-class">
              Τμήμα Μηχανικών Πληροφορικής Τ.Ε - 1ος όροφος
            </div>
            <div class="my-class">Τ.Θ. 141, Σίνδος</div>
            <div class="my-class">Τ.Κ. 57400 - Θεσσαλονίκης</div>
          </div>
          <div class="pt-2 flex items-center">
            <font-awesome-icon :icon="['fas', 'phone']" />
            <span class="ml-2">2310 - 013 414</span>
          </div>
          <div class="pt-2 flex items-center">
            <font-awesome-icon :icon="['fas', 'paper-plane']" />
            <a href="mailto:placement@it.teithe.gr" class="ml-2"
              >placement@it.teithe.gr</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="text-center border-t-2 py-4 px-3">
      <p class="sm:text-base text-sm">Copyright © 2023 - {{ thisYear }}</p>
      <p class="sm:text-base text-sm">
        <a class="text-blue-400" href="http://www.it.teithe.gr" target="_blank">
          Τμήμα Μηχανικών Πληροφορικής ΑΤΕΙΘ
        </a>
        , All rights reserved.
      </p>
      <p class="sm:text-base text-sm">Created by .....</p>
    </div>
  </div>
</template>

<script setup>
const thisYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.my-class {
  margin-left: 1rem;
  padding-top: 0.5rem;
}
.lol {
  // background-color: #2b2b2b; // Change the background color to a darker grey
  // color: $navbar_item_color;
  // color: black;
}
p,
a {
  line-height: 1.5; // Increase line-height to improve readability
}
a {
  transition: color 0.2s; // Add a transition for a smoother color change
  &:hover {
    color: #ff5722; // Change the color of the link when hovered
  }
}
</style>
