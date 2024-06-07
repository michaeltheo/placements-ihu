<template>
  <button
    class="button"
    :class="{ 'button-glow': props.glow }"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <p class="button__text">
      {{ props.text }}
    </p>
    <div class="button__icon">
      <font-awesome-icon :icon="['fas', 'chevron-right']" :beat="isHovered" />
    </div>
  </button>
</template>

/** * BaseButton Component: * * @param {string} text - Display text of the
button. * @param {Boolean} glow - Enables glowing hover effect. Set to `false`
to disable. * * Usage: *
<BaseButton text="Button Text" />
*
<BaseButton text="Button Text" :glow="false" />
*/

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  glow: {
    type: Boolean,
    default: true,
  },
});

// Ref to track hover state
const isHovered = ref(false);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.button {
  @apply flex  text-white rounded-full px-5 py-2 cursor-pointer transform transition-transform  hover:scale-105 items-center;
  background-color: $primary-dark-blue-color;
  &-glow:hover {
    background-color: $primary-blue-color;
    box-shadow: 0 0.2rem 0.7rem $primary-blue-color;
  }
  &__text {
    @apply w-full text-center;
  }
  &__icon {
    @apply ml-4;
  }
}
</style>
