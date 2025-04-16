import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  icon: {
    mode: 'svg',
  },
  image: {
    domains: ['flagcdn.com', 'netlify.app'],
  },
})
