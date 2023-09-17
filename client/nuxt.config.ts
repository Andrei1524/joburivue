// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    { path: '~/components/layout' },
    { path: '~/components/buttons' },
    { path: '~/components/_shared' },
    '~/components',
  ],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'dayjs-nuxt',
    'nuxt-icon',
  ],
  imports: {
    dirs: ['./stores'],
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  googleFonts: {
    display: 'swap',
    families: {
      Roboto: {
        wght: [300, 400, 500, 700],
      },
    },
  },
  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
      },
      {
        name: 'Romanian',
        code: 'ro',
        iso: 'ro-RO',
        file: 'ro.json',
      },
    ],
    langDir: 'locales/',
    strategy: 'no_prefix',
    defaultLocale: 'en',
  },
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      NODE_ENV: '',
    },
  },
});
