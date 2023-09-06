import { FormActions } from "vee-validate"
import {Ref} from "vue"
import { InferType } from "yup"
import { useAuthStore } from "~~/composables/auth/Auth.store"
import { ToastEnum } from "~~/types"
import { CommentCourseDto } from "./CommentCourse.dto"
import { useCourseCreateCommentService,useCourseCommentService } from "./useCourseComment.service"
import { useCourseCommentsValidator } from "./useCourseComments.validator"
export const useCourseComments = (course_id: Ref<number>)=>{
    const state = reactive<{loading:boolean, comments: CommentCourseDto[]}>({loading:true, comments: []})
    const $fetch = useCourseCommentService()
    onMounted(()=>{
        $fetch(unref(course_id)).then((response)=>{
            if(response != undefined){
                state.comments = response
                state.loading = false
            }
        }).finally(()=>{
            state.loading = false
        })
        
    })
    const isEmpty = computed(()=>(!state.loading && state.comments.length ==0))
    return {
        ...toRefs(state),
        isEmpty
    }
}
export const useCreateCourseComment = (course_id: Ref<number>)=>{
    const createComment = useCourseCreateCommentService()
    const authStore = useAuthStore()
    const loading = ref(false)
    const toast = useToast()
    const {courseCommentSchema, courseCommentSchemaHasFullName} = useCourseCommentsValidator() 
    const hasFullName = computed(()=>authStore.isLoggedIn&&authStore.identity.first_name&&authStore.identity.last_name)
    const submit = async(body:InferType<typeof courseCommentSchema>, {setErrors, resetForm}:FormActions<any>)=>{
       if(unref(hasFullName)){
           body.first_name = authStore.identity.first_name!
           body.last_name = authStore.identity.last_name!
       }
       loading.value = true
       const response = await createComment({course_id:unref(course_id),...body},{setErrors})
       if(response != undefined){
          toast.showToast({type: ToastEnum.success, message: "نظر شما ثبت شد و پس از تایید نمایش داده خواهد شد."})
          resetForm()
       }
       loading.value = false
    }
    const getSchema = computed(()=>unref(hasFullName)?courseCommentSchemaHasFullName:courseCommentSchema)
    return {schema:getSchema, hasFullName, submit, loading}
}