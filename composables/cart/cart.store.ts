import { isMemberExpression } from "@vue/compiler-core";
import { acceptHMRUpdate, defineStore } from "pinia";
import { Meta } from "~~/.nuxt/components";
import { ToastEnum } from "~~/types";
import { useAuthStore } from "../auth/Auth.store";
import { CartDto } from "./Cart.dto";
import { useCartListService, useAddToCartService, useDeleteCartService } from "./useCart.service";

const defaultState = () => ({
    data: [] as unknown as CartDto[],
    fetching: false,
    fetchedOnce: false
})
export const useCartStore = defineStore("cart", {
    state: defaultState,
    getters: {
        getCartCount(state) {
            return state.data.length
        },
       
    },
    actions: {
        getLocalIds() {
            const data = localStorage.getItem("cart")
            return data ? JSON.parse(data) : []

        },
        isExistInTheCart(id) {
            return this.data.findIndex((item) => item.id === id) != -1
        },
        fetchCart(): Promise<any> {
            this.fetching = true
            if (process.server) {
                throw Error("call fetchCart on server")
            }
            const authStore = useAuthStore()
            const { listWhenLoggedIn, listWhenNotLoggedIn } = useCartListService()
            if (authStore.isLoggedIn) {
                return listWhenLoggedIn().then((response) => {
                    if (response) {
                        this.data = response
                    }
                }).finally(() => {
                    this.fetching = false
                    this.fetchedOnce = true
                })
            } else {
                const ids = this.getLocalIds()
                if (ids.length > 0) {
                    return listWhenNotLoggedIn(ids).then((response) => {
                        if (response) {
                            this.data = response
                        }
                    }).finally(() => {
                        this.fetching = false
                        this.fetchedOnce = true
                    })
                } else {
                    this.fetching = false
                    this.fetchedOnce = true
                    return new Promise((resolve) => {
                        resolve("")
                    })
                }
            }
        },
        addToCart(id: number): Promise<any> {
            const authStore = useAuthStore()
            const { showToast } = useToast()
            const addToCart = useAddToCartService()
            if (authStore.isLoggedIn) {
                return addToCart(id).then((response) => {
                    if (response) {
                        this.data = response
                    }
                })
            } else {
                const ids = this.getLocalIds()
                if (this.isExistInTheCart(id)) {
                    showToast({ message: "این دوره در سبد خرید شما موجود است.", type: ToastEnum.error })
                    return new Promise((resolve) => {
                        resolve("")
                    })
                }
                ids.push(id)
                localStorage.setItem("cart", ids)
                return this.fetchCart()
            }
        },
        async deleteFromCart(id: number) {
            const deleteFromCartService = useDeleteCartService()
            const authStore = useAuthStore()
            if (authStore.isLoggedIn) {
                await deleteFromCartService(id)
            }
            this.data = this.data.filter((item)=>item.id != id)
            return new Promise((resolve)=>{
                resolve(true)
            })
        },
        syncIdsToStorage() {
            localStorage.setItem('çart', JSON.stringify(this.data.map((item) => item.id)))
        }
    }
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}