<template>
  <button
    class="button"
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

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});

// Ref to track hover state
const isHovered = ref(false);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.button {
  display: flex;
  background-color: $primary-dark-blue-color;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: $primary-blue-color;
    box-shadow: 0 0.2rem 0.7rem $primary-blue-color;
  }
  &__text {
    width: 100%;
    text-align: center;
  }

  &__icon {
    margin-left: 1em;
  }
}
</style>
