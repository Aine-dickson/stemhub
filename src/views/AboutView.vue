<script setup lang="ts">
    // src/views/AboutView.vue
    import { useMedia } from '@/composables/useMedia'
    import SectionHeader from '@/components/ui/SectionHeader.vue'
    import MediaImage from '@/components/ui/MediaImage.vue'

    const { mediaSrc, mediaAlt } = useMedia()

    const values = [
        {
            title: 'Inclusion',
            description: 'STEM education belongs to every learner, in every community — urban or rural, well-resourced or not.',
        },
        {
            title: 'Hands-on Learning',
            description: 'We believe in doing, building, and making mistakes. Abstract concepts become real when learners interact with them.',
        },
        {
            title: 'Local Context',
            description: 'Our curriculum and tools are designed with Ugandan learners in mind, not adapted from elsewhere.',
        },
        {
            title: 'Sustainable Impact',
            description: 'We invest in teacher capacity and community ownership so impact outlasts our direct presence.',
        },
    ]

    const team = [
        { name: 'Team Member', role: 'Executive Director' },
        { name: 'Team Member', role: 'Programs Lead' },
        { name: 'Team Member', role: 'Technology Lead' },
        { name: 'Team Member', role: 'Outreach Coordinator' },
    ]
</script>

<template>
    <main class="pt-16">
        <!-- Page header -->
        <section class="bg-stone-950 py-20 border-b border-stone-800">
            <div class="max-w-6xl mx-auto px-5">
                <span class="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">About
                    Us</span>
                <h1 class="font-display text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
                    Building a generation of Ugandan innovators.
                </h1>
            </div>
        </section>

        <!-- Story -->
        <section class="bg-white py-20">
            <div class="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <SectionHeader label="Our Story" title="Where STEMHub began." />
                    <div class="space-y-4 text-stone-600 text-sm leading-relaxed">
                        <p>
                            STEMHub Uganda was founded on a simple observation: Uganda's schools were full of curious,
                            capable learners who lacked the tools to explore STEM in a meaningful way. Textbooks
                            described the heart but no one had seen it move. Programming was theoretical. Robotics was a
                            word, not an experience.
                        </p>
                        <p>
                            We set out to change that — not by importing foreign solutions, but by building ones that
                            fit the Ugandan context. Our programs are developed by Ugandans who understand the
                            curriculum, the communities, and the kinds of problems worth solving here.
                        </p>
                        <p>
                            Today, STEMHub operates across multiple districts, partners with schools and community
                            organisations, and continues to develop in-house educational software that is distributed to
                            schools across the country.
                        </p>
                    </div>
                </div>
                <div class="aspect-4/3 rounded-lg overflow-hidden bg-stone-100">
                    <MediaImage :src="mediaSrc('about.storyPhoto')" :alt="mediaAlt('about.storyPhoto')"
                        class="w-full h-full object-cover" />
                </div>
            </div>
        </section>

        <!-- Mission & Vision -->
        <section class="bg-stone-950 py-20">
            <div class="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10">
                <div class="bg-stone-900 border border-stone-800 rounded-lg p-8">
                    <span class="text-amber-400 text-xs font-semibold uppercase tracking-widest">Mission</span>
                    <p class="text-white text-lg font-display font-semibold mt-3 leading-snug">
                        To transform STEM teaching and learning across Uganda through innovation, technology, and
                        inclusive access.
                    </p>
                </div>
                <div class="bg-stone-900 border border-stone-800 rounded-lg p-8">
                    <span class="text-amber-400 text-xs font-semibold uppercase tracking-widest">Vision</span>
                    <p class="text-white text-lg font-display font-semibold mt-3 leading-snug">
                        A Uganda where every learner — regardless of location or background — can become a
                        problem-solver, innovator, and leader.
                    </p>
                </div>
            </div>
        </section>

        <!-- Values -->
        <section class="bg-white py-20">
            <div class="max-w-6xl mx-auto px-5">
                <SectionHeader label="What We Stand For" title="Our core values." />
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="value in values" :key="value.title" class="border-t-2 border-amber-400 pt-4">
                        <h3 class="font-display text-stone-900 font-semibold text-base mb-2">{{ value.title }}</h3>
                        <p class="text-stone-500 text-sm leading-relaxed">{{ value.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Team -->
        <section class="bg-stone-50 py-20">
            <div class="max-w-6xl mx-auto px-5">
                <SectionHeader label="The Team" title="The people driving our mission."
                    subtitle="A dedicated team of educators, engineers, and changemakers working to make quality STEM education a reality across Uganda." />
                <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <div v-for="member in team" :key="member.name + member.role"
                        class="bg-white border border-stone-200 md:border-stone-400 rounded-lg p-5 text-center">
                        <div
                            class="w-14 h-14 bg-stone-100 rounded-full mx-auto mb-3 flex items-center justify-center text-stone-400">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <p class="text-stone-800 text-sm font-semibold">{{ member.name }}</p>
                        <p class="text-stone-500 text-xs mt-0.5">{{ member.role }}</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
