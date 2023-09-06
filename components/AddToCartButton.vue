<template>
   <app-button class="btn-sm" :variant="ButtonVariantEnum.primary" @click.stop.prevent="addToCart" :loading="adding">اضافه به سبد خرید</app-button>
</template>

<script setup lang="ts">
import {ButtonVariantEnum} from "~~/types"
import {useAddToCart} from "~~/composables/cart/useAddToCart"
const props = defineProps<{id:number}>()
const {addToCart, adding} = useAddToCart(props.id)
</script>

<style scoped>

</style>