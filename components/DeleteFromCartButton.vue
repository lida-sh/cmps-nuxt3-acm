<template>
<app-button class="btn-sm" :variant="ButtonVariantEnum.secondary" @click.stop.prevent="deleteFromCart" :loading="deleting">حذف از سبد خرید</app-button>
</template>

<script setup lang="ts">
import {ButtonVariantEnum} from "~~/types"
import {useDeleteFromCart} from "~~/composables/cart/useDeleteFromCart"
const props = defineProps<{id:number}>()
const {deleteFromCart, deleting} = useDeleteFromCart(props.id)
</script>

<style scoped>

</style>