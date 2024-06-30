<template>
  <!--*
     * DeveloperCard Component
     *
     * This component displays a card for a developer with their name, AM, icon, description,
     * and links to their GitHub and LinkedIn profiles.
     *
     * @prop {Developer} developer - The developer object containing details like name, AM, icon,
     *                               description, GitHub URL, and LinkedIn URL.
     -->
  <v-card
    class="developer-card"
    :title="props.developer.name"
    :subtitle="'AM: ' + props.developer.AM"
  >
    <template v-slot:prepend>
      <v-avatar color="primary-dark-blue">
        <v-icon class="developer-card-icon">fa-solid fa-laptop-code</v-icon>
      </v-avatar>
    </template>
    <template v-slot:append>
      <v-avatar size="50">
        <v-img
          v-if="props.developer.icon"
          aspect-ratio="4/3"
          cover
          :src="'/img/developers/' + props.developer.icon"
          alt="Developer Avatar"
        ></v-img>
        <v-icon v-else> fa-solid fa-user </v-icon>
      </v-avatar>
    </template>
    <v-card-text>{{ props.developer.description }}</v-card-text>
    <v-card-actions>
      <v-btn
        class="developer-card-button"
        :href="props.developer.github_url"
        target="_blank"
        variant="plain"
      >
        <v-icon color="black" size="35">fa-brands fa-github</v-icon>
        <v-tooltip activator="parent" location="bottom">
          Μετάβαση στην Github σελίδα του χρήστη {{ props.developer.name }}
        </v-tooltip>
      </v-btn>
      <v-btn
        class="developer-card-button"
        :href="props.developer.linkedin_url"
        target="_blank"
        variant="plain"
      >
        <v-icon color="primary-dark-blue" size="35"
          >fa-brands fa-linkedin</v-icon
        >
        <v-tooltip activator="parent" location="bottom">
          Μετάβαση στην Linkedin σελίδα του χρήστη {{ props.developer.name }}
        </v-tooltip>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Developer } from "@/types/user";

const props = defineProps<{
  developer: Developer;
}>();
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.developer-card {
  @apply p-2 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl;

  &-icon {
    @apply flex;
  }
  &-button {
    &:hover {
      transform: translateY(-7px);
    }
  }
}
:deep .v-card-text {
  color: $primary-dark-blue-color;
}
</style>
