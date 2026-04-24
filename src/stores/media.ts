import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { MediaAsset, MediaManifest } from '@/types'

export const useMediaStore = defineStore('media', () => {
    const manifest = ref<MediaManifest | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function load() {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`/media/manifest.json?v=${Date.now()}`)
            if (!response.ok) throw new Error(`Failed to load media manifest: ${response.status}`)
            manifest.value = await response.json()
        } catch (caughtError) {
            error.value = caughtError instanceof Error ? caughtError.message : 'Failed to load media manifest'
            console.error('[MediaStore]', caughtError)
        } finally {
            loading.value = false
        }
    }

    function get(path: string): MediaAsset | null {
        if (!manifest.value) return null

        const asset = path.split('.').reduce<unknown>((current, key) => {
            if (current && typeof current === 'object') {
                return (current as Record<string, unknown>)[key] ?? null
            }
            return null
        }, manifest.value)

        if (!asset || typeof asset !== 'object') return null

        const candidate = asset as Partial<MediaAsset>
        return typeof candidate.src === 'string' && typeof candidate.alt === 'string'
            ? { src: candidate.src, alt: candidate.alt }
            : null
    }

    function src(path: string) {
        return get(path)?.src ?? null
    }

    function alt(path: string) {
        return get(path)?.alt ?? ''
    }

    const isReady = computed(() => manifest.value !== null && !loading.value)

    return { manifest, loading, error, isReady, load, get, src, alt }
})