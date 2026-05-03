import type { Directive } from 'vue'
import router from '@/router'

function formatNumber(n: number) {
    return n.toLocaleString()
}

function parseTarget(value: unknown) {
    // Accept strings like '500+' or numbers
    if (typeof value === 'number') return { n: value, suffix: '' }
    if (typeof value === 'string') {
        const m = value.match(/^(\d+[\d,]*)\s*(\D*)$/)
        if (m && m[1]) {
            const numPart = m[1].replace(/,/g, '')
            return { n: parseInt(numPart, 10), suffix: m[2] || '' }
        }
        const onlyNum = parseInt(value, 10)
        if (!isNaN(onlyNum)) return { n: onlyNum, suffix: '' }
    }
    return { n: 0, suffix: '' }
}

const countUp: Directive = {
    mounted(el, binding) {
        const current = router.currentRoute.value
        if (current && current.path && current.path.startsWith('/contact')) return

        // start from 0 displayed
        el.textContent = '0'

        const { n: target, suffix } = parseTarget(binding.value)
        const duration = (binding.value && binding.value.duration) || 900

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const start = performance.now()
                    function step(ts: number) {
                        const progress = Math.min(1, (ts - start) / duration)
                        const value = Math.round(progress * target)
                        el.textContent = `${formatNumber(value)}${suffix}`
                        if (progress < 1) requestAnimationFrame(step)
                    }
                    requestAnimationFrame(step)
                    observer.unobserve(el)
                }
            })
        }, { threshold: 0.2 })

        observer.observe(el)
            ; (el as any).__countUpObserver = observer
    },
    unmounted(el) {
        const obs = (el as any).__countUpObserver
        if (obs) obs.disconnect()
    },
}

export default countUp
