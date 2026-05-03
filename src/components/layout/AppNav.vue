<script setup lang="ts">
    // src/components/layout/AppNav.vue
    import { computed, ref, onMounted, onUnmounted } from 'vue'
    import { useRoute } from 'vue-router'
    import MediaImage from '../ui/MediaImage.vue'
    import { useMedia } from '@/composables/useMedia'

    const route = useRoute()
    const { mediaSrc } = useMedia()
    const menuOpen = ref(false)
    const scrolled = ref(false)
    const isTransparentNav = computed(() => route.path === '/' && !scrolled.value)

    const links = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/programs', label: 'Programs' },
        { to: '/contact', label: 'Contact' },
    ]

    function onScroll() {
        scrolled.value = window.scrollY > 24
    }

    onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
    onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
    <header :class="[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isTransparentNav ? 'bg-transparent' : 'bg-slate-200/95 backdrop-blur-sm shadow-md',
    ]">
        <nav class="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            <!-- Logo -->
            <RouterLink to="/" class="flex items-center gap-2.5 group" @click="menuOpen = false">
                <div class="h-14">
                    <MediaImage :src="mediaSrc('site.logo')" alt="Logo"
                        class="w-full h-full group-hover:brightness-110 transition" />
                </div>
            </RouterLink>

            <!-- Desktop links -->
            <ul class="hidden md:flex items-center gap-1">
                <li v-for="link in links" :key="link.to">
                    <RouterLink v-if="link.label !== 'Programs'" :to="link.to" :class="[
                        'px-3 py-1.5 rounded text-sm font-medium transition-colors',
                        route.path === link.to
                            ? 'text-amber-400'
                            : isTransparentNav
                                ? 'text-white hover:text-amber-300'
                                : 'text-stone-800 hover:text-stone-950',
                    ]">
                        {{ link.label }}
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/programs"
                        class="ml-2 px-4 py-1.5 bg-amber-400 text-stone-950 text-sm font-semibold rounded hover:bg-amber-300 transition-colors">
                        Our Programs
                    </RouterLink>
                </li>
            </ul>

            <!-- Mobile burger -->
            <button :class="[
                'md:hidden p-1.5 transition-colors',
                isTransparentNav ? 'text-white' : 'text-stone-900',
            ]" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" @click="menuOpen = !menuOpen">
                <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </nav>

        <!-- Mobile drawer -->
        <Transition name="drawer">
            <div v-if="menuOpen" class="md:hidden bg-stone-950 border-t border-stone-800 px-5 pb-5 pt-3">
                <ul class="flex flex-col gap-1">
                    <li v-for="link in links" :key="link.to">
                        <RouterLink :to="link.to" :class="[
                            'block px-3 py-2.5 rounded text-sm font-medium',
                            route.path === link.to ? 'text-amber-400 bg-stone-900' : 'text-stone-600',
                        ]" @click="menuOpen = false">
                            {{ link.label }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </Transition>
    </header>
</template>

<style scoped>

    .drawer-enter-active,
    .drawer-leave-active {
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .drawer-enter-from,
    .drawer-leave-to {
        opacity: 0;
        transform: translateY(-8px);
    }
</style>
