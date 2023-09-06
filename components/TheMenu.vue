<template>
  <div
    id="the-menu"
    class="
      flex
      justify-between
      items-center
      px-10
      py-2.5
      bg-white
      shadow-lg
      3xl:text-sm
      min-h-[4.25rem]
    "
  >
    <section>
      <button class="block lg:hidden" @click="toggleMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div
        ref="target"
        class="
          absolute
          rounded-box
          border
          shadow-lg
          mt-3
          z-20
          inset-x-10
          h-0
          invisible
          lg:visible
          flex flex-col lg:flex-row
          items-center
          bg-white
          divide-y divide-gray-200
          lg:space-x-2 lg:space-x-reverse
          lg:divide-none
          lg:static
          lg:bg-transparent
          lg:rounded-none lg:shadow-none lg:border-none lg:mt-0 lg:h-auto
        "
      >
        <router-link
          v-for="(item, index) in links"
          :key="`menu-${index}`"
          :to="item.to"
          class="w-full lg:w-auto py-3 pr-4"
          >{{ item.title }}</router-link
        >
      </div>
    </section>
    <section class="flex items-center">
      <client-only>
        <button
          v-if="!authStore.isLoggedIn"
          class="btn btn-link lg:ml-4 no-animation"
          @click="() => open()"
        >
          ورود/ثبت نام
        </button>
        <template v-else>
          <the-menu-auth></the-menu-auth>
        </template>
      </client-only>
      <router-link class="text-gray-600 font-bold" to="/"
        >آکادمی لند</router-link
      >
    </section>
  </div>
</template>

<script setup lang="ts">
import { componentNames } from "~~/.nuxt/components";
import { useAuthStore } from "~~/composables/auth/Auth.store";
import { useLoginDialog } from "~~/composables/auth/login/useLoginDialog";
import { useLogout } from "~~/composables/auth/useLogout";
import { useMenu } from "~~/composables/useMenu";
import { useEnableByRoute } from "~~/composables/useEnableByRoute";
const links = [
  { title: "صفحه اصلی", to: "/" },
  { title: "دوره های آموزشی", to: "/" },
  { title: "مقالات", to: "/" },
  { title: "درباره ما", to: "/" },
];
const { open } = useLoginDialog();
const authStore = useAuthStore();
const { logout } = useLogout();
const { target, openMenu, toggleMenu } = useMenu();
const disable = useEnableByRoute([{name:"courses-slug"}])
const {isFix} = useFixMenu("#the-menu", disable)
</script>

<style scoped>
</style>