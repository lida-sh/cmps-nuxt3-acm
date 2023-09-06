<template>
    <div>
       <base-text-input v-model="title"></base-text-input>
       {{title}}
       <app-text-input v-model="title" name="title"></app-text-input>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup (props, {emit}) {
     const title = ref("hi")        

        return {title}
    }
})
</script>

<style scoped>

</style>