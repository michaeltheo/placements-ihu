<template>
  <div class="main-announcement">
    <div ref="titleRef" class="main-announcement__title">
      {{ announcement.title }}
    </div>
    <div class="main-announcement__content" v-html="announcement.body"></div>
    <div class="main-announcement__footer">
      <div class="main-announcement__author">
        <div class="main-announcement__author-name">
          {{ announcement.author.name }}
        </div>

        <div class="main-announcement__date">
          {{ announcement.created_at }}
        </div>
      </div>
      <div
        v-if="announcement.attachments && announcement.attachments.length > 0"
      >
        <a
          v-for="attachment in announcement.attachments"
          :key="attachment.id"
          :href="attachment.attachment_url"
          target="_blank"
          class="main-announcement__attachment"
        >
          <font-awesome-icon :icon="['fas', 'paperclip']" />
          {{ attachment.filename }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  announcement: {
    type: Object,
    required: true,
  },
});

const { announcement } = toRefs(props);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.main-announcement {
  @apply flex flex-col w-full px-3 py-4 space-y-4 justify-between rounded-lg overflow-hidden bg-opacity-10 transition-shadow;
  box-shadow: 0 0.6rem 6rem rgba(0, 0, 0, 0.1);
  border-left: 0.4rem solid rgba($primary-dark-blue-color, 0.8);

  &:hover {
    @apply transform scale-105 shadow-md;
  }

  &__title {
    @apply font-medium text-xl md:text-2xl text-gray-500  pr-2.5;
  }

  &__content {
    @apply text-gray-600 text-base md:text-lg leading-relaxed;
    padding: 0.5rem 0;
  }

  &__footer {
    @apply flex flex-col md:flex-row items-start md:items-center justify-between;
  }
  &__author {
    display: flex;
    flex-direction: column;
  }
  &__author-name {
    @apply text-gray-500 text-base;
  }

  &__date {
    @apply text-xs md:text-sm text-gray-700 italic mt-2 md:mt-0;
  }

  &__attachment {
    @apply ml-4 cursor-pointer;
    color: $primary-blue-color;
    &:hover {
      color: $navbar_active_color;
    }
  }
}
</style>
