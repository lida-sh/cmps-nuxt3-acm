export const useFixBody = (modelValue) => {
    // debugger
    let scrollY

    const doFix = (isAdd, forceRemove = false) => {
        if (typeof window !== 'undefined') {
            const body: Element = document.getElementsByTagName("body")[0]
            if (body) {
                const count = forceRemove ? 0 : body.getAttribute("data-count") || 0
                let newCount = 0
                if (isAdd) {
                    newCount = +count + 1
                    body.setAttribute("data-count", newCount.toString())
                } else if (+count <= 1) {
                    body.removeAttribute("data-count")
                } else {
                    newCount = +count - 1
                    body.setAttribute("data-count", newCount.toString())
                }
                if (newCount < 1) {
                    body.classList.remove('fixed', 'inset-x-0')
                    window.scrollTo(0, scrollY)
                } else {
                    scrollY = window.scrollY
                    //@ts-ignore
                    body.style.top = scrollY *-1 + 'px'
                    body.classList.add("fixed", "inset-x-0")
                }
            }
        }
    }
    onMounted(() => {
        if (unref(modelValue)) {
            doFix(true)
        }
    })
    onUnmounted(() => {
        if (!scrollY) {
            scrollY = window.scrollY
        }
        doFix(false, true)
    })
    watch(modelValue, (value) => {
        doFix(!!value)
    })

}