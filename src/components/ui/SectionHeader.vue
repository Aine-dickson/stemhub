<script setup lang="ts">
    // src/components/ui/SectionHeader.vue
    defineProps({
        label: { type: String, default: null },       // small uppercase label above
        title: { type: String, required: true },
        subtitle: { type: String, default: null },
        align: { type: String, default: 'left' },      // 'left' | 'center'
        light: { type: Boolean, default: false },       // light variant for dark sections
    })
</script>

<template>
    <div v-in-view :class="['mb-10', align === 'center' && 'text-center']">
        <span v-if="label" class="inline-block uppercase tracking-widest mb-3" :class="[
            light ? 'text-amber-400 font-semibold text-xs' : 'text-amber-500 font-bold text-sm',

        ]">
            {{ label }}
        </span>
        <h2 :class="[
            'font-display text-3xl md:text-4xl font-bold leading-tight',
            light ? 'text-white' : 'text-stone-900',
        ]">
            {{ title }}
        </h2>
        <p v-if="subtitle" :class="[
            'mt-3 text-base leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto',
            light ? 'text-stone-400' : 'text-stone-500',
        ]">
            {{ subtitle }}
        </p>
    </div>
</template>
