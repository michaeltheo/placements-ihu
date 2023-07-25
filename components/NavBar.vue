<template>
  <div class="flex-1 flex flex-col relative">
    <NavBarDesktop ref="navbarRef" @toggle-menu="toggleMenu" />
    <div
      v-show="isMenuOpen"
      ref="mobileMenuRef"
      class="mobileMenu flex flex-col sm:hidden bg-gray-50"
    >
      <NavBarMobile :is-menu-open="isMenuOpen" @close-menu="closeMenu" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
const isMenuOpen = ref(true);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// click outside to close
const mobileMenuRef = ref(null);
const navbarRef = ref(null);
onClickOutside(
  mobileMenuRef,
  () => {
    isMenuOpen.value = false;
  },
  { ignore: [navbarRef] }
);
</script>
