<template>
  <div class="test">
    <div class="test__text">
      <h1>{{ isMobile() }}</h1>
    </div>
  </div>
</template>

<script setup>
import { isMobile } from "@/composables/isMobile";
</script>

<style lang="scss" scoped>
.test {
  &__text {
    background-color: black;
    color: white;
  }
}
</style>
