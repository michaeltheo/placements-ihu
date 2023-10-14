<template>
  <div ref="container" class="miniAnnouncement">
    <div
      ref="titleRef"
      class="miniAnnouncement__title"
      :class="{ 'miniAnnouncement__title-animated': activateAnimation }"
    >
      {{ title }}
    </div>
    <div class="miniAnnouncement__date">{{ date }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
});

const container = ref(null);
const titleRef = ref(null);
const activateAnimation = ref(false);

const checkWidth = () => {
  if (titleRef.value.scrollWidth > titleRef.value.offsetWidth) {
    activateAnimation.value = true;
  }
};

onMounted(() => {
  checkWidth();
});

// React to title changes
watch(() => props.title, checkWidth);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-150%);
  }
}

.miniAnnouncement {
  @apply flex flex-col w-full h-14 pl-3 pb-1.5 justify-between rounded-lg overflow-hidden bg-opacity-10 rounded-l transition-shadow cursor-pointer;
  border-left: 0.3rem solid rgba($primary-dark-blue-color, 0.8);
  box-shadow: 0 0.6rem 6rem rgba(0, 0, 0, 0.1);

  &:hover {
    @apply transform scale-105 shadow-md;

    .miniAnnouncement__title-animated {
      @apply overflow-visible whitespace-nowrap;
      animation: marquee 4s linear infinite;
    }
  }

  &__title {
    @apply font-medium text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis pr-2.5;
  }

  &__date {
    @apply text-sm text-gray-700 italic;
  }
}
</style>
