<template>
  <div ref="container" class="announcement">
    <div
      ref="titleRef"
      class="announcement__title"
      :class="{ 'announcement__title-animated': activateAnimation }"
    >
      {{ props.title }}
    </div>
    <div class="announcement__date">{{ props.date }}</div>
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

let resizeObserver;

const checkWidth = () => {
  if (
    titleRef.value &&
    titleRef.value.scrollWidth > titleRef.value.offsetWidth
  ) {
    activateAnimation.value = true;
  } else {
    activateAnimation.value = false;
  }
};

onMounted(() => {
  resizeObserver = new ResizeObserver(checkWidth);

  if (titleRef.value) {
    resizeObserver.observe(titleRef.value);
  }

  watch(titleRef, (newVal, oldVal) => {
    if (oldVal) {
      resizeObserver.unobserve(oldVal);
    }

    if (newVal) {
      resizeObserver.observe(newVal);
    }
  });

  onBeforeUnmount(() => {
    if (titleRef.value) {
      resizeObserver.unobserve(titleRef.value);
    }
    resizeObserver.disconnect();
  });
});
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

.announcement {
  @apply flex flex-col w-full h-14 pl-3 pb-1.5 justify-between rounded-lg overflow-hidden bg-opacity-10 rounded-l transition-shadow cursor-pointer;
  border-left: 0.3rem solid rgba($primary-dark-blue-color, 0.8);
  box-shadow: 0 0.6rem 6rem rgba(0, 0, 0, 0.1);

  &:hover {
    @apply transform scale-105 shadow-md;

    .announcement__title-animated {
      @apply overflow-visible whitespace-nowrap;
      animation: marquee 5s linear infinite;
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
