<script setup lang="ts">
    import MediaImage from '../ui/MediaImage.vue';
    import { useMedia } from '@/composables/useMedia';

    const { mediaSrc } = useMedia()

    const programs = [
        { id: 'codelab', name: 'CodeLab' },
        { id: 'stemlab', name: 'STEMLab' },
        { id: 'innovation-studio', name: 'Innovation Studio' },
        { id: 'stem360', name: 'STEM360' },
    ]

    const year = new Date().getFullYear()
</script>

<template>
    <footer class="bg-stone-950 border-t border-stone-800 mt-auto">
        <div class="max-w-6xl mx-auto px-5 py-14 grid grid-cols-2 md:grid-cols-3 gap-10">
            <!-- Brand -->
            <div class="md:col-span-1 col-span-2">
                <div class="flex items-center gap-2.5 mb-3">
                    <span
                        class="w-7 h-7 rounded-sm bg-amber-400 flex items-center justify-center text-stone-950 font-black text-xs">SH</span>
                    <span class="font-display text-white text-base font-semibold">STEM<span
                            class="text-amber-400">Hub</span> Uganda</span>
                </div>
                <p class="text-stone-400 text-sm leading-relaxed">
                    Driving Innovation in STEM Teaching &amp; Learning Across Uganda.
                </p>
                <p class="text-stone-500 text-xs mt-4">
                    A nonprofit organisation committed to equipping Uganda's next generation.
                </p>
            </div>

            <!-- Programs -->
            <div>
                <h3 class="text-stone-300 text-xs font-semibold uppercase tracking-widest mb-4">Programs</h3>
                <ul class="space-y-2">
                    <li v-for="p in programs" :key="p.id">
                        <RouterLink :to="`/programs/${p.id}`"
                            class="text-stone-400 hover:text-amber-400 text-sm transition-colors">
                            {{ p.name }}
                        </RouterLink>
                    </li>
                </ul>
            </div>

            <!-- Links + contact -->
            <div>
                <h3 class="text-stone-300 text-xs font-semibold uppercase tracking-widest mb-4">Organisation</h3>
                <ul class="space-y-2">
                    <li>
                        <RouterLink to="/about" class="text-stone-400 hover:text-amber-400 text-sm transition-colors">
                            About Us</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/contact" class="text-stone-400 hover:text-amber-400 text-sm transition-colors">
                            Contact</RouterLink>
                    </li>
                </ul>
                <div class="mt-6 space-y-1">
                    <p class="text-stone-500 text-xs">Kampala, Uganda</p>
                    <a href="mailto:info@stemhug.ug"
                        class="text-stone-400 hover:text-amber-400 text-xs transition-colors">
                        info@stemhub.ug
                    </a>
                </div>
            </div>
        </div>

        <div
            class="border-t border-stone-800 max-w-6xl mx-auto px-5 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p class="text-stone-600 text-xs">© {{ year }} STEMHub Uganda. All rights reserved.</p>
            <p class="text-stone-700 text-xs">Nonprofit · Registered in Uganda</p>
        </div>
    </footer>
</template>
