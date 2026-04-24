export type ProgramColor = 'amber' | 'teal' | 'rose' | 'green'

export interface Program {
    id: string
    name: string
    tagline: string
    color: ProgramColor
    icon: string
    shortDescription: string
    fullDescription: string
    highlights: string[]
}

export interface MediaAsset {
    src: string
    alt: string
}

export interface MediaManifest {
    [key: string]: unknown
}