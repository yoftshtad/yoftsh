'use client'

import { useEffect, useRef, useState } from 'react'
import { ProjectCard } from '@/components/project-card'
import { projectConfig as luxTransporterConfig } from './lux-transporter/page'
import { projectConfig as stJohnConfig } from './st-john/page'
import { projectConfig as moodMosaicConfig } from './mood-mosaic/page'
import { projectConfig as noirStudioConfig } from './noir-studio/page'
import { projectConfig as northFieldConfig } from './north-field/page'
import { projectConfig as gameBrowserConfig} from './game-browser/page'

const projects = [luxTransporterConfig, stJohnConfig, moodMosaicConfig, noirStudioConfig, northFieldConfig, gameBrowserConfig ]

const rows = [
  projects.slice(0, 2),
  projects.slice(2, 4),
  projects.slice(4),
]

const filters = ['All', 'Creative Direction', 'Interaction Design', 'Framer Development', 'Web Design']

const createObserver = (ref: React.RefObject<HTMLElement | null>, setVisible: (v: boolean) => void) => {
  const section = ref.current
  if (!section) return () => {}

  const rect = section.getBoundingClientRect()
  const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
  if (isInViewport) {
    setVisible(true)
    return () => {}
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  observer.observe(section)
  return () => observer.disconnect()
}

export default function WorkPage() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const rowRefs = rows.map(() => useRef<HTMLElement>(null))
  const rowVisible = rows.map(() => useState(false))

  useEffect(() => createObserver(headerRef, setHeaderVisible), [])
  rows.forEach((_, i) => {
    useEffect(() => createObserver(rowRefs[i], rowVisible[i][1]), [])
  })

  return (
    <main className="min-h-screen bg-background px-6 pb-24 text-foreground">
      <section ref={headerRef} data-visible={headerVisible ? 'true' : 'false'} className="work-entrance mx-auto max-w-[1220px] pt-14 sm:pt-16 mb-12">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-sans text-[clamp(5rem,11vw,9rem)] font-black leading-[0.82] tracking-[-0.105em]">WORK</h1>
          <p className="mt-9 max-w-[550px] text-[17px] font-medium leading-[1.15] tracking-[-0.025em] text-muted-foreground sm:text-[18px]">
            A collection of selected websites and digital experiences, shaped
            <br className="hidden sm:block" /> through thoughtful design, interaction and visual direction.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {filters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`rounded-[2px] px-4 py-2 text-[16px] font-medium leading-none transition-colors ${index === 0 ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {rows.map((rowProjects, i) => (
        <section
          key={i}
          ref={rowRefs[i]}
          data-visible={rowVisible[i][0] ? 'true' : 'false'}
          className="work-entrance mx-auto max-w-[1220px] px-6 pb-12 lg:px-6"
        >
          <div className="work-grid grid gap-x-4 gap-y-8 md:grid-cols-2">
            {rowProjects.map((project) => (
              <ProjectCard key={project.slug} name={project.name} type={project.type} image={project.thumbnail} slug={project.slug} />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}