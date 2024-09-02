module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  plugins: [],
  rules: {
    "prettier/prettier": 0,
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    "vue/no-v-text-v-html-on-component": "off",
    "vue/v-on-event-hyphenation": "off",
    "vue/v-slot-style": "off",
    "vue/valid-v-slot": "off",
    "vue/attribute-hyphenation": "off",
  },
};
