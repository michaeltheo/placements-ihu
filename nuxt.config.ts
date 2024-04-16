// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
    },
  },
  routeRules: {
    "/auth": { ssr: false },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@invictus.codes/nuxt-vuetify",
    "@pinia/nuxt",
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
});
