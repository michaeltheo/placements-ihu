<template>
  <div class="navbar flex-1 flex flex-col">
    <nav class="bg-red-100 flex">
      <div class="flex items-center">
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
      <!-- to bar right  -->
      <div class="sm:hidden">hi</div>
    </nav>
    <div v-show="isMenuOpen" class="navbar__mobileMenu flex flex-col sm:hidden">
      <NuxtLink to="/" @click.prevent="closeMenu()">Test</NuxtLink>
      <NuxtLink>Test</NuxtLink>
      <NuxtLink>Test</NuxtLink>
      <NuxtLink>Test</NuxtLink>
    </div>
  </div>
</template>
  
  <script setup>
const isMenuOpen = ref(true);
// close menu
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>
  
  <style lang="scss" scoped>
.test {
  &__text {
    background-color: whitesmoke;
  }
}
</style>
  