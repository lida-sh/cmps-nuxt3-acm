<template>
  <input
    type="checkbox"
    id="my-modal"
    v-model="checkboxModel"
    class="modal-toggle"
  />
  <div class="modal" @click="closeModal">
    <div class="modal-box realative overflow-hidden" @click.stop="" v-if="eager || modelValue">
      <section class="flex justify-between items-center">
        <slot name="title">
          <span class="font-medium">{{ title }}</span>
        </slot>
        <span class="cursor-pointer select-none text-xl text-gray-500"
          @click="closeModal">&#215;</span
        >
      </section>
      <div class="overflow-y-auto scrollbar-thin">
        <slot></slot>
      </div>
      <div class="modal-action" v-if="$slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {useFixBody} from "~~/composables/useFixBody"
export default defineComponent({
  props: {
    modelValue: {
      type: [Number, Boolean],
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    eager: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    useFixBody(toRef(props, "modelValue"));
    const checkboxModel = ref(!!props.modelValue);
    watch(
      () => props.modelValue,
      (value) => {
        checkboxModel.value = !!value;
      }
    );
    const closeModal = () => {
      emit("update:modelValue", false);
    };
    return { closeModal, checkboxModel };
  },
});
</script>

<style scoped>
</style>