<!--
/**
 * UserData Component
 *
 * This component displays the user profile information in a card layout. It fetches user details from
 * the authentication store and presents them in a structured format with icons and labels.
 *
 * @prop {Object} user - The user object containing user details.
 * @prop {string} user.first_name - The first name of the user.
 * @prop {string} user.last_name - The last name of the user.
 * @prop {string} [user.reg_year] - The registration year of the user.
 * @prop {string} [user.AM] - The registration number of the user.
 * @prop {string} [user.role] - The role of the user.
 * @prop {string} [user.telephone_number] - The telephone number of the user.
 * @prop {string} [user.email] - The email address of the user.
 * @prop {string} [user.department] - The department of the user.
 */
-->
<template>
  <section class="profile__section profile__section--user">
    <v-card class="profile__card">
      <v-card-title class="profile__name">
        {{ user.first_name }} {{ user.last_name }}
      </v-card-title>
      <v-card-subtitle class="profile__subtitle"
        >Πληροφορίες Χρήστη</v-card-subtitle
      >
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" class="profile__col">
            <v-icon class="profile__icon" color="primary-blue-color"
              >fa-solid fa-calendar</v-icon
            >
            <span class="profile__label">Έτος Εγγραφής:</span>
            <span class="profile__value">{{ userRegYear ?? "N/A" }}</span>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <v-icon class="profile__icon" color="primary-blue-color"
              >fa-solid fa-passport</v-icon
            >
            <span class="profile__label">Αριθμός Μητρώου:</span>
            <span class="profile__value">{{ userAM ?? "N/A" }}</span>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <v-icon class="profile__icon" color="primary-blue-color"
              >fa-regular fa-user</v-icon
            >
            <span class="profile__label">Role:</span>
            <span class="profile__value">{{ userRole ?? "N/A" }}</span>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <v-icon class="profile__icon" color="primary-blue-color"
              >fa-solid fa-phone</v-icon
            >
            <span class="profile__label">Τηλέφωνο:</span>
            <span class="profile__value">{{
              !userTelephone || userTelephone != "0" ? userTelephone : "N/A"
            }}</span>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <v-icon class="profile__icon" color="primary-blue-color"
              >fa-solid fa-envelope</v-icon
            >
            <span class="profile__label">Email:</span>
            <span class="profile__value">{{ userEmail ?? "N/A" }}</span>
          </v-col>
          <v-col cols="12" md="6" class="profile__col">
            <v-icon class="profile__icon" color="primary-blue-color"
              >fa-solid fa-school</v-icon
            >
            <span class="profile__label">Τμήμα:</span>
            <span class="profile__value">{{ userDepartment ?? "N/A" }}</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types/user";

// Fetch user details from the auth store
const authStore = useAuthStore();
const user = computed<User>(() => authStore.user);

// Define computed properties for user details
const userRegYear = computed(() => user.value.reg_year);
const userAM = computed(() => user.value.AM);
const userRole = computed(() => user.value.role);
const userTelephone = computed(() => user.value.telephone_number);
const userEmail = computed(() => user.value.email);
const userDepartment = computed(() => user.value.department);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.profile__section--user {
  @apply my-8;

  .profile__card {
    @apply p-4 rounded-lg shadow-lg;

    &-name {
      @apply text-3xl font-bold mb-4 flex items-center;
      color: $primary-dark-blue-color;
    }

    &-subtitle {
      @apply text-xl font-medium mb-4;
      color: $primary-dark-blue-color;
    }

    .profile__col {
      @apply flex items-baseline;

      .profile__icon {
        @apply mr-2;
      }

      .profile__label {
        @apply text-lg font-semibold mr-2;
        color: $primary-dark-blue-color;
      }

      .profile__value {
        @apply text-lg;
        color: $primary-dark-blue-color;
      }
    }
  }
}
</style>
