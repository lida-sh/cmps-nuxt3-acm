<template>
    <div class="divide-y space-y-3">
      <template v-if="loading">
          <p class="p-4">در حال دریافت اطلاعات ...</p>
      </template>
      <template v-else-if="isEmpty">
          <p class="">هنوز هیچ دیدگاهی ثبت نشده است.</p>
      </template>
      <div class="prose-sm space-y-3 lg:space-y-4 pt-3 lg:pt-4" v-else v-for="comment in comments" :key="`comment-${comment.id}`">
          <div class="flex items-center">
              <div class="flex  items-center justify-center bg-gray-500 rounded-full border-4 border-gray-300 w-12 h-12">
                  <user-icon class="text-white w-8 h-8"></user-icon>
              </div>
              <div class="mr-4">
                  <div class="prose-xs font-medium">{{comment.fullName}}</div>
                  <div class="prose-2xs">{{comment.createdDate}}</div>
              </div>
          </div>
          <p class="font-medium">{{comment.comment}}</p>
          <template v-for="children in comment.children" :key="`children-${children.id}`">
              <section class="flex text-gray-500 mr-4">
                  <div class="hidden lg:block">
                      <reply-icon class="w-7 h-7 ml-4"></reply-icon>
                  </div>
                  <p class="font-medium">{{children.comment}}</p>
              </section>
          </template>
      </div>
    </div>
</template>

<script setup lang="ts">
import {useCourseComments} from "~~/composables/courseComment/useCourseComments"
import {UserIcon} from "@heroicons/vue/outline"
import {ReplyIcon} from "@heroicons/vue/solid"
import { componentNames } from "~~/.nuxt/components"
const props = defineProps<{courseId: number}>()
const {loading, comments, isEmpty} = useCourseComments(toRef(props, "courseId"))
</script>

<style scoped>

</style>