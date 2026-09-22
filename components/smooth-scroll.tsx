'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll() {
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

    if (isTouchDevice) return

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 0.8,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      autoRaf: false,
      prevent: (node) => Boolean(
        node.closest('[data-lenis-prevent], [data-scroll-lock], textarea, select, input')
      ),
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    const handleAnchorScroll = (event: Event) => {
      const target = (event as CustomEvent<{ hash: string }>).detail?.hash
      if (!target) return
      const element = document.querySelector(target) as HTMLElement | null
      if (element) lenis.scrollTo(element, { offset: -24, duration: 0.7 })
    }

    window.addEventListener('smooth-anchor-scroll', handleAnchorScroll)
    frame = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('smooth-anchor-scroll', handleAnchorScroll)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
