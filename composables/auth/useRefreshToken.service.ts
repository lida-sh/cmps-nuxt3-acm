import { CLIENT_ID, CLIENT_SECRET } from "../api/api.config"
import { useFetchApi } from "../api/useFetchApi"
import { AuthTokens } from "./Auth.interface"

export const useRefreshTokenService = ()=>{
    const fetchData = useFetchApi()
    return (refreshToken:string):Promise<{tokens: AuthTokens}|undefined>=>
     fetchData("/oauth2/rest/token",{
         method:"post",
         body:{
             refresh_token:refreshToken,
             grant_type:'refresh_token',
             client_id: CLIENT_ID,
             client_secret: CLIENT_SECRET
         }
     },{ignorErrors:true}).then((response:any)=>{
         if(response!== undefined){
             const {access_token, refresh_token, expires_in} = response
             return {
                 tokens:{
                     accessToken:access_token,
                     refreshToken:refresh_token,
                     expiresIn: new Date().getTime() + expires_in*1000
                 }
             }
         }
         return response
     })
}