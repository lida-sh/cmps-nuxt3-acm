import { useCartStore } from "./cart.store"

export const useAddToCart = (id:number)=>{
    const adding = useState(`adding-${id}`, ()=>false)
    const cartStore = useCartStore()
    const addToCart = ()=>{
        adding.value = true
        cartStore.addToCart(id).finally(()=>{
            adding.value = false
        })
    }
    return {addToCart, adding}
}