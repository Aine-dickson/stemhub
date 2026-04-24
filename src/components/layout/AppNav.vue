<script setup lang="ts">
    // src/components/layout/AppNav.vue
    import { ref, onMounted, onUnmounted } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const menuOpen = ref(false)
    const scrolled = ref(false)

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
        $route.path === '/' && !scrolled ? 'bg-transparent' : 'bg-stone-950/95 backdrop-blur-sm shadow-md',
    ]">
        <nav class="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            <!-- Logo -->
            <RouterLink to="/" class="flex items-center gap-2.5 group" @click="menuOpen = false">
                <span
                    class="w-8 h-8 rounded-sm bg-amber-400 flex items-center justify-center text-stone-950 font-black text-sm leading-none select-none">
                    SH
                </span>
                <span class="font-display text-white text-lg font-semibold tracking-tight">
                    STEM<span class="text-amber-400">Hub</span>
                </span>
            </RouterLink>

            <!-- Desktop links -->
            <ul class="hidden md:flex items-center gap-1">
                <li v-for="link in links" :key="link.to">
                    <RouterLink v-if="link.label !== 'Programs'" :to="link.to" :class="[
                        'px-3 py-1.5 rounded text-sm font-medium transition-colors',
                        route.path === link.to
                            ? 'text-amber-400'
                            : 'text-stone-300 hover:text-white',
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
            <button class="md:hidden text-white p-1.5" :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
                @click="menuOpen = !menuOpen">
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
                            route.path === link.to ? 'text-amber-400 bg-stone-900' : 'text-stone-300',
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
