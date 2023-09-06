import { Expose, Transform } from "class-transformer";
import { BaseCourseDto } from "./cours.dto"
export class CourseDetailDto extends BaseCourseDto {
    @Expose()
    sort: number;
    @Expose()
    description: string;
    @Expose()
    meta_description: string;
    @Expose()
    requirements: string;
    @Expose()
    source: string;
    @Expose()
    @Transform(({ value }) => {
        const { hours, minutes, seconds } = value || {}
        return (hours || minutes) ? `${hours} : ${minutes} : ${seconds}` : ""
    }, { toClassOnly: true })
    courseDuration: string;
    @Expose()
    @Transform(({ value }) => {
        const { hours } = value || {}
        return hours > 0 ? `${hours} ساعت` : ""
    }, { toClassOnly: true })
    computedEstimateDuration: string;
    @Expose()
    @Transform(({value, obj})=>{
       let i=0
       const courseChapters = value.map((chapter)=>{
           return {
               ...chapter,
               courseVideos: chapter.courseVideos.map((video)=>{
                   i++
                   return {
                       ...video,
                       rowNumber: i
                   }
               })
           }
       })
       obj.totalVideosCount = i
       return courseChapters
    },{toClassOnly:true})
    courseChapters: CourseChapter[];
    @Expose()
    courseQuestions: CourseQuestion[];
    @Expose()
    src: string;
    @Expose()
    statusText: string;
    @Expose()
    introduction_video: string;
    @Expose()
    video_cover: string;
    @Expose()
    video_caption: string;
    @Expose()
    totalVideosCount:number
}
export class CourseDuration {
    @Expose()
    hours: number;
    @Expose()
    minutes: number;
    @Expose()
    seconds: number;
}

export class CourseVideo {
    @Expose()
    id: number;
    @Expose()
    course_id: number;
    @Expose()
    videoTitle: string;
    @Expose()
    videoDescription: string;
    @Expose()
    isDemo: number;
    @Expose()
    hasFile: boolean;
    @Expose()
    duration: string;
    @Expose()
    rowNumber:number
}

export class CourseChapter {
    @Expose()
    id: number;
    @Expose()
    chapterName: string;
    @Expose()
    courseVideos: CourseVideo[];
}

export class CourseQuestion {
    @Expose()
    id: number;
    @Expose()
    question: string;
    @Expose()
    answer: string;
}





