type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

type ProjectContent = {
  name: string
  type: string
  description: string
  heroImage: string
  detailImage: string
}

const projectContent: Record<string, ProjectContent> = {
  yumiko: {
    name: 'The Mood Mosaic',
    type: 'Web Design',
    description: 'An intimate digital showcase designed for boutique studios, pairing warm editorial typography with seamless gallery experiences.',
    heroImage: 'https://placehold.co/1400x900/c5c5c5/777777?text=YUMIKO+PROJECT+IMAGE',
    detailImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-12%20215052-U3egleoI4d2DSNdJfomoT5nnJi6o5p.png',
  },
  delane: {
    name: 'DELANE',
    type: 'Framer Development',
    description: 'A considered digital experience built around expressive type, confident layouts and fluid interactions.',
    heroImage: 'https://placehold.co/1400x900/c5c5c5/777777?text=DELANE+HERO',
    detailImage: 'https://placehold.co/1400x900/2d2d2d/f4f4f4?text=DELANE+DETAIL',
  },
  'noir-studio': {
    name: 'NOIR STUDIO',
    type: 'Digital Experience',
    description: 'A focused interface system for presenting culture, stories and selected work with clarity.',
    heroImage: 'https://placehold.co/1400x900/c5c5c5/777777?text=NOIR+STUDIO+HERO',
    detailImage: 'https://placehold.co/1400x900/2d2d2d/f4f4f4?text=NOIR+STUDIO+DETAIL',
  },
  'north-field': {
    name: 'NORTH FIELD',
    type: 'Brand Website',
    description: 'A flexible brand website balancing strong visual direction with an easy-to-navigate content structure.',
    heroImage: 'https://placehold.co/1400x900/c5c5c5/777777?text=NORTH+FIELD+HERO',
    detailImage: 'https://placehold.co/1400x900/2d2d2d/f4f4f4?text=NORTH+FIELD+DETAIL',
  },
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projectContent[slug] ?? projectContent.yumiko

  return (
    <main className="min-h-screen bg-background px-6 pb-12 text-foreground">
      <section className="mx-auto flex max-w-[760px] flex-col items-center pt-5 text-center sm:pt-7">
        <p className="text-[15px] font-medium leading-none tracking-[-0.04em] text-muted-foreground">{project.type}</p>
        <h1 className="mt-10 font-sans text-[clamp(5rem,11vw,9rem)] font-black leading-[0.82] tracking-[-0.105em]">{project.name}</h1>
        <p className="mt-10 max-w-[570px] text-[clamp(1.35rem,2.35vw,1.8rem)] font-semibold leading-[1.22] tracking-[-0.045em]">{project.description}</p>
        <a href="/" className="mt-7 rounded-[2px] bg-primary px-4 py-2 text-[16px] font-semibold leading-none text-primary-foreground transition-transform hover:scale-105">Live Project</a>
        <div className="mt-[60px] aspect-[1.48] w-full overflow-hidden rounded-[9px] bg-muted">
          <img src={project.heroImage} alt={`${project.name} project placeholder`} className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto mt-[150px] max-w-[710px] pb-24" aria-label="Project details">
        <div className="space-y-[58px]">
          <article>
            <h2 className="text-[26px] font-bold leading-none tracking-[-0.05em]">Overview</h2>
            <p className="mt-7 text-[18px] leading-[1.38] tracking-[-0.02em] text-muted-foreground">
              The goal of {project.name} was to create a clean, modern portfolio template for creatives who want to present their work with clarity and personality. The layout focuses on strong project imagery, simple navigation, and flexible sections that make it easy to showcase selected work, personal information, and contact details.
            </p>
          </article>
          <article>
            <h2 className="text-[26px] font-bold leading-none tracking-[-0.05em]">Challenge</h2>
            <p className="mt-7 text-[18px] leading-[1.38] tracking-[-0.02em] text-muted-foreground">
              Personal portfolios often become either too minimal to feel distinctive or too complex to maintain. The challenge was creating a structure that feels polished and expressive while staying simple, responsive, and easy to customize for different creative disciplines.
            </p>
          </article>
          <article>
            <h2 className="text-[26px] font-bold leading-none tracking-[-0.05em]">Solution</h2>
            <p className="mt-7 text-[18px] leading-[1.38] tracking-[-0.02em] text-muted-foreground">
              We built {project.name} around a flexible Framer system with reusable project components, clear visual hierarchy, and responsive layouts. The result is a lightweight portfolio template that adapts easily to different types of work while keeping the overall experience refined, consistent, and easy to navigate.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto mt-[150px] max-w-[710px] pb-24" aria-label="Project gallery">
        <div className="flex flex-col gap-[58px]">
          {[
            'https://placehold.co/1400x900/c5c5c5/777777?text=PROJECT+IMAGE+01',
            'https://placehold.co/1400x900/c5c5c5/777777?text=PROJECT+IMAGE+02',
            'https://placehold.co/1400x900/c5c5c5/777777?text=PROJECT+IMAGE+03',
            'https://placehold.co/1400x900/c5c5c5/777777?text=PROJECT+IMAGE+04',
            'https://placehold.co/1400x900/c5c5c5/777777?text=PROJECT+IMAGE+05',
          ].map((image, index) => (
            <div key={image} className="aspect-[1.48] overflow-hidden rounded-[9px] bg-muted">
              <img src={image} alt={`${project.name} project image ${index + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export function generateStaticParams() {
  return Object.keys(projectContent).map((slug) => ({ slug }))
}
