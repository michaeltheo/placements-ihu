<template>
  <div>
    <h1 class="text-green-700 text-3xl text-center">
      Test page to test our components
    </h1>

    <div class="mt-3">
      <BaseComponentsBaseButton
        @click="
          () => {
            console.log('pressed');
          }
        "
        text="ΟΔΗΓΟΣ ΠΡΑΚΤΙΚΗΣ"
        class="test"
      />
    </div>
    <div class="pl-3 pt-3">
      <MiniAnnouncement
        date="22-0-5"
        title="Hello this in an aoef=fegmermgaerfeffefffefffh."
      />
    </div>
    <div>{{ counter }}</div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>

<style lang="scss" scoped>
.test {
  // width: 1000px;
}
</style>
