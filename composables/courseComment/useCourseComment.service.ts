import { InferType } from "yup"
import { FetchCustomConfig } from "~~/composables/api/FetchCustomConfig"
import { useFetchApi } from "../api/useFetchApi"
import { CommentCourseDto } from "./CommentCourse.dto"
import { useCourseCommentsValidator } from "./useCourseComments.validator"

export const useCourseCommentService = ()=>{
    const $fetch = useFetchApi<CommentCourseDto[],CommentCourseDto>(CommentCourseDto)
    return (course_id)=>$fetch("/course-comments/by-course",{params: {course_id,expand: "children,createdDate"}})
}
export const useCourseCreateCommentService = ()=>{
    const $fetch = useFetchApi()
    const {courseCommentSchema} = useCourseCommentsValidator()
    type BODY_TYPE = InferType<typeof courseCommentSchema>
    interface BODY extends BODY_TYPE{
        course_id:number
    }
    return (body: BODY, customConfig: FetchCustomConfig={})=>$fetch("/course-comments/create",{method:"post", body},{setToken:true, ...customConfig})
}