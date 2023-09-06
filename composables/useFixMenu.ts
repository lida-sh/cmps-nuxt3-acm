import { useEventListener } from "@vueuse/core"
import {Ref} from "vue"
import {gsap} from "gsap"
export const useFixMenu = (selector: string, disable:Ref<boolean>|boolean = true):{isFix:Ref<boolean>}=>{
  const isFix = ref(false)
  let animation:any
  const doFix = ()=>{
      if(!unref(isFix)){
          isFix.value=true
          gsap.set(selector,{position: "fixed", top:0, right:0, left:0, y: "-100%", opacity:0, zIndex:20})
          animation = gsap.to(selector, {y:0, opacity:1, ease:"power4", duration:0.2, onReverseComplete:()=>{
              isFix.value = false
              gsap.set(selector, {clearProps: "all"})
          }}).timeScale(0.3)
      }
  }
  const backToNormal=()=>{
      if(unref(isFix)){
          animation.timeScale(1)
          animation?.reverse()
      }
  }
  useEventListener("scroll",()=>{
     if(window.scrollY>200 && !unref(disable)){
         doFix()
     }else{
         backToNormal()
     }
  })
  return {isFix}
}