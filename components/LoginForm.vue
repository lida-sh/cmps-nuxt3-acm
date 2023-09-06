<template>
  <app-error center :message="error"></app-error>
  <Form :validation-schema="schema" @submit="submit">
    <app-text-input name="username" :label="$t('username')"></app-text-input>
    <app-text-input name="password" :label="$t('password')"></app-text-input>
    <div class="w-full flex justify-end my-2">
      <div
        class="text-link underline text-sm text-gray-500"
        role="button"
        @click="resetPasswordClick"
      >
        کلمه عبورم را فراموش کردم
      </div>
    </div>
    <app-button
      type="submit"
      class="btn btn-secondary btn-block my-4"
      :loading="loading"
      >{{ $t("login") }}</app-button
    >
  </Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import { useLoginValidator } from "~~/composables/auth/login/login.validator";
import { useLogin } from "~~/composables/auth/login/useLogin";
const emit = defineEmits(["resetPassword"]);
const resetPasswordClick = () => {
  emit("resetPassword");
};
const { schema } = useLoginValidator();
const { error, submit, loading } = useLogin();
</script>

<style scoped>
</style>