<template>
  <div ref="target"
    class="
      text-white
      invisible
      fixed
      bottom-20
      right-0
      rounded-md
      p-3
      text-gray-800
    "
    :class="`bg-${toastRef.type}`"
  >
    {{ toastRef.message }}
  </div>
</template>

<script setup lang="ts">
import {gsap} from "gsap"
const target = ref<Element | null>(null)
const { toastRef } = useToast();
let animation:any
const setAnimation = ()=>{
   animation = gsap.to(unref(target),{
       autoAlpha:1,
       right: 100,
       ease: "power4",
       duration: 0.8,
       paused: true
   })
}
onMounted(()=>{
    setAnimation()
})
watch(toastRef, (value)=>{
    if(value.show){
        animation.play()
    }else{
        animation.reverse()
    }
})
</script>

<style scoped>
</style>