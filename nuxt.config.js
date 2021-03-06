export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "ECOM - E-commerce",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    `@/assets/css/bootstrap.min.css`,
    `@/assets/css/boxicons.min.css`,
    // `@/assets/css/style.css`,
    `@/assets/css/style.scss`,
    `@/assets/css/custom.css`,
    // `@/assets/css/responsive.css`
    `@/assets/css/responsive.scss`,
    `@/assets/css/home.css`

  ],

  script: [
    "@/assets/js/bootstrap.bundle.min.js",
    "@/assets/js/boxicons.js",
    "@/assets/js/main.js"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/common", "~/plugins/iview"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  axios: {
    baseURL: process.env.BASE_URL,
    credentials: true
  },

  env: {
    baseUrl: process.env.BASE_URL,
    backofficeUrl: process.env.BACKOFFICE_URL
  },
  
  server: {
    port: process.env.SERVER_PORT // default: localhost
  }
};
