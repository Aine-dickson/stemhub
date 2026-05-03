import type { Directive } from 'vue'
import router from '@/router'

const inView: Directive = {
    mounted(el, binding) {
        // don't run on contact page
        const current = router.currentRoute.value
        if (current && current.path && current.path.startsWith('/contact')) return

        // initial style
        el.style.opacity = '0'
        el.style.transform = 'translateY(12px)'
        el.style.transition = 'transform 480ms cubic-bezier(.2,.9,.2,1), opacity 500ms ease'

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // allow optional delay via binding value (ms)
                    const delay = (binding.value && binding.value.delay) || 0
                    setTimeout(() => {
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                        // call hook if provided
                        if (binding.value && typeof binding.value.onEnter === 'function') {
                            binding.value.onEnter(el)
                        }
                    }, delay)
                    observer.unobserve(el)
                }
            })
        }, { threshold: 0.12 })

        observer.observe(el)
            ; (el as any).__inViewObserver = observer
    },
    unmounted(el) {
        const obs = (el as any).__inViewObserver
        if (obs) obs.disconnect()
    },
}

export default inView
