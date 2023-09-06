// https://nuxt.com/docs/api/configuration/nuxt-config

import { PROXY_CONFIG } from "./composables/api/api.config";

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  css: ["@/assets/css/tailwind.css"],
  // typescript: {typeCheck:true},
  build:{
    transpile:['gsap']
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // extends:['github: lida-sh/app-cmps-layer#v1.0'],
  // vite: {
  //   server: {
  //     proxy: PROXY_CONFIG
  //   }
  // }
 nitro: {
   devProxy: PROXY_CONFIG
 }
   
  
})
