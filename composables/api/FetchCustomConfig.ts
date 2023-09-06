import {FetchError} from "ohmyfetch"
export interface FetchCustomConfig {
    setToken?:boolean
    ignorErrors?:boolean
    onError?:(e:FetchError)=>void
    onValidationFailed?: (errors: Record<string,string>, e:FetchError)=>void
    setErrors?:(errors:{[key:string]:string})=>void
    toastError?:boolean
    goToLogin?:boolean
    beforeResponse?: Function
    debug?:boolean
    toastValidationFields?: string[]
}