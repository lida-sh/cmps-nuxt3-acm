import { useLoginService } from "~~/composables/auth/login/login.service";
import { useAuthStore } from "~~/composables/auth/Auth.store";
import { ToastEnum } from "~~/types";
import {useToast} from "~~/composables/useToast"
import { useLoginDialog } from "./useLoginDialog";
export const useLogin = () => {
    const loading = ref(false);
    const { login } = useLoginService();
    const store = useAuthStore();
    const error = ref("");
    const {loginModel, loginCallback} = useLoginDialog()
    const onError = (e) => {
        if (e?.response?.status == 401) {
            error.value = "نام کاربری یا رمز عبور نادرست است.";
        } else {
            error.value = "خطایی رخ داده است.";
        }
    }
    const router = useRouter()
    const { showToast } = useToast()
    const submit = (values) => {
        loading.value = true;
        error.value = "";
        login(values, { ignorErrors: true, onError })
            .then((response) => {
                if (response !== undefined) {
                    store.setToken(response.tokens);
                    store.setIdentity(response.identity);
                    if(typeof unref(loginCallback) == 'function'){
                        unref(loginCallback)(response)
                    }
                    loginModel.value = false
                    showToast({message: "به آکادمی لند خوش آمدید.",type: ToastEnum.success})
                    router.replace("/")
                }
            })
            .finally(() => {
                loading.value = false;
            });
    };
    return { error, submit, loading }
}