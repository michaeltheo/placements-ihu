<template>
  <div class="footer mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row sm:justify-around mb-5 pt-2">
      <div class="footer__links mb-6 sm:mb-0">
        <h5 class="footer-header">Χρήσιμοι Σύνδεσμοι</h5>
        <div class="ml-4">
          <a href="https://www.espa.gr/el/Pages/default.aspx" target="_blank">
            <img class="footer-image mb-4" src="img/footerImg/espaFooter.jpg" />
          </a>
          <a href="http://praktiki.teithe.gr/" target="_blank">
            <img class="footer-image" src="img/footerImg/teitheFooter.jpg" />
          </a>
        </div>
      </div>
      <div class="footer__contact-info">
        <h5 class="footer-header">Στοιχεία Επικοινωνίας</h5>
        <div class="ml-4">
          <p class="text-lg font-semibold">Γραφείο Πρακτικής Άσκησης</p>
          <div class="pt-2">
            <div>
              <font-awesome-icon :icon="['fas', 'location-dot']" />
              Αλεξάνδρειο ΤΕΙ Θεσσαλονίκης
            </div>
            <div class="ml-4 whitespace-pre-wrap">
              {{ placementsInfo.address }}
            </div>
          </div>
          <div class="pt-2 flex items-center">
            <font-awesome-icon :icon="['fas', 'phone']" />
            <a class="ml-2" :href="'tel:' + placementsInfo.phone">{{
              placementsInfo.phone
            }}</a>
          </div>
          <div class="pt-2 flex items-center">
            <font-awesome-icon :icon="['fas', 'paper-plane']" />
            <a :href="'mailto:' + placementsInfo.email" class="ml-2">{{
              placementsInfo.email
            }}</a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="footer__bottom text-center border-t-2 border-slate-400 py-4 px-3"
    >
      <p class="footer__bottom-text">Copyright © 2023 - {{ thisYear }}</p>
      <p class="footer__bottom-text">
        <a class="text-blue-400" href="http://www.it.teithe.gr" target="_blank">
          Τμήμα Μηχανικών Πληροφορικής ΑΤΕΙΘ
        </a>
        , All rights reserved.
      </p>
      <p class="footer__bottom-text">Created by .....</p>
    </div>
  </div>
</template>

<script setup>
import placementsInfo from "@/constants/placementsinfo";
const thisYear = new Date().getFullYear();
</script>
<style lang='scss' scoped>
@import "@/assets/variables.scss";

.footer {
  background-color: $primary-color;
  color: $footer-text-color;
  a {
    transition: color 0.2s;
    color: $primary-blue-color; // Add a transition for a smoother color change
    &:hover {
      color: $primary-dark-blue-color; // Change the color of the link when hovered
    }
  }
  &-header {
    @apply border-l-2 border-slate-400  pl-6 mb-2 text-xl;
  }
  &-image {
    width: 100%;
    height: fit-content;
  }
  &__bottom-text {
    @apply sm:text-base text-sm;
  }
}
</style>