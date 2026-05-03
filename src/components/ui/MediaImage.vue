<script setup lang="ts">
    // src/components/ui/MediaImage.vue
    // Use this instead of bare <img> whenever the src comes from the manifest.
    // Shows a tasteful placeholder when the image hasn't been uploaded yet.

    const props = defineProps<{
        src: string | null;
        alt: string;
        class: string;
        placeholderText?: string;
        loading?: 'lazy' | 'eager'
        priority?: 'high' | 'low' | 'auto'
    }>()
</script>

<template>
    <img v-if="src" :src="src" :alt="alt" v-bind="$attrs" :loading="props.loading ?? 'lazy'"
        :fetchpriority="props.priority ?? (props.loading === 'eager' ? 'high' : 'low')" decoding="async"
        class="h-full w-full object-cover" :class="props.class" />
    <div v-else v-bind="$attrs"
        class="flex items-center justify-center bg-stone-800 text-stone-600 text-sm select-none">
        <span>{{ props.placeholderText || 'Image not available' }}</span>
    </div>
</template>
