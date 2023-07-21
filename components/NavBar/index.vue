<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex-1 flex flex-col relative">
    <NavbarDesktop @toggle-menu="toggleMenu" />
    <div
      v-show="isMenuOpen"
      class="mobileMenu flex flex-col sm:hidden bg-gray-50"
    >
      <NavbarMobile :is-menu-open="isMenuOpen" @close-menu="closeMenu" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isMenuOpen = ref(true);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style lang="scss">
.router-link-exact-active {
  font-weight: bold;
  color: #0087ca !important;
}
</style>
