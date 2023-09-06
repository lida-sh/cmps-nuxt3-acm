<template>
  <div
    class="form-control"
    :class="{ 'has-error': !!errorMessage }"
  >
    <label
      v-if="label !== ''"
      class="flex items-center justify-between px-1 pb-1.5"
      :for="name"
    >
      <span class="label-text">{{ label }}</span>
      <slot name="leftLabel"></slot>
    </label>
    <input
      autocomplete="off"
      v-bind="$attrs"
      :type="type"
      :name="name"
      :value="inputValue"
      class="input input-bordered"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
    <label class="flex items-center px-1 min-h-[1.4rem">
    <span class="label-text-alt text-error text-2xs">{{errorMessage}}</span>
  </label>
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "text",
    },
    label: {
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
    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );
    watchEffect(() => {
      emit("update:modelValue", unref(inputValue));
    });
    return {errorMessage, inputValue,handleChange,handleBlur, meta};
  },
});
</script>

<style scoped>
</style>