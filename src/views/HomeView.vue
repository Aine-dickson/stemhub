<script setup lang="ts">
    // src/views/HomeView.vue
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
    import { useMedia } from '@/composables/useMedia'
    import { programs } from '@/data/programs'
    import SectionHeader from '@/components/ui/SectionHeader.vue'
    import ProgramCard from '@/components/ui/ProgramCard.vue'
    import MediaImage from '@/components/ui/MediaImage.vue'

    const { mediaSrc, mediaAlt } = useMedia()

    const stats = [
        { value: '4', label: 'Core Programs' },
        { value: '500+', label: 'Learners Reached' },
        { value: '20+', label: 'Partner Schools' },
        { value: '5', label: 'Districts Covered' },
    ]

    const heroSlides = [
        {
            key: 'impact',
            src: mediaSrc('home.impactPhoto'),
            alt: mediaAlt('home.impactPhoto'),
        },
        {
            key: 'hero',
            src: mediaSrc('home.hero'),
            alt: mediaAlt('home.hero'),
        },
        {
            key: 'team',
            src: mediaSrc('about.teamPhoto'),
            alt: mediaAlt('about.teamPhoto'),
        },
        {
            key: 'story',
            src: mediaSrc('about.storyPhoto'),
            alt: mediaAlt('about.storyPhoto'),
        },
    ].filter((slide) => slide.src)

    const activeHeroSlide = ref(0)
    const activeHeroSlideData = computed(() => heroSlides[activeHeroSlide.value] ?? null)
    const heroSlidePosition = computed(() => {
        const key = activeHeroSlideData.value?.key
        if (key === 'hero') return 'object-top-right'
        if (key === 'team') return 'object-right'
        return 'object-center'
    })
    let heroTimer: number | undefined

    function preloadHeroSlide(index: number) {
        const slide = heroSlides[index]
        if (!slide?.src) return

        const preloadImage = new Image()
        preloadImage.decoding = 'async'
        preloadImage.src = slide.src
    }

    onMounted(() => {
        if (heroSlides.length < 2) return

        preloadHeroSlide(0)

        heroTimer = window.setInterval(() => {
            activeHeroSlide.value = (activeHeroSlide.value + 1) % heroSlides.length
            preloadHeroSlide((activeHeroSlide.value + 1) % heroSlides.length)
        }, 5200)
    })

    onBeforeUnmount(() => {
        if (heroTimer !== undefined) {
            window.clearInterval(heroTimer)
        }
    })
</script>

<template>
    <main>
        <!-- ── Hero ────────────────────────────────────────────── -->
        <section class="relative min-h-screen bg-stone-950 flex flex-col justify-center overflow-hidden">
            <!-- Background image -->
            <div class="absolute inset-0 overflow-hidden">
                <Transition name="hero-fade" mode="out-in">
                    <MediaImage v-if="activeHeroSlideData" :key="activeHeroSlideData.key" :src="activeHeroSlideData.src"
                        :alt="activeHeroSlideData.alt" loading="eager" priority="high"
                        class="absolute inset-0 h-full w-full object-cover opacity-50" :class="heroSlidePosition" />
                </Transition>
                <div class="absolute inset-0 bg-linear-to-b from-stone-950/30 via-stone-950/50 to-stone-950"></div>
            </div>

            <!-- Geometric accent -->
            <div class="absolute top-24 right-0 w-72 h-72 border border-amber-400/10 rounded-full translate-x-1/2">
            </div>
            <div class="absolute bottom-32 left-0 w-48 h-48 border border-amber-400/10 rounded-full -translate-x-1/2">
            </div>

            <div class="relative max-w-6xl mx-auto px-5 pt-28 pb-20">
                <div class="max-w-4xl">
                    <span class="inline-block text-sm font-bold uppercase tracking-widest text-amber-400 mb-6">
                        STEMHub Uganda
                    </span>
                    <h1 class="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
                        Driving Innovation<br class="sm:hidden" />
                        in STEM <br class="hidden sm:block" />
                        Teaching<br class="sm:hidden" />
                        <span class="text-amber-400"> &amp; Learning.</span>
                    </h1>
                    <p class="text-stone-300 max-w-3xl text-lg leading-relaxed mb-10">
                        We equip schools and underserved communities across Uganda with hands-on robotics, programming
                        training, and curriculum-aligned visual education tools — building the next generation of
                        problem-solvers.
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <RouterLink to="/programs"
                            class="px-6 py-3 bg-amber-400 text-stone-950 font-semibold rounded hover:bg-amber-300 transition-colors text-sm">
                            Explore Our Programs
                        </RouterLink>
                        <RouterLink to="/about"
                            class="px-6 py-3 border border-stone-600 text-stone-300 font-medium rounded hover:border-stone-400 hover:text-white transition-colors text-sm">
                            About Us
                        </RouterLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Impact stats ─────────────────────────────────────── -->
        <section class="bg-stone-900 border-y border-stone-800">
            <div class="max-w-6xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div v-for="(stat, i) in stats" :key="stat.label" class="text-center" v-in-view="{ delay: i * 80 }">
                    <p class="font-display text-3xl font-bold text-amber-400" v-count-up="stat.value">0</p>
                    <p class="text-stone-400 text-sm mt-1">{{ stat.label }}</p>
                </div>
            </div>
        </section>

        <!-- ── Mission ──────────────────────────────────────────── -->
        <section class="bg-white py-20">
            <div class="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
                <div v-in-view>
                    <SectionHeader label="Our Mission" title="STEM education that reaches everyone."
                        subtitle="We support schools and underserved communities by delivering hands-on training and purpose-built digital tools — so every learner in Uganda can access the future." />
                    <RouterLink to="/about"
                        class="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors">
                        Read our full story
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </RouterLink>
                </div>
                <div class="aspect-4/3 rounded-lg overflow-hidden bg-stone-100" v-in-view>
                    <MediaImage :src="mediaSrc('home.impactPhoto')" :alt="mediaAlt('home.impactPhoto')"
                        class="w-full h-full object-cover" placeholder-text="Impact photo" />
                </div>
            </div>
        </section>

        <!-- ── Programs ─────────────────────────────────────────── -->
        <section class="bg-stone-950 py-20">
            <div class="max-w-6xl mx-auto px-5">
                <SectionHeader label="What We Do" title="Four programs, one mission."
                    subtitle="From coding bootcamps to visual science simulations, every STEMHub program is designed with practical impact in mind."
                    light />
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" v-in-view>
                    <ProgramCard v-for="program in programs" :key="program.id" :program="program" />
                </div>
            </div>
        </section>

        <!-- ── CTA ──────────────────────────────────────────────── -->
        <section class="bg-amber-400 py-16">
            <div class="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                v-in-view>
                <div>
                    <h2 class="font-display text-2xl md:text-3xl font-bold text-stone-950">Get involved with STEMHub
                        Uganda.</h2>
                    <p class="text-stone-800 mt-2 text-sm">Partner with us. Volunteer. Donate. Help us grow.</p>
                </div>
                <RouterLink to="/contact"
                    class="shrink-0 px-6 py-3 bg-stone-950 text-white font-semibold rounded hover:bg-stone-800 transition-colors text-sm">
                    Reach Out
                </RouterLink>
            </div>
        </section>
    </main>
</template>
