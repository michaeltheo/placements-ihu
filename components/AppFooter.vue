<template>
  <div class="footer">
    <div class="footer__content">
      <div class="footer__links">
        <h5 class="footer__header">Χρήσιμοι Σύνδεσμοι</h5>
        <div class="footer__links-list">
          <a href="https://www.espa.gr/el/Pages/default.aspx" target="_blank">
            <img
              class="footer__image"
              alt="espa"
              src="/img/footerImg/espaFooter.jpg"
            />
          </a>
          <a href="http://praktiki.teithe.gr/" target="_blank">
            <img
              class="footer__image"
              alt="teithe"
              src="/img/footerImg/teitheFooter.jpg"
            />
          </a>
        </div>
      </div>
      <div class="footer__contact">
        <h5 class="footer__header">Στοιχεία Επικοινωνίας</h5>
        <div class="footer__contact-info">
          <p class="footer__contact-title">Γραφείο Πρακτικής Άσκησης</p>
          <div class="footer__contact-details">
            <div class="footer__contact-item">
              <v-icon size="20"> fa-solid fa-location-dot </v-icon>
              ΔΙΠΑΕ Σίνδου
            </div>
            <div class="footer__contact-address">
              {{ placementsInfo.address }}
            </div>
          </div>
          <div class="footer__contact-item">
            <v-icon size="20"> fas fa-phone </v-icon>
            <a
              class="footer__contact-link"
              :href="'tel:' + placementsInfo.phone"
              v-text="placementsInfo.phone"
            ></a>
          </div>
          <div class="footer__contact-item">
            <v-icon size="20"> fa-solid fa-paper-plane </v-icon>
            <a
              :href="'mailto:' + placementsInfo.email"
              class="footer__contact-link"
              v-text="placementsInfo.email"
            ></a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__bottom-text">Copyright © 2023 - {{ thisYear }}</p>
      <p class="footer__bottom-text">
        <a class="footer__link" href="https://www.iee.ihu.gr/" target="_blank">
          Τμήμα Μηχανικών Πληροφορικής και Ηλεκτρονικών Συστημάτων
        </a>
        , All rights reserved.
      </p>
      <p class="footer__bottom-text">Created by Michael Theocharis</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PlacementsInfo {
  address: string;
  phone: string;
  email: string;
}

const thisYear = ref(new Date().getFullYear());

const placementsInfo: PlacementsInfo = {
  address:
    "Τμήμα Μηχανικών Πληροφορικής Τ.Ε - 1ος όροφος\nΤ.Θ. 141, Σίνδος\nΤ.Κ. 57400 - Θεσσαλονίκης",
  phone: "2310013414",
  email: "placement@it.teithe.gr",
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.footer {
  @apply flex flex-col items-center p-4;
  background-color: $primary-color;
  color: $primary-sonicSilver-color;

  &__content {
    @apply flex flex-col justify-evenly mb-5 pt-4 w-full sm:flex-row;
  }

  &__links {
    @apply mb-5 sm:mb-0;
  }

  &__header {
    border-left: 2px solid #718096;
    @apply pl-5 mb-2 text-xl;
  }

  &__links-list {
    @apply ml-5;
  }

  &__image {
    @apply w-full h-auto mb-5;
  }

  &__contact {
    @apply ml-5 md:ml-4 lg:ml-6;
    &-info {
      @apply ml-5;
    }
    &-title {
      @apply text-lg font-semibold;
    }
    &-details {
      @apply pt-2;
    }
    &-item {
      @apply flex items-baseline pt-2;
    }
    &-address {
      @apply ml-4 whitespace-pre-wrap;
    }
    &-link {
      @apply mt-2 ml-3;
      &:hover {
        color: $primary-dark-blue-color;
      }
    }
  }
  &__bottom {
    @apply text-center border-t-2 border-gray-600 py-4 w-full;
    &-text {
      @apply text-sm;
    }
  }
  &__link {
    color: $primary-blue-color;
    &:hover {
      color: $primary-dark-blue-color;
    }
  }
}
</style>
