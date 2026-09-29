'use client'

import { useEffect, useRef, useState, forwardRef } from 'react'
import { CursorImageTrail } from '@/components/cursor-image-trail'
import { ProjectCard } from '@/components/project-card'
import {
  FigmaIcon,
  FramerIcon,
  ReactIcon,
  TailwindIcon,
  SupabaseIcon,
  NextjsIcon,
  JavascriptIcon,
  PostgresIcon,
  KritaIcon,
  PhotoshopIcon,
  BehanceIcon,
} from '@/components/brand-icons'
import { projectConfig as luxTransporterConfig } from './work/lux-transporter/page'
import { projectConfig as stJohnConfig } from './work/st-john/page'
import { projectConfig as moodMosaicConfig } from './work/mood-mosaic/page'
import { projectConfig as noirStudioConfig } from './work/noir-studio/page'

const homeProjects = [luxTransporterConfig, stJohnConfig, moodMosaicConfig, noirStudioConfig]

const homeFirstRow = homeProjects.slice(0, 2)
const homeSecondRow = homeProjects.slice(2, 4)

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/' },
  { label: 'Work', href: '/' },
  { label: 'Contact', href: '/' },
]

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [workHeaderVisible, setWorkHeaderVisible] = useState(false)
  const [workFirstRowVisible, setWorkFirstRowVisible] = useState(false)
  const [workSecondRowVisible, setWorkSecondRowVisible] = useState(false)
  const [aboutVisible, setAboutVisible] = useState(false)
  const [servicesVisible, setServicesVisible] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)
  const workHeaderRef = useRef<HTMLElement>(null)
  const workFirstRowRef = useRef<HTMLElement>(null)
  const workSecondRowRef = useRef<HTMLElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLImageElement>(null)
  const portraitTarget = useRef({ x: 0, y: 0 })
  const portraitCurrent = useRef({ x: 0, y: 0 })
  const portraitFrame = useRef<number | null>(null)

  useEffect(() => {
    const img = portraitRef.current
    if (!img) return

    const handleMouseMove = (event: MouseEvent) => {
      const rect = img.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (event.clientX - centerX) / rect.width * 20
      const deltaY = (event.clientY - centerY) / rect.height * 20
      portraitTarget.current = { x: Math.max(-60, Math.min(60, deltaX)), y: Math.max(-60, Math.min(60, deltaY)) }
    }

    const animate = () => {
      portraitCurrent.current.x += (portraitTarget.current.x - portraitCurrent.current.x) * 0.1
      portraitCurrent.current.y += (portraitTarget.current.y - portraitCurrent.current.y) * 0.1
      if (img) {
        img.style.transform = `translate(${portraitCurrent.current.x}px, ${portraitCurrent.current.y}px)`
      }
      portraitFrame.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    portraitFrame.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (portraitFrame.current) cancelAnimationFrame(portraitFrame.current)
    }
  }, [])

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

  useEffect(() => createObserver(workHeaderRef, setWorkHeaderVisible), [])
  useEffect(() => createObserver(workFirstRowRef, setWorkFirstRowVisible), [])
  useEffect(() => createObserver(workSecondRowRef, setWorkSecondRowVisible), [])
  useEffect(() => createObserver(aboutSectionRef, setAboutVisible), [])
  useEffect(() => createObserver(servicesSectionRef, setServicesVisible), [])
  useEffect(() => createObserver(contactSectionRef, setContactVisible), [])

  useEffect(() => {
    const header = workHeaderRef.current
    const firstRow = workFirstRowRef.current
    const secondRow = workSecondRowRef.current
    const track = document.querySelector('.client-logo-track')
    const mask = document.querySelector('.client-logo-mask')
    
    const logStyles = () => {
      const checkImages = (ref: React.RefObject<HTMLElement | null>, label: string) => {
        const el = ref.current
        if (!el) return
        const images = el.querySelectorAll('.project-image-reveal')
        images.forEach((img, i) => {
          const cs = window.getComputedStyle(img)
          console.log(`[${label}] Image ${i}:`, {
            clipPath: cs.clipPath,
            opacity: cs.opacity,
            transition: cs.transition,
          })
        })
      }
      
      checkImages(workHeaderRef, 'WorkHeader')
      checkImages(workFirstRowRef, 'WorkFirstRow')
      checkImages(workSecondRowRef, 'WorkSecondRow')
      
      if (track) {
        const cs = window.getComputedStyle(track)
        console.log('[ClientLogos] Track:', {
          animation: cs.animation,
          transform: cs.transform,
          width: cs.width,
        })
      }
      if (mask) {
        const cs = window.getComputedStyle(mask)
        console.log('[ClientLogos] Mask:', {
          width: cs.width,
          overflow: cs.overflow,
        })
      }
    }
    
    logStyles()
    const interval = setInterval(logStyles, 1000)
    return () => clearInterval(interval)
  }, [workHeaderVisible, workFirstRowVisible, workSecondRowVisible, servicesVisible])

  useEffect(() => {
    let revealTimer: ReturnType<typeof setTimeout> | undefined

    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 72
      if (shouldBeScrolled) {
        if (revealTimer) clearTimeout(revealTimer)
        setIsScrolled(true)
        return
      }

      if (!isScrolled) return
      if (revealTimer) clearTimeout(revealTimer)
      revealTimer = setTimeout(() => setIsScrolled(false), 1000)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (revealTimer) clearTimeout(revealTimer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isScrolled])

  return (
    <>
      <CursorFollower />
      <main className="min-h-screen bg-background text-foreground">
      <section data-hero-trail className="relative flex w-full flex-col items-center overflow-hidden px-6 pt-16 text-center sm:pt-[68px] lg:pt-[65px] min-h-[60vh] pb-0">
        <CursorImageTrail />
        <div className="relative z-10 flex w-full flex-col items-center scale-80 origin-top">
        <h1 className={`font-sans text-[clamp(4.5rem,12.25vw,9rem)] font-black leading-[0.82] tracking-[-0.085em] text-balance transition-all duration-700 ease-out ${isScrolled ? '-translate-y-8 scale-90 opacity-0' : 'translate-y-0 scale-100 opacity-100'}`}>
          YOFTAHE
        </h1>

        <div className="relative mt-8 h-[420px] w-full max-w-[560px] sm:mt-7 sm:h-[420px]">
          <div className="absolute left-[8%] top-[98px] h-[148px] w-[190px] overflow-hidden bg-muted sm:left-[14%] sm:h-[148px] sm:w-[190px]">
            <div className="h-full w-full bg-[linear-gradient(135deg,#9eb5c0_0%,#d9d2bd_52%,#8fa49c_100%)] p-3 opacity-90">
              <div className="h-1 w-10 bg-primary-foreground/70" />
              <div className="mt-12 space-y-1">
                <div className="h-2 w-24 bg-primary-foreground/80" />
                <div className="h-2 w-16 bg-primary-foreground/70" />
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 top-0 h-[420px] w-[315px] -translate-x-1/2 overflow-hidden rounded-[9px] shadow-sm sm:h-[420px] sm:w-[315px]">
            <img
              ref={portraitRef}
              src="/dude.jpeg"
              alt="Placeholder portrait to replace with your image"
              className="h-full w-full object-cover"
              style={{ willChange: 'transform', transition: 'transform 0.3s ease-out' }}
            />
          </div>
        </div>

        <div className="mt-10 max-w-[560px] text-[24px] font-medium leading-[1.48] tracking-[-0.045em] sm:mt-10 sm:text-[25px]">
          <p>
            I&apos;m Yoftahe Tadele, a digital designer creating
            <br className="hidden sm:block" /> refined websites and digital experiences
            <br className="hidden sm:block" /> with clarity, purpose and character.
          </p>
        </div>

        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-[2px] bg-primary px-4 py-2 text-[16px] font-medium leading-none text-primary-foreground transition-transform hover:scale-105"
        >
          Let&apos;s Talk
        </a>
        </div>
      </section>

      <section ref={workHeaderRef} data-visible={workHeaderVisible ? 'true' : 'false'} className="work-entrance mx-auto mt-[45px] max-w-[1220px] px-6 sm:mt-[65px] lg:px-6 mb-12" aria-labelledby="selected-work-title">
        <div className="flex flex-col items-center text-center">
          <h2 id="selected-work-title" className="font-sans text-[clamp(3.5rem,7vw,5.75rem)] font-black leading-[0.86] tracking-[-0.08em] text-balance">
            SELECTED WORK
          </h2>
          <p className="mt-8 max-w-[470px] text-[17px] font-medium leading-[1.2] tracking-[-0.025em] text-muted-foreground sm:text-[18px]">
            A selection of websites and digital experiences shaped
            <br className="hidden sm:block" /> through design, interaction and thoughtful details.
          </p>
          <a
            href="/work"
            className="mt-5 inline-flex items-center justify-center rounded-[2px] bg-primary px-4 py-2 text-[16px] font-medium leading-none text-primary-foreground transition-transform hover:scale-105"
          >
            View All
          </a>
        </div>
      </section>

      <section ref={workFirstRowRef} data-visible={workFirstRowVisible ? 'true' : 'false'} className="work-entrance mx-auto max-w-[1220px] px-6 pb-12 lg:px-6">
        <div className="work-grid grid gap-x-4 gap-y-8 md:grid-cols-2">
          {homeFirstRow.map((project) => <ProjectCard key={project.slug} name={project.name} type={project.type} image={project.thumbnail} slug={project.slug} />)}
        </div>
      </section>

      <section ref={workSecondRowRef} data-visible={workSecondRowVisible ? 'true' : 'false'} className="work-entrance mx-auto max-w-[1220px] px-6 pb-24 lg:px-6">
        <div className="work-grid grid gap-x-4 gap-y-8 md:grid-cols-2">
          {homeSecondRow.map((project) => <ProjectCard key={project.slug} name={project.name} type={project.type} image={project.thumbnail} slug={project.slug} />)}
        </div>
      </section>

      <section ref={aboutSectionRef} data-visible={aboutVisible ? 'true' : 'false'} className="work-entrance mx-auto mt-[50px] flex max-w-[760px] flex-col items-center px-6 pb-32 text-center sm:mt-[90px]" aria-labelledby="about-title">
        <h2 id="about-title" className="font-sans text-[clamp(3.5rem,7vw,5.75rem)] font-black leading-[0.86] tracking-[-0.08em]">
          ABOUT ME
        </h2>
        <div className="entrance-content relative mt-9 w-full max-w-[650px]">
          <p className="relative z-10 mx-auto max-w-[650px] text-[clamp(1.65rem,3vw,2rem)] font-semibold leading-[1.18] tracking-[-0.045em]">
            I&apos;m a digital designer focused on turning<br className="hidden sm:block" /> ideas into clear, engaging websites. My work<br className="hidden sm:block" /> combines thoughtful layouts, strong visual<br className="hidden sm:block" /> direction and purposeful interaction to create<br className="hidden sm:block" /> experiences <span className="text-accent">that feel simple and refined.</span>
          </p>
          <div className="relative z-0 mx-auto -mt-8 aspect-[0.75] w-[315px] overflow-hidden rounded-[9px] sm:-mt-9">
            <img
              src="/dude.jpeg"
              alt="About page portrait placeholder"
              className="h-full w-full object-cover"
            />
            <a
              href="/"
              className="absolute bottom-4 right-4 rounded-[2px] bg-primary px-4 py-2 text-[16px] font-medium leading-none text-primary-foreground transition-transform hover:scale-105"
            >
              View Résumé
            </a>
          </div>
        </div>
      </section>

      <ServicesSection ref={servicesSectionRef} isVisible={servicesVisible} />
      <ContactSection ref={contactSectionRef} isVisible={contactVisible} />
    </main>
    </>
  )
}

