import { useMediaStore } from '@/stores/media'

export function useMedia() {
  const store = useMediaStore()

  return {
    mediaAsset: (path: string) => store.get(path),
    mediaSrc: (path: string) => store.src(path),
    mediaAlt: (path: string) => store.alt(path),
    mediaReady: store.isReady,
  }
}