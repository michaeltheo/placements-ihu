// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/main.scss",
    '@fortawesome/fontawesome-svg-core/styles.css'],
});