function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: -40, y: -40 })
  const position = useRef({ x: -40, y: -40 })

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY }
    }

    let frame = 0
    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * 0.12
      position.current.y += (target.current.y - position.current.y) * 0.12
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${position.current.x - 8}px, ${position.current.y - 8}px, 0)`
      }
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    frame = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={dotRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-4 rounded-full bg-accent md:block" />
}

const services = [
  {
    title: 'Product Design',
    description: 'I design thoughtful digital products from early concepts to polished interfaces, focusing on clear user flows, strong visual systems, and practical experiences.',
  },
  {
    title: 'UI/UX Design',
    description: 'I create clean, intuitive interfaces for web and mobile products, balancing visual design with usability, interaction, and a clear user experience.',
  },
  {
    title: 'Web Design & Development',
    description: 'I design and develop modern, responsive websites that combine strong visual design with fast, functional, and reliable experiences.',
  },
  {
    title: 'App Design & Development',
    description: 'I design and build mobile applications with a focus on intuitive interactions, consistent interfaces, and experiences that feel natural to use.',
  },
  {
    title: 'Prototyping & Design Systems',
    description: 'I turn ideas into interactive prototypes and scalable design systems that make products easier to test, refine, and develop consistently.',
  },
  
]

const ContactSection = forwardRef<HTMLElement, { isVisible: boolean }>(
  ({ isVisible }, ref) => {
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()
      setFormState('loading')

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          setFormState('success')
          setFormData({ name: '', email: '', message: '' })
        } else {
          setFormState('error')
        }
      } catch {
        setFormState('error')
      }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    return (
      <section
        ref={ref}
        data-visible={isVisible ? 'true' : 'false'}
        className="work-entrance mx-auto mt-[50px] mb-[40px] px-6 pt-4 sm:mt-[95px] sm:mb-[80px]"
        aria-labelledby="contact-title"
      >
      <div className="flex flex-col items-center text-center">
        <h2 id="contact-title" className="border-l border-foreground pl-2 font-sans text-[clamp(3.5rem,7vw,5.75rem)] font-black leading-[0.86] tracking-[-0.08em]">
          LET&apos;S TALK
        </h2>
        <p className="mt-8 max-w-[390px] text-[17px] font-medium leading-[1.25] tracking-[-0.025em] text-muted-foreground">
          Have a project in mind? Tell me about it
          <br /> and let&apos;s see what we can create together.
        </p>
        <div className="mt-5 flex items-center gap-5" aria-label="Social links">
          {[
            { label: 'X', name: 'X' },
            { label: '◎', name: 'Instagram' },
            { label: 'in', name: 'LinkedIn' },
            { label: '●', name: 'GitHub' },
          ].map((social) => (
            <a key={social.name} href="/" aria-label={social.name} className="flex size-9 items-center justify-center rounded-[5px] bg-primary text-[19px] font-bold text-primary-foreground transition-transform hover:scale-105">
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-16 flex max-w-[530px] flex-col gap-7 rounded-[10px] bg-primary px-8 py-9 text-primary-foreground sm:px-8">
        <label className="flex flex-col gap-3 text-left text-[14px] font-semibold">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={formState === 'loading'}
            placeholder="Your name"
            className="border-b border-primary-foreground/50 bg-transparent px-4 pb-3 text-[18px] font-normal outline-none placeholder:text-primary-foreground/80 focus:border-primary-foreground disabled:opacity-50"
          />
        </label>
        <label className="flex flex-col gap-3 text-left text-[14px] font-semibold">
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={formState === 'loading'}
            placeholder="Your email"
            className="border-b border-primary-foreground/50 bg-transparent px-4 pb-3 text-[18px] font-normal outline-none placeholder:text-primary-foreground/80 focus:border-primary-foreground disabled:opacity-50"
          />
        </label>
        <label className="flex flex-col gap-3 text-left text-[14px] font-semibold">
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={formState === 'loading'}
            placeholder="Tell me about your project..."
            rows={3}
            className="resize-y border-b border-primary-foreground/50 bg-transparent px-4 pb-3 text-[18px] font-normal outline-none placeholder:text-primary-foreground/80 focus:border-primary-foreground disabled:opacity-50"
          />
        </label>
        <button
          type="submit"
          disabled={formState === 'loading'}
          className="w-fit rounded-[2px] bg-background px-4 py-2 text-[16px] font-semibold text-foreground transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState === 'loading' ? 'Sending...' : formState === 'success' ? 'Sent!' : 'Send Message'}
        </button>
        {formState === 'error' && (
          <p className="text-red-500 text-sm text-center">Failed to send message. Please try again.</p>
        )}
      </form>

    </section>
  )
})

const ServicesSection = forwardRef<HTMLElement, { isVisible: boolean }>(
  ({ isVisible }, ref) => {
    const [openService, setOpenService] = useState<number | null>(null)

    return (
      <section
        ref={ref}
        data-visible={isVisible ? 'true' : 'false'}
        className="work-entrance mx-auto mt-[30px] max-w-[710px] px-6 pb-40 sm:mt-[80px]"
        aria-labelledby="services-title"
      >
      <h2 id="services-title" className="mb-6 text-[24px] font-bold tracking-[-0.05em] text-muted-foreground">
        Services
      </h2>
      <div className="entrance-content flex flex-col gap-1">
        {services.map((service, index) => {
          const isOpen = openService === index

          return (
            <div key={service.title} className="overflow-hidden rounded-[4px]">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenService(isOpen ? null : index)}
                className={`group flex min-h-[51px] w-full items-center justify-between px-4 text-left text-[17px] font-semibold transition-colors duration-200 ${isOpen ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'}`}
              >
                <span>{service.title}</span>
                <span className={`text-[26px] font-normal leading-none transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
              </button>
              <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="min-h-0 bg-accent px-4 text-accent-foreground">
                  <p className="max-w-[570px] pb-5 text-[16px] leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="entrance-content mt-16" aria-labelledby="clients-title">
        <h2 id="clients-title" className="mb-5 text-[24px] font-bold tracking-[-0.05em] text-muted-foreground">
          Clients
        </h2>
        <div className="client-logo-mask overflow-hidden">
          <div className="client-logo-track flex w-max gap-5">
            {[0, 1].map((group) => (
              <div key={group} className="flex gap-5" aria-hidden={group === 1}>
                {[
                  FigmaIcon,
                  FramerIcon,
                  ReactIcon,
                  TailwindIcon,
                  SupabaseIcon,
                  NextjsIcon,
                  JavascriptIcon,
                  PostgresIcon,
                  KritaIcon,
                  PhotoshopIcon,
                  BehanceIcon,
                ].map((Icon, index) => (
                  <div
                    key={`${group}-${Icon.displayName || Icon.name || index}`}
                    className="flex size-[56px] shrink-0 items-center justify-center rounded-[5px] bg-primary text-primary-foreground"
                  >
                    <Icon size={28} aria-hidden="true" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})
