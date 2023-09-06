<template>
    <Form @submit="submit">
       <app-text-input name="username" :label="$t('username')"></app-text-input>
       <app-text-input name="email" :label="$t('email')"></app-text-input>
       <app-text-input name="password" :label="$t('password')" type="password"></app-text-input>
       <app-button :loading="loading" type=submit class="btn btn-secondary btn-block my-4">{{$t("register")}}</app-button>
    </Form>
</template>

<script setup lang="ts">
import {Form} from "vee-validate"
const submit = ()=>{
    console.log("submit")
}
const loading = ref(false)
</script>

<style scoped>

</style>