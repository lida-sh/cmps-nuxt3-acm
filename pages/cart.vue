<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~~/composables/cart/cart.store"

const cartStore = useCartStore()
onMounted(()=>{
  if(!cartStore.fetching){
      cartStore.fetchCart()
  }
})
</script>

<style scoped>

</style>