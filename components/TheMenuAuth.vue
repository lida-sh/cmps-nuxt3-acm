<template>
    <div class="min-w-24 relative transition duration-1000" :class="{'opacity-0':!authStore.getFullName}">
       <button class="btn btn-link no-animation lg:ml-4 flex items-center no-underline" @click="openMenu">
          <span>{{ authStore.getFullName }}</span>
          <chevron-down-icon class="w-4 h-4 mr-1"></chevron-down-icon>
       </button>
       <div class="absolute bg-white rounded-box border inset-x-5 top-10 z-30 invisible h-0 flex justify-center" ref="target">
          <button @click="logout" class="text-error p-4 lg:ml-4">خروج</button>
       </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/outline";
import { componentNames } from "~~/.nuxt/components";
import { useAuthStore } from "~~/composables/auth/Auth.store";
import { useLogout } from "~~/composables/auth/useLogout";
import { useMenu } from "~~/composables/useMenu";
const authStore = useAuthStore();
const { logout } = useLogout();
const {target, openMenu} = useMenu()
componentNames:ChevronDownIcon
</script>

<style scoped>

</style>