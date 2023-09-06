<template>
  <Form :validation-schema="schema" @submit="submit">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 gap-3"
      v-if="!hasFullName"
    >
    <app-text-input name="first_name" :label="$t('first_name')"></app-text-input>
    <app-text-input name="last_name" :label="$t('last_name')"></app-text-input>
    </div>
    <app-text-input area name="comment" :label="$t('comment')"></app-text-input>
    <app-button type="submit" :loading="loading" class="btn btn-secondary btn-block">ثبت نظر</app-button>
  </Form>
</template>

<script setup lang="ts">
import {Form} from "vee-validate"
import {toRef} from "vue"
import { useCreateCourseComment } from "~~/composables/courseComment/useCourseComments";
const props = defineProps<{ course_id: number }>();
const { schema, hasFullName, submit, loading } = useCreateCourseComment(
  toRef(props, "course_id")
);
</script>

<style scoped>
</style>