<template>
  <div class="announcement" ref="container">
    <div
      class="announcement-title"
      :class="{ 'activate-Animation': activateAnimation }"
      ref="titleRef"
    >
      {{ title }}
    </div>
    <div class="announcement-name">{{ date }}</div>
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
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@import "@/assets/variables.scss";

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.announcement {
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 3rem;
  padding-left: 12px; // increased padding
  padding-bottom: 5px;
  justify-content: space-between;
  border-left: 4px solid rgba($primary-dark-blue-color, 0.8); // make border slightly transparent
  border-radius: 0.5rem; // increased border-radius
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.1); // subtle background
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // subtle shadow
  transition:
    transform 0.3s,
    box-shadow 0.3s; // transition effect

  &:hover {
    transform: scale(1.02); // slight zoom on hover
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); // enhanced shadow on hover

    .activate-Animation {
      overflow: visible;
      white-space: nowrap;
      animation: marquee 4s linear infinite;
    }
  }
}

.announcement-title {
  font-weight: 500; // slightly bolder
  color: rgba(0, 0, 0, 0.7); // softer color
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px; // spacing to prevent text from touching the edge
}

.announcement-name {
  @apply text-sm text-gray-700; // slightly darker color
  font-style: italic; // style variation
}
</style>
