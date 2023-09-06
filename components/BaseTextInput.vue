<template>
   <input type="text" :value="modelValue" @input="handleChange">
</template>

<script setup lang="ts">
defineProps({modelValue:{type:String, default: ""}})
const emit = defineEmits(["update:modelValue"])
const handleChange = ($event)=>{
   emit("update:modelValue", $event.target.value)
}
</script>

<style scoped>

</style>