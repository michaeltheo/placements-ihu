<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    v-show="props.isMenuOpen"
    class="mobile-menu flex flex-col sm:hidden bg-gray-50"
  >
    <NuxtLink to="/" class="mobile-menu-item" @click.prevent="emitCloseMenu"
      >ΑΡΧΙΚΗ</NuxtLink
    >
    <NuxtLink
      to="/guide"
      class="mobile-menu-item"
      @click.prevent="emitCloseMenu"
      >ΟΔΗΓΟΣ</NuxtLink
    >
    <NuxtLink
      to="/announcements"
      class="mobile-menu-item"
      @click.prevent="emitCloseMenu"
      >ΑΝΑΚΟΙΝΩΣΕΙΣ</NuxtLink
    >
    <NuxtLink
      to="/old-program"
      class="mobile-menu-item"
      @click.prevent="emitCloseMenu"
      >ΠΑΛΙΟ ΠΡΟΓΡΑΜΜΑ</NuxtLink
    >
    <NuxtLink
      to="/login"
      class="mobile-menu-item"
      @click.prevent="emitCloseMenu"
      >ΕΙΣΟΔΟΣ</NuxtLink
    >
  </div>
</template>

<script setup>
const props = defineProps({
  isMenuOpen: Boolean,
});

const emit = defineEmits(["closeMenu"]);

const emitCloseMenu = () => {
  emit("closeMenu");
};
</script>

<style lang="scss" scoped>
.mobile-menu {
  width: 55%;
  position: absolute;
  top: 100%;
  left: 0;
  border-bottom-right-radius: 0.6rem;
  &-item {
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
  &-item:hover {
    background-color: #f3f4f6;
  }
}
</style>
