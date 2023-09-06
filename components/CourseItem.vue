<template>
  <nuxt-link
    :to="to"
    class="group block"
    :class="{ 'w-[19rem] lg:w-[22rem]': hasDefaultWidth }"
  >
    <div class="card border border-[2.5px] bg-base-100 overflow-hidden">
      <div class="relative aspect-w-40 aspect-h-21 bg-gray-100 border-b">
        <div class="absolute inset-x-2 top-2" v-if="item.percent">
          <div class="flex justify-between">
            <small class="text-secondary" v-if="item.isRecording"
              >تخفیف حین ضبط دوره</small
            >
            <div v-else></div>
            <div class="badge badge-secondary py-3">{{ item.percent }} %</div>
          </div>
        </div>
        <figure class="overflow-hidden">
          <img
            :src="'https://acm.academyland.net/' + item.src"
            :alt="item.title"
            loading="lazy"
            class="
              w-full
              h-full
              transition
              duration-500
              transform-gpu
              group-hover:opacity-90 group-hover:scale-105
            "
          />
        </figure>
      </div>
      <div class="card-body">
        <h3
          class="
            card-title
            min-h-14
            line-clamp-2
            group-hover:text-primary
            transition
            prose-sm
          "
        >
          {{ item.title }}
        </h3>
        <div class="min-h-[6rem]">
          <p class="line-clamp-2 prose-xs">{{ item.short_description }}</p>
        </div>
        <div class="flex items-center justify-between mt-3">
          <div class="text-secondary prose-xs 3xl:prose-2xs">
            <!-- {{ item.statusText }} -->
            <client-only>
              <template v-if="cartStore.fetchedOnce"></template>
                <add-to-cart-button
                  v-if="!cartStore.isExistInTheCart(item.id)"
                  :id="item.id"
                ></add-to-cart-button>
                <delete-from-cart-button v-else :id="item.id"></delete-from-cart-button>
            </client-only>
          </div>
          <div class="prose-xs 3xl:prose-2xs flex space-x-3 space-x-reverse">
            <span
              class="line-through prose-3xs text-gray-600"
              v-if="item.showAmount"
              >{{ item.amount }}</span
            >
            <span>{{ getAmount }}</span>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { useCartStore } from "~~/composables/cart/cart.store";
import { CourseDto } from "~~/composables/course/cours.dto";
interface Props {
  item: CourseDto;
  hasDefaultWidth?: boolean;
}
const cartStore = useCartStore();
const props = withDefaults(defineProps<Props>(), {
  hasDefaultWidth: true,
});
const to = computed(() => ({
  name: "courses-slug",
  params: { slug: props.item.slug },
}));
const getAmount = computed(() => {
  if (props.item.amountOff === 0) {
    return "رایگان";
  }
  return props.item.amountOff + " تومان";
});
</script>

<style scoped>
</style>