<template>
  <div class="flex-1 flex flex-col">
    <nav class="px-4 flex justify-between bg-white h-16 border-b-2">
      <!-- top bar left -->
      <div class="flex items-center">
        <!-- Navbar Logo-->
        <div class="h-11 w-11">
          <img
            class="h-full w-full mx-auto"
            src="/img/navbarImg/ihuLogo.svg"
            alt="ihu logo"
          />
        </div>
        <!-- Navbar Title-->
        <div class="ml-2 d-flex flex-col font-weight-bold leading-none">
          <p>ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ</p>
          <p class="text-gray-400">TMHMA M.Π.H.Σ ΣΙΝΔΟΥ</p>
        </div>
      </div>

      <!-- to bar right  -->
      <div class="hidden lg:flex lg:items-center">
        <ul class="flex items-center">
          <li class="pr-2">
            <nuxt-link
              to="/"
              class="pl-8 text-gray-700 hover-underline-animation"
              >ΑΡΧΙΚΗ</nuxt-link
            >
          </li>
          <li class="pr-2">
            <nuxt-link
              to="/guide"
              class="pl-8 text-gray-700 hover-underline-animation"
              >ΟΔΗΓΟΣ</nuxt-link
            >
          </li>
          <li class="pr-2">
            <NuxtLink
              to="announcements"
              class="pl-8 text-gray-700 hover-underline-animation"
              >ΑΝΑΚΟΙΝΩΣΕΙΣ</NuxtLink
            >
          </li>
          <li class="pr-2">
            <a href="#" class="pl-8 text-gray-700 hover-underline-animation"
              >ΠΑΛΙΟ ΠΡΟΓΡΑΜΜΑ</a
            >
          </li>
        </ul>
        <ul class="ps-3 flex items-center">
          <li class="ps-2">
            <a
              :href="`https://login.iee.ihu.gr/authorization/?client_id=${
                useRuntimeConfig().public.CLIENT_ID
              }&response_type=code&scope=profile&redirect_uri=${redirect_uri}`"
            >
              <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
            </a>
          </li>
        </ul>
      </div>

      <div class="flex lg:hidden">
        <button
          type="button"
          class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          aria-label="toggle menu"
          @click="toggleMenu"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
            <path
              fill-rule="evenodd"
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
    <!--    Mobile menu -->
    <div v-show="isMenuOpen" class="flex flex-col sm:hidden">
      <NuxtLink
        to="/"
        class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >ΑΡΧΙΚΗ</NuxtLink
      >
      <NuxtLink
        to="/guide"
        class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >ΟΔΗΓΟΣ</NuxtLink
      >
      <NuxtLink
        to="announcements"
        class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >ΑΝΑΚΟΙΝΩΣΕΙΣ</NuxtLink
      >
      <NuxtLink
        to="old-programm"
        class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >ΠΑΛΙΟ ΠΡΟΓΡΑΜΜΑ</NuxtLink
      >
      <NuxtLink
        to="/login"
        class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >Login</NuxtLink
      >
      <font-awesome-icon
        :icon="['fas', 'right-to-bracket']"
        class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
      />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "Navbar",
  data() {
    return {
      isMenuOpen: false,
      redirect_uri: "http://localhost:3000/auth",
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style>
.hover-underline-animation {
  display: inline-block;
  position: relative;
  /* padding-left: 1em; */
}

.hover-underline-animation::after {
  padding-right: 2em;
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.router-link-exact-active {
  font-weight: bold;
  color: #0087ca;
}
</style>
