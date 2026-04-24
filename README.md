# STEMHub Uganda — Website

Vue 3 SPA · Tailwind CSS v4 · Cloudflare Pages

---

## Quick Start

```bash
bun install
bun run dev        # localhost:5173
bun run build      # outputs to /dist
bun run preview    # preview the production build locally
```

---

## Project Structure

```
stemhub-uganda/
├── public/
│   ├── _redirects              # Cloudflare Pages SPA routing
│   └── media/
│       ├── manifest.json       ← THE ONLY FILE YOU EDIT TO CHANGE IMAGES
│       ├── logo.svg
│       ├── og-image.jpg
│       ├── home-hero.jpg
│       ├── home-impact.jpg
│       ├── about-team.jpg
│       ├── about-story.jpg
│       ├── program-codelab.jpg
│       ├── program-stemlab.jpg
│       ├── program-innovation-studio.jpg
│       ├── program-stem360.jpg
│       └── graphics/
│           └── (SVG decorative assets)
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   ├── data/
│   │   └── programs.js         ← Program content (text, highlights)
│   ├── stores/
│   │   └── media.js            ← Pinia store: fetches + serves manifest.json
│   ├── composables/
│   │   └── useMedia.js         ← Per-component API: mediaSrc(), mediaAlt()
│   ├── router/
│   │   └── index.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppNav.vue
│   │   │   └── AppFooter.vue
│   │   └── ui/
│   │       ├── ProgramCard.vue
│   │       ├── SectionHeader.vue
│   │       └── MediaImage.vue  ← Graceful placeholder for unset images
│   └── views/
│       ├── HomeView.vue
│       ├── AboutView.vue
│       ├── ProgramsView.vue
│       ├── ProgramDetailView.vue
│       └── ContactView.vue
└── vite.config.js
```

---

## How the Media Layer Works

All site imagery is controlled through a **single JSON file**:

```
public/media/manifest.json
```

The app fetches this file on boot via the Pinia `media` store. Because the
store is reactive, every component using `useMedia()` automatically reflects
any change to the manifest.

### Adding / Changing an Image

1. Drop your image file into `public/media/`
2. Open `public/media/manifest.json`
3. Update the relevant `src` path, e.g.:

```json
"home": {
  "hero": {
    "src": "/media/my-new-hero.jpg",
    "alt": "Descriptive alt text here"
  }
}
```

4. Save → Vite hot-reloads in dev. In production: redeploy to Cloudflare Pages.

### Using Media in a Component

```vue
<script setup>
import { useMedia } from '@/composables/useMedia'
const { mediaSrc, mediaAlt } = useMedia()
</script>

<template>
  <img :src="mediaSrc('home.hero')" :alt="mediaAlt('home.hero')" />
</template>
```

Keys use dot notation matching the manifest structure.

### Adding a Gallery to a Program

In `manifest.json`, populate the `gallery` array for that program:

```json
"programs": {
  "codelab": {
    "cover": { "src": "/media/program-codelab.jpg", "alt": "..." },
    "gallery": [
      { "src": "/media/codelab-1.jpg", "alt": "Students at a CodeLab session" },
      { "src": "/media/codelab-2.jpg", "alt": "Certificate ceremony" }
    ]
  }
}
```

The `ProgramDetailView` is already structured to render this.

---

## Updating Program Content (Text)

Edit `src/data/programs.js`. Each program object has:

- `name`, `tagline`, `shortDescription` — shown on cards and listings
- `fullDescription` — shown on the detail page (paragraphs separated by `\n\n`)
- `highlights` — bullet list on the detail page sidebar

---

## Contact Form

`ContactView.vue` currently has a placeholder submit handler. For Cloudflare
Pages static deployment, wire it to **Formspree**:

1. Create a free form at https://formspree.io
2. Replace the `handleSubmit` function with a `fetch` POST to your Formspree endpoint:

```js
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form.value),
})
```

---

## Deploying to Cloudflare Pages

1. Push the repo to GitHub
2. Connect it in Cloudflare Pages dashboard
3. Build command: `bun run build`
4. Output directory: `dist`
5. The `public/_redirects` file handles SPA routing automatically

---

## Future: Admin Portal

The media layer is structured to support an admin upload portal later:

- The manifest is a plain JSON file served as a static asset
- The `media` store has a `load()` method that can be called at any time to
  re-fetch the manifest — call it after the admin saves a new version
- Suggested path: build a separate `/admin` Cloudflare Worker or Pages Function
  that accepts authenticated file uploads, writes them to R2, and updates the
  manifest via the KV or R2 API
- The frontend store needs zero changes — just call `mediaStore.load()` after
  any admin save to re-hydrate all components
