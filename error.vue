<template>
  <div class="flex flex-col items-center justify-center space-y-2 h-screen bg-gradient-to-tr from-purple-300 via-purple-100 to-purple-500">
     <h1 class="text-5xl text-black">{{error.statusCode}}</h1>
     <p class="">{{error.statusMessage}}</p>
     <button class="btn btm-secondary" @click="handleError">بازگشت به صفحه اصلی</button>
  </div>
</template>

<script setup lang="ts">
type ErrorProp = {
    statusCode: string;
    statusMessage:string;
}
defineProps<{error:ErrorProp}>()
const handleError = ()=>clearError({redirect: "/"})
</script>

<style scoped>
</style>