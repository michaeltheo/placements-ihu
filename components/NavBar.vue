<template>
  <div class="navbar bg-white border-b-2">
    <nav
      ref="navbarRef"
      class="px-2 py-2 md:flex md:justify-between md:items-center"
    >
      <div class="flex justify-between items-center">
        <div
          class="flex items-center justify-start cursor-pointer"
          @click="navigateToHome"
        >
          <div class="navbar__logo h-10 w-11">
            <img
              class="h-full w-full mx-auto"
              src="/img/navbarImg/ihuLogo.svg"
              alt="ihu logo"
            />
          </div>
          <div
            class="navbar__title ml-2 d-flex flex-col font-weight-bold leading-none"
          >
            <p>ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ</p>
            <p class="text-gray-400">TMHMA M.Π.H.Σ ΣΙΝΔΟΥ</p>
          </div>
        </div>
        <div class="navbar__mobile-button md:hidden" @click="toggleNav">
          <button
            type="button"
            class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        ref="mobileMenuRef"
        :class="showMenu ? 'block border-t-2' : 'hidden'"
        class="navbar__wrapper mt-4 md:mt-0 space-y-4 md:space-y-0 md:flex md:flex-row md:items-center md:space-x-10 justify-end"
      >
        <template v-for="(item, index) in navbarLinks" :key="index">
          <NuxtLink
            v-if="item.route"
            :to="item.route"
            class="navbar__item--animated px-2 py-1 block"
          >
            {{ item.text }}
          </NuxtLink>
          <button
            v-else
            class="navbar__item--animated px-2 py-1 block"
            @click="item.action"
          >
            {{ item.text }}
          </button>
        </template>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "@/stores/auth";
import links from "@/constants/links";

const authStore = useAuthStore();
const router = useRouter();
const mobileMenuRef = ref(null);
const showMenu = ref(false);

const toggleNav = () => {
  showMenu.value = !showMenu.value;
};

onClickOutside(mobileMenuRef, () => {
  showMenu.value = false;
});

const navigateToHome = () => {
  router.push("/");
};

const navigateToLogin = async () => {
  try {
    const response = await fetch("http://localhost:8000/auth/redirect", {
      method: "GET",
    });

    if (response.ok) {
      window.location.href = response.url;
    } else {
      // Handle server errors or other non-ok responses
      errorLog("Server responded with a non-ok status");
    }
  } catch (error) {
    // Handle network errors or other errors that occurred during the fetch
    errorLog("Failed to fetch:", error);
  }
};

// Function to handle logout action
const handleLogout = () => {
  authStore.logout();
  navigateToHome();
};
const navbarLinks = computed(() => {
  const dynamicLinks = [];

  // Check if the user is authenticated
  if (authStore.isAuthenticated) {
    // If the user is an admin, add an admin page link
    if (authStore.user.isAdmin) {
      dynamicLinks.push({ text: "ΣΕΛΙΔΑ ΔΙΑΧΕΙΡΙΣΤΗ", route: "/adminPage" });
      dynamicLinks.push({
        text: "ΣΕΛΙΔΑ ΣΤΑΤΙΣΤΙΚΩΝ",
        route: "/adminPage/statistics",
      });
    } else {
      // Add profile link for all authenticated users
      dynamicLinks.push({ text: "ΠΡΟΦΙΛ", route: "/profile" });
    }
    dynamicLinks.push({ text: "ΕΞΟΔΟΣ", action: handleLogout });
  } else {
    // If the user is not authenticated, add a login link
    dynamicLinks.push({ text: "ΕΙΣΟΔΟΣ", action: navigateToLogin });
  }

  // Combine the static links with the dynamic links
  return [...links, ...dynamicLinks];
});
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";
.navbar {
  &__item--animated {
    color: $secondary-charcoal-color;
    position: relative;
    width: fit-content;

    &::after {
      padding-right: 2em;
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 0.1rem;
      bottom: 0;
      left: 0;
      background-color: $secondary-charcoal-color;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }
    &:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
}
.router-link-exact-active {
  font-weight: bold;
  color: $secondary-independence-color;
}
</style>
