<template>
  <div>
    <nuxt-layout>
      <nuxt-page></nuxt-page>
    </nuxt-layout>
    <app-modal v-model="loginModel">
      <auth isDialog></auth>
    </app-modal>
    <app-toast></app-toast>
  </div>
</template>
<script setup>
import '@/assets/css/tailwind.css'
import { useAuthStore } from '~~/composables/auth/Auth.store'
import { useLoginDialog } from './composables/auth/login/useLoginDialog'
import Auth from "./pages/auth.vue"
const authStore = useAuthStore()
const {loginModel} = useLoginDialog()
onMounted(()=>{
  authStore.fetchAndSetIdentityIfLoggedIn()
})

</script>
