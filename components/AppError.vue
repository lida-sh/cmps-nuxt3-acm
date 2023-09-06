<template>
    <div v-if="message !=''"
    class="bg-red-100 text-red-500 rounded prose-sm p-3 border-red-300" :class="{'text-center':center}">
     <slot>
         {{message}}
     </slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{message?:string;center?:boolean}>()
</script>

<style scoped>

</style>