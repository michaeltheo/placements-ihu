<template>
  <div class="footer mx-auto px-4 sm:px-6 lg:px-8">
    <div
      class="footer__content flex flex-col sm:flex-row sm:justify-around mb-5 pt-4"
    >
      <div class="footer__links mb-6 sm:mb-0">
        <h5 class="footer__header">Χρήσιμοι Σύνδεσμοι</h5>
        <div class="ml-4">
          <a href="https://www.espa.gr/el/Pages/default.aspx" target="_blank">
            <img
              class="footer__image mb-4"
              alt="espa"
              src="/img/footerImg/espaFooter.jpg"
            />
          </a>
          <a href="http://praktiki.teithe.gr/" target="_blank">
            <img
              class="footer-image"
              alt="teithe"
              src="/img/footerImg/teitheFooter.jpg"
            />
          </a>
        </div>
      </div>
      <div class="footer__contact lg:ml-4 md:ml-3">
        <h5 class="footer__header">Στοιχεία Επικοινωνίας</h5>
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
import { thisYear } from "@/composables/dateMixins";
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";

.footer {
  background-color: $primary-color;
  color: $primary-sonicSilver-color;
  a {
    transition: color 0.2s;
    color: $primary-blue-color;
    &:hover {
      color: $primary-dark-blue-color;
    }
  }
  &__header {
    @apply border-l-2 border-slate-400  pl-6 mb-2 text-xl;
  }
  &__image {
    width: 100%;
    height: fit-content;
  }
  &__bottom-text {
    @apply text-sm;
  }
}
</style>
