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
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        ref="mobileMenuRef"
        :class="showMenu ? '' : 'hidden'"
        class="navbar__wrapper mt-4 md:mt-0 space-y-4 md:space-y-0 md:flex md:flex-row md:items-center md:space-x-10 justify-end"
      >
        <template v-for="(item, index) in navbarLinks" :key="index">
          <div v-if="item.children" class="relative">
            <button
              class="navbar__item--animated px-2 py-1 block"
              :class="{
                'submenu-icon': activeChildMenu === index,
                test: item.text === 'ΟΔΗΓΟΙ ΠΡΑΚΤΙΚΗΣ',
              }"
              @click="toggleChildMenu(index)"
            >
              {{ item.text }}

              <svg
                class="svg-icon"
                :class="{ 'rotate-180': activeChildMenu === index }"
                style="
                  width: 1em;
                  height: 1em;
                  margin-left: 0.5em;
                  vertical-align: baseline;
                  fill: currentColor;
                  overflow: hidden;
                "
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M200.405333 415.573333l283.818667 243.285334a42.666667 42.666667 0 0 0 55.552 0l283.776-243.242667a36.266667 36.266667 0 0 0-43.733333-57.770667l-244.138667 162.773334a42.666667 42.666667 0 0 1-47.36 0L244.181333 357.845333A36.266667 36.266667 0 0 0 200.405333 415.573333z"
                />
              </svg>
            </button>
            <div
              v-if="activeChildMenu === index"
              class="absolute mt-2 bg-white border rounded shadow-lg z-50"
            >
              <ul>
                <li
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                  class="navbar__submenu--item px-4 py-2 hover:bg-gray-100"
                >
                  <NuxtLink :to="child.route">{{ child.name }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <NuxtLink
            v-else-if="item.route"
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
import { onClickOutside } from "@vueuse/core";
import { API_URLS } from "@/constants/apiConfig";
import { useAuthStore } from "@/stores/auth";
const links = [
  { text: "ΟΔΗΓΟΣ", route: "/guide" },
  { text: "ΑΝΑΚΟΙΝΩΣΕΙΣ", route: "/announcements" },
  { text: "ΠΑΛΙΟ ΠΡΟΓΡΑΜΜΑ", route: "/oldProgram" },
];
const authStore = useAuthStore();
const router = useRouter();
const mobileMenuRef = ref(null);
const showMenu = ref(false);
const activeChildMenu = ref(null);

const toggleNav = () => {
  showMenu.value = !showMenu.value;
};

onClickOutside(mobileMenuRef, () => {
  showMenu.value = false;
  activeChildMenu.value = null;
});

const navigateToHome = () => {
  router.push("/");
};

// TODO: change lo
const navigateToLogin = () => {
  try {
    window.location.href = `${API_URLS.REDIRECT_TO_IHU_IEE_FOR_LOGIN}`;
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

const toggleChildMenu = (index) => {
  activeChildMenu.value = activeChildMenu.value === index ? null : index;
};

const navbarLinks = computed(() => {
  const dynamicLinks = [];

  // Check if the user is authenticated
  if (authStore.isAuthenticated) {
    // If the user is an admin, add an admin page link
    if (authStore.user.isAdmin) {
      dynamicLinks.push({ text: "ΣΕΛΙΔΑ ΔΙΑΧΕΙΡΙΣΤΗ", route: "/adminPage" });
    } else {
      // Add profile link for all authenticated users
      dynamicLinks.push({ text: "H ΠΡΑΚΤΙΚΗ ΜΟΥ", route: "/profile" });
    }
    dynamicLinks.push({ text: "ΕΞΟΔΟΣ", action: handleLogout });
  } else {
    // If the user is not authenticated, add a login link
    dynamicLinks.push({ text: "ΕΙΣΟΔΟΣ", action: navigateToLogin });
  }

  // Combine the static links with the dynamic links
  return [
    { text: "ΑΡΧΙΚΗ", route: "/" },
    {
      text: "ΟΔΗΓΟΙ ΠΡΑΚΤΙΚΗΣ",
      children: [
        {
          name: "ΟΔΗΓΟΙ ΠΡΑΚΤΙΚΗΣ ΓΙΑ ΤΟ ΝΕΟ ΤΜΗΜΑ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΗΛΕΚΤΡΟΝΙΚΩΝ ΣΥΣΤΗΜΑΤΩΝ",
          route: "/IhuInternshipGuides",
        },
        {
          name: "ΟΔΗΓΟΙ ΠΡΑΚΤΙΚΗΣ ΓΙΑ ΤΟ ΠΡΩΗΝ ΤΜΗΜΑ ΜΗΧΑΝΙΚΩΝ ΠΛΗΡΟΦΟΡΙΚΗΣ",
          route: "/ItTeitheInternshipGuides",
        },
        {
          name: "ΟΔΗΓΟΙ ΠΡΑΚΤΙΚΗΣ ΓΙΑ ΤΟ ΠΡΩΗΝ ΤΜΗΜΑ ΗΛΕΚΤΡΟΝΙΚΗΣ",
          route: "/ElTeitheInternshipGuides",
        },
      ],
    },
    ...links,

    ...dynamicLinks,
  ];
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

.navbar__submenu {
  &--item {
    position: relative;
    width: 48em;

    &::after {
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
.submenu-icon {
  @apply flex flex-row items-baseline;
}
.test {
  @apply flex items-baseline;
}

.rotate-90 {
  transform: rotate(180deg);
}
</style>
