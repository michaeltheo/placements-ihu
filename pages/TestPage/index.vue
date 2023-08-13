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
        :glow="false"
        text="ΟΔΗΓΟΣ ΠΡΑΚΤΙΚΗΣ"
        class="test"
      />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.test {
  // width: 1000px;
}
</style>
