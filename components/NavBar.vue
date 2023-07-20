<template>
  <div class="flex-1 flex flex-col relative">
    <nav class="navbar flex p-3 bg-white border-b-2">
      <div class="flex items-center sm:w-auto w-full">
        <div class="navbar__logo h-10 w-11">
          <img
            class="h-full w-full mx-auto"
            src="/img/navbarImg/ihuLogo.svg"
            alt="ihu logo"
          />
        </div>
        <div
          class="navbar__title ml-2 d-flex flex-col font-weight-bold leading-none"
        >
          <p>ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ</p>
          <p class="text-gray-400">TMHMA M.Π.H.Σ ΣΙΝΔΟΥ</p>
        </div>
      </div>
      <div
        class="navbar__items hidden md:flex md:items-center md:justify-end md:flex-1"
      >
        <ul class="navbar__items__list">
          <li class="navbar__items__list__item">
            <NuxtLink
              to="/"
              class="navbar__items__list__item__text navbar__items__list__item__animation"
              >ΑΡΧΙΚΗ</NuxtLink
            >
          </li>
          <li class="navbar__items__list__item">
            <NuxtLink
              to="/guide"
              class="navbar__items__list__item__text navbar__items__list__item__animation"
              >ΟΔΗΓΟΣ</NuxtLink
            >
          </li>
          <li class="navbar__items__list__item">
            <NuxtLink
              to="/announcements"
              class="navbar__items__list__item__text navbar__items__list__item__animation"
              >ΑΝΑΚΟΙΝΩΣΕΙΣ</NuxtLink
            >
          </li>
          <li class="navbar__items__list__item">
            <NuxtLink
              to="/old-program"
              class="navbar__items__list__item__text navbar__items__list__item__animation"
              >ΠΑΛΙΟ ΠΡΟΓΡΑΜΜΑ</NuxtLink
            >
          </li>
          <li class="navbar__items__list__item">
            <font-awesome-icon
              class="cursor-pointer"
              :icon="['fas', 'right-to-bracket']"
            />
          </li>
        </ul>
      </div>

      <div
        class="navbar__button sm:hidden flex justify-end w-full items-center"
      >
        <font-awesome-icon
          :icon="['fas', 'bars']"
          class="cursor-pointer hover:text-gray-600"
          @click="toggleMenu"
        />
      </div>
    </nav>
    <div
      v-show="isMenuOpen"
      class="mobileMenu flex flex-col sm:hidden bg-gray-50"
    >
      <NuxtLink to="/" class="mobileMenu__item" @click.prevent="closeMenu()"
        >ΑΡΧΙΚΗ</NuxtLink
      >
      <NuxtLink
        to="/guide"
        class="mobileMenu__item"
        @click.prevent="closeMenu()"
        >ΟΔΗΓΟΣ</NuxtLink
      >
      <NuxtLink
        to="/announcements"
        class="mobileMenu__item"
        @click.prevent="closeMenu()"
        >ΑΝΑΚΟΙΝΩΣΕΙΣ</NuxtLink
      >
      <NuxtLink
        to="/old-program"
        class="mobileMenu__item"
        @click.prevent="closeMenu()"
        >ΠΑΛΙΟ ΠΡΟΓΡΑΜΜΑ</NuxtLink
      >
      <NuxtLink
        to="/login"
        class="mobileMenu__item"
        @click.prevent="closeMenu()"
        >ΕΙΣΟΔΟΣ</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const isMenuOpen = ref(true);
// toggle menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
// close Menu
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  font-weight: bold;
  color: #0087ca !important;
}
.navbar {
  &__items {
    &__list {
      display: flex;
      align-items: center;
      &__item {
        padding-right: 1.5rem;
        &__text {
          color: #374151;
        }
        &__animation {
          display: inline-block;
          position: relative;
        }
        &__animation::after {
          padding-right: 2em;
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 0.1rem;
          bottom: 0;
          left: 0;
          background-color: #0087ca;
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }
        &__animation:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      }
    }
  }
}

.mobileMenu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  &__item {
    display: block;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #6b7280;
  }
  &__item:hover {
    background-color: #f3f4f6;
  }
}
</style>
