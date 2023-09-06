import { AuthRoutes } from "~~/composables/auth/auth.config"
import { useAuthStore } from "~~/composables/auth/Auth.store"
import { isAuthRoute } from "~~/helpers/authHelper"

export default defineNuxtRouteMiddleware((to,from)=>{
    const authStore = useAuthStore()
    if(process.client){
        const hasAccess = authStore.isLoggedIn || !isAuthRoute(to.path)
        if(!hasAccess){
            return navigateTo("/auth")
        }
    }
})