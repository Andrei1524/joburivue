export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "JoburiVue - Caută joburi vue!",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
      {
        name: "format-detection",
        content: "telephone=no",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/design/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vee-validate.js", ssr: true },
    "~/plugins/axios",
    { src: "~/plugins/vue-stripe.js", ssr: false },
    { ssr: false, src: "~plugins/startup" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    ["nuxt-buefy", { css: false }],
    "@nuxtjs/axios",
    "nuxt-leaflet",
    "@nuxtjs/auth-next",
    "vue2-editor/nuxt",
    "@nuxtjs/dayjs",
  ],

  auth: {
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "access_token",
          global: true,
          maxAge: 604800, // 7 days
          type: "Bearer",
          headers: {
            Referer:
              process.env.NODE_ENV === "production"
                ? process.env.BASE_URL
                : "http://localhost:4000/api/v1", // <- here
          },
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
          maxAge: 60 * 60 * 24 * 30, // 30days
        },
        user: {
          property: "user",
          // autoFetch: false,
        },
        // TODO: put '/api/v1' everywhere used to a constant maybe
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          refresh: { url: "/auth/refresh_token", method: "post" },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "/auth/me", method: "get" },
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "/", // Used as fallback if no runtime config is provided
  },

  dayjs: {
    plugins: ["relativeTime"],
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL:
        process.env.NODE_ENV === "production"
          ? process.env.BASE_URL
          : "http://localhost:4000/api/v1",
    },
  },

  privateRuntimeConfig: {
    axios: {
      browserBaseURL:
        process.env.NODE_ENV === "production"
          ? process.env.BASE_URL
          : "http://localhost:4000/api/v1",
    },
  },

  env: {
    STRIPE_PK: process.env.STRIPE_PK,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: null,
    transpile: ["vee-validate/dist/rules"],
  },
};
