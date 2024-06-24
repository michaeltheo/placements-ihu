<!--
/**
 * Announcement Component
 *
 * This component displays an announcement with a title, body content, author details, and attachments.
 *
 * @param {Object} announcement - The announcement object containing details to display.
 * @param {string} announcement.title - The title of the announcement.
 * @param {string} announcement.body - The HTML body content of the announcement.
 * @param {string} announcement.created_at - The creation date of the announcement.
 * @param {Object} announcement.author - The author of the announcement.
 * @param {string} announcement.author.name - The name of the author.
 * @param {Array<Object>} [announcement.attachments] - The list of attachments related to the announcement.
 * @param {number} announcement.attachments[].id - The ID of the attachment.
 * @param {string} announcement.attachments[].attachment_url - The URL of the attachment.
 * @param {string} announcement.attachments[].filename - The filename of the attachment.
 */
-->
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
          <v-icon>fa-solid fa-paperclip</v-icon>
          {{ attachment.filename }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
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
      color: $secondary-independence-color;
    }
  }
}
</style>
