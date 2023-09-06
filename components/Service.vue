<template>
  <div
    class="
      flex
      space-x-5 space-x-reverse
      bg-white
      rounded-box
      border
      lg:border-none lg:shadow lg:max-w-[20rem]
      p-4
    ">
  <div class="w-16 h-16 text-secondary">
     <slot name="icon"></slot>
  </div>
  <div class="space-y-0-2">
    <h6 class="font-bold prose-sm block">{{title}}</h6>
    <p class="prose-sm block text-justify">{{description}}</p>
  </div>
   
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
      title: {
          type:String
      },
      description: {
          type: String
      }
    },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>