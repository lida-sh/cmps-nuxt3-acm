<template>
  <div class="h-full">
    <div class="relative flex flex-col overflow-hidden p-10 lg:pb-36">
      <div class="absolute z-0 home-header -inset-2 contrast-125 blur-sm">
        <div class="w-full h-full bg-black bg-opacity-50"></div>
      </div>
      <section
        class="
          flex flex-col
          lg:flex-row
          items-center
          justify-center
          z-10
          lg:pr-5
          xs:mt-8
          sm:mt-0
        "
      >
        <div class="text-white space-y-6 font-bold">
          <h1 class="prose-xl g-head-anime">آموزش تخصصی vuejs و nuxtjs</h1>
          <p class="block g-head-anime lg:w-3/4">
            به آکادمی لند مرجع تخصصی vuejs و nuxtjs خوش آمدید
          </p>
          <button
            class="btn btn-accent btn-wide block g-head-anime"
            :class="{ 'transition-none no-animation': !completeAnimation }"
            @click="clickGetStart"
          >
            شروع یادگیری
          </button>
        </div>
      </section>
    </div>
    <section
      class="
        flex flex-col
        space-y-4
        p-4
        lg:flex-row lg:space-y-0 lg:pt-0
        w-full
        lg:w-auto
        justify-center
        lg:-translate-y-1/2 lg:space-x-4 lg:space-x-reverse
      "
    >
      <service
        title="پروژه های عملی"
        description="آموزش پروژه محور و انتقال تجربه عملی مهمترین وجه آموزش های ماست"
      >
        <template #icon>
          <AcademicCapIcon></AcademicCapIcon>
        </template>
      </service>
      <service
        title="مجموعه بی نظیر آموزش های مدرن"
        description="بروز بودن آموزش های ما وجه تمایز ماست"
      >
        <template #icon>
          <CodeIcon></CodeIcon>
        </template>
      </service>
      <service
        title="تجربه عملی مدرس"
        description="سال ها تجربه برنامه نویسی در قالب دوره های آموزشی منتظر شماست"
      >
        <template #icon>
          <BeakerIcon></BeakerIcon>
        </template>
      </service>
    </section>
    <h6 class="text-center font-bold prose-lg" id="feachered-courses">دوره های آکادمی لند</h6>
    <section class="lg:mx-10 p-10" v-if="data">
      <app-slider :items="data">
        <template #item="{ item }">
          <course-item :item="item"></course-item>
        </template>
      </app-slider>
    </section>
    <div v-else></div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { CodeIcon, AcademicCapIcon, BeakerIcon } from "@heroicons/vue/outline";
import { useCourseList } from "~/composables/course/useCourse";
const completeAnimation = ref(false);
// const {$t} = useNuxtApp()
// const login = computed(()=>$t("login"))
setTimeout(()=>{})
onMounted(() => {
  gsap.registerPlugin(ScrollToPlugin);
  const tl = gsap.timeline();
  tl.from(".g-head-anime", {
    ease: "power4",
    duration: 0.8,
    x: 200,
    autoAlpha: 0,
    stagger: 0.3,
    onComplete: () => {
      completeAnimation.value = true;
      gsap.set(".g-head-anime", { clearProps: "transform" });
    },
  });
});
const clickGetStart = () => {
  gsap.to(window, {
    scrollTo: { y: "#feachered-courses", offsetY: 110 },
  });
};
const { data, pending } = useCourseList();
</script>
<script lang="ts">
export default {
  components: { BeakerIcon, AcademicCapIcon, CodeIcon },
};
</script>

<style lang="postcss" scoped>
.g-head-anime {
  @apply invisible;
}
.home-header {
  background-image: url("~/assets/images/home-header-background.jpeg");
  background-size: 100% 100%;
}
</style>