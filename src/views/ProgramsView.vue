<script setup lang="ts">
    // src/views/ProgramsView.vue
    import { programs } from '@/data/programs'
    import SectionHeader from '@/components/ui/SectionHeader.vue'
    import ProgramCard from '@/components/ui/ProgramCard.vue'
</script>

<template>
    <main class="pt-16">
        <!-- Header -->
        <section class="bg-stone-950 py-20 border-b border-stone-800">
            <div class="max-w-6xl mx-auto px-5">
                <span class="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">What We
                    Do</span>
                <h1 class="font-display text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
                    Four programs built for Uganda's learners.
                </h1>
                <p class="text-stone-400 mt-4 max-w-xl text-sm leading-relaxed">
                    Each STEMHub program addresses a distinct gap in STEM education — from coding skills and visual
                    learning tools to innovation incubation and community outreach.
                </p>
            </div>
        </section>

        <!-- Grid -->
        <section class="bg-stone-950 py-16">
            <div class="max-w-6xl mx-auto px-5">
                <div class="grid sm:grid-cols-2 gap-6">
                    <ProgramCard v-for="program in programs" :key="program.id" :program="program" />
                </div>
            </div>
        </section>

        <!-- Get involved strip -->
        <section class="bg-stone-900 border-t border-stone-800 py-14">
            <div class="max-w-6xl mx-auto px-5 text-center">
                <h2 class="font-display text-2xl font-bold text-white mb-3">Interested in partnering with us?</h2>
                <p class="text-stone-400 text-sm mb-6">
                    We work with schools, NGOs, sponsors, and volunteers. There's a place for you in this mission.
                </p>
                <RouterLink to="/contact"
                    class="inline-block px-6 py-3 bg-amber-400 text-stone-950 font-semibold rounded hover:bg-amber-300 transition-colors text-sm">
                    Get in Touch
                </RouterLink>
            </div>
        </section>
    </main>
</template>
