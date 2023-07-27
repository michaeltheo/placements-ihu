<template>
  <div>
    <nav class="navbar-desktop flex p-3 bg-white border-b-2">
      <div class="flex items-center sm:w-auto w-full">
        <div class="navbar-desktop__logo h-10 w-11">
          <img
            class="h-full w-full mx-auto"
            src="/img/navbarImg/ihuLogo.svg"
            alt="ihu logo"
          />
        </div>
        <div
          class="navbar-desktop__title ml-2 d-flex flex-col font-weight-bold leading-none"
        >
          <p>ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ</p>
          <p class="text-gray-400">TMHMA M.Π.H.Σ ΣΙΝΔΟΥ</p>
        </div>
      </div>
      <div class="hidden md:flex md:items-center md:justify-end md:flex-1">
        <ul class="navbar-desktop__list">
          <li
            v-for="(item, index) in links.slice(0, -1)"
            :key="index"
            class="navbar-desktop__list-item"
          >
            <NuxtLink :to="item.route" class="navbar-desktop__link">{{
              item.text
            }}</NuxtLink>
          </li>
          <li class="navbar-desktop__list-item">
            <font-awesome-icon
              class="cursor-pointer"
              :icon="['fas', 'right-to-bracket']"
            />
          </li>
        </ul>
      </div>

      <div class="sm:hidden flex justify-end w-full items-center">
        <font-awesome-icon
          :icon="['fas', 'bars']"
          class="cursor-pointer hover:text-gray-600"
          @click="emit('toggleMenu')"
        />
      </div>
    </nav>
  </div>
</template>

<script setup>
import links from "@/constants/links.js";
const emit = defineEmits(["toggleMenu"]);
</script>

<style lang="scss" scoped>
.navbar-desktop {
  &__list {
    display: flex;
    align-items: center;
    &-item {
      padding-right: 1.5rem;
    }
  }
  &__link {
    color: #374151;
    display: inline-block;
    position: relative;

    &::after {
      padding-right: 2em;
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 0.1rem;
      bottom: 0;
      left: 0;
      background-color: $navbar_active_color;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }
    &:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
}

.router-link-exact-active {
  font-weight: bold;
  color: $navbar_active_color;
}
</style>
