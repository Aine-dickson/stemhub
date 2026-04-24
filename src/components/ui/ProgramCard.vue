<script setup lang="ts">
    // src/components/ui/ProgramCard.vue
    // Props match the programs.js data shape.
    import { useMedia } from '@/composables/useMedia'
    import type { Program, ProgramColor } from '@/types'
import MediaImage from './MediaImage.vue';

    defineProps<{ program: Program }>()

    const { mediaSrc, mediaAlt } = useMedia()

    const colorMap: Record<ProgramColor, string> = {
        amber: 'border-amber-400 text-amber-400',
        teal: 'border-teal-400 text-teal-400',
        rose: 'border-rose-400 text-rose-400',
        green: 'border-green-400 text-green-400',
    }
</script>

<template>
    <RouterLink :to="`/programs/${program.id}`"
        class="group block bg-stone-900 border border-stone-800 rounded-lg overflow-hidden hover:border-stone-600 transition-colors duration-200">
        <!-- Cover image -->
        <div class="aspect-video bg-stone-800 overflow-hidden">
            <MediaImage v-if="mediaSrc(`programs.${program.id}.cover`)" 
                :src="mediaSrc(`programs.${program.id}.cover`)"
                :alt="mediaAlt(`programs.${program.id}.cover`)"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy" />
            <!-- Placeholder when no image is set -->
            <div v-else class="w-full h-full flex items-center justify-center text-4xl text-stone-700">
                {{ program.icon }}
            </div>
        </div>

        <!-- Content -->
        <div class="p-5">
            <div class="flex items-start justify-between gap-3 mb-2">
                <h3 class="font-display text-white text-xl font-semibold leading-tight">{{ program.name }}</h3>
                <span
                    :class="['text-xs font-mono border px-2 py-0.5 rounded-full shrink-0 mt-0.5', colorMap[program.color] || colorMap.amber]">
                    Program
                </span>
            </div>
            <p class="text-amber-400/80 text-xs font-medium mb-3 italic">{{ program.tagline }}</p>
            <p class="text-stone-400 text-sm leading-relaxed line-clamp-3">
                {{ program.shortDescription }}
            </p>
            <span
                class="mt-4 inline-flex items-center gap-1 text-xs font-medium text-stone-400 group-hover:text-white transition-colors">
                Learn more
                <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </span>
        </div>
    </RouterLink>
</template>
