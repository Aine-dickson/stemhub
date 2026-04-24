import type { Program } from '@/types'

export const programs: Program[] = [
  {
    id: 'codelab',
    name: 'CodeLab',
    tagline: 'From code to real-world solutions.',
    color: 'amber',
    icon: '⌨',
    shortDescription:
      'A comprehensive coding program that trains learners of all ages in key programming skills — empowering them to build digital systems and turn their code into scalable, real-world solutions.',
    fullDescription: `CodeLab is STEMHub's flagship coding education program. We believe every learner, regardless of age or background, has the potential to become a builder in the digital economy.

Through structured, project-based learning, participants progress from the fundamentals of programming logic all the way to building functional applications. Courses are hands-on, curriculum-aligned, and taught by experienced facilitators who understand the Ugandan learning context.

Whether in a school lab or a community space, CodeLab meets learners where they are — and takes them further than they imagined.`,
    highlights: [
      'Beginner to advanced tracks for all ages',
      'Project-based, real-world curriculum',
      'In-school and community delivery models',
      'Emphasis on building deployable digital products',
    ],
  },
  {
    id: 'stemlab',
    name: 'STEMLab',
    tagline: 'See the invisible. Understand the complex.',
    color: 'teal',
    icon: '⚗',
    shortDescription:
      'A revolutionary visual education tool that helps learners interact with abstract systems through high-quality simulations and 3D models — making complex concepts like body organs and mechanical machines tangible.',
    fullDescription: `STEMLab is STEMHub's in-house educational software platform — a visual learning environment where abstract science becomes something you can explore, rotate, and interact with.

Students who struggled to understand the chambers of the heart or the mechanics of a combustion engine can now see them in motion. STEMLab's 3D models and guided simulations are designed specifically to complement the Ugandan science curriculum, giving teachers powerful visual aids and giving students an experience that textbooks simply cannot provide.

STEMLab is continuously updated with new modules, and schools using it report meaningful improvements in both engagement and comprehension across science subjects.`,
    highlights: [
      'Curriculum-aligned 3D models and simulations',
      'Biology, physics, and engineering modules',
      'Teacher tools and classroom integration guides',
      'Regularly updated with new subject content',
    ],
  },
  {
    id: 'innovation-studio',
    name: 'Innovation Studio',
    tagline: 'Your idea. Built, tested, launched.',
    color: 'rose',
    icon: '💡',
    shortDescription:
      'A specialized incubator program that fosters innovation and creativity — supporting student ideas and inventions with the mentorship and resources needed to turn concepts into tangible, usable products.',
    fullDescription: `Innovation Studio is where student inventors come to take their ideas seriously. It is STEMHub's incubation arm, designed for learners who have more than curiosity — they have a problem they want to solve.

Participants are guided through a structured design-thinking and prototyping process: defining the problem, ideating solutions, building prototypes, gathering feedback, and iterating. Mentors with backgrounds in engineering, software, and entrepreneurship walk alongside each team throughout the journey.

At the end of each cohort, teams present their projects to a panel of judges at the STEMHub Innovation Showcase — a celebration of what young Ugandan minds can build when given the right environment.`,
    highlights: [
      'Structured design-thinking curriculum',
      'Access to hardware and fabrication tools',
      'Mentorship from engineers and entrepreneurs',
      'Annual Innovation Showcase and recognition',
    ],
  },
  {
    id: 'stem360',
    name: 'STEM360',
    tagline: 'Inclusive STEM. No community left behind.',
    color: 'green',
    icon: '🌍',
    shortDescription:
      'Our dedicated impact and outreach program — promoting STEM education within underserved communities and managing charitable initiatives that ensure inclusive access to quality education for all.',
    fullDescription: `STEM360 is the outreach heartbeat of STEMHub Uganda. It exists because great STEM education should not be the privilege of well-funded schools in urban centres — it belongs to every learner, everywhere.

Through STEM360, we carry our programs into communities that typically lack the infrastructure, teachers, or resources to access quality STEM education. We partner with local leaders, faith communities, and NGOs to identify the right entry points and deliver impactful, contextually appropriate programming.

STEM360 also houses STEMHub's charitable initiatives: equipment drives, scholarship support, teacher training, and digital literacy campaigns in rural and peri-urban areas across Uganda.`,
    highlights: [
      'Rural and peri-urban community reach',
      'Partnerships with schools, NGOs, and local leaders',
      'Teacher training and capacity building',
      'Equipment and resource donation drives',
    ],
  },
]

export function getProgramById(id: string) {
  return programs.find((program) => program.id === id) || null
}