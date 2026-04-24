<script setup lang="ts">
    // src/App.vue
    import { onMounted } from 'vue'
    import { useMediaStore } from '@/stores/media'
    import AppNav from '@/components/layout/AppNav.vue'
    import AppFooter from '@/components/layout/AppFooter.vue'

    const mediaStore = useMediaStore()

    // Load the media manifest once on app boot.
    // The store is reactive — any component using useMedia() will update automatically.
    onMounted(() => {
        mediaStore.load()
    })
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white">
        <AppNav />
        <div class="flex-1">
            <RouterView />
        </div>
        <AppFooter />
    </div>
</template>
