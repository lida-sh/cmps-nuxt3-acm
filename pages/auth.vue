<template>
  <div
    :class="{
      'bg-white rounded-lg shadow p-4 mx-3 my-4 sm:mx-auto sm:min-w-xs lg:min-w-sm':
        isDialog,
      'px-64 py-5': !isDialog,
    }"
  >
    <div class="flex justify-center">
      <user-icon class="w-16 h-16 text-secondary"></user-icon>
    </div>
    <login-form
      v-if="step == AuthSteps.login"
      @resetPassword="step = AuthSteps.resetPassword"
    ></login-form>
    <register-form v-if="step == AuthSteps.register"></register-form>
    <reset-password-form
      v-if="step == AuthSteps.resetPassword"
    ></reset-password-form>
    <div class="my-8"></div>
    <div
      class="py-2.5 text-center"
      :class="{
        'flex justify-center absolute inset-x-0 bottom-0 bg-gray-100': isDialog,
      }"
    >
      <div
        class="underline text-link"
        role="button"
        @click="toggleRegisterAndLogin"
      >
        {{
          step == AuthSteps.login ? "ثبت نام می کنم" : "ورود به حساب کاربری"
        }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AuthSteps } from "~~/composables/auth/Auth.enum";
import { UserIcon } from "@heroicons/vue/outline";
import { boolean } from "yup/lib/locale";
interface Props {
  isDialog?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isDialog: false,
});
const step = ref<AuthSteps>(AuthSteps.login);
const toggleRegisterAndLogin = () => {
  step.value =
    unref(step) == AuthSteps.login ? AuthSteps.register : AuthSteps.login;
};
</script>

<style scoped>
</style>