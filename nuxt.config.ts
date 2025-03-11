// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@sidebase/nuxt-auth', '@nuxt/eslint'],
  auth: {
    isEnabled: true,
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs',
    },
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})
