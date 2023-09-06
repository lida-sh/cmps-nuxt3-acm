<template>
  <div class="flex flex-col space-y-1.5 sm:flex-row sm:space-y-0 sm:justify-between">
    <section class="flex flex-row justify-center space-x-2 space-x-reverse">
      <div
        class="
          flex
          items-center
          justify-center
          shrink-0
          w-7
          h-7
          bg-gray-600
          text-white
          rounded-full
          text-xs
        "
      >{{rowNumber}}</div>
      <div class="">{{video.videoTitle}}</div>
    </section>
    <section class="self-end sm:self-auto flex">
        <span class="block text-gray-500 prose-sm ml-3 sm:ml-4">{{video.duration}}</span>
        <lock-closed-icon v-if="isLocked" class="text-red-500 w-5 h-5"></lock-closed-icon>
        <template v-else>
            <a href="getDownloadLink">
             <arrow-down-icon class="text-primary w-5 h-5 block"></arrow-down-icon>
            </a>
        </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownIcon, LockClosedIcon } from "@heroicons/vue/outline";
import { componentNames } from "~~/.nuxt/components";
import { CourseVideo } from "~~/composables/course/CourseDetail.dto";
import { useVideoItem } from "~~/composables/course/useCourseDetail";
const props = defineProps<{video: CourseVideo,rowNumber:number}>()
componentNames:[LockClosedIcon,ArrowDownIcon]
const {isLocked,getDownloadLink} = useVideoItem(toRef(props, "video"))
</script>

<style scoped>
</style>