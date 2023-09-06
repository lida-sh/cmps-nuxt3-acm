
import { useFetchApi } from "~/composables/api/useFetchApi";
import { CourseDto } from "./cours.dto";
import { CourseDetailDto } from "./CourseDetail.dto";
export const useCourseService = ()=>{
    const $fetch = useFetchApi<CourseDto[],CourseDto>(CourseDto);
    return ()=>$fetch("course/index", {params: {expand: "src,statusText,isRecording,percent"}})
}
export const useCourseDetailService = ()=>{
    const $fetch = useFetchApi<CourseDetailDto,CourseDetailDto>(CourseDetailDto);
    return (slug:string)=>$fetch("course/view", {params: {slug,expand: "video_cover,introduction_video,video_caption,courseDuration,computedEstimateDuration,statusText,src,courseQuestions,courseChapters.courseVideos.duration"}})
}
export const useIsUserInTheCourseService = ()=>{
    const $fetch = useFetchApi<Boolean>()
    return (id:number)=>$fetch("/course-videos/is-user-in-the-course",{params: {id}},{setToken:true}).then((response)=>!!response)
}