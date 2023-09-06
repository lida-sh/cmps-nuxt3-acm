export const useErrorHandler = (error:any)=>{
    if(unref(error)?.["statusCode"] || unref(error)?.["statusMessage"]){
        showError({
            statusCode: unref(error)?.['statusCode'],
            statusMessage: unref(error)?.['statusMessage'],
        })
    }
}