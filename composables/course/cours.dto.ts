import { Expose } from "class-transformer";
export class BaseCourseDto {
    @Expose()
    id: number
    @Expose()
    title: string
    @Expose()
    short_description: string
    @Expose()
    slug: string
    @Expose()
    amount: number
    @Expose()
    amountOff: number

}
export class CourseDto extends BaseCourseDto {
    @Expose()
    isRecording: boolean
    @Expose()
    percent: number
    @Expose()
    statusText: string
    @Expose()
    src: string
    @Expose()
    get showAmount() {
        return this.amount > this.amountOff
    }
    set showAmount(value) {
    }
}