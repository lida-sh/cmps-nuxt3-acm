import { useCourseService } from "./useCourse.service";

export const useCourseList = () => {
    const getCourseListFromApi = useCourseService()
    const { data, pending, error, execute } = useLazyAsyncData(
        "courses",
        () => getCourseListFromApi(),
        {immediate:true}
    );
    useErrorHandler(error)
    onMounted(()=>{
        if(!unref(data)){
            execute()
        }
    })
    // watchEffect(()=>{
    //     console.log("data",data.value, "pending",pending.value)
    // })
    
    return {data, pending}
    
}
