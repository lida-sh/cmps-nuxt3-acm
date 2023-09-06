import { useCourseDetailService, useIsUserInTheCourseService } from "./useCourse.service";
import { Ref } from "vue"
import { useAuthStore } from "../auth/Auth.store";
import { CourseVideo } from "./CourseDetail.dto";
import { BASE_URL } from "../api/api.config";
import qs from "query-string"
type CAN_BUY = { loading: boolean, canBuy: boolean }
const useCanBuyProvider = (courseID: Ref<number | undefined>) => {
    const fetchIsInTheCourse = useIsUserInTheCourseService()
    const authStore = useAuthStore()
    const userCanBuy = reactive<CAN_BUY>({ loading: false, canBuy: false })
    onBeforeMount(() => {
        watch([courseID, () => authStore.isLoggedIn], () => {
            if (unref(courseID) && authStore.isLoggedIn) {
                userCanBuy.loading = true
                fetchIsInTheCourse(unref(courseID)!).then((isIn) => {
                    if (isIn != undefined) {
                        userCanBuy.canBuy = !isIn
                    }
                }).finally(() => {
                    userCanBuy.loading = false
                })
            }
            else {
                userCanBuy.canBuy = false
            }
        }, { immediate: true })
    })
    provide<CAN_BUY>("canBuy", userCanBuy)
}
export const useCanBuyConsumer = () => {
    const userCanBuy = inject<CAN_BUY>("canBuy")
    if (userCanBuy == undefined) {
        throw new Error("canBuy inject is undefined in useCanBuyProvider")
    }
    return toRefs(userCanBuy!)
}
export const useCourseDetail = async (slug: string) => {
    const getCourseDetail = useCourseDetailService()
    const courseID = ref()
    useCanBuyProvider(courseID)
    const { data, pending, error, refresh } = await useLazyAsyncData(
        "course-detail" + slug,
        () => getCourseDetail(slug),
        {}
    );
    useErrorHandler(error)
    watch(data, ()=>{
        courseID.value = unref(data)?.id
    },{immediate:true})
    return { data, pending }
}
export const useVideoItem = (item: Ref<CourseVideo>) => {
    const authStore = useAuthStore()
    const userCanBuy = inject<CAN_BUY>("canBuy")
    const isLocked = computed(() =>{
        if(authStore.isLoggedIn){
           return (userCanBuy?.canBuy && !unref(item).isDemo)
        }
        else{
            return true    
       }
    })
        
    const getDownloadLink = computed(()=>{
        return (
            BASE_URL +
            "site/download?"+
            qs.stringify({
                key: authStore.getToken,
                v:unref(item).id,
                id: unref(item).course_id
            })

        )
    })
    return { isLocked, getDownloadLink}
}