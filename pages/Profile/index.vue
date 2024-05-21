<template>
  <div class="profile" data-aos="flip-up" data-aos-duration="1000">
    <ProfileUserData />
    <ProfileUserDikaiologitika />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.profile {
  @apply container mx-auto px-4 py-8 space-y-12;
}
</style>
