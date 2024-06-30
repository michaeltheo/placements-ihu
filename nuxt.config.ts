// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  routeRules: {
    "/auth": { ssr: false },
  },
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  modules: [
    "@nuxtjs/tailwindcss",
    "@invictus.codes/nuxt-vuetify",
    "@pinia/nuxt",
    "nuxt-highcharts",
  ],
  css: [
    "@/assets/main.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "vuetify/styles/main.sass",
  ],
  plugins: [
    { src: "@/plugins/aos.client.js", mode: "client" },
    "@/plugins/auth-check.js",
  ],
  build: {
    transpile: ["@vuepic/vue-datepicker", "vuetify"],
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
