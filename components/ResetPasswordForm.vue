<template>
   <Form @submit="submit">
     <app-text-input name="username" :label="$t('username')"></app-text-input>      
     <app-button type="submit" class="btn btn-secondary btn-block my-4" :loading="loading">{{$t("resetPassword")}}</app-button>
   </Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
const loading = ref(false)
const submit = () => {
  console.log("submit");
};
</script>

<style scoped>
</style>