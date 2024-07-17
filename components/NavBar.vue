<template>
  <div class="navbar">
    <nav ref="navbarRef" class="navbar__nav">
      <div class="navbar__container">
        <div class="navbar__logo-container" @click="navigateToHome">
          <div class="navbar__logo">
            <img
              class="navbar__logo-img"
              src="/img/navbarImg/ihuLogo.svg"
              alt="ihu logo"
            />
          </div>
          <div class="navbar__title">
            <p>ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ</p>
            <p class="navbar__subtitle">TMHMA M.Π.H.Σ ΣΙΝΔΟΥ</p>
          </div>
        </div>
        <div class="navbar__mobile-button" @click="toggleNav">
          <button type="button" class="navbar__mobile-button-icon">
            <svg viewBox="0 0 24 24" class="navbar__mobile-button-svg">
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
        class="navbar__menu"
      >
        <template v-for="(item, index) in navbarLinks" :key="index">
          <div v-if="item.children" class="navbar__submenu">
            <button
              class="navbar__item--animated"
              :class="{
                'submenu-icon': activeChildMenu === index,
                'submenu-text': item.text === 'ΟΔΗΓΟΙ ΠΡΑΚΤΙΚΗΣ',
              }"
              @click="toggleChildMenu(index)"
            >
              {{ item.text }}

              <svg
                class="svg-icon"
                :class="{ 'rotate-180': activeChildMenu === index }"
                style=""
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
                  class="navbar__submenu--item"
                >
                  <NuxtLink :to="child.route">{{ child.name }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <NuxtLink
            v-else-if="item.route"
            :to="item.route"
            class="navbar__item--animated"
          >
            {{ item.text }}
          </NuxtLink>
          <button v-else class="navbar__item--animated" @click="item.action">
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
  // { text: "ΕΡΩΤΗΜΑΤΟΛΟΓΙΟ ΕΤΑΙΡΕΙΑΣ", route: "/companyPage" },
  { text: "ABOUT", route: "/about" },
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

const navigateToLogin = () => {
  try {
    window.location.href = `${API_URLS.REDIRECT_TO_IHU_IEE_FOR_LOGIN}`;
  } catch (error) {
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
      text: "ΠΡΟΓΡΑΜΜΑΤΑ ΠΡΑΚΤΙΚΗΣ",
      children: [
        {
          name: "ΠΡΟΓΡΑΜΜΑΤΑ ΠΡΑΚΤΙΚΗΣ ΓΙΑ ΤΟ ΝΕΟ ΤΜΗΜΑ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΗΛΕΚΤΡΟΝΙΚΩΝ ΣΥΣΤΗΜΑΤΩΝ",
          route: "/IhuInternshipGuides",
        },
        {
          name: "ΠΡΟΓΡΑΜΜΑΤΑ ΠΡΑΚΤΙΚΗΣ ΓΙΑ ΤΟ ΠΡΩΗΝ ΤΜΗΜΑ ΜΗΧΑΝΙΚΩΝ ΠΛΗΡΟΦΟΡΙΚΗΣ",
          route: "/ItTeitheInternshipGuides",
        },
        {
          name: "ΠΡΟΓΡΑΜΜΑΤΑ ΠΡΑΚΤΙΚΗΣ ΓΙΑ ΤΟ ΠΡΩΗΝ ΤΜΗΜΑ ΜΗΧΑΝΙΚΩΝ ΗΛΕΚΤΡΟΝΙΚΗΣ",
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
  @apply bg-white border-b-2;
  &__nav {
    @apply px-2 py-2 md:flex md:justify-between md:items-center;
  }
  &__container {
    @apply flex justify-between items-center;
  }
  &__logo-container {
    @apply flex justify-between items-center;
  }
  &__logo {
    @apply h-10 w-11;
    &-img {
      @apply h-full w-full mx-auto;
    }
  }

  &__title {
    @apply ml-2 flex flex-col font-bold leading-none;
  }

  &__subtitle {
    @apply text-gray-400;
  }

  &__mobile-button {
    @apply md:hidden;
    &-icon {
      @apply text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600;
    }
    &-svg {
      @apply w-6 h-6 fill-current;
    }
  }
  &__menu {
    @apply mt-4 md:mt-0 space-y-4 md:space-y-0 md:flex md:flex-row md:items-center md:space-x-10 justify-end;
  }

  &__submenu {
    &--item {
      width: 48em;
      @apply px-4 py-2 relative hover:bg-gray-100;

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

  &__item--animated {
    color: $secondary-charcoal-color;
    @apply relative w-fit px-2 py-1 flex;

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
.submenu-text {
  @apply flex items-baseline;
}

.rotate-90 {
  transform: rotate(180deg);
}
.svg-icon {
  @apply w-4 h-4 ml-2 align-baseline overflow-hidden;
  fill: currentColor;
}
</style>
