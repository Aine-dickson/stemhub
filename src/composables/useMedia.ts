import { useMediaStore } from '@/stores/media'
import type { MediaAsset } from '@/types'

export function useMedia() {
    const store = useMediaStore()

    const mediaList = (path: string): MediaAsset[] => {
        const node = store.getNode(path)
        if (!Array.isArray(node)) return []

        return node.filter((item): item is MediaAsset => {
            if (!item || typeof item !== 'object') return false

            const candidate = item as Partial<MediaAsset>
            return typeof candidate.src === 'string' && typeof candidate.alt === 'string'
        })
    }

    return {
        mediaAsset: (path: string) => store.get(path),
        mediaSrc: (path: string) => store.src(path),
        mediaAlt: (path: string) => store.alt(path),
        mediaList,
        mediaReady: store.isReady,
    }
}