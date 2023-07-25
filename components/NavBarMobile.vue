<template>
  <div
    v-show="props.isMenuOpen"
    class="mobile-menu flex flex-col sm:hidden bg-gray-50"
  >
    <NuxtLink
      v-for="link in links"
      :key="link.text"
      :to="link.route"
      class="mobile-menu__item"
      @click.prevent="emitCloseMenu"
    >
      {{ link.text }}
    </NuxtLink>
  </div>
</template>

<script setup>
import links from "@/constants/links.js";

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
  &__item {
    display: block;
    padding: 0.5rem 1rem 0.5rem 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #6b7280;
  }
  &__item:hover {
    background-color: #f3f4f6;
  }
}
.router-link-exact-active {
  font-weight: bold;
  color: $navbar_active_color;
}
</style>
