<template>
  <div class="guide" data-aos="zoom-in">
    <div class="guide__nav">
      <div class="guide__nav-header">Περιεχόμενα</div>
      <div class="guide__nav-items">
        <p
          v-for="tab in guidePageData"
          :key="tab.id"
          :class="{ 'guide__nav-item--active': activeTab === tab.id }"
          class="guide__nav-item"
          @click="activeTab = tab.id"
        >
          <a :href="`#${tab.name}`">{{ tab.label }}</a>
        </p>
      </div>
    </div>
    <div class="guide__content">
      <div class="guide__nav-header">Συνοπτικός Οδηγός Πρακτικής Άσκησης</div>
      <div
        v-for="tab in guidePageData"
        :id="tab.name"
        :key="tab.id"
        data-aos="zoom-in-left"
        data-aos-duration="800"
        class="guide__content-section"
      >
        {{ tab.label }}
        <p class="guide__content-text">{{ tab.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import guidePageData from "@/constants/guidePageData";
useHead({
  title: "Οδηγός Πρακτικής",
});
const activeTab = ref(0);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.guide {
  @apply px-4 py-4 mx-auto grid md:grid-cols-3 md:px-6;

  &__nav {
    @apply mb-4 md:pl-12 flex flex-col gap-4 md:text-xl text-gray-400 md:sticky md:top-0 md:h-fit md:items-center sm:items-start;

    &-header {
      @apply md:text-2xl font-bold pb-3;
      color: $primary-dark-blue-color;
    }

    &-items {
      & > *:not(:last-child) {
        margin-bottom: 2rem;
      }
    }

    &-item {
      &:hover {
        color: $primary-dark-blue-color;
      }
      &--active {
        color: $primary-blue-color;
      }
    }
  }
  &__content {
    @apply flex flex-col items-center md:ml-20 md:col-span-2;
    &-section {
      @apply md:text-2xl font-bold  pb-4 md:pb-5;
      color: $primary-blue-color;
    }
    &-text {
      @apply font-normal pt-2 text-gray-700 whitespace-break-spaces;
    }
  }
}
</style>
