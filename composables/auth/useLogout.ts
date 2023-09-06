import { isAuthRoute } from "~~/helpers/authHelper"
import { useAuthStore } from "./Auth.store"

export const useLogout = () => {
    const authStore = useAuthStore()
    const route = useRoute()
    const router = useRouter()
    const logout = async () => {
        authStore.clearToken()
        if (isAuthRoute(route.path)) {
            return router.replace("/")
        }
    }
    return { logout }
}