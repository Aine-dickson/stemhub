<script setup lang="ts">
    // src/views/ContactView.vue
    import { ref } from 'vue'

    const form = ref({ name: '', email: '', organisation: '', message: '', subject: 'general' })
    const submitted = ref(false)
    const submitting = ref(false)

    const subjects = [
        { value: 'general', label: 'General Enquiry' },
        { value: 'partner-school', label: 'Partner School' },
        { value: 'volunteer', label: 'Volunteer' },
        { value: 'donor', label: 'Donor / Sponsor' },
        { value: 'media', label: 'Media' },
    ]

    async function handleSubmit() {
        // Placeholder: wire to Formspree, Netlify Forms, or your own endpoint.
        // For Cloudflare Pages static deployment, use Formspree:
        // Set action="https://formspree.io/f/YOUR_ID" and method="POST"
        submitting.value = true
        await new Promise((r) => setTimeout(r, 800)) // Simulate request
        submitted.value = true
        submitting.value = false
    }

    const contacts = [
        { label: 'Email', value: 'info@stemhub.ug', href: 'mailto:info@stemhub.ug' },
        { label: 'Location', value: 'Kampala, Uganda', href: null },
    ]
</script>

<template>
    <main class="pt-16">
        <!-- Header -->
        <section class="bg-stone-950 py-20 border-b border-stone-800">
            <div class="max-w-6xl mx-auto px-5">
                <span
                    class="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">Contact</span>
                <h1 class="font-display text-4xl md:text-5xl font-bold text-white leading-tight max-w-xl">
                    Let's talk about STEM in Uganda.
                </h1>
                <p class="text-stone-400 mt-4 max-w-md text-sm leading-relaxed">
                    Whether you want to partner, volunteer, donate, or just learn more — we'd love to hear from you.
                </p>
            </div>
        </section>

        <!-- Content -->
        <section class="bg-white py-20">
            <div class="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-12">

                <!-- Contact info -->
                <aside class="md:col-span-1">
                    <h2 class="font-display text-stone-900 font-semibold text-lg mb-6">Reach us directly</h2>
                    <div class="space-y-5">
                        <div v-for="c in contacts" :key="c.label">
                            <p class="text-sm font-semibold uppercase tracking-widest text-stone-600 mb-0.5">{{ c.label
                                }}</p>
                            <a v-if="c.href" :href="c.href"
                                class="text-stone-900 cursor-pointer hover:text-amber-600 text-sm transition-colors">
                                {{ c.value }}
                            </a>
                            <p v-else class="text-stone-700 text-sm">{{ c.value }}</p>
                        </div>
                    </div>

                    <div class="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-lg">
                        <p class="text-stone-700 text-sm font-medium mb-1">Want to bring STEMHub to your school?</p>
                        <p class="text-stone-500 text-xs leading-relaxed">
                            Select "Partner School" in the form and tell us about your institution. We'll get back to
                            you within 3 working days.
                        </p>
                    </div>
                </aside>

                <!-- Form -->
                <div class="md:col-span-2">
                    <div v-if="submitted" class="flex flex-col items-start gap-3 py-10">
                        <span class="text-3xl">✓</span>
                        <h3 class="font-display text-stone-900 text-xl font-semibold">Message received.</h3>
                        <p class="text-stone-500 text-sm">We'll be in touch shortly. Thank you for reaching out to
                            STEMHub Uganda.</p>
                        <button class="mt-2 cursor-pointer text-sm text-stone-500 underline hover:text-stone-700"
                            @click="submitted = false; form = { name: '', email: '', organisation: '', message: '', subject: 'general' }">
                            Send another message
                        </button>
                    </div>

                    <!-- NOTE: For Cloudflare Pages, replace @submit.prevent with a real Formspree action -->
                    <div v-else class="space-y-5">
                        <div class="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label
                                    class="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                                    Full Name <span class="text-red-500">*</span>
                                </label>
                                <input v-model="form.name" type="text" required placeholder="Jane Nakato"
                                    class="w-full px-3 py-2.5 border border-stone-300 rounded text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                            </div>
                            <div>
                                <label
                                    class="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                                    Email <span class="text-red-500">*</span>
                                </label>
                                <input v-model="form.email" type="email" required placeholder="jane@school.ug"
                                    class="w-full px-3 py-2.5 border border-stone-300 rounded text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                            </div>
                        </div>

                        <div class="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label
                                    class="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                                    Organisation
                                </label>
                                <input v-model="form.organisation" type="text" placeholder="School / NGO / Company"
                                    class="w-full px-3 py-2.5 border border-stone-300 rounded text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                            </div>
                            <div>
                                <label
                                    class="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                                    Subject
                                </label>
                                <select v-model="form.subject"
                                    class="w-full px-3 py-2.5 border border-stone-300 rounded text-sm text-stone-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white">
                                    <option v-for="s in subjects" :key="s.value" :value="s.value">{{ s.label }}</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                                Message <span class="text-red-500">*</span>
                            </label>
                            <textarea v-model="form.message" required rows="5"
                                placeholder="Tell us how we can help or how you'd like to get involved..."
                                class="w-full px-3 py-2.5 border border-stone-300 rounded text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-y" />
                        </div>

                        <button :disabled="submitting"
                            class="px-6 py-3 bg-stone-950 text-white font-semibold rounded text-sm hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="submitting ? 'cursor-not-allowed' : 'cursor-pointer'"
                            @click="handleSubmit">
                            {{ submitting ? 'Sending…' : 'Send Message' }}
                        </button>
                        <p class="text-stone-600 text-xs">
                            <!-- Replace the placeholder submit handler with Formspree for real deployment -->
                            We respond within 3 working days.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
