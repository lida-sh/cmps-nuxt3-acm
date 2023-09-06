import gsap from "gsap"
import { useEventListener, useDebounceFn, onClickOutside } from "@vueuse/core"
import { useRoute } from "vue-router"

export const useMenu = ()=>{
    const target = ref(null)
    let menuAnimation:any
    const setAnimation = ()=>{
        menuAnimation = gsap.to(unref(target),{
            autoAlpha: 1,
            height: "auto",
            overflow: "hidden",
            paused:true,
            duration: 0.5
        })
    }
    const removeProps = ()=>{
        gsap.set(unref(target), {clearProps: "all"})
    }
    onMounted(async ()=>{
        await nextTick()
        setAnimation()
    })
    //@ts-ignore
    useEventListener('resize',useDebounceFn(()=>{
        removeProps()
        setAnimation()
    }),500)
    const toggleMenu = ()=>{
        if(menuAnimation.progress() === 0){
            menuAnimation?.play()
        }else{
            menuAnimation?.reverse() 
        }
    }
    const openMenu = ()=>{
        if(menuAnimation?.progress() === 0){
            menuAnimation?.play()
        }
    }
    const closeMenu = ()=>{
        if(menuAnimation?.progress() >0){
            menuAnimation?.reverse()
        }
    }
    onClickOutside(target, ()=>{
        menuAnimation?.reverse()
    })
    const route = useRoute()
    watch(()=>route.path, ()=>{
        removeProps()
        setAnimation()
    })
    return {target, toggleMenu, closeMenu, openMenu}
}