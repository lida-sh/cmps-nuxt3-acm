<template>
  <div>
    <button :class="{ [`btn btn-${variant}`]: variant !== undefined, loading }">
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ButtonVariantEnum } from "~~/types";

interface Props {
  variant?: ButtonVariantEnum;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
});
</script>

<style scoped>
</style>