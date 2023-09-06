<template>
  <div>
    <app-collaps>
      <template #title>
        <p class="font-medium">{{ chapter.chapterName }}</p>
      </template>
      <section class="divide-y">
        <template  v-for="videoItem in chapter.courseVideos"
          :key="`video-item-${videoItem.id}`">
          <course-video-item
            :video="videoItem" :row-number="videoItem.rowNumber" class="py-3"></course-video-item>
        </template>
      </section>
    </app-collaps>
  </div>
</template>

<script setup lang="ts">
import { CourseChapter } from "~~/composables/course/CourseDetail.dto";

const props = defineProps<{ chapter: CourseChapter }>();

</script>

<style scoped>
</style>