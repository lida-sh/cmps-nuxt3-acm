<template>
  <div
    class="form-control"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label
      v-if="label !== ''"
      class="flex justify-between items-center px-1 pb-1.5"
      :for="name"
    >
      <span class="label-text">{{ label }}</span>
      <slot name="leftLabel"></slot>
    </label>
    <template v-if="area">
        <textarea :name="name" :placeholder="placeholder" v-bind="$attrs" :type="type" class="textarea textarea-bordered"></textarea>
    </template>
    <template v-else>
      <input class="input input-bordered" autocomplete="off"
      :type="type" :placeholder="placeholder" v-bind="$attrs"
      :value="inputValue" :name="name"
      @input="handleChange"
      @blur="handleBlur">
    </template>
    <label class="flex items-center min-h-[1.4rem] px-1">
        <span class="label-text-alt leading-3 text-error text-2xs">{{errorMessage ||successMessage}}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    area: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    successMessage: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const {
      value: inputValue,
      errorMessage,
      handleChange,
      handleBlur,
      meta,
      setValue,
    } = useField(props.name, undefined, {
      initialValue: props.modelValue,
      validateOnValueUpdate: false,
    });
    watchEffect(()=>{
        emit("update:modelValue", unref(inputValue))
    })
    watch(()=>props.modelValue, (value)=>{
        setValue(value)
    })
    return {errorMessage, inputValue, handleChange, handleBlur, meta};
  },
});
</script>

<style scoped>
</style>