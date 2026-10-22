'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about-title' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/#contact-title' },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  const handleLinkClick = (href: string) => {
    if (href.includes('#') && pathname !== '/') {
      router.push(`/${href.slice(href.indexOf('#'))}`)
    }
    setIsMobileMenuOpen(false)
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

      <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-10">
        {navLinks.slice(0, 2).map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={(event) => handleNavigation(event, item.href)}
            className="transition-opacity hover:opacity-60"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <nav aria-label="Secondary navigation" className="hidden md:flex items-center gap-10">
        {navLinks.slice(2).map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={(event) => handleNavigation(event, item.href)}
            className="transition-opacity hover:opacity-60"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        className="md:hidden p-2 -mr-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? (
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
          </svg>
        ) : (
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
        )}
      </button>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => handleLinkClick(item.href)}
            className="text-[24px] font-medium tracking-[-0.02em] transition-opacity hover:opacity-60"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
