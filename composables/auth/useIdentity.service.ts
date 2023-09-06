import { useFetchApi } from "../api/useFetchApi"
import { IdentityDto } from "./Auth.dto"
import { Identity } from "./Auth.interface"

export const useIdentityService = ()=>{
    const fetchData = useFetchApi<Identity,IdentityDto>(IdentityDto)
    return (params={})=>fetchData("/site/identity",{params},{goToLogin:true, setToken:true})

}