'use client'

import { useEffect, useRef, useState } from 'react'
import { ProjectConfig } from '../project-types'

export const projectConfig: ProjectConfig = {
  slug: 'st-john',
  name: 'Saint John',
  type: 'Web Design',
  thumbnail: '/st-john/hero.png',
  description: 'An intimate digital showcase designed for boutique studios, pairing warm editorial typography with seamless gallery experiences.',
}

const heroImage = '/st-john/hero.png'
const detailImages = [
  '/st-john/detail-01.png',
  '/st-john/detail-02.png',
  '/st-john/detail-03.png',
  '/st-john/detail-04.png',
  '/st-john/detail-05.png',
]

const overview = `YUMIKO was created as an intimate digital showcase for boutique studios. The design pairs warm editorial typography with seamless gallery experiences, focusing on strong project imagery and flexible sections that make it easy to showcase selected work with elegance. Every detail was considered to feel both personal and professional.`

const challenge = `Boutique studio portfolios often struggle to balance editorial warmth with functional gallery systems. Most templates feel either too cold and rigid, or too loose and unstructured. The challenge was creating something that feels handcrafted yet systematic, expressive yet usable.`

const solution = `We built YUMIKO around a modular component system with reusable project components, clear visual hierarchy, and responsive layouts. The typography system uses warm editorial scales, while the gallery components handle varying aspect ratios gracefully. The result is a lightweight portfolio template that adapts easily to different types of work while keeping the experience refined, consistent, and easy to navigate.`

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

export default function YumikoPage() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [galleryVisible, setGalleryVisible] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const detailsRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLElement>(null)

  useEffect(() => createObserver(headerRef, setHeaderVisible), [])
  useEffect(() => createObserver(detailsRef, setDetailsVisible), [])
  useEffect(() => createObserver(galleryRef, setGalleryVisible), [])

  return (
    <main className="min-h-screen bg-background px-6 pb-12 text-foreground">
      <section ref={headerRef} data-visible={headerVisible ? 'true' : 'false'} className="work-entrance mx-auto flex max-w-[760px] flex-col items-center pt-5 text-center sm:pt-7">
        <p className="text-[15px] font-medium leading-none tracking-[-0.04em] text-muted-foreground">{projectConfig.type}</p>
        <h1 className="mt-10 font-sans text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[0.82] tracking-[-0.105em]">{projectConfig.name}</h1>
        <p className="mt-10 max-w-[570px] text-[clamp(1.35rem,2.35vw,1.8rem)] font-semibold leading-[1.22] tracking-[-0.045em]">{projectConfig.description}</p>
        <a href="/" className="mt-7 rounded-[2px] bg-primary px-4 py-2 text-[16px] font-semibold leading-none text-primary-foreground transition-transform hover:scale-105">Live Project</a>
        <div className="mt-[60px] aspect-[1.48] w-full overflow-hidden rounded-[9px] bg-muted">
          <img src={heroImage} alt={`${projectConfig.name} project placeholder`} className="h-full w-full object-cover" />
        </div>
      </section>

      <section ref={detailsRef} data-visible={detailsVisible ? 'true' : 'false'} className="work-entrance mx-auto mt-[150px] max-w-[710px] pb-24" aria-label="Project details">
        <div className="space-y-[58px]">
          <article>
            <h2 className="text-[26px] font-bold leading-none tracking-[-0.05em]">Overview</h2>
            <p className="mt-7 text-[18px] leading-[1.38] tracking-[-0.02em] text-muted-foreground">{overview}</p>
          </article>
          <article>
            <h2 className="text-[26px] font-bold leading-none tracking-[-0.05em]">Challenge</h2>
            <p className="mt-7 text-[18px] leading-[1.38] tracking-[-0.02em] text-muted-foreground">{challenge}</p>
          </article>
          <article>
            <h2 className="text-[26px] font-bold leading-none tracking-[-0.05em]">Solution</h2>
            <p className="mt-7 text-[18px] leading-[1.38] tracking-[-0.02em] text-muted-foreground">{solution}</p>
          </article>
        </div>
      </section>

      <section ref={galleryRef} data-visible={galleryVisible ? 'true' : 'false'} className="work-entrance mx-auto mt-[150px] max-w-[710px] pb-24" aria-label="Project gallery">
        <div className="flex flex-col gap-[58px]">
          {detailImages.map((image, index) => (
            <div key={image} className="aspect-[1.48] overflow-hidden rounded-[9px]">
              <img src={image} alt={`${projectConfig.name} project image ${index + 1}`} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}