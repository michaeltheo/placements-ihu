// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/main.scss"; @import "@/assets/variables.scss"; @import "@fortawesome/fontawesome-svg-core/styles.css"; ',
        }
      }
    }
  }
});
