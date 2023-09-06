import { useCartStore } from "./cart.store"

export const useDeleteFromCart = (id:number)=>{
    const deleting = useState(`deleting-${id}`, ()=>false)
    const cartStore = useCartStore()
    const deleteFromCart = ()=>{
        deleting.value = true
        cartStore.deleteFromCart(id).finally(()=>{
            deleting.value = false
        })
    }
    return {deleteFromCart, deleting}
}