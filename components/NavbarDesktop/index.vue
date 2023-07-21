<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <nav class="navbar flex p-3 bg-white border-b-2">
      <div class="flex items-center sm:w-auto w-full">
        <div class="navbar-logo h-10 w-11">
          <img
            class="h-full w-full mx-auto"
            src="/img/navbarImg/ihuLogo.svg"
            alt="ihu logo"
          />
        </div>
        <div
          class="navbar-title ml-2 d-flex flex-col font-weight-bold leading-none"
        >
          <p>ΠΡΑΚΤΙΚΗ ΑΣΚΗΣΗ</p>
          <p class="text-gray-400">TMHMA M.Π.H.Σ ΣΙΝΔΟΥ</p>
        </div>
      </div>
      <div
        class="navbar-items hidden md:flex md:items-center md:justify-end md:flex-1"
      >
        <ul class="navbar-items-list">
          <li class="navbar-items-list-item">
            <NuxtLink
              to="/"
              class="navbar-items-list-item-text navbar-items-list-item-animation"
              >ΑΡΧΙΚΗ</NuxtLink
            >
          </li>
          <li class="navbar-items-list-item">
            <NuxtLink
              to="/guide"
              class="navbar-items-list-item-text navbar-items-list-item-animation"
              >ΟΔΗΓΟΣ</NuxtLink
            >
          </li>
          <li class="navbar-items-list-item">
            <NuxtLink
              to="/announcements"
              class="navbar-items-list-item-text navbar-items-list-item-animation"
              >ΑΝΑΚΟΙΝΩΣΕΙΣ</NuxtLink
            >
          </li>
          <li class="navbar-items-list-item">
            <NuxtLink
              to="/old-program"
              class="navbar-items-list-item-text navbar-items-list-item-animation"
              >ΠΑΛΙΟ ΠΡΟΓΡΑΜΜΑ</NuxtLink
            >
          </li>
          <li class="navbar-items-list-item">
            <font-awesome-icon
              class="cursor-pointer"
              :icon="['fas', 'right-to-bracket']"
            />
          </li>
        </ul>
      </div>

      <div class="navbar-button sm:hidden flex justify-end w-full items-center">
        <font-awesome-icon
          :icon="['fas', 'bars']"
          class="cursor-pointer hover:text-gray-600"
          @click="emit('toggleMenu')"
        />
      </div>
    </nav>
  </div>
</template>

<script setup>
const emit = defineEmits(["toggleMenu"]);
</script>

<style lang="scss" scoped>
.navbar {
  &-items {
    &-list {
      display: flex;
      align-items: center;
      &-item {
        padding-right: 1.5rem;
        &-text {
          color: #374151;
        }
        &-animation {
          display: inline-block;
          position: relative;
        }
        &-animation::after {
          padding-right: 2em;
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 0.1rem;
          bottom: 0;
          left: 0;
          background-color: #0087ca;
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }
        &-animation:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      }
    }
  }
}
</style>
