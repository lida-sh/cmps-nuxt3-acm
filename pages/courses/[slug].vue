<template>
  <div class="" v-if="pending">loading...</div>
  <div v-else>
    <div class="p-10 grid grid-cols-3 gap-5">
      <div class="flex flex-col gap-5 col-span-2">
        <div class="card bg-white border rounded-box p-4 h-auto">
          <div class="card-body">
            <h6 class="card-title text-secondary">لیست ویدئوهای دوره</h6>
            <client-only>
              <!-- <template> -->
              <course-chapter-item
                v-for="item in data?.courseChapters"
                :key="`chapter-${item.id}`"
                :chapter="item"
              ></course-chapter-item>
              <!-- </template> -->
            </client-only>
          </div>
        </div>
        <client-only>
          <div class="card bg-white rounded-box border p-4">
            <div class="card-body">
              <h6 class="card-title text-secondary">نظرات کاربران</h6>
              <div class="my-3">
                <template v-if="authStore.isLoggedIn">
                  <div>
                    <comment-form v-if="data.id" :course_id="data.id"></comment-form>
                  </div>
                </template>
                <template v-else>
                  <p
                    class="alert alert-info text-sm"
                    role="button"
                    @click="() => open()"
                  >
                    برای ثبت نظر باید وارد شوید
                  </p>
                </template>
                <course-comments v-if="data.id" :courseId="data.id"></course-comments>
              </div>
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/composables/auth/Auth.store";
import { useLoginDialog } from "~~/composables/auth/login/useLoginDialog";
import { useCourseDetail } from "~~/composables/course/useCourseDetail";
const route = useRoute();
const authStore = useAuthStore();
const { data, pending } =await useCourseDetail(route.params.slug as string);
const { open } = useLoginDialog();
watchEffect(() => {
  console.log("data", data.value);
});
</script>

<style scoped>
</style>