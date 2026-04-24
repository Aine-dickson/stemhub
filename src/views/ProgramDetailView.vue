<script setup lang="ts">
    // src/views/ProgramDetailView.vue
    import { computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { getProgramById, programs } from '@/data/programs'
    import { useMedia } from '@/composables/useMedia'
    import MediaImage from '@/components/ui/MediaImage.vue'

    const route = useRoute()
    const router = useRouter()
    const { mediaSrc, mediaAlt } = useMedia()

    const programId = computed(() => {
        const id = route.params.id
        return Array.isArray(id) ? id[0] ?? '' : id ?? ''
    })

    const program = computed(() => {
        const p = getProgramById(programId.value)
        if (!p) router.replace('/programs')
        return p
    })

    // Other programs for the "also explore" strip
    const otherPrograms = computed(() =>
        programs.filter((programItem) => programItem.id !== programId.value).slice(0, 3)
    )

    const colorBorderMap = {
        amber: 'border-amber-400',
        teal: 'border-teal-400',
        rose: 'border-rose-400',
        green: 'border-green-400',
    }
    const colorTextMap = {
        amber: 'text-amber-400',
        teal: 'text-teal-400',
        rose: 'text-rose-400',
        green: 'text-green-400',
    }
</script>

<template>
    <main v-if="program" class="pt-16">
        <!-- Hero -->
        <section class="bg-stone-950 border-b border-stone-800">
            <div class="aspect-21/6 bg-stone-900 relative overflow-hidden">
                <MediaImage :src="mediaSrc(`programs.${program.id}.cover`)"
                    :alt="mediaAlt(`programs.${program.id}.cover`)" class="w-full h-full object-cover opacity-40"
                    placeholder-text="" />
                <div class="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/60 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-5 pb-10">
                    <RouterLink to="/programs"
                        class="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-white mb-4 transition-colors">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        All Programs
                    </RouterLink>
                    <div class="flex items-center gap-3 mb-2">
                        <span class="text-2xl">{{ program.icon }}</span>
                        <span
                            :class="['text-xs font-semibold uppercase tracking-widest', colorTextMap[program.color] || colorTextMap.amber]">
                            Program
                        </span>
                    </div>
                    <h1 class="font-display text-4xl md:text-5xl font-bold text-white">{{ program.name }}</h1>
                    <p :class="['text-base italic mt-2', colorTextMap[program.color] || colorTextMap.amber]">
                        "{{ program.tagline }}"
                    </p>
                </div>
            </div>
        </section>

        <!-- Content -->
        <section class="bg-white py-20">
            <div class="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-12">
                <!-- Main description -->
                <div class="md:col-span-2">
                    <h2 class="font-display text-2xl font-bold text-stone-900 mb-5">About {{ program.name }}</h2>
                    <div class="space-y-4 text-stone-600 text-sm leading-relaxed">
                        <p v-for="(para, i) in program.fullDescription.split('\n\n')" :key="i">{{ para }}</p>
                    </div>
                </div>

                <!-- Highlights sidebar -->
                <aside>
                    <div :class="['border-l-4 pl-5', colorBorderMap[program.color] || colorBorderMap.amber]">
                        <h3 class="font-display text-stone-900 font-semibold text-base mb-4">Program Highlights</h3>
                        <ul class="space-y-3">
                            <li v-for="highlight in program.highlights" :key="highlight"
                                class="flex items-start gap-2 text-sm text-stone-600">
                                <span
                                    :class="['mt-0.5 shrink-0 text-base', colorTextMap[program.color] || colorTextMap.amber]">✓</span>
                                {{ highlight }}
                            </li>
                        </ul>
                    </div>

                    <div class="mt-8 p-5 bg-stone-50 rounded-lg border border-stone-200">
                        <p class="text-stone-700 text-sm font-medium mb-3">Want to bring {{ program.name }} to your
                            school?</p>
                        <RouterLink to="/contact"
                            class="block text-center px-4 py-2.5 bg-amber-400 text-stone-950 font-semibold rounded text-sm hover:bg-amber-300 transition-colors">
                            Contact Us
                        </RouterLink>
                    </div>
                </aside>
            </div>
        </section>

        <!-- Gallery placeholder — ready for images from manifest -->
        <section class="bg-stone-50 py-14 border-t border-stone-200">
            <div class="max-w-6xl mx-auto px-5">
                <h3 class="font-display text-stone-800 font-semibold text-lg mb-5">
                    Gallery
                    <span class="text-stone-400 text-sm font-normal font-sans ml-2">(images added via media
                        manifest)</span>
                </h3>
                <div v-if="program && mediaSrc(`programs.${program.id}.gallery.0`)"
                    class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <!-- Rendered when gallery images are populated in manifest.json -->
                </div>
                <p v-else class="text-stone-400 text-sm">No gallery images yet. Add them to <code
                        class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">public/media/manifest.json</code> under <code
                        class="bg-stone-100 px-1.5 py-0.5 rounded text-xs">programs.{{ program?.id }}.gallery</code>.
                </p>
            </div>
        </section>

        <!-- Other programs -->
        <section class="bg-stone-950 py-16 border-t border-stone-800">
            <div class="max-w-6xl mx-auto px-5">
                <h3 class="font-display text-white font-semibold text-xl mb-6">Also explore</h3>
                <div class="grid sm:grid-cols-3 gap-5">
                    <RouterLink v-for="p in otherPrograms" :key="p.id" :to="`/programs/${p.id}`"
                        class="bg-stone-900 border border-stone-800 rounded-lg p-5 hover:border-stone-600 transition-colors group">
                        <span class="text-xl mb-2 block">{{ p.icon }}</span>
                        <p class="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors">{{
                            p.name }}</p>
                        <p class="text-stone-500 text-xs mt-1 line-clamp-2">{{ p.tagline }}</p>
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>
