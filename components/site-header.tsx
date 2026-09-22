'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const leftLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about-title' },
]

const rightLinks = [
  { label: 'Work', href: '/#selected-work-title' },
  { label: 'Contact', href: '/#contact-title' },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes('#')) return
    event.preventDefault()
    const hash = href.slice(href.indexOf('#'))
    if (pathname !== '/') {
      router.push(`/${hash}`)
      return
    }
    window.dispatchEvent(new CustomEvent('smooth-anchor-scroll', { detail: { hash } }))
  }

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
    <header className="sticky top-0 z-50 flex items-center justify-between bg-background/80 px-8 py-5 text-[17px] font-medium tracking-[-0.02em] backdrop-blur-sm sm:px-10 lg:px-[34px]">
      <Link href="/" aria-label="Yoftahe home" className={`absolute left-1/2 -translate-x-1/2 font-sans text-[22px] font-black tracking-[-0.08em] transition-all duration-500 ease-out ${isScrolled ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-2 scale-90 opacity-0'}`}>
        YOFTAHE
      </Link>
      <nav aria-label="Primary navigation" className="flex items-center gap-10">
        {leftLinks.map((item) => <Link key={item.label} href={item.href} onClick={(event) => handleNavigation(event, item.href)} className="transition-opacity hover:opacity-60">{item.label}</Link>)}
      </nav>
      <nav aria-label="Secondary navigation" className="flex items-center gap-10">
        {rightLinks.map((item) => <Link key={item.label} href={item.href} onClick={(event) => handleNavigation(event, item.href)} className="transition-opacity hover:opacity-60">{item.label}</Link>)}
      </nav>
    </header>
  )
}
